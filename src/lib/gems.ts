/**
 * Gemstone identities.
 *
 * Every path gets its own stone. This is decorative, but it is not only
 * decorative — fifteen cards need fifteen distinct visual anchors so a path can
 * be recognised at a glance and remembered between visits. Colour here encodes
 * *identity*, never meaning: difficulty and competition keep the accent and
 * signal hues everywhere, so nothing important is ever communicated by which
 * stone a card happens to own.
 *
 * Each gem stores a hue and saturation rather than fixed hex values, so light
 * and dark themes derive their own lightness from one number and the whole set
 * stays tonally consistent. Hues are spread around the wheel to keep adjacent
 * cards distinguishable.
 */

export interface Gem {
	/** Display name, shown on the card. */
	name: string;
	/** HSL hue, 0–360. */
	hue: number;
	/** HSL saturation as a percentage. Onyx sits near zero on purpose. */
	sat: number;
}

export const gems = {
	ruby: { name: 'Ruby', hue: 353, sat: 58 },
	carnelian: { name: 'Carnelian', hue: 18, sat: 62 },
	citrine: { name: 'Citrine', hue: 40, sat: 62 },
	topaz: { name: 'Topaz', hue: 55, sat: 58 },
	peridot: { name: 'Peridot', hue: 80, sat: 48 },
	jade: { name: 'Jade', hue: 112, sat: 34 },
	emerald: { name: 'Emerald', hue: 152, sat: 48 },
	turquoise: { name: 'Turquoise', hue: 176, sat: 46 },
	aquamarine: { name: 'Aquamarine', hue: 192, sat: 48 },
	sapphire: { name: 'Sapphire', hue: 214, sat: 52 },
	lapis: { name: 'Lapis Lazuli', hue: 232, sat: 46 },
	tanzanite: { name: 'Tanzanite', hue: 256, sat: 44 },
	amethyst: { name: 'Amethyst', hue: 280, sat: 40 },
	sugilite: { name: 'Sugilite', hue: 312, sat: 38 },
	roseQuartz: { name: 'Rose Quartz', hue: 338, sat: 44 },
	onyx: { name: 'Onyx', hue: 225, sat: 8 }
} satisfies Record<string, Gem>;

export type GemId = keyof typeof gems;
