import { NextRequest, NextResponse } from 'next/server'

import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'

export async function POST(req: NextRequest) {
  const token = await getAccessToken()
  if (!token) {
    return NextResponse.error()
  }
  const formData = await req.formData()

  await fetcher(
    '/api/admin/product',
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: token,
      },
    },
    true
  )

  return NextResponse.json({})
}
