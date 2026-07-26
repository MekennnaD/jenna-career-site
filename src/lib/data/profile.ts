/**
 * Who this site is for, and what she brings.
 *
 * Everything user-facing on the site reads from here — edit this file to update
 * the hero, the "why she fits" logic, and the resume-translation prompts.
 */

import type { Profile } from '$lib/types';

export const profile: Profile = {
	name: 'Jenna',
	degree: 'Liberal arts degree',
	headline: 'Four jobs, three retailers, one very good instinct for how stuff moves.',
	summary: `Nobody hands you a job title for "I notice how things should be organized and then
		organize them." That instinct is real, it's rare, and it has names in the job market —
		this site is a map of what those names are, what they pay, and how to get there from here.`,

	/** Work history, newest first. `signal` = what a hiring manager should read into it. */
	jobs: [
		{
			employer: 'Best Buy',
			role: 'Warehouse — part-time → full-time',
			length: '~2 years',
			current: true,
			highlights: [
				'Started part-time, earned full-time',
				'Top performer on the floor',
				'Inventory flow, receiving, stock accuracy'
			],
			signal: 'Promotion under her own steam. That is a performance record, not just tenure.'
		},
		{
			employer: "Kohl's",
			role: 'Warehouse & merchandising',
			length: '1 year',
			current: false,
			highlights: [
				'Truck unloading and processing',
				'Merchandising and floor sets',
				'Organizing and perfecting product presentation'
			],
			signal: 'Second retail supply chain. Two systems means she can compare them — that is analyst thinking.'
		},
		{
			employer: 'Target',
			role: 'Overnight stocking',
			length: 'Seasonal / overnights',
			current: false,
			highlights: ['Overnight replenishment', 'Working unsupervised against a clock'],
			signal: 'Third retailer. Overnight work is trusted work — nobody is watching, the truck still gets done.'
		},
		{
			employer: "Her aunt's firm",
			role: 'Brand consulting / marketing support',
			length: 'Ongoing',
			current: false,
			highlights: ['Brand and marketing work', 'Client-facing exposure', 'Warm professional network'],
			signal: 'The one line on the resume that is already white-collar. This is the bridge — and the warmest referral she has.'
		}
	],

	/** Things she has said she's drawn to. Career paths matching these get starred. */
	interests: [
		{ id: 'analysis', label: 'Analysis & market research' },
		{ id: 'training', label: 'Training & development' },
		{ id: 'process', label: 'Process & operations improvement' },
		{ id: 'leadership', label: 'Leadership' },
		{ id: 'people', label: 'Coaching, empathy, meaning & purpose' }
	],

	/**
	 * Warehouse-language → business-language. The single highest-leverage thing she
	 * can do this week is rewrite her resume using the right column.
	 */
	translations: [
		{ from: 'Unloaded and processed trucks', to: 'Inbound receiving and freight processing' },
		{ from: 'Organized the stockroom', to: 'Inventory organization and slotting optimization' },
		{ from: 'Made sure product looked right', to: 'Merchandising standards and quality control' },
		{ from: 'Showed the new people how to do it', to: 'Onboarding and peer training' },
		{ from: 'Worked overnights alone', to: 'Autonomous operations against fixed SLAs' },
		{ from: 'Went from part-time to full-time', to: 'Promoted on performance within first year' },
		{ from: 'Helped my aunt with her clients', to: 'Brand and marketing support, client-facing' }
	]
};
