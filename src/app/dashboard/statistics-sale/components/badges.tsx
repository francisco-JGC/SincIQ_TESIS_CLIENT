import { Badge } from '@/components/Badge'
import { IOrderSale } from '../page'
import { formatPrice } from '@/utils/formatPrice'

interface IProps {
  sales: IOrderSale
}

export const Badges = ({ sales }: IProps) => {
  return (
    <div className="badgeds-container mb-12 flex gap-4 justify-center">
      <Badge
        value={formatPrice(sales.income.total_sales)}
        title="Ventas"
        delta="26%"
      />
      <Badge value={sales.orders.length} title="Ventas del mes" delta="12%" />
      <Badge value={sales.income.total_clients} title="Clientes" delta="0" />
      <Badge
        value={sales.income.total_products}
        title="Productos Totales"
        delta="+2"
      />
    </div>
  )
}
