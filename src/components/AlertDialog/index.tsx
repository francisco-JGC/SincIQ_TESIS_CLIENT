import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '../ui/checkbox'

interface AlertDialogModalProps {
  nameButton?: string
  title?: string
  description?: string
  onConfirm: () => void
  nameButtonConfirm?: string
  nameButtonCancel?: string
  buttonStyle?: React.CSSProperties
  useCheckbox?: boolean
  id?: string
  nameCheckbox?: string
  checked?: boolean
  label?: string
  useButton?: boolean
  children?: React.ReactNode
}

export const AlertDialogModal = ({
  nameButton,
  title,
  description,
  onConfirm,
  nameButtonConfirm,
  nameButtonCancel,
  buttonStyle,
  useCheckbox,
  id,
  nameCheckbox,
  checked,
  label,
  useButton = true,
  children,
}: AlertDialogModalProps) => {
  return (
    <AlertDialog>
      {children ? (
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
      ) : (
        nameButton && (
          <AlertDialogTrigger
            className={`${useButton && 'c-button'}`}
            style={buttonStyle}
          >
            {nameButton}
          </AlertDialogTrigger>
        )
      )}
      {useCheckbox && (
        <AlertDialogTrigger className="flex items-center gap-2">
          <Checkbox checked={checked} id={id} name={nameCheckbox} />
          <label htmlFor={id}>{label}</label>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent
        style={{
          backgroundColor: '#100e17',
          border: 'none',
          boxShadow: '0px 4px 20px rgba(105, 46, 227, 0.2)',
          color: '#fff',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            style={{
              border: 'none',
            }}
          >
            {nameButtonCancel || 'Cancelar'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            style={{
              background: '#5918df',
              color: '#fff',
              borderRadius: '8px',
            }}
          >
            {nameButtonConfirm || 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
