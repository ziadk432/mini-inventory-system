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
import { useCreateProductMutation } from 'src/api/hooks/products';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreateProductSchema } from '../schema';

import type { CreateProductSchemaType } from '../schema';

// ----------------------------------------------------------------------

export function ProductNewView() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateProductMutation();

  const methods = useForm<CreateProductSchemaType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: { name: '', sku: '' },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Product created successfully');
      router.push(paths.dashboard.products.list);
    } catch (error: any) {
      const message = getServerError(error, setError);
      toast.error(message);
    }
  });

  return (
    <DashboardContent maxWidth="md">
      <CustomBreadcrumbs
        heading="Create Product"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Products', href: paths.dashboard.products.root },
          { name: 'Create' },
        ]}
        sx={{ mb: 3 }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Card>
            <CardHeader title="Product Details" />
            <CardContent>
              <Stack spacing={2.5}>
                <Field.Text name="name" label="Product Name" />
                <Field.Text name="sku" label="SKU" />
              </Stack>
            </CardContent>
          </Card>

          <Stack direction="row" justifyContent="flex-end">
            <LoadingButton type="submit" variant="contained" size="large" loading={isPending}>
              Create Product
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </DashboardContent>
  );
}
