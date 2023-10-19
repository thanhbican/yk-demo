import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'

const getCategory = async (token: string) => {
  try {
    const response = await fetcher('/api/admin/categories', {
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

const productPage = async () => {
  const token = await getAccessToken()
  if (!token) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  const category = await getCategory(token)

  if (!category) {
    return null
  }
  return (
    <div>
      <h2 className="text-2xl text-center my-4">Category</h2>
      <DataTable data={category} columns={columns} />
    </div>
  )
}

export default productPage
