<script lang="ts">
	import { certPaths, freeStarters } from '$lib/data/certifications';
</script>

<svelte:head>
	<title>Certifications — Where this goes</title>
</svelte:head>

<div class="page">
	<section class="hero">
		<p class="eyebrow">Cheap first, expensive later</p>
		<h1>Try the free thing before you buy anything.</h1>
		<p class="lede">
			Every path below starts at $0 and gets more expensive as it goes. The idea isn't to pick
			correctly on the first try — it's to spend a few free afternoons and notice which one she
			can't put down. That signal is worth more than any amount of deliberating.
		</p>
	</section>

	<section class="starters card" aria-labelledby="free">
		<h2 id="free">Start this week — costs nothing</h2>
		<ul>
			{#each freeStarters as starter (starter.label)}
				<li>
					<a href="#{starter.pathId}">
						<span class="starter-label">{starter.label}</span>
						<span class="starter-time">{starter.time}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="paths">
		<h2 id="paths">Five paths</h2>
		<p class="lede">
			Starred paths match something she's said she's drawn to. Prices are approximate and move
			around — each step links to the provider, so check before paying.
		</p>

		<div class="paths">
			{#each certPaths as path (path.id)}
				<article class="card" id={path.id}>
					<header>
						<span class="emoji" aria-hidden="true">{path.emoji}</span>
						<div>
							<h3>
								{path.title}
								{#if path.matchesInterest}<span class="star" title="Matches a stated interest"
										>★</span
									>{/if}
							</h3>
							<p class="leads-to">{path.leadsTo}</p>
						</div>
					</header>

					<p class="pitch">{path.pitch}</p>

					<ol class="steps">
						{#each path.steps as step, i (step.name)}
							<li>
								<div class="step-num" aria-hidden="true">{i + 1}</div>
								<div class="step-body">
									<div class="step-head">
										<h4>
											{#if step.url}
												<a href={step.url} target="_blank" rel="noopener noreferrer">
													{step.name} ↗
												</a>
											{:else}
												{step.name}
											{/if}
										</h4>
										<span class="pill" class:pill--accent={step.cost === 0} class:pill--quiet={step.cost > 0}>
											{step.costLabel}
										</span>
									</div>
									<p class="meta">{step.provider} · {step.time}</p>
									<p class="note">{step.note}</p>
								</div>
							</li>
						{/each}
					</ol>
				</article>
			{/each}
		</div>
	</section>

	<section class="card money-note">
		<h2>One rule about money</h2>
		<p>
			Nothing on this page should be paid for until the free step in the same path is finished.
			And before paying for anything: ask her employer whether they reimburse it. Large retailers
			frequently do, especially for supply chain and leadership credentials — the worst answer is
			no, and asking costs nothing.
		</p>
	</section>
</div>

<style>
	.hero {
		padding-block: 56px 40px;
	}

	.hero h1 {
		font-size: clamp(2rem, 5.5vw, 2.9rem);
		font-weight: 660;
		margin-block: 12px 18px;
		max-width: 20ch;
	}

	section {
		margin-bottom: 56px;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 650;
		margin-bottom: 8px;
	}

	.starters {
		padding: 22px;
	}

	.starters h2 {
		font-size: 1.02rem;
		margin-bottom: 14px;
	}

	.starters ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 9px;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
	}

	.starters a {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 12px 14px;
		border-radius: var(--radius-sm);
		background: var(--accent-soft);
		text-decoration: none;
		height: 100%;
	}

	.starter-label {
		font-size: 0.92rem;
		font-weight: 620;
		color: var(--accent-text);
	}

	.starter-time {
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.paths {
		display: grid;
		gap: 18px;
		margin-top: 22px;
	}

	.paths > article {
		padding: 24px;
	}

	.paths header {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.emoji {
		font-size: 1.7rem;
		line-height: 1.15;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 650;
	}

	.star {
		color: var(--star);
		font-size: 0.95rem;
		vertical-align: 2px;
	}

	.leads-to {
		font-size: 0.85rem;
		color: var(--text-faint);
		margin-top: 3px;
	}

	.pitch {
		color: var(--text-muted);
		font-size: 0.95rem;
		margin-top: 14px;
		max-width: var(--measure);
	}

	.steps {
		list-style: none;
		margin: 20px 0 0;
		padding: 0;
		display: grid;
		gap: 2px;
	}

	.steps > li {
		display: grid;
		grid-template-columns: 30px 1fr;
		gap: 14px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
	}

	.step-num {
		width: 26px;
		height: 26px;
		display: grid;
		place-items: center;
		border-radius: 999px;
		background: var(--surface-alt);
		border: 1px solid var(--border);
		font-size: 0.78rem;
		font-weight: 650;
		color: var(--text-muted);
	}

	.step-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		justify-content: space-between;
	}

	h4 {
		margin: 0;
		font-size: 1rem;
		font-weight: 620;
	}

	h4 a {
		text-decoration: none;
		color: var(--text);
	}

	h4 a:hover {
		color: var(--accent-text);
		text-decoration: underline;
	}

	.meta {
		font-size: 0.8rem;
		color: var(--text-faint);
		margin-top: 3px;
	}

	.note {
		font-size: 0.89rem;
		color: var(--text-muted);
		margin-top: 7px;
		max-width: var(--measure);
	}

	.money-note {
		padding: 24px;
	}

	.money-note h2 {
		font-size: 1.15rem;
	}

	.money-note p {
		color: var(--text-muted);
		max-width: var(--measure);
		margin-top: 6px;
	}
</style>
