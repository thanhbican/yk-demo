import React from 'react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import Checkout from '@/components/Checkout'

interface CheckoutPageProps {
  params: { lang: Locale }
}

const CheckoutPage: React.FC<CheckoutPageProps> = async ({
  params: { lang },
}) => {
  const dict = await getDictionary(lang)
  return <Checkout dict={dict} lang={lang} />
}

export default CheckoutPage
