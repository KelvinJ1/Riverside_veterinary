<script setup lang="ts">
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'

const route = useRoute()
const open = ref(false)

watch(() => route.path, () => {
  open.value = false
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="site-header">
    <UiContainer>
      <div class="bar">
        <NuxtLink :to="routes.home" class="wordmark">
          <span class="name">Riverside</span>
          <span class="meta">Veterinary Hospital</span>
        </NuxtLink>

        <div class="actions">
          <a class="phone" :href="phoneHref">{{ practice.phoneDisplay }}</a>
          <span class="request">
            <UiButton :to="routes.contact">Request a visit</UiButton>
          </span>
          <button
            type="button"
            class="menu"
            :aria-expanded="open"
            aria-controls="site-navigation"
            @click="open = !open"
          >
            {{ open ? 'Close' : 'Menu' }}
          </button>
        </div>

        <div class="nav-slot">
          <LayoutSiteNav :open="open" />
          <div v-show="open" class="mobile-actions">
            <UiButton :to="routes.contact">Request a visit</UiButton>
            <a :href="phoneHref">{{ practice.phoneDisplay }}</a>
          </div>
        </div>
      </div>
    </UiContainer>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--color-ivory);
  border-bottom: 1px solid var(--color-line);
}

.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  padding-block: var(--header-pad);
}

.wordmark {
  display: grid;
  margin-right: auto;
  color: var(--color-ink);
  text-decoration: none;
}

.name {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-style: italic;
  font-weight: 560;
  letter-spacing: -0.03em;
  line-height: 1;
}

.meta {
  margin-top: 0.28rem;
  color: var(--color-ink-soft);
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.nav-slot {
  width: 100%;
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  padding: 1.15rem 0 1.1rem;
}

.mobile-actions a {
  font-weight: 650;
  text-decoration: none;
}

.phone {
  color: var(--color-ink);
  font-weight: 650;
  text-decoration: none;
}

.menu {
  border: 0;
  background: transparent;
  color: var(--color-ink);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}

@media (max-width: 1079px) {
  .phone,
  .request {
    display: none;
  }
}

@media (min-width: 1080px) {
  .menu,
  .mobile-actions {
    display: none;
  }

  .bar {
    flex-wrap: nowrap;
  }

  .wordmark {
    order: 1;
    margin-right: 1.5rem;
  }

  .nav-slot {
    order: 2;
    width: auto;
    margin-right: auto;
  }

  .actions {
    order: 3;
  }
}
</style>
