<script setup lang="ts">
import type { NuxtError } from '#app'
import { routes } from '#shared/routes'

const props = defineProps<{ error: NuxtError }>()

const missing = computed(() => props.error.statusCode === 404)

if (missing.value) {
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event) sendRedirect(event, routes.home, 302)
  }
  else {
    await clearError({ redirect: routes.home })
  }
}

useSeoMeta({
  title: 'Something went wrong',
  robots: 'noindex, follow',
})
</script>

<template>
  <NuxtLayout v-if="!missing">
    <UiContainer class="error-page">
      <p class="kicker">{{ error.statusCode }}</p>
      <h1>Something went wrong.</h1>
      <p class="lede">
        Try the page again. If it keeps failing, call the hospital.
      </p>
      <div class="actions">
        <UiButton :to="routes.home">Back to the hospital</UiButton>
        <UiButton :to="routes.services" variant="secondary">View services</UiButton>
      </div>
    </UiContainer>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  padding-block: var(--space-9);
}

h1 {
  max-width: 12ch;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}
</style>
