import { content } from '../content'
import { Reveal } from './PhoneShell'

export function DressCode() {
  const { dressCode } = content

  return (
    <section
      id="section-dress"
      data-section
      className="invite-section section-from-paper-to-blush px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--sage-soft)]">
          Attire
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--sage)] drop-shadow-[0_2px_6px_rgba(26,51,41,0.12)]">
          {dressCode.title}
        </h2>
        <div className="gold-rule mt-4" />
        <p className="mx-auto mt-5 max-w-[18rem] text-center font-body text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
          {dressCode.subtitle}
        </p>

        <ul className="mt-10 flex list-none flex-wrap items-end justify-center gap-5 p-0">
          {dressCode.colors.map((color) => (
            <li key={color.name} className="flex w-[4.75rem] flex-col items-center gap-3">
              <span
                className="block h-16 w-16 rounded-full border border-white/70 shadow-[0_10px_24px_rgba(31,26,22,0.22),0_2px_0_rgba(255,255,255,0.45)_inset]"
                style={{ backgroundColor: color.hex }}
                aria-hidden
              />
              <span className="text-center font-seal text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                {color.name}
              </span>
              <span className="font-body text-[0.65rem] text-[var(--ink-soft)]">
                {color.hex}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
