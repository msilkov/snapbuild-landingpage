import { useEffect, useState } from 'react'

const STORAGE_KEY = 'dds-cookie-consent'
const linkClass = 'font-semibold underline underline-offset-2 hover:opacity-70'

export function CookieBanner() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'accepted') return
    } catch {
    }
    setIsMounted(true)

    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!isMounted) return null

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
    }
    setIsVisible(false)
    setTimeout(() => setIsMounted(false), 300)
  }

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании файлов cookie"
      className={`fixed right-[16px] bottom-[16px] left-[16px] z-1000 rounded-[16px] border border-black/[0.06] bg-surface p-[16px] pb-[14px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:right-[20px] md:bottom-[20px] md:left-auto md:max-w-[400px] md:p-[20px] md:pb-[18px] ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[16px] opacity-0'
      }`}
    >
      <p className="mb-[16px] text-[14px] leading-[1.5]">
        Мы используем файлы cookie, чтобы сделать наш сайт лучше. Используя сайт, вы принимаете
        нашу{' '}
        <a
          href="https://snapbuild.ru/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          политику конфиденциальности
        </a>{' '}
        и{' '}
        <a
          href="https://snapbuild.ru/agreement"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          соглашение на обработку персональных данных
        </a>
        .
      </p>
      <div className="flex gap-[8px]">
        <button
          type="button"
          onClick={accept}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-[#141414] px-[12px] py-[8px] text-[12px] leading-[16px] font-semibold text-ink-contrast transition-[background-color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#0a0a0a] active:scale-[0.975]"
        >
          Принять
        </button>
      </div>
    </aside>
  )
}
