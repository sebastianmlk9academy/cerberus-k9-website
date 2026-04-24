interface PageHeroProps {
  category?: string
  title?: string
  subtitle: string
  pageLabel?: string
  pageName?: string
}

export function PageHero({ category, title, subtitle, pageLabel, pageName }: PageHeroProps) {
  const resolvedCategory = category ?? pageName ?? "CERBERUS K9";
  const resolvedTitle = title ?? "CERBERUS K9";

  return (
    <section
      className="relative w-full min-h-[200px] md:min-h-[280px] flex items-center justify-center border-b overflow-hidden px-4 py-8"
      style={{
        backgroundColor: "#151E28",
        borderBottomColor: "#253344",
      }}
    >
      {/* Subtle diagonal lines background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49.5%, #1E2B38 49.5%, #1E2B38 50.5%, transparent 50.5%),
            linear-gradient(45deg, transparent 49.5%, #1E2B38 49.5%, #1E2B38 50.5%, transparent 50.5%)
          `,
          backgroundSize: "60px 60px, 120px 120px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl">
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
          {resolvedCategory}
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
