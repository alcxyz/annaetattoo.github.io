# Guide Creation Reference

---

## Strategy

### Why guides exist

The SEO assessment (2026-04-01) scored discoverability at **7/10**, with the primary gap identified as:

> "No content beyond service pages — no articles, no comparisons, no aftercare guides as standalone content. These are high-volume queries with clear purchase intent that currently go entirely to competitors."

Guides exist to capture that traffic. Someone searching "powder brows vs microblading" or "will PMU look harsh" is in active consideration — they are not just curious, they are on the path to booking. If they find the answer on a competitor's site, they book there. Guides intercept that intent and route it through annae.tattoo.

The secondary function of guides is objection removal. Many potential clients have a specific fear or uncertainty (result looks fake, doesn't suit active lifestyle, no time to heal). A guide that addresses that concern directly converts hesitation into a booking.

### What makes a good guide topic

A topic earns a guide if it meets at least two of these:

1. **People search for it** — enough query volume to be worth indexing
2. **The intent is pre-booking** — the reader is considering whether to book, not researching academic interest
3. **Anna has a genuine, differentiated answer** — not a generic answer that any PMU site could publish
4. **Competitors cover it poorly** — either thin, wrong, or not localized for Norwegian clients

Topics that fail criterion 2 (purely post-booking service, e.g. "how to wash your face today") belong on the care/aftercare page, not as standalone guides.

### Priority tiers

**Tier 1 — Build next**
High search volume + direct purchase intent + objection removal:
- How long does PMU last / when to refresh (longevity questions, targets repeat and prospective clients)

**Tier 2 — Build when Tier 1 is done**
Narrower audience but high conversion when found:
- PMU before your appointment: what to do and avoid (pre-care)
- PMU and oily skin (very common concern, currently addressed inside vs-microblading guide but could stand alone)
- First PMU session: what to expect (general pre-booking reassurance)

**Tier 3 — Consider later**
Lower volume or harder to rank:
- PMU for brides / special occasions
- PMU and skin conditions
- The consultation process explained

### Current guides (as of April 2026)

| Guide | Target intent |
|---|---|
| Powder brows healing | Post-consideration, pre/post-booking trust |
| Powder brows vs microblading | High-volume comparison, direct consideration |
| Avoiding harsh brows (tusj bryn) | Objection removal, fear of bad result |
| PMU for an active lifestyle | Audience match, "is this for me" |
| Lip blush healing | Post-consideration trust, targets `/permanent-lips` audience |
| PMU for mature skin | Objection removal, underserved audience, targets `/powder-brows` |

The comparison and objection-removal guides (tiers most likely to rank) were built first. The healing guides build trust for readers who found the site through other queries.

### What a guide is not

- A landing page for a service — those live at `/powder-brows`, `/permanent-lips`, etc.
- A FAQ dump — guides make a coherent argument, they are not just a list of questions
- Thin content — a guide needs to answer the question more completely than the competition. Short for the sake of short is not a goal.

---

## URL conventions

Guides live at `/guide/[slug]/` (EN) and `/no/guide/[slug]/` (NO).

**Slug rules:**
- English slugs: English words only, hyphenated. No Norwegian in EN URLs.
- Norwegian slugs: Norwegian words, hyphenated. Avoid special characters (å, ø, æ) — replace with a (å→a), o (ø→o), ae (æ→ae).
- Industry terms used as-is in both languages: `pmu`, `microblading`, `powder-brows`, `tusj-bryn`.
- Healing in Norwegian is `heling` (not `tilheling`) in the slug: `powder-brows-heling`.

**Examples:**
| EN | NO |
|---|---|
| `/guide/powder-brows-healing` | `/no/guide/powder-brows-heling` |
| `/guide/powder-brows-vs-microblading` | `/no/guide/powder-brows-vs-microblading` |
| `/guide/avoid-harsh-brows` | `/no/guide/tusj-bryn` |
| `/guide/pmu-active-lifestyle` | `/no/guide/pmu-aktiv-livsstil` |
| `/guide/lip-blush-healing` | `/no/guide/lip-blush-heling` |

Note: EN and NO slugs do not have to match literally — use the most natural term in each language.

---

## Terminology

These terms are used as-is in both English and Norwegian (industry standard, not translated):

- `powder brows` (not "pulver bryn")
- `microblading`
- `PMU`
- `ombre brows`
- `touch-up`

Norwegian-only terms used as concepts:

- `tusj bryn` — the "marker brow" look, harsh/unnatural PMU result. Used in Norwegian content and explained as "tusj bryn" in the English guide too.

---

## Page structure

Each guide follows this structure:

```
1. <head> — meta, og:*, canonical, hreflang, JSON-LD Article (+ FAQPage if applicable)
2. Header placeholder
3. <main>
   a. h1 — guide title
   b. Subtitle paragraph (text-zinc-400)
   c. Top CTA block
   d. 1–2 intro paragraphs
   e. [IMAGE PAIR — first break]
   f. Main content sections (h2 + prose/cards)
   g. [IMAGE PAIR — mid-content break, optional for long guides]
   h. FAQ section (if applicable)
   i. Bottom CTA block
   j. Related guides section
   k. Back to home link
4. Footer placeholder
5. main.js
6. Elfsight script (can be omitted on guides if no widget is used)
```

---

## Image placeholders

Use this pattern until real images are available. Images go at natural "breathing points" — after the intro and optionally after a long section.

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  <div class="bg-zinc-700 rounded-lg flex flex-col items-center justify-center p-8 aspect-video">
    <p class="text-zinc-400 text-sm text-center">Descriptive label for this image</p>
    <p class="text-zinc-500 text-xs text-center mt-1">/images/guides/filename.jpg</p>
  </div>
  <div class="bg-zinc-700 rounded-lg flex flex-col items-center justify-center p-8 aspect-video">
    <p class="text-zinc-400 text-sm text-center">Descriptive label for this image</p>
    <p class="text-zinc-500 text-xs text-center mt-1">/images/guides/filename.jpg</p>
  </div>
</div>
```

**Image file naming:** `/images/guides/[descriptive-name].jpg`

**Existing guide image slots:**

| File | Description |
|---|---|
| `healing-day1.jpg` | Powder brows immediately after — day 1 |
| `healing-healed.jpg` | Fully healed powder brows — week 6 |
| `healing-ghosting.jpg` | Ghosting phase week 2 |
| `healing-settled.jpg` | Week 4–6, color returning |
| `pb-result-natural.jpg` | Natural, low-saturation healed result |
| `microblading-blurred.jpg` | Aged microblading strokes blurred/merged |
| `harsh-brows-example.jpg` | Overly saturated / harsh PMU example |
| `natural-result-soft.jpg` | Soft, natural powder brows result |
| `active-lifestyle.jpg` | Active lifestyle / brows in use |
| `lip-healing-day1.jpg` | Lip blush immediately after — day 1, vivid color |
| `lip-healing-peeling.jpg` | Lip blush peeling phase days 4–7 |
| `lip-healing-color-return.jpg` | Lip blush weeks 2–4, color returning |
| `lip-healing-healed.jpg` | Fully healed lip blush — week 6 |
| `mature-skin-result.jpg` | Natural powder brows result on mature skin |
| `mature-skin-healing.jpg` | Warm, soft color on fair/mature skin — healed |

New guides should either reuse existing image slots where appropriate or add new entries to this table.

---

## CTA strategy for guides

Guides are **info pages**, not service pages. Do not add the Elfsight inline booking widget. Keep CTAs clean and purposeful.

### The rule

**One primary action per CTA block.** Never cluster multiple equal-weight buttons — it reads as spam and dilutes the conversion signal. The hierarchy is always:

1. **Booking** — the primary button (`contact-button` class)
2. **Cross-links** — secondary navigation as small `text-zinc-400` text links on the same line
3. **Contact** — always last among the secondary links, never elevated to a button

### Top CTA (after subtitle, before intro)

```html
<div class="flex flex-col items-center gap-3 mb-12">
  <a href="/booking" class="contact-button">Book Your Appointment</a>
  <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-zinc-400">
    <a href="/powder-brows" class="hover:text-zinc-200 transition-colors">About powder brows &rarr;</a>
    <a href="/contact" class="hover:text-zinc-200 transition-colors">Ask a question &rarr;</a>
  </div>
</div>
```

Adjust secondary links to match the guide topic.

### Bottom CTA

Use one of two patterns depending on the guide's primary audience:

**For guides where booking is the natural next step** (healing, technique, lifestyle):
```html
<div class="text-center mt-16">
  <h2 class="text-3xl font-bold text-zinc-50 mb-4">Ready to Book?</h2>
  <p class="text-zinc-300 max-w-2xl mx-auto mb-6">
    Studio in central Drammen, serving clients across Greater Oslo. By appointment only.
  </p>
  <a href="/booking" class="contact-button">Book Your Appointment</a>
  <p class="text-sm text-zinc-500 mt-6">
    Questions before you book? <a href="/contact" class="text-fuchsia-200 hover:underline">Write to Anna directly.</a>
  </p>
</div>
```

**For guides where sending photos first makes more sense** (correction, restoration, tusj bryn):
```html
<div class="text-center mt-16">
  <h2 class="text-3xl font-bold text-zinc-50 mb-4">Not Sure Where to Start?</h2>
  <p class="text-zinc-300 max-w-2xl mx-auto mb-6">
    Send a few photos and Anna will give you an honest assessment of what is possible.
  </p>
  <a href="/contact" class="contact-button">Send Photos for a Consultation</a>
  <p class="text-sm text-zinc-500 mt-4">
    Or <a href="/booking" class="text-fuchsia-200 hover:underline">book directly</a> if you already know what you want.
  </p>
</div>
```

### Related guides section

Always include a related section at the bottom using the label "Related guides:" (EN) or "Relaterte veiledninger:" (NO). Link to 3–4 other guides or related service pages. Guides where the topic is correction-adjacent ("tusj bryn") should also link to service pages (`/pmu-restoration`, `/tattoo-removal`).

```html
<div class="text-center mt-10 mb-4">
  <p class="text-zinc-400 mb-3">Related guides:</p>
  <div class="flex flex-wrap justify-center gap-3">
    <a href="/guide/..." class="contact-button">Guide Name</a>
    ...
  </div>
</div>
```

---

## hreflang setup

Every guide page must declare both language variants:

```html
<link rel="canonical" href="https://annae.tattoo/guide/[slug]" />
<link rel="alternate" hreflang="en" href="https://annae.tattoo/guide/[slug]" />
<link rel="alternate" hreflang="nb" href="https://annae.tattoo/no/guide/[slug-no]" />
<link rel="alternate" hreflang="x-default" href="https://annae.tattoo/guide/[slug]" />
```

The NO page must declare the inverse:
```html
<link rel="canonical" href="https://annae.tattoo/no/guide/[slug-no]" />
<link rel="alternate" hreflang="en" href="https://annae.tattoo/guide/[slug]" />
<link rel="alternate" hreflang="nb" href="https://annae.tattoo/no/guide/[slug-no]" />
<link rel="alternate" hreflang="x-default" href="https://annae.tattoo/guide/[slug]" />
```

---

## JSON-LD

All guide pages include an `Article` schema. Add `FAQPage` schema as well if the page includes a FAQ section (recommended).

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guide title here",
  "description": "One-sentence description.",
  "url": "https://annae.tattoo/guide/[slug]",
  "author": { "@id": "https://annae.tattoo/#business" },
  "publisher": { "@id": "https://annae.tattoo/#business" },
  "isPartOf": { "@id": "https://annae.tattoo/#business" }
}
```

---

## Icons

Use Font Awesome 6 free icons. **`fa-mouth` does not exist in the free tier** — it silently renders nothing. Use `fa-heart` for lip-related content. Verify any unfamiliar icon name against the FA6 free icon set before using it.

Common guide icons in use: `fa-calendar-days`, `fa-scale-balanced`, `fa-circle-xmark`, `fa-person-running`, `fa-heart` (lips).

---

## After creating a new guide

1. Add to `guide/index.html` (EN guide index) as a new card
2. Add to `no/guide/index.html` (NO guide index) as a new card
3. Add both pages to `sitemap.xml` with `<priority>0.6</priority>` and today's `<lastmod>`
4. Link to the new guide from at least one related existing guide's "Related guides" section
5. If the new guide covers a topic related to a service page, add a link from that service page to the guide
6. If the guide covers a service topic, also consider linking from `/services/` index if it adds useful context
