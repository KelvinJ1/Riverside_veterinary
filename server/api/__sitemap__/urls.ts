import { defineSitemapEventHandler } from '#sitemap/server'
import { services } from '#shared/services'
import { team } from '#shared/team'
import { routes } from '#shared/routes'

export default defineSitemapEventHandler(() => {
  return [
    ...services.map(service => ({
      loc: routes.service(service.slug),
    })),
    ...team.map(member => ({
      loc: routes.clinician(member.slug),
    })),
  ]
})
