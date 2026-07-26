import type { Profile } from '$lib/types';

/**
 * Who this site is for, and what she brings.
 *
 * The site has exactly one reader, so everything user-facing is written to her
 * directly in second person. Edit this file to update the hero and the
 * experience section.
 */

export const profile: Profile = {
	name: 'Jenna',
	degree: 'Liberal arts degree',
	headline: 'Nobody has a job title for "I notice how things should be organized." Several people do.',
	summary: `You have four jobs, three retailers, a degree, and no obvious next step — which feels like
		a problem with you and is actually a problem with translation. Below are nine real jobs your
		experience already points at, each with what it pays, how hard it is to get from exactly where
		you are, and the one thing to do first.`,

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
			signal: 'Promoted on your own performance. That is a track record, not just tenure.'
		},
		{
			employer: "Kohl's",
			role: 'Warehouse & merchandising',
			length: '1 year',
			current: false,
			highlights: [
				'Truck unloading and processing',
				'Merchandising and floor sets',
				'Organising and perfecting product presentation'
			],
			signal:
				'A second supply chain. Two systems means you can compare them — that is analyst thinking.'
		},
		{
			employer: 'Target',
			role: 'Overnight stocking',
			length: 'Overnights',
			current: false,
			highlights: ['Overnight replenishment', 'Working unsupervised against a clock'],
			signal: 'Third retailer. Overnight work is trusted work — nobody is watching, the truck still gets done.'
		},
		{
			employer: "Your aunt's firm",
			role: 'Brand consulting / marketing support',
			length: 'Ongoing',
			current: false,
			highlights: ['Brand and marketing work', 'Client-facing exposure', 'A warm professional network'],
			signal:
				'The one line on your resume that is already white-collar. This is the bridge — and the warmest introduction you have.'
		}
	],

	/** Things she's said she's drawn to. Paths matching these can be filtered on. */
	interests: [
		{ id: 'analysis', label: 'Analysis & market research' },
		{ id: 'training', label: 'Training & development' },
		{ id: 'process', label: 'Process & operations improvement' },
		{ id: 'leadership', label: 'Leadership' },
		{ id: 'people', label: 'Coaching, empathy, meaning & purpose' }
	]
};
