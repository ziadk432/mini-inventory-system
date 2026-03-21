import { useState } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetWarehousesQuery } from 'src/api/hooks/warehouses';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { WarehouseTable } from '../warehouse-table';

// ----------------------------------------------------------------------

export function WarehouseListView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useGetWarehousesQuery({ page: page + 1, perPage: rowsPerPage });

  const warehouses = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Warehouses"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Warehouses' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.warehouses.new}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Warehouse
          </Button>
        }
        sx={{ mb: 5 }}
      />

      <Card>
        <WarehouseTable warehouses={warehouses} isLoading={isLoading} />

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
