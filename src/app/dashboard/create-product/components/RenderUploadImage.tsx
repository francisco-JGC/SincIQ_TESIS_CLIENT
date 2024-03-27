import Image from 'next/image'
import xIcon from '@/assets/icons/x.svg'
import galeryIcon from '@/assets/icons/galery.svg'

interface IRenderUploadImage {
  image: File | null
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  handleSelectImage: (ref: React.RefObject<HTMLInputElement>) => void
  refImag: React.RefObject<HTMLInputElement>
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
  ) => void
}

export const RenderUploadImage = ({
  image,
  setImage,
  handleSelectImage,
  refImag,
  handleImageChange,
}: IRenderUploadImage) => {
  return (
    <div
      className="cursor-pointer w-full h-[300px] bg-gray-800 rounded flex justify-center items-center"
      onClick={() => handleSelectImage(refImag)}
      style={{
        backgroundImage: image ? `url(${URL.createObjectURL(image)})` : '',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {image && (
        <div
          className="absolute top-2 right-2 w-[30px] h-[30px] p-1 rounded-full cursor-pointer flex items-center justify-center bg-gray-300"
          onClick={(e) => {
            e.stopPropagation()
            setImage(null)
          }}
        >
          <Image src={xIcon} alt="galery" />
        </div>
      )}
      <input
        type="file"
        ref={refImag}
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
