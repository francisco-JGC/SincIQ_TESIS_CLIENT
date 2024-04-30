import { getProducts } from '@/services/product'
import type { IProduct } from '@/store/products/products'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IProps {
  handleAddProduct: (product: any) => void
}

export const ListProduct = ({ handleAddProduct }: IProps) => {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response.data)
    })
  }, [])

  return (
    <div className="list_register_product">
      {products.map((product: IProduct) => (
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
            >
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
