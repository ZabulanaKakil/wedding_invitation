import { useEffect, useState } from 'react'
import { content } from '../content'
import { Reveal } from './PhoneShell'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
] as const

function partsUntil(target: number, now: number) {
  const gap = Math.max(0, target - now)
  const days = Math.floor(gap / 86_400_000)
  const hours = Math.floor((gap % 86_400_000) / 3_600_000)
  const minutes = Math.floor((gap % 3_600_000) / 60_000)
  const seconds = Math.floor((gap % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

export function Countdown() {
  const target = new Date(content.weddingDate.startsAt).getTime()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const left = partsUntil(target, now)

  return (
    <section
      id="section-countdown"
      data-section
      className="invite-section section-paper-fade px-6"
    >
      <Reveal>
        <p className="text-center font-seal text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[var(--forest)]">
          Until the day
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-[var(--forest)]">
          Countdown
        </h2>
        <div className="gold-rule mt-4" />
        <div className="countdown-ring">
          <img
            src={asset(content.countdown.frame)}
            alt=""
            width={720}
            height={713}
            decoding="async"
          />
          <div className="countdown-digits">
            {UNITS.map((unit) => (
              <p key={unit.key}>
                <strong>{String(left[unit.key]).padStart(2, '0')}</strong>
                <span>{unit.label}</span>
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
