import * as z from 'zod'

export const contactSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().nonempty('Email is required'),
  name: z.string().nonempty('Name is required'),
  phone: z.string().nonempty('Phone is required'),
  message: z.string().nonempty('Message is required'),
  isRead: z.boolean().optional(),
  createdAt: z.string().optional(),
})
export type ContactSchema = z.infer<typeof contactSchema>
