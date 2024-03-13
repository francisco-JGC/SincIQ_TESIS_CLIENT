import './index.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import notificationsIcon from '@/assets/icons/notifications.svg'
import { Switch } from '../Switch'
import { useState } from 'react'

export default function ChatRoom() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<boolean>(true)

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

        <div className="chat-room__contacts__chats"></div>
      </section>
      <section className="chat-room__messages"></section>
    </div>
  )
}
