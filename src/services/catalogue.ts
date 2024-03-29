export const getCatalogue = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalogue`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
