import * as z from 'zod'

import { productSchema } from './product'

export const orderSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().nonempty('Email is required'),
  name: z.string().nonempty('Name is required'),
  phone: z.string().nonempty('Phone is required'),
  message: z.string().nonempty('Message is required'),
  address: z.string().nonempty('Address is required'),
  isRead: z.boolean().optional(),
  products: z.array(z.lazy(() => productSchema)).optional(),
  total: z.number().optional(),
  createdAt: z.string().optional(),
})
export type OrderSchema = z.infer<typeof orderSchema>
