'use client'

import { ColumnDef } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { OrderSchema } from '@/lib/validations/order'
import { Badge } from '@/components/ui/badge'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<OrderSchema>[] = [
  {
    header: 'No',
    cell: ({ table, row }) => table.getRowModel().flatRows.indexOf(row) + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {!row.original.isRead && <Badge variant="destructive">New</Badge>}
          <span
            className={cn('max-w-[500px] truncate', {
              'font-medium': !row.original.isRead,
            })}
          >
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
