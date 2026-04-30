import type { Lang } from '../i18n/ui';

export type TestimonialData = {
	quote_pl: string;
	quote_en: string;
	name_pl: string;
	name_en?: string;
	initials?: string;
	photo?: string;
	order?: number;
	isVisible?: boolean;
};

type Props = {
	testimonials: TestimonialData[];
	lang: Lang;
	maxVisible?: number;
};

const libre = "'Libre Baskerville', Georgia, serif" as const;
const bebas = '"Bebas Neue", Impact, sans-serif' as const;

function initialsFromName(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return '?';
	if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
	return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase();
}

export function WallOfFame({ testimonials, lang, maxVisible = 3 }: Props) {
	const isPl = lang === 'pl';
	const list = testimonials.slice(0, maxVisible);
	if (list.length === 0) return null;

	return (
		<section className="border-t border-border bg-navyDark/30 px-[5%] py-14 md:py-20">
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-1 gap-[2px] md:grid-cols-3 md:gap-4">
					{list.map((t, i) => {
						const quote = isPl ? t.quote_pl : t.quote_en;
						const name = isPl ? t.name_pl : (t.name_en?.trim() || t.name_pl);
						const mark = t.initials?.trim() || initialsFromName(name);
						const photo = t.photo?.trim();

						return (
							<article
								key={`${name}-${i}`}
								className="relative overflow-hidden bg-navyDarkest px-6 py-7 md:px-6 md:py-8"
							>
								<span
									className="pointer-events-none absolute left-3 top-2 select-none leading-none text-gold/[0.15]"
									style={{ fontFamily: bebas, fontSize: '80px' }}
									aria-hidden
								>
									&quot;
								</span>
								<div className="relative z-[1] flex gap-4">
									{photo ? (
										<img
											src={photo}
											alt=""
											className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-gold/30"
										/>
									) : (
										<div
											className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navyMid font-rajdhani text-xs font-bold uppercase tracking-wide text-gold ring-1 ring-border"
											aria-hidden
										>
											{mark}
										</div>
									)}
									<div className="min-w-0 flex-1 pt-1">
										<p
											className="text-[13px] italic leading-relaxed text-muted"
											style={{ fontFamily: libre }}
										>
											{quote}
										</p>
										<p className="mt-4 font-rajdhani text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/90">
											{name}
										</p>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
