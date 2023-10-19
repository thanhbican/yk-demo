'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartStore, useCart } from '@/hooks/useCart'
import { Locale } from '@/i18n-config'

import localFetcher from '@/lib/localFetcher'
import { formatPrice } from '@/lib/utils'
import { ProductSchema } from '@/lib/validations/product'
import Heading from '@/components/Heading'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import ProductPrice from './ProductPrice'

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

interface CartProps {
  dict: any
  lang: Locale
}

const Cart: React.FC<CartProps> = ({ dict, lang }) => {
  const cart = useCart()
  const router = useRouter()

  const [products, setProducts] = useState<ProductSchema[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

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

  const handleRemoveProduct = useCallback(
    (id: string) => {
      cart.removeProduct(id)
    },
    [cart]
  )

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Icons.spinner className="animate-spin text-6xl text-blue-500" />
      </div>
    )
  }
  if (!products?.length) {
    return (
      <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading center title={dict['Your shopping cart is empty']} />
        <Button onClick={() => router.push(`/${lang}`)}>
          {dict['Back to store']}
        </Button>
      </div>
    )
  }

  const total = products.reduce((total, product) => product.price + total, 0)

  return (
    <section className="container pt-10 mb-10">
      <h2 className="font-bold text-2xl mb-10">{dict['Shopping Cart']}</h2>
      <div className="grid-cols-5 gap-x-12 gap-y-4 hidden md:grid">
        <div className="col-span-5 grid grid-cols-5 border px-4 py-6 sm:p-6 lg:mt-0 lg:py-4 lg:px-8 h-fit rounded-md shadow-md">
          <div className="col-span-3 text-left">{dict['Product']}</div>
          <div className="col-span-1 text-center">{dict['Price']}</div>
          <div className="col-span-1 text-center">{dict['Actions']}</div>
        </div>
        <div className="col-span-5 space-y-4  border px-4 py-6 sm:p-6 lg:mt-0 lg:py-4 lg:px-8 h-fit rounded-md shadow-md">
          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-5">
              <div className="col-span-3 flex">
                <div className="trans relative h-24 w-24 md:h-24 md:w-24 rounded-md overflow-hidden">
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
                <Link
                  href={`/${lang}/products/${encodeURIComponent(
                    product.slug!
                  )}`}
                  className="font-bold line-clamp-2 ml-12 trans h-fit"
                >
                  {product.name}
                </Link>
              </div>

              <div className="col-span-1 text-center">
                {/* <ProductPrice price={product.price} className="font-bold" /> */}
                <p>{formatPrice(product.price)}</p>
              </div>
              <div className="col-span-1 flex justify-center">
                <Icons.close
                  onClick={() => handleRemoveProduct(product.id as string)}
                  size={20}
                  className="cursor-pointer border border-black rounded-full hover:bg-blue hover:border-white hover:text-white transition"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="col-end-6 col-span-2 border px-4 py-6 sm:p-6 lg:mt-0 lg:py-4 lg:px-8 h-fit rounded-md shadow-md">
          {/* <h3 className="text-lg font-bold">{dict['Order Summary']}</h3> */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-base font-medium">{dict['Order total']}</div>
              <p className="text-2xl">{formatPrice(total)}</p>
            </div>
          </div>
          <Button
            onClick={() => router.push(`/${lang}/checkout`)}
            disabled={products.length === 0}
            className="w-full mt-6"
          >
            {dict['Checkout']}
          </Button>
        </div>
      </div>
      <div className="col-span-5 md:col-span-2 rounded-lg border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 h-fit md:hidden">
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
          onClick={() => router.push(`/${lang}/checkout`)}
          disabled={products.length === 0}
          className="w-full mt-6"
        >
          {dict['Checkout']}
        </Button>
      </div>
    </section>
  )
}

export default Cart
