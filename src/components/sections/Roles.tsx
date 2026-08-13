import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { roles } from '../../content/roles'

const PANEL_ID = 'roles-panel'
const tabId = (index: number) => `roles-tab-${index}`

const keyToOffset: Record<string, number | 'first' | 'last'> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
  Home: 'first',
  End: 'last',
}

export function Roles() {
  const [active, setActive] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const focusTab = (index: number) => {
    const next = (index + roles.items.length) % roles.items.length
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const offset = keyToOffset[event.key]
    if (offset === undefined) return
    event.preventDefault()

    if (offset === 'first') focusTab(0)
    else if (offset === 'last') focusTab(roles.items.length - 1)
    else focusTab(active + offset)
  }

  const item = roles.items[active]

  return (
    <section
      id="roles"
      className="flex flex-col gap-32 bg-canvas px-16 pt-32 pb-42 md:gap-40 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <header className="flex flex-col gap-8">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          {roles.title}
        </h2>
        <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
          {roles.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
        <div
          role="tablist"
          aria-label="Роли в команде"
          onKeyDown={onKeyDown}
          className="relative grid grid-cols-4 rounded-[14px] bg-[#f5f5f7] p-[3px] md:rounded-[16px] md:p-[4px] lg:w-560"
        >
          <span
            aria-hidden
            style={{ '--seg': active } as CSSProperties}
            className="pointer-events-none absolute inset-y-[3px] left-[3px] w-[calc((100%_-_6px)/4)] translate-x-[calc(var(--seg)*100%)] rounded-[11px] bg-ink transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none md:inset-y-[4px] md:left-[4px] md:w-[calc((100%_-_8px)/4)] md:rounded-[12px]"
          />

          {roles.items.map((role, index) => (
            <button
              key={role.label}
              ref={(node) => {
                tabsRef.current[index] = node
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={index === active}
              aria-controls={PANEL_ID}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              className={`text-u-13 relative z-1 cursor-pointer rounded-[11px] px-4 py-10 font-medium whitespace-nowrap transition-[color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.975] md:rounded-[12px] md:py-12 md:text-u-15 ${
                index === active ? 'text-ink-contrast' : 'text-ink hover:text-black/55'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          className="rounded-[20px] bg-surface p-16 md:p-24 lg:flex lg:min-h-296 lg:flex-col lg:p-32"
        >
          <div
            key={item.label}
            className="grid animate-reveal-up gap-24 motion-reduce:animate-none md:gap-32 lg:flex-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-40"
          >
            <div className="flex flex-col">
              <p className="text-u-12 leading-[1.3334] font-semibold text-ink-subtle md:text-u-14">
                {item.owner}
              </p>
              <h3 className="text-u-24 mt-8 leading-[1.3334] font-medium tracking-[calc(-0.5*var(--u))] md:mt-12 md:text-u-32 md:leading-[1.25] md:tracking-[calc(-1*var(--u))]">
                {item.headline}
              </h3>
              <p className="text-u-14 mt-8 leading-[1.4286] font-medium text-ink-muted md:mt-12 md:text-u-16 md:leading-[1.5]">
                {item.task}
              </p>

              <p className="text-u-14 mt-auto flex items-start gap-10 pt-20 leading-[1.4286] font-semibold md:pt-32 md:text-u-16 md:leading-[1.5]">
                <span
                  aria-hidden
                  className="mt-[0.45em] h-8 w-8 shrink-0 rounded-full bg-[image:var(--brand-gradient)]"
                />
                {item.outcome}
              </p>
            </div>

            <ol className="flex flex-col gap-16 md:gap-20">
              {item.steps.map((step, index) => (
                <li
                  key={step}
                  className="relative grid grid-cols-[calc(28*var(--u))_minmax(0,1fr)] items-start gap-12 after:absolute after:top-28 after:bottom-[calc(-16*var(--u))] after:left-[calc(14*var(--u))] after:w-px after:bg-black/10 after:content-[''] last:after:hidden md:grid-cols-[calc(32*var(--u))_minmax(0,1fr)] md:gap-16 md:after:top-32 md:after:bottom-[calc(-20*var(--u))] md:after:left-[calc(16*var(--u))]"
                >
                  <span className="text-u-12 flex h-28 w-28 items-center justify-center rounded-full bg-[#f5f5f7] font-semibold md:h-32 md:w-32 md:text-u-14">
                    {index + 1}
                  </span>
                  <p className="text-u-14 pt-[0.35em] leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
