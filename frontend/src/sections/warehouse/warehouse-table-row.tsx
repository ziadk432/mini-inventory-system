import type { Warehouse } from 'src/types/warehouse';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: Warehouse;
};

export function WarehouseTableRow({ row }: Props) {
  return (
    <TableRow hover>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{fDate(row.createdAt)}</TableCell>
    </TableRow>
  );
}
