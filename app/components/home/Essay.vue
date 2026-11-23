<script setup lang="ts">
import { routes } from '#shared/routes'

const section = ref<HTMLElement | null>(null)
useReveal(section)
</script>

<template>
  <section ref="section" class="overflow-x-clip bg-ivory" aria-labelledby="record-title">
    <div class="mx-auto grid w-full max-w-[92rem] lg:grid-cols-12">
      <figure class="overflow-hidden lg:col-span-7">
        <UiPhoto
          src="/images/home-cat.jpg"
          alt="An orange tabby standing and looking off to the side, against a warm yellow ground."
          width="1800"
          height="1800"
          sizes="100vw lg:55vw"
          loading="lazy"
          data-reveal="image"
          class="zoom-photo aspect-square w-full object-cover object-[center_30%] lg:aspect-[4/5] lg:min-h-[36rem]"
        />
      </figure>

      <div class="relative flex flex-col px-5 py-16 md:px-10 lg:col-span-5 lg:py-16 lg:pr-12 lg:pl-16">
        <HomeBubbleField />
        <div data-reveal class="relative">
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-medical">About us</p>
          <h2 id="record-title" class="mt-4 max-w-[12ch] font-display text-4xl leading-[1.04] tracking-[-0.03em] text-balance text-forest md:text-5xl">
            The record stays with the animal.
          </h2>
          <div class="mt-6 grid max-w-md gap-4 text-lg leading-relaxed text-muted">
            <p>
              Riverside is a Chattanooga hospital for the dogs and cats who live here with you. A first visit is a full visit. A hard afternoon uses the same record as the first vaccine.
            </p>
            <p>
              When we are not the right room, we say so, and we help you reach the one that is.
            </p>
          </div>
          <p class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-ink">
            <NuxtLink class="underline decoration-medical/50 underline-offset-[5px]" :to="routes.about">About us</NuxtLink>
            <NuxtLink class="underline decoration-medical/50 underline-offset-[5px]" :to="routes.team">The veterinarians</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

