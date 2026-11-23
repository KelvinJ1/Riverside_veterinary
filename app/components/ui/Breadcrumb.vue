<script setup lang="ts">
import type { Crumb } from '#shared/seo'

withDefaults(defineProps<{
  items: Crumb[]
  tone?: 'default' | 'inverse'
}>(), {
  tone: 'default',
})
</script>

<template>
  <nav class="crumbs" :class="tone" aria-label="Breadcrumb">
    <ol>
      <li v-for="item in items" :key="item.name">
        <NuxtLink v-if="item.to" :to="item.to">{{ item.name }}</NuxtLink>
        <span v-else aria-current="page">{{ item.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs {
  margin-bottom: 1.25rem;
}

ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-ink-soft);
  font-size: var(--step--1);
}

li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

li:not(:last-child)::after {
  content: "/";
  color: var(--color-line);
}

a {
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

.inverse ol,
.inverse a,
.inverse li:not(:last-child)::after {
  color: var(--color-pale-blue);
}
</style>
