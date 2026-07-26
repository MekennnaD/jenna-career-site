<script lang="ts">
	import { checklist, checklistGroups } from '$lib/data/checklist';
	import { profile } from '$lib/data/profile';
	import { persisted } from '$lib/storage.svelte';

	const done = persisted<string[]>('jenna-career-site:checklist', []);

	function toggle(id: string) {
		done.current = done.current.includes(id)
			? done.current.filter((x) => x !== id)
			: [...done.current, id];
	}

	const completed = $derived(done.current.length);
	const pct = $derived(Math.round((completed / checklist.length) * 100));

	const byGroup = $derived(
		checklistGroups.map((group) => ({
			group,
			items: checklist.filter((item) => item.group === group)
		}))
	);
</script>

<svelte:head>
	<title>The plan — Where this goes</title>
</svelte:head>

<div class="page">
	<section class="hero">
		<p class="eyebrow">The actual next steps</p>
		<h1>Small, free, and in order.</h1>
		<p class="lede">
			Nothing here costs money and nothing takes more than a weekend. Progress saves in this
			browser — it stays on her own device and isn't sent anywhere.
		</p>
	</section>

	<section class="progress card" aria-labelledby="progress-heading">
		<div class="progress-head">
			<h2 id="progress-heading">{completed} of {checklist.length} done</h2>
			{#if completed > 0}
				<button type="button" class="reset" onclick={() => (done.current = [])}>Reset</button>
			{/if}
		</div>
		<div
			class="bar"
			role="progressbar"
			aria-valuenow={pct}
			aria-valuemin="0"
			aria-valuemax="100"
			aria-labelledby="progress-heading"
		>
			<div class="fill" style:width="{pct}%"></div>
		</div>
	</section>

	<section aria-labelledby="checklist-heading">
		<h2 id="checklist-heading" class="visually-hidden">Checklist</h2>
		{#each byGroup as { group, items } (group)}
			<div class="group">
				<h3>{group}</h3>
				<ul>
					{#each items as item (item.id)}
						<li class="card" class:done={done.current.includes(item.id)}>
							<label>
								<input
									type="checkbox"
									checked={done.current.includes(item.id)}
									onchange={() => toggle(item.id)}
								/>
								<span class="item-body">
									<span class="item-label">{item.label}</span>
									<span class="item-detail">{item.detail}</span>
								</span>
							</label>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</section>

	<section aria-labelledby="translate">
		<h2 id="translate">Say it the way they say it</h2>
		<p class="lede">
			The single highest-leverage hour on this whole site. Same work, same person — the right
			column is just the language hiring managers search for.
		</p>
		<div class="card table-wrap">
			<table>
				<thead>
					<tr>
						<th scope="col">How she'd say it</th>
						<th scope="col">How a resume says it</th>
					</tr>
				</thead>
				<tbody>
					{#each profile.translations as t (t.from)}
						<tr>
							<td class="from">{t.from}</td>
							<td class="to">{t.to}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>

<style>
	.hero {
		padding-block: 56px 36px;
	}

	.hero h1 {
		font-size: clamp(2rem, 5.5vw, 2.9rem);
		font-weight: 660;
		margin-block: 12px 18px;
	}

	section {
		margin-bottom: 48px;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 650;
		margin-bottom: 8px;
	}

	.progress {
		padding: 20px 22px;
	}

	.progress-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
	}

	.progress h2 {
		font-size: 1rem;
		font-weight: 620;
		margin: 0;
	}

	.reset {
		font: inherit;
		font-size: 0.8rem;
		background: none;
		border: 1px solid var(--border-strong);
		border-radius: 999px;
		padding: 4px 12px;
		color: var(--text-muted);
		cursor: pointer;
	}

	.reset:hover {
		color: var(--text);
		border-color: var(--accent);
	}

	.bar {
		height: 8px;
		border-radius: 999px;
		background: var(--surface-alt);
		overflow: hidden;
	}

	.fill {
		height: 100%;
		border-radius: 999px;
		background: var(--accent);
		transition: width 0.25s ease;
	}

	.group {
		margin-bottom: 28px;
	}

	.group h3 {
		font-size: 0.74rem;
		font-weight: 650;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--text-faint);
		margin-bottom: 10px;
	}

	.group ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 9px;
	}

	.group li {
		transition: opacity 0.15s ease;
	}

	.group li.done {
		opacity: 0.55;
	}

	.group li.done .item-label {
		text-decoration: line-through;
	}

	label {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 13px;
		align-items: start;
		padding: 15px 17px;
		cursor: pointer;
	}

	input {
		width: 19px;
		height: 19px;
		margin: 2px 0 0;
		accent-color: var(--accent);
		cursor: pointer;
		flex-shrink: 0;
	}

	.item-body {
		display: block;
		min-width: 0;
	}

	.item-label {
		display: block;
		font-weight: 600;
		font-size: 0.98rem;
	}

	.item-detail {
		display: block;
		font-size: 0.88rem;
		color: var(--text-muted);
		margin-top: 4px;
		max-width: var(--measure);
	}

	.table-wrap {
		margin-top: 20px;
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.91rem;
		min-width: 460px;
	}

	th {
		text-align: left;
		font-size: 0.72rem;
		font-weight: 650;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-faint);
		padding: 14px 18px;
		border-bottom: 1px solid var(--border);
	}

	td {
		padding: 12px 18px;
		border-bottom: 1px solid var(--border);
		vertical-align: top;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	.from {
		color: var(--text-faint);
		width: 42%;
	}

	.to {
		color: var(--text);
		font-weight: 550;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
