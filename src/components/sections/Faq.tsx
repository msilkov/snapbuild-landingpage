import { useState } from 'react'
import { faq } from '../../content/faq'
import { asset } from '../../lib/asset'

/**
 * Аккордеон вопросов. В оригинале это чекбоксы, поэтому открытых пунктов
 * может быть сколько угодно — поведение сохранено. Ответ раскрывается
 * высотой грид-строки: анимировать height: auto нельзя.
 */
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

      <div className="grid gap-y-16 md:gap-y-20 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-4 lg:gap-x-32">
        {faq.items.map(({ question, answer }) => {
          const isOpen = openIds.includes(question)
          const panelId = `faq-panel-${question.slice(0, 24)}`

          return (
            <div
              key={question}
              className="flex flex-col self-start rounded-[20px] bg-[#fafafa] p-16 md:p-20"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(question)}
                className="flex cursor-pointer items-center justify-between gap-16 text-left md:gap-20"
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
    </section>
  )
}
