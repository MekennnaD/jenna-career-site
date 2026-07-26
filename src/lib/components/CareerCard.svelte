<script lang="ts">
	import type { Career, Interest } from '$lib/types';
	import { money } from '$lib/format';

	let {
		career,
		interests,
		index = 0
	}: { career: Career; interests: Interest[]; index?: number } = $props();

	const matched = $derived(interests.filter((i) => career.interests.includes(i.id)));

	// An "estimate" figure is a self-reported aggregate rather than a BLS median.
	// Flagging that next to the number matters more than the number itself.
	const isSoft = $derived(
		career.entry.confidence === 'estimate' || career.ceiling.confidence === 'estimate'
	);

	// Difficulty and competition both shade toward the signal hue as they get
	// worse, so "more colour" always reads as "more in your way" — never as a
	// completed progress bar.
	const hardish = $derived(career.attainability.difficulty >= 4);
	const crowded = $derived(
		career.attainability.competition === 'High' || career.attainability.competition === 'Very high'
	);
</script>

<article class="card rise" class:featured={career.topPick} style="--i: {index}">
	<header>
		<div class="titles">
			<h3>{career.title}</h3>
			<p class="track">{career.track}</p>
		</div>
		{#if career.topPick}
			<span class="pill pill--accent">Closest to reach</span>
		{/if}
	</header>

	<!-- Attainability leads. Pay is irrelevant if the door won't open. -->
	<section class="attain" aria-label="How reachable this is">
		<div class="difficulty">
			<div class="difficulty-head">
				<p class="label">Difficulty from where you are</p>
				<p class="difficulty-value" class:warn={hardish}>
					{career.attainability.difficultyLabel}
				</p>
			</div>
			<div
				class="meter"
				class:warn={hardish}
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
				<dt class="label">Competition</dt>
				<dd class:warn={crowded}>{career.attainability.competition}</dd>
			</div>
			<div>
				<dt class="label">Time to first offer</dt>
				<dd>{career.attainability.timeToEntry}</dd>
			</div>
		</dl>
	</section>

	<div class="barrier">
		<p class="label">What's actually in the way</p>
		<p>{career.attainability.barrier}</p>
	</div>

	<dl class="figures">
		<div>
			<dt class="label">Starting</dt>
			<dd class="num">{money(career.entry.median)}</dd>
			<p>{career.entry.title}{career.entry.confidence === 'estimate' ? ' · estimate' : ''}</p>
		</div>
		<div>
			<dt class="label">Ceiling</dt>
			<dd class="num">{money(career.ceiling.median)}</dd>
			<p>{career.ceiling.title}{career.ceiling.confidence === 'estimate' ? ' · estimate' : ''}</p>
		</div>
		<div>
			<dt class="label">Growth</dt>
			<dd class="num">{career.growth === null ? '—' : `+${career.growth}%`}</dd>
			<p>{career.growth === null ? 'No BLS projection' : 'Projected 2024–34'}</p>
		</div>
	</dl>

	<div class="why">
		<p class="label">Why this fits you</p>
		<p>{career.why}</p>
	</div>

	<!--
		Collapsed by default. Expanded, a nine-card grid becomes nine 2,000px
		columns and nothing can be compared against anything — and CSS grid rows
		size to their tallest card, so uneven heights leave large dead gaps.
		Scan first, open the one that interests you.
	-->
	<details class="roadmap">
		<summary>
			<span>Roadmap — {career.roadmap.length} steps from where you are</span>
			<span class="chevron" aria-hidden="true">↓</span>
		</summary>
		<ol>
			{#each career.roadmap as step, i (step.action)}
				<li>
					<div class="marker" aria-hidden="true">
						<span class="dot"></span>
						{#if i < career.roadmap.length - 1}<span class="rail"></span>{/if}
					</div>
					<div class="step">
						<p class="when">
							{step.when}
							{#if step.cost}<span class="cost">{step.cost}</span>{/if}
						</p>
						<h4>{step.action}</h4>
						<p class="detail">{step.detail}</p>
					</div>
				</li>
			{/each}
		</ol>
	</details>

	{#if matched.length}
		<ul class="tags">
			{#each matched as m (m.id)}
				<li class="pill pill--accent">{m.label}</li>
			{/each}
		</ul>
	{/if}

	<footer>
		<p class="label">Check these numbers</p>
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
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		padding: 26px 24px 22px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		transition:
			transform 0.25s var(--ease),
			box-shadow 0.25s var(--ease),
			border-color 0.25s var(--ease);
	}

	article:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lg);
		border-color: var(--border-strong);
	}

	.featured {
		border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
		box-shadow: var(--shadow-md);
	}

	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
	}

	.titles {
		min-width: 0;
	}

	h3 {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.track {
		font-size: 0.85rem;
		color: var(--text-faint);
		margin-top: 5px;
	}

	.attain {
		display: grid;
		gap: 16px;
		padding: 16px;
		border-radius: var(--radius-md);
		background: var(--surface-alt);
	}

	.difficulty-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 4px 10px;
	}

	.difficulty-value {
		font-size: 0.9rem;
		font-weight: 550;
		color: var(--accent-text);
	}

	.difficulty-value.warn {
		color: var(--signal);
	}

	.meter {
		display: flex;
		gap: 4px;
		margin-top: 10px;
	}

	.notch {
		height: 5px;
		flex: 1;
		border-radius: 999px;
		background: var(--surface-sunk);
	}

	.notch.filled {
		background: var(--accent);
	}

	.meter.warn .notch.filled {
		background: var(--signal);
	}

	/**
	 * `display: contents` on the wrappers promotes every dt and dd to a direct
	 * grid item, so all labels share row 1 and all values share row 2. Without
	 * it a label that wraps to two lines pushes its own value out of line with
	 * the one beside it.
	 */
	.attain-facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		/* Column flow, so the flattened dt/dd order fills each column top-to-bottom
		   and every label lands in row 1 with every value in row 2. */
		grid-auto-flow: column;
		gap: 4px 12px;
		margin: 0;
		padding-top: 14px;
		border-top: 1px solid var(--border);
	}

	.attain-facts > div {
		display: contents;
	}

	.attain-facts dd {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 550;
		align-self: start;
	}

	.attain-facts dd.warn {
		color: var(--signal);
	}

	.barrier p:last-child,
	.why p:last-child {
		font-size: 0.93rem;
		color: var(--text-muted);
		margin-top: 7px;
	}

	.figures {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
		margin: 0;
		padding: 16px 0;
		border-block: 1px solid var(--border);
	}

	.figures > div {
		min-width: 0;
	}

	.figures dd {
		margin: 5px 0 0;
		font-size: 1.2rem;
		font-weight: 550;
	}

	.figures p {
		font-size: 0.75rem;
		color: var(--text-faint);
		line-height: 1.4;
		margin-top: 4px;
	}

	/**
	 * The roadmap is the reason this card exists — a timeline rail rather than a
	 * bullet list, so the sequence reads as a route rather than a menu.
	 */
	.roadmap {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 4px 16px;
		transition: border-color 0.2s var(--ease);
	}

	.roadmap:hover {
		border-color: var(--accent);
	}

	.roadmap summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 0;
		cursor: pointer;
		font-size: 0.88rem;
		font-weight: 550;
		color: var(--accent-text);
		list-style: none;
	}

	.roadmap summary::-webkit-details-marker {
		display: none;
	}

	.chevron {
		transition: transform 0.25s var(--ease);
		font-size: 0.9rem;
	}

	.roadmap[open] .chevron {
		transform: rotate(180deg);
	}

	.roadmap ol {
		list-style: none;
		margin: 8px 0 16px;
		padding: 0;
	}

	.roadmap li {
		display: grid;
		grid-template-columns: 15px 1fr;
		gap: 14px;
	}

	.marker {
		display: grid;
		grid-template-rows: auto 1fr;
		justify-items: center;
		padding-top: 5px;
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 0 3px var(--accent-soft);
	}

	.rail {
		width: 1.5px;
		height: 100%;
		background: var(--border);
		margin-top: 5px;
	}

	.step {
		padding-bottom: 20px;
		min-width: 0;
	}

	.roadmap li:last-child .step {
		padding-bottom: 0;
	}

	.when {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--text-faint);
		text-transform: uppercase;
	}

	.cost {
		font-family: var(--font-sans);
		text-transform: none;
		letter-spacing: 0;
		padding: 1px 7px;
		border-radius: var(--radius-xs);
		background: var(--accent-soft);
		color: var(--accent-text);
		font-size: 0.72rem;
	}

	h4 {
		margin: 5px 0 0;
		font-size: 0.96rem;
		font-weight: 550;
		line-height: 1.35;
		letter-spacing: -0.01em;
	}

	.detail {
		font-size: 0.89rem;
		color: var(--text-muted);
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
		padding-top: 16px;
		margin-top: auto;
	}

	.sources {
		list-style: none;
		margin: 10px 0 0;
		padding: 0;
		display: grid;
		gap: 9px;
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
		width: fit-content;
	}

	.sources a:hover {
		text-decoration: underline;
	}

	.sources span {
		color: var(--text-faint);
	}

	.soft-note {
		font-size: 0.77rem;
		color: var(--text-faint);
		margin-top: 12px;
	}

	@media (max-width: 520px) {
		.figures {
			grid-template-columns: 1fr;
		}
	}
</style>
