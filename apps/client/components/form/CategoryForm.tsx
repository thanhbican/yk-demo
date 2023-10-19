'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import localFetcher from '@/lib/localFetcher'
import { CategorySchema, categorySchema } from '@/lib/validations/category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Icons } from '../Icons'
import { toast } from '../ui/use-toast'

interface CategoryFormProps {
  type: string
  category?: CategorySchema
}

const CategoryForm: React.FC<CategoryFormProps> = ({ type, category }) => {
  const router = useRouter()

  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues:
      type === 'edit'
        ? category
        : {
            isDisplay: false,
          },
  })

  const onSubmit = useCallback(
    async (data: CategorySchema) => {
      try {
        setIsSaving(true)
        if (type === 'edit') {
          await localFetcher(`/api/admin/category/${data.id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
          })
        } else {
          await localFetcher('/api/admin/category', {
            method: 'POST',
            body: JSON.stringify(data),
          })
        }

        toast({
          title: 'Your category has been saved.',
        })

        router.refresh()
        return router.push('/admin/category')
      } catch (err) {
        console.error(err)
        return toast({
          title: 'Something went wrong!',
          variant: 'destructive',
        })
      } finally {
        setIsSaving(false)
      }
    },
    [router, type]
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4 grid-cols-3">
        <div></div>
        <div>
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Input
            id="type"
            className="col-span-3"
            {...register('type')}
            autoComplete="off"
          />
          {errors?.type && (
            <p className="px-1 py-2 text-xs text-red-600">
              {errors.type.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-4 py-4 grid-cols-3">
        <div></div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type" className="text-right">
            Display HomeScreen
          </Label>
          <Controller
            name="isDisplay"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                defaultValue="false"
              />
            )}
          />

          {errors?.isDisplay && (
            <p className="px-1 py-2 text-xs text-red-600">
              {errors.isDisplay.message}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm
