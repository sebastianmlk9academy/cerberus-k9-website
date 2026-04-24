"use client"

import { useState } from "react"

interface Partner {
  name: string
  logo: string | null
  url?: string
}

const mediaPatrons: Partner[] = [
  {
    name: "POLSKA ZBROJNA",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Polska%20Zbrojna-khEyAPmGAkhHX4IAVuiDjYLAqdTuoA.webp",
    url: "https://polska-zbrojna.pl",
  },
  {
    name: "SPECIAL OPS",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/special-ops-logo-1-aKqs9eqCEBoNfiGfXd2COdP8qMZtns.webp",
    url: "https://special-ops.pl",
  },
]

const partners: Partner[] = [
  {
    name: "POLITECHNIKA WROCŁAWSKA",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Politechnika%20Wroc%C5%82awska-bMf1AU1ZOaGoG2raCdKyyGazQpQI6u.webp",
  },
  {
    name: "ASTRIVA",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astriva-logo-0p88smYLLCJekxGZrKcWgVzM5HJCj8.webp",
  },
  {
    name: "WOPR",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wopr-I5BCl7zZm2JTLmXzWMKw3AChpkC4Zg.webp",
  },
  {
    name: "PZSO",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PZSO-yZgAaGjcQBuj54Ax83d0qlCz4fL46X.webp",
  },
  {
    name: "SMART TARGET",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Smart%20Target-GqsRtYarx3io0nrWEQCWoTOjpm1mLv.webp",
  },
  {
    name: "OBRONA POWSZECHNA",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Obrona%20Powszechna-dmnnCmzvoiFfBRngRmbYdqfeDRa2d7.webp",
  },
  {
    name: "JS 3102 GRYF",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jednostka%20Strzelecka%203102%20GRYF-IifeMDJr6xPU7yqVkJgy5UKaSjDerI.webp",
  },
  {
    name: "RESCUE TEAM SE.A.L.",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rescue%20Team%20SE.AL.-mSxq32Jr7TWiiO7jVs0TZzHRjUJWlG.webp",
  },
  {
    name: "SOF K9 LUBLINIEC",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/K9%20SOF%20Lubliniec-artpTknhksLDSxkhJyjN82TuLV4172.webp",
  },
  {
    name: "ETO K9",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/K9%20ETO-cykwJh43PrBIrkyYV0bJOC4AXZRKQV.webp",
  },
  {
    name: "GRUPA KMS K9",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grupa%20KMS-uQtZha8d8KN8g4Agiz8VbSKYlEyFJ1.webp",
  },
  {
    name: "VALHALL K-9",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valhall%20K9-qobBFVbFLarEmNDPb2waxfUzwFEiOC.webp",
  },
]

function MediaPatronCard({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={partner.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col items-center justify-center
        p-4 sm:p-6 md:p-8
        bg-gradient-to-b from-[#1E2B38] to-[#161F28]
        border border-[#C4922A]/30
        rounded-lg
        transition-all duration-300 ease-out
        hover:border-[#C4922A]/60
        hover:shadow-[0_0_30px_rgba(196,146,42,0.15)]
        hover:scale-[1.02]
        cursor-pointer
        min-w-[140px] sm:min-w-[180px] md:min-w-[220px]
        flex-1 max-w-[280px] sm:max-w-[320px]
      `}
    >
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
        bg-gradient-to-b from-[#C4922A]/5 to-transparent
        ${isHovered ? 'opacity-100' : ''}
      `} />

      {/* Logo */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2 mb-3 sm:mb-4 min-h-16 sm:min-h-20 md:min-h-24">
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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col items-center justify-center
        p-3 sm:p-4 md:p-5
        bg-[#1A2530]/50
        border border-[#253344]/50
        rounded-lg
        transition-all duration-300 ease-out
        hover:border-[#3A4A5A]
        hover:bg-[#1E2B38]
        cursor-pointer
        min-w-[100px] sm:min-w-[120px] md:min-w-[140px]
      `}
    >
      {/* Logo */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2 mb-2 sm:mb-3 min-h-12 sm:min-h-14 md:min-h-16">
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
          <div className="w-full h-full flex items-center justify-center rounded-full bg-[#253344]">
            <span className="text-[#5A6A7A] text-sm font-bold">{partner.name[0]}</span>
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
    </div>
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

export function PartnersStrip() {
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
              PATRONATY I PARTNERSTWA
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
            PATRONATY
          </h2>
        </div>

        {/* Media Patronage Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <SectionHeader accent>PATRONAT MEDIALNY</SectionHeader>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {mediaPatrons.map((patron) => (
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
              PARTNERZY
            </h2>
          </div>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <a
              href="#"
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
              ZOSTAŃ PARTNEREM
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
