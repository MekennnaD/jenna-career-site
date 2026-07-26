/**
 * Shared content types.
 *
 * These exist so that adding a career path or certification step is a
 * type-checked operation — miss a field and `npm run check` says so before
 * anything ships.
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

export interface Translation {
	/** How she'd describe it. */
	from: string;
	/** How a resume should describe it. */
	to: string;
}

export interface Profile {
	name: string;
	degree: string;
	headline: string;
	summary: string;
	jobs: Job[];
	interests: Interest[];
	translations: Translation[];
}

export interface SalaryPoint {
	title: string;
	/** Annual USD. */
	median: number;
	confidence: Confidence;
}

export interface Source {
	label: string;
	url: string;
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
	source: Source;
	why: string;
	firstMove: string;
	timeline: string;
}

export interface SortOption {
	label: string;
	fn: (a: Career, b: Career) => number;
}

export interface CertStep {
	name: string;
	/** Approximate USD; 0 means genuinely free. Used for the cheap→expensive ordering. */
	cost: number;
	/** Human-facing price, e.g. "~$220–350". Shown instead of `cost`. */
	costLabel: string;
	time: string;
	provider: string;
	url: string | null;
	note: string;
}

export interface CertPath {
	id: string;
	title: string;
	emoji: string;
	/** True when this path matches something she has said she's drawn to. */
	matchesInterest: boolean;
	leadsTo: string;
	pitch: string;
	/** Ordered cheapest → most expensive. The first step should always cost $0. */
	steps: CertStep[];
}

export interface FreeStarter {
	label: string;
	pathId: string;
	time: string;
}

export interface ChecklistItem {
	id: string;
	label: string;
	detail: string;
	/** Groups items in the UI. */
	group: string;
}
