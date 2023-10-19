import React from 'react'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { ProductFormType } from '@/lib/validations/product'
import ProductForm from '@/components/form/ProductForm'

const getProductEdit = async (token: string, productSlug: string) => {
  try {
    const response = await fetcher(`/api/admin/product/${productSlug}`, {
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

const getCategories = async (token: string) => {
  try {
    const response = await fetcher(`/api/admin/categories/`, {
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

interface productEditProps {
  params: { productSlug: string }
}

const productEdit = async ({ params }: productEditProps) => {
  const token = await getAccessToken()
  if (!token) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  const product = await getProductEdit(token, params.productSlug)
  const categories = await getCategories(token)

  return (
    <ProductForm
      type={ProductFormType.Edit}
      product={product}
      categories={categories}
    />
  )
}

export default productEdit
