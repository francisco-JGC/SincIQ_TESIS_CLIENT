import type { IProduct } from '@/store/products/products'
import { ProductItem } from './productItem'

export const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
