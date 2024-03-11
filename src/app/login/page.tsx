'use client'
import Image from 'next/image'
import syncIQ_img from '@/assets/img/synciq_login.png'
import Link from 'next/link'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import email_focused from '@/assets/icons/email_focused.svg'
import email_unfocused from '@/assets/icons/email_unfocused.svg'
import password_focused from '@/assets/icons/password_focused.svg'
import password_unfocused from '@/assets/icons/password_unfocused.svg'
import { useState } from 'react'

export default function Login() {
  const { values, handleInputChange } = useForm({
    email: '',
    password: '',
  })
  const [emailFocused, setEmailFocused] = useState<boolean>(false)
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false)

  const handleFocusedInput = (input: string) => {
    if (input === 'email') {
      setEmailFocused(true)
      setPasswordFocused(false)
    } else {
      setEmailFocused(false)
      setPasswordFocused(true)
    }
  }

  return (
    <main className="login__page">
      <section className="login__image">
        <header className="header">
          <h1>
            La herramienta mas potente para gestionar tus ventas y clientes
          </h1>

          <p>
            Observa tus estadisticas de ventas, clientes y personaliza tu
            catalogo de productos
          </p>
        </header>

        <div className="login__image__container">
          <Image src={syncIQ_img} alt="Sync IQ" width={500} height={500} />
        </div>
      </section>
      <section className="login__form">
        <header className="header">
          <span>No eres miembro?</span>
        </header>

        <div className="login__form__container">
          <h2>Iniciar sesion en SyncIQ</h2>
          <span>Ingresa tus datos para iniciar sesion</span>

          <form>
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
                color: '#333',
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
                color: '#333',
                paddingLeft: passwordFocused ? '5em' : '',
              }}
            />
          </form>
        </div>
      </section>
    </main>
  )
}
