import { CInput } from '@/components/CInput'
import { getProducts } from '@/services/product'
import type { IProduct } from '@/store/products/products'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import searchIcon from '@/assets/icons/search_icon.svg'

interface IProps {
  handleAddProduct: (product: any) => void
}

export const ListProduct = ({ handleAddProduct }: IProps) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [search, setSearch] = useState('')

  const handleSearch = (e: any) => setSearch(e.value)

  const productFiltered = useMemo(() => {
    return products.filter((product) => {
      const name = product.name.toLowerCase()
      const searchValue = search.toLowerCase()

      return name.includes(searchValue)
    })
  }, [products, search])

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response.data)
    })
  }, [])

  return (
    <>
      <div className="search">
        <CInput
          type="text"
          value={search}
          placeholder="Buscar nombre de producto"
          onChange={handleSearch}
          icon={searchIcon}
          name="search"
          className="search__input"
        />
      </div>
      <div className="list_register_product">
        {productFiltered.map((product: IProduct) => (
          <div
            key={product.id}
            className="flex
          p-4
          rounded-md
          shadow-md
          gap-4
        "
          >
            <div>
              <Image
                src={product.images_url[0]}
                alt={product.name}
                width={100}
                height={100}
                objectFit="contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>
                Cantidad: <strong>{product.quantity}</strong>
              </p>
              <p>
                Precio: <strong>{product.price}</strong>
              </p>

              <button
                onClick={() => handleAddProduct({ ...product, quantity: 1 })}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
