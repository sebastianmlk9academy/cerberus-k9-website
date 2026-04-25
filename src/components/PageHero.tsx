interface PageHeroProps {
  category?: string
  title?: string
  subtitle: string
  pageLabel?: string
  pageName?: string
  /** Page background image (defaults to site hero graphic). */
  heroImage?: string
  heroOpacity?: number
}

export function PageHero({
  category,
  title,
  subtitle,
  pageLabel,
  pageName,
  heroImage,
  heroOpacity,
}: PageHeroProps) {
  const resolvedCategory = category ?? pageName ?? "CERBERUS K9";
  const resolvedTitle = title ?? "CERBERUS K9";
  const bgImage = heroImage ?? "/images/page_hero_graph.webp";
  const bgOpacity = heroOpacity ?? 0.4;

  return (
    <section
      className="relative w-full min-h-[200px] md:min-h-[280px] flex items-center justify-center border-b overflow-hidden px-4 py-8"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#151E28",
        borderBottomColor: "#253344",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${bgImage.replace(/'/g, "\\'")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: bgOpacity,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right, rgba(30,43,56,0.95) 0%, rgba(30,43,56,0.7) 50%, rgba(30,43,56,0.4) 100%),
            radial-gradient(circle at 85% 15%, rgba(196,146,42,0.1) 0%, transparent 60%),
            radial-gradient(circle at 40% 85%, rgba(196,43,43,0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle diagonal lines background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(45deg, transparent 49.5%, #1E2B38 49.5%, #1E2B38 50.5%, transparent 50.5%),
            linear-gradient(45deg, transparent 49.5%, #1E2B38 49.5%, #1E2B38 50.5%, transparent 50.5%)
          `,
          backgroundSize: "60px 60px, 120px 120px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Page Name */}
        <p
          className="mb-10 uppercase font-semibold"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "14px",
            letterSpacing: "3px",
            color: "#FFFFFF",
          }}
        >
          {resolvedCategory === "CERBERUS K9" ? (
            <>
              <span>CERBERUS </span>
              <span style={{ color: "#C42B2B" }}>K9</span>
            </>
          ) : (
            resolvedCategory
          )}
        </p>

        {pageLabel && (
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "5px",
              color: "#C4922A",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            {pageLabel}
          </span>
        )}

        {/* Title */}
        <h1
          className="text-[32px] xs:text-[40px] sm:text-[52px] md:text-[64px] leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "2px",
            lineHeight: "0.9",
          }}
        >
          <span style={{ color: "#E4DDD0" }}>{resolvedTitle}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-3 uppercase text-[9px] xs:text-[10px] sm:text-[11px]"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "3px",
            color: "#7A8A96",
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  )
}
