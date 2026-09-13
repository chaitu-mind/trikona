# Trikona Infra — website

A 22-page Next.js site that exports to plain static HTML. No server, no database,
nothing that can go down. It deploys free on Cloudflare Pages, Netlify or GitHub
Pages, and costs nothing to run beyond the domain.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes ./out — that folder IS the website
```

---

## 1. Before this goes live

Open **`lib/site.ts`**. Everything marked TODO is a placeholder and must be
replaced before you show this to anyone.

| Field      | Currently                  | Replace with                        |
|------------|----------------------------|-------------------------------------|
| `phone`    | `+91 90000 00000`          | the real number                     |
| `whatsapp` | `919000000000`             | same number, digits only, 91 first  |
| `email`    | `hello@trikonainfra.com`   | the real address                    |
| `street`   | `Plot 00, Road No. 0…`     | the real office address             |
| `gst`      | `GSTIN — to be issued`     | the GSTIN once registered           |
| `geo`      | approximate co-ordinates   | the exact ones from Google Maps     |
| `url`      | `https://trikonainfra.com` | your domain, once bought            |

`geo` and `url` matter more than they look. Google uses the co-ordinates for
local ranking, and `url` is what every canonical tag and sitemap entry is built
from. A wrong `url` silently breaks the whole sitemap.

When all of it is real, set `revision: "B"` and `revNote: "Issued"`. That line
prints in the footer, so the site stops announcing itself as a draft.

---

## 2. Where the content lives

You never need to touch a component to change content.

| File               | Holds                                                  |
|--------------------|--------------------------------------------------------|
| `lib/site.ts`      | Name, contact, address, service area, the three founders |
| `lib/works.ts`     | The project record — one entry becomes one page        |
| `lib/content.ts`   | Services, the six stages, the specification table, FAQ  |
| `lib/nav.ts`       | What appears in the menu                                |

### Adding a real project

Copy an entry in `lib/works.ts` and change it. The `slug` becomes the URL, so
keep it lowercase with hyphens.

```ts
{
  slug: "banjara-hills-residence",   // → /works/banjara-hills-residence/
  ref: "W07",
  sample: false,                     // false removes the red PLACEHOLDER stamp
  name: "Banjara Hills residence",
  location: "Banjara Hills, Hyderabad",
  locality: "Banjara Hills",         // used in the page title and schema
  category: "Residential",
  type: "villa",                     // villa | apartment | retail | interior | site
  floors: 2, bays: 4,                // these two draw the elevation
  status: "Completed", year: "2026",
  area: "3,850 sq.ft", config: "G+1",
  scope: "Turnkey — design to handover",
  duration: "11 months",
  structure: "RCC framed, M25, isolated footings",
  note: "One paragraph a client would care about.",
  detail: ["Longer paragraphs.", "One per array entry."],
  photo: "/images/w07.jpg",          // or null
}
```

**`sample: true` is a safety catch.** A sample entry is marked `noindex`, is left
out of the structured data, and carries a visible PLACEHOLDER stamp. Google is
never told you completed work you have not done. Delete the six samples once you
have six real projects.

**Photographs.** Put them in `public/images/` and set `photo` to
`/images/filename.jpg`. Landscape, roughly 4:3, around 1600 px wide. Until a
photo exists the site draws an elevation from `floors` and `bays`, which is why
it looks finished with no photography at all.

---

## 3. The SEO, and why each piece is there

This is the part that decides whether anyone finds you. It is already built.

**22 indexable pages instead of one.** Every service and every project is its
own page with its own title, description and canonical URL. A single-page site
can rank for one phrase. This one has a page aimed at each thing a person
actually types, such as structural design or interior fit-out.

**Structured data**, in `lib/seo.tsx`. The site emits `GeneralContractor` — the
schema.org type Google maps to a builder — carrying your address, co-ordinates,
opening hours, service area, all three founders and all nine services. Project
pages emit `CreativeWork`, the process page emits `HowTo`, and the FAQ page
emits `FAQPage`, which is what makes Google expand your answers directly under a
search result.

**`sitemap.xml` and `robots.txt`** are generated at build time from the same data
as the pages, so they can never drift out of date.

**Static HTML.** Every page, including all the drawings, is fully rendered at
build time. A crawler gets the complete content without running JavaScript.

**Fonts are self-hosted** by `next/font`, so there is no third-party request and
no layout shift. Both are Core Web Vitals signals.

**Titles and descriptions** are written per page in each `page.tsx` via the
`metadata` export. Rewrite them as you learn what people actually search for.

### What only you can do

Technical SEO is finished. Local ranking now depends on things off the site:

1. **Google Business Profile** at `business.google.com`. Free, and the single
   biggest factor for local search. Use exactly the same name, address and phone
   number as `lib/site.ts` — Google checks them against each other.
2. **Real project pages.** Six real projects with photographs and locality names
   will outrank any amount of keyword tuning.
3. **Reviews** on the Business Profile, asked for at handover.
4. **Google Search Console** at `search.google.com/search-console`. Submit
   `https://trikonainfra.com/sitemap.xml` the day you go live.

A worthwhile next step, once you have real work in an area: a page per locality,
for example `/construction-in-kondapur/`. Do not build those until you have a
real project to put on each one, or they are thin pages and will be ignored.

---

## 4. Putting it online

```bash
npm run build      # produces ./out
```

**Cloudflare Pages** is the best fit, because the same account gives you the
domain at wholesale price and the hosting for nothing. Connect the repository,
set the build command to `npm run build` and the output directory to `out`.

**Netlify** works identically, and `app.netlify.com/drop` will take a drag and
drop of the `out` folder if you want it live in ten seconds.

**The domain.** `trikonainfra.com` was unregistered when this was built.
Cloudflare Registrar sells `.com` at cost, around $9.77 a year, with no first
year discount and no renewal markup. GoDaddy advertises a cheap first year and
then renews at roughly ₹2,500. Over five years Cloudflare is less than half.
Buy it before you print anything.

**Email.** Do not put a Gmail address on a company site. Once the domain is
yours, Zoho Mail gives you `name@trikonainfra.com` free for a few users.

---

## 5. Notes on how it is built

**The enquiry form has no backend.** It composes the enquiry and opens WhatsApp
or the visitor's mail app with every field filled in. That works on any static
host, cannot break, and puts enquiries where you will actually see them.

**The drawings are generated, not drawn.** Each project's elevation is computed
from its own `floors` and `bays` and rendered as SVG on the server. Change
`floors` from 2 to 4 and the building grows two storeys with the level tags
recalculated. Nothing is a stock image.

**Light and dark.** The site follows the visitor's device. The sun icon cycles
system, light, dark. Light reads as a drawing on paper, dark as a blueprint.

**Section letters A–H** are drawing grid references, listed in the footer title
block. It is how a real drawing sheet indexes itself.

---

## 6. On the name

`trikonainfra.com` was unregistered and did not resolve when this was built, and
no civil contractor trades as Trikona. Several unrelated Indian companies do use
the word: Trikona Technologies (Hyderabad, IT), Trikona Energy (Bengaluru),
Trikona Pharmaceuticals (Hyderabad), Trikona CONSkill Consulting (construction
training), and Trikona Capital, a real-estate fund that wound down after 2010.

None of them blocks you, but do two checks before printing anything:

- **Trademark, class 37** (building construction), free at
  `ipindiaonline.gov.in/tmrsearch/tmrsearchmain.htm`
- **Company name**, via the RUN service on `mca.gov.in`

If either comes back contested, `dridhainfra.com` is available and unused.
*Dridha* means firm or rigid, which carries the same structural idea.
