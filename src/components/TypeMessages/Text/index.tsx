import './index.scss'
import { Message } from '@/store/messages/clientsStore'
import { momentDate } from '@/utils/momentDate'

export interface TextMessageProps {
  message: Message
  id: string
}

export const TextMessage = ({ message, id }: TextMessageProps) => {
  return (
    <div
      className="container-text__message"
      data-sender={message.sender}
      id={id}
    >
      <div className="text__message__date" data-sender={message.sender}>
        <small>{momentDate(message.created_at)}</small>
      </div>
      <div className="text__message" data-sender={message.sender}>
        <pre data-sender={message.sender}>{message.content}</pre>
      </div>
    </div>
  )
}
