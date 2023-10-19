'use client'

import { ColumnDef } from '@tanstack/react-table'

import { formatPrice } from '@/lib/utils'
import { ProductSchema } from '@/lib/validations/product'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<ProductSchema>[] = [
  {
    header: 'No',
    cell: ({ table, row }) => table.getRowModel().flatRows.indexOf(row) + 1,
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
