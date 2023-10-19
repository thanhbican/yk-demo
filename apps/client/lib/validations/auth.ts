import * as z from 'zod'

export const userAuthSchema = z.object({
  email: z.string().email().nonempty('email is required'),
  password: z.string().nonempty('password is required'),
})
