import { useState } from 'react'
import { Countdown } from './components/Countdown'
import { IntroEnvelope } from './components/IntroEnvelope'
import { PhoneShell } from './components/PhoneShell'
import { Rsvp } from './components/Rsvp'
import { ScrollCue } from './components/ScrollCue'
import { StudioNote } from './components/StudioNote'
import { Venue } from './components/Venue'
import { VisitCount } from './components/VisitCount'
import { WeddingDate } from './components/WeddingDate'

export default function App() {
  const [scrollUnlocked, setScrollUnlocked] = useState(false)

  return (
    <PhoneShell>
      <main
        className={`invite-scroll h-full overscroll-y-contain ${
          scrollUnlocked ? 'overflow-y-auto' : 'overflow-y-hidden'
        }`}
        style={{ touchAction: 'manipulation' }}
      >
        <IntroEnvelope onOpened={() => setScrollUnlocked(true)} />
        <Countdown />
        <WeddingDate />
        <Venue />
        <Rsvp />
        <StudioNote />
        <VisitCount />
      </main>
      <ScrollCue active={scrollUnlocked} />
    </PhoneShell>
  )
}
