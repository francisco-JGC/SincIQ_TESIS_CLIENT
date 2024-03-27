import './index.scss'
import Image from 'next/image'

interface CInputProps {
  value: string
  onChange: (e: any) => void
  placeholder?: string
  className?: string
  type?: string
  label?: string
  label_style?: React.CSSProperties
  required?: boolean
  name: string
  id?: string
  icon?: any
  dissabled?: boolean
  min?: number
  max?: number
  onFocus?: () => void
  inputStyle?: React.CSSProperties
  autocomplete?: 'on' | 'off'
  onClickIcon?: () => void
  autoFocus?: boolean
}
export const CInput = ({
  value,
  onChange,
  placeholder,
  className,
  type,
  label,
  required,
  name,
  id,
  icon,
  dissabled,
  min,
  max,
  label_style,
  onFocus,
  inputStyle,
  autocomplete,
  onClickIcon,
  autoFocus,
}: CInputProps) => {
  return (
    <div className={`c-input ${className}`}>
      {label && (
        <label
          className={`${required ? 'required' : ''}`}
          htmlFor={id}
          style={label_style}
        >
          {label}
        </label>
      )}

      <div className="c-input__container">
        {icon && (
          <Image className="icon" src={icon} alt="icon" onClick={onClickIcon} />
        )}

        <input
          id={id}
          style={inputStyle}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target)}
          placeholder={placeholder}
          required={required}
          disabled={dissabled}
          min={min}
          max={max}
          onFocus={onFocus}
          autoComplete={autocomplete}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  )
}
