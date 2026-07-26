<script lang="ts">
	import Gem from '$lib/components/Gem.svelte';
	import { gems } from '$lib/gems';
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
			soft: c.entry.confidence === 'estimate' || c.ceiling.confidence === 'estimate',
			// Each bar wears its path's stone, so the chart and the cards share one
			// visual language and a row can be matched to its card by colour alone.
			gem: gems[c.gem]
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
			<div class="row" style="--h: {row.gem.hue}; --s: {row.gem.sat}%">
				<span class="name">
					<Gem gem={careers.find((c) => c.id === row.id)!.gem} size={13} />
					<span class="label-text">{row.title}</span>
				</span>
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
		margin-top: 28px;
	}

	.gridlines {
		position: absolute;
		inset: 0 52px 30px var(--label-w, 210px);
	}

	.gridline {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--text-faint);
		opacity: 0.35;
	}

	.row {
		display: grid;
		grid-template-columns: var(--label-w, 210px) 1fr;
		align-items: center;
		gap: 14px;
		padding-block: 5px;
	}

	.name {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 0.85rem;
		color: var(--text-muted);
		min-width: 0;
	}

	/* Truncation lives on the text, not the flex row — otherwise the gem gets
	   squeezed instead of the label. */
	.label-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/**
	 * A channel pressed into the clay, holding an inlaid stone. Slightly
	 * translucent on purpose: the gridlines sit behind it, and an opaque channel
	 * hides them entirely, leaving no way to tell where $50k falls.
	 */
	.track {
		position: relative;
		height: 26px;
		margin-right: 52px;
		border-radius: var(--r-pill);
		background: color-mix(in srgb, var(--surface-sunk) 86%, transparent);
		box-shadow: var(--clay-inset);
	}

	.bar {
		position: absolute;
		top: 5px;
		height: 16px;
		border-radius: var(--r-pill);
		background: linear-gradient(
			160deg,
			hsl(var(--h) var(--s) 62%),
			hsl(calc(var(--h) + 14) calc(var(--s) * 0.9) 46%)
		);
		box-shadow:
			inset 1px 1px 2px hsl(var(--h) 40% 88% / 0.55),
			inset -1px -2px 3px rgb(60 40 20 / 0.28);
		min-width: 10px;
		transition: filter 0.25s var(--ease);
	}

	.row:hover .bar {
		filter: brightness(1.08) saturate(1.08);
	}

	/* Soft data reads as cut glass rather than solid stone. */
	.bar.soft {
		background-image: repeating-linear-gradient(
			135deg,
			hsl(var(--h) var(--s) 58%) 0 6px,
			hsl(var(--h) calc(var(--s) * 0.45) 62% / 0.4) 6px 12px
		);
	}

	.endcap {
		position: absolute;
		top: 4px;
		margin-left: 11px;
		font-size: 0.76rem;
		font-weight: 500;
		color: var(--text-muted);
		white-space: nowrap;
	}

	.axis {
		position: relative;
		height: 30px;
		margin-left: var(--label-w, 210px);
		margin-right: 52px;
		border-top: 1px solid var(--rule);
	}

	.axis span {
		position: absolute;
		top: 8px;
		transform: translateX(-50%);
		font-size: 0.72rem;
		color: var(--text-faint);
	}

	@media (max-width: 640px) {
		.chart {
			--label-w: 124px;
		}
	}
</style>
