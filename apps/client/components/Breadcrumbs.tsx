import React from 'react'
import Link from 'next/link'
import { Locale } from '@/i18n-config'

import { Icons } from './Icons'

interface BreadcrumbsProps {
  items: {
    href?: string
    title: string
    isDisabled?: boolean
  }[]
  dict: any
  lang: Locale
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, dict, lang }) => {
  return (
    <div className="container">
      <ul className="flex items-center py-4">
        <li>
          <Link className="trans" href={`/${lang}`}>
            {dict['home']}
          </Link>
        </li>
        <li>
          <Icons.chevronRight className="font-light" size={16} />
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.isDisabled ? (
                <span className="font-bold">{item.title}</span>
              ) : (
                <Link className="trans" href={item.href || ''}>
                  {item.title}
                </Link>
              )}
            </li>
            {index !== items.length - 1 && (
              <li>
                <Icons.chevronRight size={16} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
