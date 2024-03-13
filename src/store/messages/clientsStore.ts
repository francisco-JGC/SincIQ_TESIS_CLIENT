import { create } from 'zustand'

export interface Client {
  id: number
  username: string
  phone_number: string
  address: any
  image_url: any
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

type ClientsStore = {
  clients: Client[]
  addClient: (client: Client) => void
  removeClient: (id: number) => void
  searchClient: (id: number) => boolean
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
}))
