/**
 * All invitation content lives here.
 * Swap demo copy, photos, venue, Maps URLs, and the Google Form link before publishing.
 */
export const content = {
  couple: {
    groom: 'Tanvir Nahian Swapnil',
    bride: 'Tasnia Akter',
    announcement: "We would like to invite you to the wedding of ",
    tagline: 'Together with our families, we invite you to celebrate our wedding.',
  },

  /** Envelope layers + HTML card */
  intro: {
    envelopeLower: 'images/lower.png',
    envelopeUpper: 'images/upper.png',
    envelopeSeal: 'images/date-seal.svg',
    coupleArt: 'images/couple-ss2.png',
    closedTap: 'Tap To Open',
    openHint: 'Scroll to continue',
  },

  loveStory: {
    title: 'Our Love Story',
    paragraphs: [
      'It began with a Sudden message, one message but different opinions. Arguments and logics led to more converations but in the end the fights became our foundation.',
      'Through seasons of laughter, patience, and faith, friendship deepened into a promise. Promise turned into love and love turned into us.',
      'For we chose not to follow the traditional path but to follow our hearts and our dreams. And now we are here, ready to start a new chapter of our lives together.',
    ],
  },

  /** Friday, 21 August 2026 */
  weddingDate: {
    year: 2026,
    month: 7, // 0-indexed (August)
    day: 21,
    weekdayLabel: 'Friday',
    display: 'Friday, 21 August 2026',
    time: '5:00 PM onwards',
  },

  venue: {
    name: 'Sena Prangon',
    subtitle: 'Dhaka Cantonment',
    address: 'MP Checkpost, Matikata Road, Dhaka Cantonment, Bangladesh',
    photo: 'images/senaprangan.png',
    photoAlt: 'Celebration hall at Sena Prangon',
    details:
      'A secure cantonment convention venue opposite Matikata Bus Stop — spacious halls, ample parking, and easy access by CNG, bus, or metro (Mirpur 11 / Pallabi).',
    note: 'Please allow a little extra time for gate security at the cantonment entrance.',
    embedUrl:
      'https://www.google.com/maps?q=Senaprangan+Matikata+Road+Dhaka+Cantonment&output=embed',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Senaprangan+Matikata+Road+Dhaka+Cantonment',
  },

  dressCode: {
    title: 'Dress Color Code',
    subtitle: 'We kindly request guests to wear tones from this palette.',
    colors: [
      { name: 'Blush', hex: '#E8C4C0' },
      { name: 'Sage', hex: '#5C7A68' },
      { name: 'Champagne', hex: '#C4A574' },
      { name: 'Pearl', hex: '#F7F0EA' },
    ],
  },

  /** Private — not shown on the public invite */
  gallery: [
    { src: 'images/image1.png', alt: 'Wedding photo 1' },
    { src: 'images/image2.png', alt: 'Wedding photo 2' },
    { src: 'images/image3.png', alt: 'Wedding photo 3' },
    { src: 'images/image4.png', alt: 'Wedding photo 4' },
    { src: 'images/image5.png', alt: 'Wedding photo 5' },
  ],

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
        child: 'Tasnia Akter',
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
