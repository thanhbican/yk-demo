'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import localFetcher from '@/lib/localFetcher'
import { PasswordSchema, passwordSchema } from '@/lib/validations/password'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

interface PasswordChangeForm {
  user: {
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | null | undefined
  }
}

const PasswordChangeForm: React.FC<PasswordChangeForm> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordSchema) => {
    try {
      setIsLoading(true)
      await localFetcher('/api/admin/password', {
        method: 'POST',
        body: JSON.stringify({
          email: user?.email,
          password: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })
      toast({
        title: 'Your password has been updated',
      })
      router.push('/admin')
    } catch (err) {
      console.error(err)
      toast({
        title: 'Change password failed',
        description: 'Your password not auth. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            autoCapitalize="none"
            autoComplete="currentPassword"
            autoCorrect="off"
            disabled={isLoading}
            {...register('currentPassword')}
          />
          {errors?.currentPassword && (
            <p className="px-1 text-xs text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            autoCapitalize="none"
            autoComplete="newPassword"
            autoCorrect="off"
            disabled={isLoading}
            {...register('newPassword')}
          />
          {errors?.newPassword && (
            <p className="px-1 text-xs text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoCapitalize="none"
            autoComplete="confirmPassword"
            autoCorrect="off"
            disabled={isLoading}
            {...register('confirmPassword')}
          />
          {errors?.confirmPassword && (
            <p className="px-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full mt-6">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Order
        </Button>
      </div>
    </form>
  )
}

export default PasswordChangeForm
