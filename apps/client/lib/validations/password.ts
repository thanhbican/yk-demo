import * as z from 'zod'

export const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty('Required'),
    newPassword: z.string().nonempty('Required'),
    confirmPassword: z.string().nonempty('Required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type PasswordSchema = z.infer<typeof passwordSchema>
