<script lang="ts">
	import CareerCard from '$lib/components/CareerCard.svelte';
	import SalaryChart from '$lib/components/SalaryChart.svelte';
	import { allSources, careers, sorts, WAGE_VINTAGE, type SortKey } from '$lib/data/careers';
	import { profile } from '$lib/data/profile';
	import type { InterestId } from '$lib/types';

	let activeInterests = $state<InterestId[]>([]);
	let sortKey = $state<SortKey>('recommended');
	let showExperience = $state(false);

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

	// Headline stats for the hero — derived so they can never drift from the data.
	const easiest = $derived(
		[...careers].sort((a, b) => a.attainability.difficulty - b.attainability.difficulty)[0]
	);
	const highest = $derived([...careers].sort((a, b) => b.ceiling.median - a.ceiling.median)[0]);
</script>

<svelte:head>
	<title>Where this goes — {profile.name}'s career map</title>
</svelte:head>

<div class="page">
	<section class="hero">
		<p class="eyebrow">{profile.degree} · 4 jobs · 3 retailers</p>
		<h1>{profile.headline}</h1>
		<p class="lede">{profile.summary}</p>

		<div class="hero-stats">
			<div>
				<span class="stat-value">{careers.length}</span>
				<span class="stat-label">paths your experience already points at</span>
			</div>
			<div>
				<span class="stat-value">{easiest.attainability.timeToEntry}</span>
				<span class="stat-label">to the most reachable one ({easiest.title})</span>
			</div>
			<div>
				<span class="stat-value">${Math.round(highest.ceiling.median / 1000)}k</span>
				<span class="stat-label">highest verified ceiling ({highest.title})</span>
			</div>
		</div>

		<button
			type="button"
			class="disclosure"
			aria-expanded={showExperience}
			onclick={() => (showExperience = !showExperience)}
		>
			{showExperience ? 'Hide' : 'Show'} what you're working with
			<span aria-hidden="true">{showExperience ? '↑' : '↓'}</span>
		</button>

		{#if showExperience}
			<ol class="jobs">
				{#each profile.jobs as job (job.employer)}
					<li class="card">
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
		{/if}
	</section>

	<section aria-labelledby="chart-heading" class="chart-section card">
		<h2 id="chart-heading" class="visually-hidden">Pay ranges across every path</h2>
		<SalaryChart {careers} />
		<p class="caveat vintage">
			{WAGE_VINTAGE}. National medians hide a lot — a first job in a lower cost-of-living metro
			will start under these. Use them to rank paths against each other, not to predict a
			paycheck. <a href="#sources">Every figure is sourced below.</a>
		</p>
	</section>

	<section id="paths" aria-labelledby="paths-heading">
		<h2 id="paths-heading">The paths</h2>
		<p class="lede">
			Each one rated for difficulty from exactly where you stand — not in the abstract. Difficulty
			is how much you'd have to learn or prove; competition is how many people you'd be applying
			against. They're different problems.
		</p>

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

		<p class="count" aria-live="polite">Showing {visible.length} of {careers.length} paths</p>

		{#if visible.length === 0}
			<p class="empty">
				Nothing matches that combination.
				<button type="button" class="linkish" onclick={() => (activeInterests = [])}>
					Clear the filters
				</button>
				to see everything.
			</p>
		{:else}
			<div class="grid">
				{#each visible as career (career.id)}
					<CareerCard {career} interests={profile.interests} />
				{/each}
			</div>
		{/if}
	</section>

	<section id="sources" aria-labelledby="sources-heading" class="sources-section card">
		<h2 id="sources-heading">Where every number came from</h2>
		<p>
			Pay figures are U.S. national medians from the Bureau of Labor Statistics Occupational
			Outlook Handbook, <strong>May 2024 wage data</strong>, with employment growth projected
			<strong>2024–34</strong>. Each link below goes to the BLS page the figure was read from, so
			any of it can be checked directly.
		</p>
		<p class="caveat">
			Two paths — Customer Success and Tech Sales — aren't tracked by BLS as distinct occupations.
			Those figures come from self-reported salary aggregates, are marked <em>estimate</em> on the
			cards, and are drawn with striped bars in the chart. They deserve less weight than the rest.
		</p>

		<ul>
			{#each sources as source (source.url)}
				<li>
					<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>
					<ul class="backs">
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
	.hero {
		padding-block: 56px 44px;
	}

	.hero h1 {
		font-size: clamp(1.95rem, 5vw, 2.9rem);
		font-weight: 660;
		margin-block: 12px 18px;
		max-width: 24ch;
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		gap: 18px;
		margin-top: 32px;
		padding-top: 26px;
		border-top: 1px solid var(--border);
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 680;
		letter-spacing: -0.03em;
		color: var(--accent-text);
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		display: block;
		font-size: 0.84rem;
		color: var(--text-muted);
		margin-top: 3px;
	}

	.disclosure {
		font: inherit;
		font-size: 0.88rem;
		font-weight: 550;
		margin-top: 26px;
		padding: 8px 15px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text-muted);
		cursor: pointer;
	}

	.disclosure:hover {
		border-color: var(--accent);
		color: var(--text);
	}

	section {
		margin-bottom: 56px;
	}

	h2 {
		font-size: 1.55rem;
		font-weight: 650;
		margin-bottom: 8px;
	}

	.jobs {
		list-style: none;
		margin: 20px 0 0;
		padding: 0;
		display: grid;
		gap: 14px;
		grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
	}

	.jobs > li {
		padding: 18px;
	}

	.job-head {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: space-between;
	}

	.job-head h2 {
		font-size: 1.04rem;
		font-weight: 650;
		margin: 0;
	}

	.role {
		font-size: 0.83rem;
		color: var(--text-faint);
		margin-top: 2px;
	}

	.jobs ul {
		margin: 12px 0;
		padding-left: 18px;
		font-size: 0.88rem;
		color: var(--text-muted);
	}

	.signal {
		font-size: 0.86rem;
		font-style: italic;
		color: var(--accent-text);
		border-top: 1px solid var(--border);
		padding-top: 11px;
	}

	.chart-section {
		padding: 24px;
	}

	.vintage {
		margin-top: 18px;
		padding-top: 14px;
		border-top: 1px solid var(--border);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		margin-top: 20px;
		padding-bottom: 14px;
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
		font-weight: 550;
		padding: 6px 13px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text-muted);
		cursor: pointer;
		transition:
			background 0.12s ease,
			color 0.12s ease,
			border-color 0.12s ease;
	}

	.chip:hover {
		border-color: var(--accent);
		color: var(--text);
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
		gap: 8px;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	select {
		font: inherit;
		font-size: 0.85rem;
		padding: 6px 10px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text);
	}

	.count {
		font-size: 0.8rem;
		color: var(--text-faint);
		margin-block: 14px 16px;
	}

	.grid {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
		align-items: start;
	}

	.empty {
		color: var(--text-muted);
		padding: 32px 0;
	}

	.linkish {
		font: inherit;
		background: none;
		border: none;
		padding: 0;
		color: var(--accent-text);
		text-decoration: underline;
		cursor: pointer;
	}

	.sources-section {
		padding: 26px;
		scroll-margin-top: 80px;
	}

	.sources-section > p {
		color: var(--text-muted);
		max-width: var(--measure);
		margin-top: 8px;
		font-size: 0.94rem;
	}

	.sources-section > ul {
		list-style: none;
		margin: 22px 0 0;
		padding: 0;
		display: grid;
		gap: 16px;
	}

	.sources-section > ul > li {
		padding-top: 14px;
		border-top: 1px solid var(--border);
	}

	.sources-section a {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--accent-text);
		text-decoration: none;
	}

	.sources-section a:hover {
		text-decoration: underline;
	}

	.backs {
		list-style: none;
		margin: 6px 0 0;
		padding: 0;
		font-size: 0.83rem;
		color: var(--text-faint);
		display: grid;
		gap: 2px;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (max-width: 400px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
