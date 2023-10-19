'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import useMounted from '@/hooks/useMouted'
import { Locale } from '@/i18n-config'

import { Icons } from './Icons'

interface CartIconProps {
  lang: Locale
}

const CartIcon: React.FC<CartIconProps> = ({ lang }) => {
  const isMounted = useMounted()
  const cart = useCart()
  return (
    <Link href={`/${lang}/cart`} className="relative">
      <Icons.cart />
      <p className="absolute -top-3 -right-3 leading-none shadow-[0_0_0_1px_#fff] bg-blue text-white text-xs flex items-center justify-center rounded-full h-5 w-5">
        {isMounted && cart.productIds.length}
      </p>
    </Link>
  )
}

export default CartIcon
