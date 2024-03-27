import { LayoutPage } from '@/components/LayoutPage'
import './index.scss'

export default function CreateProductPage() {
  return (
    <LayoutPage title="Nuevo producto" rollBack>
      <div className="create-product-page">
        <h1>Create Product Page</h1>
      </div>
    </LayoutPage>
  )
}
