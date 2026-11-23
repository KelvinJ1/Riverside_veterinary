<script setup lang="ts">
import { practice } from '#shared/practice'
import { trail } from '#shared/seo'

usePageSeo({
  title: 'Privacy notice',
  description: `How ${practice.name} uses the name, phone, email, and pet details you send with a visit request.`,
  crumbs: trail({ name: 'Privacy' }),
})
</script>

<template>
  <article class="band">
    <UiContainer class="narrow">
      <UiBreadcrumb :items="trail({ name: 'Privacy' })" />
      <UiPageHeader
        eyebrow="Privacy"
        title="What the visit form keeps."
        lede="This is a plain-language notice for the request form on this site. It is not the records policy you sign in the building."
      />
      <div class="copy">
        <h2>What you send</h2>
        <p>
          The form collects your name, phone, email, your animal’s name, species, a short reason for the visit, a preferred time of day, and whether you have been here before.
        </p>
        <h2>Why</h2>
        <p>
          The hospital uses those details to return your call and prepare the visit. A validated request is delivered to the hospital’s intake endpoint. This site does not sell contact details and does not run advertising trackers.
        </p>
        <h2>What to leave for the phone</h2>
        <p>
          Do not put a full medical history in the form. Say enough for the team to prepare, then speak with the hospital directly.
        </p>
        <h2>Corrections</h2>
        <p>
          To correct or withdraw a request, call {{ practice.phoneDisplay }}.
        </p>
      </div>
    </UiContainer>
  </article>
</template>

<style scoped>
.narrow {
  max-width: 48rem;
}

.copy {
  display: grid;
  gap: 0.7rem;
  margin-top: 2rem;
}

.copy h2 {
  margin-top: 0.8rem;
  font-size: var(--step-1);
}

.copy p {
  color: var(--color-ink-soft);
  font-size: var(--step-1);
  line-height: 1.5;
}
</style>
