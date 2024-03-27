export const getCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const data = await response.json()
  return data
}

export const addCategory = async ({
  name,
  description,
}: {
  name: string
  description: string
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    },
  )

  const data = await response.json()
  return data
}
