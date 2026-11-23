export const visitReasons = [
  { id: 'wellness', label: 'Wellness exam' },
  { id: 'vaccination', label: 'Vaccination' },
  { id: 'dental', label: 'Dental care' },
  { id: 'surgery', label: 'Surgery consultation' },
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'other', label: 'Other concern' },
] as const

export const companions = [
  { id: 'Dog', label: 'Dog', seenHere: true, image: '/images/home-dog.jpg', alt: 'A small black-and-tan dog against a warm pink ground.' },
  { id: 'Cat', label: 'Cat', seenHere: true, image: '/images/home-cat.jpg', alt: 'An orange tabby against a warm yellow ground.' },
  { id: 'Hamster', label: 'Hamster', seenHere: false, image: '/images/species-hamster-sage.jpg', alt: 'A golden hamster against a soft sage ground.' },
  { id: 'Lizard', label: 'Lizard', seenHere: false, image: '/images/species-lizard-blue.jpg', alt: 'A bearded dragon against a pale blue ground.' },
  { id: 'Snake', label: 'Snake', seenHere: false, image: '/images/species-snake.jpg', alt: 'A corn snake coiled on a warm ivory ground.' },
  { id: 'Mini pig', label: 'Mini pig', seenHere: false, image: '/images/species-pig.jpg', alt: 'A mini pig against a warm blush ground.' },
] as const

export const speciesOptions = companions.map(item => item.id)
export const contactMethods = ['Phone', 'Email'] as const
export const timingOptions = ['Morning', 'Afternoon', 'First available'] as const

export type VisitReason = (typeof visitReasons)[number]['id']
export type Species = (typeof companions)[number]['id']
export type ContactMethod = (typeof contactMethods)[number]
export type Timing = (typeof timingOptions)[number]

export type AppointmentInput = {
  visitReason: VisitReason | ''
  species: Species | ''
  speciesDetail: string
  petName: string
  guardianName: string
  phone: string
  email: string
  contactMethod: ContactMethod | ''
  preferredDate: string
  timing: Timing | ''
  notes: string
  newClient: boolean
  company: string
}

export type FieldErrors = Partial<Record<
  Exclude<keyof AppointmentInput, 'company' | 'newClient'>,
  string
>>

export type AppointmentResponse =
  | { ok: true, demo?: boolean }
  | { ok: false, message?: string, errors?: FieldErrors }

type ParseResult =
  | { ok: true, value: AppointmentInput }
  | { ok: false, errors: FieldErrors }

const empty: AppointmentInput = {
  visitReason: '',
  species: '',
  speciesDetail: '',
  petName: '',
  guardianName: '',
  phone: '',
  email: '',
  contactMethod: '',
  preferredDate: '',
  timing: '',
  notes: '',
  newClient: false,
  company: '',
}

const stepFields = {
  1: ['species', 'speciesDetail', 'petName'],
  2: ['visitReason'],
  3: ['guardianName', 'phone', 'email', 'contactMethod'],
  4: ['preferredDate', 'timing', 'notes'],
} as const satisfies Record<number, (keyof FieldErrors)[]>

export function emptyAppointment(): AppointmentInput {
  return { ...empty }
}

export function visitReasonLabel(id: string) {
  return visitReasons.find(item => item.id === id)?.label ?? id
}

export function companionFor(id: string) {
  return companions.find(item => item.id === id)
}

export function practiceToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date())
}

export function formatVisitDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return iso
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function text(source: Record<string, unknown>, key: string) {
  return typeof source[key] === 'string' ? source[key].trim() : ''
}

function cleanLine(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanNotes(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, '')
}

function isRealDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return false
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

function sanitize(value: AppointmentInput): AppointmentInput {
  return {
    ...value,
    petName: cleanLine(value.petName),
    guardianName: cleanLine(value.guardianName),
    phone: phoneDigits(value.phone),
    email: cleanLine(value.email).toLowerCase(),
    notes: cleanNotes(value.notes),
    speciesDetail: '',
  }
}

function collectErrors(value: AppointmentInput): FieldErrors {
  const errors: FieldErrors = {}

  if (!visitReasons.some(item => item.id === value.visitReason)) {
    errors.visitReason = 'Choose the reason for the visit.'
  }

  if (!speciesOptions.includes(value.species as Species)) {
    errors.species = 'Choose who the visit is for.'
  }

  if (!/\p{L}/u.test(value.petName)) errors.petName = 'Tell us the animal’s name.'
  else if (value.petName.length > 60) errors.petName = 'Use a shorter name.'

  if (!/\p{L}/u.test(value.guardianName) || value.guardianName.length < 2) {
    errors.guardianName = 'Enter the name we should ask for.'
  }
  else if (value.guardianName.length > 80) errors.guardianName = 'Use a shorter name.'

  if (!/^\d{10,15}$/.test(value.phone)) errors.phone = 'Enter a phone number we can call.'

  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value.email) || value.email.length > 120) {
    errors.email = 'Enter an email address in case we miss you by phone.'
  }

  if (!contactMethods.includes(value.contactMethod as ContactMethod)) {
    errors.contactMethod = 'Choose how we should reach you.'
  }

  if (!isRealDate(value.preferredDate)) {
    errors.preferredDate = 'Choose a real date.'
  }
  else if (value.preferredDate < practiceToday()) {
    errors.preferredDate = 'Choose today or a later date.'
  }

  if (!timingOptions.includes(value.timing as Timing)) errors.timing = 'Choose a time of day.'

  if (value.notes.length > 1000) {
    errors.notes = 'Keep this to a few sentences. The details can wait for the call.'
  }
  else if (value.visitReason === 'other' && value.notes.length < 8) {
    errors.notes = 'Say briefly what you want the visit to cover.'
  }

  return errors
}

export function errorsForStep(input: AppointmentInput, step: 1 | 2 | 3 | 4) {
  const all = collectErrors(sanitize(input))
  const picked: FieldErrors = {}
  for (const key of stepFields[step]) {
    if (all[key]) picked[key] = all[key]
  }
  return picked
}

export function parseAppointment(input: unknown): ParseResult {
  const source = input && typeof input === 'object' ? input as Record<string, unknown> : {}
  const value: AppointmentInput = {
    visitReason: text(source, 'visitReason') as AppointmentInput['visitReason'],
    species: text(source, 'species') as AppointmentInput['species'],
    speciesDetail: text(source, 'speciesDetail'),
    petName: text(source, 'petName'),
    guardianName: text(source, 'guardianName'),
    phone: text(source, 'phone'),
    email: text(source, 'email'),
    contactMethod: text(source, 'contactMethod') as AppointmentInput['contactMethod'],
    preferredDate: text(source, 'preferredDate'),
    timing: text(source, 'timing') as AppointmentInput['timing'],
    notes: text(source, 'notes'),
    newClient: source.newClient === true,
    company: text(source, 'company'),
  }

  const clean = sanitize(value)
  const errors = collectErrors(clean)
  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, value: clean }
}
