import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { request } from '../../content/request'

type RequestProps = {
  /** Тариф, выбранный кнопкой в секции «Тарифы». */
  plan: string
  onPlanChange: (planId: string) => void
}

type Values = {
  name: string
  email: string
  company: string
  task: string
  consent: boolean
}

type FieldName = 'name' | 'email' | 'company' | 'consent'

const emptyValues: Values = { name: '', email: '', company: '', task: '', consent: false }

/*
  Проверка адреса намеренно грубая: точную решает почтовый сервер, а строгая
  регулярка отсекает живые адреса — здесь достаточно поймать опечатку.
*/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const validate = (values: Values) => {
  const found: Partial<Record<FieldName, string>> = {}
  const name = values.name.trim()
  const email = values.email.trim()

  if (!name) found.name = request.errors.nameRequired
  else if (name.length < 2) found.name = request.errors.nameShort

  if (!email) found.email = request.errors.emailRequired
  else if (!emailPattern.test(email)) found.email = request.errors.emailInvalid

  if (!values.company.trim()) found.company = request.errors.companyRequired
  if (!values.consent) found.consent = request.errors.consentRequired

  return found
}

const fieldClass =
  'text-u-14 w-full rounded-[12px] bg-[#f5f5f7] px-14 py-12 leading-[1.4286] font-medium transition-[background-color,box-shadow] duration-200 placeholder:text-black/35 hover:bg-[#ebebee] md:text-u-15 md:px-16 md:py-14'

const invalidClass = 'shadow-[inset_0_0_0_1px_var(--color-error)] bg-[#fdf3f5] hover:bg-[#fdf3f5]'

const labelClass = 'text-u-13 font-medium leading-[1.3847] md:text-u-14'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-u-12 leading-[1.3334] font-medium text-error md:text-u-13">
      {message}
    </p>
  )
}

/**
 * Форма заявки. Бэкенда по условию задачи нет, поэтому отправка имитируется
 * задержкой, а в подтверждении об этом сказано прямо.
 *
 * Ошибки показываются только после первой попытки отправки: подчёркивать
 * незаполненное поле, пока человек до него не дошёл, — раздражает. После
 * первой попытки форма переходит в режим проверки на каждое изменение,
 * чтобы исправление сразу гасило ошибку.
 */
export function Request({ plan, onPlanChange }: RequestProps) {
  const [values, setValues] = useState<Values>(emptyValues)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const timer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (wasSubmitted) setErrors(validate(next))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setWasSubmitted(true)

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      // Курсор уводим к первому незаполненному полю, а не к началу формы.
      const firstInvalid = Object.keys(found)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setIsSending(true)
    timer.current = window.setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
    }, 900)
  }

  const reset = () => {
    setValues(emptyValues)
    setErrors({})
    setWasSubmitted(false)
    setIsSent(false)
    onPlanChange('unset')
  }

  const describedBy = (field: FieldName) => (errors[field] ? `request-${field}-error` : undefined)

  return (
    <section
      id="request"
      className="bg-canvas px-16 pt-32 pb-42 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <div className="grid gap-24 rounded-[20px] bg-surface p-16 md:gap-32 md:p-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-64 lg:p-40">
        <div className="flex flex-col">
          <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-40 md:leading-[1.2] md:tracking-[calc(-1.25*var(--u))]">
            {request.title}
          </h2>
          <p className="text-u-14 mt-8 leading-[1.4286] font-medium text-ink-muted md:mt-12 md:text-u-16 md:leading-[1.5]">
            {request.subtitle}
          </p>

          <ul className="mt-24 flex flex-col gap-12 md:mt-32 md:gap-16">
            {request.assurances.map((line) => (
              <li key={line} className="text-u-13 flex items-start gap-10 leading-[1.3847] font-medium text-ink-muted md:text-u-14 md:leading-[1.4286]">
                <span
                  aria-hidden
                  className="mt-[0.4em] h-8 w-8 shrink-0 rounded-full bg-[image:var(--brand-gradient)]"
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {isSent ? (
          <div
            role="status"
            className="flex animate-reveal-up flex-col items-start justify-center rounded-[16px] bg-[#f5f5f7] p-20 motion-reduce:animate-none md:p-32"
          >
            <span
              aria-hidden
              className="flex h-40 w-40 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] md:h-48 md:w-48"
            >
              <svg viewBox="0 0 24 24" className="h-20 w-20 text-white md:h-24 md:w-24">
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <h3 className="text-u-24 mt-16 leading-[1.3334] font-medium tracking-[calc(-0.5*var(--u))] md:mt-20 md:text-u-28">
              {request.success.title}
            </h3>
            <p className="text-u-14 mt-8 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
              {request.success.text}
            </p>
            <p className="text-u-12 mt-12 leading-[1.3334] font-medium text-ink-subtle md:text-u-13">
              {request.success.demoNote}
            </p>

            <button
              type="button"
              onClick={reset}
              className="text-u-14 mt-24 inline-flex cursor-pointer items-center justify-center rounded-[12px] bg-surface px-16 py-12 leading-[1.4286] font-semibold transition-[background-color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#ebebee] active:scale-[0.975] md:mt-32 md:px-20 md:py-14 md:text-u-15"
            >
              {request.success.again}
            </button>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-16 md:gap-20">
            <div className="grid gap-16 md:grid-cols-2 md:gap-20">
              <div className="flex flex-col gap-6">
                <label htmlFor="request-name" className={labelClass}>
                  {request.fields.name.label}
                </label>
                <input
                  id="request-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={request.fields.name.placeholder}
                  value={values.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy('name')}
                  className={`${fieldClass} ${errors.name ? invalidClass : ''}`}
                />
                <FieldError id="request-name-error" message={errors.name} />
              </div>

              <div className="flex flex-col gap-6">
                <label htmlFor="request-email" className={labelClass}>
                  {request.fields.email.label}
                </label>
                <input
                  id="request-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={request.fields.email.placeholder}
                  value={values.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy('email')}
                  className={`${fieldClass} ${errors.email ? invalidClass : ''}`}
                />
                <FieldError id="request-email-error" message={errors.email} />
              </div>

              <div className="flex flex-col gap-6">
                <label htmlFor="request-company" className={labelClass}>
                  {request.fields.company.label}
                </label>
                <input
                  id="request-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder={request.fields.company.placeholder}
                  value={values.company}
                  onChange={(event) => update('company', event.target.value)}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={describedBy('company')}
                  className={`${fieldClass} ${errors.company ? invalidClass : ''}`}
                />
                <FieldError id="request-company-error" message={errors.company} />
              </div>

              <div className="flex flex-col gap-6">
                <label htmlFor="request-plan" className={labelClass}>
                  {request.fields.plan.label}
                </label>
                {/*
                  Нативную стрелку селекта не покрасить, поэтому она снята
                  appearance-none и нарисована своей: та же галка, что у кнопок
                  слайдера, только повёрнутая вниз.
                */}
                <div className="relative">
                  <select
                    id="request-plan"
                    name="plan"
                    value={plan}
                    onChange={(event) => onPlanChange(event.target.value)}
                    className={`${fieldClass} cursor-pointer appearance-none pr-40`}
                  >
                    {request.planOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    focusable="false"
                    className="pointer-events-none absolute top-1/2 right-14 h-16 w-16 -translate-y-1/2 text-black/45 md:right-16"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <label htmlFor="request-task" className={`${labelClass} flex items-center gap-8`}>
                {request.fields.task.label}
                <span className="text-u-12 font-medium text-ink-subtle md:text-u-13">
                  {request.fields.task.optional}
                </span>
              </label>
              <textarea
                id="request-task"
                name="task"
                rows={3}
                placeholder={request.fields.task.placeholder}
                value={values.task}
                onChange={(event) => update('task', event.target.value)}
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-6">
              {/*
                Ссылка на политику стоит вне <label>: внутри него клик по ссылке
                заодно переключал бы галочку. Поэтому подпись разрезана на два
                узла, а сам квадратик — это второй label того же поля.
              */}
              <div className="flex items-start gap-10">
                <input
                  id="request-consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => update('consent', event.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={describedBy('consent')}
                  className="peer sr-only"
                />
                <label
                  htmlFor="request-consent"
                  aria-hidden
                  className={`mt-[1px] flex h-18 w-18 shrink-0 cursor-pointer items-center justify-center rounded-[5px] border transition-[background-color,border-color] duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink md:h-20 md:w-20 ${
                    values.consent
                      ? 'border-ink bg-ink'
                      : errors.consent
                        ? 'border-error'
                        : 'border-black/25'
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-12 w-12 text-white transition-[opacity,scale] duration-200 ease-motion md:h-14 md:w-14 ${
                      values.consent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                    }`}
                  >
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>

                <span className="text-u-13 leading-[1.3847] font-medium text-ink-muted md:text-u-14 md:leading-[1.4286]">
                  <label htmlFor="request-consent" className="cursor-pointer">
                    {request.consent.text} в соответствии с
                  </label>{' '}
                  <a
                    href={request.consent.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink underline underline-offset-2 hover:opacity-70"
                  >
                    {request.consent.linkLabel}
                  </a>
                </span>
              </div>
              <FieldError id="request-consent-error" message={errors.consent} />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="text-u-14 mt-4 inline-flex cursor-pointer items-center justify-center gap-10 rounded-[12px] bg-ink px-20 py-14 leading-[1.4286] font-semibold text-ink-contrast transition-[background-color,scale,opacity] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] enabled:hover:bg-[#242424] enabled:active:scale-[0.975] disabled:opacity-70 md:self-start md:px-24 md:py-16 md:text-u-15"
            >
              {isSending && (
                <span
                  aria-hidden
                  className="h-14 w-14 animate-spin rounded-full border-2 border-white/30 border-t-white md:h-16 md:w-16"
                />
              )}
              {isSending ? request.submitting : request.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
