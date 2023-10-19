import React from 'react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import Cart from '@/components/Cart'

interface CartPageProps {
  params: { lang: Locale }
}

const CartPage: React.FC<CartPageProps> = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <Cart dict={dict} lang={lang} />
}

export default CartPage
