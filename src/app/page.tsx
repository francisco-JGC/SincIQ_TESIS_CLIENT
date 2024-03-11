'use client'
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession()

  return (
    <nav>
      <h1>Sync IQ session</h1>
      <ul>
        {session ? (
          <li>
            <span>
              Signed in as {session.user?.email} <br />
              <Image
                src={session.user?.image as string}
                alt={session.user?.name as string}
                width={32}
                height={32}
                className="rounded-full h-8 w-8"
              />
            </span>
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        ) : (
          <li>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  )
}
