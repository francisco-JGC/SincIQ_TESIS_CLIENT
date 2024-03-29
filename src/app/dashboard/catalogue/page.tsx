'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { Modal } from '@/components/Modal'
import { UpdateStore } from './components/updateStore'
import { CButon } from '@/components/CButon'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getCatalogue } from '@/services/catalogue'
import { toast } from 'sonner'
import loadingIcon from '@/assets/icons-animated/tube-spinner.svg'

interface ICatalogue {
  id: number
  name: string
  description?: string
  banner?: string
}

export default function CataloguePage() {
  const [catalogue, setCatalogue] = useState<ICatalogue>({} as ICatalogue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCatalogue().then((response) => {
      if (response.success) {
        setCatalogue(response.data[0])
      } else {
        toast('Parece que aun no tienes una tienda configurada')
      }
    })
    setLoading(false)
  }, [])

  return (
    <LayoutPage>
      <section className=" w-full flex justify-center items-center flex-col">
        <div className="h-[250px] w-full flex">
          <Image
            src={catalogue.banner || ''}
            alt="Banner"
            className="w-full h-full object-cover rounded bg-gray-300"
            width={1000}
            height={1000}
          />
        </div>

        <div className="flex w-full justify-center flex-col items-center gap-2 mt-4">
          {loading ? (
            <Image src={loadingIcon} alt="Loading" width={40} height={40} />
          ) : (
            <>
              <h2 className="text-2xl font-bold">
                {catalogue.name || 'Sin nombre'}
              </h2>
              <p className="text-gray-400 text-center">
                {catalogue.description || 'Sin descripción'}
              </p>
            </>
          )}
        </div>

        <div className="w-full flex justify-center gap-4 mt-4">
          <Modal
            Component={() => (
              <UpdateStore state={catalogue} setState={setCatalogue} />
            )}
            className="mt-4"
          >
            <CButon>Actualizar información</CButon>
          </Modal>
        </div>
      </section>
    </LayoutPage>
  )
}
