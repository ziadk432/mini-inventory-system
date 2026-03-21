import type { Warehouse } from './warehouse';

export interface InventoryEntry {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  updatedAt: string;
  warehouse: Warehouse;
}

export interface AddStockDto {
  productId: number;
  warehouseId: number;
  quantity: number;
}

export interface RemoveStockDto {
  productId: number;
  warehouseId: number;
  quantity: number;
}

export interface TransferStockDto {
  productId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  quantity: number;
}
