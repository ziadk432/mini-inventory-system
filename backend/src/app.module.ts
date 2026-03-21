import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { ProductsModule } from './products/products.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [DatabaseModule, ProductsModule, WarehousesModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
