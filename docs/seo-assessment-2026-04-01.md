# SEO & Client Acquisition Assessment — 2026-04-01

## Summary

| Dimension | Score | Biggest Gap |
|---|---|---|
| SEO | 8/10 | Missing `AggregateRating` schema, corrupted robots.txt (fixed) |
| Discoverability | 6/10 | No content strategy beyond service pages |
| Client Acquisition | 7/10 | Missing actual images on service pages |

---

## SEO — 8/10

### Strengths
- Comprehensive structured data: `BeautySalon` schema with address, geo, opening hours, payment methods, offers catalog, `sameAs` social links
- Service pages have both `Service` and `FAQPage` schema
- hreflang properly implemented for EN/NB with `x-default`
- Canonical tags, OG/Twitter cards, sitemap with hreflang cross-references
- Keyword-rich titles and meta descriptions with location ("Drammen & Greater Oslo")
- robots.txt blocking redirect-only utility pages

### Issues
- **robots.txt was corrupted** — file contained a git diff patch instead of valid directives. Fixed 2026-04-01.
- **/contact missing from sitemap** — contact page existed but was absent from sitemap.xml. Fixed 2026-04-01.
- **No `AggregateRating` schema** — Google cannot show star ratings in search results without it on homepage or service pages
- **Booking page at priority 0.6** in sitemap — arguably underweighted for the primary conversion page

---

## Discoverability — 6/10

### Strengths
- Bilingual site (EN + NB) doubles surface area for Norwegian searches
- Dedicated service pages for each treatment = multiple ranking opportunities
- Service names in URLs are search-intent aligned (`/powder-brows`, `/permanent-lips`, etc.)
- Sitemap submitted and referenced in robots.txt

### Gaps
- **No content beyond service pages** — no blog, no aftercare articles, no "powder brows vs microblading" comparisons. These are high-volume queries with clear purchase intent.
- **No Google review aggregation** — the `hasMap` CID is present in schema, but no mechanism for review star counts in search snippets
- **Social referral pages** (`/fb`, `/ig`, `/msg`) correctly blocked from indexing but the site isn't optimized to capture handoff from Instagram discovery

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
| /contact and /no/contact missing from sitemap.xml | Fixed |

## Recommended Next Steps (Priority Order)

1. Add real photos to all service pages (highest conversion impact)
2. Add `AggregateRating` schema to homepage and service pages
3. Add `/contact` page — already fixed in sitemap, verify page has full content
4. Consider a simple content page (e.g. powder brows vs microblading) to capture comparison queries
5. Raise booking page sitemap priority to 0.8
