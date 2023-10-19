'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n-config'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CommandDialog, CommandInput } from '@/components/ui/command'

interface SearchProps {
  dict: any
  lang: Locale
}

export const Search: React.FC<SearchProps> = ({ dict, lang }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      const searchValue = e.target.value
      if (searchValue.length) {
        // Handle the action when Enter key is pressed
        // For example, you might want to submit the input value here
        setOpen(false)
        router.push(
          `/${lang}/products/search/${encodeURIComponent(searchValue)}`
        )
      }
    }
  }
  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-9 justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 lg:w-50 w-40'
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">{dict['search'] + '...'}</span>
        <span className="inline-flex lg:hidden">{dict['search'] + '...'}</span>
        {/* <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd> */}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={dict['search'] + '...'}
          onKeyDown={handleKeyPress}
        />
      </CommandDialog>
    </>
  )
}
