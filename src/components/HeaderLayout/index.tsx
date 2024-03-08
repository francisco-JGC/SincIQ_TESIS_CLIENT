'use client'
'./index.scss'
import { CInput } from '../CInput'
import { useState } from 'react'
import searchIcon from '@/assets/icons/search_icon.svg'

export const HeaderLayout = () => {
  const [search, setSearch] = useState('')

  const handleSearch = (e: any) => {
    setSearch(e.value)
  }

  return (
    <section className="header-container">
      <div className="search">
        <CInput
          type="text"
          value={search}
          placeholder="Buscar un cliente"
          onChange={handleSearch}
          icon={searchIcon}
          name="search"
        />
      </div>
      <div className="user"></div>
    </section>
  )
}
