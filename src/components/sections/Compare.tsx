import type { CSSProperties } from 'react'
import type { CompareCell } from '../../content/compare'
import { compare } from '../../content/compare'
import { asset } from '../../lib/asset'

const cellClass =
  'text-u-12 flex items-center justify-center gap-4 px-14 text-center leading-[calc(14/12)] font-medium whitespace-pre-line md:text-u-14 md:leading-[calc(20/14)] lg:px-32'

/** Вертикальные разделители стоят только между тремя средними колонками. */
const dividerFor = (index: number) =>
  index >= 1 && index <= 3 ? 'compare-divider-x border-r border-black/[0.06]' : ''

/*
  Колонка подписей и колонка продукта — липкие. Ни position, ни left сюда
  утилитами не добавлять: они действовали бы на всех ширинах, а липкость
  нужна только ниже 768px. Всё, включая сдвиг второй колонки, — в theme.css.
*/
const stickyLabel = 'compare-sticky'
const stickyBrand = 'compare-sticky compare-brand'

/**
 * Сдвиг градиентной рамки для строки: шапка 60 пикселей макета, дальше
 * строки по 72. Считается один раз, а не на каждый рендер.
 */
const brandSlice = (rowIndex: number) =>
  ({ '--brand-slice': rowIndex === 0 ? 0 : -(60 + (rowIndex - 1) * 72) }) as CSSProperties

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
 *
 * Выше 768px колонку продукта обводит градиентная рамка, нарисованная маской
 * поверх таблицы. Ниже таблица прокручивается по горизонтали, и рамка
 * переезжает на сами ячейки: маска на одном абсолютном элементе не может быть
 * липкой вместе с колонкой. Детали — в блоке .compare-brand в theme.css.
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

      {/* Ниже 768px полоса прокрутки идёт от края до края, без полей секции. */}
      <div className="isolate overflow-x-auto bg-surface [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:bg-transparent [&::-webkit-scrollbar]:hidden">
        <div
          role="table"
          className="relative grid w-690 grid-cols-[calc(90*var(--u))_calc(100*var(--u))_repeat(3,calc(120*var(--u)))_calc(140*var(--u))] grid-rows-[minmax(calc(60*var(--u)),auto)_repeat(4,minmax(calc(72*var(--u)),auto))] bg-surface md:w-auto md:auto-rows-[calc(100*var(--u))] md:grid-cols-6 md:grid-rows-none md:overflow-hidden md:rounded-[calc(20*var(--u))]"
        >
          {/*
            Рамка вокруг колонки продукта: градиент, из которого маской
            вырезана середина. Обычным border градиент не задать. Ниже 768px
            её заменяют фоны на самих ячейках, поэтому здесь она снята.
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
            className="pointer-events-none absolute top-0 bottom-0 hidden rounded-[calc(20*var(--u))] bg-[linear-gradient(135deg,#ff6d3d_0%,#ff6ca7_52%,#bb6dff_100%)] p-2 md:left-[calc(100%/6)] md:block md:w-[calc(100%/6)]"
          />

          <div role="row" className="contents">
            <div
              className={`${cellClass} ${stickyLabel} compare-sticky--head compare-divider-y text-u-14 items-start justify-start border-b border-black/[0.06] text-left font-semibold text-ink-subtle md:text-u-16`}
              role="columnheader"
            >
              {/* Ниже 768px подпись колонки скрыта, но своё место сохраняет. */}
              <span className="invisible self-center md:visible">{compare.head[0]}</span>
            </div>
            {compare.head.slice(1).map((title, index) => (
              <div
                key={title}
                role="columnheader"
                style={index === 0 ? brandSlice(0) : undefined}
                className={`${cellClass} ${
                  index === 0
                    ? `${stickyBrand} compare-sticky--head compare-brand--head`
                    : 'compare-divider-y border-b border-black/[0.06]'
                } text-u-14 flex-col gap-8 font-semibold md:border-b md:border-black/[0.06] md:text-u-16 ${dividerFor(index)}`}
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

          {compare.rows.map((row, rowIndex) => (
            <div role="row" className="contents" key={row.label}>
              <div
                role="rowheader"
                className={`${cellClass} ${stickyLabel} justify-start text-left font-semibold`}
              >
                {row.label}
              </div>
              {row.cells.map((cell, index) => (
                <div
                  role="cell"
                  key={`${row.label}-${index}`}
                  style={index === 0 ? brandSlice(rowIndex + 1) : undefined}
                  className={`${cellClass} ${
                    index === 0
                      ? `${stickyBrand} ${
                          rowIndex === compare.rows.length - 1 ? 'compare-brand--last' : ''
                        }`
                      : ''
                  } ${dividerFor(index)}`}
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
