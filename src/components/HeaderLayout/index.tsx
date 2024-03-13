'use client'
import './index.scss'

import { CInput } from '../CInput'
import { useState } from 'react'
import searchIcon from '@/assets/icons/search_icon.svg'
import bellIcon from '@/assets/icons/bell_icon.svg'
import chatIcon from '@/assets/icons/chat_icon.svg'
import Image from 'next/image'
import { CSheet } from '../CSheet'
import { useSession, signOut } from 'next-auth/react'
import ChatRoom from '../ChatRoom'

import { useEffect } from 'react'
import { useSocket } from '@/context/SocketProvider'

export const HeaderLayout = () => {
  const [search, setSearch] = useState('')
  const { data: session } = useSession()
  const { socket } = useSocket()

  const handleSearch = (e: any) => {
    setSearch(e.value)
  }

  useEffect(() => {
    const receiveMessageHandler = (message: string) => {
      console.log('recibido', message)
    }

    const sendMessageHandler = (message: string) => {
      console.log('enviado', message)
    }

    if (socket) {
      socket.on('server:receive-message', receiveMessageHandler)
      socket.on('server:sending-message', sendMessageHandler)
    }

    // cleanup
    return () => {}
  }, [socket])

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

        <CSheet
          title=""
          Component={<ChatRoom />}
          styles={{
            width: '800px',
          }}
        >
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
            <Image
              src={session?.user?.image || ''}
              alt="Avatar"
              width={40}
              height={40}
            />
            <p>
              <span>{session?.user?.name}</span>
              <small>Bienvenido/a</small>
            </p>
          </div>
        </CSheet>
      </div>
    </section>
  )
}
