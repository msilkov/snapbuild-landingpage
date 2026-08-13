import { useEffect, useRef, useState } from 'react'
import { appUrl, ctaLabel, mobileNavLinks, navLinks } from '../../content/site'
import { asset } from '../../lib/asset'

const homeHref = import.meta.env.BASE_URL

/**
 * Хедер оригинала — не полоса во всю ширину, а плавающая пилюля поверх
 * контента: fixed-контейнер не ловит клики, кликабельна только сама панель.
 * При скролле дальше 12px у панели появляются граница и тень.
 * Ниже 1024px навигация уезжает в полноэкранное меню.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Открытое меню перекрывает страницу целиком, поэтому фон не прокручивается,
  // а фокус и Escape остаются внутри панели.
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const menuLinks = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])

    menuLinks()[0]?.focus()

    const closeAndRestoreFocus = () => {
      setIsMenuOpen(false)
      burgerRef.current?.focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeAndRestoreFocus()
        return
      }
      if (event.key !== 'Tab') return

      const stops = [burgerRef.current, ...menuLinks()].filter((node) => node !== null)
      const first = stops[0]
      const last = stops[stops.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    // На десктопе меню не существует: если окно расширили, состояние сбрасываем.
    const desktop = window.matchMedia('(width >= 64rem)')
    const onBreakpointChange = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpointChange)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpointChange)
    }
  }, [isMenuOpen])

  return (
    <header id="header" className="pointer-events-none fixed inset-x-0 top-0 z-100">
      <div
        className={`pointer-events-auto relative z-52 mx-auto mt-[12px] grid w-[calc(100%_-_24px)] min-h-[50px] grid-cols-[1fr_auto] items-center rounded-[16px] border bg-white/80 py-[7px] pr-[9px] pl-[14px] backdrop-blur-[10px] transition-[margin,background-color,border-color,box-shadow,transform] duration-300 ease-motion md:mt-[16px] md:min-h-[52px] md:w-[min(100%_-_32px,960px)] lg:grid-cols-[1fr_auto_1fr] ${
          isScrolled
            ? 'border-black/[0.045] shadow-[0_6px_22px_rgba(29,22,40,0.055)]'
            : 'border-transparent'
        }`}
      >
        <a href={homeHref} aria-label="Снэпбилд" className="inline-flex justify-self-start">
          {/*
            Ширина в пикселях макета, а не фиксированная высота: у оригинала
            лого задано как 111 макетных пикселей на мобильном и 153 дальше,
            поэтому ниже 375 оно сжимается вместе со всем остальным.
          */}
          <img
            src={asset('logo-snapbuild.svg')}
            alt="Снэпбилд"
            width={153}
            height={22}
            className="block h-auto w-111 md:w-153"
          />
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center justify-self-center lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[9px] px-[10px] py-[8px] text-[12px] font-medium text-ink transition-colors duration-[180ms] hover:bg-black/[0.045]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[12px] justify-self-end">
          {/* При открытом меню кнопка гаснет, чтобы не спорить с крестиком. */}
          {/*
            Фон на наведении не меняется и кнопка никуда не едет: правило
            из hero-motion.css с #242424 и translateY перебито инлайновым
            блоком в конце документа. Вместо этого по надписи проезжает
            тёмная волна — текст обрезан по градиенту шириной 400%.
          */}
          <a
            href={appUrl}
            className={`group inline-flex items-center justify-center rounded-[11px] bg-ink px-14 py-8 text-[calc(14*var(--u))] leading-[calc(20/14)] font-semibold tracking-[-0.5px] transition-[background-color,color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.975] md:rounded-[12px] md:px-[20px] md:py-[10px] md:text-[14px] md:leading-[20px] ${
              isMenuOpen ? 'invisible opacity-0 lg:visible lg:opacity-100' : ''
            }`}
          >
            <span className="bg-[image:var(--btn-sweep)] bg-[length:400%_100%] bg-[position:0%_50%] bg-clip-text text-transparent group-hover:animate-btn-sweep group-focus-visible:animate-btn-sweep motion-reduce:animate-none">
              {ctaLabel}
            </span>
          </a>

          <button
            ref={burgerRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-36 w-36 items-center justify-center rounded-[12px] md:h-48 md:w-48 md:rounded-[16px] lg:hidden"
          >
            <span
              className={`relative block h-10 w-15 border-t-[1.5px] border-b-[1.5px] transition-colors duration-[267ms] md:h-[calc(13.333*var(--u))] md:w-20 md:border-t-2 md:border-b-2 ${
                isMenuOpen ? 'border-transparent' : 'border-ink'
              }`}
            >
              <span
                className={`absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-ink transition-transform duration-[267ms] md:h-[2px] ${
                  isMenuOpen ? 'rotate-45' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-ink transition duration-[267ms] md:h-[2px] ${
                  isMenuOpen ? '-rotate-45 opacity-100' : 'opacity-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/*
        Меню всегда в разметке и переключается display, как в оригинале:
        переход none → flex заново проигрывает анимации появления, а через
        монтирование компонента этого не добиться.
      */}
      <nav
        ref={menuRef}
        id="main-menu"
        aria-label="Мобильная навигация"
        aria-hidden={!isMenuOpen}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) setIsMenuOpen(false)
        }}
        className={`pointer-events-auto fixed inset-0 z-51 h-dvh w-full animate-menu-panel flex-col overflow-y-auto bg-white px-16 pt-92 pb-16 motion-reduce:animate-none md:px-20 md:pt-104 md:pb-20 lg:hidden ${
          isMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        {mobileNavLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            style={{ animationDelay: `${40 + index * 45}ms` }}
            className="text-u-28 block animate-menu-item border-b border-black/10 py-18 leading-[calc(36/28)] font-medium text-ink motion-reduce:animate-none md:py-20 md:text-u-32 md:leading-[calc(40/32)]"
          >
            {link.label}
          </a>
        ))}

        <a
          href={appUrl}
          className="text-u-18 mt-auto inline-flex min-h-60 w-full animate-menu-cta items-center justify-center rounded-[calc(12*var(--u))] bg-ink px-20 py-16 font-semibold text-ink-contrast motion-reduce:animate-none md:min-h-64 md:px-24 md:py-18 md:text-u-20"
        >
          {ctaLabel}
        </a>
      </nav>
    </header>
  )
}
