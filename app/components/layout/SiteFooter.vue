<script setup lang="ts">
import { addressLines, mapsHref, phoneHref, practice } from '#shared/practice'
import { footerNav } from '#shared/navigation'
import { routes } from '#shared/routes'

const year = new Date().getFullYear()
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <footer class="site-footer">
    <UiContainer>
      <div v-if="isHome" class="visit">
        <h2 id="visit-title">If it can wait, request a visit. If it cannot, call.</h2>
        <div class="visit-actions">
          <UiButton variant="inverse" :to="routes.contact">Request a visit</UiButton>
          <NuxtLink :to="routes.emergency">What should not wait</NuxtLink>
          <a class="phone" :href="phoneHref">{{ practice.phoneDisplay }}</a>
        </div>
      </div>

      <div class="grid">
        <div class="identity">
          <BrandRiverMark />
          <p class="name">{{ practice.name }}</p>
          <p class="place">{{ practice.address.city }}, {{ practice.address.regionName }}</p>
          <address>
            <span v-for="line in addressLines()" :key="line">{{ line }}</span>
            <a :href="phoneHref">{{ practice.phoneDisplay }}</a>
            <a :href="`mailto:${practice.email}`">{{ practice.email }}</a>
          </address>
          <a class="map" :href="mapsHref" target="_blank" rel="noopener noreferrer">Open in Maps</a>
        </div>

        <nav aria-label="Footer">
          <p class="label">On this site</p>
          <ul>
            <li v-for="item in footerNav" :key="item.to">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="label">Hours</p>
          <UiHoursList tone="inverse" />
          <p class="note">Sunday visits are not scheduled. Urgent calls are still answered by phone.</p>
        </div>
      </div>

      <div class="legal">
        <p>© {{ year }} {{ practice.name }}. {{ practice.address.city }}, {{ practice.address.regionName }}.</p>
        <NuxtLink :to="routes.privacy">Privacy notice</NuxtLink>
      </div>
    </UiContainer>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-river-deep);
  color: var(--color-foam);
  padding-block: var(--space-8) var(--space-5);
}

.visit {
  display: grid;
  gap: 1.25rem;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid rgba(244, 240, 231, 0.16);
}

.visit h2 {
  max-width: 28ch;
  font-family: var(--font-body);
  font-size: var(--step-1);
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.visit-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.35rem;
}

.visit-actions a {
  font-weight: 650;
  text-decoration: none;
}

.phone {
  letter-spacing: -0.01em;
}

.grid {
  display: grid;
  gap: 2.5rem;
}

.name {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: var(--step-2);
  font-style: italic;
  font-weight: 560;
  letter-spacing: -0.03em;
  line-height: 1;
}

.place,
.note {
  color: rgba(244, 240, 231, 0.74);
}

.place {
  margin-top: 0.4rem;
}

address {
  display: grid;
  gap: 0.2rem;
  margin-top: 1rem;
  font-style: normal;
}

a {
  color: var(--color-foam);
  text-underline-offset: 0.18em;
}

.map {
  display: inline-block;
  margin-top: 0.9rem;
  font-weight: 650;
}

.label {
  margin: 0 0 0.85rem;
  color: var(--color-clay-soft);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

ul {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.note {
  max-width: 28rem;
  margin-top: 1rem;
  font-size: var(--step--1);
}

.legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.6rem 1.5rem;
  margin-top: var(--space-7);
  padding-top: 1.25rem;
  border-top: 1px solid rgba(244, 240, 231, 0.16);
  color: rgba(244, 240, 231, 0.7);
  font-size: var(--step--1);
}

@media (min-width: 860px) {
  .visit {
    grid-template-columns: minmax(0, 22rem) 1fr;
    align-items: end;
    gap: 2.5rem;
  }

  .visit-actions {
    justify-content: flex-end;
  }

  .grid {
    grid-template-columns: 1.3fr 0.8fr 1fr;
    align-items: start;
  }
}
</style>
