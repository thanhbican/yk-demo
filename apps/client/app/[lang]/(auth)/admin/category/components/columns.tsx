'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CategorySchema } from '@/lib/validations/category'
import { Icons } from '@/components/Icons'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<CategorySchema>[] = [
  {
    header: 'No',
    cell: ({ table, row }) => table.getRowModel().flatRows.indexOf(row) + 1,
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'isDisplay',
    header: 'Display HomeScreen',
    cell: ({ row }) =>
      row.original.isDisplay ? (
        <Icons.check color="green" />
      ) : (
        <Icons.close color="red" />
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
