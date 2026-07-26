/**
 * Career paths, ranked.
 *
 * ADDING A PATH: copy any object below, change the fields, done. Nothing else
 * in the app needs to know about it — the list, filters, sort and chart all read
 * from this array.
 *
 * ON THE NUMBERS: `median` values are U.S. national medians from the BLS
 * Occupational Outlook Handbook, May 2024 wage data, with growth projected
 * 2024–34. National medians hide a lot — a first job in a low cost-of-living
 * metro will start well under these. They are for ranking paths against each
 * other, not for predicting a paycheck.
 *
 * Anything not covered by a BLS occupation is marked `confidence: 'estimate'`
 * and is a self-reported aggregate. Treat those as much softer.
 */

import type { Career, SortOption } from '$lib/types';

export const WAGE_VINTAGE = 'BLS median wages, May 2024 · growth projected 2024–34';

export const careers: Career[] = [
	{
		id: 'process-analyst',
		title: 'Process / Operations Analyst',
		track: 'Analyst → Senior Analyst → Manager',
		emoji: '⚙️',
		topPick: true,
		interests: ['process', 'analysis'],
		entry: { title: 'Operations / process analyst', median: 60000, confidence: 'estimate' },
		ceiling: { title: 'Management analyst (median)', median: 101190, confidence: 'bls' },
		growth: 9,
		source: {
			label: 'BLS — Management Analysts',
			url: 'https://www.bls.gov/ooh/business-and-financial/management-analysts.htm'
		},
		why: `This is "the way of stuff" with a business card. She has spent four jobs watching how
			product moves and quietly noticing what's dumb about it — that is literally the job.
			Three different retail systems means she can say "Kohl's did it this way, Best Buy does it
			that way, here's which is better and why." Very few entry-level analysts can say that.`,
		firstMove: 'Free Lean Six Sigma White Belt, then document one Best Buy process she\'d fix — that document is the interview.',
		timeline: '3–9 months to a first analyst role with a certificate and one written case study.'
	},
	{
		id: 'training-development',
		title: 'Training & Development',
		track: 'Specialist → Manager',
		emoji: '🎓',
		topPick: false,
		interests: ['training', 'people', 'leadership'],
		entry: { title: 'T&D specialist', median: 65850, confidence: 'bls' },
		ceiling: { title: 'T&D manager', median: 127090, confidence: 'bls' },
		growth: 6,
		source: {
			label: 'BLS — Training & Development Managers',
			url: 'https://www.bls.gov/ooh/management/training-and-development-managers.htm'
		},
		why: `She named training as her heaviest interest, and she already does it — the person who
			shows the new hires how the truck gets done is the department trainer without the title.
			The manager ceiling here ($127k) is the highest of any path she can reach without going
			back to school.`,
		firstMove: 'Build one real training doc for her current team. That artifact is the whole portfolio.',
		timeline: '6–18 months to specialist; manager is a 5–8 year climb.'
	},
	{
		id: 'supply-chain',
		title: 'Supply Chain & Logistics',
		track: 'Coordinator → Logistician → Ops Manager',
		emoji: '📦',
		topPick: false,
		interests: ['process', 'leadership'],
		entry: { title: 'Logistician', median: 80880, confidence: 'bls' },
		ceiling: { title: 'Transportation / storage / distribution manager', median: 102010, confidence: 'bls' },
		growth: 17,
		source: {
			label: 'BLS — Logisticians',
			url: 'https://www.bls.gov/ooh/business-and-financial/logisticians.htm'
		},
		why: `The shortest distance between where she is and a salary. Her warehouse years aren't
			"unrelated experience" here — they are the qualification. 17% growth is among the fastest
			of anything on this list, and employers in this field genuinely prefer people who have
			done the floor work.`,
		firstMove: 'Ask Best Buy what it takes to move into inventory control or scheduling. Internal moves are the cheapest path.',
		timeline: '0–12 months. This is the one she could start moving on at her current employer.'
	},
	{
		id: 'market-research',
		title: 'Market Research Analyst',
		track: 'Analyst → Senior → Insights Manager',
		emoji: '📊',
		topPick: false,
		interests: ['analysis'],
		entry: { title: 'Market research analyst', median: 76950, confidence: 'bls' },
		ceiling: { title: 'Insights / research manager', median: 120000, confidence: 'estimate' },
		growth: 7,
		source: {
			label: 'BLS — Market Research Analysts',
			url: 'https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm'
		},
		why: `She asked about this one by name. The unfair advantage is her aunt — the brand
			consulting work is directly adjacent, and a warm introduction beats a hundred cold
			applications. This is the path where she already knows someone on the inside.`,
		firstMove: 'A 30-minute call with her aunt about what the research side of the work actually looks like.',
		timeline: '6–12 months, faster if the aunt connection turns into real project work.'
	},
	{
		id: 'customer-success',
		title: 'Customer Success',
		track: 'CSM → Senior CSM → CS Lead',
		emoji: '🤝',
		topPick: false,
		interests: ['people', 'leadership'],
		entry: { title: 'Customer success manager', median: 75000, confidence: 'estimate' },
		ceiling: { title: 'Senior / lead CSM', median: 110000, confidence: 'estimate' },
		growth: null,
		source: {
			label: 'Self-reported aggregate (Indeed) — not a BLS occupation',
			url: 'https://www.indeed.com/career/customer-success-manager/salaries'
		},
		why: `The "coaching and empathy" job that actually pays. Customer success is helping people
			succeed with something, on a schedule, with numbers attached — the caring is the work,
			not a break from it. No degree requirement, no certification gate.`,
		firstMove: 'Free HubSpot certification, then apply. This field hires on personality evidence more than credentials.',
		timeline: '3–6 months. One of the fastest entries on this list.'
	},
	{
		id: 'operations-manager',
		title: 'Operations Manager',
		track: 'Supervisor → Ops Manager → Director',
		emoji: '🧭',
		topPick: false,
		interests: ['leadership', 'process'],
		entry: { title: 'Operations supervisor', median: 62000, confidence: 'estimate' },
		ceiling: { title: 'Operations manager', median: 101280, confidence: 'estimate' },
		growth: null,
		source: {
			label: 'BLS — Management Occupations overview',
			url: 'https://www.bls.gov/ooh/management/'
		},
		why: `The promotion-shaped path. If she likes where she is and wants to climb rather than
			switch, this is the ladder — and her part-time-to-full-time jump already proves she gets
			promoted.`,
		firstMove: 'Say out loud to her manager that she wants a supervisor track. Most people never do this.',
		timeline: '1–3 years, mostly internal.'
	},
	{
		id: 'human-resources',
		title: 'Human Resources',
		track: 'HR Specialist → HR Manager',
		emoji: '👥',
		topPick: false,
		interests: ['people', 'training'],
		entry: { title: 'HR specialist', median: 72910, confidence: 'bls' },
		ceiling: { title: 'HR manager', median: 140030, confidence: 'bls' },
		growth: null,
		source: {
			label: 'BLS — Human Resources Managers',
			url: 'https://www.bls.gov/ooh/management/human-resources-managers.htm'
		},
		why: `Overlaps heavily with the training interest, and the manager ceiling ($140k) is the
			highest BLS-verified number on this list outside of marketing. Retail HR specifically
			values people who have worked the floor — they know what they're hiring for.`,
		firstMove: 'Look at whether Best Buy has an internal HR or L&D team she could shadow.',
		timeline: '1–2 years to specialist; manager is a longer climb.'
	},
	{
		id: 'marketing-manager',
		title: 'Marketing Manager',
		track: 'Coordinator → Specialist → Manager',
		emoji: '📣',
		topPick: false,
		interests: ['analysis', 'leadership'],
		entry: { title: 'Marketing coordinator', median: 55000, confidence: 'estimate' },
		ceiling: { title: 'Marketing manager', median: 161030, confidence: 'bls' },
		growth: null,
		source: {
			label: 'BLS — Advertising, Promotions & Marketing Managers',
			url: 'https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm'
		},
		why: `Highest BLS-verified ceiling here, and the aunt's brand work is a real foot in the door.
			The honest catch: the entry rung pays less than she may make now, so this is a
			take-a-step-back-to-go-higher path.`,
		firstMove: 'Ask the aunt for one small paid project she can put on a resume.',
		timeline: '1–2 years to specialist, 5+ to manager.'
	},
	{
		id: 'tech-sales',
		title: 'Tech Sales',
		track: 'SDR → Account Executive',
		emoji: '🚀',
		topPick: false,
		interests: ['people'],
		entry: { title: 'Sales development rep', median: 65000, confidence: 'estimate' },
		ceiling: { title: 'Account executive (OTE)', median: 150000, confidence: 'estimate' },
		growth: null,
		source: {
			label: 'Self-reported aggregates — highly variable, commission-dependent',
			url: 'https://www.indeed.com/career/account-executive/salaries'
		},
		why: `The wildcard. Highest earning potential of anything reachable in under a year, no degree
			gate, hires on drive. The honest catch: it is quota pressure every single month, the
			"OTE" number is what you make if you hit target, and burnout is common. Worth knowing
			about; only worth doing if the pressure sounds energizing rather than exhausting.`,
		firstMove: 'Talk to one person actually doing the job before anything else.',
		timeline: '2–4 months to an SDR seat; 1–2 years to AE.'
	}
];

/**
 * Sort options offered in the UI. Add one by adding a comparator here — the
 * <select> is generated from these keys.
 *
 * 'recommended' keeps the hand-ranked array order above, which is the order
 * that actually reflects her situation rather than any single number.
 */
export const sorts = {
	recommended: { label: 'Recommended', fn: () => 0 },
	ceiling: { label: 'Highest ceiling', fn: (a, b) => b.ceiling.median - a.ceiling.median },
	entry: { label: 'Best starting pay', fn: (a, b) => b.entry.median - a.entry.median },
	growth: { label: 'Fastest growing', fn: (a, b) => (b.growth ?? -1) - (a.growth ?? -1) }
} satisfies Record<string, SortOption>;

export type SortKey = keyof typeof sorts;
