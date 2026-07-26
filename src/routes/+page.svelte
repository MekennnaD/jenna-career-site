<script lang="ts">
	import { base } from '$app/paths';
	import CareerCard from '$lib/components/CareerCard.svelte';
	import SalaryChart from '$lib/components/SalaryChart.svelte';
	import { careers, sorts, WAGE_VINTAGE, type SortKey } from '$lib/data/careers';
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
</script>

<svelte:head>
	<title>Where this goes — career paths for {profile.name}</title>
</svelte:head>

<div class="page">
	<section class="hero">
		<p class="eyebrow">A map, not a verdict</p>
		<h1>{profile.headline}</h1>
		<p class="lede">{profile.summary}</p>
	</section>

	<section aria-labelledby="experience">
		<h2 id="experience">What she's already got</h2>
		<p class="lede">
			{profile.degree}, four jobs, three retailers. The problem was never a thin resume — it's that
			nobody has translated it yet.
		</p>

		<ol class="jobs">
			{#each profile.jobs as job (job.employer)}
				<li class="card">
					<div class="job-head">
						<h3>{job.employer}</h3>
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
	</section>

	<section aria-labelledby="chart-heading" class="chart-section card">
		<h2 id="chart-heading" class="visually-hidden">Pay ranges across every path</h2>
		<SalaryChart {careers} />
		<p class="caveat vintage">
			{WAGE_VINTAGE}. National medians hide a lot — a first job in a lower cost-of-living metro
			will start under these. Use them to rank paths against each other, not to predict a
			paycheck.
		</p>
	</section>

	<section aria-labelledby="paths">
		<h2 id="paths">The paths</h2>
		<p class="lede">
			Ranked for her specifically. Filter by what sounds interesting — or clear the filters and
			read all {careers.length}.
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

		<p class="count" aria-live="polite">
			Showing {visible.length} of {careers.length} paths
		</p>

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

	<section class="next card">
		<h2>Next</h2>
		<p>
			Two pages follow this one. <a href="{base}/certifications">Certifications</a> lays out five
			training paths, each starting with something free — the point is to try two or three and
			notice which one she can't put down. <a href="{base}/plan">The plan</a> is the checklist, and
			it remembers what's done.
		</p>
	</section>
</div>

<style>
	.hero {
		padding-block: 56px 40px;
	}

	.hero h1 {
		font-size: clamp(2.1rem, 6vw, 3.1rem);
		font-weight: 660;
		margin-block: 12px 18px;
		max-width: 22ch;
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
		margin: 24px 0 0;
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

	.job-head h3 {
		font-size: 1.06rem;
		font-weight: 650;
	}

	.role {
		font-size: 0.84rem;
		color: var(--text-faint);
		margin-top: 2px;
	}

	.jobs ul {
		margin: 12px 0;
		padding-left: 18px;
		font-size: 0.89rem;
		color: var(--text-muted);
	}

	.jobs ul li {
		margin-bottom: 3px;
	}

	.signal {
		font-size: 0.87rem;
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
		grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
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

	.next {
		padding: 24px;
	}

	.next p {
		color: var(--text-muted);
		max-width: var(--measure);
		margin-top: 6px;
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
