'use client'

import * as React from 'react'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { Locale } from '@/i18n-config'
import Logo from '@/public/images/logo.png'
import { MainNavItem } from '@/types'

// import { SidebarOpen } from 'lucide-react'

// import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Icons } from './Icons'
import LanguageMobile from './LanguageMobile'

interface MainNavProps {
  items?: MainNavItem[]
  lang: Locale
}

export function MobileNav({ items, lang }: MainNavProps) {
  const [open, setOpen] = React.useState(false)
  const segment = useSelectedLayoutSegment()

  return (
    <div className="flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Icons.menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileLink
            href={`/${lang}`}
            className="flex items-center"
            onOpenChange={setOpen}
          >
            <Icons.logo className="mr-2 h-4 w-4" />
          </MobileLink>
          <ScrollArea className="my-4 h-[calc(100vh)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              {items?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.disabled ? '#' : `/${lang}` + item.href}
                      onOpenChange={setOpen}
                      className={cn({
                        'text-blue font-bold':
                          item.href.startsWith(`/${segment}`) ||
                          (!segment && item.href === '/'),
                      })}
                    >
                      {item.title}
                    </MobileLink>
                  )
              )}
            </div>
            <LanguageMobile lang={lang} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <MobileLink
        href={`/${lang}`}
        className="flex items-center lg:hidden"
        onOpenChange={setOpen}
      >
        <Icons.logo className="mr-2 h-4 w-4" />
      </MobileLink>
    </div>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
