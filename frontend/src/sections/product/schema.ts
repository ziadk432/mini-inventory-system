import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export const CreateProductSchema = zod.object({
  name: zod
    .string()
    .min(1, { message: 'Product name is required' })
    .max(255, { message: 'Product name must be at most 255 characters' }),
  sku: zod
    .string()
    .min(1, { message: 'SKU is required' })
    .max(100, { message: 'SKU must be at most 100 characters' }),
});

export type CreateProductSchemaType = zod.infer<typeof CreateProductSchema>;
