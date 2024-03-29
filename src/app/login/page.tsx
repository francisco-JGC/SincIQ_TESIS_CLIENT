'use client'
import './index.scss'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import email_focused from '@/assets/icons/email_focused.svg'
import email_unfocused from '@/assets/icons/email_unfocused.svg'
import password_focused from '@/assets/icons/password_focused.svg'
import password_unfocused from '@/assets/icons/password_unfocused.svg'
import arrow_right from '@/assets/icons/arrow_right.svg'
import { useState } from 'react'
import { CButon } from '@/components/CButon'
import { signIn } from 'next-auth/react'
import { LoginLayout } from '@/components/LoginLayout'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { login } from '@/services/auth'

export default function Login() {
  const { values, handleInputChange } = useForm({
    email: '',
    password: '',
  })
  const [emailFocused, setEmailFocused] = useState<boolean>(false)
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleFocusedInput = (input: string) => {
    if (input === 'email') {
      setEmailFocused(true)
      setPasswordFocused(false)
    } else {
      setEmailFocused(false)
      setPasswordFocused(true)
    }
  }

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    toast.dismiss()

    const response = await login(values)

    if (response.success) {
      router.push('/dashboard')
    } else {
      toast.error('Error al iniciar sesion', {
        description: response.details,
      })
    }
    setLoading(false)
  }

  const FormComponent = (
    <form className="form" onSubmit={handleSubmitLogin}>
      <CInput
        value={values.email}
        onChange={handleInputChange}
        placeholder="Correo electronico"
        type="email"
        label="Correo electronico"
        required
        name="email"
        icon={emailFocused ? email_focused : email_unfocused}
        onFocus={() => handleFocusedInput('email')}
        inputStyle={{
          backgroundColor: '#fff',
          color: emailFocused ? '#5918DF' : '#333',
          fontWeight: 'bold',
          width: '400px',
          paddingLeft: emailFocused ? '5em' : '',
        }}
      />

      <CInput
        value={values.password}
        onChange={handleInputChange}
        placeholder="Contraseña"
        type="password"
        label="Contraseña"
        required
        name="password"
        icon={passwordFocused ? password_focused : password_unfocused}
        onFocus={() => handleFocusedInput('password')}
        inputStyle={{
          backgroundColor: '#fff',
          color: passwordFocused ? '#5918DF' : '#333',
          fontWeight: 'bold',
          width: '400px',
          paddingLeft: passwordFocused ? '5em' : '',
        }}
      />

      <CButon
        icon={arrow_right}
        props={{ type: 'submit' }}
        className="login__button"
        loading_mode={loading}
      >
        Iniciar sesion
      </CButon>
    </form>
  )

  return (
    <LoginLayout
      Form={FormComponent}
      onClickGoogleAuth={() =>
        signIn('google', {
          callbackUrl: '/dashboard',
        })
      }
      titleForm="Iniciar sesion en SyncIQ"
      subtitleForm="Ingresa tus datos para iniciar sesion"
      titleHeaderForm="No eres miembro?"
      valueHeaderFormButton="Registrate"
      onClickHeaderFormButton={() => router.push('/register')}
    />
  )
}
