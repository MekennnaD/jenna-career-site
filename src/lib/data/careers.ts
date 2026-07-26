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
		roadmap: [
			{
				when: 'Weeks 1–2',
				action: 'Rewrite the resume in supply chain language',
				detail:
					'"Unloaded trucks" becomes inbound receiving and freight processing. "Organized the stockroom" becomes inventory organization and slotting. Same work, the words the job postings use. Three employers stop being three retail jobs and start being three supply chain systems you can compare.'
			},
			{
				when: 'Weeks 2–4',
				action: 'Ask your Best Buy supervisor what an internal move requires',
				detail:
					'Name the specific roles: inventory control, receiving lead, scheduling. Ask what the criteria are and who decides. Get the real answer rather than guessing — internal moves are the cheapest version of this entire plan and you already have the performance record.'
			},
			{
				when: 'Months 1–3',
				action: 'Audit Supply Chain Principles (Georgia Tech, via Coursera)',
				detail:
					'Free to audit. It gives you the formal vocabulary for what you already do by hand, and a line to cite when someone asks whether you know the field or just the floor.',
				cost: 'Free to audit'
			},
			{
				when: 'Months 2–5',
				action: 'Apply outward to coordinator titles',
				detail:
					'Target Inventory Control Analyst, Logistics Coordinator, Supply Chain Coordinator — at third-party logistics firms and distribution centers, not just retailers. These employers actively prefer people who have done the floor work.'
			},
			{
				when: 'Months 6–12',
				action: 'Get a certificate someone else pays for',
				detail:
					'Once you are inside a supply chain role, ask about reimbursement for APICS CPIM before spending your own money. Employers in this industry fund it routinely, and it is the credential that moves you toward the manager rung.',
				cost: 'Often employer-funded'
			}
		],
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
		roadmap: [
			{
				when: 'Weeks 1–3',
				action: 'Get genuinely comfortable in Excel',
				detail:
					'Pivot tables, XLOOKUP, and charting — free through Microsoft Learn. This is the actual gate on the role. Everything else on this list is easier than employers think; this is the part that is harder than you think.',
				cost: 'Free'
			},
			{
				when: 'Weeks 3–5',
				action: 'Take the free Lean Six Sigma White Belt',
				detail:
					'One afternoon through the Council for Six Sigma Certification. The value is not the certificate — it is learning that the things you already notice have names: waste, cycle time, throughput, bottleneck.',
				cost: 'Free'
			},
			{
				when: 'Months 1–2',
				action: 'Write the case study that becomes your interview',
				detail:
					'One to two pages on a single Best Buy process: what happens now, what it costs in hours or errors, what you would change, and what that would save. Use the Six Sigma vocabulary. You are the rare entry-level candidate who can point at a real operation and analyze it.'
			},
			{
				when: 'Months 2–4',
				action: 'Green Belt, but only on someone else\'s dime',
				detail:
					'If the White Belt clicked, ask Best Buy about reimbursement before paying. Roughly $220–350 out of pocket, and it appears by name in a lot of postings.',
				cost: '~$220–350'
			},
			{
				when: 'Months 3–9',
				action: 'Apply and lead with the document',
				detail:
					'Target Operations Analyst, Process Analyst, and Business Analyst (operations) roles. Attach or reference the case study in every application. It converts "she notices things" into evidence, which is the whole hiring problem here.'
			}
		],
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
		roadmap: [
			{
				when: 'Weeks 1–4',
				action: 'Build the onboarding doc your team doesn\'t have',
				detail:
					'You already teach new hires how the truck gets done. Write it down properly — steps, common mistakes, what good looks like. Ask your manager whether you can pilot it with the next new hire. It is a favor and a portfolio piece at the same time.'
			},
			{
				when: 'Months 1–3',
				action: 'Measure whether it worked',
				detail:
					'How long did the last new hire take to work unsupervised, versus the one who used your doc? Even a rough before-and-after turns a nice gesture into evidence. This single habit is what separates a trainer from someone who trains.'
			},
			{
				when: 'Months 2–4',
				action: 'Learn ADDIE',
				detail:
					'Audit an instructional design fundamentals course on Coursera for free. ADDIE is the framework named in the job postings — analyze, design, develop, implement, evaluate. You need the vocabulary more than the certificate.',
				cost: 'Free to audit'
			},
			{
				when: 'Months 3–6',
				action: 'Run one session in front of people',
				detail:
					'Volunteer to deliver a real training — safety, a system change, seasonal onboarding. Standing at the front of a room is the thing hiring managers want proof of, and it is hard to claim without having done it.'
			},
			{
				when: 'Months 6–18',
				action: 'Apply as a specialist, certify later',
				detail:
					'Target Training & Development Specialist, L&D Coordinator, Training Coordinator. Only consider ATD\'s APTD credential once you are getting interviews and it is the thing standing between you and an offer.',
				cost: 'APTD ~$499, later'
			}
		],
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
		roadmap: [
			{
				when: 'This week',
				action: 'Say out loud that you want a supervisor track',
				detail:
					'To your manager, in plain words. Ask what the criteria are and what the timeline looks like. Most people never actually do this, which is exactly why it works — you go from "good worker" to "candidate" in one conversation.'
			},
			{
				when: 'Months 1–6',
				action: 'Take the unglamorous ownership nobody volunteers for',
				detail:
					'Shift scheduling, training new hires, inventory audits, opening or closing. Supervisory experience is accumulated rather than granted, and these are the tasks that count as it later.'
			},
			{
				when: 'Months 6–12',
				action: 'Apply internally for team lead or shift supervisor',
				detail:
					'Internal candidates win these roles far more often than outside applicants, and you already have the part-time-to-full-time promotion on record as evidence.'
			},
			{
				when: 'Year 1–2',
				action: 'Learn the numbers your manager gets judged on',
				detail:
					'Labor hours, shrink, units per hour, schedule adherence. Supervisors get promoted to managers on comfort with the operating numbers, not on being liked. Ask your manager to walk you through their weekly report.'
			},
			{
				when: 'Year 2–3',
				action: 'Move up, internally or by leaving',
				detail:
					'Operations Manager at Best Buy, or the same title at a competitor. Be aware that competitors routinely pay more to poach someone who already knows the work — loyalty is rarely the higher-paying option.'
			}
		],
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
		roadmap: [
			{
				when: 'Weeks 1–2',
				action: 'Two free HubSpot Academy certifications',
				detail:
					'Customer Service and the CRM course. Genuinely free, genuinely recognized in this field, and finishable in a couple of evenings. This is the fastest credential-to-application turnaround on the entire site.',
				cost: 'Free'
			},
			{
				when: 'Weeks 2–4',
				action: 'Rewrite retail work as customer outcomes',
				detail:
					'Not "helped customers" — de-escalated complaints, retained sales that were about to walk, taught people how to use what they bought. Customer success is that, on a schedule, with a renewal number attached.'
			},
			{
				when: 'Months 1–2',
				action: 'Learn one CRM properly',
				detail:
					'HubSpot\'s free tier or Salesforce Trailhead. Postings name these tools explicitly, and "familiar with Salesforce" is a checkbox that gets resumes past filters.',
				cost: 'Free'
			},
			{
				when: 'Months 2–4',
				action: 'Apply wide, and target small companies',
				detail:
					'Small and mid-size software companies hire on how you talk to people rather than on pedigree. Large ones filter on prior SaaS experience you do not have yet. Aim where your actual strength is legible.'
			},
			{
				when: 'Months 3–6',
				action: 'Expect the volume and don\'t read it as rejection',
				detail:
					'This field pulls hundreds of applicants per remote posting. Forty applications is a normal search here, not a sign anything is wrong with you. Track them so the process feels like work rather than waiting.'
			}
		],
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
		roadmap: [
			{
				when: 'Weeks 1–4',
				action: 'Find your own HR department and ask to shadow it',
				detail:
					'Best Buy has HR people you have never met. Ask your manager for an introduction and request a day of shadowing. Internal curiosity reads as initiative, and it tells you fast whether the actual work appeals to you.'
			},
			{
				when: 'Months 1–3',
				action: 'Volunteer for anything hiring-adjacent',
				detail:
					'Sitting in on interviews, running onboarding, helping with scheduling or seasonal hiring. These are the resume lines that make an HR Coordinator application credible instead of aspirational.'
			},
			{
				when: 'Months 3–6',
				action: 'Decide on the aPHR',
				detail:
					'The entry-level HR credential that explicitly requires no prior HR experience — which is exactly your situation. It is the cleanest way to answer "but have you done HR before".',
				cost: '~$400'
			},
			{
				when: 'Months 6–12',
				action: 'Apply into retail HR first',
				detail:
					'Retail HR is the softest door for you, because they are hiring people to support work you have actually done. Target HR Coordinator and HR Assistant titles rather than Generalist at this stage.'
			},
			{
				when: 'Year 1–2',
				action: 'Coordinator to Specialist',
				detail:
					'Once inside, specialize toward the part you like — most likely learning and development, given your training interest. That is also where this path and the Training & Development path merge.'
			}
		],
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
		roadmap: [
			{
				when: 'Week 1',
				action: 'Talk to two people actually doing the job',
				detail:
					'Before anything else. Ask specifically about quota, what a bad month feels like, and how many people from their starting cohort are still there. This is the one path where the day-to-day matters more than the number, and the number is very good at hiding the day-to-day.'
			},
			{
				when: 'Weeks 2–4',
				action: 'Free HubSpot sales certification',
				detail:
					'Covers pipeline, prospecting, and the vocabulary of the field. Cheap insurance against sounding unfamiliar in a first interview.',
				cost: 'Free'
			},
			{
				when: 'Weeks 3–6',
				action: 'Reframe retail as sales evidence',
				detail:
					'Attach rates, upselling accessories and protection plans, handling objections from someone who already said no. You have been doing a version of this for years without calling it selling.'
			},
			{
				when: 'Months 1–3',
				action: 'Apply to SDR roles at mid-size software companies',
				detail:
					'They hire in cohorts and train from scratch, which is what you want — you are not trying to arrive qualified, you are trying to get into a program that qualifies you.'
			},
			{
				when: 'Months 12–24',
				action: 'Survive the quota, then take the promotion',
				detail:
					'SDR to Account Executive usually takes twelve to eighteen months of hitting target. That promotion is where the money on this card actually lives — and it is also where most people have already quit.'
			}
		],
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
		roadmap: [
			{
				when: 'Week 1',
				action: 'Thirty minutes with your aunt',
				detail:
					'Not a favor-ask — a what-does-this-actually-look-like conversation. She is the single biggest advantage you have on this path, and the gap between a warm introduction and a cold application here is enormous.'
			},
			{
				when: 'Months 1–3',
				action: 'Excel to a real standard, then start SQL',
				detail:
					'This is the barrier, stated plainly. Free through SQLBolt and Mode\'s SQL tutorial. Market research postings assume you can pull and shape data yourself, and that assumption is what filters out liberal arts applicants.',
				cost: 'Free'
			},
			{
				when: 'Months 2–4',
				action: 'Ask your aunt for one small paid project',
				detail:
					'A competitor scan, a customer survey, a handful of customer interviews written up. Small is fine. What you need is one dated, client-facing research line on your resume that is not retail.'
			},
			{
				when: 'Months 3–6',
				action: 'Google Data Analytics Certificate',
				detail:
					'Directly addresses the credential gap that makes this path a stretch. Coursera financial aid is available and routinely approved — apply for it rather than paying the monthly rate.',
				cost: '~$49/mo, aid available'
			},
			{
				when: 'Months 6–12',
				action: 'Apply, leading with the project rather than the warehouse',
				detail:
					'Target Research Analyst, Insights Analyst, and Market Research Coordinator. Your resume should open with the consulting project and the data skills — the retail history is supporting evidence here, not the headline.'
			}
		],
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
		roadmap: [
			{
				when: 'Weeks 1–4',
				action: 'Ask your aunt for one paid project with a deadline',
				detail:
					'A deliverable and a date, not "helping out". Unpaid family help does not read as experience; a dated project with a client name does. This is the step that makes everything after it possible.'
			},
			{
				when: 'Months 1–3',
				action: 'Google Digital Marketing & E-commerce Certificate',
				detail:
					'Covers the vocabulary gap — channels, funnels, attribution, campaign metrics. Financial aid available through Coursera. Marketing hires on portfolio more than credential, but you need to sound fluent first.',
				cost: '~$49/mo, aid available'
			},
			{
				when: 'Months 3–6',
				action: 'Build a three-piece portfolio',
				detail:
					'One campaign brief, one competitor analysis, one piece of real copy. They can be speculative — marketing is one of the few fields where good self-directed work counts as evidence.'
			},
			{
				when: 'Months 6–12',
				action: 'Apply to coordinator roles with your eyes open',
				detail:
					'Marketing Coordinator and Marketing Assistant. Do the arithmetic on the pay first: the entry rung here may pay less than your current full-time warehouse income, and that trade-off is real rather than theoretical.'
			},
			{
				when: 'Year 2–5',
				action: 'Specialist, then manager',
				detail:
					'This ladder genuinely reaches the highest number on the site. It is also the slowest route here, and it needs marketing-specific years rather than adjacent ones. Worth it only if the work itself appeals.'
			}
		],
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
