import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

 
// ----------------------------------------------------------------------

const ProductListPage = lazy(() => import('src/pages/dashboard/products/list'));
const ProductNewPage = lazy(() => import('src/pages/dashboard/products/new'));
const WarehouseListPage = lazy(() => import('src/pages/dashboard/warehouses/list'));
const WarehouseNewPage = lazy(() => import('src/pages/dashboard/warehouses/new'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: <>{layoutContent}</> ,
    children: [
      { element: <ProductListPage />, index: true },
      {
        path: 'products',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'new', element: <ProductNewPage /> },
        ],
      },
      {
        path: 'warehouses',
        children: [
          { element: <WarehouseListPage />, index: true },
          { path: 'new', element: <WarehouseNewPage /> },
        ],
      },
    ],
  },
];
