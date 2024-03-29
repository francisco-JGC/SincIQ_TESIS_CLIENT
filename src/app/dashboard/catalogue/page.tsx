'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { Modal } from '@/components/Modal'
import { UpdateStore } from './components/updateStore'
import { CButon } from '@/components/CButon'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getCatalogue } from '@/services/catalogue'
import { toast } from 'sonner'

interface ICatalogue {
  id: string
  name: string
  description?: string
  banner?: string
}

export default function CataloguePage() {
  const [catalogue, setCatalogue] = useState<ICatalogue>({} as ICatalogue)

  useEffect(() => {
    toast.loading('Cargando información de la tienda', {
      description: 'Espere un momento',
    })

    getCatalogue()
      .then((response) => {
        if (response.success) {
          setCatalogue(response.data)
        } else {
          toast('Parece que aun no tienes una tienda configurada')
        }
      })
      .finally(() => toast.dismiss())
  }, [])

  const dafaultCatalogue: ICatalogue = {
    id: '',
    name: 'SyncIQ Store',
    description:
      'Tienda de productos de tecnología y accesorios para dispositivos móviles y computadoras personales.',
    banner: '',
  }

  return (
    <LayoutPage>
      <section className=" w-full flex justify-center items-center flex-col">
        <div className="h-[250px] w-full flex">
          <Image
            src=""
            alt="Banner"
            className="w-full h-full object-cover rounded bg-gray-300"
            width={100}
            height={100}
          />
        </div>

        <div className="flex w-full justify-center flex-col items-center gap-2 mt-4">
          <h2 className="text-2xl font-bold">
            {catalogue.name || dafaultCatalogue.name}
          </h2>
          <p className="text-gray-400 text-center">
            {catalogue.description || dafaultCatalogue.description}
          </p>
        </div>

        <div className="w-full flex justify-center gap-4 mt-4">
          <Modal Component={() => <UpdateStore />} className="mt-4">
            <CButon>Actualizar información</CButon>
          </Modal>
        </div>
      </section>
    </LayoutPage>
  )
}
