import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  segment?: string
}

export default function NavLink({ href, children, segment }: NavLinkProps) {
  let currentSegment = useSelectedLayoutSegment()

  currentSegment === null && (currentSegment = 'dashboard')

  const isActive = segment === currentSegment

  return (
    <Link href={href} className={'navlink ' + (isActive ? ' active' : '')}>
      {children}
    </Link>
  )
}
