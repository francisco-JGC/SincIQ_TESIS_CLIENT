import { create } from 'zustand'

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
  seen: boolean
  messages: Message[]
}

export interface Message {
  id: number
  content: string
  created_at: string
  sender: string
  receiver: string
  conversations?: Conversation[]
}

export interface LastMessage {
  id: number
  content: string
  created_at: string
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
  created_at: string
  conversations: Conversation[]
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
  clearConversationFromClientStorage: (client_id: number) => void
  changeSeenConversation: (client_id: number, seenState: boolean) => void
  orderClientsByLastMessage: () => void
}

export const useClientsStore = create<ClientsStore>((set, get) => ({
  clients: [],
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
          if (client.conversations.length === 0) {
            client.conversations.unshift({
              id: new Date().getTime(),
              system: 'system',
              seen: false,
              messages: [message],
            })
            client.lastMessage = [
              {
                id: message.id,
                content: message.content,
                created_at: message.created_at,
                sender: message.sender,
                receiver: message.receiver,
                conversation_id: client.conversations[0]?.id,
              },
            ]
          }

          const lastMessage =
            client.conversations[0]?.messages[
              client.conversations[0].messages.length - 1
            ]
          if (
            lastMessage?.content === message.content &&
            lastMessage?.sender === message.sender
          ) {
            return client
          }
          client.conversations[0]?.messages.push(message)
          client.lastMessage = [
            {
              id: message.id,
              content: message.content,
              created_at: message.created_at,
              sender: message.sender,
              receiver: message.receiver,
              conversation_id: client.conversations[0]?.id,
            },
          ]
        }
        return client
      }),
    })),
  clearConversationFromClientStorage: (client_id) =>
    set((state) => ({
      clients: state.clients.map((client) => {
        if (client.id === client_id) {
          if (client.conversations[0]?.messages.length > 0) {
            client.conversations[0].messages = []
            client.lastMessage = []
          }
        }
        return client
      }),
    })),
  changeSeenConversation: (client_id, seenState) =>
    set((state) => ({
      clients: state.clients.map((client) => {
        if (client.id == client_id) {
          if (client.conversations.length > 0) {
            client.conversations[0].seen = seenState
          }
        }

        return client
      }),
    })),
  orderClientsByLastMessage: () =>
    set((state) => {
      const sortedClients = [...state.clients].sort((a, b) => {
        const lastMessageA = a.lastMessage[0]?.created_at
        const lastMessageB = b.lastMessage[0]?.created_at

        if (!lastMessageA) return 1
        if (!lastMessageB) return -1

        const dateA = Date.parse(lastMessageA)
        const dateB = Date.parse(lastMessageB)

        return dateB - dateA
      })

      return { clients: sortedClients }
    }),
}))
