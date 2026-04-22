interface PageHeroProps {
  category: string
  title: string
  subtitle: string
}

export function PageHero({ category, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative w-full min-h-[200px] md:min-h-[280px] flex items-center justify-center border-b overflow-hidden px-4 py-8"
      style={{
        backgroundColor: "#151E28",
        borderBottomColor: "#253344",
      }}
    >
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl">
        <p
          className="mb-10 uppercase font-semibold"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            fontSize: "14px",
            letterSpacing: "3px",
            color: "#FFFFFF",
          }}
        >
          {category}
        </p>

        <h1
          className="text-[32px] xs:text-[40px] sm:text-[52px] md:text-[64px] leading-none uppercase"
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            letterSpacing: "2px",
            lineHeight: "0.95",
            color: "#E4DDD0",
          }}
        >
          {title}
        </h1>

        <p
          className="mt-3 uppercase text-[9px] xs:text-[10px] sm:text-[11px] max-w-2xl"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
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
