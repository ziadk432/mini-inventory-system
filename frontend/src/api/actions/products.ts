import type { PaginationOptions } from 'src/types/pagination';
import type {
  GetProductResponse,
  GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  GetProductsListResponse,
} from 'src/api/types/product';

import axios from 'src/utils/axios';

import { ENDPOINTS } from 'src/constants/endpoints';

// ----------------------------------------------------------------------

export async function getProductsAction(options: PaginationOptions) {
  const res = await axios.get<GetProductsResponse>(ENDPOINTS.products.index, {
    params: { page: options.page, per_page: options.perPage },
  });
  return res.data.data;
}

export async function getProductsListAction() {
  const res = await axios.get<GetProductsListResponse>(ENDPOINTS.products.list);
  return res.data.data;
}

export async function getProductDetailsAction(id: number) {
  const res = await axios.get<GetProductResponse>(ENDPOINTS.products.detail(id));
  return res.data.data;
}

export async function createProductAction(data: CreateProductPayload) {
  const res = await axios.post<CreateProductResponse>(ENDPOINTS.products.create, data);
  return res.data.data;
}
