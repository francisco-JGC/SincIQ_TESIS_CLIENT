import { AlertDialogModal } from '@/components/AlertDialog'
import { CButon } from '@/components/CButon'
import { CInput } from '@/components/CInput'
import { createOrder } from '@/services/orders'
import { formatPrice } from '@/utils/formatPrice'
import { toast } from 'sonner'

interface IProps {
  reset: () => void
  values: any
}

export const ManageTotals = ({ values, reset }: IProps) => {
  const handleSell = async () => {
    toast.loading('Realizando venta...')
    const id_products = values.products.map((product: any) => product.id)

    const data = {
      client_name: values.customer.name,
      phone_number: values.customer.phone,
      id_products,
      total_price: values.total,
    }

    const response = await createOrder(data)

    toast.dismiss()

    if (response.success) {
      toast.success('Venta realizada con éxito')
      reset()
    } else {
      toast.error('Error al realizar la venta')
    }
  }

  return (
    <div className="flex gap-6 justify-end items-center">
      <div>
        <span className="text-lg font-bold">
          TOTAL: {formatPrice(values.total)}
        </span>
      </div>

      <AlertDialogModal
        onConfirm={handleSell}
        title="Vender"
        description="Confirma que deseas vender los productos seleccionados?"
      >
        <CButon props={{}}>Vender</CButon>
      </AlertDialogModal>
    </div>
  )
}
