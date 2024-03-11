'use client'
import './index.scss'
import Image from 'next/image'
import syncIQ_img from '@/assets/img/synciq_login.png'
import Link from 'next/link'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import email_focused from '@/assets/icons/email_focused.svg'
import email_unfocused from '@/assets/icons/email_unfocused.svg'
import password_focused from '@/assets/icons/password_focused.svg'
import password_unfocused from '@/assets/icons/password_unfocused.svg'
import arrow_right from '@/assets/icons/arrow_right.svg'
import google_icon from '@/assets/icons/google.svg'
import { useState } from 'react'
import { CButon } from '@/components/CButon'

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
      <div className="login__overlay__1"></div>
      <div className="login__overlay__2"></div>
      <div className="login__overlay__3"></div>

      <section className="login__image">
        <header className="header">
          <h1>
            La herramienta mas potente para gestionar tus ventas y clientes
          </h1>

          <p>
            Observa tus estadisticas de ventas, clientes, personaliza tu
            catalogo de productos y descubre todo lo que SyncIQ puede hacer por
            ti y tu negocio.
          </p>
        </header>

        <div className="login__image__container">
          <div className="content">
            <Image src={syncIQ_img} alt="Sync IQ" width={500} height={500} />
          </div>

          <span>Unete a SyncIQ</span>
          <span>Ayudamos a tu negocio a crecer</span>
          <span>Empieza a vender mas hoy</span>
          <span>Estas a un clic del cambio</span>
        </div>
      </section>
      <section className="login__form">
        <header className="header">
          <span>No eres miembro?</span>
          <CButon icon={arrow_right}>
            <Link href="/register">Registrate</Link>
          </CButon>
        </header>

        <div className="login__form__container">
          <div>
            <h2>Iniciar sesion en SyncIQ</h2>
            <span>Ingresa tus datos para iniciar sesion</span>
          </div>

          <form className="form">
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
                color: '#5918DF',
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
                color: '#5918DF',
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

          <div className="login__footer">
            <Link href="/forgot-password">Olvidaste tu contraseña?</Link>

            <div className="other__login__options">
              <div>
                <CButon
                  icon={google_icon}
                  poisition_icon="left"
                  props={{
                    type: 'button',
                    style: {
                      background: '#fff',
                      color: '#333',
                    },
                  }}
                >
                  Continuar con Google
                </CButon>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
