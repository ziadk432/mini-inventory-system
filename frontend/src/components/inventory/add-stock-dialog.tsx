import { z as zod } from 'zod'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { getServerError } from 'src/utils/get-server-error';

import { useAddStockMutation } from 'src/api/hooks/inventory';
import { useGetWarehousesListQuery } from 'src/api/hooks/warehouses';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const AddStockSchema = zod.object({
  warehouseId: zod.number().min(1, { message: 'Warehouse is required' }),
  quantity: zod.number().int().min(1, { message: 'Quantity must be at least 1' }),
});

type AddStockSchemaType = zod.infer<typeof AddStockSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  productId: number;
};

export function AddStockDialog({ open, onClose, productId }: Props) {
  const { mutateAsync, isPending } = useAddStockMutation();
  const { data: warehouses = [] } = useGetWarehousesListQuery();

  const methods = useForm<AddStockSchemaType>({
    resolver: zodResolver(AddStockSchema),
    defaultValues: { warehouseId: 0, quantity: 0 },
  });

  const { handleSubmit, setError, reset } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ productId, ...data });
      toast.success('Stock added successfully');
      handleClose();
    } catch (error: any) {
      const message = getServerError(error, setError);
      toast.error(message);
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Stock</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <Field.Select name="warehouseId" label="Warehouse">
              {warehouses.map((wh) => (
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
            Add Stock
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
