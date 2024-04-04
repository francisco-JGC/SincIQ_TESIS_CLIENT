import type { IProduct } from '@/store/products/products'
import xIcon from '@/assets/icons/x.svg'
import { Slider } from '@/components/Slider'
import Image from 'next/image'
import { CarouselItem } from '@/components/ui/carousel'
import { formatPrice } from '@/utils/formatPrice'
import { AlertDialogModal } from '@/components/AlertDialog'

export const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <div className="item-product" key={product.id}>
      {product.discount > 0 && (
        <div className="discount">
          <div className="discount-content">
            <span>{product.discount}% Desc</span>
          </div>
        </div>
      )}

      <AlertDialogModal
        title="Eliminar producto"
        description="¿Estás seguro de eliminar este producto?"
        onConfirm={() => console.log('Delete product')}
      >
        <Image src={xIcon} alt="Remove from cart" className="actions" />
      </AlertDialogModal>

      <div className="slider-content">
        <Slider>
          {product.images_url.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative h-64">
                  <Image
                    src={image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CarouselItem>
            )
          })}
        </Slider>
      </div>

      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p>
        <span
          className={product.discount > 0 ? 'line-through text-[#999]' : ''}
        >
          {formatPrice(product.price)}
        </span>
        {product.discount > 0 &&
          ` - ${formatPrice(
            product.price - (product.price * product.discount) / 100,
          )}`}
      </p>
    </div>
  )
}