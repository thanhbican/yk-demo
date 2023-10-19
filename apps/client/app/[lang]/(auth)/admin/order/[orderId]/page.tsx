import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { formatPrice, formatTimeJP } from '@/lib/utils'
import { OrderSchema } from '@/lib/validations/order'
import { ProductSchema } from '@/lib/validations/product'
import { Icons } from '@/components/Icons'

const getOrder = async (token: string, orderId: string) => {
  try {
    const response = await fetcher(`/api/admin/order/${orderId}`, {
      headers: {
        Authorization: token,
      },
      cache: 'no-store',
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

const readOrder = async (token: string, orderId: string) => {
  try {
    const response = await fetcher(`/api/admin/order/${orderId}/read`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
      },
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

interface orderDetailPageProps {
  params: {
    orderId: string
  }
}

const orderDetailPage: React.FC<orderDetailPageProps> = async ({ params }) => {
  const { orderId } = params
  const token = await getAccessToken()
  if (!token) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  const order = (await getOrder(token, orderId)) as OrderSchema

  if (!order) {
    return null
  }
  await readOrder(token, orderId)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 mt-10 text-center">
        Order Information
      </h2>
      <div className="mx-auto bg-white rounded-lg my-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Customer{' '}
            <span className="text-sm"> {formatTimeJP(order.createdAt!)}</span>
          </h2>
          <div className="px-4">
            <p className="text-gray-600">
              <span className="font-bold">Name:</span> {order.name}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Email:</span> {order.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Phone:</span> {order.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Address:</span> {order.address}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Message:</span> {order.message}
            </p>
          </div>
        </div>
        {/* <div>
          <h2 className="text-xl font-bold mb-2">Products</h2>
          <ul className="list-disc pl-6">
            {order.products!.map((product: ProductSchema) => (
              <div key={product.id} className="flex py-6">
                <div className="col-span-2">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-24 sm:w-24">
                    {product?.images[0]?.fileUrl && (
                      <Image
                        src={product.images[0].fileUrl}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                </div>
                <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative">
                    <h2 className="pr-10 font-bold line-clamp-2 mb-2">
                      {product.name}
                    </h2>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="text-right">
          <p className="text-gray-600">
            <span className="font-bold">Total:</span>{' '}
            {formatPrice(order.total!)}
          </p>
        </div> */}
        <div className="grid-cols-5 gap-x-12 gap-y-4 hidden md:grid">
          <h2 className="text-xl font-bold mb-2">Order</h2>
          <div className="col-span-5 grid grid-cols-5 border px-4 py-6 sm:p-6 lg:mt-0 lg:py-4 lg:px-8 h-fit rounded-md shadow-md">
            <div className="col-span-3 text-left">Product</div>
            <div className="col-span-1 text-center">Price</div>
            {/* <div className="col-span-1 text-center">Actions</div> */}
          </div>
          <div className="col-span-5 space-y-4  border px-4 py-6 sm:p-6 lg:mt-0 lg:py-4 lg:px-8 h-fit rounded-md shadow-md">
            {order.products!.map((product: ProductSchema) => (
              <div key={product.id} className="grid grid-cols-5">
                <div className="col-span-3 flex">
                  <div className="trans relative h-24 w-24 md:h-24 md:w-24 rounded-md overflow-hidden">
                    <Link
                      href={`/products/${encodeURIComponent(product.slug!)}`}
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
                    href={`/products/${encodeURIComponent(product.slug!)}`}
                    className="font-bold line-clamp-2 ml-12 trans h-fit"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="col-span-1 text-center">
                  <p>{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-end-6 col-span-2 border px-4 py-6 sm:p-6 lg:mt-0 lg:py-4 lg:px-8 h-fit rounded-md shadow-md">
            {/* <h3 className="text-lg font-bold">Order Summary</h3> */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-base font-medium">Order total</div>
                <p className="text-2xl">{formatPrice(order.total!)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2 rounded-lg border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 h-fit md:hidden">
          <h3 className="text-lg font-bold">Order Summary</h3>
          {order.products!.map((product: ProductSchema) => (
            <div key={product.id} className="flex py-6">
              <div className="col-span-2">
                <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-24 sm:w-24 trans">
                  <Link href={`/products/${encodeURIComponent(product.slug!)}`}>
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
                    href={`/products/${encodeURIComponent(product.slug!)}`}
                    className="pr-10 font-bold line-clamp-2 mb-2 trans"
                  >
                    {product.name}
                  </Link>
                  <p>{formatPrice(product.price)}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-base font-medium">Order total</div>
              <div>{formatPrice(order.total!)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default orderDetailPage
