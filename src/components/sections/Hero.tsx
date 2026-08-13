import type { Shot } from '../ui/Lightbox'
import { appUrl, ctaLabel, hero } from '../../content/site'
import { asset } from '../../lib/asset'
import { isPhone } from '../../lib/isPhone'

const shot = asset('hero-snapbuild-2026-08-07-v2.webp')

/**
 * Первый экран: карточка с диагональным градиентом, по центру заголовок,
 * подзаголовок и белая кнопка с градиентным текстом, снизу скриншот продукта,
 * подрезанный нижней кромкой карточки. На мобильном карточка идёт в край экрана.
 */
export function Hero({ onOpenShot }: { onOpenShot: (shot: Shot) => void }) {
  return (
    <section id="hero" className="bg-canvas md:p-[12px]">
      <div className="relative overflow-hidden bg-white bg-[linear-gradient(157deg,#FFF_17.71%,#FFCDB3_43.16%,#FFA4B6_58.2%,#FFB2E9_73.32%,#D4D6FF_90.8%,#FFF_103.16%)] md:rounded-[20px]">
        <div className="relative z-2 flex flex-col items-center gap-32 pt-88 md:px-24 md:pt-80 lg:gap-48 lg:px-40 lg:pt-108">
          <div className="flex w-full flex-col items-center gap-16 px-16 md:mt-[16px] md:gap-[20px] md:px-0">
            <div className="flex animate-hero-copy flex-col items-center gap-12 motion-reduce:animate-none md:min-h-[260px] md:gap-[16px]">
              <h1 className="text-u-34 text-center leading-[1.08] font-semibold md:text-u-56 lg:max-w-984 lg:text-u-76">
                {hero.title}
              </h1>
              <p className="text-u-14 text-center leading-[calc(20/14)] font-medium text-ink-subtle md:max-w-600 md:text-u-18 md:leading-[calc(24/18)] lg:max-w-760">
                {hero.subtitle}
              </p>
            </div>

            <a
              href={appUrl}
              className="text-u-13 group inline-flex animate-hero-cta items-center justify-center rounded-[12px] bg-white px-14 py-10 leading-[calc(20/14)] font-semibold transition-[background-color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:animate-none active:scale-[0.975] md:px-22 md:py-14 md:text-u-14"
            >
              {/* Единственное цветное пятно в типографике: под градиентом
                  спрятан белый блик, он проезжает по тексту при наведении. */}
              <span className="bg-[image:var(--btn-shine),var(--brand-gradient)] bg-[length:400%_100%,100%_100%] bg-[position:100%_50%,0%_50%] bg-no-repeat bg-clip-text text-transparent group-hover:animate-btn-shine group-focus-visible:animate-btn-shine motion-reduce:animate-none">
                {ctaLabel}
              </span>
            </a>
          </div>

          <div className="w-[calc(100%_-_32*var(--u))] animate-hero-media motion-reduce:animate-none md:w-full lg:mt-20">
            <img
              src={shot}
              alt="Интерфейс Снэпбилда: редактор материалов с подключённой дизайн-системой"
              onClick={() => {
                if (isPhone()) onOpenShot({ src: shot, title: 'Главная страница платформы' })
              }}
              className="block aspect-[2632/1386] h-full w-full rounded-t-[6px] object-cover object-center max-md:cursor-zoom-in md:rounded-t-[16px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
