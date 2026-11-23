<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'
import { services, servicePath } from '#shared/services'
</script>

<template>
  <section class="overflow-x-clip bg-ivory" aria-labelledby="home-title">
    <svg class="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <clipPath id="riverside-hero-mask" clipPathUnits="objectBoundingBox">
          <path d="M0 0.04 C0.02 0.01 0.18 0 0.46 0 C0.72 0 0.9 0.04 0.97 0.16 C1.05 0.32 0.84 0.4 0.94 0.56 C1.04 0.72 0.82 0.78 0.74 0.92 C0.66 1.02 0.28 0.98 0 0.94 Z" />
        </clipPath>
      </defs>
    </svg>

    <div class="relative mx-auto grid w-full max-w-[96rem] lg:min-h-[44rem] lg:grid-cols-12">
      <div class="relative min-h-[22rem] sm:min-h-[28rem] lg:col-span-7 lg:min-h-full">
        <svg
          class="pointer-events-none absolute -top-6 left-[-6%] h-[62%] w-[70%] text-sage-soft"
          viewBox="0 0 400 360"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M92 28c62-36 168-22 214 42 48 66 28 168-28 214-54 44-150 36-196-22C40 198 22 70 92 28Z"
          />
        </svg>

        <figure class="absolute inset-x-4 top-4 bottom-10 sm:inset-x-8 sm:top-8 lg:inset-x-10 lg:top-12 lg:bottom-12">
          <UiPhoto
            src="/images/home-dog.jpg"
            alt="A small black-and-tan dog looking calmly toward the camera."
            width="1800"
            height="1200"
            sizes="100vw lg:54vw"
            preload
            class="hero-photo h-full w-full object-cover object-[68%_42%]"
          />
        </figure>

        <svg
          class="pointer-events-none absolute bottom-0 left-[-4%] h-36 w-[108%] text-sand-accent sm:h-44 lg:h-48"
          viewBox="0 0 640 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M-20 118C70 28 150 150 280 96c110-46 190 36 300-8 28-12 58-8 80 6v96H-20Z"
          />
        </svg>
      </div>

      <div class="relative z-10 flex items-center px-5 py-10 sm:px-8 md:py-14 lg:col-span-5 lg:py-20 lg:pr-16 lg:pl-4">
        <svg
          class="corner pointer-events-none absolute -right-10 bottom-8 h-36 w-36 text-sage"
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          <circle cx="92" cy="92" r="68" fill="currentColor" />
        </svg>

        <div class="relative max-w-md">
          <p class="text-[0.72rem] font-semibold tracking-[0.16em] text-sage uppercase">
            {{ practice.address.city }}, {{ practice.address.regionName }}
          </p>
          <h1
            id="home-title"
            class="hero-title mt-4 text-balance text-forest"
          >
            Veterinary care, with time enough to explain it.
          </h1>
          <p class="mt-5 text-lg leading-relaxed text-muted">
            Riverside is a hospital for dogs and cats. Wellness, surgery, dentistry, diagnostics, and urgent visits. The plan is said out loud before it starts.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <UiButton class="min-h-12 px-5" :to="routes.contact">Request a visit</UiButton>
            <UiButton class="min-h-12 px-5" variant="secondary" :href="phoneHref">
              Call {{ practice.phoneDisplay }}
            </UiButton>
          </div>
          <p class="mt-4 text-sm text-muted">
            <NuxtLink class="underline decoration-line underline-offset-4" :to="routes.emergency">
              If this is an emergency, call. Do not use the form.
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <nav class="border-t border-line" aria-label="Services">
      <ul class="mx-auto flex w-full max-w-[96rem] gap-x-7 gap-y-2 overflow-x-auto px-5 py-4 text-sm sm:px-8 lg:px-12">
        <li v-for="service in services" :key="service.slug" class="shrink-0">
          <NuxtLink
            class="text-muted underline-offset-4 hover:text-forest hover:underline"
            :to="servicePath(service)"
          >
            {{ service.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
:deep(.hero-photo) {
  clip-path: url(#riverside-hero-mask);
}

.hero-title {
  font-family: Poppins, "Avenir Next", "Segoe UI", sans-serif;
  font-size: clamp(2.35rem, 1.1rem + 2.4vw, 3.85rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
}

.corner {
  display: none;
}

@media (min-width: 64rem) {
  .corner {
    display: block;
  }
}
</style>
