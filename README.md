# Meridian Research Studio — web frontend

Vite + React 19 + TypeScript + React Router 7. Plain CSS with design tokens (no UI framework, no animation library).

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, project builder, trust, services, process preview, explore grid, guides, FAQ |
| `/services` | Services index + comparison table |
| `/services/:slug` | Service detail (8) — facts, who it's for, approach, deliverables, FAQs, related |
| `/how-it-works` | Process timeline, what to prepare, typical timelines, technology, process FAQs |
| `/research-support` | Capabilities & research workspace, data analysis, manuscript review, disciplines |
| `/pricing` | Rate sheets, how estimates are calculated (live from config), pricing FAQs |
| `/resources` | Guides with category filter |
| `/resources/:slug` | Article (6) — table of contents, takeaways, related service, more guides |
| `/about` | Studio, principles, specialist selection, trust |
| `/academic-integrity` | What we do / don't do, policy in practice |
| `/faq` | All questions grouped by category (+ FAQPage JSON-LD) |
| `/start` | Project builder and what happens next |
| `/contact` | Contact form (topics incl. privacy requests, `?topic=privacy`), channels, shortcuts |
| `/privacy` | Privacy Policy (`src/data/legal.ts`) |
| `/terms` | Terms of Service (`src/data/legal.ts`) |
| `*` | 404 (noindex) |

Routes are defined in `src/app/router.tsx`; every page is code-split. URL helpers live in
`routes` (`src/data/site.ts`). `sitemap.xml` and `robots.txt` are generated at build time from
the route table and content data.

**Hosting:** this is a client-side routed SPA. Configure the host to serve `index.html` for
unknown paths (e.g. Netlify `/* /index.html 200`, Vercel rewrites, nginx `try_files $uri /index.html`).

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck (tsc -b) + production build
npm run lint      # oxlint
npm run preview   # serve the production build
```

## Structure

```
src/
  app/           router (route table), RootLayout (shared chrome), RouteError
  pages/         One component per route + shared editorial page styles (pages.css)
  components/
    page/        PageHero (breadcrumbs), Seo (per-route title/meta/canonical)
    home/        ProcessPreview, ExploreGrid
    layout/      Header, PromoBar, MobileMenu, Footer, SearchDialog, ContactModal, Logo
    hero/        Hero, HeroVisual, TrustBadges, ProjectBuilder, BuilderFields,
                 ProjectSummary, BriefModal (lazy), builderSteps
    trust/       TrustSection, Metrics, TestimonialCard
    services/    ServicesSection, ServiceCard
    process/     ProcessTimeline, ProcessStep
    research/    ResearchCapabilities, ResearchWorkspace, DataAnalysisPreview, DocumentPreview
    technology/  TechnologySection
    pricing/     PricingSection, PricingTabs, PricingCard
    resources/   ResourceSection, ResourceCard
    faq/         FAQSection, FAQItem
    about/       AboutSection
    cta/         FinalCTA
    ui/          Button, Icon, Modal (native <dialog>), Toast, Form controls,
                 QuantityControl, AnimatedNumber, primitives (Container, Badge,
                 SectionHeading, Reveal, Stars)
  context/       AppActions — startProject(preset), contact & search dialogs
  data/          All content & configuration (site, services, pricing, trust, faq, …)
  hooks/         useProjectEstimator, useScrolledPast, useMediaQuery, useReveal, useLazyMount
  services/      apiClient, projects (POST /api/projects etc.), emailHandoff
  seo/           structuredData — JSON-LD built from data files at build time
  styles/        tokens.css, base.css
  types/         project, pricing
  utils/         pricingCalculator, projectValidation, briefText, scroll, storage, cx, aria
```

## Pricing & estimates

- **All prices live in `src/data/pricing.ts`** (`estimatorConfig` + `pricingPlans`). Rate-sheet
  prices are derived from the estimator config, so the two can't drift apart.
- `calculateEstimate(input, config)` in `src/utils/pricingCalculator.ts` is pure and returns
  `basePrice`, `urgencyMultiplier`, `serviceMultiplier`, `academicLevelMultiplier`, `complexity`,
  `estimatedTotal`, `discount`, `finalTotal`, `isComplete`.
- To move pricing server-side, either fetch a config of the same `EstimatorConfig` shape, or swap
  the calculator for a `POST /api/estimates` call inside `useProjectEstimator` — components don't change.
- `isIndicative: true` shows "indicative estimate" copy everywhere; set it to `false` once rates are final.

## Backend integration

Set `VITE_API_BASE_URL` (see `.env.example`). With it set, forms POST to:

| Form | Endpoint | Payload type |
|---|---|---|
| Project brief | `POST /api/projects` | `ProjectBriefPayload` (`src/types/project.ts`, snake_case for Pydantic) |
| Contact | `POST /api/inquiries` | `{ name, email, message }` |
| Newsletter | `POST /api/newsletter/subscriptions` | `{ email }` |

Without it, nothing is faked: the brief modal produces a formatted brief to email or copy, and
contact/newsletter open the visitor's email client. The client estimate is sent for reference
only — the server must re-price.

`VITE_PORTAL_URL` turns "Sign In" into a link to the client dashboard.

## Content that must be replaced before launch

- `src/data/trust.ts` — metrics, rating and testimonials are **illustrative placeholders**. Replace
  them with verified, consented data, then set `isIllustrative: false` (removes the disclosure and
  "Sample" labels). No review structured data is emitted.
- `src/data/site.ts` — domain (`url`) and contact email/hours (sitemap/robots follow automatically).
- `src/data/hero.ts` — optional licensed hero photograph (`image`); when null, the composed
  manuscript scene renders instead.
- `src/data/legal.ts` — Privacy Policy and Terms are written to match how the site works today, but
  **must be reviewed by a lawyer** for your jurisdiction. Fill `site.legal` (registered address,
  governing law, privacy email) and update the documents when the API, payments or analytics go live.
- Add an Open Graph image (1200×630 PNG) and `og:image` meta in `index.html`.
# meridian
