<script setup lang="ts">
import { companionFor, visitReasons, type Species } from '#shared/appointment'
import { addressLines, mapsHref, phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'
import { trail } from '#shared/seo'

const route = useRoute()
const requested = typeof route.query.reason === 'string' ? route.query.reason : ''
const initialReason = visitReasons.some(item => item.id === requested) ? requested : ''

const companion = ref<{ species: Species | '', petName: string }>({
  species: '',
  petName: '',
})

const chosen = computed(() => companionFor(companion.value.species))

usePageSeo({
  title: 'Contact and hours',
  description: `Call ${practice.phoneDisplay} or request a visit at ${practice.name} in ${practice.address.city}, ${practice.address.regionName}.`,
  crumbs: trail({ name: 'Contact' }),
})
</script>

<template>
  <section class="bg-ivory">
    <div class="mx-auto flex w-full max-w-[96rem] flex-wrap items-end justify-between gap-6 px-5 py-10 md:px-8 lg:px-12 lg:pt-14">
      <div>
        <UiBreadcrumb :items="trail({ name: 'Contact' })" />
        <h1 class="mt-5 text-forest">Request a visit.</h1>
      </div>
      <div>
        <p class="text-[0.72rem] font-semibold tracking-[0.16em] text-medical uppercase">If this cannot wait</p>
        <a class="mt-1 block font-display text-3xl leading-none tracking-[-0.03em] text-forest no-underline" :href="phoneHref">
          {{ practice.phoneDisplay }}
        </a>
        <NuxtLink class="mt-2 inline-block text-sm" :to="routes.emergency">What should not wait</NuxtLink>
      </div>
    </div>

    <div class="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
      <div class="px-5 pb-12 md:px-8 lg:col-span-7 lg:px-12 lg:pb-16">
        <ContactAppointmentForm :initial-reason="initialReason" @companion="companion = $event" />
      </div>

      <aside class="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        <figure :key="chosen?.id ?? 'consult'" class="stage" :aria-live="chosen ? 'polite' : undefined">
          <div class="stage-frame">
            <UiPhoto
              :key="chosen?.id ?? 'consult'"
              :src="chosen?.image ?? '/images/contact-consult.jpg'"
              :alt="chosen?.alt ?? 'A veterinarian and a client sit with a tabby cat between them.'"
              width="1200"
              height="1200"
              sizes="42vw"
            />
          </div>
          <figcaption v-if="chosen">
            <span>{{ companion.petName || chosen.label }}</span>
            <small v-if="companion.petName">{{ chosen.label }}</small>
          </figcaption>
        </figure>

        <div class="grid gap-3 px-5 py-6 md:px-8">
          <address class="grid gap-1 not-italic">
            <span v-for="line in addressLines()" :key="line">{{ line }}</span>
            <a :href="phoneHref">{{ practice.phoneDisplay }}</a>
            <a :href="`mailto:${practice.email}`">{{ practice.email }}</a>
          </address>
          <a class="font-semibold" :href="mapsHref" target="_blank" rel="noopener noreferrer">Open in Maps</a>
          <h2 class="mt-3 text-forest">Hours</h2>
          <UiHoursList />
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: var(--step-3);
}

h2 {
  font-size: var(--step-2);
}

.stage {
  display: none;
}

.stage-frame {
  width: min(72%, 22rem);
  aspect-ratio: 1;
  margin: 1.75rem auto 0;
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-beige);
  box-shadow: 0 0 0 0.7rem var(--color-pale-blue);
}

.stage-frame :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}

figcaption {
  display: grid;
  gap: 0.15rem;
  padding: 0.9rem 1.25rem 0;
}

figcaption span {
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.4rem + 1.4vw, 2.8rem);
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--color-forest);
}

figcaption small {
  color: var(--color-ink-soft);
}

@media (min-width: 1024px) {
  .stage {
    display: block;
    animation: companion-in 640ms ease;
  }
}

@keyframes companion-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stage {
    animation: none;
  }
}
</style>
