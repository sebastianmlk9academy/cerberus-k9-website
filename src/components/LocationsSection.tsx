"use client"

import type { Lang } from "../i18n/utils"
import type { LocationsSectionCopy } from "../i18n/locationsSection"
import { locationsSectionByLang } from "../i18n/locationsSection"

function LocationBlock({
  number,
  name,
  description,
  detail,
  status,
}: {
  number: string
  name: string
  description: string
  detail: string
  status: string
}) {
  return (
    <div
      className="flex h-full flex-col p-[18px] sm:p-[20px]"
      style={{ backgroundColor: "#1E2B38" }}
    >
      <span
        className="block font-bebas text-[28px] sm:text-[32px] md:text-[36px] leading-none"
        style={{ color: "#253344" }}
      >
        {number}
      </span>
      <span
        className="mt-2 block h-[32px] overflow-hidden font-rajdhani text-[12px] font-bold leading-tight tracking-[1px] sm:h-[36px] sm:text-[13px] md:h-[40px] md:text-[14px]"
        style={{ color: "#E4DDD0" }}
      >
        {name}
      </span>
      <span
        className="block text-[10px] sm:text-[11px]"
        style={{ color: "#5A6A7A" }}
      >
        {description}
      </span>
      <span
        className="mt-[2px] block h-[14px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] sm:h-[16px] sm:text-[11px]"
        style={{ color: "#5A6A7A" }}
      >
        {detail}
      </span>
      <span
        className="mt-[10px] inline-block h-[18px] self-start px-[10px] py-[3px] text-[7px] font-bold tracking-[3px] sm:h-[20px]"
        style={{
          backgroundColor: "rgba(196,146,42,0.12)",
          border: "1px solid rgba(196,146,42,0.35)",
          color: "#C4922A",
        }}
      >
        {status}
      </span>
    </div>
  )
}

interface LocationsSectionProps { lang?: Lang; copy?: LocationsSectionCopy; }

export function LocationsSection({ lang, copy }: LocationsSectionProps) {
  const safeLang = lang ?? "pl";
  const safeCopy = copy ?? locationsSectionByLang[safeLang] ?? locationsSectionByLang.pl;
  return (
    <section
      className="w-full"
      data-lang={safeLang}
      style={{
        paddingTop: "0px",
        paddingBottom: "10px",
        background:
          "linear-gradient(to bottom, rgba(22,31,40,0.85), rgba(26,37,48,0.85), rgba(22,31,40,0.85))",
      }}
    >
      {/* Section Header */}
      <div
        className="px-4 py-12 text-center sm:px-6 md:py-16"
        style={{ paddingTop: "80px" }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span 
            className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]"
          >
            {safeCopy.sectionTag}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
        </div>
        <h2
          className="font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
          style={{
            fontWeight: 700,
            color: "#E4DDD0",
            letterSpacing: "2px",
          }}
        >
          {safeCopy.sectionTitle}
        </h2>
      </div>

      {/* Location Blocks - Responsive Grid */}
      <div
        className="py-[10px]"
        style={{ backgroundColor: "#253344" }}
      >
        <div
          className="grid grid-cols-1 gap-[1px] min-[400px]:grid-cols-2 lg:grid-cols-4"
          style={{ backgroundColor: "#253344" }}
        >
          {safeCopy.locations.map((loc, i) => (
            <LocationBlock
              key={`${i + 1}-${loc.name}`}
              number={String(i + 1).padStart(2, "0")}
              name={loc.name}
              description={loc.description}
              detail={loc.detail}
              status={safeCopy.statusConfirmed}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
