<script setup lang="ts">
import { practice, phoneHref } from '#shared/practice'
import { routes } from '#shared/routes'
import { getService, relatedServices, servicePath } from '#shared/services'
import { trail } from '#shared/seo'

const route = useRoute()
const service = getService(String(route.params.slug))

if (!service) {
  await navigateTo(routes.home, { redirectCode: 302, replace: true })
}

const related = relatedServices(service)
const crumbs = trail(
  { name: 'Services', to: routes.services },
  { name: service.name },
)

usePageSeo({
  title: service.seoTitle,
  description: service.seoDescription,
  crumbs,
})

useSchemaOrg([
  {
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.seoDescription,
    areaServed: {
      '@type': 'City',
      name: practice.address.city,
    },
    provider: { '@id': '#identity' },
  },
])
</script>

<template>
  <article>
    <header class="bg-ivory">
      <div class="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
        <figure class="relative min-h-[18rem] lg:col-span-7 lg:min-h-[36rem]">
          <UiPhoto
            :src="service.image"
            :alt="service.imageAlt"
            width="1600"
            height="1200"
            sizes="100vw lg:58vw"
            preload
            class="h-full w-full object-cover"
          />
        </figure>
        <div class="flex items-end px-5 py-12 md:px-8 lg:col-span-5 lg:px-12 lg:py-16">
          <div>
            <UiBreadcrumb :items="crumbs" />
            <p class="mt-6 text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">Services</p>
            <h1 class="mt-4 text-forest">{{ service.name }}</h1>
            <p class="mt-4 max-w-md text-lg leading-relaxed text-muted">{{ service.summary }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <UiButton
                v-if="service.requestReason"
                :to="{ path: routes.contact, query: { reason: service.requestReason } }"
              >
                Request this visit
              </UiButton>
              <UiButton v-else :href="phoneHref">Call {{ practice.phoneDisplay }}</UiButton>
              <UiButton v-if="service.slug === 'urgent-care'" variant="secondary" :to="routes.emergency">
                If this cannot wait
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto grid w-full max-w-[96rem] gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:px-12">
      <div class="lg:col-span-6 lg:col-start-2">
        <h2 class="text-forest">What to expect</h2>
        <p class="mt-4 text-lg leading-relaxed text-muted">{{ service.body }}</p>
      </div>
      <ol class="grid list-none gap-6 p-0 lg:col-span-4">
        <li v-for="(point, index) in service.points" :key="point" class="border-t border-line pt-4">
          <p class="text-[0.72rem] font-semibold tracking-[0.16em] text-sage uppercase">0{{ index + 1 }}</p>
          <p class="mt-2 text-ink">{{ point }}</p>
        </li>
      </ol>
    </div>

    <aside v-if="related.length" class="border-t border-line" aria-labelledby="related-title">
      <div class="mx-auto flex w-full max-w-[96rem] flex-col gap-4 px-5 py-10 md:flex-row md:items-baseline md:justify-between md:px-8 lg:px-12">
        <h2 id="related-title" class="text-forest">Related care</h2>
        <ul class="flex flex-wrap gap-x-6 gap-y-2 p-0 list-none">
          <li v-for="item in related" :key="item.slug">
            <NuxtLink :to="servicePath(item)" class="font-semibold text-forest no-underline">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </article>
  <UiVisitCta />
</template>

<style scoped>
h1 {
  font-size: var(--step-4);
}

h2 {
  font-size: var(--step-2);
}
</style>
