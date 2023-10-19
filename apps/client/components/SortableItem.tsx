'use client'

import Image from 'next/image'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Icons } from './Icons'

export function SortableItem({ image, handleRemoveImages }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.fileId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className="w-[150px] h-[150px] overflow-hidden rounded relative bg-black/60 flex items-center justify-center"
      key={image.fileId}
      style={style}
      {...attributes}
    >
      <Image
        src={`${
          image.fileUrl ? image.fileUrl : URL.createObjectURL(image.file)
        }`}
        alt={image.fileName || image.file.name}
        width={150}
        height={150}
        className="h-auto w-auto object-contain"
      />
      <div className="absolute right-0 top-0 cursor-pointer flex space-x-2 justify-between w-full">
        <Icons.grid
          color="#fff"
          size={20}
          {...listeners}
          className="bg-red-600 shadow shadow-black/50"
        />
        <Icons.close
          color="#fff"
          size={20}
          onClick={() => handleRemoveImages(image, image.fileId)}
          className="bg-red-600 shadow shadow-black/50"
        />
      </div>
    </div>
  )
}
