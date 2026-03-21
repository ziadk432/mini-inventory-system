import type { PaginationOptions } from 'src/types/pagination';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/constants/query-keys';

import {
  getWarehousesAction,
  createWarehouseAction,
  getWarehousesListAction,
} from '../actions/warehouses';

// ----------------------------------------------------------------------

export function useGetWarehousesQuery(options?: PaginationOptions) {
  return useQuery({
    queryKey: queryKeys.warehouses.get(options),
    queryFn: () => getWarehousesAction(options ?? { page: 1, perPage: 10 }),
  });
}

export function useGetWarehousesListQuery() {
  return useQuery({
    queryKey: queryKeys.warehouses.list(),
    queryFn: getWarehousesListAction,
  });
}

export function useCreateWarehouseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWarehouseAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.warehouses.index() });
    },
  });
}
