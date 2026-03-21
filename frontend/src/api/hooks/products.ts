import type { PaginationOptions } from 'src/types/pagination';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/constants/query-keys';

import {
  getProductsAction,
  createProductAction,
  getProductsListAction,
  getProductDetailsAction,
} from '../actions/products';

// ----------------------------------------------------------------------

export function useGetProductsQuery(options?: PaginationOptions) {
  return useQuery({
    queryKey: queryKeys.products.get(options),
    queryFn: () => getProductsAction(options ?? { page: 1, perPage: 10 }),
  });
}

export function useGetProductsListQuery() {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: getProductsListAction,
  });
}

export function useGetProductDetailsQuery(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProductDetailsAction(id),
    enabled: !!id,
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.index() });
    },
  });
}
