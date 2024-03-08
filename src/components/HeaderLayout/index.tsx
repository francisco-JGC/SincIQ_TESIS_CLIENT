'use client'
import './index.scss'

import { CInput } from '../CInput'
import { useState } from 'react'
import searchIcon from '@/assets/icons/search_icon.svg'
import bellIcon from '@/assets/icons/bell_icon.svg'
import chatIcon from '@/assets/icons/chat_icon.svg'
import malobFoto from '@/assets/img/malob.jpg'
import Image from 'next/image'
import { CSheet } from '../CSheet'

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
          className="search__input"
        />
      </div>
      <div className="user">
        <div className="user__notifications" data-count="3" data-active="true">
          <Image
            src={bellIcon}
            typeof="svg"
            alt="Notificaciones"
            width={24}
            height={24}
          />
        </div>

        <CSheet title="Mensajes" position="right">
          <div className="user__chat" data-count="9" data-active="true">
            <Image
              src={chatIcon}
              typeof="svg"
              alt="Chat"
              width={24}
              height={24}
            />
          </div>
        </CSheet>

        <CSheet title="Perfil" position="right">
          <div className="user__info">
            <Image src={malobFoto} alt="Avatar" width={40} height={40} />
            <p>
              <span>Bertha Garcia</span>
              <small>Bienvenida</small>
            </p>
          </div>
        </CSheet>
      </div>
    </section>
  )
}
