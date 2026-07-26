<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<!--
	No navigation bar: this is a single page with one reader, so there is nothing
	to navigate between and nothing to brand. Removing it also removes the need
	for a skip link, since there is no repeated block to skip past.
-->
<main>
	{@render children()}
</main>

<footer>
	<div class="page">
		<p>
			A working document, not a verdict — built to be argued with and rewritten. Every figure links
			to the page it came from, so anything that looks wrong can be checked and changed.
		</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--border);
		padding-block: 32px 48px;
	}

	footer p {
		font-size: 0.87rem;
		color: var(--text-faint);
		max-width: var(--measure);
	}
</style>
