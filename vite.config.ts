import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// GitHub Pages serves this repo from https://<user>.github.io/jenna-career-site/,
// so every asset and internal link needs that prefix in production. The deploy
// workflow sets BASE_PATH; `npm run dev` leaves it unset so local URLs stay at root.
// SvelteKit requires "" or a leading slash with no trailing one.
const raw = process.env.BASE_PATH ?? '';
const base = (raw === '' ? '' : `/${raw.replace(/^\/|\/$/g, '')}`) as '' | `/${string}`;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Static adapter: the whole site prerenders to plain HTML, which is all
			// GitHub Pages can serve. `strict` fails the build if a route is ever added
			// that can't be prerendered, rather than silently shipping a broken page.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true
			}),

			paths: {
				base
			}
		})
	]
});
