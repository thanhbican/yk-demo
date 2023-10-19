import { NextRequest, NextResponse } from 'next/server'

import fetcher from '@/lib/fetcher'

export async function POST(req: NextRequest) {
  const data = await req.json()
  await fetcher('/api/order', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return NextResponse.json({})
}
