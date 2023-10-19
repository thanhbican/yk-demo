'use client'

import { useEffect, useState } from 'react'
import { ImageProps } from '@/types'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useKey } from 'react-use'

import ImageModal from './ImageModal'

interface ModalProps {
  images: ImageProps[]
  imageIndex: number
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
  images,
  imageIndex,
  isOpen,
  onClose,
}) => {
  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(imageIndex)

  useEffect(() => {
    setCurIndex(imageIndex)
  }, [imageIndex])

  function handleClose() {
    onClose()
  }

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setCurIndex(newVal)
  }

  useKey(
    'ArrowRight',
    () => {
      if (curIndex + 1 < images.length) {
        changePhotoId(curIndex + 1)
      }
    },
    undefined,
    [curIndex]
  )

  useKey(
    'ArrowLeft',
    () => {
      if (curIndex > 0) {
        changePhotoId(curIndex - 1)
      }
    },
    undefined,
    [curIndex]
  )

  return (
    isOpen && (
      <Dialog
        static
        open={isOpen}
        onClose={() => {}}
        className="fixed inset-0 z-10 flex items-center justify-center select-none"
      >
        <>
          <Dialog.Overlay
            as={motion.div}
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <ImageModal
            index={curIndex}
            direction={direction}
            images={images}
            changePhotoId={changePhotoId}
            closeModal={handleClose}
            navigation={true}
          />
        </>
      </Dialog>
    )
  )
}

export default Modal
