import { security } from '../../content/security'
import { asset } from '../../lib/asset'

export function Security() {
  return (
    <section
      id="features"
      className="flex flex-col gap-32 bg-canvas px-[16px] pt-32 pb-42 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <h2 className="text-u-32 leading-[calc(40/32)] font-medium tracking-[calc(-1.25*var(--u))] md:text-u-52 md:leading-[calc(64/52)]">
        {security.title}
      </h2>

      <div className="grid grid-cols-1 gap-[40px] md:gap-[16px] lg:grid-cols-3 lg:gap-32">
        {security.points.map((point) => (
          <article key={point.image} className="flex flex-col items-stretch gap-12 md:gap-20">
            <picture className="block h-[calc(171.5*var(--u))] w-full overflow-hidden rounded-[6px] md:aspect-square md:h-auto md:rounded-[calc(12*var(--u))] lg:aspect-auto lg:h-432 lg:rounded-[20px]">
              <source media="(max-width: 767px)" srcSet={asset(point.imageMobile)} />
              <img
                src={asset(point.image)}
                alt=""
                className="block h-full w-full object-cover object-center"
              />
            </picture>

            <div className="flex flex-col items-start gap-[4px] md:h-[100px]">
              <h3 className="text-u-16 leading-[calc(22*var(--u))] font-medium tracking-normal md:text-u-20 md:leading-[calc(28*var(--u))] md:tracking-[calc(-0.5*var(--u))] lg:text-u-24 lg:leading-[1.3334] lg:tracking-[calc(-1*var(--u))]">
                {point.title}
              </h3>
              <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[calc(24*var(--u))] lg:leading-[1.5]">
                {point.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
