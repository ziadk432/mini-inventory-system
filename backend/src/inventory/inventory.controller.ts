import { Body, Controller, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AddStockDto } from './dto/add-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { TransferStockDto } from './dto/transfer-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add')
  async addStock(@Body() dto: AddStockDto): Promise<unknown> {
    return await this.inventoryService.addStock(dto);
  }

  @Post('remove')
  async removeStock(@Body() dto: RemoveStockDto): Promise<unknown> {
    return await this.inventoryService.removeStock(dto);
  }

  @Post('transfer')
  async transferStock(@Body() dto: TransferStockDto): Promise<unknown> {
    return await this.inventoryService.transferStock(dto);
  }
}
