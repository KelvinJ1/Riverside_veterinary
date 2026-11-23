/**
 * Single source for the practice.
 * Header, footer, contact, schema, and hours all read this file.
 * Phone and email are placeholders. Street is blank until the brief confirms it.
 */

export type DayName =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type HoursEntry = {
  label: string
  days: DayName[]
  opens: string
  closes: string
  closed?: boolean
}

export const practice = {
  name: 'Riverside Veterinary Hospital',
  shortName: 'Riverside',
  category: 'Veterinary hospital',
  description:
    'Companion animal hospital in Chattanooga for preventive care, surgery, dentistry, diagnostics, and urgent visits.',
  phoneDisplay: '(423) 555-0198',
  phone: '+1-423-555-0198',
  email: 'care@riversidevethospital.example',
  address: {
    street: '',
    city: 'Chattanooga',
    region: 'TN',
    regionName: 'Tennessee',
    postalCode: '',
    country: 'US',
  },
  timezone: 'America/New_York',
  acceptingNewClients: true,
  species: ['dogs', 'cats'] as const,
  hours: [
    {
      label: 'Monday – Friday',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '18:00',
    },
    {
      label: 'Saturday',
      days: ['Saturday'],
      opens: '08:00',
      closes: '13:00',
    },
    {
      label: 'Sunday',
      days: ['Sunday'],
      opens: '00:00',
      closes: '00:00',
      closed: true,
    },
  ] satisfies HoursEntry[],
}

export const phoneHref = `tel:${practice.phone.replace(/[^\d+]/g, '')}`

export function addressLines() {
  const lines: string[] = []
  if (practice.address.street) lines.push(practice.address.street)
  const city = [practice.address.city, practice.address.region].filter(Boolean).join(', ')
  const locality = [city, practice.address.postalCode].filter(Boolean).join(' ')
  if (locality) lines.push(locality)
  return lines
}

const mapQuery = practice.address.street
  ? `${practice.address.street}, ${practice.address.city}, ${practice.address.regionName}`
  : `${practice.name}, ${practice.address.city}, ${practice.address.regionName}`

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`

export function schemaAddress() {
  return {
    ...(practice.address.street ? { streetAddress: practice.address.street } : {}),
    addressLocality: practice.address.city,
    addressRegion: practice.address.region,
    ...(practice.address.postalCode ? { postalCode: practice.address.postalCode } : {}),
    addressCountry: practice.address.country,
  }
}

export function schemaHours() {
  return practice.hours
    .filter(entry => !entry.closed)
    .map(entry => ({
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    }))
}
