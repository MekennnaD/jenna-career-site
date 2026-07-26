<script lang="ts">
	import CareerCard from '$lib/components/CareerCard.svelte';
	import SalaryChart from '$lib/components/SalaryChart.svelte';
	import { allSources, careers, sorts, WAGE_VINTAGE, type SortKey } from '$lib/data/careers';
	import { profile } from '$lib/data/profile';
	import type { InterestId } from '$lib/types';

	let activeInterests = $state<InterestId[]>([]);
	let sortKey = $state<SortKey>('recommended');

	function toggleInterest(id: InterestId) {
		activeInterests = activeInterests.includes(id)
			? activeInterests.filter((x) => x !== id)
			: [...activeInterests, id];
	}

	const visible = $derived.by(() => {
		const filtered =
			activeInterests.length === 0
				? careers
				: careers.filter((c) => c.interests.some((i) => activeInterests.includes(i)));
		// Copy before sorting — `careers` is the shared module array.
		return [...filtered].sort(sorts[sortKey].fn);
	});

	const sources = allSources();
</script>

<svelte:head>
	<title>{profile.name} — career options</title>
	<meta
		name="description"
		content="Career paths, each with what it pays, how hard it is to reach from here, and a link to the data behind the number."
	/>
</svelte:head>

<div class="page">
	<section id="paths" aria-labelledby="paths-heading">
		<h1 id="paths-heading">
			{careers.length} jobs your experience already points at
		</h1>

		<div class="controls">
			<div class="filters" role="group" aria-label="Filter by interest">
				{#each profile.interests as interest (interest.id)}
					<button
						type="button"
						class="chip"
						class:on={activeInterests.includes(interest.id)}
						aria-pressed={activeInterests.includes(interest.id)}
						onclick={() => toggleInterest(interest.id)}
					>
						{interest.label}
					</button>
				{/each}
				{#if activeInterests.length}
					<button type="button" class="chip clear" onclick={() => (activeInterests = [])}>
						Clear
					</button>
				{/if}
			</div>

			<label class="sort">
				<span>Sort</span>
				<select bind:value={sortKey}>
					{#each Object.entries(sorts) as [key, sort] (key)}
						<option value={key}>{sort.label}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="meta">
			<p class="count" aria-live="polite">
				{visible.length}
				{visible.length === 1 ? 'path' : 'paths'}{activeInterests.length
					? ` matching ${activeInterests.length} ${activeInterests.length === 1 ? 'filter' : 'filters'}`
					: ''}
			</p>
			<p class="key">
				<strong>Difficulty</strong> is what you'd have to learn or prove;
				<strong>competition</strong> is how many people you'd be applying against. Separate
				problems — tech sales is easy to enter and hard to survive.
			</p>
		</div>

		{#if visible.length === 0}
			<div class="empty">
				<p>No path matches every filter at once.</p>
				<p class="caveat">
					The filters narrow rather than combine, so picking several unrelated interests can rule
					everything out.
				</p>
				<button type="button" class="chip" onclick={() => (activeInterests = [])}>
					Clear filters
				</button>
			</div>
		{:else}
			<div class="grid">
				{#each visible as career, i (career.id)}
					<CareerCard {career} interests={profile.interests} index={i} />
				{/each}
			</div>
		{/if}
	</section>

	<section aria-labelledby="chart-heading" class="panel">
		<h2 id="chart-heading">Every path, side by side</h2>
		<SalaryChart {careers} />
		<p class="caveat vintage">
			{WAGE_VINTAGE}. National medians hide a lot — a first job in a lower cost-of-living metro
			will start under these. They're useful for ranking paths against each other, not for
			predicting a paycheck. <a href="#sources">Every figure is sourced below.</a>
		</p>
	</section>

	<section aria-labelledby="experience-heading">
		<details>
			<summary id="experience-heading">What these ratings are based on</summary>
			<ol class="jobs">
				{#each profile.jobs as job (job.employer)}
					<li>
						<div class="job-head">
							<h2>{job.employer}</h2>
							{#if job.current}<span class="pill pill--accent">Current</span>{/if}
						</div>
						<p class="role">{job.role} · {job.length}</p>
						<ul>
							{#each job.highlights as h (h)}
								<li>{h}</li>
							{/each}
						</ul>
						<p class="signal">{job.signal}</p>
					</li>
				{/each}
			</ol>
		</details>
	</section>

	<section id="sources" aria-labelledby="sources-heading" class="panel">
		<h2 id="sources-heading">Where every number came from</h2>
		<p class="lede">
			Pay figures are U.S. national medians from the Bureau of Labor Statistics Occupational
			Outlook Handbook, <strong>May 2024 wage data</strong>, with employment growth projected
			<strong>2024–34</strong>. Each link goes to the page the figure was read from.
		</p>
		<p class="caveat">
			Customer Success and Tech Sales aren't tracked by BLS as distinct occupations. Those figures
			come from self-reported salary aggregates, are marked <em>estimate</em> on the cards, and are
			drawn with striped bars in the chart. They deserve less weight than the rest.
		</p>

		<ul class="source-list">
			{#each sources as source (source.url)}
				<li>
					<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>
					<ul>
						{#each source.usedBy as use (use)}
							<li>{use}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	section {
		margin-bottom: 88px;
	}

	/* A title card at the entrance to the room. Nothing else competes with it. */
	h1 {
		font-size: clamp(2rem, 4.4vw, 3rem);
		font-variation-settings: 'SOFT' 60, 'WONK' 1;
		font-weight: 400;
		padding-block: 96px 0;
		max-width: 18ch;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		margin-top: 44px;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 9px;
	}

	/* Clay buttons. Raised at rest, pressed in when active or held. */
	.chip {
		font: inherit;
		font-size: 0.85rem;
		font-weight: 500;
		padding: 9px 17px;
		border: none;
		border-radius: var(--r-pill);
		background: var(--surface);
		color: var(--text-muted);
		box-shadow: var(--clay);
		cursor: pointer;
		transition:
			box-shadow 0.3s var(--ease),
			color 0.3s var(--ease),
			transform 0.15s var(--ease);
	}

	.chip:hover {
		color: var(--text);
		transform: translateY(-1px);
	}

	.chip:active {
		transform: translateY(1px);
		box-shadow: var(--clay-inset);
	}

	.chip.on {
		background: var(--accent-soft);
		color: var(--accent-text);
		box-shadow: var(--clay-inset);
	}

	.chip.clear {
		background: transparent;
		box-shadow: none;
		color: var(--text-faint);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.chip.clear:hover {
		color: var(--text);
	}

	.sort {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 0.85rem;
		color: var(--text-faint);
	}

	select {
		font: inherit;
		font-size: 0.85rem;
		padding: 9px 14px;
		border: none;
		border-radius: var(--r-pill);
		background: var(--surface);
		color: var(--text);
		box-shadow: var(--clay);
		cursor: pointer;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px 40px;
		margin-block: 34px 28px;
	}

	.count {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-faint);
		white-space: nowrap;
	}

	.key {
		font-size: 0.83rem;
		color: var(--text-faint);
		max-width: 66ch;
	}

	.key strong {
		color: var(--text-muted);
		font-weight: 500;
	}

	/**
	 * A uniform grid is right here despite the usual advice against equal card
	 * columns — that advice is about marketing feature rows, and this is a
	 * comparison table. Fifteen paths only mean something read against each
	 * other, so equal width is the point.
	 *
	 * `align-items: start` stops short cards being stretched. Grid rows still
	 * size to their tallest member, which is why roadmaps start collapsed.
	 */
	.grid {
		display: grid;
		gap: 26px;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		align-items: start;
	}

	.empty {
		padding: 72px 0;
		display: grid;
		gap: 12px;
		justify-items: start;
	}

	.empty > .chip {
		margin-top: 10px;
	}

	/* Room-sized plinths for the two reference exhibits. */
	.panel {
		background: var(--surface);
		border-radius: var(--r-lg);
		box-shadow: var(--clay);
		padding: 40px 36px;
		scroll-margin-top: 32px;
	}

	.panel h2 {
		font-size: 1.6rem;
		margin-bottom: 20px;
	}

	.vintage {
		margin-top: 28px;
		padding-top: 20px;
		border-top: 1px solid var(--rule);
	}

	details summary {
		font-family: var(--font-display);
		font-variation-settings: 'SOFT' 40, 'WONK' 1;
		font-size: 1.15rem;
		color: var(--text-muted);
		cursor: pointer;
		padding: 14px 0;
		transition: color 0.3s var(--ease);
	}

	details summary:hover {
		color: var(--text);
	}

	.jobs {
		list-style: none;
		margin: 22px 0 0;
		padding: 0;
		display: grid;
		gap: 22px;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	}

	.jobs > li {
		background: var(--surface);
		border-radius: var(--r-lg);
		box-shadow: var(--clay);
		padding: 26px 24px;
	}

	.job-head {
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: space-between;
	}

	.job-head h2 {
		font-size: 1.1rem;
		margin: 0;
	}

	.role {
		font-size: 0.82rem;
		color: var(--text-faint);
		margin-top: 5px;
	}

	.jobs ul {
		margin: 16px 0;
		padding-left: 18px;
		font-size: 0.87rem;
		color: var(--text-muted);
	}

	.signal {
		font-size: 0.86rem;
		color: var(--accent-text);
		border-top: 1px solid var(--rule);
		padding-top: 15px;
	}

	.source-list {
		list-style: none;
		margin: 30px 0 0;
		padding: 0;
		display: grid;
		gap: 22px;
	}

	.source-list > li {
		padding-top: 20px;
		border-top: 1px solid var(--rule);
	}

	.source-list a {
		font-weight: 500;
		font-size: 0.95rem;
		color: var(--accent-text);
		text-decoration: none;
	}

	.source-list a:hover {
		text-decoration: underline;
	}

	.source-list ul {
		list-style: none;
		margin: 9px 0 0;
		padding: 0;
		font-size: 0.83rem;
		color: var(--text-faint);
		display: grid;
		gap: 4px;
	}

	@media (max-width: 560px) {
		.panel {
			padding: 28px 22px;
		}
	}
</style>
