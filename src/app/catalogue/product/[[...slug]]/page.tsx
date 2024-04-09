'use client'
import './index.scss'
import { useEffect, useState } from 'react'
import { IProduct } from '@/store/products/products'
import { getProductById } from '@/services/product'
import { toast } from 'sonner'
import Image from 'next/image'
import loadingIcon from '@/assets/icons-animated/tube-spinner.svg'
import { ICatalogue } from '../../page'
import { getCatalogue } from '@/services/catalogue'
import { Category } from '@/store/categories/categories'
import { getCategories } from '@/services/category'
import Link from 'next/link'
import { Slider } from '@/components/Slider'
import { CarouselItem } from '@/components/ui/carousel'
import { formatPrice } from '@/utils/formatPrice'
import whatsappIcon from '@/assets/icons/whatsapp.svg'

export interface IProps {
  params: {
    slug: string[]
  }
}

export default function ProductPage({ params }: IProps) {
  let [productName, id] = params.slug
  productName = productName.replace(/_/g, ' ')
  const [product, setProduct] = useState<IProduct | null>(null)
  const [catalogue, setCatalogue] = useState<ICatalogue>({} as ICatalogue)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getProductById(Number(id)).then((data) => {
      if (data.success) setProduct(data.data)
      else toast.error('No se pudo obtener el producto.')
    })

    getCatalogue().then((data) => {
      if (data.success) setCatalogue(data.data[0])
      else toast.error('No se pudo obtener el catálogo.')
    })

    getCategories().then((data) => {
      if (data.success) setCategories(data.data)
      else toast.error('No se pudieron obtener las categorías.')
    })
  }, [productName, id])

  return (
    <main className="product-detail">
      {product ? (
        <div className="details-container">
          <header className="product-header">
            <h1>{catalogue.name}</h1>

            <div className="categories">
              {categories.map((category) => (
                <div key={category.id} className="category-link">
                  <Link
                    href={`/catalogue/category/${category.name.replace(
                      / /g,
                      '_',
                    )}`}
                  >
                    <span>{category.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </header>

          <div className="product-content">
            <div className="slider-content">
              <span>
                Categoria del producto:{' '}
                <Link
                  href={`/catalogue/category/${product.category.name.replace(
                    / /g,
                    '_',
                  )}`}
                >
                  <strong>{product.category.name}</strong>
                </Link>
              </span>
              <Slider>
                {product.images_url.map((image, index) => {
                  return (
                    image && (
                      <CarouselItem key={index}>
                        <div className="image_product h-[500px]">
                          <Image src={image} alt={product.name} layout="fill" />
                        </div>
                      </CarouselItem>
                    )
                  )
                })}
              </Slider>
            </div>

            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="price">
                <span
                  className={
                    product.discount > 0 ? 'line-through text-[#999]' : ''
                  }
                >
                  {formatPrice(product.price)}
                </span>
                {product.discount > 0 &&
                  ` - ${formatPrice(
                    product.price - (product.price * product.discount) / 100,
                  )}`}
              </p>

              <span>Disponible: {product.quantity}</span>

              <div className="actions">
                <a
                  href={`https://wa.me/15550981627?text=Hola, estoy interesado en el producto ${document.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-button flex items-center justify-center bg-[#25d366] text-white rounded-md px-4 py-2 mt-4 transition-all duration-300 hover:bg-[#128c7e] hover:shadow-md
                  "
                >
                  <Image
                    src={whatsappIcon}
                    alt="WhatsApp"
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                  <span className="font-semibold">Contactar por WhatsApp</span>
                </a>
              </div>

              <p>
                <span>Descripción:</span>
                <br />
                {product.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-96">
          <Image src={loadingIcon} alt="Cargando..." width={50} height={50} />
        </div>
      )}
    </main>
  )
}
