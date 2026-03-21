import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/constants/query-keys';

import { addStockAction, removeStockAction, transferStockAction } from '../actions/inventory';

// ----------------------------------------------------------------------

export function useAddStockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStockAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.index() });
    },
  });
}

export function useRemoveStockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeStockAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.index() });
    },
  });
}

export function useTransferStockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferStockAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.index() });
    },
  });
}
