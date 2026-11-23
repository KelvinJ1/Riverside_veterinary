<script setup lang="ts">
const navigating = ref(false)
const nuxtApp = useNuxtApp()
let timer: ReturnType<typeof setTimeout> | undefined

function stop() {
  clearTimeout(timer)
  navigating.value = false
}

onMounted(() => {
  nuxtApp.hook('page:start', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      navigating.value = true
    }, 140)
  })
  nuxtApp.hook('page:finish', stop)
  nuxtApp.hook('page:loading:end', stop)
})

onScopeDispose(stop)
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <UiPageSkeleton v-if="navigating" />
    <div v-show="!navigating">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
