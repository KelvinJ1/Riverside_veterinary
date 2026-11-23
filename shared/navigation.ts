import { routes } from './routes'

export type NavItem = {
  label: string
  to: string
  description?: string
}

export const primaryNav: NavItem[] = [
  { label: 'Services', to: routes.services, description: 'Care we provide' },
  { label: 'About us', to: routes.about, description: 'How Riverside works' },
  { label: 'Team', to: routes.team, description: 'Veterinarians' },
  { label: 'New clients', to: routes.newClients, description: 'A first visit' },
  { label: 'Contact', to: routes.contact, description: 'Hours and requests' },
]

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: 'Urgent care', to: routes.emergency },
  { label: 'Privacy', to: routes.privacy },
]
