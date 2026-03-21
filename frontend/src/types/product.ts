import type { InventoryEntry } from './inventory';

export interface Product {
  id: number;
  name: string;
  sku: string;
  createdAt: string;
  inventory?: InventoryEntry[];
}
