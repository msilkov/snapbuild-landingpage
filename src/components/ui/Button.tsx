import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant

  href?: string
  className?: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>
const base =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium transition-colors duration-200'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-ink-contrast hover:bg-ink-muted',
  secondary: 'bg-surface text-ink border border-border hover:bg-canvas',
}

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
