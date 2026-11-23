<template>
  <div class="site">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="masthead">
      <LayoutEmergencyStrip />
      <LayoutSiteHeader />
    </div>
    <main id="main">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<style scoped>
.masthead {
  position: sticky;
  top: 0;
  z-index: 40;
}
</style>
