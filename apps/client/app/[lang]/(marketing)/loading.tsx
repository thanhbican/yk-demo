import { Icons } from '@/components/Icons'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Icons.spinner className="animate-spin text-6xl text-blue-500" />
    </div>
  )
}
