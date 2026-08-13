import { useRef } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { roadmap } from '../../content/roadmap'

const brandGradient =
  'bg-[linear-gradient(91.76deg,#ff6d3d_1.5%,#ff6ca7_56.4%,#bb6dff_103.9%)]'

export function Roadmap() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !scrollerRef.current) return
    drag.current = { x: event.pageX, left: scrollerRef.current.scrollLeft }
    scrollerRef.current.setPointerCapture(event.pointerId)
    event.preventDefault()
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scrollerRef.current) return
    scrollerRef.current.scrollLeft = drag.current.left - (event.pageX - drag.current.x)
  }

  const endDrag = () => {
    drag.current = null
  }

  return (
    <section
      id="roadmap"
      className="flex flex-col gap-32 overflow-hidden bg-canvas pt-32 pb-42 [--rmap-col:calc(260*var(--u))] [--rmap-extra:calc(4*var(--u))] [--rmap-pad:calc(16*var(--u))] md:gap-56 md:pb-60 md:[--rmap-col:calc(320*var(--u))] md:[--rmap-extra:0px] md:[--rmap-pad:calc(20*var(--u))] lg:pb-96 lg:[--rmap-pad:calc(40*var(--u))] min-[1440px]:[--rmap-extra:calc(4*var(--u))]"
    >
      <header className="flex flex-col gap-8 px-[var(--rmap-pad)]">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          {roadmap.title}
        </h2>
        <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
          {roadmap.subtitle}
        </p>
      </header>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab overflow-x-auto active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          style={{ '--rmap-progress': roadmap.progress } as CSSProperties}
          className="relative grid w-max auto-cols-[var(--rmap-col)] grid-flow-col px-[var(--rmap-pad)] pb-24 before:absolute before:top-16 before:right-[var(--rmap-pad)] before:left-[var(--rmap-pad)] before:h-px before:bg-black/50 before:content-[''] after:absolute after:top-16 after:left-[var(--rmap-pad)] after:h-px after:w-[calc(var(--rmap-progress)*var(--rmap-col)_+_var(--rmap-extra))] after:bg-[#ff68a4] after:content-[''] md:pb-0"
        >
          {roadmap.items.map((item, index) => {
            const isReached = index < roadmap.reachedCount
            return (
              <article
                key={item.name}
                className="relative flex flex-col items-start gap-24 md:gap-48"
              >
                <span className="relative -ml-12 h-32 w-32 shrink-0 rounded-full">
                  <span
                    className={`absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      isReached ? `${brandGradient} opacity-[0.18]` : 'bg-black/60 opacity-[0.12]'
                    }`}
                  />
                  <span
                    className={`absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      isReached ? brandGradient : 'bg-black/60'
                    }`}
                  />
                </span>

                <div className="flex min-h-117 w-full flex-col pr-24 md:pr-64">
                  <h3 className="text-u-14 leading-[1.4286] font-medium md:text-u-16 md:leading-[1.5] md:tracking-[calc(-0.5*var(--u))]">
                    {item.name}
                  </h3>
                  <p className="text-u-12 mt-8 leading-[1.1667] font-medium text-ink-muted md:text-u-14 md:leading-[1.4286]">
                    {item.desc}
                  </p>
                  <p className="text-u-12 mt-auto pt-12 leading-[1.1667] font-medium md:text-u-14 md:leading-[1.4286]">
                    {item.date}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
