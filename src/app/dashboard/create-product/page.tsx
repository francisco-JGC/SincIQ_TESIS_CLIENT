'use client'
import './index.scss'

import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import dollarIcon from '@/assets/icons/dollar.svg'
import galeryIcon from '@/assets/icons/galery.svg'
import xIcon from '@/assets/icons/x.svg'
import Image from 'next/image'
import { useRef, useState } from 'react'

const INPUTS_STYLES: React.CSSProperties = {
  background: '#1a1527',
  fontWeight: '500',
}

export default function CreateProductPage() {
  const initialValues = {
    name: '',
    category: '',
    price: '',
    stock: '',
  }

  const [image1, setImage1] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [image3, setImage3] = useState<File | null>(null)

  const { values, handleInputChange, handleSelectChange } =
    useForm(initialValues)

  const refImag1 = useRef<HTMLInputElement | null>(null)
  const refImag2 = useRef<HTMLInputElement | null>(null)
  const refImag3 = useRef<HTMLInputElement | null>(null)

  const handleSelectImage = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click()
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: any,
  ) => {
    console.log(e.target.files)
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  return (
    <LayoutPage title="Nuevo producto" rollBack>
      <div className="grid grid-cols-1 gap-4 w-full">
        <Content
          title="Información básico"
          className="flex flex-col gap-6 w-full"
        >
          <CInput
            label="Nombre del producto"
            onChange={handleInputChange}
            type="text"
            name="name"
            value={values.name}
            inputStyle={INPUTS_STYLES}
            label_style={{
              color: '#9ca3af',
              fontWeight: '700',
              fontSize: '1.1em',
            }}
            required
            autocomplete="off"
          />

          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="col-span-1">
              <label
                htmlFor="category"
                className="block text-gray-400 font-bold mt-2"
              >
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                id="category"
                onChange={handleSelectChange}
                value={values.category}
                style={INPUTS_STYLES}
                className="p-2 mt-2 w-full bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Hogar">Hogar</option>
                <option value="Moda">Moda</option>
                <option value="Deportes">Deportes</option>
                <option value="Mascotas">Mascotas</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Libros">Libros</option>
                <option value="Salud y belleza">Salud y belleza</option>
                <option value="Joyería">Joyería</option>
              </select>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="gender"
                className="block text-gray-400 font-bold mt-2"
              >
                Género <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                onChange={handleSelectChange}
                value={values.gender}
                style={INPUTS_STYLES}
                className="p-2 mt-2 w-full bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Ambos">Ambos</option>
              </select>
            </div>

            <CInput
              label="Precio"
              onChange={handleInputChange}
              type="number"
              name="price"
              value={values.price}
              icon={dollarIcon}
              inputStyle={INPUTS_STYLES}
              label_style={{
                color: '#9ca3af',
                fontWeight: '700',
                fontSize: '1.1em',
              }}
              required
              className="col-span-1"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-gray-400 font-bold mt-2"
            >
              Descripión del producto
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full h-[100px] p-2 mt-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-[#5918df] transition duration-300 ease-in-out resize-none"
              style={INPUTS_STYLES}
              onChange={handleInputChange}
              placeholder="Detalla las características del producto"
            />
          </div>
        </Content>

        <Content
          title="Imágenes del producto"
          className="grid grid-cols-3 gap-4 w-full"
          colorTitle="yellow"
        >
          <div
            className="image1 w-full h-[300px] bg-gray-800 rounded flex justify-center items-center"
            onClick={() => handleSelectImage(refImag1)}
            style={{
              backgroundImage: image1
                ? `url(${URL.createObjectURL(image1)})`
                : '',
            }}
          >
            {image1 && (
              <div
                className="absolute top-2 right-2 w-[30px] h-[30px] p-1 rounded-full cursor-pointer flex items-center justify-center bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation()
                  setImage1(null)
                }}
              >
                <Image src={xIcon} alt="galery" />
              </div>
            )}
            <input
              type="file"
              ref={refImag1}
              onChange={(e) => handleImageChange(e, setImage1)}
              className="hidden"
              accept=".jpg, .jpeg, .png"
            />
            {!image1 && <Image src={galeryIcon} alt="galery" />}
          </div>

          <div
            className="image2 w-full h-[300px] bg-gray-800 rounded flex justify-center items-center"
            onClick={() => handleSelectImage(refImag2)}
            style={{
              backgroundImage: image2
                ? `url(${URL.createObjectURL(image2)})`
                : '',
            }}
          >
            {image2 && (
              <div
                className="absolute top-2 right-2 w-[30px] h-[30px] p-1 rounded-full cursor-pointer flex items-center justify-center bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation()
                  setImage2(null)
                }}
              >
                <Image src={xIcon} alt="galery" />
              </div>
            )}
            <input
              type="file"
              ref={refImag2}
              onChange={(e) => handleImageChange(e, setImage2)}
              className="hidden"
              accept=".jpg, .jpeg, .png"
            />
            {!image2 && <Image src={galeryIcon} alt="galery" />}
          </div>

          <div
            className="image3 w-full h-[300px] bg-gray-800 rounded flex justify-center items-center"
            onClick={() => handleSelectImage(refImag3)}
            style={{
              backgroundImage: image3
                ? `url(${URL.createObjectURL(image3 as any)})`
                : '',
            }}
          >
            {image3 && (
              <div
                className="absolute top-2 right-2 w-[30px] h-[30px] p-1 rounded-full cursor-pointer flex items-center justify-center bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation()
                  setImage3(null)
                }}
              >
                <Image src={xIcon} alt="galery" />
              </div>
            )}
            <input
              type="file"
              ref={refImag3}
              onChange={(e) => handleImageChange(e, setImage3)}
              className="hidden"
              accept=".jpg, .jpeg, .png"
            />
            {!image2 && <Image src={galeryIcon} alt="galery" />}
          </div>
        </Content>
      </div>
    </LayoutPage>
  )
}
