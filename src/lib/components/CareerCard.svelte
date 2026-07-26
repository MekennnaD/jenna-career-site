<script lang="ts">
	import type { Career, Interest } from '$lib/types';
	import { money } from '$lib/format';

	let { career, interests }: { career: Career; interests: Interest[] } = $props();

	const matched = $derived(interests.filter((i) => career.interests.includes(i.id)));

	// An "estimate" figure is a self-reported aggregate rather than a BLS median.
	// Saying so next to the number matters more than the number itself.
	const isSoft = $derived(career.entry.confidence === 'estimate' || career.ceiling.confidence === 'estimate');
</script>

<article class="card">
	<header>
		<span class="emoji" aria-hidden="true">{career.emoji}</span>
		<div class="titles">
			<h3>{career.title}</h3>
			<p class="track">{career.track}</p>
		</div>
		{#if career.topPick}
			<span class="pill pill--gold">★ Best fit</span>
		{/if}
	</header>

	{#if matched.length}
		<ul class="tags">
			{#each matched as m (m.id)}
				<li class="pill pill--accent">{m.label}</li>
			{/each}
		</ul>
	{/if}

	<dl class="figures">
		<div>
			<dt>Starting</dt>
			<dd>{money(career.entry.median)}</dd>
			<p>{career.entry.title}</p>
		</div>
		<div>
			<dt>Ceiling</dt>
			<dd>{money(career.ceiling.median)}</dd>
			<p>{career.ceiling.title}</p>
		</div>
		<div>
			<dt>Growth</dt>
			<dd>{career.growth === null ? '—' : `+${career.growth}%`}</dd>
			<p>{career.growth === null ? 'No matching BLS projection' : 'Projected 2024–34'}</p>
		</div>
	</dl>

	<h4>Why it fits her</h4>
	<p class="body">{career.why}</p>

	<div class="moves">
		<div>
			<h5>First move</h5>
			<p>{career.firstMove}</p>
		</div>
		<div>
			<h5>Realistic timeline</h5>
			<p>{career.timeline}</p>
		</div>
	</div>

	<footer>
		<a href={career.source.url} target="_blank" rel="noopener noreferrer">
			{career.source.label} ↗
		</a>
		{#if isSoft}
			<span class="pill pill--quiet" title="Self-reported salary aggregate, not a BLS median">
				Softer numbers
			</span>
		{/if}
	</footer>
</article>

<style>
	article {
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	header {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.emoji {
		font-size: 1.6rem;
		line-height: 1.2;
	}

	.titles {
		flex: 1;
		min-width: 0;
	}

	h3 {
		font-size: 1.24rem;
		font-weight: 650;
	}

	.track {
		font-size: 0.86rem;
		color: var(--text-faint);
		margin-top: 3px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.figures {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		margin: 0;
		padding: 14px;
		background: var(--surface-alt);
		border-radius: var(--radius-sm);
	}

	.figures > div {
		min-width: 0;
	}

	dt {
		font-size: 0.7rem;
		font-weight: 650;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-faint);
	}

	dd {
		margin: 2px 0 0;
		font-size: 1.16rem;
		font-weight: 650;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
	}

	.figures p {
		font-size: 0.76rem;
		color: var(--text-faint);
		line-height: 1.35;
		margin-top: 3px;
	}

	h4 {
		font-size: 0.72rem;
		font-weight: 650;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--text-faint);
		margin-bottom: -8px;
	}

	.body {
		color: var(--text-muted);
		font-size: 0.95rem;
	}

	.moves {
		display: grid;
		gap: 14px;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid var(--border);
		padding-top: 14px;
	}

	h5 {
		margin: 0 0 3px;
		font-size: 0.8rem;
		font-weight: 640;
		color: var(--text);
	}

	.moves p {
		font-size: 0.88rem;
		color: var(--text-muted);
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		font-size: 0.78rem;
	}

	footer a {
		color: var(--text-faint);
		text-decoration: none;
	}

	footer a:hover {
		color: var(--accent-text);
		text-decoration: underline;
	}

	@media (max-width: 520px) {
		.figures {
			grid-template-columns: 1fr;
		}

		.moves {
			grid-template-columns: 1fr;
		}
	}
</style>
