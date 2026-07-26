/**
 * Certification paths — ordered cheap → expensive, every path starting at $0.
 *
 * The idea: try two or three of the free first steps and notice which one she
 * can't put down. That signal is worth more than any amount of deliberating.
 *
 * ON PRICES: these move. Each step links to the provider so the real number is
 * one click away — treat the figures here as "roughly what to expect", and
 * always check before paying. Nothing here should be bought before the free
 * step in the same path has been finished.
 */

import type { CertPath, FreeStarter } from '$lib/types';

export const certPaths: CertPath[] = [
	{
		id: 'process',
		title: 'Process Improvement',
		emoji: '⚙️',
		matchesInterest: true,
		leadsTo: 'Process / operations analyst · Management analyst',
		pitch: 'The most direct credential-to-job line on this page, and the one that best matches what she already does by instinct.',
		steps: [
			{
				name: 'Lean Six Sigma White Belt',
				cost: 0,
				costLabel: 'Free',
				time: '2–3 hours',
				provider: 'Council for Six Sigma Certification',
				url: 'https://www.sixsigmacouncil.org/six-sigma-training-material/',
				note: 'Start here. Free, same afternoon, and it tells her whether the vocabulary clicks.'
			},
			{
				name: 'Yellow Belt',
				cost: 100,
				costLabel: '~$100',
				time: '2–4 weeks',
				provider: 'CSSC',
				url: 'https://www.sixsigmacouncil.org/',
				note: 'Optional middle rung. Skippable if White Belt felt easy.'
			},
			{
				name: 'Green Belt',
				cost: 300,
				costLabel: '~$220–350',
				time: '2–3 months',
				provider: 'IASSC / CSSC',
				url: 'https://iassc.org/six-sigma-certification/green-belt-certification/',
				note: 'This is the one that shows up in job postings. Many employers reimburse it — ask before paying.'
			}
		]
	},
	{
		id: 'training',
		title: 'Training & Development',
		emoji: '🎓',
		matchesInterest: true,
		leadsTo: 'T&D specialist → T&D manager ($127k median)',
		pitch: 'Her stated heaviest interest. The portfolio matters more than the credential here — build first, certify later.',
		steps: [
			{
				name: 'Build one real training document',
				cost: 0,
				costLabel: 'Free',
				time: 'A weekend',
				provider: 'Her current job',
				url: null,
				note: 'Write the onboarding doc her team doesn\'t have. This is a portfolio piece and a favor at the same time.'
			},
			{
				name: 'Instructional design fundamentals',
				cost: 0,
				costLabel: 'Free / audit',
				time: '4–6 weeks',
				provider: 'Coursera (audit mode)',
				url: 'https://www.coursera.org/courses?query=instructional%20design',
				note: 'Audit for free; only pay if she wants the certificate on LinkedIn.'
			},
			{
				name: 'ATD — APTD credential',
				cost: 499,
				costLabel: '~$499 + membership',
				time: '3–6 months',
				provider: 'Association for Talent Development',
				url: 'https://www.td.org/certification',
				note: 'The recognized credential in the field. Real money — only after the free steps confirm the interest.'
			}
		]
	},
	{
		id: 'customer-success',
		title: 'Customer Success',
		emoji: '🤝',
		matchesInterest: true,
		leadsTo: 'Customer success manager',
		pitch: 'The "help people, be empathetic, get paid properly" job. Lowest credential barrier of anything here.',
		steps: [
			{
				name: 'HubSpot Academy certifications',
				cost: 0,
				costLabel: 'Free',
				time: '4–8 hours each',
				provider: 'HubSpot',
				url: 'https://academy.hubspot.com/courses',
				note: 'Genuinely free and genuinely recognized. Do the service and CRM ones.'
			},
			{
				name: 'Start applying',
				cost: 0,
				costLabel: 'Free',
				time: 'Ongoing',
				provider: '—',
				url: null,
				note: 'This field hires on how someone talks to people. The certificate opens the door; the conversation gets the job.'
			}
		]
	},
	{
		id: 'ops-leadership',
		title: 'Operations & Supply Chain Leadership',
		emoji: '📦',
		matchesInterest: false,
		leadsTo: 'Logistician · Distribution manager',
		pitch: 'Builds directly on the warehouse years instead of asking her to start over. Most employer-reimbursable path here.',
		steps: [
			{
				name: 'Ask her employer what an internal move takes',
				cost: 0,
				costLabel: 'Free',
				time: 'One conversation',
				provider: 'Best Buy',
				url: null,
				note: 'Inventory control, scheduling, receiving lead. The cheapest career move available to her is the one that doesn\'t require leaving — and asking costs nothing.'
			},
			{
				name: 'Supply Chain Principles',
				cost: 0,
				costLabel: 'Free to audit',
				time: '3–4 weeks',
				provider: 'Georgia Tech / Coursera',
				url: 'https://www.coursera.org/learn/supply-chain-principles',
				note: 'Confirms whether the formal side of the work interests her as much as the floor side.'
			},
			{
				name: 'Google Project Management Certificate',
				cost: 49,
				costLabel: '~$49/mo, ~3 months',
				time: '3–6 months',
				provider: 'Coursera',
				url: 'https://www.coursera.org/professional-certificates/google-project-management',
				note: 'Financial aid is available and routinely approved — apply for it rather than paying full price.'
			},
			{
				name: 'APICS CPIM',
				cost: 1500,
				costLabel: '~$1,000–2,000',
				time: '6–12 months',
				provider: 'ASCM',
				url: 'https://www.ascm.org/learning-development/certifications-credentials/cpim/',
				note: 'Expensive on her own, routinely paid for by employers in this industry. Ask Best Buy first.'
			}
		]
	},
	{
		id: 'meaning',
		title: 'Meaning, Purpose & Coaching',
		emoji: '🌱',
		matchesInterest: true,
		leadsTo: 'Coaching · L&D · or just a better map of herself',
		pitch: 'The honest one: this path is worth exploring for free and worth paying for only if she falls in love with it.',
		steps: [
			{
				name: 'The Science of Well-Being (Yale)',
				cost: 0,
				costLabel: 'Free to audit',
				time: '4–6 weeks',
				provider: 'Coursera / Yale',
				url: 'https://www.coursera.org/learn/the-science-of-well-being',
				note: 'The most-taken course in Coursera\'s history for a reason. Costs nothing but time.'
			},
			{
				name: 'Foundations of Positive Psychology',
				cost: 0,
				costLabel: 'Free to audit',
				time: '2–3 months',
				provider: 'Penn / Coursera',
				url: 'https://www.coursera.org/specializations/positivepsychology',
				note: 'Deeper. Still free to audit.'
			},
			{
				name: 'ICF-accredited coach training',
				cost: 3400,
				costLabel: '$3,400+',
				time: '6–12 months',
				provider: 'Various ICF-accredited schools',
				url: 'https://coachingfederation.org/credentials-and-standards',
				note: 'Flagged honestly: this is a lot of money, coaching income is unpredictable, and it should be the last step, not the first. Only if the free courses genuinely light her up.'
			}
		]
	}
];

/** The "try this week, costs nothing" strip. Pulled from the $0 steps above. */
export const freeStarters: FreeStarter[] = [
	{ label: 'Six Sigma White Belt', pathId: 'process', time: 'One afternoon' },
	{ label: 'HubSpot Academy', pathId: 'customer-success', time: 'A few hours' },
	{ label: 'Yale — Science of Well-Being', pathId: 'meaning', time: 'A few weeks' },
	{ label: 'Write one training doc', pathId: 'training', time: 'A weekend' }
];
