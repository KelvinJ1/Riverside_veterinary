<script setup lang="ts">
import { clinicianName, team } from '#shared/team'
import { routes } from '#shared/routes'
import { trail } from '#shared/seo'

usePageSeo({
  title: 'Our Chattanooga veterinary hospital',
  description: 'Riverside Veterinary Hospital is a Chattanooga practice for dogs and cats. Exams come before recommendations, and the record stays with the animal.',
  crumbs: trail({ name: 'About us' }),
})

const section = ref<HTMLElement | null>(null)
useReveal(section)
</script>

<template>
  <article ref="section">
    <section class="bg-ivory" aria-labelledby="about-title">
      <svg class="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id="about-portrait-mask" clipPathUnits="objectBoundingBox">
            <path d="M0.08 0.02 C0.02 0.18 0.12 0.4 0.02 0.66 C0 0.84 0.1 1 0.24 1 H1 V0.04 C0.72 0 0.4 0 0.08 0.02 Z" />
          </clipPath>
        </defs>
      </svg>
      <div class="mx-auto grid w-full max-w-[96rem] gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:px-12 lg:pt-20 lg:pb-8">
        <div class="flex flex-col lg:col-span-6" data-reveal>
          <UiBreadcrumb :items="trail({ name: 'About us' })" />
          <p class="mt-6 text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">About us</p>
          <h1 id="about-title" class="mt-4 max-w-[12ch] text-forest">
            Steady on purpose.
          </h1>
          <p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Riverside is a companion-animal hospital in Chattanooga. Dogs and cats. A record that follows them. Enough time to explain the fork in the road before we take it.
          </p>
          <HomeBubbleField class="mt-4" />
        </div>

        <figure class="relative min-h-[22rem] overflow-hidden lg:col-span-6 lg:min-h-[34rem]" data-reveal="image">
          <UiPhoto
            src="/images/about-clinic.jpg"
            alt="A veterinarian kneels beside a golden retriever in a quiet exam room."
            width="1600"
            height="900"
            sizes="100vw lg:48vw"
            class="about-photo h-full w-full object-cover object-[62%_40%]"
          />
        </figure>

        <div class="grid gap-8 border-t border-line pt-8 lg:col-span-5 lg:col-start-8 lg:border-0 lg:pt-0" data-reveal>
          <div>
            <h2 class="max-w-[14ch] text-forest">What we will not rush</h2>
            <p class="mt-3 text-muted">
              A first visit is a full visit. A non-urgent procedure waits for an estimate. A test is ordered because it changes the next decision, and the result is translated before you leave when the test allows it.
            </p>
          </div>
          <div>
            <h2 class="max-w-[14ch] text-forest">What we will say plainly</h2>
            <p class="mt-3 text-muted">
              If we are not the right room, we will tell you, and we will help you reach the one that is. Urgent animals are a phone call, not a form.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-ivory" aria-labelledby="rooms-title">
      <div class="mx-auto w-full max-w-[96rem] px-5 pt-4 pb-16 md:px-8 lg:px-12 lg:pt-6 lg:pb-24">
        <div class="grid items-end gap-6 lg:grid-cols-12" data-reveal>
          <div class="lg:col-span-6">
            <p class="text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">During a visit</p>
            <h2 id="rooms-title" class="mt-4 max-w-[14ch] text-forest">The work, with the animal present.</h2>
          </div>
          <p class="max-w-sm text-muted lg:col-span-4 lg:col-start-9">
            An exam, the teeth, the medicine, a procedure, imaging. The same record follows, whichever room it is.
          </p>
        </div>

        <div class="album mt-10">
          <figure class="room room-exam group">
            <div class="frame">
              <UiPhoto
                src="/images/visit-exam.jpg"
                alt="A veterinarian in green scrubs listens to a golden retriever’s chest with a stethoscope."
                width="1200"
                height="1600"
                sizes="100vw lg:55vw"
                loading="lazy"
                data-reveal="image"
                class="zoom-photo h-full w-full object-cover object-[center_30%]"
              />
            </div>
            <figcaption>
              <span class="kicker">Exam</span>
              <span class="title">Listening before the plan</span>
            </figcaption>
          </figure>

          <div class="stack">
            <figure class="room group">
              <div class="frame frame-waiting">
                <UiPhoto
                  src="/images/visit-dental.jpg"
                  alt="A veterinarian lifts a tan dog’s lip to look at the teeth."
                  width="1600"
                  height="1200"
                  sizes="100vw lg:34vw"
                  loading="lazy"
                  data-reveal="image"
                  class="zoom-photo h-full w-full object-cover"
                />
              </div>
              <figcaption>
                <span class="kicker">Dentistry</span>
                <span class="title title-quiet">Which teeth can stay</span>
              </figcaption>
            </figure>
            <figure class="room group">
              <div class="frame">
                <UiPhoto
                  src="/images/visit-pharmacy.jpg"
                  alt="A veterinarian offers a tablet to an orange tabby on the pharmacy counter."
                  width="1600"
                  height="1200"
                  sizes="100vw lg:34vw"
                  loading="lazy"
                  data-reveal="image"
                  class="zoom-photo h-full w-full object-cover"
                />
              </div>
              <figcaption>
                <span class="kicker">Pharmacy</span>
                <span class="title title-quiet">Medicine for this animal</span>
              </figcaption>
            </figure>
          </div>

          <figure class="room room-treatment group">
            <div class="frame frame-wide">
              <UiPhoto
                src="/images/visit-treatment.jpg"
                alt="Two clinicians attend a resting golden retriever on the treatment table."
                width="1600"
                height="900"
                sizes="100vw lg:55vw"
                loading="lazy"
                data-reveal="image"
                class="zoom-photo h-full w-full object-cover object-[center_45%]"
              />
            </div>
            <figcaption>
              <span class="kicker">Treatment</span>
              <span class="title">Quiet, before the procedure</span>
            </figcaption>
          </figure>

          <figure class="room room-imaging group">
            <div class="frame frame-imaging">
              <UiPhoto
                src="/images/visit-imaging.jpg"
                alt="A veterinarian holds an ultrasound probe to a grey cat’s belly."
                width="1200"
                height="1600"
                sizes="100vw lg:34vw"
                loading="lazy"
                data-reveal="image"
                class="zoom-photo h-full w-full object-cover object-[center_40%]"
              />
            </div>
            <figcaption>
              <span class="kicker">Imaging</span>
              <span class="title">A picture, then the next step</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="bg-paper" aria-labelledby="clinicians-title">
      <div class="mx-auto w-full max-w-[96rem] px-5 py-16 md:px-8 lg:px-12 lg:py-24">
        <div class="grid items-end gap-6 lg:grid-cols-12" data-reveal>
          <h2 id="clinicians-title" class="max-w-[14ch] text-forest lg:col-span-6">
            The people who will know the case.
          </h2>
          <p class="max-w-sm text-muted lg:col-span-4 lg:col-start-9">
            A short roster, on purpose. You should be able to tell who examined your animal.
          </p>
        </div>

        <ul class="mt-10 grid list-none gap-8 p-0 lg:grid-cols-12 lg:items-start">
          <li
            v-for="(member, index) in team"
            :key="member.slug"
            data-reveal
            :class="index === 0 ? 'lg:col-span-6' : 'lg:col-span-3 lg:mt-16'"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <NuxtLink :to="routes.clinician(member.slug)" class="group block text-inherit no-underline">
              <figure class="overflow-hidden bg-beige">
                <UiPhoto
                  :src="member.portrait"
                  :alt="member.portraitAlt"
                  width="900"
                  height="1200"
                  sizes="100vw lg:30vw"
                  loading="lazy"
                  class="zoom-photo aspect-[3/4] w-full object-cover"
                />
              </figure>
              <p class="mt-4 text-[0.72rem] font-semibold tracking-[0.16em] text-sage uppercase">{{ member.role }}</p>
              <h3 class="name mt-2 text-forest">
                {{ clinicianName(member) }}
              </h3>
              <p class="mt-2 max-w-sm text-muted">{{ member.summary }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-ivory" aria-labelledby="values-title">
      <div class="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
        <figure class="relative min-h-[20rem] lg:col-span-7 lg:min-h-[36rem]">
          <UiPhoto
            src="/images/about-family.jpg"
            alt="A parent and child sit with a small dog and a grey cat."
            width="1400"
            height="1050"
            sizes="100vw lg:58vw"
            loading="lazy"
            class="h-full w-full object-cover object-[center_40%]"
          />
        </figure>
        <div class="flex items-center px-5 py-14 md:px-8 lg:col-span-5 lg:px-12" data-reveal>
          <div>
            <p class="text-[0.72rem] font-semibold tracking-[0.18em] text-medical uppercase">How a visit feels</p>
            <h2 id="values-title" class="mt-4 max-w-[12ch] text-forest">
              The record stays with the animal.
            </h2>
            <ul class="mt-8 grid list-none gap-5 p-0">
              <li class="border-t border-line pt-4">
                <p class="font-display text-2xl tracking-[-0.03em] text-forest">Examine first</p>
                <p class="mt-2 text-muted">The recommendation follows the animal in the room, not a package.</p>
              </li>
              <li class="border-t border-line pt-4">
                <p class="font-display text-2xl tracking-[-0.03em] text-forest">Say the cost before</p>
                <p class="mt-2 text-muted">A non-urgent procedure waits until the estimate has been said out loud.</p>
              </li>
              <li class="border-t border-line pt-4">
                <p class="font-display text-2xl tracking-[-0.03em] text-forest">Name the next room</p>
                <p class="mt-2 text-muted">When a specialist is the better medicine, that is part of the plan.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </article>
  <UiVisitCta />
</template>

<style scoped>
:deep(.about-photo) {
  clip-path: url(#about-portrait-mask);
}

.album {
  display: grid;
  gap: 1.75rem;
}

.stack {
  display: grid;
  gap: 1.75rem;
}

.room {
  margin: 0;
}

.frame {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--color-paper);
}

.room figcaption {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.85rem;
}

.kicker {
  color: var(--color-sage);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.title {
  color: var(--color-forest);
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 1.2rem + 0.5vw, 1.85rem);
  font-weight: 560;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.title-quiet {
  font-size: clamp(1.2rem, 1.05rem + 0.3vw, 1.45rem);
}

@media (min-width: 64rem) {
  .album {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.9fr);
    gap: 1.75rem 1.5rem;
    align-items: start;
  }

  .room-exam .frame {
    aspect-ratio: 4 / 5;
  }

  .frame-waiting {
    aspect-ratio: 5 / 4;
  }

  .frame-wide {
    aspect-ratio: 16 / 9;
  }

  .frame-imaging {
    aspect-ratio: 4 / 5;
  }
}

h2 {
  font-size: var(--step-2);
}

.name {
  font-family: var(--font-body);
  font-size: var(--step-1);
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

@media (max-width: 1023px) {
  :deep(.about-photo) {
    clip-path: none;
  }
}
</style>
