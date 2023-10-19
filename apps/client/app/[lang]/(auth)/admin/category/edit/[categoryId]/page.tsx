import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import CategoryForm from '@/components/form/CategoryForm'

const getCategoryEdit = async (token: string, categoryId: string) => {
  try {
    const response = await fetcher(`/api/admin/category/${categoryId}`, {
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

interface categoryEditPageProps {
  params: { categoryId: string }
}

const CategoryEditPage = async ({ params }: categoryEditPageProps) => {
  const token = await getAccessToken()
  if (!token) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  const category = await getCategoryEdit(token, params.categoryId)

  return <CategoryForm type="edit" category={category} />
}

export default CategoryEditPage
