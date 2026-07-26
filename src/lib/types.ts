/**
 * Shared content types.
 *
 * These exist so adding a career path is type-checked — miss a field and
 * `npm run check` says so before it ships.
 */

/** Where a salary figure came from, so the UI can be honest about precision. */
export type Confidence = 'bls' | 'estimate';

/** Interest tags Jenna has named. Used to star matching paths and to filter. */
export type InterestId = 'analysis' | 'training' | 'process' | 'leadership' | 'people';

export interface Interest {
	id: InterestId;
	label: string;
}

export interface Job {
	employer: string;
	role: string;
	length: string;
	current: boolean;
	highlights: string[];
	/** What a hiring manager should read into this job. */
	signal: string;
}

export interface Profile {
	name: string;
	degree: string;
	jobs: Job[];
	interests: Interest[];
}

export interface Source {
	label: string;
	url: string;
	/** Which figure on the card this link backs up, e.g. "Ceiling pay + growth". */
	backs: string;
}

export interface SalaryPoint {
	title: string;
	/** Annual USD. */
	median: number;
	confidence: Confidence;
}

/**
 * How realistic a path is *from Jenna's exact position* — a liberal arts degree,
 * four retail/warehouse jobs, no white-collar title yet.
 *
 * `difficulty` is effort and ramp: how much she has to learn or prove.
 * `competition` is applicant volume: how crowded the door is.
 * They are genuinely different — tech sales is easy to enter and brutally
 * competitive to keep; ops management is uncrowded but takes years.
 */
export interface Attainability {
	/** 1 = walk in from where she stands, 5 = career change with a long ramp. */
	difficulty: 1 | 2 | 3 | 4 | 5;
	/** Plain-language gloss on the number, e.g. "Very doable". */
	difficultyLabel: string;
	competition: 'Low' | 'Moderate' | 'High' | 'Very high';
	/** Realistic time from today to a first offer in this track. */
	timeToEntry: string;
	/** The specific thing standing in the way — the honest catch. */
	barrier: string;
}

/**
 * One step on a path's roadmap.
 *
 * Steps are written against Jenna's actual starting point — full-time at the
 * Best Buy warehouse, a liberal arts degree, no white-collar title yet — and
 * are meant to be specific enough to act on this week. "Network more" is not a
 * step; "ask your supervisor what an internal move to inventory control
 * requires" is.
 *
 * Timeframes deliberately overlap: these run in parallel, not in a queue.
 */
export interface RoadmapStep {
	/** When this happens, e.g. "Weeks 1–2" or "Year 2–3". */
	when: string;
	/** The action itself, in the imperative. */
	action: string;
	/** Why it matters or how to do it, grounded in her situation. */
	detail: string;
	/** Rough cost. Omit when the step is free — most are. */
	cost?: string;
}

export interface Career {
	id: string;
	title: string;
	/** The progression, e.g. "Specialist → Manager". */
	track: string;
	emoji: string;
	/** Surfaced first and badged. At most one should be true. */
	topPick: boolean;
	interests: InterestId[];
	entry: SalaryPoint;
	ceiling: SalaryPoint;
	/** Projected percent growth 2024–34, or null where BLS has no matching occupation. */
	growth: number | null;
	attainability: Attainability;
	/** Why her actual history maps onto this work. Written to her, in second person. */
	why: string;
	/** Ordered route from where she is today to the job. */
	roadmap: RoadmapStep[];
	/** Every source backing the numbers on this card. At least one. */
	sources: Source[];
}

export interface SortOption {
	label: string;
	fn: (a: Career, b: Career) => number;
}
