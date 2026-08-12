import type { ReactNode } from 'react'
import { Container } from './Container'

type SectionProps = {
  children: ReactNode
  /** Якорь для навигации в шапке и футере. */
  id?: string
  className?: string
}

/** Вертикальный ритм страницы: одна секция — один блок лендинга. */
export function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`pt-32 pb-42 md:pb-60 lg:pb-96 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
