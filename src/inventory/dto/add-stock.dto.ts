import { IsInt, IsPositive } from 'class-validator';

export class AddStockDto {
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
