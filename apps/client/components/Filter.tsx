'use client'

import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Locale } from '@/i18n-config'
import { RxMixerHorizontal } from 'react-icons/rx'

import { CategorySchema } from '@/lib/validations/category'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface FilterProps {
  totalProducts: number
  currentType?: string
  categories?: CategorySchema[]
  dict: any
  lang: Locale
}

const Filter: React.FC<FilterProps> = ({
  totalProducts,
  categories,
  currentType,
  dict,
  lang,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const defaultSearch = searchParams.get('sort')
  const [position, setPosition] = useState(defaultSearch || 'newest')
  const [category, setCategory] = useState(currentType || 'all')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value)
      params.set('page', '1')
      return params.toString()
    },
    [searchParams]
  )

  const handleValueChange = useCallback(
    (value: string) => {
      setPosition(value)
      router.push(pathname + '?' + createQueryString('sort', value))
    },
    [router, pathname, createQueryString]
  )
  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value)
      router.push(`/${lang}/products/category/${value}`)
    },
    [router, lang]
  )

  return (
    <div className="mb-4 flex items-center justify-between">
      <span>
        {totalProducts} {dict['result']}
      </span>
      <div className="flex gap-x-4 items-center">
        <div className="block md:hidden">
          {categories?.length && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto h-8 flex"
                >
                  {/* <RxMixerHorizontal className="mr-2 h-4 w-4" /> */}
                  {dict['Category']}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={category}
                  onValueChange={handleCategoryChange}
                >
                  <DropdownMenuRadioItem value="all">
                    {dict['All']}
                  </DropdownMenuRadioItem>
                  {categories.map((category) => (
                    <DropdownMenuRadioItem
                      key={category.id}
                      value={category.slug!}
                    >
                      {category.type}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 flex">
              <RxMixerHorizontal className="mr-2 h-4 w-4" />
              {dict['Sort']}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={handleValueChange}
            >
              <DropdownMenuRadioItem value="newest" className="cursor-pointer">
                {dict['Newest Arrivals']}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="asc" className="cursor-pointer">
                {dict['Price: Low to High']}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc" className="cursor-pointer">
                {dict['Price: High to Low']}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Filter
