<script setup lang="ts">
import { clinicianName, getClinician, team } from '#shared/team'
import { routes } from '#shared/routes'
import { trail } from '#shared/seo'

const route = useRoute()
const member = getClinician(String(route.params.slug))

if (!member) {
  await navigateTo(routes.home, { redirectCode: 302, replace: true })
}

const others = team.filter(item => item.slug !== member.slug)
const crumbs = trail(
  { name: 'Team', to: routes.team },
  { name: clinicianName(member) },
)

usePageSeo({
  title: member.seoTitle,
  description: member.seoDescription,
  crumbs,
})

useSchemaOrg([
  {
    '@type': 'Person',
    name: clinicianName(member),
    jobTitle: member.role,
    description: member.seoDescription,
    worksFor: { '@id': '#identity' },
    image: member.portrait,
  },
])
</script>

<template>
  <article class="bg-ivory">
    <div class="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
      <figure class="relative min-h-[24rem] bg-beige lg:col-span-5 lg:min-h-[40rem]">
        <UiPhoto
          :src="member.portrait"
          :alt="member.portraitAlt"
          width="1000"
          height="1400"
          sizes="100vw lg:42vw"
          preload
          class="h-full w-full object-cover object-[center_20%]"
        />
      </figure>
      <div class="px-5 py-12 md:px-8 lg:col-span-6 lg:col-start-7 lg:px-4 lg:py-16">
        <UiBreadcrumb :items="crumbs" />
        <p class="mt-6 text-[0.72rem] font-semibold tracking-[0.18em] text-sage uppercase">{{ member.role }}</p>
        <h1 class="mt-4 max-w-[14ch] text-forest">{{ clinicianName(member) }}</h1>
        <p class="mt-4 max-w-lg text-lg leading-relaxed text-muted">{{ member.summary }}</p>
        <p class="mt-4 max-w-lg text-ink">{{ member.experience }}</p>
        <p class="mt-6 max-w-lg text-muted">{{ member.bio }}</p>
        <h2 class="mt-10 text-forest">Clinical focus</h2>
        <ul class="mt-4 grid gap-2 p-0 list-none">
          <li v-for="item in member.focus" :key="item" class="border-t border-line pt-2">{{ item }}</li>
        </ul>
      </div>
    </div>

    <aside v-if="others.length" class="border-t border-line" aria-label="Other veterinarians">
      <ul class="mx-auto flex w-full max-w-[96rem] flex-wrap gap-x-8 gap-y-3 px-5 py-8 md:px-8 lg:px-12 list-none">
        <li v-for="item in others" :key="item.slug">
          <NuxtLink :to="routes.clinician(item.slug)" class="font-semibold text-forest no-underline">
            {{ clinicianName(item) }}
          </NuxtLink>
        </li>
      </ul>
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
