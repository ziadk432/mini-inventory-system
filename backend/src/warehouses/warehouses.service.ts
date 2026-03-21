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
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAllPaginated(page: number, perPage: number) {
    const offset = (page - 1) * perPage;

    const [items, [{ total }]] = await Promise.all([
      this.db.query.warehouses.findMany({
        orderBy: (warehouses, { asc }) => [asc(warehouses.name)],
        limit: perPage,
        offset,
      }),
      this.db.select({ total: count() }).from(schema.warehouses),
    ]);

    return PaginatedResult.create(items, total, page, perPage);
  }

  async findAll() {
    return this.db.query.warehouses.findMany({
      orderBy: (warehouses, { asc }) => [asc(warehouses.name)],
    });
  }

  async findOne(id: number) {
    const warehouse = await this.db.query.warehouses.findFirst({
      where: eq(schema.warehouses.id, id),
      with: {
        inventory: { with: { product: true } },
      },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    return warehouse;
  }

  async create(dto: CreateWarehouseDto) {
    try {
      const [warehouse] = await this.db
        .insert(schema.warehouses)
        .values({ name: dto.name })
        .returning();
      return warehouse;
    } catch (error: unknown) {
      const cause = (error as { cause?: { code?: string } })?.cause;
      if (cause?.code === '23505') {
        throw new ConflictException(`Warehouse "${dto.name}" already exists`);
      }
      throw error;
    }
  }
}
