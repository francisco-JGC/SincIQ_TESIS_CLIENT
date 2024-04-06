import { useProductsStore, type IProduct } from '@/store/products/products'
import { ProductItem } from './productItem'
import { deleteProductById } from '@/services/product'
import { toast } from 'sonner'

export const ProductList = ({ products }: { products: IProduct[] }) => {
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
    <div className="products-list-container">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleRemoveProduct={handleRemoveProduct}
        />
      ))}
    </div>
  )
}
