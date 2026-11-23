<script setup lang="ts">
import { newClientFaqs } from '#shared/faqs'
import { practice } from '#shared/practice'
import { routes } from '#shared/routes'
import { trail } from '#shared/seo'

usePageSeo({
  title: 'New veterinary clients in Chattanooga',
  description: 'What to bring, what a first visit includes, and how urgent changes are handled at Riverside Veterinary Hospital in Chattanooga.',
  crumbs: trail({ name: 'New clients' }),
})

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...newClientFaqs.map(item => defineQuestion({
    name: item.question,
    acceptedAnswer: item.answer,
  })),
])

const bring = [
  'Vaccine history and any records from another clinic',
  'Current medications, with the dose if you know it',
  'The food you feed, or a photograph of the label',
  'A leash or a carrier, and the questions you want answered',
]

const steps = [
  {
    title: 'Ask for the visit',
    body: 'Call, or send a request. The form does not hold a time. The hospital confirms by phone and leaves enough room for a first visit.',
  },
  {
    title: 'Bring what you have',
    body: 'Records, medications, and the food label are more useful than a complete file. Come with what you can find.',
  },
  {
    title: 'The visit itself',
    body: 'A conversation before handling, an exam before a recommendation, and an estimate before any non-urgent procedure.',
  },
  {
    title: 'Leave with the next step',
    body: 'You should be able to repeat the plan, including when to call if it slips. If the animal worsens before that day, call. Do not wait on the appointment.',
  },
]

const stills = {
  visit: {
    src: '/images/contact-consult.jpg',
    alt: 'A veterinarian and a client sit across a wood table with a tabby cat between them.',
    crop: 'object-[center_42%]',
    mask: 'pebble' as const,
    anchor: 'start' as const,
  },
  bring: {
    src: '/images/facility-waiting.jpg',
    alt: 'A wood bench and a potted plant in a quiet waiting room.',
    crop: 'object-[78%_48%]',
    mask: 'leaf' as const,
    anchor: 'end' as const,
  },
  questions: {
    src: '/images/about-family.jpg',
    alt: 'A woman and a child sit on the floor with a small dog and a gray cat.',
    crop: 'object-[center_46%]',
    mask: 'shore' as const,
    anchor: 'start' as const,
    roomy: true,
  },
}

const section = ref<HTMLElement | null>(null)
useReveal(section)
</script>

<template>
  <article ref="section">
    <header class="bg-ivory">
      <div class="mx-auto grid w-full max-w-[96rem] lg:min-h-[34rem] lg:grid-cols-12">
        <div class="flex items-end px-5 py-12 md:px-8 lg:col-span-5 lg:px-12 lg:py-16" data-reveal>
          <div>
            <UiBreadcrumb :items="trail({ name: 'New clients' })" />
            <p class="mt-6 text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">New clients</p>
            <h1 class="mt-4 max-w-[12ch] text-forest">The first visit is a full visit.</h1>
            <p class="mt-4 max-w-md text-lg leading-relaxed text-muted">
              {{ practice.acceptingNewClients
                ? 'Riverside is accepting new dogs and cats. Come with the records you have. Leave with a plan you can repeat.'
                : 'New clients are waitlisted. Call the hospital and we will tell you the next opening.' }}
            </p>
            <div class="mt-8">
              <UiButton :to="routes.contact">Request a first visit</UiButton>
            </div>
          </div>
        </div>
        <figure class="relative min-h-[20rem] lg:col-span-7">
          <UiPhoto
            src="/images/new-clients.jpg"
            alt="A person waits on a wood bench with a brown dog and a folder of records."
            width="1600"
            height="900"
            sizes="100vw lg:58vw"
            class="h-full w-full object-cover object-[center_45%]"
          />
        </figure>
      </div>
    </header>

    <section class="bg-paper" aria-labelledby="process-title">
      <div class="mx-auto grid w-full max-w-[96rem] gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:items-start lg:px-12 lg:py-24">
        <div class="lg:col-span-5">
          <div data-reveal>
            <h2 id="process-title" class="max-w-[12ch] text-forest">How a first visit happens</h2>
            <p class="mt-4 max-w-sm text-muted">The request starts the conversation. The hospital confirms the time.</p>
          </div>
          <UiSupportStill v-bind="stills.visit" />
        </div>
        <ol class="grid list-none gap-0 p-0 lg:col-span-6 lg:col-start-7">
          <li
            v-for="(item, index) in steps"
            :key="item.title"
            class="grid gap-3 border-t border-line py-6 md:grid-cols-[4rem_1fr]"
            data-reveal
          >
            <p class="font-display text-2xl tracking-[-0.03em] text-sage">0{{ index + 1 }}</p>
            <div>
              <h3>{{ item.title }}</h3>
              <p class="mt-2 text-muted">{{ item.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-ivory" aria-labelledby="bring-title">
      <div class="mx-auto grid w-full max-w-[96rem] gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:items-start lg:px-12 lg:py-24">
        <div class="lg:col-span-5">
          <div data-reveal>
            <h2 id="bring-title" class="max-w-[12ch] text-forest">Bring, and what to expect</h2>
            <p class="mt-4 max-w-sm text-muted">Come with what you can find. Leave able to repeat the plan.</p>
          </div>
          <UiSupportStill v-bind="stills.bring" />
        </div>
        <div class="grid gap-12 lg:col-span-6 lg:col-start-7">
          <div>
            <h3 class="label text-forest">Bring</h3>
            <ul class="mt-5 grid list-none gap-3 p-0">
              <li v-for="item in bring" :key="item" class="border-t border-line pt-3 text-muted">{{ item }}</li>
            </ul>
          </div>
          <div>
            <h3 class="label text-forest">Expect</h3>
            <ul class="mt-5 grid list-none gap-3 p-0">
              <li class="border-t border-line pt-3 text-muted">A conversation before handling, so we know what changed at home</li>
              <li class="border-t border-line pt-3 text-muted">An exam before a recommendation</li>
              <li class="border-t border-line pt-3 text-muted">An estimate before non-urgent procedures</li>
              <li class="border-t border-line pt-3 text-muted">A written next step, including when to call if the plan slips</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-paper" aria-labelledby="faq-title">
      <div class="mx-auto grid w-full max-w-[96rem] gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:items-start lg:px-12 lg:py-24">
        <div class="lg:col-span-5">
          <div data-reveal>
            <h2 id="faq-title" class="max-w-[12ch] text-forest">Questions we hear</h2>
            <p class="mt-4 max-w-sm text-muted">The ones that come up before the first appointment is even on the books.</p>
          </div>
          <UiSupportStill v-bind="stills.questions" />
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <div v-for="item in newClientFaqs" :key="item.question" class="border-t border-line py-5">
            <h3>{{ item.question }}</h3>
            <p class="mt-2 max-w-xl text-muted">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>
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

.label {
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 560;
  letter-spacing: -0.03em;
}
</style>
