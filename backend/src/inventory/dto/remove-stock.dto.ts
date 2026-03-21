import { IsInt, IsPositive } from 'class-validator';

export class RemoveStockDto {
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  warehouseId!: number;

  @IsInt()
  @IsPositive()
  quantity!: number;
}
