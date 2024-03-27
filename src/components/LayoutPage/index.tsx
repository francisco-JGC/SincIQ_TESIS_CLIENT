'use client'
import './index.scss'
import Image from 'next/image'
import RollBackIcon from '@/assets/icons/arrow_left.svg'
import { useRouter } from 'next/navigation'

interface LayoutPageProps {
  children: React.ReactNode
  className?: string
  title: string
  rollBack?: boolean
  subTitle?: string
  ActionComponent?: React.FC
}

export const LayoutPage = ({
  children,
  className,
  title,
  rollBack,
  subTitle,
  ActionComponent,
}: LayoutPageProps) => {
  const router = useRouter()

  const handleRollBack = () => router.back()

  return (
    <section className={`layout-page ${className}`}>
      <div className="layout-page__header">
        <div className="layout-page__header__left">
          {rollBack && (
            <div
              className="layout-page__header__left__back"
              onClick={handleRollBack}
              title="Volver atrás"
            >
              <Image src={RollBackIcon} alt="RollBackIcon" />
            </div>
          )}
          <h1 className="layout-page__title">{title}</h1>
        </div>

        <div className="layout-page__header__right">
          <h4 className="layout-page__header__right__title">{subTitle}</h4>
        </div>
      </div>
      <div
        className="layout-page__content"
        style={{
          marginBottom: ActionComponent ? '3.5rem' : '0',
        }}
      >
        {children}
      </div>
      {ActionComponent && (
        <div className="layout-page__action">
          <ActionComponent />
        </div>
      )}
    </section>
  )
}
