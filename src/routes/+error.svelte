<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Nothing at this address</title>
</svelte:head>

<div class="page wrap">
	<p class="label">Error {page.status}</p>
	<h1>There's nothing at this address.</h1>
	<p class="lede">
		{page.error?.message ?? 'That link points somewhere that does not exist.'} The site is a single
		page, so the way back is short.
	</p>
	<a class="back" href="{base}/">Back to the paths</a>
</div>

<style>
	.wrap {
		padding-block: 96px 120px;
		max-width: 56ch;
	}

	h1 {
		font-size: clamp(1.6rem, 4vw, 2.1rem);
		margin-block: 14px 16px;
	}

	.back {
		display: inline-block;
		margin-top: 30px;
		padding: 11px 20px;
		border-radius: var(--radius-xs);
		background: var(--accent);
		color: var(--bg);
		font-size: 0.92rem;
		font-weight: 550;
		text-decoration: none;
		transition:
			transform 0.1s var(--ease),
			filter 0.2s var(--ease);
	}

	.back:hover {
		filter: brightness(1.08);
	}

	.back:active {
		transform: scale(0.98);
	}
</style>
