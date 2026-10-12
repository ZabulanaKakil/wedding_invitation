import { useEffect, useRef, useState, type ReactNode } from 'react'

type PhoneShellProps = {
  children: ReactNode
  /** Let envelope flaps travel past the phone crop while opening */
  allowOverflow?: boolean
}

/** Centers a mobile-width column; desktop shows the same UI cropped in the middle. */
export function PhoneShell({ children, allowOverflow = false }: PhoneShellProps) {
  return (
    <div className="flex h-full w-full items-stretch justify-center bg-[#0c0b0a]">
      <div
        className={`relative flex h-full w-full max-w-[430px] flex-col shadow-[0_0_80px_var(--shadow)] ${
          allowOverflow ? 'overflow-visible' : 'overflow-hidden'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at top, #2c2824 0%, #141210 55%, #070605 100%)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
  once?: boolean
  /** Stagger delay in ms after the section enters view */
  delay?: number
}

/**
 * Appear-on-scroll for mobile Safari & Chrome.
 * Uses CSS transitions (not blur filters) — blur/filter anims often fail on iOS.
 */
export function Reveal({
  children,
  className = '',
  once = true,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVisible(true)
      return
    }

    // Fallback if IntersectionObserver is missing / flaky
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const root =
      (el.closest('.invite-scroll') as Element | null) ?? null

    let timer: number | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          if (delay > 0) {
            timer = window.setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
          if (once) io.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      {
        root,
        // Lower threshold + positive bottom margin: fires earlier on short mobile viewports
        threshold: [0, 0.05, 0.12],
        rootMargin: '0px 0px 12% 0px',
      },
    )

    io.observe(el)

    // Safety: if already in view on mount (IO sometimes misses on iOS), reveal
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < viewH * 0.92 && rect.bottom > 0) {
        if (delay > 0) {
          timer = window.setTimeout(() => setVisible(true), delay)
        } else {
          setVisible(true)
        }
        if (once) io.disconnect()
      }
    })

    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      io.disconnect()
    }
  }, [once, delay])

  return (
    <div
      ref={ref}
      className={`${className} reveal ${visible ? 'reveal--in' : 'reveal--out'}`}
    >
      {children}
    </div>
  )
}
