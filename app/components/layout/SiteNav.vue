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
      <span class="label">{{ item.label }}</span>
      <span v-if="item.description" class="hint">{{ item.description }}</span>
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
  justify-items: center;
  width: 100%;
  padding: 0.35rem 0 0.15rem;
}

a {
  padding: 0.45rem 0;
  color: var(--color-ink-soft);
  font-weight: 550;
  text-align: center;
  text-decoration: none;
}

nav.open a {
  display: grid;
  justify-items: center;
  width: min(100%, 18rem);
  padding: 0.85rem 0.5rem;
  border-top: 1px solid var(--color-line);
}

nav.open a:last-child {
  border-bottom: 1px solid var(--color-line);
}

.label {
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 520;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.hint {
  margin-top: 0.2rem;
  color: var(--color-sage);
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

a[aria-current='page'] .label {
  text-decoration: underline;
  text-decoration-color: var(--color-forest);
  text-underline-offset: 0.22em;
}

@media (min-width: 1080px) {
  nav,
  nav.open {
    display: flex;
    align-items: center;
    width: auto;
    padding: 0;
  }

  nav a,
  nav.open a {
    display: inline;
    width: auto;
    padding: 0.45rem 0;
    border: 0;
  }

  .label {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
  }

  .hint {
    display: none;
  }
}
</style>
