<script lang="ts">
	import type { Career, Interest } from '$lib/types';
	import { money } from '$lib/format';

	let { career, interests }: { career: Career; interests: Interest[] } = $props();

	const matched = $derived(interests.filter((i) => career.interests.includes(i.id)));

	// An "estimate" figure is a self-reported aggregate rather than a BLS median.
	// Flagging that next to the number matters more than the number itself.
	const isSoft = $derived(
		career.entry.confidence === 'estimate' || career.ceiling.confidence === 'estimate'
	);

	const competitionClass = $derived(
		career.attainability.competition === 'Low' || career.attainability.competition === 'Moderate'
			? 'ok'
			: 'warn'
	);

	// Colour the meter by rating so "more filled" reads unambiguously as harder,
	// rather than leaving the viewer to guess whether green means good or done.
	const difficultyTone = $derived(
		career.attainability.difficulty <= 2 ? 'easy' : career.attainability.difficulty === 3 ? 'mid' : 'hard'
	);
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

	<!-- Attainability first: pay is meaningless if the door won't open. -->
	<div class="attain">
		<div class="difficulty">
			<div class="difficulty-head">
				<span class="label">How hard from where you are</span>
				<span class="difficulty-value">{career.attainability.difficultyLabel}</span>
			</div>
			<div
				class="meter {difficultyTone}"
				role="meter"
				aria-valuenow={career.attainability.difficulty}
				aria-valuemin="1"
				aria-valuemax="5"
				aria-label="Difficulty {career.attainability.difficulty} out of 5"
			>
				{#each [1, 2, 3, 4, 5] as step (step)}
					<span class="notch" class:filled={step <= career.attainability.difficulty}></span>
				{/each}
			</div>
		</div>

		<dl class="attain-facts">
			<div>
				<dt>Competition</dt>
				<dd class={competitionClass}>{career.attainability.competition}</dd>
			</div>
			<div>
				<dt>Time to first offer</dt>
				<dd>{career.attainability.timeToEntry}</dd>
			</div>
		</dl>
	</div>

	<div class="barrier">
		<h4>What's actually in the way</h4>
		<p>{career.attainability.barrier}</p>
	</div>

	<dl class="figures">
		<div>
			<dt>Starting</dt>
			<dd>{money(career.entry.median)}</dd>
			<p>{career.entry.title}{career.entry.confidence === 'estimate' ? ' · estimate' : ''}</p>
		</div>
		<div>
			<dt>Ceiling</dt>
			<dd>{money(career.ceiling.median)}</dd>
			<p>{career.ceiling.title}{career.ceiling.confidence === 'estimate' ? ' · estimate' : ''}</p>
		</div>
		<div>
			<dt>Growth</dt>
			<dd>{career.growth === null ? '—' : `+${career.growth}%`}</dd>
			<p>{career.growth === null ? 'No BLS projection' : 'Projected 2024–34'}</p>
		</div>
	</dl>

	<h4>Why this fits you</h4>
	<p class="body">{career.why}</p>

	<div class="first-move">
		<h4>Do this first</h4>
		<p>{career.firstMove}</p>
	</div>

	{#if matched.length}
		<ul class="tags">
			{#each matched as m (m.id)}
				<li class="pill pill--accent">{m.label}</li>
			{/each}
		</ul>
	{/if}

	<footer>
		<h4>Check these numbers</h4>
		<ul class="sources">
			{#each career.sources as source (source.url)}
				<li>
					<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>
					<span>{source.backs}</span>
				</li>
			{/each}
		</ul>
		{#if isSoft}
			<p class="soft-note">
				Figures marked <em>estimate</em> are self-reported salary aggregates, not BLS medians. Treat
				them as rough.
			</p>
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
		font-size: 0.85rem;
		color: var(--text-faint);
		margin-top: 3px;
	}

	.attain {
		display: grid;
		gap: 14px;
		padding: 15px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
	}

	.difficulty-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 6px;
	}

	.label,
	dt {
		font-size: 0.7rem;
		font-weight: 650;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-faint);
	}

	.difficulty-value {
		font-size: 0.92rem;
		font-weight: 620;
		color: var(--text);
	}

	.meter {
		display: flex;
		gap: 4px;
		margin-top: 8px;
	}

	.notch {
		height: 6px;
		flex: 1;
		border-radius: 999px;
		background: var(--surface-alt);
		border: 1px solid var(--border);
	}

	.meter.easy .notch.filled {
		background: var(--accent);
		border-color: var(--accent);
	}

	.meter.mid .notch.filled {
		background: var(--gold);
		border-color: var(--gold);
	}

	.meter.hard .notch.filled {
		background: var(--hard);
		border-color: var(--hard);
	}

	.attain-facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin: 0;
		padding-top: 12px;
		border-top: 1px solid var(--border);
	}

	.attain-facts dd {
		margin: 3px 0 0;
		font-size: 0.92rem;
		font-weight: 600;
	}

	.attain-facts dd.warn {
		color: var(--gold);
	}

	.attain-facts dd.ok {
		color: var(--accent-text);
	}

	.barrier p {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-top: 5px;
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

	.figures dd {
		margin: 2px 0 0;
		font-size: 1.16rem;
		font-weight: 650;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
	}

	.figures p {
		font-size: 0.75rem;
		color: var(--text-faint);
		line-height: 1.35;
		margin-top: 3px;
	}

	h4 {
		font-size: 0.7rem;
		font-weight: 650;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--text-faint);
		margin: 0;
	}

	.body {
		color: var(--text-muted);
		font-size: 0.94rem;
		margin-top: -8px;
	}

	.first-move {
		padding: 14px 16px;
		border-radius: var(--radius-sm);
		background: var(--accent-soft);
	}

	.first-move h4 {
		color: var(--accent-text);
		opacity: 0.8;
	}

	.first-move p {
		font-size: 0.93rem;
		font-weight: 550;
		color: var(--accent-text);
		margin-top: 5px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	footer {
		border-top: 1px solid var(--border);
		padding-top: 14px;
		margin-top: auto;
	}

	.sources {
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		display: grid;
		gap: 7px;
	}

	.sources li {
		display: flex;
		flex-direction: column;
		font-size: 0.79rem;
	}

	.sources a {
		color: var(--accent-text);
		font-weight: 550;
		text-decoration: none;
	}

	.sources a:hover {
		text-decoration: underline;
	}

	.sources span {
		color: var(--text-faint);
	}

	.soft-note {
		font-size: 0.76rem;
		color: var(--text-faint);
		margin-top: 10px;
	}

	@media (max-width: 520px) {
		.figures {
			grid-template-columns: 1fr;
		}
	}
</style>
