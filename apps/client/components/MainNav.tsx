'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Locale } from '@/i18n-config'
import { MainNavItem } from '@/types'

import { cn } from '@/lib/utils'

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  lang: Locale
}

const MainNav: React.FC<MainNavProps> = ({ items, children, lang }) => {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="gap-6 lg:gap-10 hidden lg:flex">
      {items?.length && (
        <nav className="gap-6 flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : `/${lang}` + item.href}
              className={cn(
                'trans flex items-center text-lg font-semibold text-slate-600 sm:text-sm',
                item.href.startsWith(`/${segment}`) && 'text-blue font-bold',
                item.disabled && 'cursor-not-allowed opacity-80',
                !segment && item.href === '/' && 'text-blue font-bold'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}

export default MainNav
