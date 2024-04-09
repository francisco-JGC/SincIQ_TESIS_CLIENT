import './layout.scss'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <main>
        <span className="catalogue-notice">
          Catálogo aprobado por SyncIQ, sistema de gestión de calidad.
        </span>
        {children}
      </main>
    </div>
  )
}
