import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'

const getOrders = async (token: string) => {
  try {
    const response = await fetcher('/api/admin/orders', {
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
  const orders = await getOrders(token)

  if (!orders) {
    return null
  }
  return (
    <div>
      <h2 className="text-2xl text-center my-4">Order</h2>
      <DataTable data={orders} columns={columns} />
    </div>
  )
}

export default productPage
