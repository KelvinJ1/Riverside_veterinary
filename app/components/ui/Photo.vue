<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  src: string
  content?: boolean
}>(), {
  content: false,
})

const attrs = useAttrs()
const root = ref<HTMLElement | null>(null)
const waiting = ref(false)

const classNames = computed(() => String(attrs.class ?? '').split(/\s+/))
const covers = computed(() => classNames.value.includes('absolute'))
const fills = computed(() => covers.value || classNames.value.includes('h-full'))

function settle() {
  waiting.value = false
}

function watchImage() {
  const img = root.value?.querySelector('img')
  if (!img) return
  if (img.complete && img.naturalWidth > 0) {
    waiting.value = false
    return
  }
  waiting.value = true
}

onMounted(watchImage)

watch(() => props.src, async () => {
  waiting.value = true
  await nextTick()
  watchImage()
})
</script>

<template>
  <span ref="root" class="ui-photo" :class="{ covers, fills, content, waiting }">
    <span v-if="waiting" class="bone" aria-hidden="true" />
    <NuxtImg
      :src="src"
      v-bind="attrs"
      @load="settle"
      @error="settle"
    />
  </span>
</template>

<style scoped>
.ui-photo {
  display: block;
  position: relative;
  width: 100%;
}

.fills {
  height: 100%;
}

.covers {
  position: absolute;
  inset: 0;
  width: auto;
  height: auto;
}

.content {
  display: inline-block;
  width: auto;
  max-width: 100%;
}

.bone {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: var(--color-beige);
  background-image: linear-gradient(100deg, transparent 20%, rgb(246 243 234 / 0.85) 50%, transparent 80%);
  background-size: 220% 100%;
  background-position: 100% 0;
  animation: bone 1.35s ease-in-out infinite;
  pointer-events: none;
}

@keyframes bone {
  to {
    background-position: 0 0;
  }
}
</style>
