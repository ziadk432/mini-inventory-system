import type { PaginationOptions } from 'src/types/pagination';

export enum QueryKeys {
  GET = 'get',
  LIST = 'list',
  DETAIL = 'detail',
  PRODUCTS = 'products',
  WAREHOUSES = 'warehouses',
}

export const queryKeys = {
  products: {
    index: () => [QueryKeys.PRODUCTS],
    get: (options?: PaginationOptions) => [QueryKeys.PRODUCTS, QueryKeys.GET, options],
    list: () => [QueryKeys.PRODUCTS, QueryKeys.LIST],
    detail: (id: number) => [QueryKeys.PRODUCTS, QueryKeys.DETAIL, id],
  },
  warehouses: {
    index: () => [QueryKeys.WAREHOUSES],
    get: (options?: PaginationOptions) => [QueryKeys.WAREHOUSES, QueryKeys.GET, options],
    list: () => [QueryKeys.WAREHOUSES, QueryKeys.LIST],
    detail: (id: number) => [QueryKeys.WAREHOUSES, QueryKeys.DETAIL, id],
  },
} as const;
