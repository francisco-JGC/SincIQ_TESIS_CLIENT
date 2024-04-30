'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import xIcon from '@/assets/icons/x.svg'
import type { IProduct } from '@/store/products/products'
import { Modal } from '@/components/Modal'
import { ListProduct } from './component/listProduct'
import Image from 'next/image'
import { CButon } from '@/components/CButon'
import { formatPrice } from '@/utils/formatPrice'
import { toast } from 'sonner'
import { ManageTotals } from './component/manageTotals'

export default function SalesPage() {
  const { values, handleInputChange, reset, setValues } = useForm({
    products: [] as IProduct[],
    customer: {
      name: '',
      phone: '',
    },
    total: 0,
  })

  const handleAddProduct = (product: IProduct) => {
    const existingProduct = values.products.find(
      (p: any) => p.id === product.id,
    )

    if (existingProduct) {
      return toast('Ya has agregado este producto')
    }

    const newProducts = values.products.concat(product)

    const total = newProducts.reduce(
      (acc: number, product: IProduct) =>
        acc +
        product.price * product.quantity -
        product.price * product.quantity * (product.discount / 100),
      0,
    )

    setValues({
      ...values,
      products: newProducts,
      total,
    })
  }

  const handleRemoveProduct = (index: number) => {
    const newProducts = values.products.filter((_: any, i: any) => i !== index)

    const total = newProducts.reduce(
      (acc: number, product: IProduct) =>
        acc +
        product.price * product.quantity -
        product.price * product.quantity * (product.discount / 100),
      0,
    )
    setValues({
      ...values,
      products: newProducts,
      total,
    })
  }

  const handleSetQuantity = (index: number, quantity: number) => {
    const newProducts = values.products.map((product: any, i: any) => {
      if (i === index) {
        return {
          ...product,
          quantity,
          sub_total: product.price * quantity,
        }
      }

      return product
    })

    const total = newProducts.reduce(
      (acc: number, product: IProduct) =>
        acc +
        product.price * product.quantity -
        product.price * product.quantity * (product.discount / 100),
      0,
    )

    setValues({
      ...values,
      products: newProducts,
      total,
    })
  }

  return (
    <LayoutPage
      title="Registrar Nueva Venta"
      ActionComponent={() => <ManageTotals values={values} reset={reset} />}
    >
      <div className="sales-page">
        <div className="flex gap-4 mb-4">
          <CInput
            label="Nombre del Cliente (Opcional)"
            name="customer.name"
            value={values.customer.name}
            onChange={handleInputChange}
            className="w-1/2"
          />
          <CInput
            label="Teléfono del Cliente (Opcional)"
            name="customer.phone"
            value={values.customer.phone}
            onChange={handleInputChange}
            className="w-1/2"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <Modal
              title="Agregar Producto"
              Component={() => (
                <ListProduct handleAddProduct={handleAddProduct} />
              )}
            >
              <h2
                className="text-xl
                font-bold
                text-center
                cursor-pointer
                text-[#09f]
              "
              >
                Seleccionar productos
              </h2>
            </Modal>
          </div>

          <div className="table-container">
            <table className="table-products">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Descuento</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {values.products.map((product: IProduct, index: any) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <CInput
                        type="number"
                        name="quantity"
                        value={product.quantity.toString()}
                        onChange={(e) =>
                          handleSetQuantity(index, parseInt(e.value))
                        }
                        min={1}
                      />
                    </td>
                    <td>{product.discount} %</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>
                      {formatPrice(
                        product.price * product.quantity -
                          product.price *
                            product.quantity *
                            (product.discount / 100),
                      )}
                    </td>
                    <td className="delete">
                      <button onClick={() => handleRemoveProduct(index)}>
                        <Image src={xIcon} alt="x" width={16} height={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}
