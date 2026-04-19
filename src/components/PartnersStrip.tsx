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
      <div className="relative w-full h-16 sm:h-20 md:h-24 mb-3 sm:mb-4">
        {partner.logo && !imageError ? (
          <img src={partner.logo} alt={partner.name} style={{ height: '20px', width: 'auto', objectFit: 'contain', marginRight: '8px', opacity: 0.7 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#C4922A] text-2xl font-bold">{partner.name[0]}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <span className={`
        font-rajdhani font-bold
        text-[10px] sm:text-xs
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
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3">
        {partner.logo && !imageError ? (
          <img src={partner.logo} alt={partner.name} style={{ height: '20px', width: 'auto', objectFit: 'contain', marginRight: '8px', opacity: 0.7 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-full bg-[#253344]">
            <span className="text-[#5A6A7A] text-sm font-bold">{partner.name[0]}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <span className={`
        font-rajdhani font-bold
        text-[8px] sm:text-[9px] md:text-[10px]
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
      <div className={`h-px flex-1 ${accent ? 'bg-gradient-to-r from-transparent via-[#C4922A]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-[#3A4A5A]/40 to-transparent'}`} />
      <h3 className={`
        font-rajdhani font-bold
        text-[10px] sm:text-xs md:text-sm
        tracking-[3px] sm:tracking-[4px] md:tracking-[5px]
        ${accent ? 'text-[#C4922A]' : 'text-[#4A5A6A]'}
      `}>
        {children}
      </h3>
      <div className={`h-px flex-1 ${accent ? 'bg-gradient-to-r from-transparent via-[#C4922A]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-[#3A4A5A]/40 to-transparent'}`} />
    </div>
  )
}

export function PartnersStrip() {
  return (
    <section className="w-full bg-gradient-to-b from-[#161F28] via-[#1A2530] to-[#161F28] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Media Patronage Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <SectionHeader accent>PATRONAT MEDIALNY</SectionHeader>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {mediaPatrons.map((patron) => (
              <MediaPatronCard key={patron.name} partner={patron} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px w-full mb-12 sm:mb-16 md:mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#253344] to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#253344] border border-[#3A4A5A]" />
        </div>

        {/* Partners Section */}
        <div>
          <SectionHeader>PARTNERZY</SectionHeader>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <a
              href="#"
              className="
                group inline-flex items-center gap-2
                px-5 py-2.5 sm:px-6 sm:py-3
                border border-[#C4922A]/30
                rounded-full
                font-rajdhani font-bold
                text-[10px] sm:text-xs
                tracking-[2px] sm:tracking-[3px]
                text-[#C4922A]
                transition-all duration-300
                hover:border-[#C4922A]
                hover:bg-[#C4922A]/10
                hover:shadow-[0_0_20px_rgba(196,146,42,0.2)]
              "
            >
              <span>ZOSTAŃ PARTNEREM</span>
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
