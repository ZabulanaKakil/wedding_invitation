import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from '../content'
import { Reveal } from './PhoneShell'

type GalleryItem = (typeof content.gallery)[number]

const asset = (path: string) =>
  path.startsWith('http') ? path : `${import.meta.env.BASE_URL}${path}`

/** Triple the list so horizontal scrolling can loop seamlessly. */
function loopItems(items: readonly GalleryItem[]) {
  return [...items, ...items, ...items]
}

export function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number>(content.gallery.length)
  const items = loopItems(content.gallery)
  const baseLen = content.gallery.length

  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const children = Array.from(track.children) as HTMLElement[]
    if (!children.length) return

    const mid = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDist = Infinity

    children.forEach((child, i) => {
      const center = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(center - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })

    setActive(best)

    const card = children[0]
    if (!card) return
    const cardSpan = card.offsetWidth + 16
    const oneSet = cardSpan * baseLen
    if (track.scrollLeft < oneSet * 0.35) {
      track.scrollLeft += oneSet
    } else if (track.scrollLeft > oneSet * 1.85) {
      track.scrollLeft -= oneSet
    }
  }, [baseLen])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    requestAnimationFrame(() => {
      const first = track.children[baseLen] as HTMLElement | undefined
      if (first) {
        track.scrollLeft =
          first.offsetLeft - (track.clientWidth - first.offsetWidth) / 2
        syncActive()
      }
    })

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        syncActive()
        ticking = false
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [baseLen, syncActive])

  return (
    <section
      id="section-gallery"
      data-section
      className="invite-section invite-section--gallery section-from-blush-to-sage overflow-hidden px-0"
    >
      <Reveal className="px-6">
        <p className="text-center font-seal text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--champagne-bright)]">
          Moments
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--pearl)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]">
          Gallery
        </h2>
        <div
          className="gold-rule mt-4"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--champagne-bright), transparent)',
          }}
        />
        <p className="mt-4 text-center font-body text-sm text-[rgba(250,246,241,0.82)]">
          Swipe to explore
        </p>
      </Reveal>

      {/* Track stays outside Reveal so pointer-events / transforms never block swipe */}
      <div className="gallery-shell mt-10 w-full">
        <div
          ref={trackRef}
          className="gallery-track flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[5%] pb-6 pt-2"
        >
          {items.map((item, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            const scale = Math.max(0.88, 1 - abs * 0.06)
            const opacity = Math.max(0.55, 1 - abs * 0.22)
            const z = 20 - abs

            return (
              <figure
                key={`${item.src}-${i}`}
                className="gallery-slide m-0 w-[90%] shrink-0 snap-center"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex: z,
                }}
              >
                <div className="overflow-hidden rounded-xl border border-[rgba(212,184,136,0.28)] shadow-[0_20px_48px_rgba(0,0,0,0.42),0_4px_12px_rgba(0,0,0,0.2)]">
                  <img
                    src={asset(item.src)}
                    alt={item.alt}
                    className="pointer-events-none aspect-[3/4] w-full object-cover"
                    width={600}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
