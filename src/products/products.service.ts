import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { count, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/database.module';
import * as schema from '../db/schema';
import { PaginatedResult } from '../common/pagination/paginated-result';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAllPaginated(page: number, perPage: number) {
    const offset = (page - 1) * perPage;

    const [items, [{ total }]] = await Promise.all([
      this.db.query.products.findMany({
        with: {
          inventory: { with: { warehouse: true } },
        },
        orderBy: (products, { asc }) => [asc(products.name)],
        limit: perPage,
        offset,
      }),
      this.db.select({ total: count() }).from(schema.products),
    ]);

    return PaginatedResult.create(items, total, page, perPage);
  }

  async findAll() {
    return this.db.query.products.findMany({
      with: {
        inventory: { with: { warehouse: true } },
      },
      orderBy: (products, { asc }) => [asc(products.name)],
    });
  }

  async findOne(id: number) {
    const product = await this.db.query.products.findFirst({
      where: eq(schema.products.id, id),
      with: {
        inventory: { with: { warehouse: true } },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    try {
      const [product] = await this.db
        .insert(schema.products)
        .values({ name: dto.name, sku: dto.sku })
        .returning();
      return product;
    } catch (error: unknown) {
      const cause = (error as { cause?: { code?: string } })?.cause;
      if (cause?.code === '23505') {
        throw new ConflictException(
          `Product with SKU "${dto.sku}" already exists`,
        );
      }
      throw error;
    }
  }
}
