"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  value: string
  numericValue: number
  prefix?: string
  suffix?: string
  label: string
  color: "gold" | "red"
}

const stats: Stat[] = [
  {
    value: "250+",
    numericValue: 250,
    suffix: "+",
    label: "UCZESTNIKÓW",
    color: "gold",
  },
  {
    value: "10+",
    numericValue: 10,
    suffix: "+",
    label: "KRAJÓW NATO · UE",
    color: "red",
  },
  {
    value: "3",
    numericValue: 3,
    label: "SPECJALIZACJE K9",
    color: "gold",
  },
  {
    value: "2",
    numericValue: 2,
    label: "DNI INTENSYWNYCH SZKOLEŃ",
    color: "red",
  },
  {
    value: "100+",
    numericValue: 100,
    suffix: "+",
    label: "UCZESTNIKÓW SZKOLENIA DRONOWEGO · TCCC · TCCC-K9",
    color: "gold",
  },
  {
    value: "1ST",
    numericValue: 1,
    suffix: "ST",
    label: "KONFERENCJA BEZPIECZEŃSTWA DLA WSZYSTKICH POWIATÓW",
    color: "red",
  },
]

function useCountUp(
  end: number,
  duration: number = 1500,
  shouldStart: boolean
): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, shouldStart])

  return count
}

function StatItem({
  stat,
  index,
  isVisible,
}: {
  stat: Stat
  index: number
  isVisible: boolean
}) {
  const count = useCountUp(stat.numericValue, 1500, isVisible)
  const isGold = stat.color === "gold"
  const accentColor = isGold ? "#C4922A" : "#C42B2B"

  return (
    <div
      className={`
        group relative flex flex-col
        px-3 py-5 sm:px-4 sm:py-6 lg:px-5 lg:py-8
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Subtle background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}08 0%, transparent 70%)`
        }}
      />

      {/* Vertical divider */}
      {index > 0 && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1">
          <div 
            className="w-px h-3 transition-all duration-500"
            style={{ 
              background: `linear-gradient(to bottom, transparent, ${accentColor}40)`,
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 80 + 300}ms`
            }}
          />
          <div 
            className="w-1 h-1 rounded-full transition-all duration-500"
            style={{ 
              backgroundColor: `${accentColor}60`,
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 80 + 400}ms`
            }}
          />
          <div 
            className="w-px h-3 transition-all duration-500"
            style={{ 
              background: `linear-gradient(to top, transparent, ${accentColor}40)`,
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 80 + 300}ms`
            }}
          />
        </div>
      )}

      {/* Number container - fixed height for alignment */}
      <div className="relative h-[48px] sm:h-[56px] lg:h-[64px] flex items-center justify-center">
        {/* Glow effect behind number */}
        <div 
          className="absolute inset-0 blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
          style={{ 
            backgroundColor: accentColor,
            transform: 'scale(1.5)'
          }}
        />
        
        <div
          className={`
            relative font-[family-name:var(--font-bebas)] 
            text-[40px] sm:text-[48px] lg:text-[56px] leading-none
            transition-all duration-500 group-hover:scale-105
          `}
          style={{ 
            color: accentColor,
            textShadow: isVisible ? `0 0 30px ${accentColor}40` : 'none'
          }}
        >
          {stat.prefix}
          {count}
          {stat.suffix}
        </div>
      </div>

      {/* Accent line - fixed position */}
      <div className="h-4 flex items-center justify-center">
        <div 
          className="h-px transition-all duration-700 ease-out"
          style={{ 
            width: isVisible ? '32px' : '0px',
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            transitionDelay: `${index * 80 + 200}ms`
          }}
        />
      </div>

      {/* Label container - fixed height for alignment */}
      <div className="h-[36px] sm:h-[40px] lg:h-[44px] flex items-start justify-center">
        <div
          className={`
            font-[family-name:var(--font-rajdhani)] 
            text-[8px] sm:text-[9px] lg:text-[10px] font-bold
            tracking-[2px] sm:tracking-[2.5px] lg:tracking-[3px] 
            text-[#4A5A6A] group-hover:text-[#6A7A8A]
            text-center leading-tight
            transition-all duration-500
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: `${index * 80 + 300}ms` }}
        >
          {stat.label}
        </div>
      </div>
    </div>
  )
}

export function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0F1720', paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Subtle top border with gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1A2230 20%, #2A3A4A 50%, #1A2230 80%, transparent)'
        }}
      />

      {/* Very subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Main content */}
      <div className="relative w-full">
        <div
          className="
            grid grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-6
          "
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Subtle bottom border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1A2230 20%, #1A2230 80%, transparent)'
        }}
      />
    </section>
  )
}
