import type { Career, SortOption } from '$lib/types';

/**
 * Career paths, ranked for one specific person.
 *
 * ADDING A PATH: copy any object below and change the fields. Nothing else in
 * the app needs to know about it — the cards, filters, sort and chart all read
 * from this array.
 *
 * ON THE NUMBERS: `median` values are U.S. national medians from the BLS
 * Occupational Outlook Handbook, May 2024 wage data, with employment growth
 * projected 2024–34. Every figure links to the page it came from so it can be
 * checked. National medians hide a lot — a first job in a low cost-of-living
 * metro will start under these. They rank paths against each other; they don't
 * predict a paycheck.
 *
 * Anything BLS doesn't track as a distinct occupation is marked
 * `confidence: 'estimate'` — a self-reported aggregate. Much softer, and the UI
 * says so rather than presenting it at equal confidence.
 *
 * ON DIFFICULTY: rated from Jenna's actual position, not in the abstract.
 * Difficulty is ramp; competition is applicant volume. They're different axes.
 */

export const WAGE_VINTAGE = 'BLS median wages, May 2024 · employment growth projected 2024–34';

export const careers: Career[] = [
	{
		id: 'supply-chain',
		title: 'Supply Chain & Logistics',
		track: 'Coordinator → Logistician → Distribution Manager',
		emoji: '📦',
		topPick: true,
		interests: ['process', 'leadership'],
		entry: { title: 'Logistician', median: 80880, confidence: 'bls' },
		ceiling: {
			title: 'Transportation / storage / distribution manager',
			median: 102010,
			confidence: 'bls'
		},
		growth: 17,
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Very doable',
			competition: 'Moderate',
			timeToEntry: '0–12 months',
			barrier:
				'Almost none on paper — the gap is vocabulary, not capability. You have to stop describing this as "warehouse work" and start describing it as inventory flow, receiving, and throughput. Some employers want a certificate; most want someone who has actually done it.'
		},
		why: `This is the shortest distance between where you are and a real salary. Your warehouse
			years aren't unrelated experience here — they are the qualification. Three retailers means
			you've seen three systems and can compare them, which is exactly what this field asks you to
			do. And 17% growth is among the fastest on this list, so the doors keep opening.`,
		firstMove:
			'Ask Best Buy what it takes to move into inventory control, scheduling, or receiving lead. An internal move is the cheapest version of this whole plan.',
		sources: [
			{
				label: 'BLS — Logisticians',
				url: 'https://www.bls.gov/ooh/business-and-financial/logisticians.htm',
				backs: 'Entry pay ($80,880) and 17% growth'
			},
			{
				label: 'BLS — Transportation, Storage & Distribution Managers',
				url: 'https://www.bls.gov/ooh/management/transportation-storage-and-distribution-managers.htm',
				backs: 'Ceiling pay ($102,010)'
			}
		]
	},
	{
		id: 'process-analyst',
		title: 'Process / Operations Analyst',
		track: 'Analyst → Senior Analyst → Manager',
		emoji: '⚙️',
		topPick: false,
		interests: ['process', 'analysis'],
		entry: { title: 'Operations / process analyst', median: 60000, confidence: 'estimate' },
		ceiling: { title: 'Management analyst', median: 101190, confidence: 'bls' },
		growth: 9,
		attainability: {
			difficulty: 3,
			difficultyLabel: 'A real climb, but a fair one',
			competition: 'Moderate',
			timeToEntry: '3–9 months',
			barrier:
				'You need to prove you can analyze, not just notice. That means comfortable Excel (pivot tables, lookups) and ideally a written example of a process you\'d fix. Nobody will take the instinct on faith — but one good document is enough evidence.'
		},
		why: `You already do the thinking part. Four jobs spent watching how product moves and quietly
			noticing what's wasteful about it is the actual work of this role. Very few entry-level
			analysts can say "Kohl's did it this way, Best Buy does it that way, here's which is better
			and why" — you can, and that sentence is an interview answer.`,
		firstMove:
			'Write one page: a process at work that\'s wasteful, why, and what you\'d change. That document is the interview.',
		sources: [
			{
				label: 'BLS — Management Analysts',
				url: 'https://www.bls.gov/ooh/business-and-financial/management-analysts.htm',
				backs: 'Ceiling pay ($101,190) and 9% growth'
			}
		]
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
		attainability: {
			difficulty: 3,
			difficultyLabel: 'A real climb, but a fair one',
			competition: 'High',
			timeToEntry: '6–18 months',
			barrier:
				'This field attracts a lot of former teachers, and they arrive with instructional experience you don\'t have on paper yet. The counter is a portfolio — one real training document beats a resume line. Expect the manager rung to be a five-to-eight year climb, not a jump.'
		},
		why: `You named training as your heaviest interest, and you already do it — the person who shows
			the new hires how the truck gets done is the department trainer without the title. The
			ceiling here ($127,090) is the highest of anything on this list you can reach without going
			back to school.`,
		firstMove:
			'Build the onboarding doc your team doesn\'t have. It\'s a portfolio piece and a favor at the same time.',
		sources: [
			{
				label: 'BLS — Training & Development Specialists',
				url: 'https://www.bls.gov/ooh/business-and-financial/training-and-development-specialists.htm',
				backs: 'Entry pay ($65,850)'
			},
			{
				label: 'BLS — Training & Development Managers',
				url: 'https://www.bls.gov/ooh/management/training-and-development-managers.htm',
				backs: 'Ceiling pay ($127,090) and 6% growth'
			}
		]
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
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Very doable',
			competition: 'Moderate',
			timeToEntry: '1–3 years',
			barrier:
				'You need supervisory time before the manager title, and that\'s measured in years rather than months. The upside is you can start accruing it at your current job without applying anywhere.'
		},
		why: `The promotion-shaped path. If you like where you are and would rather climb than switch,
			this is the ladder — and going part-time to full-time on your own performance already proves
			you're someone who gets promoted.`,
		firstMove:
			'Say out loud to your manager that you want a supervisor track. Most people never actually do this, which is why it works.',
		sources: [
			{
				label: 'BLS — Management Occupations overview',
				url: 'https://www.bls.gov/ooh/management/',
				backs: 'Context for operations management pay (both figures here are estimates)'
			}
		]
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
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Very doable',
			competition: 'High',
			timeToEntry: '3–6 months',
			barrier:
				'Easy to qualify for, crowded to apply into. Most postings prefer prior software or SaaS exposure, and remote roles pull hundreds of applicants. Retail service experience is a legitimate answer to that — but you will be applying against volume.'
		},
		why: `The "help people, be good with people" job that actually pays properly. Customer success is
			helping someone succeed with a product, on a schedule, with numbers attached — the caring is
			the work, not a break from it. No degree gate and no certification gate.`,
		firstMove:
			'Free HubSpot Academy certification, then start applying. This field hires on how you talk to people more than on credentials.',
		sources: [
			{
				label: 'Indeed — Customer Success Manager salaries (self-reported)',
				url: 'https://www.indeed.com/career/customer-success-manager/salaries',
				backs: 'Both pay figures — BLS does not track this as a distinct occupation'
			}
		]
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
		attainability: {
			difficulty: 3,
			difficultyLabel: 'A real climb, but a fair one',
			competition: 'High',
			timeToEntry: '1–2 years',
			barrier:
				'HR is a popular landing spot for liberal arts grads, so entry roles get a lot of applicants. Many postings want HR-specific coursework or a PHR certification. Retail HR is the softer door — they value people who have worked the floor.'
		},
		why: `Overlaps heavily with your training interest, and the manager ceiling ($140,030) is the
			second-highest BLS-verified number on this list. Retail HR in particular values someone who
			has done the job they're hiring for — you'd be interviewing people to do work you've
			actually done.`,
		firstMove:
			'Find out whether Best Buy has an internal HR or L&D team you could shadow for a day.',
		sources: [
			{
				label: 'BLS — Human Resources Specialists',
				url: 'https://www.bls.gov/ooh/business-and-financial/human-resources-specialists.htm',
				backs: 'Entry pay ($72,910)'
			},
			{
				label: 'BLS — Human Resources Managers',
				url: 'https://www.bls.gov/ooh/management/human-resources-managers.htm',
				backs: 'Ceiling pay ($140,030)'
			}
		]
	},
	{
		id: 'tech-sales',
		title: 'Tech Sales',
		track: 'SDR → Account Executive',
		emoji: '🚀',
		topPick: false,
		interests: ['people'],
		entry: { title: 'Sales development rep', median: 65000, confidence: 'estimate' },
		ceiling: { title: 'Account executive (on-target earnings)', median: 150000, confidence: 'estimate' },
		growth: null,
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Easy to enter, hard to stay',
			competition: 'High',
			timeToEntry: '2–4 months',
			barrier:
				'The real barrier is after you get hired, not before. Quota pressure is monthly and relentless, the "on-target earnings" number is what you make only if you hit target, and turnover in the first year is high. Fast money if it suits you, exhausting if it doesn\'t.'
		},
		why: `The wildcard. Highest earning potential of anything reachable inside a year, no degree gate,
			hires on drive rather than credentials. Worth knowing about — worth doing only if monthly
			pressure sounds energizing rather than draining.`,
		firstMove:
			'Talk to one person actually doing the job before anything else. This is the path where the day-to-day matters more than the number.',
		sources: [
			{
				label: 'Indeed — Account Executive salaries (self-reported)',
				url: 'https://www.indeed.com/career/account-executive/salaries',
				backs: 'Both pay figures — commission-dependent and highly variable'
			}
		]
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
		attainability: {
			difficulty: 4,
			difficultyLabel: 'A stretch — but you have a shortcut',
			competition: 'High',
			timeToEntry: '6–12 months',
			barrier:
				'The hardest door on this list to open cold. Most postings want statistics or survey methodology coursework and real spreadsheet or SQL skill, and they lean toward quantitative degrees. Your shortcut is your aunt — a warm introduction sidesteps the pile that a cold application lands in.'
		},
		why: `You asked about this one by name, which counts for a lot. The unfair advantage is the brand
			consulting work with your aunt — it's directly adjacent, and it's the one place you already
			know someone on the inside. Cold, this is a stretch; warm, it's very reachable.`,
		firstMove:
			'A 30-minute call with your aunt about what the research side of her work actually looks like. Not a favor-ask — a what-is-this-really-like conversation.',
		sources: [
			{
				label: 'BLS — Market Research Analysts',
				url: 'https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm',
				backs: 'Entry pay ($76,950) and 7% growth'
			}
		]
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
		attainability: {
			difficulty: 4,
			difficultyLabel: 'A stretch, and a slow one',
			competition: 'High',
			timeToEntry: '1–2 years to coordinator, 5+ to manager',
			barrier:
				'Two catches, both real. The entry rung pays less than you may make now, so this is a step back before a step up. And the manager number at the top takes years of marketing-specific track record — it is not a title you reach from adjacent work.'
		},
		why: `Highest BLS-verified ceiling on this list, and your aunt's brand work is a genuine foot in
			the door. Included honestly rather than enthusiastically: the ceiling is real, the road there
			is the longest here.`,
		firstMove:
			'Ask your aunt for one small paid project you can put on a resume with a date on it.',
		sources: [
			{
				label: 'BLS — Advertising, Promotions & Marketing Managers',
				url: 'https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm',
				backs: 'Ceiling pay ($161,030)'
			}
		]
	}
];

/**
 * Sort options offered in the UI. Add one by adding a comparator here — the
 * <select> is generated from these keys.
 *
 * 'recommended' keeps the hand-ranked array order above, which weighs fit and
 * realism together rather than optimizing any single number.
 */
export const sorts = {
	recommended: { label: 'Recommended for you', fn: () => 0 },
	easiest: {
		label: 'Easiest to get into',
		fn: (a, b) => a.attainability.difficulty - b.attainability.difficulty
	},
	ceiling: { label: 'Highest ceiling', fn: (a, b) => b.ceiling.median - a.ceiling.median },
	entry: { label: 'Best starting pay', fn: (a, b) => b.entry.median - a.entry.median },
	growth: { label: 'Fastest growing', fn: (a, b) => (b.growth ?? -1) - (a.growth ?? -1) }
} satisfies Record<string, SortOption>;

export type SortKey = keyof typeof sorts;

/** Every source used anywhere on the site, de-duplicated, for the audit section. */
export function allSources() {
	const seen = new Map<string, { label: string; url: string; usedBy: string[] }>();
	for (const career of careers) {
		for (const source of career.sources) {
			const existing = seen.get(source.url);
			if (existing) {
				existing.usedBy.push(`${career.title} — ${source.backs}`);
			} else {
				seen.set(source.url, {
					label: source.label,
					url: source.url,
					usedBy: [`${career.title} — ${source.backs}`]
				});
			}
		}
	}
	return [...seen.values()];
}
