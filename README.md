# Riverside Veterinary Hospital

A Nuxt 4 site for a companion-animal hospital in Chattanooga. The public record of the practice, the routes, and the page metadata meet in `shared/`, so a content edit does not require a layout edit.

The site is a static-first Vue application. There is no application database. The only server behavior is the visit-request endpoint, and it stays off until a webhook is configured.

## Run

```bash
npm install
npm run dev
```

The dev server is at `http://localhost:3000`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development with hot reload |
| `npm run build` | Production server build, including `POST /api/appointments` |
| `npm run generate` | Static output in `.output/public` |
| `npm run preview` | Serve the last build locally |

Copy `.env.example` to `.env` before a production build. Set `NUXT_SITE_URL` to the real origin so canonical URLs, Open Graph, and the sitemap use it.

`npm run generate` is enough for a host that only serves files. Use `npm run build` when the visit form must deliver requests. A static host will not run the Nitro route.

## Architecture

Nuxt 4, Vue 3 with the Composition API, TypeScript, and Tailwind CSS 4. Pages stay thin. Repeated interface pieces are components. Anything a person would edit as content lives in a typed module under `shared/`.

```
app/
  pages/          one URL, one document outline, one usePageSeo() call
  components/     layout, brand, home, contact, and reusable UI
  layouts/        skip link, urgent strip, header, main, footer
  assets/css/     tokens, base type, motion
  composables/    usePageSeo, useReveal
shared/           practice, services, team, FAQs, routes, navigation, form rules
server/api/       visit requests and extra sitemap URLs
public/images/    photographs
public/favicon.svg
```

| Layer | Path | What it owns |
| --- | --- | --- |
| Practice | `shared/practice.ts` | Name, phone, email, address, hours, whether new clients are accepted |
| Routes | `shared/routes.ts` | Every internal URL, including service and clinician paths |
| Navigation | `shared/navigation.ts` | Header and footer links, built from those routes |
| Services | `shared/services.ts` | Service pages, related links, list schema, sitemap, prerender |
| Team | `shared/team.ts` | Clinician pages, list schema, sitemap, prerender |
| New-client questions | `shared/faqs.ts` | The questions list and its FAQ schema |
| SEO trails | `shared/seo.ts` | Breadcrumb trails that start at Home |
| Visit request | `shared/appointment.ts` | Validation shared by the form and the server |
| Pages | `app/pages` | Composition only. Dynamic pages look up a slug and 404 when it is missing |
| Shell | `app/layouts/default.vue` | The frame around every page |
| Tokens | `app/assets/css/tokens.css` and `main.css` | Color, type, and space |

`#shared` is the import alias for `shared/`. A page never hard-codes a phone number or a service URL when the record already has it.

### How a page is assembled

`app/layouts/default.vue` wraps every route: skip link, urgent strip, sticky header, `<main>`, footer. Header, footer, hours, and the urgent phone link all read `shared/practice.ts` and `shared/navigation.ts`.

Each page calls `usePageSeo()` with a title, a description, and a breadcrumb trail. `@nuxtjs/seo` supplies the title template, canonical URL, Open Graph defaults, `lang`, `robots.txt`, and the sitemap. The practice itself is a `VeterinaryCare` identity in `nuxt.config.ts`, built from the same practice record, so the footer, the map link, and the schema stay in step.

Service pages add `Service` schema. Clinician pages add `Person`. The new-client page adds `FAQPage` from `newClientFaqs`. Extra sitemap URLs come from `server/api/__sitemap__/urls.ts`. Prerender routes in `nuxt.config.ts` are generated from `services` and `team`, so a new slug is crawled without a second list to maintain.

## Design

The brand is editorial healthcare: warm, specific, and quiet. Forest green is care and trust. Medical blue is clinical confidence, and it stays in small doses. Warm ivory is the page. Deep navy is reserved for high-contrast bands.

| Role | Token | Value |
| --- | --- | --- |
| Forest green | `--color-forest` | `#21483D` |
| Deep navy | `--color-navy` | `#172C35` |
| Medical blue | `--color-medical` | `#527FAE` |
| Pale blue | `--color-pale-blue` | `#DCE8F2` |
| Soft sage | `--color-sage-soft` | `#A8BBA8` |
| Sage ink | `--color-sage` | `#5C6D58` |
| Warm ivory | `--color-ivory` | `#F6F3EA` |
| Warm sand | `--color-sand` | `#D7AD72` |

Sage ink is for small labels and the hero disc. Soft sage is too light for text on ivory.

Fraunces is the display serif for headings. Figtree is the sans for body and interface. The homepage headline is the one exception: it is set in Poppins and is part of the locked hero. Do not restyle that hero. Its photograph, organic mask, sand curve, sage shapes, headline, and two calls to action stay as they are.

Supporting photographs elsewhere use the same language at a smaller scale: an organic clip, a sage shape, a sand curve, and a small disc. `UiSupportStill` is that pattern. Pass `roomy` when a section needs the still to fill its column, as the questions section does.

Motion is a short reveal as a section enters, and a gentle zoom on photographs. `app/assets/css/motion.css` and `useReveal` honor `prefers-reduced-motion`. There is no parallax.

Layout is a 12-column grid on large screens, with intentional asymmetry. The homepage is the locked hero, an asymmetric service bento, one full-bleed photograph, and a navy close. Services reuse the bento with different weights. About is an editorial split. Contact is a functional split of details and form. Sections are not wrapped in repeating rounded cards.

Photographs live in `public/images/` under descriptive names (`service-exam.jpg`, `team-elena.jpg`, `facility-waiting.jpg`). `@nuxt/image` serves them as AVIF or WebP at quality 80. The river mark and the organic masks are inline SVG in their components, because they are part of the layout rather than a swappable icon set. The favicon is `public/favicon.svg`.

## Editing the site

These are the changes that should not touch a component.

### Practice facts

Edit `shared/practice.ts`.

- Phone, email, and street. Street is blank until it is confirmed. Filling `address.street` updates the footer, the map link, and the schema together.
- Hours. `UiHoursList` and the opening-hours schema both read `practice.hours`.
- `acceptingNewClients`. The new-client introduction switches with this flag.

Phone and email are public content, so they live in the practice record. They are placeholders until the hospital confirms them. Do not invent a street, a price, or a certification in copy.

### A service

Add one object to the `services` array in `shared/services.ts`. The `Service` type is the contract: slug, name, SEO fields, summary, body, points, related slugs, image, and alt text.

That single object then appears in:

- the services index
- `/services/[slug]`, including related services
- the service links under the homepage hero
- `Service` schema, the sitemap, and the prerender list

Unknown slugs 404. Related services that do not exist are dropped.

The homepage bento in `app/components/home/ServiceBento.vue` is composed by hand so the six cards can have different sizes and photographic treatments. A new service does not appear there until a card is added. That is the one place a new service touches a component, and it is deliberate.

### A clinician

Add one object to `team` in `shared/team.ts`. The team index and `/team/[slug]` render the array. Portrait, biography, focus, and SEO fields travel with the record. Sitemap, prerender, and `Person` schema follow the slug. The current names are a sample roster and should be replaced with the hospital’s clinicians.

### A question on the new-client page

Append to `newClientFaqs` in `shared/faqs.ts`. The new-client page renders the array, and the FAQ schema is built from the same objects. No template change.

### A navigation label

Edit `primaryNav` in `shared/navigation.ts`. The footer spreads that list and adds urgent care and privacy. Point `to` at a helper in `shared/routes.ts` so a path is defined once.

### A photograph

Add the file to `public/images/` and reference it as `/images/your-file.jpg` from the content record or the component that crops it. Write an `alt` that describes the picture. Decorative crops that repeat a nearby description can use an empty alt only when the text already carries the meaning.

## Visit requests

The contact form and `POST /api/appointments` both call `parseAppointment` in `shared/appointment.ts`. Invalid fields return `422` with a map of errors. A filled company field is treated as a bot and is not delivered.

Delivery is a webhook. Nuxt maps `NUXT_APPOINTMENT_WEBHOOK_URL` to `runtimeConfig.appointmentWebhookUrl`.

- When the variable is empty, the API returns `{ ok: true, demo: true }` and nothing is sent. The form still shows its confirmation, so the screen is not a live booking until the webhook exists.
- When the webhook is set, the validated payload is posted there. The company field is stripped first. A failed delivery returns `502` and asks the visitor to call.
- Distress is a phone call. The form says so, and the urgent strip stays above the header.

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `NUXT_SITE_URL` | Before launch | Canonical origin. Falls back to `https://www.riversidevethospital.example` |
| `NUXT_APPOINTMENT_WEBHOOK_URL` | To deliver requests | Inbox or CRM endpoint. Empty means demonstration only |

No other secrets belong in the repo. Do not commit `.env`.

A share image can be placed at `public/og-image.png`. Dynamic Open Graph rendering is off until a renderer is installed (`ogImage: false` in `nuxt.config.ts`).

## Standards this codebase keeps

1. **Reusable components for repeated UI.** Buttons, breadcrumbs, hours, the visit close, and the supporting photograph are components under `app/components/ui`. The header, footer, urgent strip, and river mark are shared by the layout.
2. **Content separated from presentation.** Pages compose. `shared/` holds the records those pages render.
3. **Editable content in structured files.** Practice, services, team, FAQs, routes, and navigation are typed modules, not copy pasted through templates.
4. **Centralized tokens.** Color, type, and space are defined in `app/assets/css/tokens.css` and exposed to Tailwind in `main.css`. Components use those roles instead of one-off hex values.
5. **Consistent assets.** Photographs sit in `public/images/` with names that say what they are. The mark and the organic masks live beside the components that clip them. The favicon is `public/favicon.svg`.
6. **Descriptive names.** `getService`, `relatedServices`, `usePageSeo`, `parseAppointment`, `UiSupportStill`. Slugs match URLs.
7. **No duplicated code, and a short dependency list.** Routes, phone, hours, and validation each exist once. Dependencies are Nuxt, Vue, Tailwind, `@nuxtjs/seo`, `@nuxt/fonts`, and `@nuxt/image`.
8. **Setup, configuration, and deployment live in this file.** Scripts, environment variables, and the difference between `generate` and `build` are above.
9. **Environment variables for sensitive configuration.** The public site origin and the appointment webhook are env vars. Public practice facts stay in `shared/practice.ts`, where an editor can find them.
10. **New services, clinicians, and questions do not require a rewritten component.** Add a record to `shared/services.ts`, `shared/team.ts`, or `shared/faqs.ts`. Detail pages, lists, schema, and the sitemap follow. The homepage bento is the exception: it is a designed composition, so a new homepage card is an intentional layout edit.

## Before launch

- Replace the phone, email, and street in `shared/practice.ts`.
- Replace the sample clinicians in `shared/team.ts`.
- Set `NUXT_SITE_URL`.
- Add `public/og-image.png` if the host should share a designed image.
- Set `NUXT_APPOINTMENT_WEBHOOK_URL` when the form should deliver real requests.
- Read the confirmation state on the contact form again once delivery is live, so the sentence matches what the hospital actually does next.
