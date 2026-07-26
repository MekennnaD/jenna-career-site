<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();

	const links = [
		{ href: '/', label: 'Paths' },
		{ href: '/certifications', label: 'Certifications' },
		{ href: '/plan', label: 'The plan' }
	];

	// `page.url.pathname` already includes the base path, so compare against the
	// prefixed href rather than the bare one.
	function isCurrent(href: string) {
		const full = `${base}${href}`;
		return href === '/' ? page.url.pathname === full : page.url.pathname.startsWith(full);
	}
</script>

<a class="skip" href="#main">Skip to content</a>

<header>
	<nav class="page nav" aria-label="Main">
		<a class="wordmark" href="{base}/">
			<span aria-hidden="true">🧭</span>
			<span>Where this goes</span>
		</a>
		<ul>
			{#each links as link (link.href)}
				<li>
					<a href="{base}{link.href}" aria-current={isCurrent(link.href) ? 'page' : undefined}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main id="main">
	{@render children()}
</main>

<footer>
	<div class="page">
		<p>
			A working document, not a verdict. Every number here links to where it came from, and
			everything is editable — if something is wrong or out of date, change it.
		</p>
	</div>
</footer>

<style>
	.skip {
		position: absolute;
		left: -9999px;
	}

	.skip:focus {
		left: 12px;
		top: 12px;
		z-index: 10;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		padding: 8px 14px;
		border-radius: var(--radius-sm);
	}

	header {
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(8px);
		position: sticky;
		top: 0;
		z-index: 5;
	}

	.nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px 24px;
		padding-block: 14px;
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 640;
		letter-spacing: -0.015em;
		color: var(--text);
		text-decoration: none;
	}

	ul {
		display: flex;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		display: block;
		padding: 6px 12px;
		border-radius: 999px;
		font-size: 0.94rem;
		font-weight: 550;
		color: var(--text-muted);
		text-decoration: none;
	}

	ul a:hover {
		background: var(--surface-alt);
		color: var(--text);
	}

	ul a[aria-current='page'] {
		background: var(--accent-soft);
		color: var(--accent-text);
	}

	main {
		padding-top: 8px;
	}

	footer {
		border-top: 1px solid var(--border);
		padding-block: 28px 40px;
	}

	footer p {
		font-size: 0.86rem;
		color: var(--text-faint);
		max-width: var(--measure);
	}
</style>
