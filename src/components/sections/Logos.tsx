import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { logos, logosEyebrow } from '../../content/logos'
import { asset } from '../../lib/asset'

const trackItems = logos.map((logo, index) => ({
  ...logo,
  index,
  style: {
    '--k': logo.ratio,
    '--w': logo.width,
    '--w-m': logo.widthMobile ?? logo.width * (28 / 37),
  } as CSSProperties,
}))

const itemClass =
  'flex shrink-0 items-end justify-center h-[calc(28*var(--u)*var(--k))] md:h-[calc(37*var(--u)*var(--k))]'
const imageClass = 'block h-auto w-[calc(var(--w-m)*var(--u))] md:w-[calc(var(--w)*var(--u))]'
const groupClass = 'flex items-end gap-40 md:gap-48'

export function Logos() {
  const [isRevealed, setIsRevealed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setIsRevealed(true)
        observer.disconnect()
      },
      { threshold: 0.18 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="logos"
      className="mt-16 flex flex-col gap-24 overflow-hidden bg-canvas md:mt-[32px] lg:overflow-visible"
    >
      <p className="text-u-14 order-2 px-16 text-center leading-[1.4286] text-ink-subtle md:px-20 md:text-u-16 md:leading-[1.5] md:tracking-[calc(-0.5*var(--u))] lg:px-40">
        {logosEyebrow}
      </p>

      <div className="flex w-max animate-marquee items-end justify-start gap-40 [--marquee-half-gap:calc(20*var(--u))] motion-reduce:animate-none md:gap-48 md:[--marquee-half-gap:calc(24*var(--u))] md:[animation-duration:15.5s] lg:w-auto lg:animate-none lg:justify-center lg:gap-107 lg:px-40">
        <div className={`${groupClass} lg:contents`}>
          {trackItems.map((logo) => (
            <div
              key={logo.file}
              style={{ ...logo.style, animationDelay: `${logo.index * 90}ms` }}
              className={`${itemClass} ${
                isRevealed ? 'md:animate-logo-reveal' : 'md:opacity-0'
              } motion-reduce:animate-none motion-reduce:opacity-100`}
            >
              <img src={asset(logo.file)} alt={logo.name} className={imageClass} />
            </div>
          ))}
        </div>

        <div aria-hidden className={`${groupClass} lg:hidden`}>
          {trackItems.map((logo) => (
            <div key={logo.file} style={logo.style} className={itemClass}>
              <img src={asset(logo.file)} alt="" className={imageClass} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
