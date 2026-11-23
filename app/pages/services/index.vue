<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'
import { services, servicePath } from '#shared/services'
import { trail } from '#shared/seo'

usePageSeo({
  title: 'Veterinary services in Chattanooga',
  description: 'Wellness, surgery, dentistry, diagnostics, urgent care, and pharmacy for dogs and cats at Riverside Veterinary Hospital in Chattanooga.',
  crumbs: trail({ name: 'Services' }),
})

useSchemaOrg([
  {
    '@type': 'ItemList',
    name: 'Veterinary services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: servicePath(service),
    })),
  },
])

const places = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-4',
  'lg:col-span-8',
]

const section = ref<HTMLElement | null>(null)
useReveal(section)
</script>

<template>
  <section ref="section" class="bg-ivory" aria-labelledby="services-title">
    <svg class="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <clipPath id="service-wellness-mask" clipPathUnits="objectBoundingBox">
          <path d="M0.18 0 C0.04 0.16 0.14 0.4 0.02 0.64 C0 0.82 0.1 1 0.26 1 H1 V0 Z" />
        </clipPath>
      </defs>
    </svg>

    <div class="mx-auto w-full max-w-[96rem] px-5 py-12 md:px-8 lg:px-12 lg:py-20">
      <UiBreadcrumb :items="trail({ name: 'Services' })" />
      <div class="mt-8 grid items-end gap-6 lg:grid-cols-12" data-reveal>
        <div class="lg:col-span-7">
          <p class="text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">Services</p>
          <h1 id="services-title" class="mt-4 max-w-[14ch] text-forest">Care for dogs and cats.</h1>
        </div>
        <p class="max-w-sm text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
          Every service below is provided in this hospital. If a case needs a specialist, that is part of the recommendation.
        </p>
      </div>

      <div class="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <article
          v-for="(service, index) in services"
          :key="service.slug"
          data-reveal
          :style="{ transitionDelay: `${index * 60}ms` }"
          :class="[
            'group grid min-h-[22rem] overflow-hidden',
            places[index],
            index === 0 || index === 3 || service.slug === 'urgent-care' ? 'lg:grid-cols-2' : '',
            service.slug === 'urgent-care' ? 'bg-navy' : index % 2 === 0 ? 'bg-white' : 'bg-pale-blue',
          ]"
        >
          <figure class="relative min-h-52" :class="index === 1 || index === 3 ? 'lg:order-2' : ''">
            <UiPhoto
              :src="service.image"
              :alt="service.imageAlt"
              width="1400"
              height="1600"
              sizes="100vw lg:36vw"
              loading="lazy"
              class="zoom-photo absolute inset-0 h-full w-full object-cover"
              :class="index === 0 ? 'wellness-photo' : ''"
            />
          </figure>
          <div class="flex flex-col justify-end gap-3 p-6 md:p-7" :class="service.slug === 'urgent-care' ? 'text-ivory' : ''">
            <p class="text-[0.72rem] font-semibold tracking-[0.16em] uppercase" :class="service.slug === 'urgent-care' ? 'text-pale-blue' : 'text-medical'">
              0{{ index + 1 }}
            </p>
            <h2 :class="service.slug === 'urgent-care' ? 'text-ivory' : 'text-forest'">
              <NuxtLink :to="servicePath(service)" class="no-underline">{{ service.name }}</NuxtLink>
            </h2>
            <p :class="service.slug === 'urgent-care' ? 'text-pale-blue' : 'text-muted'">{{ service.summary }}</p>
            <ul class="mt-1 grid gap-1 pl-4 text-sm" :class="service.slug === 'urgent-care' ? 'text-ivory' : 'text-muted'">
              <li v-for="point in service.points.slice(0, 2)" :key="point">{{ point }}</li>
            </ul>
            <p class="mt-3">
              <NuxtLink
                v-if="service.requestReason"
                class="font-semibold no-underline"
                :class="service.slug === 'urgent-care' ? 'text-ivory' : 'text-forest'"
                :to="{ path: routes.contact, query: { reason: service.requestReason } }"
              >
                Request this visit
              </NuxtLink>
              <a v-else class="font-semibold text-ivory no-underline" :href="phoneHref">
                Call {{ practice.phoneDisplay }}
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: var(--step-4);
}

h2 {
  font-size: var(--step-2);
}

h2 a {
  color: inherit;
}

.wellness-photo {
  clip-path: url(#service-wellness-mask);
  object-position: 70% 68%;
}

@media (max-width: 1023px) {
  .wellness-photo {
    clip-path: none;
  }
}
</style>
