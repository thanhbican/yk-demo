import React from 'react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import Contact from '@/components/Contact'

interface ContactPageProps {
  params: { lang: Locale }
}

const ContactPage: React.FC<ContactPageProps> = async ({
  params: { lang },
}) => {
  const dict = await getDictionary(lang)
  return <Contact dict={dict} lang={lang} />
}

export default ContactPage
