import { CInput } from '@/components/CInput'
import type { Category } from '@/store/categories/categories'
import searchIcon from '@/assets/icons/search_icon.svg'
import dollarIcon from '@/assets/icons/dollar.svg'

interface IFilters {
  categories: Category[]
  search: string
  handleSearch: (e: any) => void
  minmax: {
    min: string
    max: string
  }
  handleInputChange: (e: any) => void
  handleCategories: (e: any) => void
}
export const Filters = ({
  categories,
  search,
  handleSearch,
  minmax,
  handleInputChange,
  handleCategories,
}: IFilters) => {
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
          value={minmax.min}
          placeholder="Min: 0"
          onChange={handleInputChange}
          icon={dollarIcon}
          name="min"
        />
        <CInput
          type="number"
          value={minmax.max}
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
              value={category.name}
              onChange={(e) => handleCategories(e.target)}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
