"use client"

import type { Lang } from "../i18n/utils"
import type { ProgramSectionCopy } from "../i18n/programSection"

interface ProgramSectionProps {
  lang: Lang
  copy: ProgramSectionCopy
}

export function ProgramSection({ lang, copy }: ProgramSectionProps) {
  void lang
  return (
    <section
      id="program"
      className="bg-gradient-to-b from-[#161F28] via-[#1A2530] to-[#161F28] px-[5%]"
      style={{ paddingTop: "80px", paddingBottom: "10px" }}
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        {/* Section Tag */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span 
            className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]"
          >
            {copy.sectionTag}
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
          {copy.sectionTitle}
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0.5 bg-[#1A2230] max-w-7xl mx-auto">
        {copy.cards.map((card, index) => (
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
              style={{ marginTop: "-15px" }}
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
