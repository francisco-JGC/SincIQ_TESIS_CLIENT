'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <nav>
      <h1>Sync IQ session</h1>
      <Link href="/login">Ir a iniciar sesion</Link>
    </nav>
  )
}
