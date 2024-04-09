import { type IProduct } from '@/store/products/products'
import { Slider } from '@/components/Slider'
import Image from 'next/image'
import { CarouselItem } from '@/components/ui/carousel'
import { formatPrice } from '@/utils/formatPrice'
import { useRouter } from 'next/navigation'

interface IProductItem {
  product: IProduct
}
export const ProductItem = ({ product }: IProductItem) => {
  const router = useRouter()

  return (
    <div className="item-product" key={product.id}>
      {product.discount > 0 && (
        <div className="discount">
          <div className="discount-content">
            <span>{product.discount}% Desc</span>
          </div>
        </div>
      )}

      <div className="slider-content">
        <Slider>
          {product.images_url.map((image, index) => {
            return (
              image && (
                <CarouselItem key={index}>
                  <div className="relative h-64">
                    <Image src={image} alt={product.name} layout="fill" />
                  </div>
                </CarouselItem>
              )
            )
          })}
        </Slider>
      </div>

      <div className="product-info">
        <h2
          onClick={() =>
            router.push(
              `/catalogue/product/${product.name.replace(/ /g, '_')}/${
                product.id
              }`,
            )
          }
        >
          {product.name}
        </h2>
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
    </div>
  )
}
