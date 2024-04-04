import type { IProduct } from '@/store/products/products'
import { ProductItem } from './productItem'
export const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
