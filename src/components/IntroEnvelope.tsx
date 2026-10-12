import { useCallback, useRef, useState } from 'react'
import { content } from '../content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const PAPER = '#F7F1E6'
const CARD = '#FBF7F0'

type IntroEnvelopeProps = {
  onOpening?: () => void
  onOpened?: () => void
}

export function IntroEnvelope({ onOpening, onOpened }: IntroEnvelopeProps) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const openedRef = useRef(false)
  const onOpeningRef = useRef(onOpening)
  const onOpenedRef = useRef(onOpened)
  onOpeningRef.current = onOpening
  onOpenedRef.current = onOpened
  const { couple, intro, weddingDate } = content

  const handleOpen = useCallback(() => {
    if (openedRef.current || phase !== 'closed') return
    openedRef.current = true

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setPhase('open')
      onOpenedRef.current?.()
      return
    }

    onOpeningRef.current?.()
    setPhase('opening')
    // seal 0.5s → flaps ~2.2s → card finishes ~1.3+2.5s
    window.setTimeout(() => {
      setPhase('open')
      onOpenedRef.current?.()
    }, 4000)
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
              className="flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 pb-24 pt-6 text-center"
              style={{
                backgroundColor: CARD,
                boxShadow: cardOut
                  ? '0 28px 64px rgba(42, 36, 32, 0.32), 0 8px 20px rgba(42, 36, 32, 0.14), 0 2px 0 rgba(255,255,255,0.45) inset'
                  : 'none',
              }}
            >
              <img
                src={asset(intro.coupleArt)}
                alt={`${couple.groom} and ${couple.bride}`}
                className="mx-auto w-[88%] max-w-[280px] object-contain drop-shadow-[0_12px_28px_rgba(42,36,32,0.18)]"
                width={600}
                height={800}
                decoding="async"
                draggable={false}
              />

              <div
                className={`mt-6 w-full transition-opacity duration-[1200ms] ease-out ${
                  showOpenCopy ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="font-seal text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--ink-soft)]">
                  {couple.announcement}
                </p>
                <h1 className="mt-2 font-script text-[2.6rem] leading-snug text-[var(--ink)] drop-shadow-[0_2px_4px_rgba(31,26,22,0.12)]">
                  {couple.groom}
                </h1>
                <p className="my-1 font-script text-2xl text-[var(--champagne)]">&</p>
                <h1 className="font-script text-[2.6rem] leading-snug text-[var(--ink)] drop-shadow-[0_2px_4px_rgba(31,26,22,0.12)]">
                  {couple.bride}
                </h1>
                <p className="mt-4 font-display text-sm font-medium italic text-[var(--ink-soft)]">
                  {weddingDate.display}
                </p>
                <p className="mx-auto mt-4 max-w-[16rem] font-body text-[0.9rem] leading-relaxed text-[var(--ink-soft)]">
                  {couple.tagline}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`envelope-frame relative z-[4] ${
              flapsAway ? 'envelope-frame--opening' : ''
            } ${phase === 'open' ? 'envelope-frame--gone' : ''}`}
          >
            {/* Lower — top-aligned with upper */}
            <div
              className={`envelope-lower absolute left-0 right-0 top-0 ${
                flapsAway ? 'envelope-lower--open' : ''
              }`}
            >
              <img
                src={asset(intro.envelopeLower)}
                alt=""
                className="envelope-plate envelope-plate--lower pointer-events-none"
                width={706}
                height={1125}
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>

            {/* Upper — natural ratio, no stretch, top-aligned */}
            <div
              className={`envelope-upper absolute left-0 right-0 top-0 ${
                flapsAway ? 'envelope-upper--open' : ''
              }`}
            >
              <img
                src={asset(intro.envelopeUpper)}
                alt=""
                className="envelope-plate envelope-plate--upper pointer-events-none"
                width={1585}
                height={1373}
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

            <p
              className={`pointer-events-none absolute inset-x-0 top-[22%] z-[5] text-center font-script text-[2.5rem] leading-snug text-[#2a1c14] transition-opacity duration-300 ${
                phase === 'closed' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {intro.closedTap}
            </p>
          </div>

          {phase === 'open' && (
            <p className="absolute bottom-[7%] left-0 right-0 z-[6] text-center font-seal text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]">
              {intro.openHint}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
