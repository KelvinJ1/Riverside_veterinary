<script setup lang="ts">
import { clinicianName, team } from '#shared/team'
import { routes } from '#shared/routes'
import { trail } from '#shared/seo'

usePageSeo({
  title: 'Veterinarians in Chattanooga',
  description: 'Veterinarians at Riverside Veterinary Hospital in Chattanooga, and the cases each of them takes.',
  crumbs: trail({ name: 'Team' }),
})

useSchemaOrg([
  {
    '@type': 'ItemList',
    name: 'Veterinarians',
    itemListElement: team.map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: clinicianName(member),
      url: routes.clinician(member.slug),
    })),
  },
])
</script>

<template>
  <section class="bg-ivory">
    <div class="mx-auto w-full max-w-[96rem] px-5 py-12 md:px-8 lg:px-12 lg:py-16">
      <UiBreadcrumb :items="trail({ name: 'Team' })" />
      <div class="mt-8 grid items-end gap-6 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">Team</p>
          <h1 class="mt-4 max-w-[14ch] text-forest">The people who will know the case.</h1>
        </div>
        <p class="max-w-sm text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
          A short roster, on purpose. You should be able to tell who examined your animal and who will see them next.
        </p>
      </div>

      <ol class="mt-12 grid list-none gap-y-12 p-0">
        <li
          v-for="(member, index) in team"
          :key="member.slug"
          class="grid items-center gap-6 border-t border-line pt-8 lg:grid-cols-12"
        >
          <figure class="overflow-hidden bg-beige lg:col-span-4" :class="index % 2 === 1 ? 'lg:col-start-9 lg:order-2' : ''">
            <UiPhoto
              :src="member.portrait"
              :alt="member.portraitAlt"
              width="900"
              height="1200"
              sizes="100vw lg:32vw"
              loading="lazy"
              class="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <div class="lg:col-span-6" :class="index % 2 === 1 ? 'lg:col-start-2' : 'lg:col-start-6'">
            <p class="text-[0.72rem] font-semibold tracking-[0.16em] text-sage uppercase">{{ member.role }}</p>
            <h2 class="mt-3 text-forest">
              <NuxtLink :to="routes.clinician(member.slug)" class="no-underline">{{ clinicianName(member) }}</NuxtLink>
            </h2>
            <p class="mt-3 max-w-md text-muted">{{ member.summary }}</p>
            <p class="mt-3 max-w-md text-ink">{{ member.experience }}</p>
            <p class="mt-4 text-sm text-ink">{{ member.focus.join(' · ') }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
  <UiVisitCta />
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
</style>
