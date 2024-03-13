import './index.scss'
import Image from 'next/image'

interface CButonProps {
  children: React.ReactNode
  className?: string
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  icon?: any
  poisition_icon?: 'left' | 'right'
  icon_size?: 'auto' | 'default'
}
export const CButon = ({
  children,
  className,
  props,
  icon,
  poisition_icon = 'right',
  icon_size = 'default',
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
      data-icon-size={icon_size}
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
