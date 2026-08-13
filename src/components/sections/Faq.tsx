import { useState } from 'react'
import { faq } from '../../content/faq'
import { asset } from '../../lib/asset'

// Выше 1024px две независимые колонки, а не сетка: в сетке общая строка
// тянется по высокому соседу и раскрытие слева толкает правую колонку.
const half = Math.ceil(faq.items.length / 2)
const columns = [faq.items.slice(0, half), faq.items.slice(half)]

export function Faq() {
  const [openIds, setOpenIds] = useState<string[]>([])

  const toggle = (question: string) =>
    setOpenIds((open) =>
      open.includes(question) ? open.filter((id) => id !== question) : [...open, question],
    )

  return (
    <section
      id="faq"
      className="flex flex-col gap-40 bg-canvas px-16 pt-32 pb-42 md:px-20 md:pb-60 lg:gap-64 lg:px-40 lg:pb-96"
    >
      <header className="flex flex-col gap-8">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          {faq.title}
        </h2>
        <p className="text-u-14 leading-[1.4286] text-ink-muted md:text-u-16 md:leading-[1.5]">
          {faq.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-16 md:gap-20 lg:flex-row lg:items-start lg:gap-x-32 lg:gap-y-0">
        {columns.map((column) => (
          <div
            key={column[0].question}
            className="flex flex-col gap-16 md:gap-20 lg:min-w-0 lg:flex-1"
          >
            {column.map(({ question, answer }) => {
              const isOpen = openIds.includes(question)
              const panelId = `faq-panel-${question.slice(0, 24)}`

              return (
                <div
                  key={question}
                  className="relative flex flex-col rounded-[20px] bg-[#fafafa] p-16 md:p-20"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(question)}
                    className="flex cursor-pointer items-center justify-between gap-16 text-left after:absolute after:inset-0 after:z-2 after:rounded-[inherit] after:content-[''] md:gap-20"
                  >
                    <span className="text-u-14 leading-[1.4286] font-medium md:text-u-16 md:leading-[1.5]">
                      {question}
                    </span>
                    <img
                      src={asset('icon-plus.webp')}
                      alt=""
                      className={`block h-[20px] w-[20px] shrink-0 transition-transform duration-200 ease-motion md:h-[24px] md:w-[24px] ${
                        isOpen ? 'rotate-45 duration-[367ms]' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows,margin-top] duration-200 ease-motion ${
                      isOpen ? 'mt-12 grid-rows-[1fr] duration-[367ms]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <p
                      className={`text-u-14 min-h-0 overflow-hidden leading-[1.4286] font-medium whitespace-pre-line text-ink-subtle transition-opacity duration-200 ease-motion ${
                        isOpen ? 'opacity-100 delay-100 duration-[367ms]' : 'opacity-0'
                      }`}
                    >
                      {answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
