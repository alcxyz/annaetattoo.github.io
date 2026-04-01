# SEO & Client Acquisition Assessment — 2026-04-01

## Summary

| Dimension | Score | Biggest Gap |
|---|---|---|
| SEO | 9/10 | Booking page underweighted in sitemap |
| Discoverability | 7/10 | No content strategy beyond service pages |
| Client Acquisition | 7/10 | Missing actual images on service pages |

---

## SEO — 9/10

### Strengths
- Comprehensive structured data: `BeautySalon` schema with address, geo, opening hours, payment methods, offers catalog, `sameAs` social links
- Service pages have both `Service` and `FAQPage` schema
- hreflang properly implemented for EN/NB with `x-default`
- Canonical tags, OG/Twitter cards, sitemap with hreflang cross-references
- Keyword-rich titles and meta descriptions with location ("Drammen & Greater Oslo")
- robots.txt correctly blocking redirect-only utility pages — fixed 2026-04-01
- `/contact` and `/no/contact` present in sitemap — fixed 2026-04-01

### Remaining Issues
- **Booking page at priority 0.6** in sitemap — underweighted for the primary conversion page; 0.8 would be more appropriate
- **`AggregateRating` schema not applicable** — requires first-party reviews collected on the site itself. Google prohibits using third-party review data (GBP/Elfsight) for this; doing so risks a manual penalty. Stars in the Knowledge Panel and Maps come from GBP automatically. Not a gap to action unless a native review system is built.

---

## Discoverability — 7/10

### Strengths
- Bilingual site (EN + NB) doubles surface area for Norwegian searches
- Dedicated service pages for each treatment = multiple ranking opportunities
- Service names in URLs are search-intent aligned (`/powder-brows`, `/permanent-lips`, etc.)
- Sitemap submitted and referenced in robots.txt
- GBP reviews active and displayed on site — stars show in Maps and Knowledge Panel

### Gaps
- **No content beyond service pages** — no articles, no comparisons (e.g. powder brows vs microblading), no aftercare guides as standalone content. These are high-volume queries with clear purchase intent that currently go entirely to competitors.

---

## Client Acquisition — 7/10

### Strengths
- Multiple clear CTAs at every stage (Book Appointment, Book Now, Book Your Powder Brows Appointment)
- Inline booking widget via Elfsight on service pages — zero friction
- "Not Sure Yet?" section with 4 contact channels (WhatsApp, Messenger, Instagram, SMS)
- FAQ section addresses key objections: pain, longevity, healing, consultation
- Artist bio with credibility narrative and differentiator cards
- Pricing transparency via links to price page

### Weaknesses
- **Placeholder images on service pages** — `/powder-brows` has grey placeholder divs with file paths as text instead of actual photos. PMU clients need to see results before booking.
- **Homepage portfolio is third-party dependent** — Instagram feed and review widget are both Elfsight-rendered; slow load or failure leaves a blank gap
- **No testimonials/reviews visible without JavaScript** — crawlers and slow connections see nothing from the review section

---

## Fixes Applied This Session

| Issue | Status |
|---|---|
| robots.txt contained git diff instead of valid directives | Fixed |
| `/contact` and `/no/contact` missing from sitemap.xml | Fixed |

---

## Recommended Next Steps (Priority Order)

1. Add real photos to all service pages (highest conversion impact)
2. Raise booking page sitemap priority from 0.6 to 0.8
3. Consider a content page targeting a comparison query (e.g. powder brows vs microblading)
