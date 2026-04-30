import type { Lang } from '../i18n/ui';

export type TimelineNodeData = {
	year: number;
	status: 'completed' | 'current' | 'planned' | 'vision';
	color_token: 'gold' | 'red' | 'navyBorder' | 'blue' | 'green' | 'purple' | 'orange';
	pulse: boolean;
	order: number;
	isVisible: boolean;
	title_pl: string;
	title_en: string;
	subtitle_pl?: string;
	subtitle_en?: string;
};

const COLOR_MAP: Record<TimelineNodeData['color_token'], string> = {
	gold: '#C4922A',
	red: '#C42B2B',
	navyBorder: '#253344',
	blue: '#1E5A8A',
	green: '#2A7A2A',
	purple: '#4A2A7A',
	orange: '#8A2A00',
};

type Props = {
	nodes: TimelineNodeData[];
	lang: Lang;
};

export function CerberusTimeline({ nodes, lang }: Props) {
	const isPl = lang === 'pl';
	if (nodes.length === 0) return null;

	return (
		<section className="border-t border-border bg-navyDark/25 px-[5%] py-12 md:py-16">
			<style>{`
				@keyframes cerberus-timeline-pulse {
					0%, 100% { box-shadow: 0 0 0 0 rgba(196, 43, 43, 0.45); }
					50% { box-shadow: 0 0 0 10px rgba(196, 43, 43, 0); }
				}
				.cerberus-timeline-pulse {
					animation: cerberus-timeline-pulse 2s ease-in-out infinite;
				}
			`}</style>
			<div className="mx-auto max-w-6xl">
				{/* Mobile: vertical */}
				<div className="relative space-y-0 pl-8 md:hidden">
					<div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" aria-hidden />
					{nodes.map((n) => {
						const title = isPl ? n.title_pl : n.title_en;
						const subtitle = isPl ? n.subtitle_pl : n.subtitle_en;
						const color = COLOR_MAP[n.color_token];
						const pulse = n.status === 'current' && n.pulse;

						return (
							<div key={n.year} className="relative pb-10 last:pb-0">
								<div
									className={`absolute left-0 top-1.5 z-[1] h-3 w-3 rounded-full border-2 border-navyDeep ${pulse ? 'cerberus-timeline-pulse' : ''}`}
									style={{ backgroundColor: color }}
								/>
								<div className="pl-4">
									<p className="font-bebas text-3xl tracking-wide text-bone">{n.year}</p>
									<p className="font-rajdhani text-sm font-semibold uppercase tracking-wider text-gold/90">
										{title}
									</p>
									{subtitle ? (
										<p className="mt-1 font-rajdhani text-xs text-muted">{subtitle}</p>
									) : null}
								</div>
							</div>
						);
					})}
				</div>

				{/* Desktop: horizontal */}
				<div className="hidden md:block">
					<div className="relative flex justify-between pt-6">
						<div className="absolute left-0 right-0 top-[22px] h-px bg-border" aria-hidden />
						{nodes.map((n) => {
							const title = isPl ? n.title_pl : n.title_en;
							const subtitle = isPl ? n.subtitle_pl : n.subtitle_en;
							const color = COLOR_MAP[n.color_token];
							const pulse = n.status === 'current' && n.pulse;

							return (
								<div key={n.year} className="relative z-[1] flex w-0 min-w-0 flex-1 flex-col items-center px-1 text-center first:items-start first:text-left last:items-end last:text-right">
									<div
										className={`mb-4 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-navyDark ${pulse ? 'cerberus-timeline-pulse' : ''}`}
										style={{ backgroundColor: color }}
									/>
									<p className="font-bebas text-3xl tracking-wide text-bone lg:text-4xl">{n.year}</p>
									<p className="mt-2 max-w-[10rem] font-rajdhani text-[11px] font-semibold uppercase leading-snug tracking-wider text-gold/90 lg:max-w-[11rem] lg:text-xs">
										{title}
									</p>
									{subtitle ? (
										<p className="mt-1 max-w-[10rem] font-rajdhani text-[10px] text-muted lg:max-w-[11rem] lg:text-[11px]">
											{subtitle}
										</p>
									) : null}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
