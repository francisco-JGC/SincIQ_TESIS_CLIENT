import './index.scss'
import Image from 'next/image'
import animateSpinner from '@/assets/icons-animated/tube-spinner.svg'

interface CButonProps {
  children: React.ReactNode
  className?: string
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  icon?: any
  poisition_icon?: 'left' | 'right'
  icon_size?: 'auto' | 'default'
  loading_mode?: boolean
}
export const CButon = ({
  children,
  className,
  props,
  icon,
  poisition_icon = 'right',
  icon_size = 'default',
  loading_mode,
}: CButonProps) => {
  return (
    <button
      className={`c-button ${className}`}
      disabled={loading_mode}
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        filter: loading_mode ? 'brightness(0.6)' : 'brightness(1)',
        cursor: loading_mode ? 'not-allowed' : 'pointer',
        ...props?.style,
      }}
      data-icon-size={loading_mode ? 'auto' : icon_size}
    >
      {poisition_icon === 'left' && icon && (
        <Image
          src={loading_mode ? animateSpinner : icon}
          alt="icon"
          style={{
            marginRight: '0.5rem',
          }}
        />
      )}
      {children}
      {poisition_icon === 'right' && icon && (
        <Image
          src={loading_mode ? animateSpinner : icon}
          alt="icon"
          style={{ marginLeft: '0.5rem' }}
        />
      )}
    </button>
  )
}
