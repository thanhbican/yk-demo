'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale } from '@/i18n-config'
import { GrLanguage } from 'react-icons/gr'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface LanguageMobileProps {
  lang: Locale
}

const LanguageMobile: React.FC<LanguageMobileProps> = ({ lang }) => {
  const pathname = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  const languages = [
    {
      name: 'English',
      href: 'en',
    },
    {
      name: 'Vietnamese',
      href: 'vi',
    },
    {
      name: 'Japanese',
      href: 'ja',
    },
  ]
  const currentLanguage = languages.find((l) => l.href === lang)?.name
  return (
    <NavigationMenu className="block md:hidden mt-4 relative">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <GrLanguage />
            <span className="ml-2">{currentLanguage}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-3 md:w-40">
              {languages.map((language) => (
                <li key={language.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={redirectedPathName(language.href)}
                      className={cn(
                        'cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                    >
                      <div className="text-sm font-medium leading-none">
                        {language.name}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default LanguageMobile
