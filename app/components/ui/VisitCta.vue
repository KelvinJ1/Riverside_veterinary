<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'
</script>

<template>
  <section class="visit-cta" aria-labelledby="visit-cta-title">
    <UiContainer>
      <div class="inner">
        <div>
          <p class="kicker">Next step</p>
          <h2 id="visit-cta-title">Come in with a plan, or call if it should be today.</h2>
        </div>
        <div class="actions">
          <UiButton :to="routes.contact">Request a visit</UiButton>
          <UiButton variant="secondary" :href="phoneHref">Call {{ practice.phoneDisplay }}</UiButton>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<style scoped>
.visit-cta {
  padding-bottom: var(--space-8);
}

.inner {
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper);
}

h2 {
  max-width: 18ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

@media (min-width: 800px) {
  .inner {
    grid-template-columns: 1.4fr auto;
    align-items: end;
    padding: 2rem;
  }
}
</style>
