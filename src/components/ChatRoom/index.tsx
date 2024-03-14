import './index.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import icon_user from '@/assets/img/icon_user.png'
import arrowIcon from '@/assets/icons/arrow_right.svg'
import notificationsIcon from '@/assets/icons/notifications.svg'
import { Switch } from '../Switch'
import { useEffect, useState } from 'react'
import { Client, useClientsStore } from '@/store/messages/clientsStore'
import { momentDate } from '@/utils/momentDate'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { ChatSelected } from './ChatSelected'

export default function ChatRoom() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<boolean>(true)
  const clients = useClientsStore((state) => state.clients)

  const [selectedClient, setSelectedClient] = useState<Client>()

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
                    <span>{momentDate(client.lastMessage[0].timestamp)}</span>
                  </div>
                  <small>{client.lastMessage[0].content}</small>
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
          actionChat={(client) => console.log('Action Chat', client)}
          arrowIcon={arrowIcon}
        />
      </section>
    </div>
  )
}

interface IActionsChat {
  client: Client
}

export const ActionChat = ({ client }: IActionsChat) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-[#100e17] border border-[#3a3a3a] rounded-md p-2"
        align="end"
        style={{
          backgroundColor: '#100e17',
          padding: '1em',
          borderRadius: '10PX',
        }}
      >
        {/* <DropdownMenuLabel>Acciones</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Actualizar perfil</DropdownMenuItem>
        <DropdownMenuItem>Archivos compartidos</DropdownMenuItem>
        <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
        <DropdownMenuItem>Desactivar BOT</DropdownMenuItem>
        <DropdownMenuItem>Vaciar chat</DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
