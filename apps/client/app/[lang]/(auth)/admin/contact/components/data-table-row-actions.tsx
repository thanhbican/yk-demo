'use client'

import { useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal, Trash } from 'lucide-react'
import { FaRegEye } from 'react-icons/fa'

import localFetcher from '@/lib/localFetcher'
import { ContactSchema, contactSchema } from '@/lib/validations/contact'
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

  const contact = contactSchema.parse(row.original)
  const router = useRouter()
  const pathname = usePathname()

  const handleDetailClick = useCallback(() => {
    const currentRow = row.original as ContactSchema
    currentRow.isRead = true
    router.push(`/admin/contact/${contact.id}`)
  }, [router, contact.id, row.original])
  const handleDeleteClick = useCallback(() => setShowDeleteDialog(true), [])
  const confirmCLick = useCallback(async () => {
    try {
      setShowDeleteDialog(false)
      await localFetcher(`/api/admin/contact/${contact.id}`, {
        method: 'DELETE',
      })
      router.refresh()
      return toast({
        description: 'This contact has been deleted.',
      })
    } catch (err) {
      console.error(err)
    }
  }, [router, contact.id])
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
            onClick={handleDetailClick}
            className="cursor-pointer"
          >
            <FaRegEye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Detail
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
      </AlertDialog>
    </>
  )
}
