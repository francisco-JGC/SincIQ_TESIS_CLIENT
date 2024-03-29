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

export const createOrUpdateCatalogue = async (data: any) => {
  console.log(data)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalogue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseData = await response.json()
  return responseData
}
