import { useRef, useState } from 'react'
import type { KeyboardEvent, TouchEvent } from 'react'
import { testimonials } from '../../content/testimonials'

const SWIPE_THRESHOLD = 40
const LAST = testimonials.items.length - 1

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={`h-16 w-16 md:h-20 md:w-20 ${back ? 'rotate-180' : ''}`}
    >
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * «Что говорят команды»: слайдер обезличенных цитат.
 *
 * Дорожка едет трансформом, а слайды лежат в одну строку и растягиваются до
 * общей высоты — поэтому при переключении карточка не прыгает под самой
 * длинной цитатой. Листается кнопками, точками, стрелками и свайпом.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const go = (next: number) => setIndex(Math.min(Math.max(next, 0), LAST))

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(index - 1)
    }
  }

  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return

    const dx = event.changedTouches[0].clientX - start.x
    const dy = event.changedTouches[0].clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return

    go(index + (dx < 0 ? 1 : -1))
  }

  return (
    <section
      id="testimonials"
      className="flex flex-col gap-32 bg-canvas px-16 pt-32 pb-42 md:gap-40 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
      onKeyDown={onKeyDown}
    >
      <header className="flex flex-col gap-8">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          {testimonials.title}
        </h2>
        <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
          {testimonials.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-16 md:gap-20">
        {/*
          Объявляем только номер слайда: если повесить aria-live на дорожку,
          скринридер зачитает все пять цитат разом.
        */}
        <p aria-live="polite" className="sr-only">
          {`Отзыв ${index + 1} из ${testimonials.items.length}`}
        </p>

        <div
          onTouchStart={(event) => {
            const touch = event.touches[0]
            touchStart.current = { x: touch.clientX, y: touch.clientY }
          }}
          onTouchEnd={onTouchEnd}
          className="touch-pan-y overflow-hidden rounded-[20px]"
        >
          <div
            className="flex transition-transform duration-[600ms] ease-motion motion-reduce:transition-none"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {testimonials.items.map((item, slide) => (
              <figure
                key={item.quote}
                role="group"
                aria-roledescription="слайд"
                aria-label={`${slide + 1} из ${testimonials.items.length}`}
                aria-hidden={slide !== index}
                className="flex w-full shrink-0 flex-col bg-surface p-20 md:p-32 lg:p-40"
              >
                <blockquote className="text-u-18 leading-[1.3334] font-medium tracking-[calc(-0.5*var(--u))] md:text-u-28 md:leading-[1.2858] md:tracking-[calc(-1*var(--u))] lg:max-w-900">
                  {`«${item.quote}»`}
                </blockquote>

                {/* Подпись собрана в столбец: разбрасывать её по краям карточки не даём. */}
                <figcaption className="mt-auto flex flex-col items-start gap-12 pt-24 md:gap-16 md:pt-40">
                  <div className="flex flex-col gap-2">
                    <span className="text-u-14 leading-[1.4286] font-semibold md:text-u-16 md:leading-[1.5]">
                      {item.role}
                    </span>
                    <span className="text-u-13 leading-[1.3847] font-medium text-ink-subtle md:text-u-14 md:leading-[1.4286]">
                      {item.industry}
                    </span>
                  </div>

                  <p className="text-u-13 flex items-start gap-8 leading-[1.3847] font-medium md:max-w-360 md:text-u-14 md:leading-[1.4286]">
                    <span
                      aria-hidden
                      className="mt-[0.4em] h-8 w-8 shrink-0 rounded-full bg-[image:var(--brand-gradient)]"
                    />
                    {item.result}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="flex items-center gap-6">
            {testimonials.items.map((item, slide) => (
              <button
                key={item.role}
                type="button"
                aria-label={`Отзыв ${slide + 1}`}
                aria-current={slide === index}
                onClick={() => setIndex(slide)}
                className={`h-6 cursor-pointer rounded-full transition-[width,background-color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  slide === index
                    ? 'w-24 bg-[image:var(--brand-gradient)]'
                    : 'w-6 bg-black/15 hover:bg-black/30'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              disabled={index === 0}
              onClick={() => go(index - 1)}
              className="inline-flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-[#f5f5f7] transition-[background-color,color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] enabled:hover:bg-[#ebebee] enabled:active:scale-[0.975] disabled:cursor-default disabled:text-black/25 md:h-48 md:w-48"
            >
              <Chevron back />
            </button>
            <button
              type="button"
              aria-label="Следующий отзыв"
              disabled={index === LAST}
              onClick={() => go(index + 1)}
              className="inline-flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-[#f5f5f7] transition-[background-color,color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] enabled:hover:bg-[#ebebee] enabled:active:scale-[0.975] disabled:cursor-default disabled:text-black/25 md:h-48 md:w-48"
            >
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
