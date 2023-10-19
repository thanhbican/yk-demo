import React from 'react'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import AdminHeader from '@/components/AdminHeader'

interface AdminLayoutProps {
  children: React.ReactNode
}
const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <div>
      <AdminHeader />
      <div className="container pb-4">{children}</div>
    </div>
  )
}

export default AdminLayout
