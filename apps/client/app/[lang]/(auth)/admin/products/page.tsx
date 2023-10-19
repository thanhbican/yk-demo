import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './components/columns'

const getProducts = async (token: string) => {
  try {
    const response = await fetcher('/api/admin/products', {
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
  const products = await getProducts(token)

  if (!products) {
    return null
  }
  return (
    <div>
      <h2 className="text-2xl text-center my-4">Products</h2>
      <DataTable data={products} columns={columns} />
    </div>
  )
}

export default productPage
