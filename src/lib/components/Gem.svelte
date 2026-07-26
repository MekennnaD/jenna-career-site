<script lang="ts">
	import { gems, type GemId } from '$lib/gems';

	let { gem, size = 26 }: { gem: GemId; size?: number } = $props();

	const stone = $derived(gems[gem]);
</script>

<!--
	A brilliant-cut stone: table on top, crown shoulders, pavilion converging to a
	point. Facets are the same fill at different opacities rather than separate
	colours, so every gem is lit from the top-left by one consistent light source
	and the set reads as one material.
-->
<svg
	class="gem"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	role="img"
	aria-label="{stone.name} — the marker for this path"
	style="--h: {stone.hue}; --s: {stone.sat}%"
>
	<!-- Pavilion, left and right, darkest. -->
	<polygon points="3,9.5 12,9.5 12,22" class="facet deep" />
	<polygon points="21,9.5 12,9.5 12,22" class="facet mid" />
	<!-- Crown shoulders. -->
	<polygon points="7,2.5 4.6,9.5 3,9.5" class="facet mid" />
	<polygon points="17,2.5 19.4,9.5 21,9.5" class="facet deep" />
	<!-- Table: the bright top face, catching the light. -->
	<polygon points="7,2.5 17,2.5 19.4,9.5 4.6,9.5" class="facet bright" />
	<!-- Girdle, and the crown edges that give the stone its cut. -->
	<g class="lines">
		<path d="M3 9.5 H21" />
		<path d="M4.6 9.5 L7 2.5" />
		<path d="M19.4 9.5 L17 2.5" />
		<path d="M12 9.5 V22" />
	</g>
</svg>

<style>
	.gem {
		flex-shrink: 0;
		display: block;
	}

	.facet {
		fill: hsl(var(--h) var(--s) 44%);
	}

	.bright {
		fill: hsl(var(--h) calc(var(--s) * 0.95) 58%);
	}

	.mid {
		fill: hsl(var(--h) var(--s) 40%);
	}

	.deep {
		fill: hsl(var(--h) var(--s) 30%);
	}

	.lines {
		stroke: hsl(var(--h) calc(var(--s) * 0.9) 82%);
		stroke-width: 0.6;
		stroke-linecap: round;
		opacity: 0.5;
		fill: none;
	}

	@media (prefers-color-scheme: dark) {
		.facet {
			fill: hsl(var(--h) var(--s) 56%);
		}

		.bright {
			fill: hsl(var(--h) calc(var(--s) * 0.95) 70%);
		}

		.mid {
			fill: hsl(var(--h) var(--s) 48%);
		}

		.deep {
			fill: hsl(var(--h) var(--s) 36%);
		}

		.lines {
			stroke: hsl(var(--h) calc(var(--s) * 0.9) 88%);
			opacity: 0.45;
		}
	}
</style>
