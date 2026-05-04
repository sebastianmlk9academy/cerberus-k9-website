"use client";

import { useEffect, useState } from "react";

export interface MobileStickyCTAProps {
	isActive?: boolean;
	href: string;
	labelPl?: string;
	labelEn?: string;
	lang: string;
	hideOnPaths?: string[];
}

export default function MobileStickyCTA({
	isActive = false,
	href,
	labelPl = "ZAREJESTRUJ SIĘ",
	labelEn = "REGISTER NOW",
	lang,
	hideOnPaths = ["/rejestracja", "/registration"],
}: MobileStickyCTAProps) {
	const [hiddenByPath, setHiddenByPath] = useState(false);

	useEffect(() => {
		const pathname = window.location.pathname;
		const hide = hideOnPaths.some((p) => p.length > 0 && pathname.includes(p));
		setHiddenByPath(hide);
	}, [hideOnPaths]);

	if (!isActive || hiddenByPath) return null;

	const text = lang === "en" ? labelEn : labelPl;

	return (
		<a
			href={href}
			className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-center bg-red py-[14px] px-6 text-center text-[11px] font-bold tracking-[2px] text-bone no-underline shadow-[0_-4px_24px_rgba(0,0,0,0.35)]"
			style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
		>
			{text}
		</a>
	);
}
