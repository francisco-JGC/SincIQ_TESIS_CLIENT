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
import {
  Client,
  ISocketMessage,
  useClientsStore,
} from '@/store/messages/clientsStore'
import { getClients } from '@/services/clients'
import { shallow } from 'zustand/shallow'

export const HeaderLayout = () => {
  const [search, setSearch] = useState('')
  const { data: session } = useSession()
  const { socket } = useSocket()

  const clients = useClientsStore((state) => state.clients)
  const addClients = useClientsStore((state) => state.addClient)
  const searchClient = useClientsStore((state) => state.searchClient)
  const setMessageToClientConversation = useClientsStore(
    (state) => state.setMessageToClientConversation,
  )

  const handleSearch = (e: any) => {
    setSearch(e.value)
  }

  useEffect(() => {
    const receiveMessageHandler = (message: ISocketMessage) => {
      console.log('recibido', message)

      setMessageToClientConversation(message.client.phone_number, {
        id: 0,
        content: message.message,
        timestamp: new Date().toISOString(),
        sender: message.message_by,
        receiver: message.client.phone_number,
      })
    }

    const sendMessageHandler = (message: ISocketMessage) => {
      console.log('enviado', message)

      setMessageToClientConversation(message.client.phone_number, {
        id: 0,
        content: message.message,
        timestamp: new Date().toISOString(),
        sender: message.message_by,
        receiver: message.client.phone_number,
      })
    }

    if (socket) {
      socket.on('server:receive-message', receiveMessageHandler)
      socket.on('server:sending-message', sendMessageHandler)
    }

    // cleanup
    return () => {}
  }, [setMessageToClientConversation, socket])

  useEffect(() => {
    console.log('clients', clients)

    if (clients.length < 1) {
      getClients().then((data) => {
        if (data) {
          data.data.forEach((client: Client) => {
            const isClient = searchClient(client.id)

            if (!isClient) {
              addClients(client)
            }
          })
        }
      })
    }
  }, [])

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
