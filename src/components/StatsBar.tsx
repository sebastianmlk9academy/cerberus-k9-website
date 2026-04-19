"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  value: string
  numericValue: number
  prefix?: string
  suffix?: string
  label: string
  color: "gold" | "red"
  designation: string
}

const stats: StatItem[] = [
  {
    value: "250+",
    numericValue: 250,
    suffix: "+",
    label: "UCZESTNIKÓW",
    color: "gold",
    designation: "ALPHA-01",
  },
  {
    value: "10+",
    numericValue: 10,
    suffix: "+",
    label: "KRAJÓW NATO · UE",
    color: "red",
    designation: "BRAVO-02",
  },
  {
    value: "3",
    numericValue: 3,
    label: "SPECJALIZACJE K9",
    color: "gold",
    designation: "CHARLIE-03",
  },
  {
    value: "2",
    numericValue: 2,
    label: "DNI INTENSYWNYCH SZKOLEŃ",
    color: "red",
    designation: "DELTA-04",
  },
  {
    value: "100+",
    numericValue: 100,
    suffix: "+",
    label: "UCZESTNIKÓW SZKOLENIA DRONOWEGO · TCCC · TCCC-K9",
    color: "gold",
    designation: "ECHO-05",
  },
  {
    value: "1ST",
    numericValue: 1,
    suffix: "ST",
    label: "KONFERENCJA BEZPIECZEŃSTWA DLA WSZYSTKICH POWIATÓW",
    color: "red",
    designation: "FOXTROT-06",
  },
]

function useCountUp(
  end: number,
  duration: number,
  shouldStart: boolean,
  suffix?: string
): string {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!shouldStart || hasStarted) return

    setHasStarted(true)
    const startTime = performance.now()
    const startValue = 0

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [shouldStart, end, duration, hasStarted])

  return `${count}${suffix || ""}`
}

function TacticalButton({
  stat,
  isVisible,
  index,
}: {
  stat: StatItem
  isVisible: boolean
  index: number
}) {
  const displayValue = useCountUp(
    stat.numericValue,
    1500,
    isVisible,
    stat.suffix
  )
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [scanLine, setScanLine] = useState(0)
  const hoverPulseRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef<SVGCircleElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  const primaryColor = stat.color === "gold" ? "#C4922A" : "#C42B2B"
  const secondaryColor = stat.color === "gold" ? "#8B6914" : "#8B1A1A"
  const delay = index * 120

  // Scanning animation
  useEffect(() => {
    if (!isHovered) {
      setScanLine(0)
      return
    }
    
    const interval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100)
    }, 30)
    
    return () => clearInterval(interval)
  }, [isHovered])

  useEffect(() => {
    if (!isHovered || !hoverPulseRef.current) return

    const animation = hoverPulseRef.current.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0.5, transform: "scale(0.8)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 1000, iterations: Infinity, easing: "ease-in-out" }
    )

    return () => animation.cancel()
  }, [isHovered])

  useEffect(() => {
    if (!isHovered || !spinRef.current) return

    const animation = spinRef.current.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: 8000, iterations: Infinity, easing: "linear" }
    )

    return () => animation.cancel()
  }, [isHovered])

  useEffect(() => {
    if (!isPressed || !rippleRef.current) return

    const animation = rippleRef.current.animate(
      [
        { transform: "scale(0.8)", opacity: 1 },
        { transform: "scale(1.2)", opacity: 0 },
      ],
      { duration: 400, easing: "ease-out", fill: "forwards" }
    )

    return () => animation.cancel()
  }, [isPressed])

  return (
    <button
      type="button"
      className={`
        group relative flex flex-col items-center justify-center
        px-3 py-6 sm:px-4 sm:py-8 lg:px-5 lg:py-10
        cursor-pointer select-none
        transition-all duration-200 ease-out
        outline-none
        ${isPressed ? "scale-[0.98]" : isHovered ? "scale-[1.01]" : "scale-100"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        background: isHovered
          ? `linear-gradient(180deg, ${primaryColor}05 0%, ${primaryColor}12 50%, ${primaryColor}05 100%)`
          : "transparent",
      }}
    >
      {/* Tactical grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${primaryColor}08 1px, transparent 1px),
            linear-gradient(90deg, ${primaryColor}08 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          opacity: isHovered ? 0.3 : 0.1,
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* Horizontal scan line */}
      {isHovered && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${scanLine}%`,
            background: `linear-gradient(90deg, transparent, ${primaryColor}60, ${primaryColor}, ${primaryColor}60, transparent)`,
            boxShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}50`,
          }}
        />
      )}

      {/* Status indicator - top left */}
      <div
        className="absolute top-2 left-2 flex items-center gap-1.5 transition-all duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 100}ms`,
        }}
      >
        <div
          ref={hoverPulseRef}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: primaryColor,
            boxShadow: `0 0 6px ${primaryColor}, 0 0 12px ${primaryColor}50`,
          }}
        />
        <span
          className="font-[family-name:var(--font-rajdhani)] text-[7px] sm:text-[8px] font-bold tracking-[2px]"
          style={{ color: isHovered ? primaryColor : "#3A4A5A" }}
        >
          {stat.designation}
        </span>
      </div>

      {/* Status indicator - top right (ACTIVE/STANDBY) */}
      <div
        className="absolute top-2 right-2 flex items-center gap-1 transition-all duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 150}ms`,
        }}
      >
        <span
          className="font-[family-name:var(--font-rajdhani)] text-[6px] sm:text-[7px] font-bold tracking-[1px]"
          style={{ color: isHovered ? "#22C55E" : "#3A4A5A" }}
        >
          {isHovered ? "ACTIVE" : "STANDBY"}
        </span>
        <div
          className="w-1 h-1 rounded-full transition-colors duration-300"
          style={{
            background: isHovered ? "#22C55E" : "#3A4A5A",
            boxShadow: isHovered ? "0 0 4px #22C55E" : "none",
          }}
        />
      </div>

      {/* Corner brackets - tactical style */}
      <svg
        className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 200}ms`,
        }}
      >
        <path
          d="M0 16 L0 0 L16 0"
          fill="none"
          stroke={isHovered ? primaryColor : `${primaryColor}50`}
          strokeWidth={isHovered ? 2 : 1}
          style={{
            filter: isHovered ? `drop-shadow(0 0 4px ${primaryColor})` : "none",
          }}
        />
      </svg>
      <svg
        className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 250}ms`,
        }}
      >
        <path
          d="M24 16 L24 0 L8 0"
          fill="none"
          stroke={isHovered ? primaryColor : `${primaryColor}50`}
          strokeWidth={isHovered ? 2 : 1}
          style={{
            filter: isHovered ? `drop-shadow(0 0 4px ${primaryColor})` : "none",
          }}
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 300}ms`,
        }}
      >
        <path
          d="M0 8 L0 24 L16 24"
          fill="none"
          stroke={isHovered ? primaryColor : `${primaryColor}50`}
          strokeWidth={isHovered ? 2 : 1}
          style={{
            filter: isHovered ? `drop-shadow(0 0 4px ${primaryColor})` : "none",
          }}
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 350}ms`,
        }}
      >
        <path
          d="M24 8 L24 24 L8 24"
          fill="none"
          stroke={isHovered ? primaryColor : `${primaryColor}50`}
          strokeWidth={isHovered ? 2 : 1}
          style={{
            filter: isHovered ? `drop-shadow(0 0 4px ${primaryColor})` : "none",
          }}
        />
      </svg>

      {/* Targeting reticle behind number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isHovered ? 0.15 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            ref={spinRef}
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{ transformOrigin: "center" }}
          />
          <circle
            cx="40"
            cy="40"
            r="20"
            fill="none"
            stroke={primaryColor}
            strokeWidth="0.5"
          />
          <line x1="40" y1="5" x2="40" y2="15" stroke={primaryColor} strokeWidth="1" />
          <line x1="40" y1="65" x2="40" y2="75" stroke={primaryColor} strokeWidth="1" />
          <line x1="5" y1="40" x2="15" y2="40" stroke={primaryColor} strokeWidth="1" />
          <line x1="65" y1="40" x2="75" y2="40" stroke={primaryColor} strokeWidth="1" />
        </svg>
      </div>

      {/* Number display */}
      <div className="relative z-10 flex flex-col items-center mt-4">
        <span
          className={`
            font-[family-name:var(--font-bebas)] text-4xl sm:text-[46px] lg:text-[52px] leading-none
            transition-all duration-500 ease-out
            ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}
          `}
          style={{
            color: primaryColor,
            transitionDelay: `${delay}ms`,
            textShadow: isHovered
              ? `0 0 30px ${primaryColor}, 0 0 60px ${primaryColor}80, 0 0 90px ${primaryColor}40, 0 2px 4px rgba(0,0,0,0.8)`
              : `0 0 15px ${primaryColor}60, 0 2px 4px rgba(0,0,0,0.5)`,
            transform: isPressed ? "scale(0.96)" : isHovered ? "scale(1.08)" : "scale(1)",
            letterSpacing: "2px",
          }}
        >
          {displayValue}
        </span>
      </div>

      {/* Data line with markers */}
      <div
        className="relative z-10 flex items-center gap-1 mt-3 mb-2 transition-all duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 200}ms`,
        }}
      >
        <div
          className="w-2 h-2 rotate-45 transition-all duration-300"
          style={{
            background: isHovered ? primaryColor : secondaryColor,
            boxShadow: isHovered ? `0 0 8px ${primaryColor}` : "none",
          }}
        />
        <div
          className="h-px transition-all duration-500 ease-out"
          style={{
            width: isHovered ? "50px" : "30px",
            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}50)`,
            boxShadow: isHovered ? `0 0 10px ${primaryColor}` : "none",
          }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: isHovered ? primaryColor : secondaryColor,
            boxShadow: isHovered ? `0 0 6px ${primaryColor}` : "none",
          }}
        />
        <div
          className="h-px transition-all duration-500 ease-out"
          style={{
            width: isHovered ? "50px" : "30px",
            background: `linear-gradient(90deg, ${primaryColor}50, ${primaryColor})`,
            boxShadow: isHovered ? `0 0 10px ${primaryColor}` : "none",
          }}
        />
        <div
          className="w-2 h-2 rotate-45 transition-all duration-300"
          style={{
            background: isHovered ? primaryColor : secondaryColor,
            boxShadow: isHovered ? `0 0 8px ${primaryColor}` : "none",
          }}
        />
      </div>

      {/* Label */}
      <span
        className={`
          font-[family-name:var(--font-rajdhani)] text-[8px] sm:text-[9px] lg:text-[10px] font-bold
          tracking-[2px] sm:tracking-[3px]
          text-center leading-tight
          max-w-[140px] sm:max-w-[160px] lg:max-w-[180px]
          relative z-10
          transition-all duration-500 ease-out
        `}
        style={{
          color: isHovered ? "#7A8A9A" : "#4A5A6A",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(8px)",
          transitionDelay: `${delay + 150}ms`,
          textShadow: isHovered ? `0 0 10px ${primaryColor}20` : "none",
        }}
      >
        {stat.label}
      </span>

      {/* Bottom data readout */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <span
          className="font-[family-name:var(--font-rajdhani)] text-[6px] font-bold tracking-[1px]"
          style={{ color: "#3A4A5A" }}
        >
          INTEL VERIFIED
        </span>
        <div className="flex gap-0.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-2"
              style={{
                background: i < 2 ? primaryColor : "#2A3A4A",
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Press ripple effect */}
      {isPressed && (
        <div
          ref={rippleRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${primaryColor}20 0%, transparent 70%)`,
          }}
        />
      )}
    </button>
  )
}

export function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const headerPulseRef = useRef<HTMLDivElement>(null)
  const footerPulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!headerPulseRef.current) return

    const animation = headerPulseRef.current.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0.5, transform: "scale(0.8)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 2000, iterations: Infinity, easing: "ease-in-out" }
    )

    return () => animation.cancel()
  }, [])

  useEffect(() => {
    if (!footerPulseRef.current) return

    const animation = footerPulseRef.current.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0.5, transform: "scale(0.8)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 2000, iterations: Infinity, easing: "ease-in-out" }
    )

    return () => animation.cancel()
  }, [])

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#0A0F14] relative overflow-hidden"
    >
        {/* Top border with glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #1A2230 20%, #2A3A4A 50%, #1A2230 80%, transparent)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #C4922A30 50%, transparent)",
            filter: "blur(1px)",
          }}
        />

        {/* NATO classification header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-[#1A2230]/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#C4922A] rounded-sm" style={{ boxShadow: "0 0 8px #C4922A50" }} />
              <div className="w-2 h-2 bg-[#C42B2B] rounded-sm" style={{ boxShadow: "0 0 8px #C42B2B50" }} />
            </div>
            <span className="font-[family-name:var(--font-rajdhani)] text-[9px] sm:text-[10px] font-bold tracking-[3px] text-[#3A4A5A]">
              CERBERUS K9 // OPERATION METRICS
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-[family-name:var(--font-rajdhani)] text-[8px] font-bold tracking-[2px] text-[#3A4A5A]">
              NATO CLASSIFIED
            </span>
            <div ref={headerPulseRef} className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          </div>
        </div>

        {/* Main content wrapper */}
        <div className="relative">
          {/* Background tactical pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196, 146, 42, 0.04) 0%, transparent 50%),
                radial-gradient(ellipse 80% 50% at 50% 100%, rgba(196, 43, 43, 0.03) 0%, transparent 50%)
              `,
            }}
          />

          {/* Desktop: 6 columns */}
          <div className="hidden lg:grid lg:grid-cols-6 relative z-10 divide-x divide-[#1A2230]/60">
            {stats.map((stat, index) => (
              <TacticalButton
                key={stat.designation}
                stat={stat}
                isVisible={isVisible}
                index={index}
              />
            ))}
          </div>

          {/* Tablet: 3 columns, 2 rows */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:hidden relative z-10 divide-x divide-[#1A2230]/60">
            {stats.slice(0, 3).map((stat, index) => (
              <TacticalButton
                key={stat.designation}
                stat={stat}
                isVisible={isVisible}
                index={index}
              />
            ))}
          </div>
          <div className="hidden sm:grid sm:grid-cols-3 lg:hidden relative z-10 divide-x divide-[#1A2230]/60 border-t border-[#1A2230]/60">
            {stats.slice(3).map((stat, index) => (
              <TacticalButton
                key={stat.designation}
                stat={stat}
                isVisible={isVisible}
                index={index + 3}
              />
            ))}
          </div>

          {/* Mobile: 2 columns */}
          <div className="grid grid-cols-2 sm:hidden relative z-10">
            {stats.map((stat, index) => (
              <div
                key={stat.designation}
                className={`
                  ${index % 2 === 0 ? "border-r border-[#1A2230]/60" : ""}
                  ${index < 4 ? "border-b border-[#1A2230]/60" : ""}
                `}
              >
                <TacticalButton stat={stat} isVisible={isVisible} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-t border-[#1A2230]/50 bg-[#080C10]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div ref={footerPulseRef} className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span className="font-[family-name:var(--font-rajdhani)] text-[8px] font-bold tracking-[2px] text-[#3A4A5A]">
                SYSTEMS ONLINE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="font-[family-name:var(--font-rajdhani)] text-[7px] font-bold tracking-[1px] text-[#2A3A4A]">
                ENCRYPTION: AES-256
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-rajdhani)] text-[7px] sm:text-[8px] font-bold tracking-[2px] text-[#2A3A4A]">
              REF: CK9-2024-OPS
            </span>
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-3"
                  style={{
                    background: i < 3 ? "#C4922A" : "#1A2230",
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #1A2230 20%, #2A3A4A 50%, #1A2230 80%, transparent)",
          }}
        />
    </section>
  )
}
