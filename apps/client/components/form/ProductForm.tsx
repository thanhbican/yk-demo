'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageProps } from '@/types'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import Cleave from 'cleave.js/react'
import { Controller, useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import localFetcher from '@/lib/localFetcher'
import { CategorySchema } from '@/lib/validations/category'
import { ProductSchema, productSchema } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Icons } from '../Icons'
import { SortableItem } from '../SortableItem'
import { toast } from '../ui/use-toast'

enum ProductFormType {
  Add = 'add',
  Edit = 'edit',
}

interface ProductFormProps {
  type: ProductFormType
  product?: ProductSchema
  categories: [CategorySchema]
}

const ProductForm: React.FC<ProductFormProps> = ({
  type,
  product,
  categories,
}) => {
  const router = useRouter()

  const [images, setImages] = useState<any>(product?.images || [])
  const [deleteImages, setDeleteImages] = useState<ImageProps[]>([])

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files as FileList)
      const filesWithIds = files.map((file) => ({
        file,
        fileId: uuidv4(),
      }))
      setImages((prevImages: any) => [...prevImages, ...filesWithIds])
    },
    []
  )

  const handleRemoveImages = useCallback((image: ImageProps, id: string) => {
    setImages((prevImages: any) =>
      prevImages.filter((img: ImageProps, i: number) => img.fileId !== id)
    )
    setDeleteImages((prevImages) => [...prevImages, image])
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const { register, handleSubmit, control, setValue, formState } =
    useForm<ProductSchema>({
      resolver: zodResolver(productSchema),
      defaultValues: type === ProductFormType.Edit ? product : {},
    })
  const errors = formState.errors as typeof formState.errors & { status?: any }

  const onSubmit = async (data: ProductSchema) => {
    try {
      setIsSaving(true)

      const formData = new FormData()
      const uploadImages = images
        .filter((image: any) => !image._id)
        .map((image: any) => image.file)
      for (let i = 0; i < uploadImages.length; i++) {
        formData.append('images', uploadImages[i])
      }

      for (const field in data) {
        if (!['id', 'images'].includes(field)) {
          formData.append(field, data[field as keyof typeof data])
        }
      }
      if (deleteImages.length) {
        formData.append('deleteImages', JSON.stringify(deleteImages))
      }
      if (images.length) {
        formData.append('currentImages', JSON.stringify(images))
      }

      if (type === ProductFormType.Edit) {
        await localFetcher(
          `/api/admin/product/${data.id}`,
          {
            method: 'PATCH',
            body: formData,
          },
          true
        )
      } else if (type === ProductFormType.Add) {
        await localFetcher(
          '/api/admin/product',
          {
            method: 'POST',
            body: formData,
          },
          true
        )
      }

      toast({
        title: 'Your product has been saved.',
      })

      router.refresh()
      return router.push('/admin/products')
    } catch (err) {
      console.error(err)
      return toast({
        title: 'Something went wrong!',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    setValue('images', images)
  }, [images, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="select-none">
      <div className="grid gap-4 py-4">
        <div>
          <Label>Images</Label>
          <br />

          <Label
            htmlFor="images"
            className="mt-1 text-right border-black border cursor-pointer p-2 inline-block"
          >
            Add new images
          </Label>

          <Input
            id="images"
            className="col-span-3 hidden"
            accept="image/*"
            autoComplete="off"
            type="file"
            multiple
            onChange={handleImageChange}
            onClick={(event) => {
              event.currentTarget.value = ''
            }}
          />
          <DndContext
            onDragEnd={(e) => {
              const { active, over } = e
              if (active.id !== over?.id) {
                setImages((images: any) => {
                  const oldIndex = images.findIndex(
                    (image: any) => image.fileId === active.id
                  )
                  const newIndex = images.findIndex(
                    (image: any) => image.fileId === over?.id
                  )
                  return arrayMove(images, oldIndex, newIndex)
                })
              }
            }}
          >
            <SortableContext items={images.map((image: any) => image.fileId)}>
              <div className="flex flex-wrap gap-4 py-4">
                {images.map((image: any) => (
                  <SortableItem
                    image={image}
                    key={image.fileId}
                    handleRemoveImages={handleRemoveImages}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          {errors?.images && (
            <p className="px-1 py-2 text-xs text-red-600">
              {String(errors.images.message)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-x-4">
          {type === ProductFormType.Edit && (
            <div className="col-span-3 mb-4 md:mb-0 md:col-span-1">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors?.status && (
                <p className="px-1 py-2 text-xs text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
          )}
          <div>
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-scroll">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category?.id || ''}>
                        {category.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors?.category && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-y-0 gap-x-4">
          <div>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              {...register('name')}
              autoComplete="off"
            />
            {errors?.name && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Input
              id="model"
              className="col-span-3"
              {...register('model')}
              autoComplete="off"
            />
            {errors?.model && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.model.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="manufacturer" className="text-right">
              Manufacturer
            </Label>
            <Input
              id="manufacturer"
              className="col-span-3"
              {...register('manufacturer')}
              autoComplete="off"
            />
            {errors?.manufacturer && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.manufacturer.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-y-0 gap-x-4">
          <div>
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Controller
              name="price"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Cleave
                  id="price"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                  options={{
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                  }}
                  value={product?.price}
                  onChange={(event) =>
                    field.onChange(
                      parseFloat(event.target.value.replace(/,/g, ''))
                    )
                  }
                />
              )}
            />

            {errors?.price && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="serialNumber" className="text-right">
              S/N
            </Label>
            <Input
              id="serialNumber"
              className="col-span-3"
              {...register('serialNumber')}
              autoComplete="off"
            />
            {errors?.serialNumber && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.serialNumber.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="hours" className="text-right">
              Hours
            </Label>
            <Controller
              name="hours"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Cleave
                  id="hours"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                  options={{
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                  }}
                  value={product?.hours}
                  onChange={(event) =>
                    field.onChange(
                      parseFloat(event.target.value.replace(/,/g, ''))
                    )
                  }
                />
              )}
            />
            {errors?.hours && (
              <p className="px-1 py-2 text-xs text-red-600">
                {errors.hours.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="videoURL" className="text-right">
            videoURL
          </Label>
          <Input
            id="videoURL"
            className="col-span-3"
            {...register('videoURL')}
            autoComplete="off"
          />
          {errors?.videoURL && (
            <p className="px-1 py-2 text-xs text-red-600">
              {errors.videoURL.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <TextareaAutosize
            placeholder="Product description"
            className="px-3 py-2 mt-2 min-h-[200px] w-full appearance-none overflow-hidden bg-transparent text-xl focus:outline-none border"
            {...register('description')}
          />
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

export default ProductForm
