import { useState } from 'react'
import { Countdown } from './components/Countdown'
import { IntroEnvelope } from './components/IntroEnvelope'
import { PhoneShell } from './components/PhoneShell'
import { Rsvp } from './components/Rsvp'
import { Venue } from './components/Venue'
import { WeddingDate } from './components/WeddingDate'

export default function App() {
  const [scrollUnlocked, setScrollUnlocked] = useState(false)
  const [envelopeOpening, setEnvelopeOpening] = useState(false)

  return (
    <PhoneShell allowOverflow={envelopeOpening && !scrollUnlocked}>
      <main
        className={`invite-scroll h-full overscroll-y-contain ${
          scrollUnlocked
            ? 'overflow-y-auto'
            : envelopeOpening
              ? 'overflow-visible'
              : 'overflow-y-hidden'
        }`}
        style={{ touchAction: scrollUnlocked ? 'manipulation' : 'none' }}
      >
        <IntroEnvelope
          onOpening={() => setEnvelopeOpening(true)}
          onOpened={() => {
            setEnvelopeOpening(false)
            setScrollUnlocked(true)
          }}
        />
        <Countdown />
        <WeddingDate />
        <Venue />
        <Rsvp />
      </main>
    </PhoneShell>
  )
}
