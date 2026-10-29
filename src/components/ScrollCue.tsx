import { useEffect, useState } from 'react'

const FOREST_SECTIONS = new Set(['section-date', 'section-venue'])

function scrollerEl() {
  return document.querySelector('.invite-scroll')
}

function sectionAt(x: number, y: number) {
  const stack = document.elementsFromPoint(x, y)
  for (const node of stack) {
    if (node.closest('.scroll-cue')) continue
    const section = node.closest('[data-section]')
    if (section instanceof HTMLElement) return section
  }
  return null
}

export function ScrollCue({ active }: { active: boolean }) {
  const [onForest, setOnForest] = useState(false)
  const [hasNext, setHasNext] = useState(false)

  useEffect(() => {
    if (!active) return
    const scroller = scrollerEl()
    if (!scroller) return

    const update = () => {
      const rect = scroller.getBoundingClientRect()
      const current = sectionAt(rect.left + rect.width / 2, rect.top + rect.height * 0.55)
      const sections = [...scroller.querySelectorAll<HTMLElement>('[data-section]')]
      const index = current ? sections.indexOf(current) : 0
      setOnForest(!!current && FOREST_SECTIONS.has(current.id))
      setHasNext(index >= 0 && index < sections.length - 1)
    }

    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [active])

  if (!active || !hasNext) return null

  const goNext = () => {
    const scroller = scrollerEl()
    if (!scroller) return
    const rect = scroller.getBoundingClientRect()
    const current = sectionAt(rect.left + rect.width / 2, rect.top + rect.height * 0.55)
    const sections = [...scroller.querySelectorAll<HTMLElement>('[data-section]')]
    const index = current ? sections.indexOf(current) : 0
    const next = sections[index + 1]
    if (!next) return
    const top = next.getBoundingClientRect().top - rect.top + scroller.scrollTop
    scroller.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-cue ${onForest ? 'scroll-cue--forest' : 'scroll-cue--cream'}`}
      aria-label="Scroll to the next section"
      onClick={goNext}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M6 9l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
