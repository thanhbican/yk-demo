import * as z from 'zod'

enum ProductFormType {
  Add = 'add',
  Edit = 'edit',
}

const productSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
    status: z.string().optional(),
    price: z.number(),
    name: z.string().nonempty('Name is required'),
    model: z.string().nonempty('Model is required'),
    category: z.string().nonempty('Category is required'),
    manufacturer: z.string().nonempty('Manufacturer is required'),
    serialNumber: z.string().nonempty('SerialNumber is required'),
    hours: z.number(),
    videoURL: z.string().optional(),
    description: z.any().optional(),
    images: z.any(),
  })
  .refine((data) => data.images.length, {
    message: 'Images are required',
    path: ['images'],
  })
export type ProductSchema = z.infer<typeof productSchema>

export { ProductFormType, productSchema }
