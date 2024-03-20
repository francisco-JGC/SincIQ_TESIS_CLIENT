import './layout.scss'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import interrogationCircle from '@/assets/icons/interrogation_circle.svg'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderLayout } from '@/components/HeaderLayout'
import { Toaster } from 'sonner'
import { SocketProvider } from '@/context/SocketProvider'

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
        <main className="dashboard-layout">
          <nav className="dashboard-layout__navigation">
            <h2>
              <Link href="/dashboard">SyncIQ</Link>
            </h2>

            <Navigation />

            <div className="dashboard-layout__navigation__footer">
              <div>
                <Image
                  src={interrogationCircle}
                  typeof="svg"
                  alt="Help"
                  width={24}
                  height={24}
                />
                ¿Necesitas ayuda?
                <Link href="/logout">Políticas de privacidad</Link>
                <br />
                <small className="copy-right">
                  © {new Date().getFullYear()} SincIQ (CHIDO DEV) - Todos los
                  derechos reservados.
                </small>
              </div>
            </div>
          </nav>
          <SocketProvider>
            <div className="dashboard-layout__container">
              <header className="dashboard-layout__header">
                <HeaderLayout />
              </header>
              <section className="dashboard-layout__content">
                {children}
              </section>
            </div>
          </SocketProvider>
        </main>

        <Toaster />
      </body>
    </html>
  )
}
