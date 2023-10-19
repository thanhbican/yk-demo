import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { MdArrowRightAlt } from 'react-icons/md'

import { ProductSchema } from '@/lib/validations/product'
import { Icons } from './Icons'
import ProductItem from './ProductItem'

interface ProductsProps {
  title: string
  href: string
  products: [ProductSchema]
  dict: any
  lang: Locale
}

const Products: React.FC<ProductsProps> = ({
  title,
  href,
  products,
  dict,
  lang,
}) => {
  return (
    products && (
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <Link className="trans" href={href}>
            <h2 className="md:text-2xl text-xl font-bold capitalize line-clamp-1 break-all">
              {title}
            </h2>
          </Link>
          <Link className="trans flex items-center min-w-[106px]" href={href}>
            {dict['View all products']}
            <MdArrowRightAlt className="ml-2 relative top-[2px]" size={18} />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              dict={dict}
              lang={lang}
            />
          ))}
        </div>
      </div>
    )
  )
}

export default Products
