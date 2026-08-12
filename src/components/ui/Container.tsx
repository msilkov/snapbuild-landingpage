import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

/** Горизонтальные поля страницы. Повторяет vw-отступы исходного лендинга. */
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1920px] px-gutter ${className}`}>{children}</div>
  )
}
