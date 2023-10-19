import React from 'react'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import fetcher from '@/lib/fetcher'
import { ProductSchema } from '@/lib/validations/product'
import Breadcrumbs from '@/components/Breadcrumbs'
import Gallery from '@/components/Gallery'
import ProductItem from '@/components/ProductItem'
import ProductInfo from './components/ProductInfo'
import Youtube from './components/Youtube'

const getProduct = async (slug: string) => {
  try {
    const response = await fetcher(`/api/product/${slug}`, {
      cache: 'no-store',
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

const getRelatedProducts = async (productId: string) => {
  try {
    const response = await fetcher(
      `/api/query/product/related-products/${productId}`,
      {
        cache: 'no-store',
      }
    )
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

interface ProductDetailProps {
  params: { productSlug: string; lang: Locale }
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const dict = await getDictionary(params.lang)

  const product = (await getProduct(params.productSlug)) as ProductSchema
  if (!product) {
    return notFound()
  }

  const relatedProducts = (await getRelatedProducts(
    product.id!
  )) as ProductSchema[]

  const breadcrumbs = [
    {
      title: 'Products',
      isDisabled: false,
      href: `/${params.lang}/products/category/all`,
    },
    { title: product.name, isDisabled: true },
  ]
  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={params.lang} />
      <section className="container pb-10">
        <div className="grid grid-cols-5 gap-8 mb-10">
          <div className="md:col-span-3 col-span-5">
            {product.images.length && (
              <Gallery images={product.images} alt={product.name} />
            )}
          </div>
          <div className="md:col-span-2 col-span-5 space-y-4">
            <ProductInfo product={product} dict={dict} />
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            {dict['DESCRIPTION']}
          </h2>
          <div className="whitespace-pre-line px-4">{product.description}</div>
        </div>
        {!!product.videoURL && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              {dict['VIDEO']}
            </h2>
            <Youtube videoURL={product.videoURL!} />
          </div>
        )}
        {!!relatedProducts.length && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              {dict['Related products']}
            </h2>
            <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  dict={dict}
                  lang={params.lang}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default ProductDetail
