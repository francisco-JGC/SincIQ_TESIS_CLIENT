'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { getCatalogue } from '@/services/catalogue'
import { toast } from 'sonner'
import loadingIcon from '@/assets/icons-animated/tube-spinner.svg'
import { getProducts } from '@/services/product'
import { useProductsStore, type IProduct } from '@/store/products/products'
import { ProductList } from './components/productList'
import { Filters } from './components/filters'
import { Category } from '@/store/categories/categories'
import { getCategories } from '@/services/category'
import { useForm } from '@/hooks/useForm'

export interface ICatalogue {
  id: number
  name: string
  description?: string
  banner?: string
}

export default function CataloguePage() {
  const [catalogue, setCatalogue] = useState<ICatalogue>({} as ICatalogue)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const products = useProductsStore((state) => state.products)
  const setProducts = useProductsStore((state) => state.setProducts)

  // FILTERS
  const [search, setSearch] = useState('')
  const { values: minmax, handleInputChange } = useForm({
    min: '',
    max: '',
  })
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([])

  const handleSearch = (e: any) => setSearch(e.value)

  const handleCategories = (e: any) => {
    const category = e.value

    if (categoriesFilter.includes(category)) {
      setCategoriesFilter(categoriesFilter.filter((cat) => cat !== category))
    } else {
      setCategoriesFilter([...categoriesFilter, category])
    }
  }

  const productsFiltered = useMemo(() => {
    return products.filter((product) => {
      const name = product.name.toLowerCase()
      const searchValue = search.toLowerCase()
      const min = minmax.min ? product.price >= parseInt(minmax.min) : true
      const max = minmax.max ? product.price <= parseInt(minmax.max) : true

      const category = categoriesFilter.length
        ? categoriesFilter.includes(product.category.name)
        : true

      return name.includes(searchValue) && min && max && category
    })
  }, [products, search, minmax, categoriesFilter])

  useEffect(() => {
    setLoading(true)
    getCatalogue().then((response) => {
      if (response.success) {
        setCatalogue(response.data[0])
      } else {
        toast('Parece que aun no tienes una tienda configurada')
      }
    })

    getProducts().then((response) => {
      if (response.success) {
        setProducts(response.data)
      } else {
        toast('No se pudieron obtener los productos')
      }
    })

    getCategories().then((response) => {
      if (response.success) {
        setCategories(response.data)
      } else {
        toast('No se pudieron obtener las categorias')
      }
    })

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutPage>
      <section className=" w-full flex items-center flex-col mt-[-3em]">
        <div className="h-[285px] w-full flex">
          <Image
            src={catalogue.banner || ''}
            alt="Banner"
            className="w-full h-full object-cover rounded bg-gray-300"
            width={1000}
            height={1000}
          />
        </div>

        <div className="flex w-full justify-center flex-col items-center gap-2 mt-4">
          {loading ? (
            <Image src={loadingIcon} alt="Loading" width={40} height={40} />
          ) : (
            <>
              <h2 className="text-2xl font-bold">
                {catalogue.name || 'Sin nombre'}
              </h2>
              <p className="text-gray-400 text-center">
                {catalogue.description || 'Sin descripción'}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="products-container">
        <Filters
          categories={categories}
          search={search}
          handleSearch={handleSearch}
          minmax={minmax}
          handleInputChange={handleInputChange}
          handleCategories={handleCategories}
        />
        <ProductList products={productsFiltered} />
      </section>
    </LayoutPage>
  )
}
