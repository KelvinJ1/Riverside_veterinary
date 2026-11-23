<script setup lang="ts">
import { routes } from '#shared/routes'

await navigateTo(routes.home, { redirectCode: 302, replace: true })
</script>

<template>
  <span class="visually-hidden">Opening the homepage.</span>
</template>
