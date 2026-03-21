import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { getServerError } from 'src/utils/get-server-error';

import { useTransferStockMutation } from 'src/api/hooks/inventory';
import { useGetWarehousesListQuery } from 'src/api/hooks/warehouses';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  productId: number;
  fromWarehouseId: number;
  fromWarehouseName: string;
  maxQuantity: number;
};

export function TransferStockDialog({
  open,
  onClose,
  productId,
  fromWarehouseId,
  fromWarehouseName,
  maxQuantity,
}: Props) {
  const schema = zod.object({
    toWarehouseId: zod.number().min(1, { message: 'Destination warehouse is required' }),
    quantity: zod
      .number()
      .int()
      .min(1, { message: 'Quantity must be at least 1' })
      .max(maxQuantity, { message: `Cannot transfer more than ${maxQuantity} units` }),
  });

  type SchemaType = zod.infer<typeof schema>;

  const { mutateAsync, isPending } = useTransferStockMutation();
  const { data: warehouses = [] } = useGetWarehousesListQuery();

  const destinationWarehouses = warehouses.filter((wh) => wh.id !== fromWarehouseId);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { toWarehouseId: 0, quantity: 0 },
  });

  const { handleSubmit, setError, reset } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({
        productId,
        fromWarehouseId,
        toWarehouseId: data.toWarehouseId,
        quantity: data.quantity,
      });
      toast.success('Stock transferred successfully');
      handleClose();
    } catch (error: any) {
      const message = getServerError(error, setError);
      toast.error(message);
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Transfer Stock</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Transferring from <strong>{fromWarehouseName}</strong>. Available: {maxQuantity} units.
            </Typography>
            <Field.Select name="toWarehouseId" label="Destination Warehouse">
              {destinationWarehouses.map((wh) => (
                <MenuItem key={wh.id} value={wh.id}>
                  {wh.name}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text name="quantity" label="Quantity" type="number" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isPending}>
            Transfer
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
