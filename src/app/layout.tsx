import './globals.scss'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Providers } from '../context/SessionProvider'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'SyncIQ',
  description:
    'Gestiona tus ventas y clientes de manera sencilla y eficiente con ayuda de la Inteligencia Artificial.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
