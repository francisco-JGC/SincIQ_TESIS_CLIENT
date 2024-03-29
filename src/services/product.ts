export const addProduct = async (product: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  const data = await response.json()
  return data
}
