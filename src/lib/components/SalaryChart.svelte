<script lang="ts">
	import type { Career } from '$lib/types';
	import { money, moneyShort } from '$lib/format';

	let { careers }: { careers: Career[] } = $props();

	// CSS grid rather than SVG, so it reflows on narrow screens and every label
	// stays real, selectable text.
	const AXIS_MAX = 175_000;
	const ticks = [0, 50_000, 100_000, 150_000];

	const pct = (v: number) => `${(v / AXIS_MAX) * 100}%`;

	const rows = $derived(
		careers.map((c) => ({
			id: c.id,
			title: c.title,
			entry: c.entry.median,
			ceiling: c.ceiling.median,
			soft: c.entry.confidence === 'estimate' || c.ceiling.confidence === 'estimate'
		}))
	);
</script>

<figure>
	<figcaption class="caveat">
		Each bar runs from a realistic first-job number to the median for the senior role in that
		track. Striped bars rest on self-reported salary aggregates rather than BLS medians.
	</figcaption>

	<div class="chart">
		<div class="gridlines" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span class="gridline" style:left={pct(tick)}></span>
			{/each}
		</div>

		{#each rows as row (row.id)}
			<div class="row">
				<span class="name">{row.title}</span>
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
					<span class="endcap num" style:left={pct(row.ceiling)}>{moneyShort(row.ceiling)}</span>
				</div>
			</div>
		{/each}

		<div class="axis" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span class="num" style:left={pct(tick)}>{tick === 0 ? '$0' : moneyShort(tick)}</span>
			{/each}
		</div>
	</div>
</figure>

<style>
	figure {
		margin: 0;
	}

	.chart {
		position: relative;
		margin-top: 24px;
	}

	.gridlines {
		position: absolute;
		/* Matches .track's inset so lines sit under the bars, not the labels. */
		inset: 0 48px 28px var(--label-w, 200px);
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
		grid-template-columns: var(--label-w, 200px) 1fr;
		align-items: center;
		gap: 12px;
		padding-block: 4px;
	}

	.name {
		font-size: 0.85rem;
		color: var(--text-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.track {
		position: relative;
		height: 28px;
		margin-right: 48px;
	}

	.bar {
		position: absolute;
		top: 6px;
		height: 16px;
		border-radius: 999px;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--accent) 40%, transparent),
			var(--accent)
		);
		min-width: 4px;
		transition: filter 0.2s var(--ease);
	}

	.row:hover .bar {
		filter: brightness(1.12);
	}

	.bar.soft {
		background-image: repeating-linear-gradient(
			135deg,
			var(--accent) 0 5px,
			color-mix(in srgb, var(--accent) 38%, transparent) 5px 10px
		);
	}

	.endcap {
		position: absolute;
		top: 5px;
		margin-left: 9px;
		font-size: 0.76rem;
		font-weight: 550;
		color: var(--text-muted);
		white-space: nowrap;
	}

	.axis {
		position: relative;
		height: 28px;
		margin-left: var(--label-w, 200px);
		margin-right: 48px;
		border-top: 1px solid var(--border);
	}

	.axis span {
		position: absolute;
		top: 7px;
		transform: translateX(-50%);
		font-size: 0.72rem;
		color: var(--text-faint);
	}

	@media (max-width: 640px) {
		.chart {
			--label-w: 118px;
		}
	}
</style>
