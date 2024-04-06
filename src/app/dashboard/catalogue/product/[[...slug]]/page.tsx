import { LayoutPage } from '@/components/LayoutPage'

export interface IProps {
  params: {
    slug: string[]
  }
}

export default function ProductPage({ params }: IProps) {
  let [productName, id] = params.slug
  productName = productName.replace(/_/g, ' ')

  return (
    <LayoutPage title="Detalles de producto">
      <h1>{productName}</h1>
      <p>{id}</p>
    </LayoutPage>
  )
}
