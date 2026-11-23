<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'on-dark' | 'inverse'
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="['btn', variant]">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="['btn', variant]">
    <slot />
  </a>
  <button v-else :type="type" :class="['btn', variant]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.65rem 1.1rem;
  border: 1px solid transparent;
  border-radius: 2px;
  font: inherit;
  font-size: 0.98rem;
  font-weight: 650;
  line-height: 1;
  letter-spacing: -0.01em;
  text-decoration: none;
  cursor: pointer;
}

.btn:disabled {
  cursor: wait;
  opacity: 0.7;
}

.primary {
  background: var(--color-clay);
  color: #fffaf6;
}

.primary:hover {
  background: var(--color-clay-deep);
}

.secondary {
  background: transparent;
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.secondary:hover {
  background: rgba(23, 36, 33, 0.05);
}

.on-dark {
  background: transparent;
  border-color: rgba(244, 240, 231, 0.45);
  color: var(--color-foam);
}

.on-dark:hover {
  background: rgba(244, 240, 231, 0.08);
}

.inverse {
  background: var(--color-ivory);
  color: var(--color-forest);
}

.inverse:hover {
  background: #fffdf8;
}
</style>
