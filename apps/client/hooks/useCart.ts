import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { toast } from '@/components/ui/use-toast'

export interface CartStore {
  productIds: string[]
  addProduct: (productId: string, dict: any) => void
  removeProduct: (id: string) => void
  removeAllProduct: () => void
  setProduct: (productIds: string[]) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      setProduct: (productIds: string[]) => {
        set({ productIds: [...productIds] })
      },
      productIds: [],
      addProduct: async (id: string, dict) => {
        const productIds = get().productIds
        const existingProduct = productIds.find((productId) => productId === id)
        if (existingProduct) {
          return toast({
            title: dict['Product already in cart'],
            variant: 'destructive',
          })
        }
        set({ productIds: [...productIds, id] })

        toast({
          title: dict['Product added to cart'],
        })
      },
      removeProduct: (id: string) => {
        const productIds = get().productIds
        const updatedProductIds = productIds.filter(
          (productId) => productId !== id
        )
        set({ productIds: updatedProductIds })
      },
      removeAllProduct: async () => {
        set({ productIds: [] })
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
