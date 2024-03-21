export const getClients = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return data
}

export const changeBotStatus = async (
  client_id: number,
  bot_status: boolean,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clients/change-bot-status`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id, bot_status }),
    },
  )

  const data = await response.json()
  return data
}

export const clearConversationFromClient = async (client_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clients/clear-conversation`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id }),
    },
  )

  const data = await response.json()
  return data
}
