import { useEffect, useRef, useState, type ReactNode } from 'react'

type PhoneShellProps = {
  children: ReactNode
  /** Let envelope flaps travel past the phone crop while opening */
  allowOverflow?: boolean
}

/** Centers a mobile-width column; desktop shows the same UI cropped in the middle. */
export function PhoneShell({ children, allowOverflow = false }: PhoneShellProps) {
  return (
    <div className="flex h-full w-full items-stretch justify-center bg-[var(--sage)]">
      <div
        className={`relative flex h-full w-full max-w-[430px] flex-col shadow-[0_0_80px_var(--shadow)] ${
          allowOverflow ? 'overflow-visible' : 'overflow-hidden'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at top, #2a4d3d 0%, var(--sage) 55%, #0f1c16 100%)',
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

/** Fade-up when the block enters the invite scroll viewport. */
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

    const root =
      (el.closest('.invite-scroll') as Element | null) ?? null

    let timer: number | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      { root, threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      io.disconnect()
    }
  }, [once, delay])

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? 'reveal-visible' : 'reveal-hidden'}`}
    >
      {children}
    </div>
  )
}
