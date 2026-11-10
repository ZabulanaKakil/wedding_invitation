import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { content } from '../content'

const OCCASIONS = [
  'Wedding',
  'Engagement',
  'Anniversary',
  'Family celebration',
  'Something else',
] as const

type Fields = {
  name: string
  email: string
  phone: string
  occasion: (typeof OCCASIONS)[number]
  eventDate: string
  message: string
}

const emptyFields = (): Fields => ({
  name: '',
  email: '',
  phone: '',
  occasion: 'Wedding',
  eventDate: '',
  message: '',
})

function orderMailto(fields: Fields) {
  const { studio } = content
  const body = [
    'I would like a similar themed website.',
    '',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || '—'}`,
    `Occasion: ${fields.occasion}`,
    `Event date: ${fields.eventDate || '—'}`,
    '',
    fields.message.trim() || 'Please tell me how a site like this invitation could be made for my day.',
  ].join('\n')

  return `mailto:${studio.email}?subject=${encodeURIComponent('Website order — similar themed invitation')}&body=${encodeURIComponent(body)}`
}

function StudioDetails({
  studio,
  onOrder,
  onCollapse,
}: {
  studio: (typeof content)['studio']
  onOrder: (event: MouseEvent<HTMLButtonElement>) => void
  onCollapse: () => void
}) {
  return (
    <>
      <p className="text-center font-seal text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
        {studio.eyebrow}
      </p>
      <h2 className="mt-3 text-center font-display text-[2rem] font-semibold leading-tight text-[var(--forest)]">
        {studio.headline}
      </h2>
      <p className="mx-auto mt-4 max-w-[20rem] text-center font-body text-[1.02rem] leading-relaxed text-[var(--ink)]">
        {studio.credit}
      </p>
      <p className="mx-auto mt-3 max-w-[20rem] text-center font-display text-xl italic leading-snug text-[var(--forest)]">
        {studio.offer}
      </p>
      <p className="mx-auto mt-4 max-w-[20rem] text-center font-body text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
        {studio.pitch}
      </p>
      <ul className="studio-points">
        {studio.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="studio-actions">
        <button type="button" className="btn-gold studio-action" onClick={onOrder}>
          {studio.orderLabel}
        </button>
        <button type="button" className="btn-navigate studio-action" onClick={onOrder}>
          {studio.contactLabel}
        </button>
      </div>
      <p className="mt-3 text-center font-body text-sm leading-relaxed text-[var(--ink-soft)]">
        Your note opens in your mail app, addressed to {studio.email}.
      </p>
      <button type="button" className="studio-collapse" onClick={onCollapse}>
        {studio.collapseLabel}
      </button>
    </>
  )
}

export function StudioNote() {
  const { studio } = content
  const titleId = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const openForm = (event: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget
    setError('')
    setSent(false)
    setOpen(true)
  }

  const closeForm = () => {
    setOpen(false)
    openerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    nameRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeForm()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  const set = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!fields.name.trim() || !fields.email.trim()) {
      setError('Please add your name and email so the note is complete.')
      return
    }
    setError('')
    setSent(true)
    window.location.href = orderMailto({
      ...fields,
      name: fields.name.trim(),
      email: fields.email.trim(),
    })
  }

  return (
    <section className="studio-note" aria-label="Order a similar website">
      <div className="studio-card">
        {expanded ? (
          <StudioDetails studio={studio} onOrder={openForm} onCollapse={() => setExpanded(false)} />
        ) : (
          <button
            type="button"
            className="studio-teaser"
            aria-expanded="false"
            onClick={() => setExpanded(true)}
          >
            <p className="font-seal text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
              {studio.eyebrow}
            </p>
            <p className="mt-2 font-display text-[1.85rem] font-semibold leading-tight text-[var(--forest)]">
              {studio.teaserTitle}
            </p>
            <p className="mx-auto mt-2 max-w-[18rem] font-display text-xl italic leading-snug text-[var(--ink)]">
              {studio.teaserLine}
            </p>
            <span className="studio-teaser__cue">
              {studio.expandLabel}
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        )}
      </div>

      {open && (
        <div className="studio-dialog" onClick={closeForm}>
          <div
            className="studio-dialog__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <form className="studio-dialog__form" onSubmit={submit}>
              <div className="studio-dialog__body">
            <p className="text-center font-seal text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--forest)]">
              {studio.contactLabel}
            </p>
            <h2 id={titleId} className="mt-2 text-center font-display text-3xl font-semibold text-[var(--forest)]">
              Order a themed website
            </h2>
            <p className="mt-2 text-center font-body text-sm leading-relaxed text-[var(--ink-soft)]">
              These details are placed in an email to {studio.email}.
            </p>
            <div className="mt-4 grid gap-3">
              <label className="studio-field">
                <span>Your name</span>
                <input
                  ref={nameRef}
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => set('name')(event.target.value)}
                  required
                />
              </label>
              <label className="studio-field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={fields.email}
                  onChange={(event) => set('email')(event.target.value)}
                  required
                />
              </label>
              <label className="studio-field">
                <span>Phone</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={fields.phone}
                  onChange={(event) => set('phone')(event.target.value)}
                />
              </label>
              <label className="studio-field">
                <span>Occasion</span>
                <select
                  name="occasion"
                  value={fields.occasion}
                  onChange={(event) => set('occasion')(event.target.value)}
                >
                  {OCCASIONS.map((occasion) => (
                    <option key={occasion}>{occasion}</option>
                  ))}
                </select>
              </label>
              <label className="studio-field">
                <span>Event date</span>
                <input
                  name="eventDate"
                  type="date"
                  value={fields.eventDate}
                  onChange={(event) => set('eventDate')(event.target.value)}
                />
              </label>
              <label className="studio-field">
                <span>What you would like</span>
                <textarea
                  name="message"
                  rows={4}
                  value={fields.message}
                  onChange={(event) => set('message')(event.target.value)}
                />
              </label>
            </div>
              </div>
              <div className="studio-dialog__actions">
              {error && (
                <p className="mb-2 text-center font-body text-sm text-[var(--forest)]" role="alert">
                  {error}
                </p>
              )}
              {sent && (
                <p className="mb-2 text-center font-body text-sm text-[var(--forest)]">
                  If your mail app did not open, write to {studio.email}.
                </p>
              )}
              <button type="submit" className="btn-primary flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 font-body text-base font-semibold">
                Send by email
              </button>
              <button type="button" className="btn-navigate mt-2 min-h-12 w-full rounded-full px-5 py-3 font-body text-base font-semibold" onClick={closeForm}>
                Close
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
