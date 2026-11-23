<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'
</script>

<template>
  <div class="strip">
    <UiContainer class="strip-inner">
      <p>
        <span class="label">Urgent</span>
        If your animal is in distress, call. Do not use the form.
      </p>
      <p class="links">
        <a :href="phoneHref">{{ practice.phoneDisplay }}</a>
        <NuxtLink :to="routes.emergency">What to do now</NuxtLink>
      </p>
    </UiContainer>
  </div>
</template>

<style scoped>
.strip {
  background: var(--color-river-deep);
  color: var(--color-foam);
  font-size: var(--step--1);
}

.strip-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem 1.5rem;
  padding-block: 0.55rem;
}

p {
  margin: 0;
}

.label {
  margin-right: 0.55rem;
  color: var(--color-clay-soft);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
}

a {
  color: var(--color-foam);
  font-weight: 650;
  text-underline-offset: 0.18em;
}
</style>
