import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { isPhone } from '../../lib/isPhone'

export type Shot = {
  src: string
  title?: string
  desc?: string
}

const FADE_DURATION = 200

export function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  const [current, setCurrent] = useState<Shot | null>(null)
  const [visible, setVisible] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusTo = useRef<HTMLElement | null>(null)
  const savedScrollY = useRef(0)

  useEffect(() => {
    if (!shot) return

    returnFocusTo.current = document.activeElement as HTMLElement | null
    savedScrollY.current = window.scrollY
    setCurrent(shot)
    setZoomed(false)

    document.body.style.top = `${-savedScrollY.current}px`
    document.documentElement.classList.add('lightbox-locked')

    const frame = requestAnimationFrame(() => {
      setVisible(true)
      closeRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [shot])

  useEffect(() => {
    if (shot || !current) return

    setVisible(false)
    document.documentElement.classList.remove('lightbox-locked')
    document.body.style.top = ''

    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, savedScrollY.current)
    document.documentElement.style.scrollBehavior = ''

    returnFocusTo.current?.focus({ preventScroll: true })

    const timer = window.setTimeout(() => setCurrent(null), FADE_DURATION)
    return () => window.clearTimeout(timer)
  }, [shot, current])

  useEffect(() => {
    if (!shot) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const onResize = () => {
      if (!isPhone()) onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [shot, onClose])

  useEffect(() => {
    const scroll = scrollRef.current
    if (!zoomed || !scroll) return
    scroll.scrollLeft = (scroll.scrollWidth - scroll.clientWidth) / 2
  }, [zoomed])

  if (!current) return null

  const hasCaption = Boolean(current.title || current.desc)

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр изображения"
      onClick={onClose}
      className={`fixed inset-0 z-1100 bg-black/92 transition-opacity duration-200 ease-in-out motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={scrollRef} className="absolute inset-0 flex overflow-auto overscroll-contain">
        <img
          src={current.src}
          alt=""
          onClick={(event) => {
            event.stopPropagation()
            setZoomed((wasZoomed) => !wasZoomed)
          }}
          className={
            zoomed
              ? 'm-auto block h-full w-auto max-w-none cursor-zoom-out'
              : 'm-auto block max-h-full max-w-full cursor-zoom-in rounded-[6px]'
          }
        />
      </div>

      <button
        ref={closeRef}
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute top-[12px] right-[12px] z-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/16 text-[20px] leading-none font-medium text-white"
      >
        ✕
      </button>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.55))] px-[24px] pt-[40px] pb-[24px] text-center transition-opacity duration-200 ease-in-out motion-reduce:transition-none ${
          hasCaption && !zoomed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {current.title && (
          <p className="text-[16px] leading-[1.35] font-medium text-white">{current.title}</p>
        )}
        {current.desc && (
          <p className="mt-[4px] text-[13px] leading-[1.45] text-white/62">{current.desc}</p>
        )}
      </div>
    </div>,
    document.body,
  )
}
