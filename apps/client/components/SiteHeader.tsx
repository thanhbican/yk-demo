import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Logo from '@/public/images/logo.png'

import MainNav from '@/components/MainNav'
import CartIcon from './CartIcon'
import Language from './Language'
import { MobileNav } from './MobileNav'
import { Search } from './Search'

interface SiteHeaderProps {
  lang: Locale
}

const SiteHeader: React.FC<SiteHeaderProps> = async ({ lang }) => {
  const dict = await getDictionary(lang) // en

  const mainNav = [
    {
      title: dict['home'],
      href: '/',
    },
    {
      title: dict['products'],
      href: '/products/category/all',
    },
    {
      title: dict['services'],
      href: '/services',
    },
    {
      title: dict['FAQ'],
      href: '/faq',
    },
    {
      title: dict['aboutUs'],
      href: '/about-us',
    },
    {
      title: dict['contact'],
      href: '/contact',
    },
  ]
  return (
    <header className="sticky top-0 z-[5] bg-white">
      <div className="container">
        <div className="py-4 h-16 flex justify-between items-center border-b border-b-slate-200 ">
          <h1 className="hidden lg:block">
            <Link
              href={`/${lang}`}
              className="hidden items-center space-x-2 lg:flex"
            >
              <Image width={78} height={37} src={Logo} alt="YK" />
            </Link>
          </h1>
          <MainNav items={mainNav} lang={lang} />
          <MobileNav items={mainNav} lang={lang} />
          <nav className="flex items-center gap-4">
            <Search dict={dict} lang={lang} />
            <Language />
            <CartIcon lang={lang} />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
