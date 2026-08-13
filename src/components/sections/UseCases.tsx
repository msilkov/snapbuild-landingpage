import { useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { useCaseTabs, useCasesTitle } from '../../content/useCases'
import { asset } from '../../lib/asset'

/** Сколько держится один пункт до автоматического перехода к следующему. */
const POINT_DURATION = 8000
const POINTS_PER_TAB = 4
const TOTAL_POINTS = useCaseTabs.length * POINTS_PER_TAB
const SWIPE_THRESHOLD = 40

const allMedia = useCaseTabs.flatMap((tab) => tab.items.map((item) => item.media))

/**
 * «Любой контент в фирменном стиле»: пять вкладок по четыре пункта.
 * Пункты сменяются сами каждые восемь секунд, полоса под активным показывает
 * оставшееся время; дойдя до конца вкладки, лента переходит к следующей.
 *
 * Ниже 1024px кадр встаёт над списком, а не сбоку: order у него нулевой,
 * у пунктов — первый. Сами пункты порядок не меняют и активный никуда не
 * переезжает, он раскрывается на своём месте — иначе при каждой смене список
 * перекладывался бы прямо во время анимации высоты. На мобильном кадр
 * листается свайпом.
 */
export function UseCases() {
  const [tabIndex, setTabIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)
  const fillsRef = useRef<(HTMLSpanElement | null)[]>([])
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const goToFlat = (flat: number) => {
    const next = ((flat % TOTAL_POINTS) + TOTAL_POINTS) % TOTAL_POINTS
    setTabIndex(Math.floor(next / POINTS_PER_TAB))
    setPointIndex(next % POINTS_PER_TAB)
  }

  // Прогресс идёт мимо состояния: перерисовывать секцию с двумя десятками
  // картинок каждый кадр незачем, меняется только ширина одной полосы.
  useEffect(() => {
    // Обнуляем все полосы, а не одну активную: transform лежит инлайном, и
    // у пройденных пунктов он иначе так и остаётся закрашенным до конца.
    fillsRef.current.forEach((fill) => {
      if (fill) fill.style.transform = 'scaleX(0)'
    })

    const next = () => goToFlat(tabIndex * POINTS_PER_TAB + pointIndex + 1)

    // При отключённой анимации лента всё равно листается — двигается контент,
    // а не картинка, — но полоса не ползёт, а просто ждёт своей смены.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = window.setTimeout(next, POINT_DURATION)
      return () => window.clearTimeout(timer)
    }

    let frame = 0
    let startedAt: number | null = null

    const tick = (time: number) => {
      if (startedAt === null) startedAt = time
      const progress = Math.min((time - startedAt) / POINT_DURATION, 1)
      const fill = fillsRef.current[pointIndex]
      if (fill) fill.style.transform = `scaleX(${progress})`

      if (progress >= 1) {
        next()
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [tabIndex, pointIndex])

  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return

    const dx = event.changedTouches[0].clientX - start.x
    const dy = event.changedTouches[0].clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return

    goToFlat(tabIndex * POINTS_PER_TAB + pointIndex + (dx < 0 ? 1 : -1))
  }

  const activeMedia = useCaseTabs[tabIndex].items[pointIndex].media

  return (
    <section
      id="use-cases"
      className="bg-canvas px-16 pt-32 pb-56 [--rule:max(1px,calc(1*var(--u)))] md:px-20 md:pb-80 lg:px-40 lg:pb-128"
    >
      <div className="flex flex-col gap-32 md:gap-40">
        <header className="flex flex-col items-stretch gap-16 lg:gap-20">
          {/*
            Кегль не через text-u-*: на десктопе он задан clamp-ом, а своя
            утилита стоит в каскаде после базовой и перебивала бы её.
          */}
          <h2 className="text-[calc(32*var(--u))] leading-[1.25] font-medium tracking-[calc(-1*var(--u))] whitespace-pre-wrap md:text-[calc(52*var(--u))] md:leading-[1.2308] lg:text-[clamp(34px,3.2vw,46px)] lg:leading-[1.1] lg:whitespace-nowrap">
            <span className="md:hidden">{useCasesTitle.narrow}</span>
            <span className="hidden md:inline">{useCasesTitle.wide}</span>
          </h2>

          <div
            role="tablist"
            aria-label="Типы контента"
            className="-mx-16 flex w-[calc(100%_+_32*var(--u))] gap-2 overflow-x-auto px-16 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:w-full md:gap-8 md:px-0 lg:w-auto lg:self-start lg:overflow-visible"
          >
            {useCaseTabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={index === tabIndex}
                aria-controls="use-cases-panel"
                onClick={() => {
                  setTabIndex(index)
                  setPointIndex(0)
                }}
                className={`text-u-13 shrink-0 rounded-[12px] px-12 py-6 font-medium whitespace-nowrap transition-[background-color,color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.975] md:px-16 md:py-10 md:text-u-16 lg:px-[10px] ${
                  index === tabIndex
                    ? 'bg-ink text-ink-contrast'
                    : 'bg-[#f5f5f7] text-ink hover:bg-[#ebebee]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col gap-10 md:gap-24 lg:grid lg:grid-cols-[24.5%_minmax(0,1fr)] lg:items-stretch lg:gap-32">
          {/* Ниже 1024px обёртка растворяется, и пункты становятся соседями кадра. */}
          <div className="contents lg:flex lg:flex-col lg:justify-end">
            {useCaseTabs[tabIndex].items.map((item, index) => {
              const isActive = index === pointIndex
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setPointIndex(index)}
                  className="relative order-1 flex flex-col gap-[5px] py-12 text-left md:py-16 lg:py-20 lg:first:pt-0"
                >
                  <h3
                    className={`text-u-16 leading-[calc(22*var(--u))] font-medium transition-colors duration-300 md:text-u-20 md:leading-[calc(28*var(--u))] md:tracking-[calc(-0.5*var(--u))] lg:leading-[1.4] ${
                      isActive ? 'text-ink' : 'text-black/40'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Описание раскрывается высотой грид-строки: анимировать auto нельзя. */}
                  <p
                    className={`text-u-14 grid leading-[calc(20*var(--u))] font-medium text-ink-muted transition-[grid-template-rows,opacity] duration-500 ease-menu md:leading-[calc(24*var(--u))] lg:leading-[1.4286] ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="block min-h-0 overflow-hidden">{item.desc}</span>
                  </p>

                  <span className="absolute inset-x-0 bottom-[calc(-1*var(--rule))] h-[var(--rule)] bg-black/10">
                    <span
                      ref={(node) => {
                        fillsRef.current[index] = node
                      }}
                      className="block h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#ffcdb3_0%,#ffa4b6_38%,#ffb2e9_68%,#d4d6ff_100%)]"
                    />
                  </span>
                </button>
              )
            })}
          </div>

          <div
            id="use-cases-panel"
            onTouchStart={(event) => {
              const touch = event.touches[0]
              touchStart.current = { x: touch.clientX, y: touch.clientY }
            }}
            onTouchEnd={onTouchEnd}
            className="relative order-0 aspect-square touch-pan-y overflow-hidden rounded-[6px] bg-[#0d0d0d] md:aspect-[770/432] md:rounded-[calc(12*var(--u))] lg:aspect-[995/558]"
          >
            {allMedia.map((media, index) => (
              <img
                key={media}
                src={asset(media)}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  media === activeMedia ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
