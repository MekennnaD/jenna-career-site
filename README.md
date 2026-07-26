# Where this goes

A small SvelteKit site mapping career paths, certifications, and next steps for one
specific person — built to be edited constantly rather than finished once.

Live at `https://<user>.github.io/jenna-career-site/` once GitHub Pages is enabled.

## Editing the content

All content lives in `src/lib/data/`. No component or markup changes are needed to add
anything — the pages read from these arrays.

| File                | What's in it                                       |
| ------------------- | -------------------------------------------------- |
| `profile.ts`        | Work history, interests, resume translation table   |
| `careers.ts`        | The nine career paths, salary figures, sort options |
| `certifications.ts` | Five certification paths and their steps            |
| `checklist.ts`      | The action checklist on `/plan`                     |

Adding a career path means copying one object in `careers.ts` and changing the fields.
The types in `src/lib/types.ts` are enforced, so `npm run check` will name any field
that's missing.

### About the numbers

Salary figures marked `confidence: 'bls'` are U.S. national medians from the Bureau of
Labor Statistics Occupational Outlook Handbook (May 2024 wage data, growth projected
2024–34). Each one links to its source page.

Figures marked `confidence: 'estimate'` are self-reported salary aggregates for roles
BLS doesn't track as distinct occupations — customer success and tech sales especially.
The UI renders those with striped bars and a "softer numbers" tag, deliberately. Worth
keeping that distinction honest when adding paths.

National medians are useful for ranking paths against each other, not for predicting a
paycheck.

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
