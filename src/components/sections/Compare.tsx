import type { CompareCell } from '../../content/compare'
import { compare } from '../../content/compare'
import { asset } from '../../lib/asset'

const cellClass =
  'text-u-12 flex items-center justify-center gap-4 px-14 text-center leading-[calc(14/12)] font-medium whitespace-pre-line md:text-u-14 md:leading-[calc(20/14)] lg:px-32'

/** Вертикальные разделители стоят только между тремя средними колонками. */
const dividerFor = (index: number) => (index >= 1 && index <= 3 ? 'border-r border-black/[0.06]' : '')

function CellContent({ cell }: { cell: CompareCell }) {
  return (
    <>
      {cell.check && (
        <img src={asset('icon-check.svg')} alt="есть" className="block h-16 w-16 shrink-0" />
      )}
      {cell.text}
    </>
  )
}

/**
 * «Почему команды выбирают Снэпбилд». Таблица собрана гридом, а строки —
 * display:contents, поэтому колонки выравниваются сквозь всю таблицу.
 * Колонку продукта обводит градиентная рамка, нарисованная маской поверх.
 * Ниже 768px таблица не сжимается, а прокручивается по горизонтали.
 */
export function Compare() {
  return (
    <section
      id="compare"
      className="flex flex-col gap-32 bg-canvas pt-32 pb-42 md:gap-40 md:px-20 md:pb-60 lg:px-40 lg:pb-96"
    >
      <header className="flex flex-col gap-8 px-16 md:px-0">
        <h2 className="text-u-32 leading-[calc(40/32)] font-medium tracking-[calc(-1*var(--u))] md:text-u-52 md:leading-[calc(64/52)] md:tracking-[calc(-1.25*var(--u))]">
          {compare.title}
        </h2>
        <p className="text-u-14 leading-[calc(24/16)] font-medium text-ink-subtle md:text-u-16">
          {compare.subtitle}
        </p>
      </header>

      <div className="overflow-x-auto px-16 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          role="table"
          className="relative grid w-690 grid-cols-[calc(90*var(--u))_calc(100*var(--u))_repeat(3,calc(120*var(--u)))_calc(140*var(--u))] grid-rows-[calc(60*var(--u))_repeat(4,calc(72*var(--u)))] overflow-hidden rounded-[calc(20*var(--u))] bg-surface md:w-auto md:auto-rows-[calc(100*var(--u))] md:grid-cols-6 md:grid-rows-none"
        >
          {/*
            Рамка вокруг колонки продукта: градиент, из которого маской
            вырезана середина. Обычным border градиент не задать.
          */}
          <div
            aria-hidden
            style={{
              // Маска задана стилем, а не утилитами: в шорткоде mask важен
              // порядок деклараций, и mask-composite сбрасывался обратно в add,
              // из-за чего вместо рамки получалась сплошная градиентная заливка.
              WebkitMaskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
              maskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
              WebkitMaskOrigin: 'content-box, border-box',
              maskOrigin: 'content-box, border-box',
              WebkitMaskClip: 'content-box, border-box',
              maskClip: 'content-box, border-box',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            className="pointer-events-none absolute top-0 bottom-0 left-90 w-100 rounded-[calc(20*var(--u))] bg-[linear-gradient(135deg,#ff6d3d_0%,#ff6ca7_52%,#bb6dff_100%)] p-2 md:left-[calc(100%/6)] md:w-[calc(100%/6)]"
          />

          <div role="row" className="contents">
            <div
              className={`${cellClass} text-u-14 items-start justify-start border-b border-black/[0.06] text-left font-semibold text-ink-subtle md:text-u-16`}
              role="columnheader"
            >
              <span className="self-center">{compare.head[0]}</span>
            </div>
            {compare.head.slice(1).map((title, index) => (
              <div
                key={title}
                role="columnheader"
                className={`${cellClass} text-u-14 flex-col gap-8 border-b border-black/[0.06] font-semibold md:text-u-16 ${dividerFor(index)}`}
              >
                {index === 0 ? (
                  <span className="bg-[linear-gradient(55.14deg,#ff6d3d_0%,#ff6ca7_46.15%,#bb6dff_94.23%)] bg-clip-text text-transparent">
                    {title}
                  </span>
                ) : (
                  title
                )}
              </div>
            ))}
          </div>

          {compare.rows.map((row) => (
            <div role="row" className="contents" key={row.label}>
              <div role="rowheader" className={`${cellClass} justify-start text-left font-semibold`}>
                {row.label}
              </div>
              {row.cells.map((cell, index) => (
                <div
                  role="cell"
                  key={`${row.label}-${index}`}
                  className={`${cellClass} ${dividerFor(index)}`}
                >
                  <CellContent cell={cell} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
