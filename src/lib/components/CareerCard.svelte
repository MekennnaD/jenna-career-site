<script lang="ts">
	import Gem from '$lib/components/Gem.svelte';
	import { gems } from '$lib/gems';
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

	const stone = $derived(gems[career.gem]);
</script>

<article
	class="clay rise"
	class:featured={career.topPick}
	style="--i: {index}; --h: {stone.hue}; --s: {stone.sat}%"
>
	<header>
		<Gem gem={career.gem} />
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
		<p class="stone-name">
			<Gem gem={career.gem} size={13} />
			{stone.name}
		</p>
	</footer>
</article>

<style>
	/**
	 * A plinth. Soft clay, no border anywhere — the shadow is the edge.
	 * The gem is the only sharp, saturated object on it.
	 */
	article {
		padding: 30px 28px 24px;
		display: flex;
		flex-direction: column;
		gap: 22px;
		transition:
			transform 0.4s var(--ease),
			box-shadow 0.4s var(--ease);
	}

	article:hover {
		transform: translateY(-5px);
		box-shadow: var(--clay-raised);
	}

	/* The recommended path sits on a faintly tinted plinth. Tint only — giving it
	   a ring or a border would reintroduce the hard edges clay does not have. */
	.featured {
		background:
			linear-gradient(var(--accent-soft), var(--accent-soft)) padding-box,
			var(--surface);
	}

	header {
		display: flex;
		align-items: flex-start;
		gap: 14px;
	}

	.titles {
		flex: 1;
		min-width: 0;
	}

	h3 {
		font-size: 1.32rem;
		font-variation-settings: 'SOFT' 40, 'WONK' 1;
	}

	.track {
		font-size: 0.83rem;
		color: var(--text-faint);
		margin-top: 6px;
	}

	/* Pressed into the plinth — the recessed tray holding the key readings. */
	.attain {
		display: grid;
		gap: 18px;
		padding: 20px;
		border-radius: var(--r-md);
		background: var(--surface-sunk);
		box-shadow: var(--clay-inset);
	}

	.difficulty-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 4px 12px;
	}

	.difficulty-value {
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--accent-text);
	}

	.difficulty-value.warn {
		color: var(--signal);
	}

	/* Five clay beads pressed into a groove. */
	.meter {
		display: flex;
		gap: 5px;
		margin-top: 12px;
	}

	.notch {
		height: 7px;
		flex: 1;
		border-radius: var(--r-pill);
		background: var(--bg);
		box-shadow: var(--clay-inset-deep);
	}

	.notch.filled {
		background: var(--accent);
		box-shadow: none;
	}

	.meter.warn .notch.filled {
		background: var(--signal);
	}

	/**
	 * `display: contents` promotes every dt and dd to a direct grid item, and
	 * column flow puts all labels in row 1 and all values in row 2. Without it a
	 * label that wraps pushes its own value out of line with the one beside it.
	 */
	.attain-facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		grid-auto-flow: column;
		gap: 5px 14px;
		margin: 0;
		padding-top: 16px;
		border-top: 1px solid var(--rule);
	}

	.attain-facts > div {
		display: contents;
	}

	.attain-facts dd {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 500;
		align-self: start;
	}

	.attain-facts dd.warn {
		color: var(--signal);
	}

	.barrier p:last-child,
	.why p:last-child {
		font-size: 0.92rem;
		color: var(--text-muted);
		margin-top: 8px;
	}

	/* The three headline readings. Hairlines rather than clay — inside dense data
	   a soft shadow would only add mush. */
	.figures {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin: 0;
		padding: 18px 0;
		border-block: 1px solid var(--rule);
	}

	.figures > div {
		min-width: 0;
	}

	.figures dd {
		margin: 6px 0 0;
		font-size: 1.22rem;
		font-weight: 500;
	}

	.figures p {
		font-size: 0.74rem;
		color: var(--text-faint);
		line-height: 1.45;
		margin-top: 5px;
	}

	/* A clay drawer that opens. */
	.roadmap {
		border-radius: var(--r-md);
		background: var(--surface-alt);
		box-shadow: var(--clay);
		padding: 2px 18px;
		transition: box-shadow 0.3s var(--ease);
	}

	.roadmap[open] {
		box-shadow: var(--clay-inset);
		background: var(--surface-sunk);
	}

	.roadmap summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 15px 0;
		cursor: pointer;
		font-size: 0.88rem;
		font-weight: 500;
		color: var(--accent-text);
		list-style: none;
	}

	.roadmap summary::-webkit-details-marker {
		display: none;
	}

	.chevron {
		transition: transform 0.35s var(--ease);
		font-size: 0.9rem;
	}

	.roadmap[open] .chevron {
		transform: rotate(180deg);
	}

	/* The route, as a strung line of beads. */
	.roadmap ol {
		list-style: none;
		margin: 6px 0 18px;
		padding: 0;
	}

	.roadmap li {
		display: grid;
		grid-template-columns: 16px 1fr;
		gap: 16px;
	}

	.marker {
		display: grid;
		grid-template-rows: auto 1fr;
		justify-items: center;
		padding-top: 6px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: var(--r-pill);
		background: var(--accent);
		box-shadow: inset -1px -1px 2px rgb(0 0 0 / 0.25), inset 1px 1px 2px rgb(255 255 255 / 0.4);
	}

	.rail {
		width: 2px;
		height: 100%;
		background: var(--rule);
		margin-top: 6px;
		border-radius: var(--r-pill);
	}

	.step {
		padding-bottom: 22px;
		min-width: 0;
	}

	.roadmap li:last-child .step {
		padding-bottom: 0;
	}

	.when {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 9px;
		font-family: var(--font-mono);
		font-size: 0.69rem;
		letter-spacing: 0.05em;
		color: var(--text-faint);
		text-transform: uppercase;
	}

	.cost {
		font-family: var(--font-sans);
		text-transform: none;
		letter-spacing: 0;
		padding: 2px 9px;
		border-radius: var(--r-pill);
		background: var(--accent-soft);
		color: var(--accent-text);
		font-size: 0.72rem;
	}

	h4 {
		margin: 7px 0 0;
		font-family: var(--font-display);
		font-variation-settings: 'SOFT' 40, 'WONK' 1;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.3;
	}

	.detail {
		font-size: 0.88rem;
		color: var(--text-muted);
		margin-top: 6px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	footer {
		border-top: 1px solid var(--rule);
		padding-top: 18px;
		margin-top: auto;
	}

	.sources {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}

	.sources li {
		display: flex;
		flex-direction: column;
		font-size: 0.79rem;
	}

	.sources a {
		color: var(--accent-text);
		font-weight: 500;
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
		margin-top: 14px;
	}

	/* The placard at the foot of the plinth, naming the specimen. */
	.stone-name {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 18px;
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-faint);
	}

	@media (max-width: 520px) {
		.figures {
			grid-template-columns: 1fr;
		}
	}
</style>
