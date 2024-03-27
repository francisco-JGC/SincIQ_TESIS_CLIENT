import { create } from 'zustand'

export interface Category {
  id: number
  name: string
  description: string
}

type CategoriesStore = {
  categories: Category[]
  addCategory: (category: Category) => void
  removeCategory: (id: number) => void
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  addCategory: (category) =>
    set((state) => {
      const categoryExists = state.categories.some(
        (existingCategory) => existingCategory.id === category.id,
      )

      if (!categoryExists) {
        return {
          categories: [...state.categories, category],
        }
      }

      return state
    }),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}))
