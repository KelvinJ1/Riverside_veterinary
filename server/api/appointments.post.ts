import { parseAppointment } from '#shared/appointment'

export default defineEventHandler(async (event) => {
  const parsed = parseAppointment(await readBody(event))

  if (!parsed.ok) {
    setResponseStatus(event, 422)
    return {
      ok: false as const,
      errors: parsed.errors,
      message: 'Some fields need another look.',
    }
  }

  if (parsed.value.company) {
    return { ok: true as const }
  }

  const webhook = useRuntimeConfig(event).appointmentWebhookUrl
  if (!webhook) {
    return { ok: true as const, demo: true as const }
  }

  const { company: _company, ...payload } = parsed.value

  try {
    await $fetch(webhook, {
      method: 'POST',
      body: payload,
    })
  }
  catch {
    setResponseStatus(event, 502)
    return {
      ok: false as const,
      message: 'We could not send the request. Please call the hospital.',
    }
  }

  return { ok: true as const }
})
