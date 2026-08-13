import { useEffect, useLayoutEffect, useRef } from 'react'
import type { Metric } from '../../content/results'
import { results } from '../../content/results'
import { useInView } from '../../lib/useInView'

const COUNT_DURATION = 1400

/** Быстрый разгон и мягкая остановка: к концу счётчик почти стоит. */
const easeOut = (progress: number) => 1 - (1 - progress) ** 3

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Одно число полосы. Счётчик и полоска под ним идут мимо состояния React:
 * это две записи в DOM за кадр против перерисовки всей секции.
 */
function Counter({ metric, isActive }: { metric: Metric; isActive: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const text = `${metric.value}${metric.suffix ?? ''}`

  // В разметке стоят конечные значения — так их видно и до срабатывания
  // наблюдателя. Обнуляем до первой отрисовки, иначе мелькнёт результат.
  // Полоса обнуляется здесь же, а не утилитой scale-x-0: та эмитит свойство
  // scale, оно перемножается с transform от кадра анимации и обнуляет его.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    if (valueRef.current) valueRef.current.textContent = `0${metric.suffix ?? ''}`
    if (fillRef.current) fillRef.current.style.transform = 'scaleX(0)'
  }, [metric.suffix])

  useEffect(() => {
    if (!isActive || prefersReducedMotion()) return

    let frame = 0
    let startedAt: number | null = null

    const tick = (time: number) => {
      if (startedAt === null) startedAt = time
      const progress = Math.min((time - startedAt) / COUNT_DURATION, 1)
      const eased = easeOut(progress)

      if (valueRef.current) {
        valueRef.current.textContent = `${Math.round(metric.value * eased)}${metric.suffix ?? ''}`
      }
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${eased})`

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isActive, metric.value, metric.suffix])

  return (
    <>
      <p className="text-u-44 leading-[1.05] font-medium tracking-[calc(-2*var(--u))] text-white md:text-u-64 md:tracking-[calc(-3*var(--u))] lg:text-u-72">
        {/* Меняющееся число для скринридера — шум, поэтому озвучивается итог. */}
        <span ref={valueRef} aria-hidden>
          {text}
        </span>
        <span className="sr-only">{text}</span>
      </p>

      {/* Та же полоска прогресса, что под активным пунктом «Возможностей». */}
      <span className="mt-12 block h-px w-full bg-white/15 md:mt-16">
        <span
          ref={fillRef}
          className="block h-full w-full origin-left bg-[linear-gradient(90deg,#ffcdb3_0%,#ffa4b6_38%,#ffb2e9_68%,#d4d6ff_100%)]"
        />
      </span>
    </>
  )
}

/**
 * Полоса результатов после таблицы сравнения. Единственный тёмный блок на
 * странице: тот же #0d0d0d, что у кадра в «Возможностях», — так полоса
 * отделяет сравнение от блока безопасности, не вводя нового цвета.
 */
export function Results() {
  const [bandRef, isInView] = useInView<HTMLDivElement>(0.3)

  return (
    <section
      id="results"
      className="bg-canvas px-16 pt-32 pb-42 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <div
        ref={bandRef}
        className="flex flex-col gap-32 rounded-[20px] bg-[#0d0d0d] p-20 md:gap-40 md:rounded-[24px] md:p-32 lg:rounded-[32px] lg:p-40"
      >
        <header className="flex flex-col gap-8 lg:max-w-720">
          <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] text-white md:text-u-52 md:leading-[1.2308]">
            {results.title}
          </h2>
          <p className="text-u-14 leading-[1.4286] font-medium text-white/60 md:text-u-16 md:leading-[1.5]">
            {results.subtitle}
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-x-16 gap-y-32 md:gap-x-32 md:gap-y-40 lg:grid-cols-4">
          {results.items.map((metric) => (
            <li key={metric.label} className="flex flex-col">
              <Counter metric={metric} isActive={isInView} />
              <p className="text-u-13 mt-12 leading-[1.3847] font-medium text-white/60 md:mt-16 md:text-u-15 md:leading-[1.4]">
                {metric.label}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-u-12 leading-[1.3334] font-medium text-white/40 md:text-u-13">
          {results.note}
        </p>
      </div>
    </section>
  )
}
