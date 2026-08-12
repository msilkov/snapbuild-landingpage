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
    <section id={id} className={`py-section ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
