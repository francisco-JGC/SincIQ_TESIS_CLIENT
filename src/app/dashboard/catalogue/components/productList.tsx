import type { IProduct } from '@/store/products/products'
import { ProductItem } from './productItem'

export const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
