import { content } from '../content'
import { Reveal } from './PhoneShell'

export function Rsvp() {
  const { rsvp, couple } = content
  const groomFirst = couple.groom.split(' ')[0]
  const brideFirst = couple.bride.split(' ')[0]

  return (
    <section
      id="section-rsvp"
      data-section
      className="invite-section section-from-sage-to-paper px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[var(--forest)]">
          Kindly reply
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--forest)]">
          {rsvp.title}
        </h2>
        <div className="gold-rule mt-4" />

        <p className="mt-8 text-center font-script text-[2.35rem] leading-snug text-[var(--forest)]">
          {rsvp.greeting}
        </p>

        <p className="mx-auto mt-5 max-w-[19rem] text-center font-script text-[1.55rem] leading-snug text-[var(--ink)]">
          {rsvp.inviteScript}
        </p>

        <p className="mt-8 text-center font-display text-lg italic text-[var(--ink-soft)]">
          {rsvp.familyHeading}
        </p>

        <div className="mt-8 grid gap-10">
          {rsvp.families.map((family) => (
            <div key={family.role} className="text-center">
              <p className="font-seal text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
                {family.side}
              </p>
              <p className="mt-2 font-script text-[1.65rem] leading-snug text-[var(--ink)]">
                {family.father}
              </p>
              <p className="my-1 font-script text-xl leading-snug text-[var(--gold)]">
                &
              </p>
              <p className="font-script text-[1.65rem] leading-snug text-[var(--ink)]">
                {family.mother}
              </p>
              <div className="gold-rule mt-3 opacity-70" />
              <p className="mt-3 font-display text-sm uppercase tracking-[0.16em] text-[var(--forest)]">
                {family.role}
              </p>
              <p className="mt-1 font-script text-[2rem] leading-snug text-[var(--forest)]">
                {family.child}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[18rem] text-center font-script text-[1.45rem] leading-snug text-[var(--ink)]">
          {rsvp.closingScript}
        </p>

        <p className="mx-auto mt-5 max-w-[17rem] text-center font-body text-sm leading-relaxed text-[var(--ink-soft)]">
          {rsvp.note}
        </p>

        <a
          href={rsvp.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3.5 text-center font-body text-sm font-semibold tracking-wide no-underline transition-transform"
        >
          {rsvp.formButtonLabel}
        </a>

        <p className="mt-12 text-center font-script text-3xl text-[var(--forest)]">
          {groomFirst} & {brideFirst}
        </p>
        <p className="mt-2 text-center font-seal text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          With gratitude
        </p>
      </Reveal>
    </section>
  )
}
