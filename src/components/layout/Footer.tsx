import { footer } from '../../content/site'
import { asset } from '../../lib/asset'

const homeHref = import.meta.env.BASE_URL

const isExternal = (href: string) => href.startsWith('http')

export function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col gap-32 bg-canvas px-16 pt-[64px] pb-24 md:gap-40 md:px-20 md:pb-[64px] lg:px-40 lg:pt-64 lg:pb-64"
    >
      <div className="flex flex-col gap-32 lg:flex-row lg:items-start lg:justify-between lg:gap-48">
        <div className="flex flex-col gap-12 md:gap-16 lg:flex-[0_0_calc(297*var(--u))]">
          <a href={homeHref} aria-label="Снэпбилд" className="inline-flex">
            <img
              src={asset('logo-snapbuild.svg')}
              alt="Снэпбилд"
              width={153}
              height={22}
              className="block w-120 md:w-153"
            />
          </a>
          <p className="text-u-14 leading-[1.4286] font-medium text-ink-muted lg:max-w-297">
            {footer.tagline}
          </p>
        </div>

        <nav
          aria-label="Подвал"
          className="grid grid-cols-2 items-start gap-24 md:grid-cols-3 md:gap-x-24 md:gap-y-32 lg:gap-48"
        >
          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-12 md:gap-16">
              <p className="text-u-14 leading-[1.5] font-semibold md:text-u-16">{column.title}</p>
              <div className="flex flex-col gap-10 md:gap-12">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(isExternal(link.href)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-u-14 leading-[1.5] font-medium text-ink-muted transition-opacity hover:opacity-70 md:text-u-16"
                  >
                    {link.label}
                  </a>
                ))}

                {column.title === 'Контакты' && (
                  <a
                    href={`mailto:${footer.email}`}
                    className="text-u-14 leading-[1.5] font-medium text-ink-muted transition-opacity hover:opacity-70 md:hidden"
                  >
                    {footer.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col items-start gap-8 border-t border-black/10 pt-20 md:flex-row md:items-center md:justify-between md:gap-16 md:pt-24">
        <p className="text-u-12 leading-[1.4286] font-medium md:text-u-14">{footer.copyright}</p>
        <a
          href={`mailto:${footer.email}`}
          className="text-u-14 hidden leading-[1.4286] font-medium transition-opacity hover:opacity-70 md:block"
        >
          {footer.email}
        </a>
      </div>
    </footer>
  )
}
