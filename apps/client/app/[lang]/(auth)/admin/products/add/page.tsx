import React from 'react'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { ProductFormType } from '@/lib/validations/product'
import ProductForm from '@/components/form/ProductForm'

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
const productAdd = async () => {
  const token = await getAccessToken()
  if (!token) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  const categories = await getCategories(token)

  return (
    <div>
      <ProductForm type={ProductFormType.Add} categories={categories} />
    </div>
  )
}

export default productAdd
