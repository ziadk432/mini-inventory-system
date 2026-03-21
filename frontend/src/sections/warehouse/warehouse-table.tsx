import type { Warehouse } from 'src/types/warehouse';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { WarehouseTableRow } from './warehouse-table-row';

// ----------------------------------------------------------------------

type Props = {
  warehouses: Warehouse[];
  isLoading: boolean;
};

export function WarehouseTable({ warehouses, isLoading }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                Loading...
              </TableCell>
            </TableRow>
          ) : warehouses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                No warehouses found
              </TableCell>
            </TableRow>
          ) : (
            warehouses.map((warehouse) => (
              <WarehouseTableRow key={warehouse.id} row={warehouse} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
