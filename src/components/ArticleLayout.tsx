import type { CSSProperties, ReactNode } from 'react';

const bebas = "'Bebas Neue', Impact, sans-serif" as const;
const raj = "'Rajdhani', sans-serif" as const;
const libre = "'Libre Baskerville', Georgia, serif" as const;

const gold = '#C4922A';
const bone = '#E4DDD0';
const muted = '#7A8A96';
const bodyText = '#A0A8B0';

export type ArticleBreadcrumbItem = {
  label: string;
  href?: string;
};

export type ArticleLayoutProps = {
  breadcrumb?: ArticleBreadcrumbItem[];
  category?: string;
  /** Visible date label (e.g. 13.06.2026). */
  date?: string;
  /** ISO date for the `datetime` attribute; falls back to `date` when omitted. */
  dateTime?: string;
  title: string;
  lead?: string;
  heroImage?: { src: string; alt: string };
  tags?: string[];
  /** Full URL of the article for share buttons (recommended for SSR). */
  shareUrl?: string;
  shareTitle?: string;
  backHref?: string;
  children?: ReactNode;
};

function encodeShare(text: string) {
  return encodeURIComponent(text);
}

function ShareIconFacebook() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ShareIconX() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ShareIconLinkedIn() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ShareIconWhatsApp() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const shareBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  borderRadius: 8,
  border: `1px solid ${muted}`,
  background: 'transparent',
  color: bodyText,
  cursor: 'pointer',
  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
};

export function ArticleLayout({
  breadcrumb = [],
  category,
  date,
  dateTime,
  title,
  lead,
  heroImage,
  tags = [],
  shareUrl = '',
  shareTitle = '',
  backHref = '/pl/blog',
  children,
}: ArticleLayoutProps) {
  const url = shareUrl;
  const text = shareTitle || title;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeShare(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeShare(url)}&text=${encodeShare(text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeShare(url)}`,
    whatsapp: `https://wa.me/?text=${encodeShare(`${text} ${url}`.trim())}`,
  };

  return (
    <>
      <style>{`
        .ck9-article-body {
          font-family: ${libre};
          font-size: 16px;
          line-height: 1.85;
          color: ${bodyText};
        }
        .ck9-article-body p { margin: 0 0 1.25em; }
        .ck9-article-body p:last-child { margin-bottom: 0; }
        .ck9-article-body a { color: ${gold}; text-decoration: underline; text-underline-offset: 3px; }
        .ck9-article-body a:hover { color: ${bone}; }
        .ck9-article-body ul, .ck9-article-body ol { margin: 0 0 1.25em; padding-left: 1.35em; }
        .ck9-article-body li { margin-bottom: 0.35em; }
        .ck9-article-body blockquote {
          margin: 1.25em 0;
          padding-left: 20px;
          border-left: 3px solid ${gold};
          color: ${muted};
          font-style: italic;
        }
        .ck9-article-body h2 {
          font-family: ${bebas};
          font-size: 36px;
          line-height: 1.05;
          color: ${gold};
          margin: 1.4em 0 0.5em;
          letter-spacing: 0.02em;
        }
        .ck9-article-body h2:first-child { margin-top: 0; }
        .ck9-article-body h3 {
          font-family: ${raj};
          font-size: 22px;
          font-weight: 600;
          line-height: 1.25;
          color: ${bone};
          margin: 1.35em 0 0.45em;
        }
        .ck9-article-body h4 {
          font-family: ${raj};
          font-size: 18px;
          font-weight: 600;
          color: ${gold};
          margin: 1.2em 0 0.4em;
        }
        .ck9-article-body img { max-width: 100%; height: auto; border-radius: 4px; }
        .ck9-article-body pre, .ck9-article-body code {
          font-family: ui-monospace, monospace;
          font-size: 0.9em;
        }
        .ck9-article-body pre {
          background: #0F1720;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.25em 0;
        }
        .ck9-share-btn:hover {
          border-color: ${gold} !important;
          color: ${gold} !important;
          background: rgba(196, 146, 42, 0.08) !important;
        }
      `}</style>
      <article
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '80px 5%',
          background: 'linear-gradient(to bottom, #161F28, #1A2530, #161F28)',
          boxSizing: 'border-box',
        }}
      >
        <header style={{ marginBottom: 28 }}>
          {breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
              <ol
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px 8px',
                  alignItems: 'center',
                  fontFamily: raj,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: muted,
                }}
              >
                {breadcrumb.map((item, i) => (
                  <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {i > 0 && <span aria-hidden style={{ color: '#5A6570' }}>/</span>}
                    {item.href ? (
                      <a href={item.href} style={{ color: muted, textDecoration: 'none' }}>
                        {item.label}
                      </a>
                    ) : (
                      <span style={{ color: bone }}>{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px 20px',
              fontFamily: raj,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: muted,
            }}
          >
            {category && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  border: `1px solid ${gold}`,
                  color: gold,
                  borderRadius: 2,
                }}
              >
                {category}
              </span>
            )}
            {date && <time dateTime={dateTime ?? date}>{date}</time>}
          </div>
        </header>

        <h1
          style={{
            fontFamily: bebas,
            fontSize: 56,
            lineHeight: 0.95,
            color: bone,
            margin: '0 0 8px',
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </h1>

        {lead && (
          <p
            style={{
              fontFamily: libre,
              fontSize: 17,
              lineHeight: 1.55,
              color: muted,
              fontStyle: 'italic',
              borderLeft: `3px solid ${gold}`,
              paddingLeft: 20,
              margin: '24px 0',
            }}
          >
            {lead}
          </p>
        )}

        {heroImage && (
          <figure style={{ margin: '32px 0 0', padding: 0 }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 4,
                overflow: 'hidden',
                background: '#0F1720',
              }}
            >
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </figure>
        )}

        {children != null && (
          <div className="ck9-article-body" style={{ marginTop: heroImage ? 40 : 32 }}>
            {children}
          </div>
        )}

        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: '1px solid rgba(122, 138, 150, 0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px 16px',
              fontFamily: raj,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: bone,
            }}
          >
            <span>UDOSTĘPNIJ:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Udostępnij na Facebooku"
                style={shareBtn}
                className="ck9-share-btn"
              >
                <ShareIconFacebook />
              </a>
              <a
                href={shareLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Udostępnij na X (Twitter)"
                style={shareBtn}
                className="ck9-share-btn"
              >
                <ShareIconX />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Udostępnij na LinkedIn"
                style={shareBtn}
                className="ck9-share-btn"
              >
                <ShareIconLinkedIn />
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Udostępnij przez WhatsApp"
                style={shareBtn}
                className="ck9-share-btn"
              >
                <ShareIconWhatsApp />
              </a>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: raj,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(196, 146, 42, 0.12)',
                  color: bone,
                  border: `1px solid rgba(196, 146, 42, 0.35)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          <a
            href={backHref}
            style={{
              fontFamily: raj,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: gold,
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
            }}
          >
            ← POWRÓT DO AKTUALNOŚCI
          </a>
        </div>
      </article>
    </>
  );
}
