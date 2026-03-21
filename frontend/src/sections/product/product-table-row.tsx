import type { Product } from 'src/types/product';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

import { ProductInventoryDetails } from './product-inventory-details';

// ----------------------------------------------------------------------

type Props = {
  row: Product;
};

export function ProductTableRow({ row }: Props) {
  const [open, setOpen] = useState(false);

  const totalStock = (row.inventory ?? []).reduce((sum, inv) => sum + inv.quantity, 0);

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <Iconify icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.sku}</TableCell>
        <TableCell align="right">{totalStock}</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              <ProductInventoryDetails product={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
