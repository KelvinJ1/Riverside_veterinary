<template>
  <div class="skeleton" role="status" aria-live="polite">
    <p class="visually-hidden">Loading the page</p>
    <div class="mx-auto grid w-full max-w-[96rem] gap-10 px-5 py-12 md:px-8 lg:grid-cols-12 lg:px-12 lg:py-16">
      <div class="grid content-end gap-4 lg:col-span-5">
        <span class="bone kicker" />
        <span class="bone title" />
        <span class="bone line" />
        <span class="bone line short" />
      </div>
      <span class="bone media lg:col-span-7" />
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background: var(--color-ivory);
}

.bone {
  display: block;
  background-color: var(--color-beige);
  background-image: linear-gradient(100deg, transparent 20%, rgb(246 243 234 / 0.9) 50%, transparent 80%);
  background-size: 220% 100%;
  background-position: 100% 0;
  animation: bone 1.35s ease-in-out infinite;
}

.kicker {
  width: 7rem;
  height: 0.7rem;
}

.title {
  width: min(100%, 16rem);
  height: 3.4rem;
}

.line {
  width: min(100%, 22rem);
  height: 0.85rem;
}

.short {
  width: min(70%, 14rem);
}

.media {
  min-height: 16rem;
}

@keyframes bone {
  to {
    background-position: 0 0;
  }
}

@media (min-width: 64rem) {
  .media {
    min-height: 28rem;
  }
}
</style>
