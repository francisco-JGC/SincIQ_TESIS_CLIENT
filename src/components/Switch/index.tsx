import './index.scss'

interface SwitchProps {
  value: boolean
  onToggle: () => void
  label: string
  id?: string
  position?: 'left' | 'right'
}

export const Switch = ({
  value,
  onToggle,
  label,
  id,
  position = 'left',
}: SwitchProps) => {
  return (
    <div className="switch-container">
      {position === 'left' && <span className="label">{label}</span>}
      <label htmlFor={id} className="switch">
        <input id={id} type="checkbox" checked={value} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      {position === 'right' && <span className="label">{label}</span>}
    </div>
  )
}
