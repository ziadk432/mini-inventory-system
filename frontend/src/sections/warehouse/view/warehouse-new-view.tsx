import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getServerError } from 'src/utils/get-server-error';

import { DashboardContent } from 'src/layouts/dashboard';
import { useCreateWarehouseMutation } from 'src/api/hooks/warehouses';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreateWarehouseSchema } from '../schema';

import type { CreateWarehouseSchemaType } from '../schema';

// ----------------------------------------------------------------------

export function WarehouseNewView() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateWarehouseMutation();

  const methods = useForm<CreateWarehouseSchemaType>({
    resolver: zodResolver(CreateWarehouseSchema),
    defaultValues: { name: '' },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Warehouse created successfully');
      router.push(paths.dashboard.warehouses.list);
    } catch (error: any) {
      const message = getServerError(error, setError);
      toast.error(message);
    }
  });

  return (
    <DashboardContent maxWidth="md">
      <CustomBreadcrumbs
        heading="Create Warehouse"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Warehouses', href: paths.dashboard.warehouses.root },
          { name: 'Create' },
        ]}
        sx={{ mb: 3 }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Card>
            <CardHeader title="Warehouse Details" />
            <CardContent>
              <Field.Text name="name" label="Warehouse Name" />
            </CardContent>
          </Card>

          <Stack direction="row" justifyContent="flex-end">
            <LoadingButton type="submit" variant="contained" size="large" loading={isPending}>
              Create Warehouse
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </DashboardContent>
  );
}
