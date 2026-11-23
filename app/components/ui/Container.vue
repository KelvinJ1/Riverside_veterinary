<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

@media (min-width: 720px) {
  .container {
    width: min(100% - 4rem, 72rem);
  }
}
</style>
