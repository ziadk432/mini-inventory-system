import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../db/database.module';
import * as schema from '../db/schema';
import { AddStockDto } from './dto/add-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { TransferStockDto } from './dto/transfer-stock.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async addStock(dto: AddStockDto) {
    return this.db.transaction(async (tx) => {
      const [entry] = await tx
        .insert(schema.inventory)
        .values({
          productId: dto.productId,
          warehouseId: dto.warehouseId,
          quantity: dto.quantity,
        })
        .onConflictDoUpdate({
          target: [schema.inventory.productId, schema.inventory.warehouseId],
          set: {
            quantity: sql`${schema.inventory.quantity} + ${dto.quantity}`,
            updatedAt: sql`now()`,
          },
        })
        .returning();

      await tx.insert(schema.stockMovements).values({
        productId: dto.productId,
        type: 'add',
        toWarehouseId: dto.warehouseId,
        quantity: dto.quantity,
      });

      return entry;
    });
  }

  async removeStock(dto: RemoveStockDto) {
    return this.db.transaction(async (tx) => {
      const [current] = await tx
        .select()
        .from(schema.inventory)
        .where(
          and(
            eq(schema.inventory.productId, dto.productId),
            eq(schema.inventory.warehouseId, dto.warehouseId),
          ),
        );

      if (!current || current.quantity < dto.quantity) {
        throw new BadRequestException(
          `Insufficient stock. Available: ${current?.quantity ?? 0}, requested: ${dto.quantity}`,
        );
      }

      const [entry] = await tx
        .update(schema.inventory)
        .set({
          quantity: current.quantity - dto.quantity,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(schema.inventory.productId, dto.productId),
            eq(schema.inventory.warehouseId, dto.warehouseId),
          ),
        )
        .returning();

      await tx.insert(schema.stockMovements).values({
        productId: dto.productId,
        type: 'remove',
        fromWarehouseId: dto.warehouseId,
        quantity: dto.quantity,
      });

      return entry;
    });
  }

  async transferStock(dto: TransferStockDto) {
    if (dto.fromWarehouseId === dto.toWarehouseId) {
      throw new BadRequestException(
        'Source and destination warehouses must be different',
      );
    }

    return this.db.transaction(async (tx) => {
      const [source] = await tx
        .select()
        .from(schema.inventory)
        .where(
          and(
            eq(schema.inventory.productId, dto.productId),
            eq(schema.inventory.warehouseId, dto.fromWarehouseId),
          ),
        );

      if (!source || source.quantity < dto.quantity) {
        throw new BadRequestException(
          `Insufficient stock in source warehouse. Available: ${source?.quantity ?? 0}, requested: ${dto.quantity}`,
        );
      }

      await tx
        .update(schema.inventory)
        .set({
          quantity: source.quantity - dto.quantity,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(schema.inventory.productId, dto.productId),
            eq(schema.inventory.warehouseId, dto.fromWarehouseId),
          ),
        );

      await tx
        .insert(schema.inventory)
        .values({
          productId: dto.productId,
          warehouseId: dto.toWarehouseId,
          quantity: dto.quantity,
        })
        .onConflictDoUpdate({
          target: [schema.inventory.productId, schema.inventory.warehouseId],
          set: {
            quantity: sql`${schema.inventory.quantity} + ${dto.quantity}`,
            updatedAt: sql`now()`,
          },
        });

      await tx.insert(schema.stockMovements).values({
        productId: dto.productId,
        type: 'transfer',
        fromWarehouseId: dto.fromWarehouseId,
        toWarehouseId: dto.toWarehouseId,
        quantity: dto.quantity,
      });

      return { success: true };
    });
  }
}
