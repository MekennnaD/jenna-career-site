<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';

	let { children } = $props();
</script>

<a class="skip" href="#paths">Skip to the paths</a>

<header>
	<div class="page nav">
		<a class="wordmark" href="{base}/">
			<span aria-hidden="true">🧭</span>
			<span>Where this goes</span>
		</a>
		<a class="sources-link" href="#sources">Sources</a>
	</div>
</header>

<main>
	{@render children()}
</main>

<footer>
	<div class="page">
		<p>
			A working document, not a verdict. Every number links to where it came from, and everything
			here is editable — if something is wrong or out of date, it should be changed.
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

	.sources-link {
		font-size: 0.88rem;
		font-weight: 550;
		color: var(--text-muted);
		text-decoration: none;
		padding: 6px 12px;
		border-radius: 999px;
	}

	.sources-link:hover {
		background: var(--surface-alt);
		color: var(--text);
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
