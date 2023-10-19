import { NextRequest, NextResponse } from 'next/server'

import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'

export async function POST(req: NextRequest) {
  const token = await getAccessToken()
  if (!token) {
    return NextResponse.error()
  }
  const data = await req.json()

  await fetcher('/api/admin/category', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: token,
    },
  })

  return NextResponse.json({})
}
