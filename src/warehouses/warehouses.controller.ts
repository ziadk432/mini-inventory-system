import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import type { PaginatedResult } from '../common/pagination/paginated-result';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Get()
  async findAllPaginated(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResult<unknown>> {
    return await this.warehousesService.findAllPaginated(
      query.page,
      query.per_page,
    );
  }

  @Get('list')
  async findAll(): Promise<unknown[]> {
    return await this.warehousesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.warehousesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateWarehouseDto): Promise<unknown> {
    return await this.warehousesService.create(dto);
  }
}
