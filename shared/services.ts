import { routes } from './routes'

export type Service = {
  slug: string
  name: string
  seoTitle: string
  seoDescription: string
  summary: string
  body: string
  points: string[]
  related: string[]
  image: string
  imageAlt: string
  requestReason?: 'wellness' | 'vaccination' | 'dental' | 'surgery' | 'diagnostics' | 'other'
}

export const services: Service[] = [
  {
    slug: 'wellness',
    name: 'Wellness care',
    seoTitle: 'Preventive veterinary care in Chattanooga',
    seoDescription:
      'Wellness exams, vaccines, and parasite prevention for dogs and cats at Riverside Veterinary Hospital in Chattanooga.',
    summary: 'Exams, vaccines, and a plan for the year, with time left for your questions.',
    body: 'A wellness visit is the visit that keeps the others smaller. We examine the animal in front of us, review what changed at home, and leave you with a written plan for vaccines, parasites, weight, and teeth.',
    points: [
      'Annual or twice-yearly exams, scaled to age and health',
      'Vaccines and parasite prevention chosen for this animal, not a package',
      'Time held for the questions you wrote down before you came',
    ],
    related: ['dentistry', 'pharmacy', 'diagnostics'],
    image: '/images/service-exam.jpg',
    imageAlt: 'A veterinarian listens to a senior dog during an exam.',
    requestReason: 'wellness',
  },
  {
    slug: 'surgery',
    name: 'Surgery',
    seoTitle: 'Veterinary surgery in Chattanooga',
    seoDescription:
      'Planned veterinary surgery in Chattanooga, with an exam, an estimate, and pain control discussed before the procedure.',
    summary: 'Planned procedures with the risks, the alternative, and the estimate said out loud first.',
    body: 'Surgery at Riverside starts before the day of the procedure. We examine the patient, talk through bloodwork, and explain what we recommend, what we can wait on, and what it will cost. Pain control is part of the plan, not an add-on after recovery.',
    points: [
      'A pre-surgical exam, and bloodwork when the case calls for it',
      'Estimates and alternatives before a non-urgent procedure is booked',
      'Pain control planned ahead of the procedure',
    ],
    related: ['diagnostics', 'dentistry', 'urgent-care'],
    image: '/images/service-surgery.jpg',
    imageAlt: 'A cat under anesthesia, with a breathing mask, during a procedure.',
    requestReason: 'surgery',
  },
  {
    slug: 'dentistry',
    name: 'Dentistry',
    seoTitle: 'Dog and cat dentistry in Chattanooga',
    seoDescription:
      'Dental cleanings, imaging, and extractions for dogs and cats at a Chattanooga veterinary hospital.',
    summary: 'Cleaning below the gum line, imaging when it changes the decision, and a home plan you can keep.',
    body: 'Dental disease hides under the gum. A proper cleaning is done under anesthesia so we can see, image, and treat the teeth that need it. Extractions happen when a tooth cannot be saved, and you hear that recommendation before it is carried out.',
    points: [
      'Anesthesia, monitoring, and a full oral exam',
      'Imaging when it changes which teeth can stay',
      'A home-care plan written for the way you actually live',
    ],
    related: ['wellness', 'surgery', 'pharmacy'],
    image: '/images/service-dental.jpg',
    imageAlt: 'A clinician cleans a dog’s teeth while dental radiographs show on a screen.',
    requestReason: 'dental',
  },
  {
    slug: 'diagnostics',
    name: 'Diagnostics',
    seoTitle: 'Veterinary diagnostics in Chattanooga',
    seoDescription:
      'In-hospital bloodwork, urinalysis, and imaging for dogs and cats at Riverside Veterinary Hospital in Chattanooga.',
    summary: 'Bloodwork, urinalysis, and imaging, explained in the same visit when the test allows it.',
    body: 'A test is useful when it changes what we do next. We run bloodwork, urinalysis, and imaging in the hospital, tell you what the result means, and refer you on when a specialist is the better medicine.',
    points: [
      'In-hospital laboratory and imaging',
      'Results explained before you leave, when the test returns the same day',
      'A clear referral when the case needs a specialist',
    ],
    related: ['urgent-care', 'surgery', 'wellness'],
    image: '/images/service-diagnostics.jpg',
    imageAlt: 'A veterinarian reviews an ultrasound while a small dog rests nearby.',
    requestReason: 'diagnostics',
  },
  {
    slug: 'urgent-care',
    name: 'Urgent care',
    seoTitle: 'Urgent veterinary care in Chattanooga',
    seoDescription:
      'Same-day veterinary visits in Chattanooga for dogs and cats who should not wait for a routine appointment.',
    summary: 'Same-day visits for animals who should not wait. If they are in distress, call. Do not use the form.',
    body: 'Urgent care is for the animal who became sick, painful, or injured and should be seen today. Call first. We will tell you whether to come in, what to expect, or when an emergency hospital is the safer door.',
    points: [
      'Call ahead so the team can prepare a table and an honest answer',
      'Same-day visits reserved for cases that should not wait',
      'The request form is for routine visits, never for distress',
    ],
    related: ['diagnostics', 'surgery', 'wellness'],
    image: '/images/service-emergency.jpg',
    imageAlt: 'A veterinarian listens to a tan dog standing on an exam table.',
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy and nutrition',
    seoTitle: 'Veterinary pharmacy in Chattanooga',
    seoDescription:
      'Prescription medication and diet recommendations for dogs and cats at Riverside Veterinary Hospital in Chattanooga.',
    summary: 'Medications and diets tied to a diagnosis, with the reason said in plain language.',
    body: 'We dispense medication when it belongs to a diagnosis, and we want you to be able to repeat the reason back. Diet changes follow the same rule. Refill requests are taken by phone during open hours.',
    points: [
      'Prescriptions explained before you leave the building',
      'Nutrition advice attached to a medical reason',
      'Refills by phone while the hospital is open',
    ],
    related: ['wellness', 'diagnostics', 'dentistry'],
    image: '/images/service-pharmacy.jpg',
    imageAlt: 'An orange tabby resting on a wood floor.',
    requestReason: 'other',
  },
]

const bySlug = new Map(services.map(service => [service.slug, service]))

export function getService(slug: string) {
  return bySlug.get(slug)
}

export function relatedServices(service: Service) {
  return service.related
    .map(slug => bySlug.get(slug))
    .filter((item): item is Service => Boolean(item))
}

export function servicePath(service: Service) {
  return routes.service(service.slug)
}
