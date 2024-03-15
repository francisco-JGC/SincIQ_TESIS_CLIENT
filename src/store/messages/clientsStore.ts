import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Client {
  id: number
  username: string
  phone_number: string
  address: any
  image_url: any
  bot_status: boolean
  created_at: string
  conversations: Conversation[]
  lastMessage: LastMessage[]
}

export interface Conversation {
  id: number
  system: string
  messages: Message[]
}

export interface Message {
  id: number
  content: string
  timestamp: string
  sender: string
  receiver: string
}

export interface LastMessage {
  id: number
  content: string
  timestamp: string
  sender: string
  receiver: string
  conversation_id: number
}

export interface ISocketMessage {
  client: IClient
  message: string
  from: string
  type_message: string
  message_by: string
}

export interface IClient {
  id?: string
  username?: string
  phone_number: string
}

type ClientsStore = {
  clients: Client[]
  addClient: (client: Client) => void
  removeClient: (id: number) => void
  searchClient: (id: number) => boolean
  setMessageToClientConversation: (
    phone_number: string,
    message: Message,
  ) => void
}

const getInitialData = (): ClientsStore => {
  const storedData = localStorage.getItem('clientsStore')

  if (!storedData) {
    return {
      clients: [],
      addClient: () => {},
      removeClient: () => {},
      searchClient: () => false,
      setMessageToClientConversation: () => {},
    }
  }

  return JSON.parse(storedData)
}

export const useClientsStore = create(
  persist<ClientsStore>(
    (set, get) => ({
      clients: getInitialData().clients,
      addClient: (client) =>
        set((state) => ({ clients: [...state.clients, client] })),
      removeClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
        })),
      searchClient: (id) => get().clients.some((client) => client.id === id),
      setMessageToClientConversation: (phone_number, message) =>
        set((state) => ({
          clients: state.clients.map((client) => {
            if (client.phone_number === phone_number) {
              // verificar si el ultimo mensaje es igual al mensaje que se va a enviar y si es del mismo sender para no duplicar el mensaje
              const lastMessage =
                client.conversations[0].messages[
                  client.conversations[0].messages.length - 1
                ]
              if (
                lastMessage.content === message.content &&
                lastMessage.sender === message.sender
              ) {
                return client
              }
              client.conversations[0].messages.push(message)
              client.lastMessage = [
                {
                  id: message.id,
                  content: message.content,
                  timestamp: message.timestamp,
                  sender: message.sender,
                  receiver: message.receiver,
                  conversation_id: client.conversations[0].id,
                },
              ]
            }
            return client
          }),
        })),
    }),
    {
      name: 'clientsStore', // Nombre para identificar el almacenamiento
      getStorage: () => localStorage, // Almacenamiento a utilizar (localStorage o sessionStorage)
    },
  ),
)
