import './index.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
export default function ChatRoom() {
  const { data: session } = useSession()

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
      </section>
      <section className="chat-room__messages"></section>
    </div>
  )
}
