/**
 * Sample roster. Replace names, roles, biographies, years in practice,
 * and schools with the hospital's clinicians.
 */

export type Clinician = {
  slug: string
  name: string
  credentials: string
  role: string
  focus: string[]
  summary: string
  experience: string
  bio: string
  portrait: string
  portraitAlt: string
  seoTitle: string
  seoDescription: string
}

export const team: Clinician[] = [
  {
    slug: 'elena-ward',
    name: 'Elena Ward',
    credentials: 'DVM',
    role: 'Medical director',
    focus: ['Internal medicine', 'Senior pets', 'Complicated cases'],
    summary: 'Leads the medical standard and takes the cases that do not fit a single visit.',
    experience: 'Eighteen years in practice. Graduated from the University of Tennessee College of Veterinary Medicine.',
    portrait: '/images/team-elena.jpg',
    portraitAlt: 'Dr. Elena Ward with a senior cream-colored dog.',
    bio: 'Dr. Ward sets the pace of the hospital: examine first, explain the fork in the road, then proceed. She spends much of her week on internal medicine and on animals whose problems have already outgrown a single visit.',
    seoTitle: 'Dr. Elena Ward, DVM',
    seoDescription:
      'Dr. Elena Ward is medical director at Riverside Veterinary Hospital in Chattanooga, focused on internal medicine and complex cases.',
  },
  {
    slug: 'marcus-hale',
    name: 'Marcus Hale',
    credentials: 'DVM',
    role: 'Surgeon',
    focus: ['Soft tissue surgery', 'Dentistry', 'Pain control'],
    summary: 'Plans procedures with the estimate, the risk, and the recovery said before the day.',
    experience: 'Twelve years in practice. Graduated from the Auburn University College of Veterinary Medicine.',
    portrait: '/images/team-marcus.jpg',
    portraitAlt: 'Dr. Marcus Hale holding a grey cat.',
    bio: 'Dr. Hale handles the hospital’s surgical and dental cases. He would rather delay a non-urgent procedure than start one you have not had time to understand, and he treats pain control as part of the surgery itself.',
    seoTitle: 'Dr. Marcus Hale, DVM',
    seoDescription:
      'Dr. Marcus Hale is a veterinary surgeon at Riverside Veterinary Hospital in Chattanooga, covering soft tissue surgery and dentistry.',
  },
  {
    slug: 'priya-shah',
    name: 'Priya Shah',
    credentials: 'DVM',
    role: 'Wellness veterinarian',
    focus: ['Preventive care', 'New patients', 'Nutrition'],
    summary: 'Sees new patients and builds the preventive plan most animals actually need.',
    experience: 'Seven years in practice. Graduated from the University of Georgia College of Veterinary Medicine.',
    portrait: '/images/team-priya.jpg',
    portraitAlt: 'Dr. Priya Shah crouching beside a young tan dog.',
    bio: 'Dr. Shah is often the first veterinarian a new client meets. She uses that visit to learn how the animal lives, then sets a preventive plan for vaccines, parasites, weight, and teeth that you can keep between appointments.',
    seoTitle: 'Dr. Priya Shah, DVM',
    seoDescription:
      'Dr. Priya Shah practices wellness and preventive care for dogs and cats at Riverside Veterinary Hospital in Chattanooga.',
  },
]

const bySlug = new Map(team.map(member => [member.slug, member]))

export function getClinician(slug: string) {
  return bySlug.get(slug)
}

export function clinicianName(member: Clinician) {
  return `Dr. ${member.name}, ${member.credentials}`
}
