import type { Product } from 'src/types/product';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { ProductTableRow } from './product-table-row';

// ----------------------------------------------------------------------

type Props = {
  products: Product[];
  isLoading: boolean;
};

export function ProductTable({ products, isLoading }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={50} />
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell align="right">Total Stock</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                Loading...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <ProductTableRow key={product.id} row={product} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
