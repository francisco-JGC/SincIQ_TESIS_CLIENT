import { useProductsStore, type IProduct } from '@/store/products/products'
import xIcon from '@/assets/icons/x.svg'
import { Slider } from '@/components/Slider'
import Image from 'next/image'
import { CarouselItem } from '@/components/ui/carousel'
import { formatPrice } from '@/utils/formatPrice'
import { AlertDialogModal } from '@/components/AlertDialog'
import { deleteProductById } from '@/services/product'
import { toast } from 'sonner'

export const ProductItem = ({ product }: { product: IProduct }) => {
  const removeProduct = useProductsStore((state) => state.removeProduct)

  const handleRemoveProduct = async (id: number) => {
    toast.loading('Eliminando producto...')

    const response = await deleteProductById(id)

    toast.dismiss()

    if (response.success) {
      toast.success('Has eliminado el producto')
      removeProduct(id)
    } else {
      toast.error('Ha ocurrido un error al eliminar el producto')
    }
  }

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
        onConfirm={() => handleRemoveProduct(product.id)}
      >
        <Image src={xIcon} alt="Remove from cart" className="actions" />
      </AlertDialogModal>

      <div className="slider-content">
        <Slider>
          {product.images_url.map((image, index) => {
            return (
              image && (
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
            )
          })}
        </Slider>
      </div>

      <h2 className="text-lg font-semibold mt-2 text-center">{product.name}</h2>
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
