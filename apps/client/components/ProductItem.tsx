import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { RxTriangleRight } from 'react-icons/rx'

import { cn, formatNumber } from '@/lib/utils'
import { ProductSchema } from '@/lib/validations/product'
import ProductName from './ProductName'
import ProductPrice from './ProductPrice'

interface ProductItemProps {
  product: ProductSchema
  dict: any
  lang: Locale
}
const ProductItem: React.FC<ProductItemProps> = ({ product, dict, lang }) => {
  return (
    product && (
      <Link
        href={`/${lang}/products/${encodeURIComponent(product.slug!)}`}
        className={cn(
          'flex flex-col cursor-pointer transition duration-300 md:hover:-translate-y-3 md:hover:shadow'
        )}
      >
        <Image
          src={product.images[0].fileUrl}
          alt={product.name}
          width={360}
          height={230}
          className={cn('object-cover', 'w-full', `h-[230px]`)}
        />

        <div className="flex flex-col flex-grow">
          <div className="bg-black p-[10px] text-center flex flex-col flex-grow">
            <ProductName name={product.name} className="flex-grow" />
            <ProductPrice price={product.price} />
          </div>

          <ul className="border p-[8px] text-sm">
            <li className="line-clamp-1 break-words mb-[4px]">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              {dict['Manufacturer']}: {product.manufacturer}
            </li>
            <li className="line-clamp-1 break-words mb-[4px]">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              {dict['Model']}: {product.model}
            </li>
            {/* <li className="line-clamp-1 break-words mb-[4px]">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              Mark/Prefix: _
            </li> */}
            <li className="line-clamp-1 break-words mb-[4px]">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              {dict['S/N']}: {product.serialNumber}
            </li>
            {/* <li className="line-clamp-1 break-words mb-[4px]">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              Year Made: 1993
            </li> */}
            <li className="line-clamp-1 break-words mb-[4px]">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              {dict['Hours']}: {formatNumber(product.hours)}
            </li>
            {/* <li className="line-clamp-1 break-words">
              <RxTriangleRight size={20} className="text-blue inline mr-2" />
              Location: Yokohama Port
            </li> */}
          </ul>
        </div>
      </Link>
    )
  )
}

export default ProductItem
