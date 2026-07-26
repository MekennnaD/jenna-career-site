# Where this goes

A single-page SvelteKit site mapping career paths for one specific person — Jenna, a
liberal arts grad with four retail and warehouse jobs. It has exactly one reader, so
everything is written to her directly in second person.

The site answers three questions per path: **what does it pay**, **how hard is it to get
from exactly where she stands**, and **where did that number come from**.

Live at `https://<user>.github.io/jenna-career-site/`.

## Editing the content

All content lives in `src/lib/data/`. No component or markup changes are needed — the
page reads from these arrays.

| File         | What's in it                                        |
| ------------ | --------------------------------------------------- |
| `profile.ts` | Work history and interest tags                      |
| `careers.ts` | The nine career paths, pay, attainability, sources  |

Adding a career path means copying one object in `careers.ts` and changing the fields.
The types in `src/lib/types.ts` are enforced, so `npm run check` will name any field
that's missing.

### Difficulty vs. competition

These are separate axes and shouldn't be collapsed:

- **`difficulty`** (1–5) is the ramp — how much she'd have to learn or prove, rated from
  her actual position rather than in the abstract.
- **`competition`** is applicant volume — how crowded the door is.

Tech sales is easy to enter and brutally competitive to survive (difficulty 2,
competition High). Operations management is uncrowded but takes years (difficulty 2,
timeToEntry 1–3 years). One number couldn't carry both facts.

`barrier` is the honest catch in prose — the thing that actually stands in the way.

### About the numbers

Figures marked `confidence: 'bls'` are U.S. national medians from the Bureau of Labor
Statistics Occupational Outlook Handbook (May 2024 wage data, employment growth
projected 2024–34).

Figures marked `confidence: 'estimate'` are self-reported salary aggregates for roles
BLS doesn't track as distinct occupations — customer success and tech sales. The UI
labels these `estimate` on the card and draws them with striped bars in the chart,
deliberately. Worth keeping that distinction honest when adding paths.

Every path carries a `sources[]` array where each entry names which figure it backs.
Those feed both the per-card "check these numbers" list and the consolidated audit
section at `#sources`, so no number on the site is unattributed.

National medians rank paths against each other; they don't predict a paycheck.

## Running it

```bash
npm install
npm run dev
```

Other scripts:

- `npm run check` — TypeScript and Svelte diagnostics
- `npm run build` — production build into `build/`
- `npm run preview` — serve the production build locally

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which type-checks, builds,
and publishes to GitHub Pages.

**One-time setup:** in the repo's Settings → Pages, set **Source** to **GitHub Actions**.
Without that the workflow runs but nothing gets published.

Two Pages-specific details, already handled:

- `BASE_PATH` is set from the repo name at build time, because the site is served from a
  subpath rather than a domain root.
- `static/.nojekyll` stops GitHub stripping the `_app/` directory, which would otherwise
  break every script and stylesheet on the site.
