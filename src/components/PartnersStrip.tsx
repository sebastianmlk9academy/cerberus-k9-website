"use client"

import { useState } from "react"
import { partnersStripByLang, type PartnersStripCopy } from "../i18n/partnersStrip"
import type { StripPartner } from "../lib/partnersStrip"

interface Partner extends StripPartner {
  name: string
  logo?: string | null
  website?: string | null
  /** @deprecated use website */
  url?: string
}

const mediaPatrons: Partner[] = [
  {
    name: "POLSKA ZBROJNA",
    logo: "",
    website: "https://polska-zbrojna.pl",
  },
  {
    name: "SPECIAL OPS",
    logo: "",
    website: "https://special-ops.pl",
  },
]

/** Gdy CMS nie zwraca żadnych pozycji w pasku — zachowanie jak dotychczas (nazwy bez logo). */
const STRIP_PARTNERS_FALLBACK: Partner[] = [
  { name: "POLITECHNIKA WROCŁAWSKA", logo: "" },
  { name: "ASTRIVA", logo: "" },
  { name: "WOPR", logo: "" },
  { name: "PZSO", logo: "" },
  { name: "SMART TARGET", logo: "" },
  { name: "OBRONA POWSZECHNA", logo: "" },
  { name: "JS 3102 GRYF", logo: "" },
  { name: "RESCUE TEAM SE.A.L.", logo: "" },
  { name: "SOF K9 LUBLINIEC", logo: "" },
  { name: "ETO K9", logo: "" },
  { name: "GRUPA KMS K9", logo: "" },
  { name: "VALHALL K-9", logo: "" },
]

function MediaPatronCard({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={partner.website || partner.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col items-center justify-center
        p-[0.98rem] sm:p-[1.47rem] md:p-[1.96rem]
        bg-gradient-to-b from-[#1E2B38] to-[#161F28]
        border border-[#C4922A]/30
        rounded-lg
        transition-all duration-300 ease-out
        hover:border-[#C4922A]/60
        hover:shadow-[0_0_30px_rgba(196,146,42,0.15)]
        hover:scale-[1.02]
        cursor-pointer
        min-w-[137px] sm:min-w-[176px] md:min-w-[216px]
        flex-1 max-w-[274px] sm:max-w-[314px]
      `}
    >
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
        bg-gradient-to-b from-[#C4922A]/5 to-transparent
        ${isHovered ? 'opacity-100' : ''}
      `} />

      {/* Logo */}
      <div className="relative flex-1 w-full flex items-center justify-center p-[0.7rem] mb-[1.05rem] sm:mb-[1.4rem] min-h-[5.6rem] sm:min-h-[7rem] md:min-h-[8.4rem]">
        {partner.logo && !imageError ? (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={partner.logo}
              alt={partner.name}
              className={`
                w-full h-full object-contain transition-all duration-300
                ${isHovered ? "opacity-100 scale-[1.05]" : "opacity-90 scale-100"}
              `}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#C4922A] text-2xl font-bold">{partner.name[0]}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <span className={`
        font-rajdhani font-bold
        text-[10px]
        mt-2
        tracking-[2px] sm:tracking-[3px]
        text-center
        transition-colors duration-300
        ${isHovered ? 'text-[#C4922A]' : 'text-[#7A8A9A]'}
      `}>
        {partner.name}
      </span>
    </a>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={partner.website ?? partner.url ?? '#'}
      target={partner.website || partner.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col items-center justify-center
        p-[1.05rem] sm:p-[1.4rem] md:p-[1.75rem]
        bg-[#1A2530]/50
        border border-[#253344]/50
        rounded-lg
        transition-all duration-300 ease-out
        hover:border-[#3A4A5A]
        hover:bg-[#1E2B38]
        cursor-pointer
        w-full
        no-underline
      `}
    >
      {/* Logo */}
      <div className="relative w-full mb-[0.7rem] sm:mb-[1.05rem]" style={{aspectRatio:'1', position:'relative'}}>
        {partner.logo && !imageError ? (
          <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img
              src={partner.logo}
              alt={partner.name}
              className={`
                object-contain transition-all duration-300
                ${isHovered ? "opacity-100 scale-[1.05]" : "opacity-90 scale-100"}
              `}
              style={{width:'95%', height:'95%', objectFit:'contain', display:'block', margin:'auto'}}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span className="text-[#4A5A6A] text-[10px] font-bold tracking-[1px] sm:tracking-[2px] text-center leading-tight">
              {partner.name}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <span className={`
        font-rajdhani font-bold
        text-[10px]
        mt-2
        tracking-[1px] sm:tracking-[2px]
        text-center
        leading-tight
        transition-colors duration-300
        max-w-full
        ${isHovered ? 'text-[#C4922A]' : 'text-[#4A5A6A]'}
      `}>
        {partner.name}
      </span>
    </a>
  )
}

function SectionHeader({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className={`h-px flex-1 bg-[length:50%_100%] bg-no-repeat bg-right ${accent ? 'bg-gradient-to-r from-transparent via-[#C4922A]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-[#3A4A5A]/40 to-transparent'}`} />
      <h3 className={`
        font-rajdhani font-bold
        text-[10px] sm:text-xs md:text-sm
        tracking-[3px] sm:tracking-[4px] md:tracking-[5px]
        ${accent ? 'text-[#C4922A]' : 'text-[#4A5A6A]'}
      `}>
        {children}
      </h3>
      <div className={`h-px flex-1 bg-[length:50%_100%] bg-no-repeat bg-left ${accent ? 'bg-gradient-to-r from-transparent via-[#C4922A]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-[#3A4A5A]/40 to-transparent'}`} />
    </div>
  )
}

interface PartnersStripProps {
  partners?: StripPartner[]
  partnerCtaHref?: string
  copy?: PartnersStripCopy
}

export function PartnersStrip({ copy, partners: partnersProp, partnerCtaHref }: PartnersStripProps) {
  const safeCopy = copy ?? partnersStripByLang.pl
  const STRIP_PARTNERS = partnersProp ?? []
  const cmsMediaPatrons = STRIP_PARTNERS.filter((partner) => partner.type === "Patron Medialny")
  const cmsPartners = STRIP_PARTNERS.filter((partner) => partner.type !== "Patron Medialny")
  const mediaPartners = cmsMediaPatrons.length > 0 ? cmsMediaPatrons : mediaPatrons
  const stripPartners =
    cmsPartners.length > 0
      ? cmsPartners
      : STRIP_PARTNERS.length > 0
        ? STRIP_PARTNERS
        : STRIP_PARTNERS_FALLBACK
  const ctaHref = (partnerCtaHref ?? "").trim() || "mailto:sebastian@pactak9.org"

  return (
    <section
      className="w-full bg-gradient-to-b from-[#161F28] via-[#1A2530] to-[#161F28] px-4 sm:px-6 md:px-8"
      style={{ paddingTop: "80px", paddingBottom: "10px" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Tag */}
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
            className="mt-3 font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
            style={{
              fontWeight: 700,
              color: "#E4DDD0",
              letterSpacing: "2px",
            }}
          >
            {(safeCopy as any).sectionTitle ?? safeCopy.patronage}
          </h2>
        </div>

        {/* Media Patronage Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <SectionHeader accent>{safeCopy.mediaPatronage}</SectionHeader>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {mediaPartners.map((patron) => (
              <MediaPatronCard key={patron.name} partner={patron} />
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <div className="text-center mb-6 sm:mb-8">
            <h2
              className="mt-3 font-[family-name:var(--font-rajdhani)] uppercase text-2xl sm:text-3xl lg:text-[32px]"
              style={{
                fontWeight: 700,
                color: "#E4DDD0",
                letterSpacing: "2px",
              }}
            >
              {safeCopy.partners}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" style={{rowGap:'12px',columnGap:'12px'}}>
            {stripPartners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <a
              href={ctaHref}
              className="flex items-center justify-center cursor-pointer transition-colors w-full sm:w-auto text-[10px] sm:text-[11px] px-5 py-3 sm:px-6 sm:py-3.5"
              style={{
                backgroundColor: "transparent",
                color: "#C4922A",
                fontFamily: "var(--font-rajdhani), sans-serif",
                letterSpacing: "3px",
                fontWeight: 700,
                borderRadius: 0,
                border: "1px solid #C4922A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C4922A";
                e.currentTarget.style.color = "#1E2B38";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#C4922A";
              }}
            >
              {safeCopy.becomePartner}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
