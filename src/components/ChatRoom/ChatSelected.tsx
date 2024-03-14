import Image from 'next/image'
import { Client } from '@/store/messages/clientsStore'
import icon_user from '@/assets/img/icon_user.png'
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
import { TextMessage } from '../TypeMessages/Text'

interface IChatSelectedProps {
  setSelectedClient: (client: Client | undefined) => void
  selectedClient: Client | undefined
  actionChat: (client: Client) => void
  arrowIcon: string
}

export const ChatSelected = ({
  setSelectedClient,
  selectedClient,
  actionChat,
  arrowIcon,
}: IChatSelectedProps) => {
  return (
    <>
      <div className="chat-room__messages__header">
        <button
          onClick={() => setSelectedClient(undefined)}
          className="close_button"
        >
          <Image src={arrowIcon} alt="close" width={24} height={24} />

          <Image
            src={selectedClient?.image_url || icon_user}
            alt="user"
            width={50}
            height={50}
          />
          <span>{selectedClient?.username}</span>
        </button>

        <ActionChat client={selectedClient as Client} />
      </div>
      <div className="chat-room__messages__content">
        {selectedClient?.conversations.map((conversation) => {
          return conversation.messages.map((message) => {
            return <TextMessage key={message.id} message={message} />
          })
        })}
      </div>
    </>
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
