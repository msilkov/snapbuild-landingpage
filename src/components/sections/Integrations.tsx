import { integrations } from '../../content/integrations'
import { useInView } from '../../lib/useInView'
import { ToolMark } from '../ui/ToolMark'

export function Integrations() {
  const [stepsRef, areStepsInView] = useInView<HTMLOListElement>(0.15)

  return (
    <section
      id="integrations"
      className="flex flex-col gap-32 bg-canvas px-16 pt-32 pb-42 md:gap-40 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <header className="flex flex-col gap-8">
        <h2 className="text-u-32 leading-[1.25] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[1.2308]">
          {integrations.title}
        </h2>
        <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted md:text-u-16 md:leading-[1.5]">
          {integrations.subtitle}
        </p>
      </header>

      <ol
        ref={stepsRef}
        className="grid gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-32"
      >
        {integrations.steps.map((step, index) => (
          <li
            key={step.title}
            style={{ animationDelay: `${index * 90}ms` }}
            className={`flex flex-col rounded-[20px] bg-surface p-16 md:p-20 lg:p-24 ${
              areStepsInView ? 'animate-reveal-up' : 'opacity-0'
            } motion-reduce:animate-none motion-reduce:opacity-100`}
          >
            <span className="block h-px w-full bg-black/10">
              <span
                style={{
                  width: areStepsInView ? `${(index + 1) * 25}%` : '0%',
                  transitionDelay: `${240 + index * 90}ms`,
                }}
                className="block h-full bg-[image:var(--brand-gradient)] transition-[width] duration-[900ms] ease-motion motion-reduce:transition-none"
              />
            </span>

            <span className="text-u-12 mt-16 leading-none font-semibold text-ink-subtle md:mt-20 md:text-u-14">
              {`0${index + 1}`}
            </span>
            <h3 className="text-u-18 mt-12 leading-[1.3334] font-medium tracking-[calc(-0.5*var(--u))] md:mt-16 md:text-u-20 md:leading-[1.4]">
              {step.title}
            </h3>
            <p className="text-u-14 mt-8 leading-[1.4286] font-medium text-ink-muted md:text-u-15 md:leading-[1.4667]">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-20 rounded-[20px] bg-surface p-16 md:gap-24 md:p-20 lg:flex-row lg:items-center lg:justify-between lg:gap-40 lg:p-32">
        <div className="flex flex-col gap-4 lg:max-w-300 lg:shrink-0">
          <h3 className="text-u-18 leading-[1.3334] font-medium tracking-[calc(-0.5*var(--u))] md:text-u-20 md:leading-[1.4]">
            {integrations.toolsTitle}
          </h3>
          <p className="text-u-12 leading-[1.3334] font-medium text-ink-subtle md:text-u-13">
            {integrations.toolsNote}
          </p>
        </div>

        <ul className="grid grid-cols-3 gap-x-12 gap-y-20 md:grid-cols-6 md:gap-x-16 lg:gap-x-24">
          {integrations.tools.map((tool) => (
            <li key={tool.id} className="group flex flex-col items-center gap-8 text-center">
              <ToolMark
                id={tool.id}
                className="h-28 w-28 text-black/35 transition-[color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110 group-hover:text-ink md:h-32 md:w-32"
              />
              <span className="text-u-12 leading-[1.3334] font-medium md:text-u-13">
                {tool.name}
              </span>
              <span className="text-u-11 leading-[1.2728] font-medium text-ink-subtle md:text-u-12">
                {tool.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
