import { useConsent } from '@/contexts/ConsentContext';

export interface TrackersProps {
	ga4Id?: string;
	plausibleDomain?: string;
	microsoftClarityId?: string;
	facebookPixelId?: string;
}

function trimId(v: string | undefined): string | undefined {
	if (v == null) return undefined;
	const s = String(v).trim();
	return s.length > 0 ? s : undefined;
}

export default function Trackers({
	ga4Id,
	plausibleDomain,
	microsoftClarityId,
	facebookPixelId,
}: TrackersProps) {
	const { consent, hasValidChoice } = useConsent();

	const ga = trimId(ga4Id);
	const plausible = trimId(plausibleDomain);
	const clarity = trimId(microsoftClarityId);
	const fb = trimId(facebookPixelId);

	const allowAnalytics = hasValidChoice && consent.analytics;
	const allowMarketing = hasValidChoice && consent.marketing;
	const allowPreferences = hasValidChoice && consent.preferences;

	return (
		<>
			{allowAnalytics && ga ? (
				<>
					<script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`} />
					<script
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{
							__html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(ga)});
`,
						}}
					/>
				</>
			) : null}
			{allowAnalytics && plausible ? (
				<script
					defer
					data-domain={plausible}
					src="https://plausible.io/js/script.js"
				/>
			) : null}
			{allowMarketing && fb ? (
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(fb)});
fbq('track', 'PageView');
`,
					}}
				/>
			) : null}
			{allowPreferences && clarity ? (
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `
(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(clarity)});
`,
					}}
				/>
			) : null}
		</>
	);
}
