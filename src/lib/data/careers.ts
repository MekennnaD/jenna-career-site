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
		gem: 'emerald',
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
		id: 'field-trainer',
		title: 'Field Trainer',
		track: 'Store trainer → District trainer → Regional L&D',
		gem: 'amethyst',
		topPick: false,
		interests: ['training', 'people', 'leadership'],
		entry: { title: 'T&D specialist', median: 65850, confidence: 'bls' },
		ceiling: { title: 'T&D manager', median: 127090, confidence: 'bls' },
		growth: 6,
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Very doable',
			competition: 'Moderate',
			timeToEntry: '6–12 months',
			barrier:
				'The roles live inside large retail and restaurant chains, so it depends on being in the right company when a slot opens — and it usually means driving between stores. The advantage is that chains promote trainers off their own floor far more often than they hire from outside.'
		},
		why: `Your heaviest stated interest, reached through the industry you already know instead of
			against it. Applying to corporate L&D puts you in a pile with career-changing teachers.
			Applying to be a field trainer puts you in a pile with other retail employees — and you have
			three chains, overnight shifts, and a promotion on your record. You would be teaching work
			you have actually done, to people doing the job you actually did.`,
		roadmap: [
			{
				when: 'Weeks 1–2',
				action: 'Ask who trains new hires across your district',
				detail:
					'Every chain has this person and most employees have never met them. Find out whether they came from the floor, what the role is called internally, and who they report to. You are looking for a job title to aim at, not a favor.'
			},
			{
				when: 'Weeks 2–6',
				action: 'Become the person who trains at your store',
				detail:
					'Officially. Ask your manager to route new hires to you and to note it somewhere. Informal training is invisible to hiring systems; the same work with a label on it becomes experience.'
			},
			{
				when: 'Months 1–3',
				action: 'Build the onboarding doc your store is missing',
				detail:
					'Steps, common mistakes, what good looks like. This is the same artifact the Training & Development path needs, so the work counts twice if you end up choosing that route instead.'
			},
			{
				when: 'Months 2–5',
				action: 'Learn how trainers get measured',
				detail:
					'Time-to-productive, ninety-day retention, audit scores. Track your store\'s before and after. A trainer who talks about retention numbers rather than enthusiasm is the one who gets the district job.'
			},
			{
				when: 'Months 6–12',
				action: 'Apply internally first, then to other chains',
				detail:
					'Target Field Trainer, District Trainer, Retail Training Specialist. If Best Buy has no opening, competitors hire the same profile — and your three-retailer history is unusually strong for this specific role.'
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
		id: 'safety-specialist',
		title: 'Health & Safety Specialist',
		track: 'Safety coordinator → EHS specialist → Safety manager',
		gem: 'citrine',
		topPick: false,
		interests: ['process', 'people', 'leadership'],
		entry: { title: 'Occupational health & safety technician', median: 58440, confidence: 'bls' },
		ceiling: { title: 'Occupational health & safety specialist', median: 83910, confidence: 'bls' },
		growth: null,
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Very doable',
			competition: 'Low',
			timeToEntry: '3–9 months',
			barrier:
				'The least crowded door on this page. OSHA 30 costs a couple hundred dollars and takes a few days. The real catch is temperamental rather than technical: the job involves telling people to stop doing things the fast way, which means being comfortable being briefly unpopular with people you like.'
		},
		why: `Warehouse experience isn't merely relevant here — it is the qualification. You already know
			which corners get cut at 2am, because you have worked those shifts and been tired enough to
			consider cutting them. This is process improvement where the thing being improved is whether
			somebody goes home intact. Distribution centers hire for it constantly and almost never see
			applicants who have done the floor work.`,
		roadmap: [
			{
				when: 'Weeks 1–3',
				action: 'Take OSHA 30 for General Industry',
				detail:
					'The single highest return-per-dollar credential on this entire site. It is the thing postings ask for, it takes a few days online, and it is cheap enough to buy yourself if your employer will not.',
				cost: '~$160–200'
			},
			{
				when: 'Weeks 2–6',
				action: 'Volunteer for your site\'s safety committee',
				detail:
					'Most warehouses have one and most are short of volunteers. It gives you incident reviews, walkthroughs, and audit language on your resume without changing jobs.'
			},
			{
				when: 'Months 1–3',
				action: 'Write up one near-miss properly',
				detail:
					'Pick something real you have seen — a blocked aisle, a bad lift, a pallet stacked wrong. Document the hazard, the root cause, and the fix. Safety hiring runs on whether you can think in root causes, and this is how you show it.'
			},
			{
				when: 'Months 3–6',
				action: 'Apply to coordinator and technician titles',
				detail:
					'Target Safety Coordinator, EHS Technician, Safety Specialist at distribution centers, manufacturers, and third-party logistics firms. Your floor experience is the differentiator, so lead with it rather than apologizing for it.'
			},
			{
				when: 'Months 9–24',
				action: 'Move toward the specialist rung',
				detail:
					'Once inside, ask about employer-funded progression toward the CSP or ASP credentials. This field funds its own certifications more reliably than most, and they are what separate the technician pay band from the specialist one.',
				cost: 'Often employer-funded'
			}
		],
		sources: [
			{
				label: 'BLS — Occupational Health & Safety Specialists and Technicians',
				url: 'https://www.bls.gov/ooh/healthcare/occupational-health-and-safety-specialists-and-technicians.htm',
				backs: 'Entry pay ($58,440, technicians) and ceiling pay ($83,910, specialists)'
			}
		]
	},
	{
		id: 'project-management',
		title: 'Project Management',
		track: 'Coordinator → PM Specialist → Senior PM',
		gem: 'sapphire',
		topPick: false,
		interests: ['process', 'leadership'],
		entry: { title: 'Project coordinator', median: 62000, confidence: 'estimate' },
		ceiling: { title: 'Project management specialist', median: 100750, confidence: 'bls' },
		growth: 6,
		attainability: {
			difficulty: 3,
			difficultyLabel: 'A real climb, but a fair one',
			competition: 'High',
			timeToEntry: '6–12 months',
			barrier:
				'Your degree gets you past the filter — BLS lists a bachelor\'s as typical entry, and you have one. What you need is vocabulary (scope, stakeholders, dependencies, critical path) and one project you can narrate start to finish. It is a popular target for career changers, so expect volume.'
		},
		why: `"The way of stuff" applied to work instead of product. Sequencing tasks, spotting what
			blocks what, keeping people pointed the same direction while a clock runs — you do this on a
			truck shift already. It is also one of the largest occupations here, with roughly 78,200
			openings a year, which means the door is wide even if the hallway is busy.`,
		roadmap: [
			{
				when: 'Weeks 1–4',
				action: 'Google Project Management Certificate',
				detail:
					'The standard on-ramp, and Coursera financial aid is routinely approved — apply for it rather than paying monthly. It gives you the vocabulary gap in one package.',
				cost: '~$49/mo, aid available'
			},
			{
				when: 'Months 1–2',
				action: 'Name a project you have already run',
				detail:
					'A seasonal floor reset, a holiday inventory push, onboarding a group of new hires. Write it up as scope, timeline, people involved, what went wrong, what you changed. You have run projects; you have just never called them that.'
			},
			{
				when: 'Months 2–4',
				action: 'Volunteer to coordinate something at work',
				detail:
					'A store reset, an audit, a seasonal changeover. Ask to own the schedule and the checklist. Coordinating is the job title one rung below the one you want, and doing it internally is free.'
			},
			{
				when: 'Months 4–8',
				action: 'Apply to coordinator titles, not specialist ones',
				detail:
					'Project Coordinator, Operations Coordinator, Program Coordinator. Aiming one rung lower than the ceiling is what makes this path work in under a year rather than three.'
			},
			{
				when: 'Months 12–24',
				action: 'CAPM, then PMP once you have the hours',
				detail:
					'PMP requires documented project hours, which is why it comes after the first role rather than before. CAPM is the version you can sit for without them.',
				cost: 'CAPM ~$225–300'
			}
		],
		sources: [
			{
				label: 'BLS — Project Management Specialists',
				url: 'https://www.bls.gov/ooh/business-and-financial/project-management-specialists.htm',
				backs: 'Ceiling pay ($100,750), 6% growth, and the ~78,200 annual openings figure'
			}
		]
	},
	{
		id: 'instructional-design',
		title: 'Instructional Design',
		track: 'Training coordinator → Instructional designer → Senior ID',
		gem: 'tanzanite',
		topPick: false,
		interests: ['training', 'analysis'],
		entry: { title: 'T&D specialist', median: 65850, confidence: 'bls' },
		ceiling: { title: 'Senior instructional designer', median: 95000, confidence: 'estimate' },
		growth: 6,
		attainability: {
			difficulty: 3,
			difficultyLabel: 'A real climb, but a fair one',
			competition: 'High',
			timeToEntry: '9–18 months',
			barrier:
				'Strictly portfolio-gated — nobody hires an instructional designer without seeing something they built. The authoring tools (Articulate Storyline, Rise) cost real money outside of trial periods, and the field is crowded with career-changing teachers who arrive already knowing the theory.'
		},
		why: `The building side of training rather than the delivering side. If the part you like is
			making a confusing thing clear — working out the right order to explain something in, and
			what someone needs to know before they can understand the next bit — this is that, as a
			full-time job. It also rewards the writing your degree actually trained you to do.`,
		roadmap: [
			{
				when: 'Weeks 1–4',
				action: 'Learn ADDIE and one other model',
				detail:
					'Audit an instructional design fundamentals course free on Coursera. ADDIE is named directly in most postings. You need to speak the framework before anything you build reads as professional.',
				cost: 'Free to audit'
			},
			{
				when: 'Months 1–3',
				action: 'Build your first real module on a free trial',
				detail:
					'Articulate offers a 30-day trial — use it deliberately rather than casually. Convert your warehouse onboarding knowledge into one polished interactive module. Subject matter you know cold makes for a much better first portfolio piece than an invented one.',
				cost: 'Free trial'
			},
			{
				when: 'Months 3–6',
				action: 'Get to three portfolio pieces',
				detail:
					'One e-learning module, one job aid, one short video or storyboard. Three is roughly the threshold where a portfolio site stops looking like an experiment.'
			},
			{
				when: 'Months 6–12',
				action: 'Take contract work before full-time roles',
				detail:
					'Small contract projects are far easier to land than salaried ID roles and they solve the experience problem quickly. Nonprofits and small companies need this work and rarely have anyone doing it.'
			},
			{
				when: 'Months 12–18',
				action: 'Apply salaried, portfolio first',
				detail:
					'Target Instructional Designer, Learning Experience Designer, Training Content Developer. The portfolio link goes at the top of the resume — in this field it matters more than the work history above it.'
			}
		],
		sources: [
			{
				label: 'BLS — Training & Development Specialists',
				url: 'https://www.bls.gov/ooh/business-and-financial/training-and-development-specialists.htm',
				backs: 'Entry pay ($65,850) and 6% growth; the senior figure is an estimate'
			}
		]
	},
	{
		id: 'workforce-development',
		title: 'Workforce Development',
		track: 'Employment specialist → Program coordinator → Program manager',
		gem: 'roseQuartz',
		topPick: false,
		interests: ['people', 'training', 'leadership'],
		entry: { title: 'Employment / workforce specialist', median: 50000, confidence: 'estimate' },
		ceiling: { title: 'Social & community service manager', median: 78240, confidence: 'bls' },
		growth: 6,
		attainability: {
			difficulty: 2,
			difficultyLabel: 'Very doable',
			competition: 'Moderate',
			timeToEntry: '3–9 months',
			barrier:
				'The catch is money, and it is a real one. This is the lowest-paying path on the page, and nonprofit and grant-funded roles are less stable than corporate ones. What it buys is work whose point is legible every single day, which not everything here can say.'
		},
		why: `You would be helping people in more or less the position you are in right now — working out
			what their experience is actually worth and how to say it out loud. Of everything on this
			page, this is the closest match to what you described wanting: coaching, empathy, work that
			means something. It also pays the least of anything here. Both of those are true at once, and
			you should decide with both in front of you.`,
		roadmap: [
			{
				when: 'Weeks 1–2',
				action: 'Find your local workforce board',
				detail:
					'Every region has one, funded federally through WIOA, and most people have never heard of them. Look up who runs employment services near you and what programs they operate. This is the sector, and it is largely invisible from outside.'
			},
			{
				when: 'Weeks 2–8',
				action: 'Volunteer somewhere that does resume help',
				detail:
					'A library program, a community center, a jobs nonprofit. You will find out quickly whether the actual work energizes you or drains you — and that answer matters more here than on any other path, because the pay will not carry you through indifference.'
			},
			{
				when: 'Months 1–3',
				action: 'Learn the vocabulary of the funding',
				detail:
					'WIOA, case management, participant outcomes, placement rate. These programs live or die on reporting, and knowing that language separates a serious applicant from a well-meaning one.'
			},
			{
				when: 'Months 3–6',
				action: 'Apply to specialist and case manager titles',
				detail:
					'Employment Specialist, Career Navigator, Workforce Development Specialist, Job Coach. Your own non-linear path is an asset in interviews here rather than something to explain away.'
			},
			{
				when: 'Year 1–3',
				action: 'Move toward program management',
				detail:
					'The ceiling on this path is management, where the pay becomes reasonable. Getting there means learning grants and reporting, not just serving participants well — which is the part most people in this field never plan for.'
			}
		],
		sources: [
			{
				label: 'BLS — Social & Community Service Managers',
				url: 'https://www.bls.gov/ooh/management/social-and-community-service-managers.htm',
				backs: 'Ceiling pay ($78,240) and 6% growth; the entry figure is an estimate'
			}
		]
	},
	{
		id: 'space-planning',
		title: 'Space Planning & Merchandising Analytics',
		track: 'Planogram analyst → Space planner → Space planning manager',
		gem: 'turquoise',
		topPick: false,
		interests: ['process', 'analysis'],
		entry: { title: 'Planogram / space analyst', median: 58000, confidence: 'estimate' },
		ceiling: { title: 'Space planning manager', median: 95000, confidence: 'estimate' },
		growth: null,
		attainability: {
			difficulty: 3,
			difficultyLabel: 'A real climb, but a fair one',
			competition: 'Moderate',
			timeToEntry: '6–12 months',
			barrier:
				'A small field with specific software — Blue Yonder and JDA Space Planning — and the roles sit at corporate offices of large retailers rather than being scattered everywhere. It has no BLS occupation of its own, so both pay figures here are softer than most on this page.'
		},
		why: `This is the most literal version of something you already liked doing. Floor sets at
			Kohl's, getting product presentation right, the specific satisfaction of a section being
			correct rather than approximately correct — that is this job, done for an entire chain
			instead of one store. Almost nobody connects merchandising work to an analytical career, and
			the connection is real.`,
		roadmap: [
			{
				when: 'Weeks 1–3',
				action: 'Write down what you already know about resets',
				detail:
					'How a planogram arrives, what makes one work on the floor versus on paper, where the instructions are always wrong. Corporate space planners rarely have this knowledge and quietly need it.'
			},
			{
				when: 'Weeks 2–6',
				action: 'Get properly good at Excel',
				detail:
					'This role is spreadsheets and spatial logic in equal measure. Same free Microsoft Learn path the analyst route uses, so the effort transfers if you change your mind.',
				cost: 'Free'
			},
			{
				when: 'Months 1–4',
				action: 'Learn the software the field actually runs on',
				detail:
					'Blue Yonder and JDA Space Planning dominate. Look for trial access, community tutorials, or a retail employer that will train you on it. Naming the tool correctly in an application is most of the battle in a field this small.'
			},
			{
				when: 'Months 3–6',
				action: 'Talk to your own corporate merchandising team',
				detail:
					'Best Buy and Kohl\'s both have space planning teams somewhere. Ask your manager who sends the resets. An internal introduction is worth more here than in almost any other path, because the field is too small to have a normal front door.'
			},
			{
				when: 'Months 6–12',
				action: 'Apply, and read the titles carefully',
				detail:
					'Space Planning Analyst, Planogram Analyst, Merchandising Analyst, Category Space Analyst. The titles vary wildly between companies, so search by what the job does rather than what it is called.'
			}
		],
		sources: [
			{
				label: 'BLS — Buyers & Purchasing Agents (closest tracked occupation)',
				url: 'https://www.bls.gov/ooh/business-and-financial/purchasing-managers-buyers-and-purchasing-agents.htm',
				backs: 'Context only — BLS has no space planning occupation, so both figures on this card are estimates'
			}
		]
	},
	{
		id: 'process-analyst',
		title: 'Process / Operations Analyst',
		track: 'Analyst → Senior Analyst → Manager',
		gem: 'peridot',
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
		gem: 'sugilite',
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
		gem: 'onyx',
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
		gem: 'carnelian',
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
		gem: 'jade',
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
		gem: 'ruby',
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
		gem: 'lapis',
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
		gem: 'topaz',
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
