<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt: string
  crop?: string
  mask?: 'pebble' | 'leaf' | 'shore'
  anchor?: 'start' | 'end'
  roomy?: boolean
}>(), {
  crop: 'object-center',
  mask: 'pebble',
  anchor: 'start',
  roomy: false,
})

const masks = {
  pebble: 'M0.1 0.08 C0.02 0.22 0.12 0.4 0.04 0.62 C0 0.82 0.16 1 0.4 0.96 C0.66 0.92 0.86 0.78 0.94 0.56 C1.02 0.32 0.84 0.1 0.58 0.04 C0.36 0 0.2 0 0.1 0.08 Z',
  leaf: 'M0.18 0.02 C0.04 0.14 0.1 0.38 0.02 0.6 C0 0.84 0.16 1 0.4 0.98 C0.68 0.94 0.92 0.76 0.98 0.5 C1.04 0.22 0.78 0.02 0.48 0.02 C0.32 0.02 0.22 0.01 0.18 0.02 Z',
  shore: 'M0.04 0.18 C0 0.06 0.24 0 0.5 0.05 C0.76 0.1 1 0.02 1 0.2 C1 0.42 0.84 0.52 0.94 0.74 C1.02 0.94 0.72 1 0.44 0.96 C0.16 0.92 0.02 0.74 0.04 0.48 C0.06 0.3 0.06 0.26 0.04 0.18 Z',
}

const maskId = `still-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
</script>

<template>
  <div class="still" :class="[`anchor-${anchor}`, { roomy }]" data-reveal>
    <svg class="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <clipPath :id="maskId" clipPathUnits="objectBoundingBox">
          <path :d="masks[props.mask]" />
        </clipPath>
      </defs>
    </svg>

    <svg class="blob" viewBox="0 0 400 360" aria-hidden="true">
      <path
        fill="currentColor"
        d="M92 28c62-36 168-22 214 42 48 66 28 168-28 214-54 44-150 36-196-22C40 198 22 70 92 28Z"
      />
    </svg>

    <figure class="frame">
      <UiPhoto
        :src="src"
        :alt="alt"
        width="900"
        height="1100"
        :sizes="roomy ? '88vw lg:40vw' : '88vw lg:28vw'"
        loading="lazy"
        data-reveal="image"
        class="photo zoom-photo h-full w-full"
        :class="crop"
        :style="{ clipPath: `url(#${maskId})` }"
      />
    </figure>

    <svg class="shore" viewBox="0 0 320 80" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 52C48 8 96 68 160 36c52-26 96 22 160-8v52H0Z"
      />
    </svg>

    <svg class="disc" viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r="68" fill="currentColor" />
    </svg>
  </div>
</template>

<style scoped>
.still {
  position: relative;
  height: 16.5rem;
  max-width: 20rem;
  margin-top: 2rem;
}

.blob,
.shore,
.disc {
  position: absolute;
  pointer-events: none;
}

.blob {
  top: -0.65rem;
  width: 46%;
  height: 42%;
  color: var(--color-sage-soft);
  opacity: 0.85;
}

.anchor-start .blob {
  left: -12%;
}

.anchor-end .blob {
  right: -10%;
}

.frame {
  position: absolute;
  inset: 1.15rem 1.35rem 1.7rem 0.85rem;
  margin: 0;
  overflow: hidden;
}

:deep(.photo) {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.shore {
  bottom: 0;
  left: 2%;
  width: 78%;
  height: 2.75rem;
  color: var(--color-sand-accent);
  opacity: 0.9;
}

.anchor-end .shore {
  left: auto;
  right: 8%;
}

.disc {
  bottom: 0.35rem;
  width: 3.35rem;
  height: 3.35rem;
  color: var(--color-sage);
  opacity: 0.28;
}

.anchor-start .disc {
  right: 0;
}

.anchor-end .disc {
  left: 0;
}

.roomy {
  height: 22rem;
  max-width: none;
}

.roomy .shore {
  height: 3.5rem;
}

.roomy .disc {
  width: 4.75rem;
  height: 4.75rem;
}

@media (min-width: 64rem) {
  .still {
    height: 18.5rem;
    max-width: 22rem;
  }

  .roomy {
    height: 28rem;
    max-width: none;
  }
}
</style>
