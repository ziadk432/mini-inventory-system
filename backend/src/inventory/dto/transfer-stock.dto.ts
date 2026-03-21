import { IsInt, IsPositive } from 'class-validator';

export class TransferStockDto {
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  fromWarehouseId!: number;

  @IsInt()
  @IsPositive()
  toWarehouseId!: number;

  @IsInt()
  @IsPositive()
  quantity!: number;
}
