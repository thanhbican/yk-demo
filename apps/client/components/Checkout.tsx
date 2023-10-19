'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartStore, useCart } from '@/hooks/useCart'
import { Locale } from '@/i18n-config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import localFetcher from '@/lib/localFetcher'
import { formatPrice } from '@/lib/utils'
import { OrderSchema, orderSchema } from '@/lib/validations/order'
import { ProductSchema } from '@/lib/validations/product'
import Heading from '@/components/Heading'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const checkCart = async (cart: CartStore, productIds: string[]) => {
  try {
    const response = await localFetcher('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productIds }),
    })
    const { isChange, products } = response
    if (isChange) {
      cart.setProduct(products.map((product: ProductSchema) => product.id))
    }
    return response
  } catch (err) {
    console.error(err)
    cart.removeAllProduct()
    return []
  }
}

interface CheckoutProps {
  dict: any
  lang: Locale
}

const Checkout: React.FC<CheckoutProps> = ({ dict, lang }) => {
  const cart = useCart()
  const router = useRouter()
  const [products, setProducts] = useState<ProductSchema[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await checkCart(cart, cart.productIds)
      setProducts(response.products)
      setIsLoaded(true)
    }
    if (cart.productIds.length) {
      fetchData()
    } else {
      setProducts([])
      setIsLoaded(true)
    }
  }, [cart])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = useCallback(
    async (data: OrderSchema) => {
      try {
        setIsSaving(true)
        const productsId = products.map((product) => product.id)
        await localFetcher('/api/order', {
          method: 'POST',
          body: JSON.stringify({ ...data, products: productsId, lang }),
        })
        toast({
          title:
            dict[
              'Your order is successful, we will contact you as soon as possible'
            ],
        })
        router.push(`/${lang}`)
        cart.removeAllProduct()
      } catch (err) {
        console.error(err)
        return toast({
          title: dict['Something went wrong!'],
          variant: 'destructive',
        })
      } finally {
        setIsSaving(false)
      }
    },
    [router, cart, products, lang, dict]
  )

  const handleRemoveProduct = useCallback(
    (id: string) => {
      cart.removeProduct(id)
    },
    [cart]
  )

  const total = products.reduce((total, product) => product.price + total, 0)

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Icons.spinner className="animate-spin text-6xl text-blue-500" />
      </div>
    )
  }

  if (!products.length)
    return (
      <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading center title={dict['Your shopping cart is empty']} />
        <Button onClick={() => router.push(`/${lang}`)}>
          {dict['Back to store']}
        </Button>
      </div>
    )
  return (
    <section className="container pt-10 mb-10">
      <h2 className="font-bold text-2xl mb-10">{dict['Checkout']}</h2>
      <form
        className="grid grid-cols-5 gap-x-12 gap-y-12 md:gap-y-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <div className="col-span-3 space-y-4 rounded-lg border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 h-fit"> */}
        <div className="col-span-5 md:col-span-3">
          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>{dict['Your Details']}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="Name">{dict['Name']}</Label>
                <Input
                  id="subject"
                  placeholder="Your name..."
                  {...register('name')}
                />
                {errors?.name && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-1">
                  <Label htmlFor="subject">{dict['Email']}</Label>
                  <Input
                    id="subject"
                    placeholder="ykshoji@jp..."
                    {...register('email')}
                  />
                  {errors?.email && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <Label htmlFor="subject">{dict['Phone']}</Label>
                  <Input
                    id="subject"
                    placeholder="0123456789..."
                    {...register('phone')}
                  />
                  {errors?.phone && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Address">{dict['Address']}</Label>
                <Input
                  id="subject"
                  placeholder="Your address..."
                  {...register('address')}
                />
                {errors?.address && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">{dict['Message']}</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  className="min-h-[100px]"
                  {...register('message')}
                />
                {errors?.message && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-5 md:col-span-2 rounded-lg border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 h-fit">
          <h3 className="text-lg font-bold">{dict['Order Summary']}</h3>
          {products.map((product) => (
            <div key={product.id} className="flex py-6">
              <div className="col-span-2">
                <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-24 sm:w-24 trans">
                  <Link
                    href={`/${lang}/products/${encodeURIComponent(
                      product.slug!
                    )}`}
                  >
                    <Image
                      src={product.images[0].fileUrl}
                      alt={product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </Link>
                </div>
              </div>
              <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative">
                  <Link
                    href={`/${lang}/products/${encodeURIComponent(
                      product.slug!
                    )}`}
                    className="pr-10 font-bold line-clamp-2 mb-2 trans"
                  >
                    {product.name}
                  </Link>
                  <p>{formatPrice(product.price)}</p>
                  <Icons.close
                    onClick={() => handleRemoveProduct(product.id as string)}
                    size={20}
                    className="absolute z-10 right-0 top-0 cursor-pointer border border-black rounded-full hover:bg-blue hover:border-white hover:text-white transition"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-base font-medium">{dict['Order total']}</div>
              <div>{formatPrice(total)}</div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={products.length === 0 || isSaving}
            className="w-full mt-6"
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {dict['Order']}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default Checkout
