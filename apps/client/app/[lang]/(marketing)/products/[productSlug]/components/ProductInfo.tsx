'use client'

import React from 'react'
import { useCart } from '@/hooks/useCart'

import { formatNumber } from '@/lib/utils'
import { ProductSchema } from '@/lib/validations/product'
import { Icons } from '@/components/Icons'
import ProductPrice from '@/components/ProductPrice'
import { Button } from '@/components/ui/button'

interface ProductInfoProps {
  product: ProductSchema
  dict: any
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, dict }) => {
  const cart = useCart()
  return (
    <>
      <h2 className="font-bold text-4xl line-clamp-2">{product.name}</h2>
      <ProductPrice className="font-bold text-xl" price={product.price} />
      <ul className="text-sm space-y-2">
        <li className="flex">
          <span className="font-bold min-w-[8rem]">
            {dict['Manufacturer']}:
          </span>
          <span>{product.manufacturer}</span>
        </li>
        <li className="flex">
          <span className="font-bold min-w-[8rem]">{dict['Model']}:</span>
          <span>{product.model}</span>
        </li>
        <li className="flex">
          <span className="font-bold min-w-[8rem]">{dict['S/N']}:</span>
          <span>{product.serialNumber}</span>
        </li>
        <li className="flex">
          <span className="font-bold min-w-[8rem]">{dict['Hours']}:</span>
          <span>{formatNumber(product.hours)}</span>
        </li>
      </ul>
      <Button
        onClick={() => cart.addProduct(product.id!, dict)}
        className="w-full min-w-[15rem] h-[3rem] md:w-auto md:h-auto"
      >
        <Icons.cartPlus size={20} className="mr-2" />
        {dict['Add To Cart']}
      </Button>
    </>
  )
}

export default ProductInfo
