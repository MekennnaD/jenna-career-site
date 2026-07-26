import { browser } from '$app/environment';

/**
 * A reactive value backed by localStorage.
 *
 * Used for checklist progress. Deliberately local-only: this is a personal
 * document, and there is no server to send it to on GitHub Pages anyway.
 *
 * Reads are guarded by `browser` because every route here is prerendered —
 * during the build there is no localStorage, and the initial value must be
 * whatever the server would render so hydration matches.
 */
export function persisted<T>(key: string, initial: T) {
	let value = $state<T>(initial);

	if (browser) {
		try {
			const stored = localStorage.getItem(key);
			if (stored !== null) value = JSON.parse(stored) as T;
		} catch {
			// Corrupt or unreadable (private mode, quota, hand-edited) — the default is fine.
		}
	}

	return {
		get current() {
			return value;
		},
		set current(next: T) {
			value = next;
			if (!browser) return;
			try {
				localStorage.setItem(key, JSON.stringify(next));
			} catch {
				// Storage full or blocked. The UI still works for this session.
			}
		}
	};
}
