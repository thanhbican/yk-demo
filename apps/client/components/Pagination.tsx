'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Icons } from './Icons'
import { Button } from './ui/button'

interface PaginationProps {
  totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const maxPagesToShow = 5

  const getPaginationRange = () => {
    const range = []

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i)
      }
    } else {
      const middlePage = Math.max(
        Math.min(currentPage, totalPages) - Math.floor(maxPagesToShow / 2),
        1
      )
      const remainingPages = Math.min(
        maxPagesToShow,
        totalPages - middlePage + 1
      )

      for (let i = 0; i < remainingPages; i++) {
        range.push(middlePage + i)
      }
    }

    return range
  }

  const paginationRange = getPaginationRange()
  return (
    totalPages > 1 && (
      <ul className="flex gap-4 items-center justify-center mt-8">
        <li>
          {!isFirstPage && (
            <Link
              href={
                pathname +
                '?' +
                createQueryString('page', (currentPage - 1).toString())
              }
            >
              <Button variant="outline">
                <Icons.chevronLeft />
              </Button>
            </Link>
          )}
        </li>
        {paginationRange.map((_, i) => (
          <li key={i}>
            <Link
              href={
                pathname + '?' + createQueryString('page', (i + 1).toString())
              }
            >
              <Button
                variant="outline"
                className={cn({
                  'bg-blue text-white': currentPage === i + 1,
                })}
              >
                {i + 1}
              </Button>
            </Link>
          </li>
        ))}
        <li>
          {!isLastPage && (
            <Link
              href={
                pathname +
                '?' +
                createQueryString('page', (currentPage + 1).toString())
              }
            >
              <Button variant="outline">
                <Icons.chevronRight />
              </Button>
            </Link>
          )}
        </li>
      </ul>
    )
  )
}

export default Pagination
