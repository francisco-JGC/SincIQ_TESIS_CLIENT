'use client'
import { ListSales } from './components/listSales'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { getSaleOrders } from '@/services/orders'
import { useEffect, useState } from 'react'
import type { IProduct } from '@/store/products/products'
import { toast } from 'sonner'
import { Badges } from './components/badges'

export interface ISale {
  id: number
  state: 'waiting' | 'cancelled' | 'completed'
  client_name?: string
  phone_number?: string
  total_price: number
  createdAt: string
  products: IProduct[]
}

export interface IOrderSale {
  orders: ISale[]
  income: {
    total_sales: number
    total_products: number
    total_clients: number
  }
}

export default function SalesPage() {
  const [sales, setSales] = useState<IOrderSale>({
    orders: [],
    income: { total_sales: 0, total_products: 0, total_clients: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSaleOrders()
      .then((data) => {
        if (data) {
          setSales(data.data)
        } else {
          toast.error('No se pudo obtener la información de las ventas')
        }
      })
      .catch((error) => {
        toast.error('No se pudo obtener la información de las ventas')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <LayoutPage title="Registros de ventas" className="flex flex-col gap-4">
      <Badges sales={sales} />
      <ListSales sales={sales.orders} loading={loading} />
    </LayoutPage>
  )
}
