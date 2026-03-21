import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export const CreateWarehouseSchema = zod.object({
  name: zod
    .string()
    .min(1, { message: 'Warehouse name is required' })
    .max(255, { message: 'Warehouse name must be at most 255 characters' }),
});

export type CreateWarehouseSchemaType = zod.infer<typeof CreateWarehouseSchema>;
