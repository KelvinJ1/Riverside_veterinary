<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'
import { trail } from '#shared/seo'

const signs = [
  'Trouble breathing, or gums that look blue, gray, or very pale',
  'Collapse, a seizure, or an animal who cannot stand',
  'Bleeding that you cannot stop with brief pressure',
  'A known toxin, or a strong chance they reached one',
  'A tight, bloated abdomen with restlessness, especially in a deep-chested dog',
  'Straining to urinate and producing little or nothing, especially a male cat',
  'Heat distress: heavy panting, weakness, or collapse after heat',
  'An eye that is suddenly painful, cloudy, or held shut',
]

usePageSeo({
  title: 'Emergency veterinary care in Chattanooga',
  description: `If your dog or cat is in distress in Chattanooga, call ${practice.name} at ${practice.phoneDisplay}. Do not send the visit form.`,
  crumbs: trail({ name: 'Urgent care' }),
})
</script>

<template>
  <article class="bg-navy text-ivory">
    <div class="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
      <div class="px-5 py-14 md:px-8 lg:col-span-7 lg:px-12 lg:py-20">
        <UiBreadcrumb tone="inverse" :items="trail({ name: 'Urgent care' })" />
        <p class="mt-8 text-[0.72rem] font-semibold tracking-[0.18em] text-pale-blue uppercase">Urgent</p>
        <h1 class="mt-4 max-w-[12ch]">Call now. Do not fill out the form.</h1>
        <p class="mt-5 max-w-lg text-lg leading-relaxed text-pale-blue">
          If you are unsure whether it can wait, call. This page is not a diagnosis, and Riverside is not open as a 24-hour emergency hospital.
        </p>
        <a class="mt-8 block font-display text-5xl leading-[1.04] tracking-[-0.03em] text-ivory no-underline md:text-6xl" :href="phoneHref">
          {{ practice.phoneDisplay }}
        </a>
        <p class="mt-4 max-w-md text-pale-blue">
          The team will say whether to come in during open hours, or which emergency hospital is the safer door.
        </p>
        <div class="mt-8">
          <UiButton variant="inverse" :to="routes.contact">This can wait for an appointment</UiButton>
        </div>
      </div>
      <figure class="relative min-h-[18rem] lg:col-span-5 lg:min-h-full">
        <UiPhoto
          src="/images/service-emergency.jpg"
          alt="A veterinarian listens to a tan dog on an exam table."
          width="1200"
          height="1600"
          sizes="100vw lg:42vw"
          class="h-full w-full object-cover object-[center_30%]"
        />
      </figure>
    </div>

    <div class="border-t border-white/15">
      <div class="mx-auto grid w-full max-w-[96rem] gap-8 px-5 py-12 md:px-8 lg:grid-cols-12 lg:px-12">
        <h2 class="text-ivory lg:col-span-4">Call for any of these</h2>
        <div class="lg:col-span-7 lg:col-start-6">
          <ul class="grid gap-3 p-0 list-none">
            <li v-for="sign in signs" :key="sign" class="border-t border-white/15 pt-3 text-pale-blue">{{ sign }}</li>
          </ul>
          <p class="mt-6 max-w-xl text-sm text-pale-blue">
            The list is not complete. On the way, keep the animal quiet, cool if they are overheated, and off food until the hospital says otherwise.
            Sunday is closed for scheduled visits. A phone call is still the way to ask what to do.
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
h1,
h2 {
  color: var(--color-ivory);
}

h2 {
  font-size: var(--step-2);
}

</style>
