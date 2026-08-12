import { Fragment } from 'react'
import { process } from '../../content/process'
import { asset } from '../../lib/asset'

const mediaClass =
  'block h-343 w-full rounded-[16px] object-cover md:aspect-square md:h-auto md:rounded-[calc(12*var(--u))] lg:aspect-auto lg:h-432 lg:rounded-[20px]'

/**
 * «Одна платформа — весь маркетинг»: три карточки без подложки, картинка
 * со скруглением и подпись под ней. На планшете картинки становятся
 * квадратными, на мобильном карточки идут в одну колонку.
 */
export function Process() {
  return (
    <section
      id="process"
      className="flex flex-col gap-32 bg-canvas px-16 pt-32 pb-42 md:gap-40 md:px-20 md:pb-80 lg:px-40 lg:pb-128"
    >
      <header className="flex flex-col gap-8">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          <span className="md:hidden">
            {process.titleMobile.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </span>
          <span className="hidden md:inline">{process.title}</span>
        </h2>
        <p className="text-u-14 leading-[1.4286] text-ink-muted md:text-u-16 md:leading-[1.5]">
          {process.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-[40px] md:grid-cols-3 md:gap-[16px] lg:gap-32">
        {process.steps.map((step) => (
          <article key={step.image} className="flex flex-col">
            {step.imageMobile ? (
              <picture>
                <source media="(max-width: 767px)" srcSet={asset(step.imageMobile)} />
                {step.imageTablet && (
                  <source media="(max-width: 1023px)" srcSet={asset(step.imageTablet)} />
                )}
                <img src={asset(step.image)} alt="" className={mediaClass} />
              </picture>
            ) : (
              <img src={asset(step.image)} alt="" className={mediaClass} />
            )}

            <div className="flex flex-col gap-[4px] pt-[12px] md:pt-[16px] lg:h-[100px]">
              <h3 className="text-u-20 leading-[1.4] font-medium tracking-[calc(-0.5*var(--u))] md:leading-[calc(28*var(--u))] lg:text-u-24 lg:leading-[1.3334] lg:tracking-[calc(-1*var(--u))]">
                <span className="md:hidden">{step.nameMobile}</span>
                <span className="hidden md:inline">{step.name}</span>
              </h3>
              <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[calc(24*var(--u))] lg:leading-[1.5]">
                {step.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
