import tailwindcss from '@tailwindcss/vite'
import { practice, schemaAddress, schemaHours } from './shared/practice'
import { routes } from './shared/routes'
import { services } from './shared/services'
import { team } from './shared/team'

const siteUrl = process.env.NUXT_SITE_URL || 'https://www.riversidevethospital.example'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-23',
  devtools: { enabled: true },
  modules: ['@nuxtjs/seo', '@nuxt/fonts', '@nuxt/image'],
  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: practice.name,
    description: practice.description,
    defaultLocale: 'en-US',
  },

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      '@type': 'VeterinaryCare',
      name: practice.name,
      description: practice.description,
      url: siteUrl,
      telephone: practice.phone,
      email: practice.email,
      address: schemaAddress(),
      openingHoursSpecification: schemaHours(),
      areaServed: {
        '@type': 'City',
        name: practice.address.city,
      },
    },
  },

  // A static share image can live at public/og-image.png.
  // Dynamic OG stays off until a renderer is installed.
  ogImage: false,
  skewProtection: false,

  seo: {
    meta: {
      themeColor: '#21483d',
    },
    automaticTwitterTags: false,
  },

  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google' },
      { name: 'Figtree', provider: 'google' },
      { name: 'Poppins', provider: 'google', weights: [800], styles: ['normal'] },
    ],
  },

  image: {
    quality: 80,
    format: ['avif', 'webp'],
  },

  runtimeConfig: {
    appointmentWebhookUrl: '',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        routes.home,
        routes.services,
        routes.team,
        routes.about,
        routes.newClients,
        routes.contact,
        routes.emergency,
        routes.privacy,
        ...services.map(service => routes.service(service.slug)),
        ...team.map(member => routes.clinician(member.slug)),
      ],
    },
  },
})
