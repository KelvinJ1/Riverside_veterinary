<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lede?: string
}>()
</script>

<template>
  <header class="page-header">
    <p v-if="eyebrow" class="kicker">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p v-if="lede" class="lede">{{ lede }}</p>
  </header>
</template>

<style scoped>
.page-header {
  display: grid;
  gap: 1rem;
  max-width: 46rem;
}

h1 {
  max-width: 16ch;
}
</style>
