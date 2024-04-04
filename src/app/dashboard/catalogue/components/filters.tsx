import { CInput } from '@/components/CInput'
import type { Category } from '@/store/categories/categories'
import searchIcon from '@/assets/icons/search_icon.svg'
import dollarIcon from '@/assets/icons/dollar.svg'

import { useState } from 'react'
import { useForm } from '@/hooks/useForm'

interface IFilters {
  categories: Category[]
}
export const Filters = ({ categories }: IFilters) => {
  const [search, setSearch] = useState('')
  const { values, handleInputChange } = useForm({
    min: 0,
    max: 0,
  })

  const handleSearch = (e: any) => {
    setSearch(e.value)
  }

  return (
    <div className="filters">
      <h2>Filtros</h2>

      <div className="search">
        <CInput
          type="text"
          value={search}
          placeholder="Buscar nombre de producto"
          onChange={handleSearch}
          icon={searchIcon}
          name="search"
          className="search__input"
        />
      </div>

      <div className="min-max">
        <CInput
          type="number"
          value={values.min}
          placeholder="Min: 0"
          onChange={handleInputChange}
          icon={dollarIcon}
          name="min"
        />
        <CInput
          type="number"
          value={values.max}
          placeholder="Max: 0"
          onChange={handleInputChange}
          icon={dollarIcon}
          name="max"
        />
      </div>

      <div className="categories">
        <h2 className="my-4">Categorias</h2>
        {categories.map((category) => (
          <div key={category.id} className="category">
            <input
              type="checkbox"
              id={category.name}
              name={category.name}
              value={category.id}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
