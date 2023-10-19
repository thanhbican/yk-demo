import * as z from 'zod'

export const categorySchema = z.object({
  id: z.string().optional(),
  type: z.string().nonempty('Type is required'),
  isDisplay: z.boolean(),
  slug: z.string().optional(),
})
export type CategorySchema = z.infer<typeof categorySchema>
