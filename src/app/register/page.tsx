'use client'
import './index.scss'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import email_focused from '@/assets/icons/email_focused.svg'
import email_unfocused from '@/assets/icons/email_unfocused.svg'
import password_focused from '@/assets/icons/password_focused.svg'
import password_unfocused from '@/assets/icons/password_unfocused.svg'
import arrow_right from '@/assets/icons/arrow_right.svg'
import userFocused from '@/assets/icons/user_focused.svg'
import userUnfocused from '@/assets/icons/user_unfocused.svg'
import { useState } from 'react'
import { CButon } from '@/components/CButon'
import { signIn } from 'next-auth/react'
import { LoginLayout } from '@/components/LoginLayout'
import { useRouter } from 'next/navigation'

export default function Register() {
  const { values, handleInputChange } = useForm({
    email: '',
    password: '',
    username: '',
  })
  const [emailFocused, setEmailFocused] = useState<boolean>(false)
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false)
  const [usernameFocused, setUsernameFocused] = useState<boolean>(false)
  const router = useRouter()

  const handleFocusedInput = (input: string) => {
    if (input === 'email') {
      setEmailFocused(true)
      setPasswordFocused(false)
      setUsernameFocused(false)
    } else if (input === 'password') {
      setEmailFocused(false)
      setPasswordFocused(true)
      setUsernameFocused(false)
    } else {
      setEmailFocused(false)
      setPasswordFocused(false)
      setUsernameFocused(true)
    }
  }

  const FormComponent = (
    <form className="form" style={{}}>
      <CInput
        value={values.username}
        onChange={handleInputChange}
        placeholder="John Doe"
        type="username"
        label="Nombre de usuario"
        required
        name="username"
        icon={usernameFocused ? userFocused : userUnfocused}
        onFocus={() => handleFocusedInput('username')}
        inputStyle={{
          backgroundColor: '#fff',
          color: usernameFocused ? '#5918DF' : '#333',
          fontWeight: 'bold',
          width: '400px',
          paddingLeft: usernameFocused ? '5em' : '',
        }}
      />

      <CInput
        value={values.email}
        onChange={handleInputChange}
        placeholder="johndeo@gmail.com"
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
      >
        Iniciar sesion
      </CButon>
    </form>
  )

  return (
    <LoginLayout
      Form={FormComponent}
      onClickGoogleAuth={() => signIn('google')}
      titleForm="Registrate en SyncIQ"
      subtitleForm="Empieza a vender mas hoy"
      titleHeaderForm="Ya eres miembro?"
      valueHeaderFormButton="Iniciar sesion"
      showForgotPassword={false}
      onClickHeaderFormButton={() => router.push('/login')}
    />
  )
}
