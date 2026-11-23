export const routes = {
  home: '/',
  services: '/services',
  service: (slug: string) => `/services/${slug}`,
  team: '/team',
  clinician: (slug: string) => `/team/${slug}`,
  about: '/about',
  newClients: '/new-clients',
  contact: '/contact',
  emergency: '/emergency',
  privacy: '/privacy',
} as const
