import { pricing } from '../../content/pricing'
import { asset } from '../../lib/asset'

type PricingProps = {
  /** Выбор уезжает в форму заявки: она стоит ниже отзывов, якорем. */
  onSelectPlan: (planId: string) => void
}

/**
 * «Три формата подключения». Сумм в карточках нет — публичного прайса у
 * платформы тоже нет, поэтому на месте цены стоит формат доступа, а разговор
 * о деньгах уводится в заявку.
 *
 * Средняя карточка обведена фирменным градиентом — той же рамкой, что колонка
 * продукта в таблице сравнения. Кнопка ведёт в форму и подставляет туда тариф.
 */
export function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section
      id="pricing"
      className="flex flex-col gap-32 bg-canvas px-16 pt-32 pb-42 md:gap-40 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <header className="flex flex-col gap-8">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          {pricing.title}
        </h2>
        <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
          {pricing.subtitle}
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-3 md:gap-16 lg:gap-32">
        {pricing.plans.map((plan) => (
          <article
            key={plan.id}
            className="relative flex flex-col rounded-[20px] bg-surface p-16 transition-shadow duration-300 ease-motion hover:shadow-[0_18px_40px_rgba(29,22,40,0.07)] md:p-20 lg:p-32"
          >
            {plan.featured && (
              <span
                aria-hidden
                className="gradient-frame pointer-events-none absolute inset-0 rounded-[20px] bg-[linear-gradient(135deg,#ff6d3d_0%,#ff6ca7_52%,#bb6dff_100%)] p-2"
              />
            )}

            <h3 className="text-u-24 leading-[1.3334] font-medium tracking-[calc(-0.5*var(--u))] md:text-u-28 md:leading-[1.2858] md:tracking-[calc(-1*var(--u))]">
              {plan.name}
            </h3>

            {/* На месте цены — формат доступа, набранный как цена. */}
            <p className="text-u-14 mt-12 inline-flex w-fit rounded-[10px] bg-[#f5f5f7] px-10 py-6 leading-[1.4286] font-semibold md:mt-16 md:text-u-15">
              {plan.access}
            </p>

            <p className="text-u-14 mt-12 leading-[1.4286] font-medium text-ink-muted md:mt-16 md:text-u-15 md:leading-[1.4667]">
              {plan.tagline}
            </p>

            <ul className="mt-20 flex flex-col gap-10 border-t border-black/[0.06] pt-20 md:mt-24 md:gap-12 md:pt-24">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-8">
                  <img
                    src={asset('icon-check.svg')}
                    alt=""
                    className="mt-[0.2em] block h-16 w-16 shrink-0"
                  />
                  <span className="text-u-14 leading-[1.4286] font-medium md:text-u-15 md:leading-[1.4667]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#request"
              onClick={() => onSelectPlan(plan.id)}
              className={`text-u-14 mt-24 inline-flex items-center justify-center rounded-[12px] px-16 py-12 leading-[1.4286] font-semibold transition-[background-color,color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.975] md:mt-32 md:px-20 md:py-14 md:text-u-15 ${
                plan.featured
                  ? 'bg-ink text-ink-contrast hover:bg-[#242424]'
                  : 'bg-[#f5f5f7] text-ink hover:bg-[#ebebee]'
              }`}
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>

      <p className="text-u-13 leading-[1.3847] font-medium text-ink-subtle md:text-u-14 md:leading-[1.4286] lg:max-w-760">
        {pricing.note}
      </p>
    </section>
  )
}
