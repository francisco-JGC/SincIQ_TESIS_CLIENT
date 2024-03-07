'use client'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  console.log(session)

  return (
    <nav>
      <h1>Sync IQ session</h1>
      <ul>
        <li>
          <button>Cerrar sesion</button>
        </li>
        <li>
          <button onClick={() => signIn()}>Sign in with Google</button>
        </li>
      </ul>
    </nav>
  )
}
