import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from '../content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const PAPER = '#F7F1E6'
const CARD = '#FBF7F0'
const OPEN_MS = 2200
const SKIP_AFTER_MS = 1000

type IntroEnvelopeProps = {
  onOpening?: () => void
  onOpened?: () => void
}

export function IntroEnvelope({ onOpening, onOpened }: IntroEnvelopeProps) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const [showSkip, setShowSkip] = useState(false)
  const openedRef = useRef(false)
  const onOpeningRef = useRef(onOpening)
  const onOpenedRef = useRef(onOpened)
  const timers = useRef<number[]>([])
  const sceneRef = useRef<HTMLImageElement>(null)
  const hitRef = useRef<HTMLButtonElement>(null)
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

    onOpeningRef.current?.()
    setPhase('opening')
    timers.current = [
      window.setTimeout(() => setShowSkip(true), SKIP_AFTER_MS),
      window.setTimeout(() => finish(), OPEN_MS),
    ]
  }, [finish, phase])

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    const button = hitRef.current
    if (!button) return
    const open = (event: TouchEvent) => {
      event.preventDefault()
      handleOpen()
    }
    button.addEventListener('touchstart', open, { passive: false })
    return () => button.removeEventListener('touchstart', open)
  }, [handleOpen])

  useEffect(() => {
    if (phase !== 'open') return
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
      className={`relative flex flex-col ${
        phase === 'open' ? 'min-h-full' : 'envelope-screen h-full min-h-0'
      }`}
      style={{ backgroundColor: PAPER }}
    >
      <div
        className={`relative m-0 flex w-full items-center justify-center border-0 p-0 text-left outline-none ${
          phase === 'open' ? 'min-h-full' : 'h-full min-h-0'
        }`}
        style={{ backgroundColor: PAPER }}
      >
        <div
          className={`envelope-stage relative mx-auto flex w-full max-w-[430px] flex-col items-center ${
            phase === 'open' ? 'envelope-stage--open justify-center' : 'envelope-stage--cover justify-center'
          }`}
          style={{ backgroundColor: PAPER }}
        >
          <div
            className={`envelope-card z-[2] ${
              phase === 'open' ? 'envelope-card--settled' : 'absolute inset-0'
            } ${phase === 'closed' ? 'envelope-card--hidden' : ''} ${
              phase === 'opening' ? 'envelope-card--rising' : ''
            }`}
            aria-hidden={phase === 'closed'}
          >
            <div
              className={`hero-sheet relative flex w-full flex-col items-center overflow-visible px-6 text-center ${
                phase === 'open'
                  ? 'min-h-[100dvh] justify-start pb-28 pt-8'
                  : 'h-full min-h-0 justify-center py-6'
              }`}
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
                className={`relative z-[1] mx-auto w-auto max-w-[78%] object-contain drop-shadow-[0_12px_28px_rgba(42,36,32,0.18)] ${
                  phase === 'open' ? 'max-h-none' : 'max-h-[58svh]'
                }`}
                width={567}
                height={757}
                decoding="async"
                draggable={false}
              />

              <div
                className={`hero-copy relative z-[1] transition-opacity duration-[900ms] ease-out ${
                  showOpenCopy ? 'opacity-100' : 'pointer-events-none absolute h-0 overflow-hidden opacity-0'
                }`}
              >
                <p className="font-seal text-[0.875rem] font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
                  {couple.announcement}
                </p>
                <h1 className="mt-2 text-[var(--ink)]">
                  <span className="block font-script text-[2.7rem] leading-snug">
                    {couple.groom}
                  </span>
                  <span className="my-1 block font-script text-[1.85rem] text-[var(--forest)]">&</span>
                  <span className="block font-script text-[2.7rem] leading-snug">
                    {couple.bride}
                  </span>
                </h1>
                <p className="mt-3 font-display text-xl font-medium italic text-[var(--ink)]">
                  {weddingDate.display}
                </p>
                <p className="mt-1 font-display text-xl text-[var(--forest)]">
                  {weddingDate.time}
                </p>
                <p className="mx-auto mt-2 max-w-[18rem] font-display text-[1.15rem] leading-snug text-[var(--forest)]">
                  {couple.venueLine}
                </p>
                <p className="mx-auto mt-3 max-w-[18rem] font-body text-[1.05rem] leading-relaxed text-[var(--ink)]">
                  {couple.tagline}
                </p>
                {phase === 'open' && (
                  <p className="mt-8 text-center font-seal text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
                    {intro.openHint}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`relative z-[4] flex flex-col items-center ${
              phase === 'open' ? 'envelope-stack--gone' : ''
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
      {isClosed && (
        <button
          ref={hitRef}
          type="button"
          className="envelope-hit"
          aria-label="Open the invitation"
          onClick={handleOpen}
        >
          {intro.closedTap}
        </button>
      )}
    </section>
  )
}
