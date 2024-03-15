import Image from 'next/image'
import { Client } from '@/store/messages/clientsStore'
import icon_user from '@/assets/img/icon_user.png'
import send_message from '@/assets/icons/send_message.svg'
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
import { CInput } from '../CInput'
import { useForm } from '@/hooks/useForm'

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
  const { values, handleInputChange } = useForm({
    message: '',
  })

  const handleSendMessage = async () => {
    console.log('send message')
  }

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
      <div
        className="chat-room__messages__content"
        ref={(el) => {
          if (el) {
            el.scrollTop = el.scrollHeight
          }
        }}
        style={{
          height: 'calc(100lvh - 70px - 70px)',
        }}
      >
        {selectedClient?.conversations.map((conversation) => {
          return conversation.messages.map((message, index) => {
            return (
              <TextMessage
                key={index}
                message={message}
                id={`message-${index}`}
              />
            )
          })
        })}
      </div>
      <form
        className="chat-room__messages__footer"
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
      >
        <CInput
          type="text"
          placeholder="Escribe un mensaje"
          className="input-message"
          name="message"
          value={values.message}
          onChange={handleInputChange}
          icon={send_message}
          autocomplete="off"
          onClickIcon={handleSendMessage}
        />
      </form>
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