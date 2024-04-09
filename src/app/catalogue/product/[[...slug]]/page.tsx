'use client'
import { useEffect, useState } from 'react'
import { IProduct } from '@/store/products/products'
import { getProductById, updateProduct } from '@/services/product'
import { toast } from 'sonner'
import Image from 'next/image'
import loadingIcon from '@/assets/icons-animated/tube-spinner.svg'
import { useRouter } from 'next/navigation'

export interface IProps {
  params: {
    slug: string[]
  }
}

export default function ProductPage({ params }: IProps) {
  let [productName, id] = params.slug
  productName = productName.replace(/_/g, ' ')
  const [product, setProduct] = useState<IProduct | null>(null)

  const router = useRouter()

  const handleUpdateProduct = async (productUpdated: IProduct) => {
    if (product) {
      const response = await updateProduct(product.id as number, productUpdated)

      if (response.success) {
        toast.success('Producto actualizado correctamente.')
        router.push('/dashboard/catalogue')
      } else {
        toast.error('No se pudo actualizar el producto.', {
          description: response.message,
        })
      }
    }
  }

  useEffect(() => {
    getProductById(Number(id)).then((data) => {
      if (data.success) setProduct(data.data)
      else toast.error('No se pudo obtener el producto.')
    })
  }, [productName, id])

  return <div className="product-detail"></div>
}
