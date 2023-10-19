'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Logo from '@/public/images/logo.png'

import { UserNav } from '@/components/ui/user-nav'

const AdminHeader = () => {
  const router = useRouter()
  return (
    <div className="supports-backdrop-blur:bg-background/60 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center ">
          <Image
            width={32}
            height={32}
            src={Logo}
            alt="YK"
            className="mr-6 cursor-pointer"
            onClick={() => router.push('/admin/products')}
          />
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
