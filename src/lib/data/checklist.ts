import type { ChecklistItem } from '$lib/types';

/**
 * The actual to-do list. Progress is saved in the browser (see $lib/storage),
 * so it survives a refresh but stays entirely on her own device — nothing here
 * is uploaded anywhere.
 *
 * Ordered so that the free, low-effort, highest-leverage items come first.
 */
export const checklist: ChecklistItem[] = [
	{
		id: 'resume-translate',
		group: 'This week',
		label: 'Rewrite all four jobs in business language',
		detail:
			'Best Buy, Kohl\'s, Target, and the consulting work. Use the translation table on the home page — this single change does more than any certificate.'
	},
	{
		id: 'aunt-call',
		group: 'This week',
		label: 'Thirty minutes with her aunt',
		detail:
			'Not a favor-ask — a "what does your work actually look like day to day" conversation. This is the warmest lead she has for the market research path.'
	},
	{
		id: 'white-belt',
		group: 'This week',
		label: 'Free Six Sigma White Belt',
		detail: 'One afternoon, $0. Tells her fast whether process improvement is the thing.'
	},
	{
		id: 'hubspot',
		group: 'This week',
		label: 'One free HubSpot certification',
		detail: 'Another $0 signal test, this time for the customer success direction.'
	},
	{
		id: 'internal-ask',
		group: 'This month',
		label: 'Ask Best Buy about inventory control or scheduling',
		detail:
			'The cheapest career move available to her is an internal one. Ask what it would take — the answer costs nothing to find out.'
	},
	{
		id: 'training-doc',
		group: 'This month',
		label: 'Write one real training document',
		detail:
			'The onboarding doc her team doesn\'t have. It\'s a portfolio piece, a favor, and an argument for a promotion all at once.'
	},
	{
		id: 'linkedin',
		group: 'This month',
		label: 'LinkedIn profile with the new language',
		detail: 'Recruiters for logistics and ops roles search this. Right now she is invisible to them.'
	},
	{
		id: 'process-writeup',
		group: 'This month',
		label: 'Write up one process she would fix',
		detail:
			'One page: what happens now, why it\'s wasteful, what she\'d change. This document is the analyst interview.'
	},
	{
		id: 'informational',
		group: 'Next 90 days',
		label: 'Talk to three people doing these jobs',
		detail:
			'One logistics, one training, one analyst. Most people say yes to a 20-minute chat. This is how she finds out what she actually wants.'
	},
	{
		id: 'green-belt',
		group: 'Next 90 days',
		label: 'Decide on Green Belt — and ask who pays',
		detail:
			'Only after White Belt. Ask her employer about reimbursement before spending her own money.'
	},
	{
		id: 'apply-five',
		group: 'Next 90 days',
		label: 'Apply to five roles, even if underqualified',
		detail:
			'Job postings are wish lists, not requirements. Applying is free and the feedback is real information.'
	}
];

/** Group headings, in display order. */
export const checklistGroups = ['This week', 'This month', 'Next 90 days'];
