"use client"

import { useState, useEffect, useCallback } from "react"
import type { Lang } from "../i18n/utils"
import type { VideoSectionCopy } from "../i18n/videoSection"

interface SideVideo {
  id: string
  badge: string
  title: string
  embedUrl: string
}

// Extract YouTube video ID from embed URL
function getYouTubeThumbnail(embedUrl: string): string {
  const videoId = embedUrl.split("/embed/")[1]?.split("?")[0]
  // Use hqdefault as it's more reliably available than maxresdefault
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const mainVideo = {
  id: "polska-zbrojna",
  badge: "POLSKA ZBROJNA · PATRON MEDIALNY",
  title: "CERBERUS K9 2025",
  embedUrl: "https://www.youtube.com/embed/kUhqmGhrbas",
}

const topSideVideos: SideVideo[] = [
  {
    id: "tvp",
    badge: "TVP",
    title: "TVP — Relacja z CERBERUS K9 2025",
    embedUrl: "https://www.youtube.com/embed/Fo-j5vGI0m4",
  },
  {
    id: "polskie-radio",
    badge: "Polskie Radio",
    title: "Polskie Radio",
    embedUrl: "https://www.youtube.com/embed/lf-Aek_TSzI",
  },
]

const bottomVideos: SideVideo[] = [
  {
    id: "tvn",
    badge: "TVN",
    title: "TVN — Fakty",
    embedUrl: "https://www.youtube.com/embed/aNG1UVyOqNA",
  },
  {
    id: "ceska-tv",
    badge: "Czeska Telewizja Publiczna",
    title: "Czeska Telewizja Publiczna - Reportaż",
    embedUrl: "https://www.youtube.com/embed/YAsXbzL3PWs",
  },
]

interface VideoSectionProps { lang: Lang; copy: VideoSectionCopy; }

export function VideoSection({ lang, copy }: VideoSectionProps) {
  const [modalVideo, setModalVideo] = useState<string | null>(null)

  const closeModal = useCallback(() => {
    setModalVideo(null)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    if (modalVideo) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [modalVideo, closeModal])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <section
      className="w-full bg-gradient-to-b from-[#161F28] via-[#1A2530] to-[#161F28]"
      data-lang={lang}
      style={{ paddingTop: "80px", paddingBottom: "10px", paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C42B2B]/40 to-transparent" />
          <span 
            className="font-[family-name:var(--font-rajdhani)] text-[12px] font-medium tracking-[5px] text-[#C42B2B]"
          >
            {copy.sectionTag}
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
          {copy.sectionTitle}
        </h2>
      </div>

      {/* Video Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Main Video + Bottom Videos */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          {/* Main Video */}
          <button
            onClick={() => setModalVideo(mainVideo.embedUrl)}
            className="text-left w-full group cursor-pointer"
          >
            <div
              className="relative w-full"
              style={{ backgroundColor: "#151E28" }}
            >
              <div className="aspect-video relative">
                {/* Thumbnail */}
                <img
                  src={getYouTubeThumbnail(mainVideo.embedUrl)}
                  alt={mainVideo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className="flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: "2px solid rgba(196, 43, 43, 0.7)",
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "14px solid #C42B2B",
                        borderTop: "9px solid transparent",
                        borderBottom: "9px solid transparent",
                        marginLeft: "4px",
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Overlay Badge */}
              <div
                className="absolute bottom-3 left-3 bg-[rgba(15,23,32,0.9)] text-[#C4922A] group-hover:bg-[rgba(196,146,42,0.9)] group-hover:text-[#0F1720] text-[8px] tracking-[2px] font-bold px-2.5 py-1"
                style={{
                  fontFamily: "'Rajdhani', Trebuchet MS, sans-serif",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
              >
                POLSKA ZBROJNA · PATRON MEDIALNY
              </div>
            </div>
          </button>
          <p
            className="mt-2 text-[11px] text-[#E4DDD0]"
            style={{ fontFamily: "'Rajdhani', Trebuchet MS, sans-serif" }}
          >
            {copy.mainVideoTitle}
          </p>

          {/* Bottom Videos - TVN and Czeska TV */}
          <div className="flex flex-col md:flex-row gap-5">
            {bottomVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setModalVideo(video.embedUrl)}
                className="text-left flex-1 group cursor-pointer"
              >
                {/* Video Thumbnail with Play Button */}
                <div
                  className="relative aspect-video w-full"
                  style={{ backgroundColor: "#151E28" }}
                >
                  {/* Thumbnail */}
                  <img
                    src={getYouTubeThumbnail(video.embedUrl)}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "2px solid rgba(196, 43, 43, 0.7)",
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "10px solid #C42B2B",
                          borderTop: "6px solid transparent",
                          borderBottom: "6px solid transparent",
                          marginLeft: "3px",
                        }}
                      />
                    </div>
                  </div>
                  {/* Badge */}
                  <div
                    className="absolute bottom-2 left-2 transition-colors duration-200 bg-[#C42B2B] group-hover:bg-[#8B1A1A] text-white text-[8px] font-bold px-1.5 py-0.5"
                    style={{ fontFamily: "'Rajdhani', Trebuchet MS, sans-serif" }}
                  >
                    {video.badge}
                  </div>
                </div>
                {/* Title */}
                <p
                  className="mt-2 text-[11px] text-[#E4DDD0]"
                  style={{ fontFamily: "'Rajdhani', Trebuchet MS, sans-serif" }}
                >
                  {video.title}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Side Videos - 35% (TVP and Polskie Radio only) */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4">
          {topSideVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setModalVideo(video.embedUrl)}
              className="text-left w-full group cursor-pointer"
            >
              {/* Video Thumbnail with Play Button */}
              <div
                className="relative aspect-video w-full bg-[#151E28]"
              >
                {/* Thumbnail */}
                <img
                  src={getYouTubeThumbnail(video.embedUrl)}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center transition-transform group-hover:scale-110 w-10 h-10 rounded-full border-2 border-[rgba(196,43,43,0.7)]"
                  >
                    <div
                      className="w-0 h-0 ml-[3px]"
                      style={{
                        borderLeft: "10px solid #C42B2B",
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                      }}
                    />
                  </div>
                </div>
                {/* Badge */}
                <div
                  className="absolute bottom-2 left-2 transition-colors duration-200 bg-[#C42B2B] group-hover:bg-[#8B1A1A] text-white text-[8px] font-bold px-1.5 py-0.5"
                  style={{ fontFamily: "'Rajdhani', Trebuchet MS, sans-serif" }}
                >
                  {video.badge}
                </div>
              </div>
              {/* Title */}
              <p
                className="mt-2"
                style={{
                  fontFamily: "'Rajdhani', Trebuchet MS, sans-serif",
                  fontSize: "11px",
                  color: "#E4DDD0",
                }}
              >
                {video.id === "polskie-radio" ? copy.secondaryVideoTitle : video.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Strip */}
      <p
        className="text-center mt-8"
        style={{
          fontFamily: "'Rajdhani', Trebuchet MS, sans-serif",
          fontSize: "15px",
          letterSpacing: "4px",
          color: "#4A5A6A",
          marginTop: "32px",
        }}
      >
        {copy.stripText}
      </p>

      {/* Modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(15, 23, 32, 0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 50,
          }}
          onClick={handleBackdropClick}
        >
          <div
            className="relative w-[90%]"
            style={{ maxWidth: "860px" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 cursor-pointer"
              style={{
                fontFamily: "'Rajdhani', Trebuchet MS, sans-serif",
                fontSize: "20px",
                color: "#E4DDD0",
                background: "transparent",
                border: "none",
                padding: "8px",
              }}
            >
              ✕
            </button>
            {/* Video */}
            <div className="aspect-video w-full">
              <iframe
                src={`${modalVideo}?autoplay=1`}
                title="Video Player"
                className="w-full h-full"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
