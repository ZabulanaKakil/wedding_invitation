/** Invitation copy, photos, and links. */
export const content = {
  couple: {
    groom: 'Tanvir Nahian Swapnil',
    bride: 'Tasnia Akter Ety',
    announcement: 'Together with our families',
    tagline: 'Kindly reply',
    venueLine: '1st Floor, Police Convention Hall, Eskaton Garden, Dhaka',
  },

  /** Envelope layers + HTML card */
  intro: {
    envelopeLower: 'images/envelope-body.webp',
    envelopeUpper: 'images/envelope-flap.webp',
    envelopeSeal: 'images/date-seal.svg',
    coupleArt: 'images/couple-cream-black.png',
    heroScene: 'images/hero-scene.webp',
    closedTap: 'Tap To Open',
    openHint: 'Scroll to continue',
    skipLabel: 'Skip',
  },

  /** Saturday, 5 December 2026 */
  weddingDate: {
    year: 2026,
    month: 11, // 0-indexed (December)
    day: 5,
    weekdayLabel: 'Saturday',
    display: 'Saturday, 5 December 2026',
    time: '2:00 PM onwards',
    /** Ceremony start, fixed to Dhaka time (14:00). */
    startsAt: '2026-12-05T14:00:00+06:00',
    endsAt: '2026-12-05T22:00:00+06:00',
    calendarTitle: 'Wedding of Tanvir Nahian Swapnil & Tasnia Akter Ety',
  },

  countdown: {
    frame: 'images/flower-frame.webp',
  },

  venue: {
    name: 'Police Convention Hall',
    floor: '1st Floor',
    subtitle: 'Eskaton Garden, Ramna',
    address: '1st Floor, 37/3/B Eskaton Garden Road, Ramna, Dhaka',
    details:
      'Bangladesh Police Officers’ Mess and Convention Hall, beside the Ministry of Expatriates’ Welfare.',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6124.832001108692!2d90.39953547533577!3d23.74474587867426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b891f5f213b5%3A0x35180b044b72b5c7!2sPolice%20Convention%20Hall!5e1!3m2!1sen!2sbd!4v1791777943538!5m2!1sen!2sbd',
    mapsUrl: 'https://maps.app.goo.gl/ymdXSbmQxdoYbKdy6',
    /** Omitting origin makes Google Maps route from the phone's current location. */
    navigateUrl:
      'https://www.google.com/maps/dir/?api=1&destination=23.744746,90.399535&travelmode=driving',
  },

  rsvp: {
    title: 'RSVP',
    greeting: 'Assalamu Alaikum',
    inviteScript:
      'With the blessings of Allah, we joyfully invite you to the wedding celebration of our beloved children.',
    familyHeading: 'Request the honour of your presence',
    families: [
      {
        side: 'Son of',
        father: 'Md Abu Sufian',
        mother: 'Tahmina Akter',
        child: 'Tanvir Nahian Swapnil',
        role: 'Groom',
      },
      {
        side: 'Daughter of',
        father: 'Late Md Yar Hossain',
        mother: 'Mrs Shahinoor Begum',
        child: 'Tasnia Akter Ety',
        role: 'Bride',
      },
    ],
    closingScript: 'Your presence will make our day complete.',
    note: 'Kindly let us know if you will join us, so we may plan seating and meals with care.',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSdcaDQocKDSkjnGtQHLKnqB-YBepbme1Ybbt32DU8ORl6wgnQ/viewform?usp=header',
    formButtonLabel: 'Accept the invitation (click here)',
  },
} as const

export type Content = typeof content
