// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    products: {
      root: `${ROOTS.DASHBOARD}/products`,
      list: `${ROOTS.DASHBOARD}/products`,
      new: `${ROOTS.DASHBOARD}/products/new`,
    },
    warehouses: {
      root: `${ROOTS.DASHBOARD}/warehouses`,
      list: `${ROOTS.DASHBOARD}/warehouses`,
      new: `${ROOTS.DASHBOARD}/warehouses/new`,
    },
  },
};
