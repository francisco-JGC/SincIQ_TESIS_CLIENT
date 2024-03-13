interface ILogin {
  username?: string
  email: string
  password?: string
  provider?: string
}
export const login = async ({ email, password }: ILogin) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  )

  const data = await response.json()
  return data
}

export const register = async ({ username, email, password }: ILogin) => {
  console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    },
  )

  const data = await response.json()
  return data
}
