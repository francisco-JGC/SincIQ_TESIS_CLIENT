import Image from 'next/image'
import xIcon from '@/assets/icons/x.svg'
import galeryIcon from '@/assets/icons/galery.svg'
import { useEffect, useState } from 'react'
import { uploadProductImage, deleteProductImage } from '@/services/firebase'
import { toast } from 'sonner'
import loadingIcon from '@/assets/icons-animated/tube-spinner.svg'

interface IRenderUploadImage {
  image: File | null
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  handleSelectImage: (ref: React.RefObject<HTMLInputElement>) => void
  refImage: React.RefObject<HTMLInputElement>
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
  ) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  targetName: string
  url: string
}

export const RenderUploadImage = ({
  image,
  setImage,
  handleSelectImage,
  refImage,
  handleImageChange,
  handleInputChange,
  targetName,
  url,
}: IRenderUploadImage) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!image) return
    setLoading(true)

    uploadProductImage(image as File)
      .then((response) => {
        setLoading(false)

        console.log('response', response)

        if (response) {
          handleInputChange({ name: targetName, value: response } as any)

          console.log('image', refImage)
        } else {
          toast.error('Error al subir la imagen', {
            description: 'Intente de nuevo',
          })
        }
      })
      .catch(() => setLoading(false))

    return () => {
      setLoading(false)
    }
  }, [image])

  const handleRemoveImage = async () => {
    setLoading(true)

    deleteProductImage(url)
      .then((response) => {
        setLoading(false)

        if (response) {
          setImage(null)
          handleInputChange({ name: targetName, value: '' } as any)
        } else {
          toast.error('Error al eliminar la imagen', {
            description: 'Intente de nuevo',
          })
        }
      })
      .catch(() => setLoading(false))
  }

  return (
    <div
      className="cursor-pointer w-full h-[300px] bg-gray-800 rounded flex justify-center items-center"
      onClick={() => handleSelectImage(refImage)}
      style={{
        backgroundImage: image ? `url(${URL.createObjectURL(image)})` : '',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {loading && (
        <div className="w-full h-full">
          <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white">
              <Image src={loadingIcon} alt="loading" width={50} height={50} />
            </span>
          </div>
        </div>
      )}
      {image && (
        <div
          className="absolute top-2 right-2 w-[30px] h-[30px] p-1 rounded-full cursor-pointer flex items-center justify-center bg-gray-300"
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveImage()
          }}
        >
          <Image src={xIcon} alt="galery" />
        </div>
      )}
      <input
        type="file"
        ref={refImage}
        onChange={(e) => handleImageChange(e, setImage)}
        className="hidden"
        accept=".jpg, .jpeg, .png"
      />
      {!image && (
        <div className="flex flex-col items-center gap-2">
          <Image src={galeryIcon} alt="galery" />
          <span className="text-gray-400 font-bold">Seleccione</span>
        </div>
      )}
    </div>
  )
}
