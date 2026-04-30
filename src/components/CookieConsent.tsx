import { useCallback, useMemo, useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';

export { ConsentProvider, useConsent } from '@/contexts/ConsentContext';

type Lang = string;

interface Copy {
	title: string;
	desc: string;
	acceptAll: string;
	necessaryOnly: string;
	customize: string;
	modalTitle: string;
	analytics: string;
	marketing: string;
	preferences: string;
	save: string;
	cancel: string;
}

const COPIES: Record<string, Copy> = {
	pl: {
		title: 'Pliki cookie i prywatność',
		desc: 'Używamy plików cookie i podobnych technologii. Możesz zaakceptować wszystkie kategorie, tylko niezbędne lub dostosować wybór.',
		acceptAll: 'Akceptuj wszystko',
		necessaryOnly: 'Tylko niezbędne',
		customize: 'Dostosuj',
		modalTitle: 'Preferencje prywatności',
		analytics: 'Analityka (np. Plausible, Google Analytics)',
		marketing: 'Marketing (np. Meta Pixel)',
		preferences: 'Preferencje / nagrywanie sesji (np. Microsoft Clarity)',
		save: 'Zapisz wybór',
		cancel: 'Anuluj',
	},
	en: {
		title: 'Cookies & privacy',
		desc: 'We use cookies and similar technologies. You can accept all, only necessary cookies, or customise your choice.',
		acceptAll: 'Accept all',
		necessaryOnly: 'Necessary only',
		customize: 'Customise',
		modalTitle: 'Privacy preferences',
		analytics: 'Analytics (e.g. Plausible, Google Analytics)',
		marketing: 'Marketing (e.g. Meta Pixel)',
		preferences: 'Preferences / session replay (e.g. Microsoft Clarity)',
		save: 'Save choices',
		cancel: 'Cancel',
	},
	de: {
		title: 'Cookies & Datenschutz',
		desc: 'Wir verwenden Cookies und ähnliche Technologien. Sie können alle akzeptieren, nur notwendige oder Ihre Auswahl anpassen.',
		acceptAll: 'Alle akzeptieren',
		necessaryOnly: 'Nur notwendige',
		customize: 'Anpassen',
		modalTitle: 'Datenschutzeinstellungen',
		analytics: 'Analyse (z. B. Plausible, Google Analytics)',
		marketing: 'Marketing (z. B. Meta Pixel)',
		preferences: 'Einstellungen / Sitzungsaufzeichnung (z. B. Microsoft Clarity)',
		save: 'Speichern',
		cancel: 'Abbrechen',
	},
	fr: {
		title: 'Cookies et confidentialité',
		desc: 'Nous utilisons des cookies et technologies similaires. Vous pouvez tout accepter, uniquement le nécessaire ou personnaliser.',
		acceptAll: 'Tout accepter',
		necessaryOnly: 'Nécessaires uniquement',
		customize: 'Personnaliser',
		modalTitle: 'Préférences de confidentialité',
		analytics: 'Analytique (ex. Plausible, Google Analytics)',
		marketing: 'Marketing (ex. Meta Pixel)',
		preferences: 'Préférences / enregistrement de session (ex. Microsoft Clarity)',
		save: 'Enregistrer',
		cancel: 'Annuler',
	},
	cs: {
		title: 'Cookies a soukromí',
		desc: 'Používáme cookies a podobné technologie. Můžete přijmout vše, jen nezbytné nebo upravit volbu.',
		acceptAll: 'Přijmout vše',
		necessaryOnly: 'Pouze nezbytné',
		customize: 'Upravit',
		modalTitle: 'Nastavení soukromí',
		analytics: 'Analytika (např. Plausible, Google Analytics)',
		marketing: 'Marketing (např. Meta Pixel)',
		preferences: 'Předvolby / záznam relace (např. Microsoft Clarity)',
		save: 'Uložit',
		cancel: 'Zrušit',
	},
	hr: {
		title: 'Kolačići i privatnost',
		desc: 'Koristimo kolačiće i slične tehnologije. Možete prihvatiti sve, samo nužne ili prilagoditi odabir.',
		acceptAll: 'Prihvati sve',
		necessaryOnly: 'Samo nužno',
		customize: 'Prilagodi',
		modalTitle: 'Postavke privatnosti',
		analytics: 'Analitika (npr. Plausible, Google Analytics)',
		marketing: 'Marketing (npr. Meta Pixel)',
		preferences: 'Preferencije / snimanje sesije (npr. Microsoft Clarity)',
		save: 'Spremi',
		cancel: 'Odustani',
	},
};

function copyFor(lang: Lang): Copy {
	return COPIES[lang] ?? COPIES.en ?? COPIES.pl;
}

export interface CookieConsentProps {
	lang: Lang;
	active: boolean;
}

export default function CookieConsent({ lang, active }: CookieConsentProps) {
	const { hasValidChoice, setAll, saveCustom, consent } = useConsent();
	const t = useMemo(() => copyFor(lang), [lang]);
	const [modalOpen, setModalOpen] = useState(false);
	const [draft, setDraft] = useState({
		analytics: consent.analytics,
		marketing: consent.marketing,
		preferences: consent.preferences,
	});

	const openModal = useCallback(() => {
		setDraft({
			analytics: consent.analytics,
			marketing: consent.marketing,
			preferences: consent.preferences,
		});
		setModalOpen(true);
	}, [consent.analytics, consent.marketing, consent.preferences]);

	if (!active || hasValidChoice) {
		return null;
	}

	return (
		<>
			<div
				className="fixed bottom-0 left-0 right-0 z-[100] border-t border-goldMuted/40 bg-navyDeep/95 px-4 py-4 text-bone shadow-lg backdrop-blur-sm md:px-8"
				role="dialog"
				aria-modal="false"
				aria-labelledby="cookie-banner-title"
				aria-live="polite"
			>
				<div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="min-w-0">
						<p id="cookie-banner-title" className="font-heading text-sm font-semibold tracking-wide text-gold">
							{t.title}
						</p>
						<p className="mt-1 text-sm text-bone/90">{t.desc}</p>
					</div>
					<div className="flex shrink-0 flex-wrap gap-2">
						<button
							type="button"
							className="rounded border border-gold bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navyDeep transition hover:bg-gold/90"
							onClick={() => setAll(true)}
						>
							{t.acceptAll}
						</button>
						<button
							type="button"
							className="rounded border border-bone/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-bone transition hover:border-bone hover:bg-bone/10"
							onClick={() => setAll(false)}
						>
							{t.necessaryOnly}
						</button>
						<button
							type="button"
							className="rounded border border-bone/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-bone transition hover:border-bone hover:bg-bone/10"
							onClick={openModal}
						>
							{t.customize}
						</button>
					</div>
				</div>
			</div>

			{modalOpen ? (
				<div
					className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-4 sm:items-center"
					role="presentation"
					onClick={() => setModalOpen(false)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') setModalOpen(false);
					}}
				>
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby="cookie-modal-title"
						className="w-full max-w-md rounded-lg border border-goldMuted/40 bg-navyDeep p-6 text-bone shadow-xl"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
					>
						<h2 id="cookie-modal-title" className="font-heading text-lg font-semibold tracking-wide text-gold">
							{t.modalTitle}
						</h2>
						<ul className="mt-4 space-y-3 text-sm">
							<li className="flex items-start gap-3">
								<input
									id="ck9-analytics"
									type="checkbox"
									className="mt-1 h-4 w-4 accent-gold"
									checked={draft.analytics}
									onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
								/>
								<label htmlFor="ck9-analytics" className="cursor-pointer text-bone/90">
									{t.analytics}
								</label>
							</li>
							<li className="flex items-start gap-3">
								<input
									id="ck9-marketing"
									type="checkbox"
									className="mt-1 h-4 w-4 accent-gold"
									checked={draft.marketing}
									onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
								/>
								<label htmlFor="ck9-marketing" className="cursor-pointer text-bone/90">
									{t.marketing}
								</label>
							</li>
							<li className="flex items-start gap-3">
								<input
									id="ck9-preferences"
									type="checkbox"
									className="mt-1 h-4 w-4 accent-gold"
									checked={draft.preferences}
									onChange={(e) => setDraft((d) => ({ ...d, preferences: e.target.checked }))}
								/>
								<label htmlFor="ck9-preferences" className="cursor-pointer text-bone/90">
									{t.preferences}
								</label>
							</li>
						</ul>
						<div className="mt-6 flex flex-wrap justify-end gap-2">
							<button
								type="button"
								className="rounded border border-bone/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-bone transition hover:border-bone hover:bg-bone/10"
								onClick={() => setModalOpen(false)}
							>
								{t.cancel}
							</button>
							<button
								type="button"
								className="rounded border border-gold bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navyDeep transition hover:bg-gold/90"
								onClick={() => {
									saveCustom(draft);
									setModalOpen(false);
								}}
							>
								{t.save}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
