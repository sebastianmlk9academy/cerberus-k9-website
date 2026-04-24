"use client"

interface ProgramCard {
  category: string
  title: string
  description: string
  badge: string
}

const programCards: ProgramCard[] = [
  {
    category: "◈ SZKOLENIA K9",
    title: "PSY GRYZĄCE · DETEKCJA · TROPIENIE · SAR",
    description: "Służby i cywile w parach pies + przewodnik. Instruktorzy to emerytowani operatorzy JWK, OSŻW, policjanci. Do Waszej dyspozycji 8 topowych pozorantów z całej Europy i USA.",
    badge: "SŁUŻBY + CYWILE"
  },
  {
    category: "◈ MEDYCYNA",
    title: "MEDYCYNA POLA WALKI",
    description: "Rescue Team SE.A.L. + WOPR Ostrów Wlkp. Taktyczna medycyna pola walki dla służb i cywilów. Opatrywanie ran psów pracujących. Pierwsza pomoc przedmedyczna dla każdego.",
    badge: "MEDYCYNA POLA WALKI"
  },
  {
    category: "◈ DRONY",
    title: "PILOTAŻ I TAKTYKA W DZIAŁANIU",
    description: "Praktyczny kurs pilotażu bezzałogowych statków powietrznych, mający zastosowanie w operacjach SAR, bezpieczeństwie publicznym i zarządzaniu kryzysowym.",
    badge: "GRUPY SAR + SŁUŻBY + ORGANIZACJE PROOBRONNE + CYWILE"
  },
  {
    category: "◈ KONFERENCJA",
    title: "OBRONA POWSZECHNA I ZARZĄDZANIE KRYZYSOWE",
    description: "Panele: bezpieczeństwo wewnętrzne i publiczne, obrona powszechna, ochrona infrastruktury krytycznej przy wykorzystaniu dronów.",
    badge: "JEDNOSTKI SAMORZĄDU TERYTORIALNEGO + SŁUŻBY + CYWILE"
  }
]

export function ProgramSection() {
  return (
    <section className="bg-gradient-to-b from-[#161F28] via-[#1A2530] to-[#161F28] py-[80px] px-[5%]">
      {/* Section Header */}
      <div className="mb-12 text-center">
        {/* Section Tag */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span 
            className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]"
          >
            PROGRAM GŁÓWNY
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        </div>
        
        {/* Section Title */}
        <h2
          className="font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
          style={{
            fontWeight: 700,
            color: "#E4DDD0",
            letterSpacing: "2px",
          }}
        >
          CO CIĘ CZEKA
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0.5 bg-[#1A2230] max-w-7xl mx-auto">
        {programCards.map((card, index) => (
          <div
            key={index}
            className="group flex flex-col bg-[#0F1720] min-h-[400px] pt-5 pb-9 px-6 border-l-[3px] border-l-transparent hover:border-l-[#C4922A] hover:bg-[#151E28] transition-all duration-300"
          >
            {/* Category Tag */}
            <div className="h-[40px] flex items-center gap-4">
              <div className="w-4 h-px bg-[#C4922A]" />
              <span 
                className="font-[family-name:var(--font-rajdhani)] text-[8px] font-bold tracking-[4px] text-[#C4922A]"
              >
                {card.category}
              </span>
            </div>

            {/* Title */}
            <h3 
              className="h-[70px] font-[family-name:var(--font-bebas-neue)] text-[22px] text-[#E4DDD0] tracking-[1px] leading-tight flex items-start"
            >
              {card.title}
            </h3>

            {/* Description */}
            <p 
              className="h-[110px] font-[family-name:var(--font-libre-baskerville)] text-[13px] text-[#5A6A7A] leading-[1.65]"
              style={{ marginTop: "50px" }}
            >
              {card.description}
            </p>

            {/* Badge */}
            <div className="mt-auto pt-[15px]">
              <span 
                className="flex items-center h-[70px] font-[family-name:var(--font-rajdhani)] text-[8px] font-bold tracking-[3px] text-[#C42B2B] px-3 py-2 bg-[rgba(196,43,43,0.15)] border border-[rgba(196,43,43,0.35)] leading-relaxed"
              >
                {card.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
