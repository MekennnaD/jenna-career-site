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
	/* The note by the door on the way out. No rule above it — the whitespace is
	   the separation. */
	footer {
		padding-block: 8px 72px;
	}

	footer p {
		font-size: 0.87rem;
		font-style: italic;
		color: var(--text-faint);
		max-width: 52ch;
	}
</style>
