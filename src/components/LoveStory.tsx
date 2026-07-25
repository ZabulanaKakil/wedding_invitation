import { content } from '../content'
import { Reveal } from './PhoneShell'

export function LoveStory() {
  const { loveStory } = content

  return (
    <section
      id="section-story"
      data-section
      className="invite-section section-from-envelope-to-paper px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--sage-soft)]">
          How it began
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--sage)] drop-shadow-[0_2px_6px_rgba(26,51,41,0.12)]">
          {loveStory.title}
        </h2>
        <div className="gold-rule mt-4" />
        <div className="mt-8 space-y-6">
          {loveStory.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="text-center font-body text-[1.08rem] leading-[1.8] text-[var(--ink-soft)]"
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
