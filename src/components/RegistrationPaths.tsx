import type { Lang } from '../i18n/ui';

export type RegistrationPathData = {
	slug: string;
	ticket_type: string;
	tag_pl: string;
	tag_en: string;
	title_pl: string;
	title_en: string;
	audience_pl: string;
	audience_en: string;
	color_token: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'gold';
	max_participants?: number | null;
	items_pl: string[];
	items_en: string[];
	pretix_direct_url?: string;
	order: number;
	isVisible: boolean;
};

const COLOR_BY_TOKEN: Record<RegistrationPathData['color_token'], string> = {
	red: '#C42B2B',
	blue: '#1E5A8A',
	green: '#2A7A2A',
	purple: '#4A2A7A',
	orange: '#8A2A00',
	gold: '#C4922A',
};

type Props = {
	paths: RegistrationPathData[];
	lang: Lang;
	fallbackUrl?: string | null;
};

export function RegistrationPaths({ paths, lang, fallbackUrl }: Props) {
	const isPl = lang === 'pl';
	const hrefBase = (fallbackUrl?.trim() || '#') as string;

	return (
		<section className="border-t border-border bg-navyDark/40 px-[5%] py-12 md:py-16">
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-1 gap-[2px] md:grid-cols-2 xl:grid-cols-3">
					{paths.map((p) => {
						const borderColor = COLOR_BY_TOKEN[p.color_token];
						const direct = p.pretix_direct_url?.trim();
						const hasDirect = Boolean(direct);
						const href = hasDirect ? direct! : hrefBase;
						const title = isPl ? p.title_pl : p.title_en;
						const tag = isPl ? p.tag_pl : p.tag_en;
						const audience = isPl ? p.audience_pl : p.audience_en;
						const items = isPl ? p.items_pl : p.items_en;
						const max = p.max_participants;

						return (
							<article
								key={p.slug}
								className="relative border-t border-border bg-navyDeep p-6"
								style={{ borderLeft: `3px solid ${borderColor}` }}
							>
								<p className="font-rajdhani text-[10px] font-bold uppercase tracking-[0.2em] text-gold/90">
									{tag}
								</p>
								<div className="mt-2">
									<h3 className="font-bebas text-2xl tracking-wide text-bone md:text-[1.65rem]">{title}</h3>
									<p className="mt-1 font-rajdhani text-xs text-muted">{audience}</p>
								</div>
								{max != null && (
									<p className="mt-3 font-rajdhani text-[11px] uppercase tracking-wider text-muted">
										{isPl ? 'Limit miejsc' : 'Capacity'}: <span className="text-bone">{max}</span>
									</p>
								)}
								<ul className="mt-4 space-y-1.5 border-t border-border/60 pt-4 font-rajdhani text-sm text-bone/90">
									{items.map((line) => (
										<li key={line} className="flex gap-2">
											<span className="text-gold" style={{ color: borderColor }}>
												·
											</span>
											<span>{line}</span>
										</li>
									))}
								</ul>
								<div className="mt-6 flex flex-wrap items-center gap-3">
									<a
										href={href}
										{...(hasDirect ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
										className="inline-flex w-full items-center justify-center px-5 py-3 font-rajdhani text-[11px] font-bold uppercase tracking-[3px] transition-colors duration-200"
										style={{
											backgroundColor: '#C42B2B',
											color: '#FFFFFF',
											borderRadius: 0,
											border: 'none',
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor = '#A82424';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = '#C42B2B';
										}}
									>
										{isPl ? 'REJESTRACJA' : 'REGISTER'}
									</a>
									{!hasDirect && (
										<span
											className="inline-flex items-center justify-center px-4 py-3 font-rajdhani text-[10px] font-bold uppercase tracking-[2px]"
											style={{
												border: '1px solid #253344',
												color: '#7A8A96',
												borderRadius: 0,
											}}
										>
											{isPl ? 'WKRÓTCE' : 'COMING SOON'}
										</span>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
