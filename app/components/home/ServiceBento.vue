<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'

const section = ref<HTMLElement | null>(null)
useReveal(section)

type Tone = 'pale' | 'ivory' | 'paper' | 'navy'
type Treatment = 'organic' | 'plate' | 'rect' | 'split'

type Card = {
  id: string
  name: string
  summary: string
  href: string
  image: string
  crop: string
  treatment: Treatment
  tone: Tone
  place: string
  delay: string
}

const cards: Card[] = [
  {
    id: 'wellness',
    name: 'Wellness exams',
    summary: 'A hands-on exam and a written plan for the year, with time left for your questions.',
    href: routes.service('wellness'),
    image: '/images/service-exam.jpg',
    crop: 'object-[center_18%]',
    treatment: 'organic',
    tone: 'pale',
    place: 'md:col-span-6 lg:col-span-7',
    delay: '0ms',
  },
  {
    id: 'surgery',
    name: 'Surgery',
    summary: 'The risks, the alternative, and the estimate, said before the day of the procedure.',
    href: routes.service('surgery'),
    image: '/images/service-or.jpg',
    crop: 'object-[center_42%]',
    treatment: 'plate',
    tone: 'ivory',
    place: 'md:col-span-6 lg:col-span-5',
    delay: '70ms',
  },
  {
    id: 'vaccinations',
    name: 'Vaccinations',
    summary: 'Vaccines chosen for this dog or cat, given with the wellness visit.',
    href: routes.service('wellness'),
    image: '/images/service-vaccines.jpg',
    crop: 'object-[center_60%]',
    treatment: 'rect',
    tone: 'pale',
    place: 'md:col-span-2 lg:col-span-4',
    delay: '180ms',
  },
  {
    id: 'dental',
    name: 'Dental care',
    summary: 'Cleaning below the gum line, and imaging when it changes which teeth can stay.',
    href: routes.service('dentistry'),
    image: '/images/service-dental.jpg',
    crop: 'object-[center_42%]',
    treatment: 'rect',
    tone: 'ivory',
    place: 'md:col-span-2 lg:col-span-4',
    delay: '240ms',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics',
    summary: 'Bloodwork, urinalysis, and imaging, explained before you leave when the test allows it.',
    href: routes.service('diagnostics'),
    image: '/images/service-diagnostics.jpg',
    crop: 'object-[center_36%]',
    treatment: 'rect',
    tone: 'paper',
    place: 'md:col-span-2 lg:col-span-4',
    delay: '280ms',
  },
  {
    id: 'emergency',
    name: 'Emergency care',
    summary: 'For an animal who should be seen today. Call during open hours.',
    href: routes.emergency,
    image: '/images/service-emergency.jpg',
    crop: 'object-[center_70%]',
    treatment: 'rect',
    tone: 'navy',
    place: 'md:col-span-6 lg:col-span-12',
    delay: '300ms',
  },
]

const toneClass: Record<Tone, string> = {
  pale: 'bg-pale-blue',
  ivory: 'bg-ivory',
  paper: 'bg-paper',
  navy: 'bg-navy',
}

</script>

<template>
  <section ref="section" class="bg-ivory" aria-labelledby="practice-title">
    <svg class="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <clipPath id="wellness-mask" clipPathUnits="objectBoundingBox">
          <path d="M0.2 0 C0.05 0.14 0.16 0.36 0.03 0.6 C0 0.8 0.12 1 0.28 1 H1 V0 Z" />
        </clipPath>
      </defs>
    </svg>

    <div class="mx-auto w-full max-w-[96rem] px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <div data-reveal class="grid items-end gap-6 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="text-[0.72rem] font-semibold tracking-[0.18em] text-forest uppercase">The practice</p>
          <h2 id="practice-title" class="mt-4 max-w-[12ch] font-display text-4xl leading-[1.04] tracking-[-0.03em] text-balance text-forest md:text-5xl">
            What we do under this roof.
          </h2>
        </div>
        <p class="max-w-sm text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
          Exams, vaccines, dental care, surgery, diagnostics, and same-day visits. One record follows the animal.
        </p>
      </div>

      <div class="bento mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
        <template v-for="card in cards" :key="card.id">
          <article
            v-if="card.id === 'emergency'"
            data-reveal
            :style="{ transitionDelay: card.delay }"
            :class="['on-navy group relative flex h-full min-h-[16rem] flex-col overflow-hidden bg-navy md:flex-row', card.place]"
          >
            <div class="relative h-48 shrink-0 md:h-auto md:w-[34%]">
              <UiPhoto
                :src="card.image"
                alt=""
                width="860"
                height="1880"
                sizes="100vw lg:32vw"
                loading="lazy"
                data-reveal="image"
                class="zoom-photo absolute inset-0 h-full w-full object-cover"
                :class="card.crop"
              />
            </div>
            <div class="flex flex-1 flex-col justify-center gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h3 class="card-title secondary-title">
                  <NuxtLink :to="card.href">{{ card.name }}</NuxtLink>
                </h3>
                <p class="summary summary-pale">{{ card.summary }}</p>
              </div>
              <UiButton class="shrink-0 self-start md:self-center" variant="inverse" :href="phoneHref">
                Call {{ practice.phoneDisplay }}
              </UiButton>
            </div>
          </article>

          <NuxtLink
            v-else
            :to="card.href"
            data-reveal
            :style="{ transitionDelay: card.delay }"
            :class="[
              'group relative flex h-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest',
              toneClass[card.tone],
              card.place,
              card.treatment === 'plate' ? 'min-h-[28rem] flex-col' : '',
              card.treatment === 'organic' ? 'min-h-[28rem] flex-col' : '',
              card.treatment === 'rect' ? 'min-h-[22rem] flex-col' : '',
              card.treatment === 'split' ? 'min-h-[24rem] flex-col lg:flex-row' : '',
            ]"
          >
            <HomeBubbleField
              v-if="card.treatment === 'organic'"
              variant="corner"
            />

            <div
              v-if="card.treatment === 'organic'"
              class="relative min-h-64 lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-[44%]"
            >
              <UiPhoto
                :src="card.image"
                alt=""
                width="667"
                height="1000"
                sizes="100vw lg:28vw"
                loading="lazy"
                data-reveal="image"
                class="mask-photo zoom-photo h-full w-full object-cover"
                :class="card.crop"
              />
            </div>

            <div
              v-else
              class="relative"
              :class="card.treatment === 'plate' ? 'min-h-[16rem] flex-1' : card.id === 'vaccinations' ? 'h-44 shrink-0' : 'h-52 shrink-0'"
            >
              <UiPhoto
                :src="card.image"
                alt=""
                width="1600"
                height="1200"
                sizes="100vw lg:24vw"
                loading="lazy"
                data-reveal="image"
                class="zoom-photo absolute inset-0 h-full w-full object-cover"
                :class="card.crop"
              />
            </div>

            <div
              class="relative z-10 flex flex-col gap-6 p-6 md:p-7"
              :class="card.treatment === 'organic' ? 'lg:mt-auto lg:w-[54%] lg:p-9' : ''"
            >
              <div>
                <h3 class="card-title" :class="card.treatment === 'organic' ? 'feature-title' : card.treatment === 'plate' ? 'secondary-title' : 'support-title'">
                  {{ card.name }}
                </h3>
                <p class="summary">{{ card.summary }}</p>
              </div>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  align-items: stretch;
}

.card-title {
  font-family: var(--font-body);
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-decoration: none;
}

.card-title a {
  color: inherit;
  text-decoration: none;
}

.group:hover .card-title,
.group:focus-visible .card-title,
.card-title a:hover,
.card-title a:focus-visible {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.14em;
  text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
}

.feature-title {
  font-size: clamp(1.45rem, 1.25rem + 0.45vw, 1.75rem);
  color: var(--color-forest);
}

.secondary-title,
.support-title {
  color: var(--color-forest);
}

.secondary-title {
  font-size: clamp(1.25rem, 1.15rem + 0.25vw, 1.45rem);
}

.support-title {
  font-size: 1.15rem;
}

.summary {
  max-width: 34ch;
  margin-top: 0.75rem;
  color: var(--color-ink-soft);
  line-height: 1.45;
}

.summary-pale {
  color: var(--color-pale-blue);
}

.on-navy {
  color: var(--color-ivory);
}

.on-navy .secondary-title,
.on-navy .card-title a {
  color: var(--color-ivory);
}

@media (min-width: 64rem) {
  :deep(.mask-photo) {
    clip-path: url(#wellness-mask);
  }
}

</style>
