import { useState } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetProductsQuery } from 'src/api/hooks/products';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductTable } from '../product-table';

// ----------------------------------------------------------------------

export function ProductListView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useGetProductsQuery({ page: page + 1, perPage: rowsPerPage });

  const products = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Products"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Products' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.products.new}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Product
          </Button>
        }
        sx={{ mb: 5 }}
      />

      <Card>
        <ProductTable products={products} isLoading={isLoading} />

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </DashboardContent>
  );
}
