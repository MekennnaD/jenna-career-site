// Every route is static content — prerender the whole site to plain HTML so it
// can be served by GitHub Pages. `strict: true` in the adapter config means a
// future non-prerenderable route will fail the build rather than ship broken.
export const prerender = true;

// No client-side router work needed on a site this small, but keeping SSR on
// means the pages are readable with JavaScript disabled.
export const ssr = true;
