import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { GoTriangleRight } from 'react-icons/go'

import { cn } from '@/lib/utils'
import { CategorySchema } from '@/lib/validations/category'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

interface CategoryProps {
  currentType: string
  categories: CategorySchema[]
  lang: Locale
  dict: any
}

const Category: React.FC<CategoryProps> = ({
  currentType,
  categories,
  lang,
  dict,
}) => {
  return (
    <>
      <h2 className="bg-blue text-white text-lg leading-none p-5 mb-2">
        {dict['Category']}
      </h2>
      <div>
        <RadioGroup defaultValue={currentType}>
          <Link
            className={cn('flex items-center pl-4 hover:text-blue transition', {
              'text-blue': currentType === 'all',
            })}
            href={`/${lang}/products/category/all`}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem className="cursor-pointer" value="all" id="all" />
              <Label className="cursor-pointer" htmlFor="all">
                {dict['All']}
              </Label>
            </div>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              className={cn(
                'flex items-center pl-4 hover:text-blue transition capitalize break-words',
                {
                  'text-blue': currentType === category.slug,
                }
              )}
              href={`/${lang}/products/category/${encodeURIComponent(
                category.slug!
              )}`}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem
                  className="cursor-pointer"
                  value={category.slug!}
                  id={category.slug}
                />
                <Label className="cursor-pointer" htmlFor={category.slug}>
                  {category.type}
                </Label>
              </div>
            </Link>
          ))}
        </RadioGroup>
      </div>
    </>
  )
}

export default Category
