<script setup lang="ts">
import { primaryNav } from '#shared/navigation'

defineProps<{
  open: boolean
}>()

const route = useRoute()

function current(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <nav id="site-navigation" :class="{ open }" aria-label="Primary">
    <NuxtLink
      v-for="item in primaryNav"
      :key="item.to"
      :to="item.to"
      :aria-current="current(item.to) ? 'page' : undefined"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
nav {
  display: none;
  gap: 0.35rem 1.15rem;
}

nav.open {
  display: grid;
  gap: 0.25rem;
  width: 100%;
  padding: 0.4rem 0 0.8rem;
}

a {
  padding: 0.45rem 0;
  color: var(--color-ink-soft);
  font-weight: 550;
  text-decoration: none;
}

a[aria-current='page'] {
  color: var(--color-ink);
  text-decoration: underline;
  text-decoration-color: var(--color-clay);
  text-underline-offset: 0.28em;
}

@media (min-width: 1080px) {
  nav,
  nav.open {
    display: flex;
    align-items: center;
    width: auto;
    padding: 0;
  }
}
</style>
