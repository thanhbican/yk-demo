import { NextRequest, NextResponse } from 'next/server'

import fetcher from '@/lib/fetcher'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const products = await fetcher('/api/cart', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return NextResponse.json(products)
}
