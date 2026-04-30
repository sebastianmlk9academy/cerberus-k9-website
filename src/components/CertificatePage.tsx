interface CertificateData {
  certificate_id: string;
  participant_name: string;
  module: string;
  issue_date: Date | string;
  instructor_name?: string;
  qr_data: string;
}

interface CertificatePageProps {
  cert?: CertificateData;
}

export default function CertificatePage({ cert }: CertificatePageProps) {
  if (!cert) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-navyDeep px-4 text-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-bone">Certyfikat nie istnieje</h1>
          <a className="text-gold hover:underline" href="/pl/">
            Wróć na stronę główną
          </a>
        </div>
      </section>
    );
  }

  const issueDate =
    cert.issue_date instanceof Date
      ? cert.issue_date.toISOString().slice(0, 10)
      : String(cert.issue_date);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(cert.qr_data)}`;

  return (
    <section className="certificate-page flex min-h-[80vh] items-center justify-center bg-navyDeep px-4 py-10">
      <div className="certificate-card w-full max-w-3xl border-2 border-gold p-10 text-center" style={{ backgroundColor: '#1E2B38' }}>
        <img src="/images/cerberus-k9-logo.png" alt="CERBERUS K9" className="mx-auto mb-5 h-16 w-auto object-contain" />
        <h1 className="mb-2 font-[Bebas_Neue] text-[32px] tracking-[0.08em] text-gold">CERTYFIKAT UCZESTNICTWA</h1>
        <p className="mb-4 font-[Bebas_Neue] text-[48px] leading-none text-bone">{cert.participant_name}</p>
        <p className="mb-3 font-[Rajdhani] text-[18px] text-muted">Ukończył moduł: {cert.module}</p>
        <p className="text-sm text-muted">Data wydania: {issueDate}</p>
        {cert.instructor_name ? <p className="mb-5 text-sm text-muted">Instruktor: {cert.instructor_name}</p> : null}
        <img src={qrUrl} alt="Kod QR certyfikatu" className="mx-auto mb-6 h-[120px] w-[120px]" />
        <button
          type="button"
          onClick={() => window.print()}
          className="print-hide bg-red px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-bone hover:bg-[#A82424]"
        >
          DRUKUJ
        </button>
      </div>

      <style>{`
        @media print {
          nav, footer, .print-hide {
            display: none !important;
          }
          .certificate-page {
            background: white !important;
            min-height: auto !important;
            padding: 0 !important;
          }
          .certificate-card {
            border: 2px solid #C4922A !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
