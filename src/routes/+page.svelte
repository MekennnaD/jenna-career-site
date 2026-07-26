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
		content="Nine career paths, each with what it pays, how hard it is to reach, and a link to the data behind the number."
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
		margin-bottom: 72px;
	}

	h1 {
		font-size: clamp(1.7rem, 3.6vw, 2.3rem);
		padding-block: 64px 0;
		max-width: 20ch;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-top: 34px;
		padding-bottom: 18px;
		border-bottom: 1px solid var(--border);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}

	.chip {
		font: inherit;
		font-size: 0.85rem;
		font-weight: 500;
		padding: 7px 14px;
		border-radius: var(--radius-xs);
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text-muted);
		cursor: pointer;
		transition:
			background 0.2s var(--ease),
			color 0.2s var(--ease),
			border-color 0.2s var(--ease),
			transform 0.1s var(--ease);
	}

	.chip:hover {
		border-color: var(--accent);
		color: var(--text);
	}

	/* Physical press feedback. */
	.chip:active {
		transform: scale(0.97);
	}

	.chip.on {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--bg);
	}

	.chip.clear {
		border-style: dashed;
	}

	.sort {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-size: 0.85rem;
		color: var(--text-faint);
	}

	select {
		font: inherit;
		font-size: 0.85rem;
		padding: 7px 11px;
		border-radius: var(--radius-xs);
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
		transition: border-color 0.2s var(--ease);
	}

	select:hover {
		border-color: var(--accent);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px 32px;
		margin-block: 18px 24px;
	}

	.count {
		font-size: 0.82rem;
		color: var(--text-faint);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.key {
		font-size: 0.82rem;
		color: var(--text-faint);
		max-width: 68ch;
	}

	.key strong {
		color: var(--text-muted);
		font-weight: 550;
	}

	/**
	 * A uniform grid is the right call here despite the usual advice against
	 * equal card columns — that advice is about marketing feature rows, and this
	 * is a comparison table. Nine paths only mean something when they're read
	 * against each other, so equal width is a feature.
	 *
	 * `align-items: start` stops short cards being stretched to match their
	 * tallest sibling. Grid rows still size to their tallest member, so keeping
	 * card heights close matters — which is why the roadmaps start collapsed.
	 */
	.grid {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
		align-items: start;
	}

	.empty {
		padding: 56px 0;
		display: grid;
		gap: 10px;
		justify-items: start;
	}

	.empty > .chip {
		margin-top: 8px;
	}

	.panel {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		padding: 30px 28px;
		scroll-margin-top: 88px;
	}

	.panel h2 {
		font-size: 1.3rem;
		margin-bottom: 16px;
	}

	.vintage {
		margin-top: 22px;
		padding-top: 16px;
		border-top: 1px solid var(--border);
	}

	details summary {
		font-size: 0.93rem;
		font-weight: 550;
		color: var(--text-muted);
		cursor: pointer;
		padding: 12px 0;
		transition: color 0.2s var(--ease);
	}

	details summary:hover {
		color: var(--text);
	}

	.jobs {
		list-style: none;
		margin: 16px 0 0;
		padding: 0;
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}

	.jobs > li {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 20px;
	}

	.job-head {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: space-between;
	}

	.job-head h2 {
		font-size: 1.02rem;
		font-weight: 600;
		margin: 0;
	}

	.role {
		font-size: 0.83rem;
		color: var(--text-faint);
		margin-top: 4px;
	}

	.jobs ul {
		margin: 14px 0;
		padding-left: 18px;
		font-size: 0.88rem;
		color: var(--text-muted);
	}

	.signal {
		font-size: 0.86rem;
		color: var(--accent-text);
		border-top: 1px solid var(--border);
		padding-top: 13px;
	}

	.source-list {
		list-style: none;
		margin: 26px 0 0;
		padding: 0;
		display: grid;
		gap: 18px;
	}

	.source-list > li {
		padding-top: 16px;
		border-top: 1px solid var(--border);
	}

	.source-list a {
		font-weight: 550;
		font-size: 0.95rem;
		color: var(--accent-text);
		text-decoration: none;
	}

	.source-list a:hover {
		text-decoration: underline;
	}

	.source-list ul {
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		font-size: 0.83rem;
		color: var(--text-faint);
		display: grid;
		gap: 3px;
	}
</style>
