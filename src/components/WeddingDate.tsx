import { content } from '../content'
import { DateSeal } from './DateSeal'
import { Reveal } from './PhoneShell'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

function buildCalendarCells(year: number, month: number, highlightDay: number) {
  const first = new Date(year, month, 1)
  const startPad = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: Array<{ day: number | null; highlight: boolean }> = []

  for (let i = 0; i < startPad; i++) {
    cells.push({ day: null, highlight: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, highlight: d === highlightDay })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, highlight: false })
  }
  return cells
}

export function WeddingDate() {
  const { weddingDate } = content
  const cells = buildCalendarCells(
    weddingDate.year,
    weddingDate.month,
    weddingDate.day,
  )
  return (
    <section
      id="section-date"
      data-section
      className="invite-section section-from-paper-to-sage px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--champagne-bright)]">
          Save the date
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--pearl)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
          The Date
        </h2>
        <div
          className="gold-rule mt-4"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--champagne-bright), transparent)',
          }}
        />

        <div className="surface-deep mx-auto mt-8 max-w-[320px] rounded-2xl border border-[rgba(212,184,136,0.4)] bg-[rgba(250,246,241,0.97)] p-5">
          <p className="text-center font-display text-2xl font-semibold tracking-wide text-[var(--sage)]">
            {MONTHS[weddingDate.month]} {weddingDate.year}
          </p>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center font-seal text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1.5">
            {cells.map((cell, i) =>
              cell.day == null ? (
                <span key={`e-${i}`} className="aspect-square" />
              ) : cell.highlight ? (
                <DateSeal key={cell.day} day={cell.day} />
              ) : (
                <span
                  key={cell.day}
                  className="flex aspect-square items-center justify-center font-display text-base font-medium text-[var(--ink)]"
                >
                  {cell.day}
                </span>
              ),
            )}
          </div>

          <p className="mt-6 text-center font-display text-xl font-semibold text-[var(--sage)]">
            {weddingDate.display}
          </p>
          <p className="wedding-time mt-4 text-center">
            <span className="wedding-time__label">Ceremony begins</span>
            <span className="wedding-time__value">{weddingDate.time}</span>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
