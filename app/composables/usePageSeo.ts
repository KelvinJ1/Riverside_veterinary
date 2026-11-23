import type { Crumb } from '#shared/seo'

type PageSeoInput = {
  title: string
  description: string
  crumbs?: Crumb[]
}

export function usePageSeo(input: PageSeoInput) {
  useSeoMeta({
    title: input.title,
    description: input.description,
  })

  if (!input.crumbs?.length) return

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: input.crumbs.map(crumb => (
        crumb.to ? { name: crumb.name, item: crumb.to } : { name: crumb.name }
      )),
    }),
  ])
}
