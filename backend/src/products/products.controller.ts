import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import type { PaginatedResult } from '../common/pagination/paginated-result';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAllPaginated(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResult<unknown>> {
    return await this.productsService.findAllPaginated(
      query.page,
      query.per_page,
    );
  }

  @Get('list')
  async findAll(): Promise<unknown[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<unknown> {
    return await this.productsService.create(dto);
  }
}
