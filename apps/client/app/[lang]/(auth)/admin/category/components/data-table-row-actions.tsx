'use client'

import { useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal, Pen, Trash } from 'lucide-react'

import localFetcher from '@/lib/localFetcher'
import { categorySchema } from '@/lib/validations/category'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const category = categorySchema.parse(row.original)
  const router = useRouter()
  const pathname = usePathname()

  const handleEditClick = useCallback(
    () => router.push(`${pathname}/edit/${category.id}`),
    [router, pathname, category.id]
  )
  const handleDeleteClick = useCallback(() => setShowDeleteDialog(true), [])
  const confirmCLick = useCallback(async () => {
    try {
      setShowDeleteDialog(false)
      await localFetcher(`/api/admin/category/${category.id}`, {
        method: 'DELETE',
      })
      router.refresh()
      return toast({
        description: 'This category has been deleted.',
      })
    } catch (err) {
      console.error(err)
    }
  }, [category.id, router])
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex h-8 w-8 p-0 items-center justify-center cursor-pointer hover:bg-accent hover:text-accent-foreground transition">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={handleEditClick}
            className="cursor-pointer"
          >
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmCLick}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  )
}
