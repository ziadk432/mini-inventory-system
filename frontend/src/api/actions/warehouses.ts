import type { PaginationOptions } from 'src/types/pagination';
import type {
  GetWarehouseResponse,
  GetWarehousesResponse,
  CreateWarehousePayload,
  CreateWarehouseResponse,
  GetWarehousesListResponse,
} from 'src/api/types/warehouse';

import axios from 'src/utils/axios';

import { ENDPOINTS } from 'src/constants/endpoints';

// ----------------------------------------------------------------------

export async function getWarehousesAction(options: PaginationOptions) {
  const res = await axios.get<GetWarehousesResponse>(ENDPOINTS.warehouses.index, {
    params: { page: options.page, per_page: options.perPage },
  });
  return res.data.data;
}

export async function getWarehousesListAction() {
  const res = await axios.get<GetWarehousesListResponse>(ENDPOINTS.warehouses.list);
  return res.data.data;
}

export async function getWarehouseDetailsAction(id: number) {
  const res = await axios.get<GetWarehouseResponse>(ENDPOINTS.warehouses.detail(id));
  return res.data.data;
}

export async function createWarehouseAction(data: CreateWarehousePayload) {
  const res = await axios.post<CreateWarehouseResponse>(ENDPOINTS.warehouses.create, data);
  return res.data.data;
}
