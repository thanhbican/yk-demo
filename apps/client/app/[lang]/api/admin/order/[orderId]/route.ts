import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'

const routeContextSchema = z.object({
  params: z.object({
    orderId: z.string(),
  }),
})

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const token = await getAccessToken()
  if (!token) {
    return NextResponse.error()
  }

  const { params } = routeContextSchema.parse(context)

  await fetcher(`/api/admin/order/${params.orderId}/read`, {
    method: 'PATCH',
    headers: {
      Authorization: token,
    },
  })

  return NextResponse.json({})
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const token = await getAccessToken()
  if (!token) {
    return NextResponse.error()
  }

  const { params } = routeContextSchema.parse(context)

  await fetcher(`/api/admin/order/${params.orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  })

  return NextResponse.json({})
}
