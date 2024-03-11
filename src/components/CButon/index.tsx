import './index.scss'
import Image from 'next/image'

interface CButonProps {
  children: React.ReactNode
  className?: string
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  icon?: any
  poisition_icon?: 'left' | 'right'
}
export const CButon = ({
  children,
  className,
  props,
  icon,
  poisition_icon = 'right',
}: CButonProps) => {
  return (
    <button
      className={`c-button ${className}`}
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        ...props?.style,
      }}
    >
      {poisition_icon === 'left' && icon && (
        <Image
          src={icon}
          alt="icon"
          style={{
            marginRight: '0.5rem',
          }}
        />
      )}
      {children}
      {poisition_icon === 'right' && icon && (
        <Image src={icon} alt="icon" style={{ marginLeft: '0.5rem' }} />
      )}
    </button>
  )
}
