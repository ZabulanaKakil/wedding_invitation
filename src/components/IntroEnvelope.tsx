import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from '../content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const PAPER = '#F7F1E6'
const CARD = '#FBF7F0'
const OPEN_MS = 2800
const SKIP_AFTER_MS = 1000

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type IntroEnvelopeProps = {
  onOpening?: () => void
  onOpened?: () => void
}

export function IntroEnvelope({ onOpening, onOpened }: IntroEnvelopeProps) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>(() =>
    prefersReducedMotion() ? 'open' : 'closed',
  )
  const [showSkip, setShowSkip] = useState(false)
  const openedRef = useRef(false)
  const onOpeningRef = useRef(onOpening)
  const onOpenedRef = useRef(onOpened)
  const timers = useRef<number[]>([])
  const sceneRef = useRef<HTMLImageElement>(null)
  onOpeningRef.current = onOpening
  onOpenedRef.current = onOpened
  const { couple, intro, weddingDate } = content

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  const finish = useCallback(() => {
    clearTimers()
    setShowSkip(false)
    setPhase('open')
    onOpenedRef.current?.()
  }, [])

  const handleOpen = useCallback(() => {
    if (openedRef.current || phase !== 'closed') return
    openedRef.current = true

    if (prefersReducedMotion()) {
      finish()
      return
    }

    onOpeningRef.current?.()
    setPhase('opening')
    timers.current = [
      window.setTimeout(() => setShowSkip(true), SKIP_AFTER_MS),
      window.setTimeout(() => finish(), OPEN_MS),
    ]
  }, [finish, phase])

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    if (!prefersReducedMotion()) return
    openedRef.current = true
    onOpenedRef.current?.()
  }, [])

  useEffect(() => {
    if (phase !== 'open') return
    const reduced = prefersReducedMotion()
    if (reduced) return
    const scroller = document.querySelector('.invite-scroll')
    const scene = sceneRef.current
    if (!scroller || !scene) return
    const onScroll = () => {
      scene.style.transform = `translate3d(0, ${scroller.scrollTop * 0.28}px, 0)`
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [phase])

  const flapsAway = phase === 'opening' || phase === 'open'
  const cardOut = phase === 'opening' || phase === 'open'
  const showOpenCopy = phase === 'open'
  const isClosed = phase === 'closed'

  return (
    <section
      id="section-intro"
      data-section
      className="relative flex min-h-[100dvh] flex-col"
      style={{ backgroundColor: PAPER }}
    >
      <div
        role={isClosed ? 'button' : undefined}
        tabIndex={isClosed ? 0 : undefined}
        onClick={isClosed ? handleOpen : undefined}
        onKeyDown={
          isClosed
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleOpen()
                }
              }
            : undefined
        }
        aria-label={isClosed ? 'Open the invitation' : undefined}
        className="relative m-0 flex min-h-[100dvh] w-full items-center justify-center border-0 p-0 text-left outline-none"
        style={{
          backgroundColor: PAPER,
          cursor: isClosed ? 'pointer' : 'default',
        }}
      >
        <div
          className="envelope-stage relative mx-auto flex w-full max-w-[430px] items-center justify-center"
          style={{ backgroundColor: PAPER, minHeight: '100dvh' }}
        >
          <div
            className={`envelope-card absolute inset-0 z-[2] ${
              phase === 'closed' ? 'envelope-card--hidden' : ''
            } ${phase === 'opening' ? 'envelope-card--rising' : ''} ${
              phase === 'open' ? 'envelope-card--settled' : ''
            }`}
            aria-hidden={phase === 'closed'}
          >
            <div
              className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 pb-24 pt-6 text-center"
              style={{
                backgroundColor: CARD,
                boxShadow: cardOut
                  ? '0 28px 64px rgba(31, 58, 46, 0.22), 0 8px 20px rgba(31, 58, 46, 0.12), 0 2px 0 rgba(255,255,255,0.45) inset'
                  : 'none',
              }}
            >
              <img
                ref={sceneRef}
                src={asset(intro.heroScene)}
                alt=""
                className="hero-scene"
                width={864}
                height={1152}
                decoding="async"
              />
              <img
                src={asset(intro.coupleArt)}
                alt=""
                className="relative z-[1] mx-auto w-[78%] max-w-[240px] object-contain drop-shadow-[0_12px_28px_rgba(42,36,32,0.18)]"
                width={567}
                height={757}
                decoding="async"
                draggable={false}
              />

              <div
                className={`relative z-[1] mt-4 w-full transition-opacity duration-[900ms] ease-out ${
                  showOpenCopy ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="font-seal text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[var(--forest)]">
                  {couple.announcement}
                </p>
                <h1 className="mt-2 text-[var(--ink)]">
                  <span className="block font-script text-[2.45rem] leading-snug">
                    {couple.groom}
                  </span>
                  <span className="my-1 block font-script text-2xl text-[var(--gold)]">&</span>
                  <span className="block font-script text-[2.45rem] leading-snug">
                    {couple.bride}
                  </span>
                </h1>
                <p className="mt-3 font-display text-base font-medium italic text-[var(--ink)]">
                  {weddingDate.display}
                </p>
                <p className="mt-1 font-display text-lg text-[var(--forest)]">
                  {couple.venueLine}
                </p>
                <p className="mx-auto mt-3 max-w-[16rem] font-body text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                  {couple.tagline}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative z-[4] flex flex-col items-center ${
              phase === 'open' ? 'pointer-events-none' : ''
            }`}
          >
          <div
            className={`envelope-frame ${
              flapsAway ? 'envelope-frame--opening' : ''
            } ${phase === 'open' ? 'envelope-frame--gone' : ''}`}
          >
            <div
              className={`envelope-lower ${flapsAway ? 'envelope-lower--open' : ''}`}
            >
              <img
                src={asset(intro.envelopeLower)}
                alt=""
                className="envelope-plate envelope-plate--lower pointer-events-none"
                width={728}
                height={1047}
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>

            <div
              className={`envelope-upper ${flapsAway ? 'envelope-upper--open' : ''}`}
            >
              <img
                src={asset(intro.envelopeUpper)}
                alt=""
                className="envelope-plate envelope-plate--upper pointer-events-none"
                width={820}
                height={462}
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />

              <img
                src={asset(intro.envelopeSeal)}
                alt=""
                className={`envelope-seal-mark pointer-events-none absolute z-[3] ${
                  flapsAway ? 'envelope-seal-mark--away' : ''
                }`}
                width={120}
                height={120}
                decoding="async"
                draggable={false}
              />
            </div>

          </div>
            <p
              className={`mt-4 text-center font-script text-[2.15rem] leading-snug text-[var(--forest)] transition-opacity duration-300 ${
                phase === 'closed' ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              {intro.closedTap}
            </p>
          </div>

          {phase === 'open' && (
            <p className="absolute bottom-[7%] left-0 right-0 z-[6] text-center font-seal text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--forest)]">
              {intro.openHint}
            </p>
          )}

          {showSkip && phase === 'opening' && (
            <button
              type="button"
              className="envelope-skip"
              onClick={(event) => {
                event.stopPropagation()
                finish()
              }}
            >
              {intro.skipLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
