export const sendMessage = async (
  phone: string,
  message: string,
  type: 'text' | 'image',
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/whatsapp/send_message`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, message, type }),
    },
  )

  const data = await response.json()
  return data
}
