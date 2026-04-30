import { useEffect, useState } from 'react';

export interface NotificationBarProps {
	isActive: boolean;
	messagePl: string;
	messageEn: string;
	lang: 'pl' | 'en' | string;
	linkText?: string;
	linkHref?: string;
	severity?: 'urgent' | 'info' | 'success';
	storageKey?: string;
}

const DEFAULT_STORAGE_KEY = 'ck9_bar_dismissed_v1';

function lineForLang(lang: string, messagePl: string, messageEn: string): string {
	if (lang === 'en') {
		const t = messageEn.trim() || messagePl.trim();
		return t;
	}
	return messagePl.trim() || messageEn.trim();
}

export default function NotificationBar({
	isActive,
	messagePl,
	messageEn,
	lang,
	linkText,
	linkHref,
	severity = 'info',
	storageKey = DEFAULT_STORAGE_KEY,
}: NotificationBarProps) {
	const [storageChecked, setStorageChecked] = useState(false);
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (!isActive) {
			setDismissed(false);
			setStorageChecked(true);
			return;
		}
		try {
			if (typeof localStorage !== 'undefined') {
				const stored = localStorage.getItem(storageKey);
				setDismissed(stored === messagePl);
			} else {
				setDismissed(false);
			}
		} catch {
			setDismissed(false);
		}
		setStorageChecked(true);
	}, [isActive, messagePl, storageKey]);

	if (!isActive) {
		return null;
	}

	if (!storageChecked) {
		return null;
	}

	if (dismissed) {
		return null;
	}

	const line = lineForLang(lang, messagePl, messageEn);
	if (!line) {
		return null;
	}

	const href = linkHref?.trim();
	const defaultLink =
		lang === 'en' || String(lang).toLowerCase().startsWith('en')
			? 'Register →'
			: 'Zarejestruj się →';
	const linkLabel = (linkText?.trim() || defaultLink).trim();

	const bgClass =
		severity === 'urgent'
			? 'bg-red'
			: severity === 'success'
				? 'bg-[#2A8A2A]'
				: 'bg-navy';

	const handleDismiss = () => {
		try {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(storageKey, messagePl);
			}
		} catch {
			/* ignore */
		}
		setDismissed(true);
	};

	return (
		<div
			className={`relative z-[200] flex h-9 w-full items-center justify-center px-10 text-white ${bgClass} font-rajdhani text-[10px] font-bold tracking-[3px]`}
			role="region"
			aria-label={lang === 'en' ? 'Site notice' : 'Komunikat strony'}
		>
			<p className="m-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center">
				<span>{line}</span>
				{href ? (
					<a
						href={href}
						className="text-white underline decoration-white/70 underline-offset-2 transition hover:decoration-white"
					>
						{linkLabel}
					</a>
				) : null}
			</p>
			<button
				type="button"
				onClick={handleDismiss}
				className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				aria-label={lang === 'en' ? 'Dismiss notice' : 'Zamknij pasek'}
			>
				<span className="text-lg leading-none" aria-hidden>
					×
				</span>
			</button>
		</div>
	);
}
