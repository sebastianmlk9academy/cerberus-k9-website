import {
	createContext,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useSyncExternalStore,
	type ReactNode,
} from 'react';

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface ConsentState {
	necessary: true;
	analytics: boolean;
	marketing: boolean;
	preferences: boolean;
	timestamp?: string;
	version: number;
}

const LS_KEY = 'ck9_consent_v1';

const denied = (version: number): ConsentState => ({
	necessary: true,
	analytics: false,
	marketing: false,
	preferences: false,
	version,
});

function readParsed(): { state: ConsentState; rawVersion: number } | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = localStorage.getItem(LS_KEY);
		if (!raw) return null;
		const o = JSON.parse(raw) as Record<string, unknown>;
		if (typeof o !== 'object' || o === null) return null;
		const version = typeof o.version === 'number' && Number.isFinite(o.version) ? o.version : 1;
		return {
			rawVersion: version,
			state: {
				necessary: true,
				analytics: Boolean(o.analytics),
				marketing: Boolean(o.marketing),
				preferences: Boolean(o.preferences),
				timestamp: typeof o.timestamp === 'string' ? o.timestamp : undefined,
				version,
			},
		};
	} catch {
		return null;
	}
}

let policyVersionGlobal = 1;
const listeners = new Set<() => void>();

function emit() {
	for (const l of listeners) l();
}

function subscribe(cb: () => void) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}

type ExternalSnap = { consent: ConsentState; hasValidChoice: boolean; policyVersion: number };

let snapCache: { sig: string; snap: ExternalSnap } | null = null;

function getSnapshot(): ExternalSnap {
	const parsed = readParsed();
	const hasValidChoice = Boolean(
		parsed && parsed.state.timestamp && parsed.rawVersion >= policyVersionGlobal,
	);
	const consent: ConsentState = hasValidChoice && parsed
		? parsed.state
		: denied(policyVersionGlobal);
	const pv = policyVersionGlobal;
	const sig = [
		hasValidChoice ? '1' : '0',
		pv,
		consent.analytics ? '1' : '0',
		consent.marketing ? '1' : '0',
		consent.preferences ? '1' : '0',
		consent.version,
		consent.timestamp ?? '',
	].join('|');
	if (snapCache?.sig === sig) return snapCache.snap;
	const snap = { consent, hasValidChoice, policyVersion: pv };
	snapCache = { sig, snap };
	return snap;
}

function getServerSnapshot() {
	return {
		consent: denied(1),
		hasValidChoice: false,
		policyVersion: 1,
	};
}

function persist(state: ConsentState) {
	const payload: ConsentState = {
		...state,
		necessary: true,
		timestamp: state.timestamp ?? new Date().toISOString(),
		version: policyVersionGlobal,
	};
	localStorage.setItem(LS_KEY, JSON.stringify(payload));
	emit();
}

export function setConsentPolicyVersion(v: number) {
	const next = Math.max(1, Math.floor(Number(v)) || 1);
	if (next === policyVersionGlobal) return;
	policyVersionGlobal = next;
	emit();
}

type ConsentContextValue = ReturnType<typeof getSnapshot> & {
	setAll: (acceptAll: boolean) => void;
	saveCustom: (opts: { analytics: boolean; marketing: boolean; preferences: boolean }) => void;
};

const ConsentReactContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
	const fromCtx = useContext(ConsentReactContext);
	const external = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const setAll = useCallback((acceptAll: boolean) => {
		persist({
			necessary: true,
			analytics: acceptAll,
			marketing: acceptAll,
			preferences: acceptAll,
			timestamp: new Date().toISOString(),
			version: policyVersionGlobal,
		});
	}, []);

	const saveCustom = useCallback((opts: { analytics: boolean; marketing: boolean; preferences: boolean }) => {
		persist({
			necessary: true,
			analytics: opts.analytics,
			marketing: opts.marketing,
			preferences: opts.preferences,
			timestamp: new Date().toISOString(),
			version: policyVersionGlobal,
		});
	}, []);

	return useMemo(
		() =>
			fromCtx ?? {
				...external,
				setAll,
				saveCustom,
			},
		[fromCtx, external, setAll, saveCustom],
	);
}

export function ConsentProvider({
	policyVersion,
	children,
}: {
	policyVersion: number;
	children?: ReactNode;
}) {
	useLayoutEffect(() => {
		setConsentPolicyVersion(policyVersion);
	}, [policyVersion]);

	const external = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const setAll = useCallback((acceptAll: boolean) => {
		persist({
			necessary: true,
			analytics: acceptAll,
			marketing: acceptAll,
			preferences: acceptAll,
			timestamp: new Date().toISOString(),
			version: policyVersionGlobal,
		});
	}, []);

	const saveCustom = useCallback((opts: { analytics: boolean; marketing: boolean; preferences: boolean }) => {
		persist({
			necessary: true,
			analytics: opts.analytics,
			marketing: opts.marketing,
			preferences: opts.preferences,
			timestamp: new Date().toISOString(),
			version: policyVersionGlobal,
		});
	}, []);

	const value = useMemo(
		() => ({
			...external,
			setAll,
			saveCustom,
		}),
		[external, setAll, saveCustom],
	);

	if (children === undefined || children === null) {
		return null;
	}

	return <ConsentReactContext.Provider value={value}>{children}</ConsentReactContext.Provider>;
}
