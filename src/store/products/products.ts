import type { Category } from '../categories/categories'
import { create } from 'zustand'

export interface IProduct {
  id: number
  name: string
  price: number
  gender: string
  description: string
  discount: number
  quantity: number
  state: string
  visibility: boolean
  images_url: string[]
  created_at: string
  category: Category
}

type ProductsStore = {
  products: IProduct[]
  addProduct: (product: IProduct) => void
  removeProduct: (id: number) => void
  setProducts: (products: IProduct[]) => void
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  addProduct: (product) =>
    set((state) => {
      const productExists = state.products.some(
        (existingProduct) => existingProduct.id === product.id,
      )

      if (!productExists) {
        return {
          products: [...state.products, product],
        }
      }

      return state
    }),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  setProducts: (products) => set(() => ({ products })),
}))
