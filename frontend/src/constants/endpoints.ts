export const ENDPOINTS = {
  products: {
    index: '/products',
    list: '/products/list',
    detail: (id: number) => `/products/${id}`,
    create: '/products',
  } as const,
  warehouses: {
    index: '/warehouses',
    list: '/warehouses/list',
    detail: (id: number) => `/warehouses/${id}`,
    create: '/warehouses',
  },
  inventory: {
    add: '/inventory/add',
    remove: '/inventory/remove',
    transfer: '/inventory/transfer',
  },
} as const;
