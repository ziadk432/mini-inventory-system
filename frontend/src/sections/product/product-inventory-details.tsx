import type { Product } from 'src/types/product';
import type { InventoryEntry } from 'src/types/inventory';

import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { AddStockDialog } from 'src/components/inventory/add-stock-dialog';
import { RemoveStockDialog } from 'src/components/inventory/remove-stock-dialog';
import { TransferStockDialog } from 'src/components/inventory/transfer-stock-dialog';

// ----------------------------------------------------------------------

type Props = {
  product: Product;
};

export function ProductInventoryDetails({ product }: Props) {
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [removeStockEntry, setRemoveStockEntry] = useState<InventoryEntry | null>(null);
  const [transferStockEntry, setTransferStockEntry] = useState<InventoryEntry | null>(null);

  const inventory = product.inventory ?? [];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle2">Inventory by Warehouse</Typography>
        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setAddStockOpen(true)}
        >
          Add Stock
        </Button>
      </Stack>

      {inventory.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', py: 2 }}>
          No inventory yet. Click &quot;Add Stock&quot; to add stock to a warehouse.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Warehouse</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.warehouse.name}</TableCell>
                <TableCell align="right">{entry.quantity}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => setRemoveStockEntry(entry)}
                    >
                      Remove
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setTransferStockEntry(entry)}
                    >
                      Transfer
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AddStockDialog
        open={addStockOpen}
        onClose={() => setAddStockOpen(false)}
        productId={product.id}
      />

      {removeStockEntry && (
        <RemoveStockDialog
          open={!!removeStockEntry}
          onClose={() => setRemoveStockEntry(null)}
          productId={product.id}
          warehouseId={removeStockEntry.warehouseId}
          warehouseName={removeStockEntry.warehouse.name}
          maxQuantity={removeStockEntry.quantity}
        />
      )}

      {transferStockEntry && (
        <TransferStockDialog
          open={!!transferStockEntry}
          onClose={() => setTransferStockEntry(null)}
          productId={product.id}
          fromWarehouseId={transferStockEntry.warehouseId}
          fromWarehouseName={transferStockEntry.warehouse.name}
          maxQuantity={transferStockEntry.quantity}
        />
      )}
    </>
  );
}
