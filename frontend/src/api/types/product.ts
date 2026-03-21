import type { Product } from 'src/types/product';
import type { ApiResponse, PaginatedData } from 'src/types/api-response';
import type { CreateProductSchemaType } from 'src/sections/product/schema';

export interface GetProductsResponse extends ApiResponse<PaginatedData<Product>> {}

export interface GetProductsListResponse extends ApiResponse<Product[]> {}

export interface GetProductResponse extends ApiResponse<Product> {}

export interface CreateProductPayload extends CreateProductSchemaType {}

export interface CreateProductResponse extends ApiResponse<Product> {}

export interface UpdateProductResponse extends ApiResponse<Product> {}

export interface DeleteProductResponse extends ApiResponse<void> {}
