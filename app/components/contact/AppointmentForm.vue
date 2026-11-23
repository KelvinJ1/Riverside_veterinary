<script setup lang="ts">
import {
  companionFor,
  companions,
  contactMethods,
  emptyAppointment,
  errorsForStep,
  formatVisitDate,
  parseAppointment,
  practiceToday,
  timingOptions,
  visitReasonLabel,
  visitReasons,
  type AppointmentInput,
  type AppointmentResponse,
  type FieldErrors,
  type Species,
  type VisitReason,
} from '#shared/appointment'
import { phoneHref, practice } from '#shared/practice'
import { routes } from '#shared/routes'

const props = defineProps<{
  initialReason?: string
}>()

const emit = defineEmits<{
  companion: [value: { species: Species | '', petName: string }]
}>()

const steps = ['Animal', 'Reason', 'You', 'Timing', 'Review'] as const
const form = reactive(emptyAppointment())
const errors = ref<FieldErrors>({})
const message = ref('')
const pending = ref(false)
const sent = ref(false)
const sentTitle = ref<HTMLElement | null>(null)

watch(sent, async (value) => {
  if (!value) return
  await nextTick()
  sentTitle.value?.focus()
})
const step = ref(1)
const stepTitle = ref<HTMLElement | null>(null)

if (visitReasons.some(item => item.id === props.initialReason)) {
  form.visitReason = props.initialReason as VisitReason
}

const chosen = computed(() => companionFor(form.species))

const stepHeading = computed(() => {
  if (step.value === 1) return 'Who is coming'
  if (step.value === 2) return 'The visit'
  if (step.value === 3) return 'How to reach you'
  if (step.value === 4) return 'When'
  return 'Review'
})

watch(
  () => [form.species, form.petName] as const,
  () => {
    emit('companion', { species: form.species, petName: form.petName })
  },
  { immediate: true },
)

function describedBy(key: keyof FieldErrors) {
  return errors.value[key] ? `${key}-error` : undefined
}

function invalid(key: keyof FieldErrors) {
  return Boolean(errors.value[key])
}

async function focusProblem() {
  await nextTick()
  document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

async function focusStep() {
  await nextTick()
  stepTitle.value?.focus()
}

async function nextStep() {
  if (step.value > 4) return
  const found = errorsForStep(form, step.value as 1 | 2 | 3 | 4)
  errors.value = found
  if (Object.keys(found).length) {
    await focusProblem()
    return
  }
  step.value += 1
  await focusStep()
}

async function goTo(target: number) {
  if (target >= step.value || target < 1) return
  errors.value = {}
  step.value = target
  await focusStep()
}

async function onSubmit() {
  if (step.value < 5) {
    await nextStep()
    return
  }
  message.value = ''
  const parsed = parseAppointment({ ...form })
  if (!parsed.ok) {
    errors.value = parsed.errors
    const order: (keyof FieldErrors)[] = [
      'visitReason', 'species', 'speciesDetail', 'petName',
      'guardianName', 'phone', 'email', 'contactMethod',
      'preferredDate', 'timing', 'notes',
    ]
    const first = order.find(key => parsed.errors[key])
    if (first === 'species' || first === 'speciesDetail' || first === 'petName') step.value = 1
    else if (first === 'visitReason') step.value = 2
    else if (first === 'guardianName' || first === 'phone' || first === 'email' || first === 'contactMethod') step.value = 3
    else step.value = 4
    await focusProblem()
    return
  }

  errors.value = {}
  pending.value = true
  try {
    const result = await $fetch<AppointmentResponse>('/api/appointments', {
      method: 'POST',
      body: parsed.value,
      ignoreResponseError: true,
    })
    if (!result.ok) {
      errors.value = result.errors ?? {}
      message.value = result.message || 'Some fields need another look.'
      return
    }
    sent.value = true
  }
  catch {
    message.value = 'We could not reach the hospital just now. Please call.'
  }
  finally {
    pending.value = false
  }
}

function selectSpecies(value: AppointmentInput['species']) {
  form.species = value
  form.speciesDetail = ''
  if (!errors.value.species) return
  const next = { ...errors.value }
  delete next.species
  errors.value = next
}
</script>

<template>
  <form v-if="!sent" class="request" novalidate @submit.prevent="onSubmit">
    <ol class="steps" aria-label="Request progress">
      <li v-for="(label, index) in steps" :key="label">
        <button
          type="button"
          :aria-current="step === index + 1 ? 'step' : undefined"
          :disabled="index + 1 > step"
          @click="goTo(index + 1)"
        >
          <span class="index">0{{ index + 1 }}</span>
          {{ label }}
        </button>
      </li>
    </ol>

    <p v-if="message" class="banner" role="alert">{{ message }}</p>

    <h2 id="step-heading" ref="stepTitle" tabindex="-1">{{ stepHeading }}</h2>

    <section v-if="step === 1" aria-labelledby="step-heading">
      <fieldset :aria-describedby="describedBy('species')">
        <legend class="visually-hidden">Who is coming</legend>
        <div class="species">
          <label
            v-for="animal in companions"
            :key="animal.id"
            class="pet"
            :class="{ selected: form.species === animal.id }"
          >
            <input
              class="visually-hidden"
              type="radio"
              name="species"
              :value="animal.id"
              :checked="form.species === animal.id"
              :aria-invalid="invalid('species')"
              @change="selectSpecies(animal.id)"
            >
            <UiPhoto
              :src="animal.image"
              :alt="animal.alt"
              width="640"
              height="640"
              sizes="40vw"
            />
            <span>{{ animal.label }}</span>
          </label>
        </div>
        <p v-if="errors.species" id="species-error" class="error">{{ errors.species }}</p>
      </fieldset>

      <figure v-if="chosen" class="popup" aria-live="polite">
        <UiPhoto
          content
          :key="chosen.id"
          :src="chosen.image"
          alt=""
          width="1024"
          height="1024"
          sizes="100vw"
        />
        <figcaption>
          <span>{{ form.petName || chosen.label }}</span>
          <small v-if="form.petName">{{ chosen.label }}</small>
        </figcaption>
      </figure>

      <p v-if="chosen && !chosen.seenHere" class="note">We’ll say on the call if this is the right room.</p>

      <div class="field">
        <label for="petName">Name</label>
        <input
          id="petName"
          v-model="form.petName"
          name="petName"
          maxlength="60"
          autocomplete="off"
          :aria-invalid="invalid('petName')"
          :aria-describedby="describedBy('petName')"
        >
        <p v-if="errors.petName" id="petName-error" class="error">{{ errors.petName }}</p>
      </div>
    </section>

    <section v-else-if="step === 2" aria-labelledby="step-heading">
      <fieldset :aria-describedby="describedBy('visitReason')">
        <legend class="visually-hidden">Reason for visit</legend>
        <div class="reasons">
          <label v-for="option in visitReasons" :key="option.id" class="reason">
            <input
              v-model="form.visitReason"
              type="radio"
              name="visitReason"
              :value="option.id"
              :aria-invalid="invalid('visitReason')"
            >
            {{ option.label }}
          </label>
        </div>
        <p v-if="errors.visitReason" id="visitReason-error" class="error">{{ errors.visitReason }}</p>
      </fieldset>
    </section>

    <section v-else-if="step === 3" aria-labelledby="step-heading">
      <div class="grid">
        <div class="field">
          <label for="guardianName">Your name</label>
          <input
            id="guardianName"
            v-model="form.guardianName"
            name="guardianName"
            maxlength="80"
            autocomplete="name"
            :aria-invalid="invalid('guardianName')"
            :aria-describedby="describedBy('guardianName')"
          >
          <p v-if="errors.guardianName" id="guardianName-error" class="error">{{ errors.guardianName }}</p>
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            name="phone"
            type="tel"
            maxlength="20"
            autocomplete="tel"
            inputmode="tel"
            :aria-invalid="invalid('phone')"
            :aria-describedby="describedBy('phone')"
          >
          <p v-if="errors.phone" id="phone-error" class="error">{{ errors.phone }}</p>
        </div>
        <div class="field span-2">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            maxlength="120"
            autocomplete="email"
            inputmode="email"
            :aria-invalid="invalid('email')"
            :aria-describedby="describedBy('email')"
          >
          <p v-if="errors.email" id="email-error" class="error">{{ errors.email }}</p>
        </div>
        <fieldset class="field span-2" :aria-describedby="describedBy('contactMethod')">
          <legend>Preferred contact</legend>
          <label v-for="option in contactMethods" :key="option" class="choice">
            <input
              v-model="form.contactMethod"
              type="radio"
              name="contactMethod"
              :value="option"
              :aria-invalid="invalid('contactMethod')"
            >
            {{ option }}
          </label>
          <p v-if="errors.contactMethod" id="contactMethod-error" class="error">{{ errors.contactMethod }}</p>
        </fieldset>
      </div>
    </section>

    <section v-else-if="step === 4" aria-labelledby="step-heading">
      <div class="grid">
        <div class="field">
          <label for="preferredDate">Preferred date</label>
          <input
            id="preferredDate"
            v-model="form.preferredDate"
            name="preferredDate"
            type="date"
            :min="practiceToday()"
            :aria-invalid="invalid('preferredDate')"
            :aria-describedby="describedBy('preferredDate')"
          >
          <p v-if="errors.preferredDate" id="preferredDate-error" class="error">{{ errors.preferredDate }}</p>
        </div>
        <fieldset class="field" :aria-describedby="describedBy('timing')">
          <legend>Preferred time</legend>
          <label v-for="option in timingOptions" :key="option" class="choice">
            <input
              v-model="form.timing"
              type="radio"
              name="timing"
              :value="option"
              :aria-invalid="invalid('timing')"
            >
            {{ option }}
          </label>
          <p v-if="errors.timing" id="timing-error" class="error">{{ errors.timing }}</p>
        </fieldset>
        <div class="field span-2">
          <label for="notes">Anything we should know</label>
          <textarea
            id="notes"
            v-model="form.notes"
            name="notes"
            maxlength="1000"
            rows="4"
            :aria-invalid="invalid('notes')"
            :aria-describedby="describedBy('notes')"
          />
          <p v-if="errors.notes" id="notes-error" class="error">{{ errors.notes }}</p>
        </div>
        <label class="check span-2">
          <input v-model="form.newClient" type="checkbox" name="newClient">
          We have not been to Riverside before
        </label>
      </div>
    </section>

    <section v-else aria-labelledby="step-heading">
      <dl class="summary">
        <div>
          <dt>Visit</dt>
          <dd>{{ visitReasonLabel(form.visitReason) }}</dd>
        </div>
        <div>
          <dt>Animal</dt>
          <dd>
            {{ form.petName }} · {{ form.species }}
          </dd>
        </div>
        <div>
          <dt>You</dt>
          <dd>{{ form.guardianName }} · {{ form.contactMethod }}</dd>
        </div>
        <div>
          <dt>Reach</dt>
          <dd>{{ form.phone }} · {{ form.email }}</dd>
        </div>
        <div>
          <dt>Preference</dt>
          <dd>{{ formatVisitDate(form.preferredDate) }}, {{ form.timing.toLowerCase() }}</dd>
        </div>
        <div v-if="form.notes">
          <dt>Note</dt>
          <dd>{{ form.notes }}</dd>
        </div>
        <div>
          <dt>Client</dt>
          <dd>{{ form.newClient ? 'New to Riverside' : 'Has been here before' }}</dd>
        </div>
      </dl>
    </section>

    <div class="hp" aria-hidden="true">
      <label>
        Company
        <input v-model="form.company" tabindex="-1" autocomplete="off" name="company">
      </label>
    </div>

    <div class="actions">
      <button v-if="step > 1" type="button" class="back" @click="goTo(step - 1)">Back</button>
      <UiButton v-if="step < 5" type="button" @click="nextStep">Continue</UiButton>
      <UiButton v-else type="submit" :disabled="pending">
        {{ pending ? 'Sending…' : 'Send the request' }}
      </UiButton>
    </div>
    <p v-if="pending" class="pending" role="status">
      <span class="visually-hidden">Sending the request</span>
      <span class="pending-bone" />
    </p>
    <p class="fine">
      For distress, call <a :href="phoneHref">{{ practice.phoneDisplay }}</a>.
      <NuxtLink :to="routes.privacy">Privacy</NuxtLink>
    </p>
  </form>

  <div v-else class="sent" role="status">
      <UiPhoto
        v-if="chosen"
        content
        class="sent-portrait"
      :src="chosen.image"
      alt=""
      width="480"
      height="480"
    />
    <h2 ref="sentTitle" tabindex="-1">Visit requested.</h2>
    <p>{{ form.petName }} is on the request. The hospital will call to confirm a time.</p>
  </div>
</template>

<style scoped>
.request,
.sent {
  display: grid;
  gap: 1.25rem;
}

.prototype,
.hint,
.fine {
  max-width: 38rem;
  margin: 0;
  color: var(--color-ink-soft);
  font-size: var(--step--1);
  line-height: 1.5;
}

.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.steps button {
  padding: 0;
  border: 0;
  background: none;
  color: var(--color-ink-soft);
  font: inherit;
  font-size: 0.82rem;
  cursor: pointer;
}

.steps button:disabled {
  cursor: default;
}

.steps button[aria-current='step'] {
  color: var(--color-forest);
  font-weight: 650;
}

.index {
  margin-right: 0.35rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

h2 {
  max-width: 16ch;
  margin-bottom: 0.8rem;
  font-size: var(--step-2);
}

h2:focus {
  outline: none;
}

.banner,
.error {
  margin: 0;
  color: var(--color-danger);
}

.banner {
  font-weight: 650;
}

fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}

.reasons {
  display: grid;
  gap: 0.45rem;
}

.reason,
.choice,
.check {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.reason {
  min-height: 2.75rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
  cursor: pointer;
}

.reason:has(input:checked) {
  border-color: var(--color-forest);
  background: var(--color-pale-blue);
}

.reason input,
.choice input,
.check input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--color-forest);
}

.species {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem 0.7rem;
}

.pet {
  display: grid;
  gap: 0.4rem;
  color: var(--color-forest);
  font-weight: 650;
  cursor: pointer;
}

.pet :deep(img) {
  aspect-ratio: 1;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--color-beige);
}

.pet:focus-within :deep(img),
.pet.selected :deep(img) {
  box-shadow: 0 0 0 2px var(--color-ivory), 0 0 0 4px var(--color-forest);
}

.popup {
  display: grid;
  gap: 0.65rem;
  margin-top: 1.25rem;
  animation: companion-in 560ms ease;
}

.popup :deep(img) {
  width: min(100%, 16rem);
  aspect-ratio: 1;
  justify-self: start;
  border-radius: 50%;
  object-fit: cover;
  background: var(--color-beige);
}

.popup figcaption {
  display: grid;
  gap: 0.1rem;
}

.popup span {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--color-forest);
}

.popup small,
.note {
  color: var(--color-ink-soft);
  font-size: var(--step--1);
}

.note {
  margin: 0.75rem 0 0;
}

.field,
.grid {
  display: grid;
  gap: 0.85rem;
}

.field {
  margin-top: 0.9rem;
}

label,
legend {
  font-weight: 650;
}

.choice,
.check {
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper);
  color: var(--color-ink);
  font: inherit;
}

.choice input,
.check input,
.reason input {
  width: 1rem;
  padding: 0;
}

textarea {
  resize: vertical;
}

input[aria-invalid='true'],
textarea[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.error {
  font-size: var(--step--1);
}

.summary {
  display: grid;
  gap: 0.85rem;
  margin: 0;
}

.summary div {
  display: grid;
  gap: 0.15rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-line);
}

dt {
  color: var(--color-sage);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

dd {
  margin: 0;
}

.hp {
  position: absolute;
  left: -9999px;
  height: 0;
  overflow: hidden;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.pending {
  margin: 0.85rem 0 0;
}

.pending-bone {
  display: block;
  width: min(100%, 16rem);
  height: 0.55rem;
  background-color: var(--color-beige);
  background-image: linear-gradient(100deg, transparent 20%, rgb(246 243 234 / 0.9) 50%, transparent 80%);
  background-size: 220% 100%;
  background-position: 100% 0;
  animation: bone 1.35s ease-in-out infinite;
}

@keyframes bone {
  to {
    background-position: 0 0;
  }
}

.back {
  min-height: 2.75rem;
  padding: 0.65rem 0.2rem;
  border: 0;
  background: none;
  color: var(--color-ink);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}

.sent h2 {
  max-width: 14ch;
}

.sent h2:focus {
  outline: none;
}

:deep(.sent-portrait) {
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  object-fit: cover;
  background: var(--color-beige);
}

@keyframes companion-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .popup {
    animation: none;
  }
}

@media (min-width: 720px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .span-2 {
    grid-column: 1 / -1;
  }

  .species {
    grid-template-columns: repeat(3, 1fr);
  }

  .reasons {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .popup {
    display: none;
  }
}
</style>
