import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { getServerError } from 'src/utils/get-server-error';

import { useRemoveStockMutation } from 'src/api/hooks/inventory';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  productId: number;
  warehouseId: number;
  warehouseName: string;
  maxQuantity: number;
};

export function RemoveStockDialog({
  open,
  onClose,
  productId,
  warehouseId,
  warehouseName,
  maxQuantity,
}: Props) {
  const schema = zod.object({
    quantity: zod
      .number()
      .int()
      .min(1, { message: 'Quantity must be at least 1' })
      .max(maxQuantity, { message: `Cannot remove more than ${maxQuantity} units` }),
  });

  type SchemaType = zod.infer<typeof schema>;

  const { mutateAsync, isPending } = useRemoveStockMutation();

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 0 },
  });

  const { handleSubmit, setError, reset } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ productId, warehouseId, quantity: data.quantity });
      toast.success('Stock removed successfully');
      handleClose();
    } catch (error: any) {
      const message = getServerError(error, setError);
      toast.error(message);
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Remove Stock</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Removing from <strong>{warehouseName}</strong>. Available: {maxQuantity} units.
            </Typography>
            <Field.Text name="quantity" label="Quantity" type="number" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" color="error" loading={isPending}>
            Remove Stock
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
