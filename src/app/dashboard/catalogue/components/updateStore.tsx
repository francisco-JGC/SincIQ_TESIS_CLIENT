'use client'
import { CInput } from '@/components/CInput'
import pencilIcon from '@/assets/icons/pencil.svg'
import { useForm } from '@/hooks/useForm'
import { CButon } from '@/components/CButon'
import { useRef, useState } from 'react'
import { RenderUploadImage } from '../../create-product/components/RenderUploadImage'
import { createOrUpdateCatalogue } from '@/services/catalogue'
import { toast } from 'sonner'

interface ICatalogue {
  state: any
  setState: any
}
export const UpdateStore = ({ state, setState }: ICatalogue) => {
  const initialValues = {
    name: state.name,
    description: state.description,
    banner: state.banner,
  }
  const [banner, setBanner] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const bannerRef = useRef<HTMLInputElement>(null)

  const { values, handleInputChange } = useForm(initialValues)

  const handleSelectImage = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click()
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: any,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const handleSave = async () => {
    setLoading(true)
    const response = await createOrUpdateCatalogue(values)

    if (response.success) {
      toast('Tienda actualizada correctamente')
      setState(response.data)
    } else {
      toast('Ocurrio un error al actualizar la tienda')
    }

    setLoading(false)
  }

  return (
    <section className=" w-full flex justify-center items-center flex-col">
      <div className="h-[200px] w-full flex">
        <RenderUploadImage
          refImage={bannerRef}
          image={banner}
          setImage={setBanner}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSelectImage={() => handleSelectImage(bannerRef)}
          targetName="banner"
          url={values.banner}
          image_style={{
            backgroundSize: 'cover',
          }}
        />
      </div>

      <div className="flex w-full justify-center flex-col items-center gap-2 mt-4">
        <CInput
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="Ej: SyncIQ Store"
        />

        <CInput
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="Ej: La mejor tienda de tecnología"
          className="w-full"
        />

        <CButon
          props={{ onClick: handleSave }}
          loading_mode={loading}
          icon={pencilIcon}
          poisition_icon="left"
        >
          Actualizar catálogo
        </CButon>
      </div>
    </section>
  )
}
