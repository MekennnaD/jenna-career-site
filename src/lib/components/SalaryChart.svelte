<script lang="ts">
	import type { Career } from '$lib/types';
	import { money, moneyShort } from '$lib/format';

	let { careers }: { careers: Career[] } = $props();

	// Built with CSS grid rather than SVG so it reflows on narrow screens and
	// the labels stay real, selectable text.
	const AXIS_MAX = 175_000;
	const ticks = [0, 50_000, 100_000, 150_000];

	const pct = (v: number) => `${(v / AXIS_MAX) * 100}%`;

	const rows = $derived(
		careers.map((c) => ({
			id: c.id,
			title: c.title,
			emoji: c.emoji,
			entry: c.entry.median,
			ceiling: c.ceiling.median,
			soft: c.entry.confidence === 'estimate' || c.ceiling.confidence === 'estimate'
		}))
	);
</script>

<figure>
	<figcaption>
		<h3>Starting pay → ceiling</h3>
		<p class="caveat">
			Each bar runs from a realistic first-job number to the median for the senior role in that
			track. Striped bars lean on self-reported salary aggregates rather than BLS medians — read
			them as rough.
		</p>
	</figcaption>

	<div class="chart">
		<div class="gridlines" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span class="gridline" style:left={pct(tick)}></span>
			{/each}
		</div>

		{#each rows as row (row.id)}
			<div class="row">
				<div class="label">
					<span aria-hidden="true">{row.emoji}</span>
					<span class="name">{row.title}</span>
				</div>
				<div class="track">
					<div
						class="bar"
						class:soft={row.soft}
						style:left={pct(row.entry)}
						style:width={pct(row.ceiling - row.entry)}
					>
						<span class="visually-hidden">
							{row.title}: {money(row.entry)} to {money(row.ceiling)}
						</span>
					</div>
					<span class="endcap" style:left={pct(row.ceiling)}>{moneyShort(row.ceiling)}</span>
				</div>
			</div>
		{/each}

		<div class="axis" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span style:left={pct(tick)}>{tick === 0 ? '$0' : moneyShort(tick)}</span>
			{/each}
		</div>
	</div>
</figure>

<style>
	figure {
		margin: 0;
	}

	figcaption h3 {
		font-size: 1.05rem;
		font-weight: 640;
		margin-bottom: 5px;
	}

	.chart {
		position: relative;
		margin-top: 20px;
	}

	.gridlines {
		position: absolute;
		/* Line up with .track, which starts after the label column. */
		inset: 0 46px 26px var(--label-w, 190px);
	}

	.gridline {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--border);
	}

	.row {
		display: grid;
		grid-template-columns: var(--label-w, 190px) 1fr;
		align-items: center;
		gap: 10px;
		padding-block: 5px;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 0.86rem;
		color: var(--text-muted);
		min-width: 0;
	}

	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.track {
		position: relative;
		height: 26px;
		margin-right: 46px;
	}

	.bar {
		position: absolute;
		top: 5px;
		height: 16px;
		border-radius: 999px;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--accent) 45%, transparent),
			var(--accent)
		);
		min-width: 4px;
	}

	.bar.soft {
		background-image: repeating-linear-gradient(
			135deg,
			var(--accent) 0 5px,
			color-mix(in srgb, var(--accent) 45%, transparent) 5px 10px
		);
	}

	.endcap {
		position: absolute;
		top: 4px;
		margin-left: 8px;
		font-size: 0.76rem;
		font-weight: 640;
		font-variant-numeric: tabular-nums;
		color: var(--text-muted);
		white-space: nowrap;
	}

	.axis {
		position: relative;
		height: 26px;
		margin-left: var(--label-w, 190px);
		margin-right: 46px;
		border-top: 1px solid var(--border);
	}

	.axis span {
		position: absolute;
		top: 5px;
		transform: translateX(-50%);
		font-size: 0.72rem;
		color: var(--text-faint);
		font-variant-numeric: tabular-nums;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.chart {
			--label-w: 116px;
		}

		.label span:first-child {
			display: none;
		}
	}
</style>
