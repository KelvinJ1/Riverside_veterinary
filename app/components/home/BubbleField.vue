<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'field' | 'corner'
}>(), {
  variant: 'field',
})
</script>

<template>
  <div class="bubble-field" :class="variant" aria-hidden="true">
    <span class="bubble bubble-1" />
    <span class="bubble bubble-2" />
    <span class="bubble bubble-3" />
    <span class="bubble bubble-4" />
    <span class="bubble bubble-5" />
    <span class="bubble bubble-6" />
  </div>
</template>

<style scoped>
.bubble-field {
  pointer-events: none;
}

.field,
.corner {
  display: none;
}

@media (min-width: 64rem) {
  .field {
    display: block;
    position: relative;
    flex: 1 1 auto;
    min-height: 16rem;
    margin-bottom: 2.5rem;
    overflow: hidden;
  }

  .corner {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 52%;
    height: 56%;
  }
}

.bubble {
  position: absolute;
  display: block;
  border-radius: 50%;
  animation: rvh-bubble var(--bubble-duration, 24s) ease-in-out infinite alternate;
  animation-delay: var(--bubble-delay, 0s);
}

.field .bubble {
  animation-name: rvh-cross;
  animation-direction: normal;
  animation-timing-function: ease-in-out;
}

.bubble-1 {
  background:
    radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.85), transparent 42%),
    color-mix(in srgb, var(--color-pale-blue) 62%, var(--color-medical));
}

.bubble-2 {
  background:
    radial-gradient(circle at 30% 26%, rgb(255 255 255 / 0.7), transparent 44%),
    var(--color-sage-soft);
}

.bubble-3 {
  background:
    radial-gradient(circle at 34% 30%, rgb(255 255 255 / 0.78), transparent 46%),
    var(--color-sand);
}

.bubble-4 {
  background: color-mix(in srgb, var(--color-pale-blue) 35%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--color-medical) 72%, white);
}

.bubble-5 {
  background:
    radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.55), transparent 40%),
    var(--color-medical);
}

.bubble-6 {
  background:
    radial-gradient(circle at 30% 28%, rgb(255 255 255 / 0.8), transparent 40%),
    color-mix(in srgb, var(--color-pale-blue) 70%, var(--color-medical));
}

.field .bubble-1 {
  top: 4%;
  right: 2%;
  width: 8.5rem;
  height: 8.5rem;
  --bubble-duration: 22s;
  --bubble-delay: -3s;
  --x1: -13rem;
  --y1: 1.5rem;
  --x2: -5rem;
  --y2: 9rem;
  --x3: 1.5rem;
  --y3: 4.5rem;
}

.field .bubble-2 {
  top: 58%;
  left: 0;
  width: 6.25rem;
  height: 6.25rem;
  --bubble-duration: 19s;
  --bubble-delay: -11s;
  --x1: 11rem;
  --y1: -7rem;
  --x2: 7rem;
  --y2: -1rem;
  --x3: 2rem;
  --y3: -8.5rem;
}

.field .bubble-3 {
  bottom: 6%;
  left: 38%;
  width: 3.25rem;
  height: 3.25rem;
  --bubble-duration: 16s;
  --bubble-delay: -6s;
  --x1: -7rem;
  --y1: -8rem;
  --x2: 4.5rem;
  --y2: -3.5rem;
  --x3: -1.5rem;
  --y3: -9.5rem;
}

.field .bubble-4 {
  top: 0;
  left: 8%;
  width: 5rem;
  height: 5rem;
  --bubble-duration: 26s;
  --bubble-delay: -17s;
  --x1: 9rem;
  --y1: 7rem;
  --x2: 2rem;
  --y2: 11rem;
  --x3: -4rem;
  --y3: 4rem;
}

.field .bubble-5 {
  top: 22%;
  left: 46%;
  width: 1.7rem;
  height: 1.7rem;
  --bubble-duration: 13s;
  --bubble-delay: -4s;
  --x1: -8rem;
  --y1: 6rem;
  --x2: 6rem;
  --y2: 2rem;
  --x3: 3rem;
  --y3: -5rem;
}

.field .bubble-6 {
  top: 34%;
  right: 0;
  width: 7rem;
  height: 7rem;
  --bubble-duration: 24s;
  --bubble-delay: -9s;
  --x1: -12rem;
  --y1: -4rem;
  --x2: -6rem;
  --y2: 6rem;
  --x3: -14rem;
  --y3: 2rem;
}

.corner .bubble-1 {
  top: 8%;
  left: 8%;
  width: 7.5rem;
  height: 7.5rem;
  --bubble-duration: 30s;
  --bubble-delay: -4s;
  --bubble-x: 36px;
  --bubble-y: 22px;
}

.corner .bubble-2 {
  top: 4%;
  right: 6%;
  width: 4.25rem;
  height: 4.25rem;
  --bubble-duration: 22s;
  --bubble-delay: -11s;
  --bubble-x: -28px;
  --bubble-y: 24px;
}

.corner .bubble-3 {
  top: 58%;
  left: 42%;
  width: 2.25rem;
  height: 2.25rem;
  --bubble-duration: 18s;
  --bubble-delay: -3s;
  --bubble-x: 18px;
  --bubble-y: -20px;
}

.corner .bubble-4 {
  top: 46%;
  left: 4%;
  width: 5.5rem;
  height: 5.5rem;
  --bubble-duration: 34s;
  --bubble-delay: -16s;
  --bubble-x: 26px;
  --bubble-y: -18px;
}

.corner .bubble-5 {
  top: 22%;
  left: 46%;
  width: 1.15rem;
  height: 1.15rem;
  --bubble-duration: 16s;
  --bubble-delay: -7s;
  --bubble-x: -16px;
  --bubble-y: 18px;
}

.corner .bubble-6 {
  top: 38%;
  right: 2%;
  width: 3.25rem;
  height: 3.25rem;
  --bubble-duration: 26s;
  --bubble-delay: -9s;
  --bubble-x: -22px;
  --bubble-y: 20px;
}

@keyframes rvh-bubble {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(calc(var(--bubble-x, 24px) * 0.45), calc(var(--bubble-y, -20px) * -0.35), 0) scale(1.04);
  }

  100% {
    transform: translate3d(var(--bubble-x, 24px), var(--bubble-y, -20px), 0) scale(1.06);
  }
}

@keyframes rvh-cross {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  28% {
    transform: translate3d(var(--x1, -6rem), var(--y1, 3rem), 0) scale(1.08);
  }

  54% {
    transform: translate3d(var(--x2, 4rem), var(--y2, -4rem), 0) scale(0.94);
  }

  78% {
    transform: translate3d(var(--x3, -2rem), var(--y3, 5rem), 0) scale(1.05);
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble {
    animation: none;
  }
}
</style>
