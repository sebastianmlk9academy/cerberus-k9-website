"use client";

import { useCallback, useEffect, useState } from "react";
import { tokens } from "../styles/tokens";

export interface LiveRegistrationCounterProps {
	maxCount?: number;
	refreshInterval?: number;
	dataPath?: string;
	lang?: string;
}

type Payload = {
	count?: number;
	error?: string;
	updated?: string;
};

export default function LiveRegistrationCounter({
	maxCount = 250,
	refreshInterval = 60_000,
	dataPath = "/data/registration-count.json",
	lang = "pl",
}: LiveRegistrationCounterProps) {
	const [count, setCount] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		try {
			const res = await fetch(`${dataPath}?t=${Date.now()}`, { cache: "no-store" });
			if (!res.ok) {
				setError(`http ${res.status}`);
				setCount(null);
				return;
			}
			const data = (await res.json()) as Payload;
			if (data.error != null && data.error !== "") {
				setError(String(data.error));
				setCount(null);
				return;
			}
			if (typeof data.count !== "number" || Number.isNaN(data.count)) {
				setError("invalid data");
				setCount(null);
				return;
			}
			setError(null);
			setCount(Math.max(0, data.count));
		} catch (e) {
			setError(e instanceof Error ? e.message : "fetch failed");
			setCount(null);
		} finally {
			setLoading(false);
		}
	}, [dataPath]);

	useEffect(() => {
		void load();
		const id = window.setInterval(() => {
			void load();
		}, refreshInterval);
		return () => window.clearInterval(id);
	}, [load, refreshInterval]);

	const seatsWord = lang === "en" ? "SEATS" : "MIEJSC";
	const maxLabel = `MAX ${maxCount} ${seatsWord}`;

	if (loading) {
		return (
			<div className="relative z-10 mb-6 sm:mb-8 w-full max-w-md" data-slot="live-registration-counter">
				<div
					className="h-3 w-full animate-pulse rounded-sm"
					style={{ backgroundColor: tokens.brand.navyBorder }}
				/>
			</div>
		);
	}

	if (error != null || count === null) {
		return (
			<div
				className="relative z-10 mb-6 sm:mb-8 w-full max-w-md text-[12px] sm:text-[13px] font-bold tracking-[2px]"
				style={{
					fontFamily: "var(--font-rajdhani), sans-serif",
					color: tokens.text.primary,
				}}
				data-slot="live-registration-counter"
			>
				{maxLabel}
			</div>
		);
	}

	const pct = Math.min(100, Math.round((count / Math.max(1, maxCount)) * 100));

	return (
		<div className="relative z-10 mb-6 sm:mb-8 w-full max-w-md" data-slot="live-registration-counter">
			<div
				className="mb-2 text-[clamp(22px,5vw,32px)] leading-none font-bold tracking-wide"
				style={{
					fontFamily: "var(--font-bebas-neue), sans-serif",
					color: tokens.brand.red,
				}}
			>
				{count} / {maxCount} {seatsWord}
			</div>
			<div
				className="h-2 w-full overflow-hidden rounded-sm"
				style={{ backgroundColor: tokens.brand.navyBorder }}
			>
				<div
					className="h-full transition-[width] duration-500 ease-out"
					style={{
						width: `${pct}%`,
						backgroundColor: tokens.brand.gold,
					}}
				/>
			</div>
		</div>
	);
}
