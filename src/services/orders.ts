export const createOrder = async (order: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  const data = await response.json()
  return data
}

export const getSaleOrders = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/sales`,
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
