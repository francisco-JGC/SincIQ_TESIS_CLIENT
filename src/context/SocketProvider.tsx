'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext<any>({
  socket: null,
  currentUser: null,
  setCurrentUser: null,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const value = {
    socket,
    currentUser,
    setCurrentUser,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
