import type { Warehouse } from 'src/types/warehouse';
import type { ApiResponse, PaginatedData } from 'src/types/api-response';
import type { CreateWarehouseSchemaType } from 'src/sections/warehouse/schema';

export interface GetWarehousesResponse extends ApiResponse<PaginatedData<Warehouse>> {}

export interface GetWarehousesListResponse extends ApiResponse<Warehouse[]> {}

export interface GetWarehouseResponse extends ApiResponse<Warehouse> {}

export interface CreateWarehousePayload extends CreateWarehouseSchemaType {}

export interface CreateWarehouseResponse extends ApiResponse<Warehouse> {}
