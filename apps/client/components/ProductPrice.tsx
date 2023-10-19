import React from 'react'

import { cn, formatPrice } from '@/lib/utils'

interface ProductPriceProps {
  price: number
  className?: string
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, className }) => {
  return <p className={cn('text-orange', className)}>{formatPrice(price)}</p>
}

export default ProductPrice
