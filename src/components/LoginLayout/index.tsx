import './index.scss'
import Image from 'next/image'
import syncIQ_img from '@/assets/img/synciq_login.png'
import Link from 'next/link'
import arrow_right from '@/assets/icons/arrow_right.svg'
import google_icon from '@/assets/icons/google.svg'
import React from 'react'
import { CButon } from '@/components/CButon'

interface ILogin {
  Form: React.ReactNode
  onClickGoogleAuth: () => void
  titleForm: string
  subtitleForm: string
  showForgotPassword?: boolean
  titleHeaderForm: string
  valueHeaderFormButton: string
  onClickHeaderFormButton: () => void
}

export function LoginLayout({
  Form,
  onClickGoogleAuth,
  titleForm,
  subtitleForm,
  showForgotPassword = true,
  valueHeaderFormButton,
  titleHeaderForm,
  onClickHeaderFormButton,
}: ILogin) {
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
          <span>{titleHeaderForm}</span>
          <CButon
            icon={arrow_right}
            poisition_icon="right"
            props={{
              type: 'button',
              onClick: onClickHeaderFormButton,
            }}
          >
            {valueHeaderFormButton}
          </CButon>
        </header>

        <div className="login__form__container">
          <div>
            <h2>{titleForm}</h2>
            <span>{subtitleForm}</span>
          </div>

          {Form}

          <div className="login__footer">
            {showForgotPassword && (
              <Link href="/forgot-password">Olvidaste tu contraseña?</Link>
            )}

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
                    onClick: onClickGoogleAuth,
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
