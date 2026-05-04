"use client"

import type { Lang } from "../i18n/utils"
import type { LocationsSectionCopy } from "../i18n/locationsSection"
import { locationsSectionByLang } from "../i18n/locationsSection"
import type { LocationItem } from "../lib/eventLocations"

function LocationBlock({
  number,
  name,
  description,
  detail,
  status,
  image,
}: {
  number: string
  name: string
  description: string
  detail: string
  status: string
  image?: string
}) {
  return (
    <div
      className="relative flex flex-col overflow-hidden p-[18px] sm:p-[20px]"
      style={{ backgroundColor: "#1E2B38" }}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
      ) : null}
      <div className="relative z-[1] flex h-full flex-col">
      <span
        className="block font-bebas text-[28px] sm:text-[32px] md:text-[36px] leading-none"
        style={{ color: "#253344" }}
      >
        {number}
      </span>
      <span
        className="mt-2 block font-rajdhani text-[12px] font-bold leading-tight tracking-[1px] sm:text-[13px] md:text-[14px]"
        style={{ color: "#E4DDD0" }}
      >
        {name}
      </span>
      <div className="flex-1">
        <span
        className="block text-[11px] sm:text-[12px]"
          style={{ color: "#5A6A7A" }}
        >
          {description}
        </span>
        <span
        className="mt-[2px] block text-[11px] sm:text-[12px]"
          style={{ color: "#5A6A7A" }}
        >
          {detail}
        </span>
      </div>
      <span
        className="mt-4 inline-block h-[18px] self-start px-[10px] py-[3px] text-[10px] font-bold tracking-[2px] sm:h-[20px]"
        style={{
          backgroundColor: "rgba(196,146,42,0.12)",
          border: "1px solid rgba(196,146,42,0.35)",
          color: "#C4922A",
        }}
      >
        {status}
      </span>
      </div>
    </div>
  )
}

interface LocationsSectionProps {
  lang?: Lang
  copy?: LocationsSectionCopy
  locations?: LocationItem[]
}

export function LocationsSection({ lang, copy, locations }: LocationsSectionProps) {
  const safeLang = lang ?? "pl";
  const safeCopy = copy ?? locationsSectionByLang[safeLang] ?? locationsSectionByLang.pl;
  const resolvedLocations = locations && locations.length > 0
    ? locations.map((loc) => ({
      name: loc.name,
      description: loc.description,
      detail: [loc.address, loc.modules].filter(Boolean).join(" · "),
      status: loc.status || safeCopy.statusConfirmed,
      image: loc.image,
    }))
    : safeCopy.locations.map((loc) => ({
      ...loc,
      status: safeCopy.statusConfirmed,
      image: undefined,
    }));
  const gridColsClass =
    resolvedLocations.length >= 5
      ? "grid grid-cols-5 gap-[1px]"
      : "grid grid-cols-2 lg:grid-cols-4 gap-[1px]";
  const useSingleRowFive = resolvedLocations.length >= 5;
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
        {useSingleRowFive ? (
          <div
            className="flex w-full flex-nowrap gap-[1px]"
            style={{ backgroundColor: "#253344" }}
          >
            {resolvedLocations.map((loc, i) => (
              <div key={`${i + 1}-${loc.name}`} className="min-w-0 flex-1">
                <LocationBlock
                  number={String(i + 1).padStart(2, "0")}
                  name={loc.name}
                  description={loc.description}
                  detail={loc.detail}
                  status={loc.status}
                  image={loc.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={gridColsClass}
            style={{ backgroundColor: "#253344" }}
          >
            {resolvedLocations.map((loc, i) => (
              <LocationBlock
                key={`${i + 1}-${loc.name}`}
                number={String(i + 1).padStart(2, "0")}
                name={loc.name}
                description={loc.description}
                detail={loc.detail}
                status={loc.status}
                image={loc.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
