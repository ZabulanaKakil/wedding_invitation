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
      { root, rootMargin: '120px 0px', threshold: 0.05 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="section-venue"
      data-section
      className="invite-section section-from-sage-to-paper px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--sage-soft)]">
          Where we celebrate
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--sage)] drop-shadow-[0_2px_6px_rgba(26,51,41,0.12)]">
          Venue
        </h2>
        <div className="gold-rule mt-4" />

        <div className="mt-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-[var(--ink)] drop-shadow-[0_1px_2px_rgba(31,26,22,0.08)]">
            {venue.name}
          </h3>
          <p className="mt-1 font-display text-lg italic text-[var(--ink-soft)]">
            {venue.subtitle}
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink-soft)]">
            {venue.address}
          </p>
        </div>

        <div
          ref={mapRef}
          className="surface-deep mt-6 overflow-hidden rounded-xl border border-[rgba(184,146,90,0.45)]"
        >
          <div className="relative aspect-[4/3] w-full bg-[var(--paper)]">
            {showMap ? (
              <iframe
                title={`Map of ${venue.name}`}
                src={venue.embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center font-body text-sm text-[var(--ink-soft)]">
                Loading map…
              </div>
            )}
          </div>
        </div>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5 flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-center font-body text-sm font-semibold tracking-wide no-underline transition-transform"
        >
          Open in Google Maps
        </a>
      </Reveal>
    </section>
  )
}
