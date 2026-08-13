import type { ReactNode } from 'react'
import { Container } from './Container'

type SectionProps = {
  children: ReactNode

  id?: string
  className?: string
}

export function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`pt-32 pb-42 md:pb-60 lg:pb-96 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
