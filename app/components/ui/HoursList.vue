<script setup lang="ts">
import { practice } from '#shared/practice'
import { formatClock } from '#shared/format'

withDefaults(defineProps<{
  tone?: 'default' | 'inverse'
}>(), {
  tone: 'default',
})
</script>

<template>
  <dl :class="['hours', tone]">
    <div v-for="entry in practice.hours" :key="entry.label">
      <dt>{{ entry.label }}</dt>
      <dd>
        <template v-if="entry.closed">Closed</template>
        <template v-else>{{ formatClock(entry.opens) }} – {{ formatClock(entry.closes) }}</template>
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.hours {
  display: grid;
  gap: 0.65rem;
  margin: 0;
}

.hours div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

dt {
  color: var(--color-ink-soft);
}

dd {
  margin: 0;
  font-weight: 650;
}

.inverse dt {
  color: rgba(244, 240, 231, 0.72);
}

.inverse dd {
  color: var(--color-foam);
}
</style>
