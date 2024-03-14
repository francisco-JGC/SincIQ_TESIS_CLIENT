import { momentDate } from '@/utils/momentDate'
import './index.scss'
import { Message } from '@/store/messages/clientsStore'

export interface TextMessageProps {
  message: Message
}

export const TextMessage = ({ message }: TextMessageProps) => {
  return (
    <div className="container-text__message" data-sender={message.sender}>
      <div className="text__message__date" data-sender={message.sender}>
        <small>{momentDate(message.timestamp)}</small>
      </div>
      <div className="text__message" data-sender={message.sender}>
        <pre>{message.content}</pre>
      </div>
    </div>
  )
}
