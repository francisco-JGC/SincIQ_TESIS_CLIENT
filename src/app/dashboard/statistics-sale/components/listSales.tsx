import loadingIcon from '@/assets/icons-animated/tube-spinner.svg'
import Image from 'next/image'
import { SaleItem } from './itemSale'
import { ISale } from '../page'

interface IProps {
  sales: ISale[]
  loading: boolean
}

export const ListSales = ({ sales, loading }: IProps) => {
  return (
    <div className="list-sales">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <Image src={loadingIcon} alt="Cargando..." width={50} height={50} />
        </div>
      ) : (
        <>
          <div className="list-sales__table">
            <div className="header grid grid-cols-6 gap-4 p-2 text-black font-bold bg-gray-200">
              <span>ID Venta</span>
              <span>Cantidad de productos</span>
              <span>Total</span>
              <span>Estado</span>
              <span>Fecha</span>
              <span>Opciones</span>
            </div>
            <div className="body">
              {sales.map((sale) => (
                <SaleItem key={sale.id} sale={sale} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
