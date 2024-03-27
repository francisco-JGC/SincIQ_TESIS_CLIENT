import { CButon } from '@/components/CButon'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { addCategory } from '@/services/category'
import { useCategoriesStore } from '@/store/categories/categories'
import { useState } from 'react'
import { toast } from 'sonner'
import plus_circleIcon from '@/assets/icons/plus_circle.svg'

export const NewCategory = () => {
  const initialValues = {
    name: '',
    description: '',
  }

  const { values, handleInputChange } = useForm(initialValues)
  const [loading, setLoading] = useState(false)

  const addCategoryStore = useCategoriesStore((state) => state.addCategory)

  const handleSubmit = async () => {
    if (!values.name || !values.description)
      return toast('Todos los campos son requeridos')

    setLoading(true)

    const response = await addCategory({
      name: values.name,
      description: values.description,
    })

    setLoading(false)
    toast.dismiss()

    if (response.success) {
      addCategoryStore(response.data)
      toast.success('Categoría creada correctamente')
    } else {
      toast.error('Error al crear la categoría', {
        description: response.details,
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <CInput
        label="Nombre"
        name="name"
        value={values.name}
        onChange={handleInputChange}
        inputStyle={{
          background: '#1a1527',
          fontWeight: '500',
        }}
        autocomplete="off"
        required
      />
      <CInput
        label="Descripción"
        name="description"
        value={values.description}
        onChange={handleInputChange}
        inputStyle={{
          background: '#1a1527',
          fontWeight: '500',
        }}
        autocomplete="off"
        required
      />

      <div>
        <CButon
          props={{ onClick: handleSubmit }}
          loading_mode={loading}
          poisition_icon="right"
          icon={plus_circleIcon}
        >
          Crear
        </CButon>
      </div>
    </div>
  )
}
