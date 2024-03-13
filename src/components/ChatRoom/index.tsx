import './index.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import icon_user from '@/assets/img/icon_user.png'
import notificationsIcon from '@/assets/icons/notifications.svg'
import { Switch } from '../Switch'
import { useEffect, useState } from 'react'
import { useClientsStore } from '@/store/messages/clientsStore'

export default function ChatRoom() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<boolean>(true)
  const clients = useClientsStore((state) => state.clients)

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
          <h3>MENSAJES</h3>
          <div className="chat-room__contacts__chats__chat">
            {clients.length < 1 && (
              <p className="mt-8 font-semibold text-center">
                ¡ Parece que aun no tienes clientes !
              </p>
            )}
            {clients.map((client, index) => (
              <div
                key={index}
                className="chat-room__contacts__chats__chat__item"
              >
                <Image
                  src={client.image_url || icon_user}
                  alt="user"
                  width={50}
                  height={50}
                />
                <div>
                  <h4>{client.username}</h4>
                  <small>{client.lastMessage[0].content}</small>
                </div>

                <div className="chat-room__contacts__chats__chat__item__info">
                  <small>{client.lastMessage[0].timestamp}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="chat-room__messages"></section>
    </div>
  )
}
