import React from 'react'

import { cn, formatPrice } from '@/lib/utils'

interface ProductNameProps {
  name: string
  className?: string
}

const ProductName: React.FC<ProductNameProps> = ({ name, className }) => {
  return (
    <h2
      className={cn(
        'font-bold text-lg leading-none line-clamp-2 text-white break-all',
        className
      )}
    >
      {name}
    </h2>
  )
}

export default ProductName
