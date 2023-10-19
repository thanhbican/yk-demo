'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '../Icons'

type FormData = z.infer<typeof userAuthSchema>

const UserAuthForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const signInResult = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    if (!signInResult?.ok) {
      setIsLoading(false)
      return toast({
        title: 'Login failed',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
    }

    router.push('/admin/products')
    setIsLoading(false)

    return toast({
      title: 'Login successfully',
    })
  }

  return (
    <div className={cn('grid gap-6')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with account
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserAuthForm
