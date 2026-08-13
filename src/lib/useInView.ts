import { useEffect, useRef, useState } from 'react'

/**
 * Однократное срабатывание, когда элемент попал в экран.
 *
 * Тот же приём, что в логобаре: наблюдатель отключается сразу после первого
 * пересечения — все появления на странице играют по одному разу, обратно
 * при скролле вверх ничего не гаснет.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setIsInView(true)
        observer.disconnect()
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}
