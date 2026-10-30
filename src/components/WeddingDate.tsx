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

function googleCalendarUrl(date: (typeof content)['weddingDate']) {
  const start = date.startsAt.replace(/[-:]/g, '').replace('+0600', '')
  const end = date.endsAt.replace(/[-:]/g, '').replace('+0600', '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: date.calendarTitle,
    dates: `${start}/${end}`,
    ctz: 'Asia/Dhaka',
    location: `${content.venue.name}, ${content.venue.address}`,
    details: 'Ceremony begins at 1:30 PM.',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
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
        <p className="text-center font-seal text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-bright)]">
          Save the date
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--pearl)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
          The Date
        </h2>
        <div className="gold-rule mt-4" />

        <div className="surface-deep mx-auto mt-8 max-w-[320px] rounded-2xl border border-[rgba(244,234,216,0.55)] bg-[rgba(250,246,240,0.97)] p-5">
          <p className="text-center font-display text-2xl font-semibold tracking-wide text-[var(--sage)]">
            {MONTHS[weddingDate.month]} {weddingDate.year}
          </p>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center font-seal text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[var(--ink)]">
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
          <a
            href={googleCalendarUrl(weddingDate)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 flex min-h-11 items-center justify-center rounded-full px-4 py-2.5 text-center font-body text-sm font-semibold no-underline"
          >
            Add to Google Calendar
          </a>
        </div>
      </Reveal>
    </section>
  )
}
