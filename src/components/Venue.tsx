import { useEffect, useRef, useState } from 'react'
import { content } from '../content'
import { Reveal } from './PhoneShell'

export function Venue() {
  const { venue } = content
  const mapRef = useRef<HTMLDivElement>(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const el = mapRef.current
    if (!el) return

    const root = (el.closest('.invite-scroll') as Element | null) ?? null
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true)
          io.disconnect()
        }
      },
      { root, rootMargin: '160px 0px', threshold: 0.01 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="section-venue"
      data-section
      className="invite-section section-forest px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-bright)]">
          Where we celebrate
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--pearl)]">
          Venue
        </h2>
        <div className="gold-rule mt-4" />

        <div className="mt-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-[var(--pearl)]">
            {venue.name}
          </h3>
          <p className="mt-2 font-display text-2xl font-semibold text-[var(--gold-bright)]">
            {venue.floor}
          </p>
          <p className="mt-1 font-display text-lg italic text-[var(--gold-bright)]">
            {venue.subtitle}
          </p>
          <p className="mt-2 font-body text-base leading-relaxed text-[var(--pearl)]">
            {venue.address}
          </p>
          <p className="mx-auto mt-4 max-w-[18rem] font-body text-sm leading-relaxed text-[var(--gold-bright)]">
            {venue.details}
          </p>
        </div>

        <div
          ref={mapRef}
          className="surface-deep mt-6 overflow-hidden rounded-xl border border-[rgba(201,169,110,0.55)]"
        >
          <div className="relative aspect-[4/3] w-full bg-[var(--paper)]">
            {showMap ? (
              <iframe
                title={`Map of ${venue.name}`}
                src={venue.embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center font-body text-sm text-[var(--ink-soft)]">
                Loading map…
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-center font-body text-base font-semibold tracking-wide no-underline transition-transform"
          >
            View on map
          </a>
          <a
            href={venue.navigateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navigate flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-center font-body text-base font-semibold tracking-wide no-underline transition-transform"
          >
            Navigate
          </a>
        </div>
      </Reveal>
    </section>
  )
}
