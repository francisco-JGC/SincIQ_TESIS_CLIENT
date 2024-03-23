import './index.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import icon_user from '@/assets/img/icon_user.png'
import arrowIcon from '@/assets/icons/arrow_right.svg'
import notificationsIcon from '@/assets/icons/notifications.svg'
import { Switch } from '../Switch'
import { useState } from 'react'
import { Client, useClientsStore } from '@/store/messages/clientsStore'
import { momentDate } from '@/utils/momentDate'
import { ChatSelected } from './ChatSelected'
import { toast } from 'sonner'
import {
  changeBotStatus,
  clearConversationFromClient,
} from '@/services/clients'

export default function ChatRoom() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<boolean>(true)
  const clients = useClientsStore((state) => state.clients)
  const clearConversationFromClientStorage = useClientsStore(
    (state) => state.clearConversationFromClientStorage,
  )

  const [selectedClient, setSelectedClient] = useState<Client>()

  const handleChangeBotStatus = async () => {
    toast.loading(
      `${selectedClient?.bot_status ? 'Desactivando' : 'Activando'} BOT`,
      {
        description: 'Por favor espere...',
      },
    )
    const response = await changeBotStatus(
      selectedClient?.id as number,
      !selectedClient?.bot_status,
    )

    toast.dismiss()

    if (response.status) {
      setSelectedClient((prev: any) => {
        return {
          ...prev,
          bot_status: !prev?.bot_status,
        }
      })
      toast.success('BOT actualizado correctamente')
    } else {
      toast.error('Error al actualizar el BOT')
    }
  }

  const handleClearConversation = async () => {
    toast.loading('Limpiando conversación', {
      description: 'Por favor espere...',
    })

    const response = await clearConversationFromClient(
      selectedClient?.id as number,
    )

    toast.dismiss()

    if (response.success) {
      clearConversationFromClientStorage(selectedClient?.id as number)
      toast.success('Conversación limpiada correctamente')
    } else {
      toast.error('Error al limpiar la conversación')
    }
  }

  return (
    <div className="chat-room-container">
      <section className="chat-room__contacts">
        <header className="chat-room__contacts__header">
          <Image
            src={session?.user?.image as string}
            alt="user"
            width={50}
            height={50}
          />

          <div>
            <h3>{session?.user?.name}</h3>
            <small>En línea</small>
          </div>
        </header>

        <div className="chat-room__contacts__notifications">
          <Image
            src={notificationsIcon}
            alt="Notificaciones"
            width={24}
            height={24}
          />

          <Switch
            value={notifications}
            onToggle={() => setNotifications(!notifications)}
            label="Notificaciones"
          />
        </div>

        <div className="chat-room__contacts__chats">
          <h3>CHATS</h3>
          <div className="chat-room__contacts__chats__clients">
            {clients.length < 1 && (
              <p className="mt-8 font-semibold text-center">
                ¡ Parece que aun no tienes clientes !
              </p>
            )}
            {clients.map((client, index) => (
              <div
                key={index}
                className="chat-room__contacts__chats__chat__item"
                onClick={() => setSelectedClient(client)}
                data-new-message={client.conversations[0]?.seen}
              >
                <Image
                  src={client.image_url || icon_user}
                  alt="user"
                  width={50}
                  height={50}
                />
                <div className="chat-room__contacts__chats__chat__item__info">
                  <div className="chat-room__contacts__chats__chat__item__info__header">
                    <h4>{client.username} </h4>
                    {client.lastMessage[0]?.created_at && (
                      <span>
                        {momentDate(client.lastMessage[0]?.created_at)}
                      </span>
                    )}
                  </div>
                  <small>{client.lastMessage[0]?.content}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className={`chat-room__messages ${selectedClient ? 'active' : ''}`}
      >
        <ChatSelected
          setSelectedClient={setSelectedClient}
          selectedClient={selectedClient}
          arrowIcon={arrowIcon}
          handleChangeBotStatus={handleChangeBotStatus}
          handleClearConversation={handleClearConversation}
        />
      </section>
    </div>
  )
}
