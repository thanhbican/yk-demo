'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ImageProps } from '@/types'

import Modal from './Modal'

interface GalleryProps {
  images: ImageProps[]
  alt: string
}
const Gallery: React.FC<GalleryProps> = ({ images, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const handleImageClick = (index: number) => {
    setIsModalOpen(true)
    setImageIndex(index)
  }
  return (
    <>
      <div className="md:h-[400px] h-[15rem] mb-4">
        <Image
          src={images[0].fileUrl}
          alt={alt}
          width={300}
          height={300}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => handleImageClick(0)}
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {images.slice(1, 4).map((image: ImageProps, index: number) => (
            <div className="relative" key={image.fileId}>
              <Image
                src={image.fileUrl}
                alt={alt}
                width={300}
                height={100}
                className="w-full object-cover col-span-1 h-[100px] cursor-pointer"
                onClick={() => handleImageClick(index + 1)}
              />
              {images.length > 3 && index >= 2 && !!images.slice(4).length && (
                <div className="absolute inset-0 text-white bg-black/50 flex items-center justify-center pointer-events-none">
                  +{images.slice(4).length}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {images.length && (
        <Modal
          isOpen={isModalOpen}
          images={images}
          imageIndex={imageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default Gallery
