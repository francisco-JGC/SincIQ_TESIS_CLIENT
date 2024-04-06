'use client'
import './index.scss'

import { LayoutPage } from '@/components/LayoutPage'
import { Content } from '@/components/Content'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import dollarIcon from '@/assets/icons/dollar.svg'
import { useEffect, useRef, useState } from 'react'
import { RenderUploadImage } from './components/RenderUploadImage'
import { AlertDialogModal } from '@/components/AlertDialog'
import { CButon } from '@/components/CButon'
import { Category, useCategoriesStore } from '@/store/categories/categories'
import { getCategories } from '@/services/category'
import { Modal } from '@/components/Modal'
import plus_circleIcon from '@/assets/icons/plus_circle.svg'
import { NewCategory } from './components/NewCategory'
import { toast } from 'sonner'
import { addProduct } from '@/services/product'

const INPUTS_STYLES: React.CSSProperties = {
  background: '#1a1527',
  fontWeight: '500',
}

export default function CreateProductPage() {
  const initialValues = {
    name: '',
    price: 0,
    gender: '',
    description: '',
    category: '',
    discount: '0',
    quantity: '',
    visibility: true,
    state: 'nuevo',
    uploadImg1: '',
    uploadImg2: '',
    uploadImg3: '',
  }

  const [image1, setImage1] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [image3, setImage3] = useState<File | null>(null)

  const { values, handleInputChange, handleSelectChange, reset } =
    useForm(initialValues)

  const refImag1 = useRef<HTMLInputElement | null>(null)
  const refImag2 = useRef<HTMLInputElement | null>(null)
  const refImag3 = useRef<HTMLInputElement | null>(null)

  const [loading, setLoading] = useState(false)

  const categoriesStore = useCategoriesStore((state) => state.categories)
  const addCategory = useCategoriesStore((state) => state.addCategory)

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

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, checked } = e.target

    handleInputChange({ name, value: checked })
  }

  const handleSubmit = async () => {
    if (
      !values.name ||
      !values.category ||
      !values.gender ||
      !values.uploadImg1 ||
      !values.discount ||
      !values.state
    ) {
      toast.error('Error al crear el producto', {
        description: 'Todos los campos son obligatorios.',
      })
      return
    }

    if (
      values.price <= 0 ||
      values.quantity <= 0 ||
      values.discount < 0 ||
      values.discount > 100
    ) {
      toast.error('Error al crear el producto', {
        description:
          'El precio, la cantidad y el descuento deben ser mayores a 0.',
      })
      return
    }

    setLoading(true)

    const response = await addProduct(values)

    if (response.success) {
      toast.success('Producto creado correctamente', {
        description: 'El producto se ha creado correctamente.',
      })

      reset()
      setImage1(null)
      setImage2(null)
      setImage3(null)
    } else {
      toast.error('Error al crear el producto', {
        description: response.message,
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    getCategories().then((data) => {
      if (data.success) {
        data.data.forEach((category: Category) => {
          addCategory(category)
        })
      }
    })
  }, [])

  return (
    <LayoutPage
      title="Nuevo producto"
      rollBack
      ActionComponent={() => (
        <ActionComponent handleSubmit={handleSubmit} loading={loading} />
      )}
    >
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
                <option value="" disabled>
                  Seleccione
                </option>
                {categoriesStore.map((category) => (
                  <option
                    key={category.id}
                    value={category.name}
                    selected={category.name === values.category}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <Modal
                title="Nueva categoría de producto"
                nameButton="Crear categoría"
                description="Puedes crear una nueva categoría para el producto."
                Component={() => <NewCategory />}
                buttonStyle={{
                  color: '#5918df',
                  cursor: 'pointer',
                  margin: '1em 0 0 0',
                }}
              />
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
                <option value="" disabled>
                  Seleccione
                </option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <CInput
              label="Precio unitario"
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

            <CInput
              label="Descuento"
              onChange={handleInputChange}
              type="number"
              name="discount"
              value={values.discount}
              icon={dollarIcon}
              inputStyle={INPUTS_STYLES}
              label_style={{
                color: '#9ca3af',
                fontWeight: '700',
                fontSize: '1.1em',
              }}
              className="col-span-1"
            />

            <CInput
              label="Cantidad"
              onChange={handleInputChange}
              type="number"
              name="quantity"
              value={values.quantity}
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
              onChange={(e) => {
                handleInputChange(e.target)
              }}
              placeholder="Detalla las características del producto"
              value={values.description}
            />
          </div>
        </Content>

        <Content
          title="Imágenes del producto"
          className="grid grid-cols-3 gap-4 w-full h-[300px]"
          colorTitle="yellow"
        >
          <RenderUploadImage
            image={image1}
            setImage={setImage1}
            handleSelectImage={() => handleSelectImage(refImag1)}
            refImage={refImag1}
            handleImageChange={handleImageChange}
            handleInputChange={handleInputChange}
            targetName="uploadImg1"
            url={values.uploadImg1}
          />
          <RenderUploadImage
            image={image2}
            setImage={setImage2}
            handleSelectImage={() => handleSelectImage(refImag2)}
            refImage={refImag2}
            handleImageChange={handleImageChange}
            handleInputChange={handleInputChange}
            targetName="uploadImg2"
            url={values.uploadImg2}
          />
          <RenderUploadImage
            image={image3}
            setImage={setImage3}
            handleSelectImage={() => handleSelectImage(refImag3)}
            refImage={refImag3}
            handleImageChange={handleImageChange}
            handleInputChange={handleInputChange}
            targetName="uploadImg3"
            url={values.uploadImg3}
          />
        </Content>

        <Content
          title="Visibilidad del producto"
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-[300px]">
            <label
              htmlFor="state"
              className="block text-gray-400 font-bold mt-2"
            >
              Estado del producto <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              id="state"
              onChange={handleSelectChange}
              value={values.state}
              style={INPUTS_STYLES}
              className="p-2 mt-2 w-full bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado - Semi nuevo">Usado - Semi nuevo</option>
              <option value="Usado - Buen estado">Usado - Buen estado</option>
              <option value="Usado - aceptable">Usado - aceptable</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="visibility"
              id="visibility"
              onChange={handleCheckedChange}
              checked={values.visibility}
              className="w-5 h-5 bg-gray-800 rounded focus:outline-none border border-gray-700 transition duration-500 ease-in-out"
            />
            <label htmlFor="visibility" className="text-gray-400">
              ¿Deseas que el producto sea visible en el catálogo?
            </label>
          </div>
        </Content>
      </div>
    </LayoutPage>
  )
}

const ActionComponent = ({
  handleSubmit,
  loading,
}: {
  handleSubmit: () => void
  loading: boolean
}) => (
  <AlertDialogModal
    nameButton="Crear producto"
    title="¿Estás seguro de crear este producto?"
    description="Asegúrate de que la información sea correcta antes de crear el producto."
    onConfirm={handleSubmit}
  >
    <CButon
      icon={plus_circleIcon}
      poisition_icon="right"
      loading_mode={loading}
    >
      Crear producto
    </CButon>
  </AlertDialogModal>
)
