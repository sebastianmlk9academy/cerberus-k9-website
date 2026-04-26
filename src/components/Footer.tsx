"use client"
import type { MouseEvent, ReactElement } from "react"
import type { Lang } from "../i18n/utils"
import type { FooterCopy } from "../i18n/footer"
import { footerCopyByLang } from "../i18n/footer"

interface FooterProps {
  lang?: Lang
  copy?: FooterCopy
  email?: string
  phone?: string
  socialFacebook?: string
  socialYoutube?: string
  socialInstagram?: string
  socialLinkedin?: string
  socialTwitter?: string
  address?: string
  foundationName?: string
  domains?: string
  krsNumber?: string
  nipNumber?: string
  regonNumber?: string
}

const INSTAGRAM_FALLBACK = "https://instagram.com"
const LINKEDIN_FALLBACK = "https://linkedin.com"

/** Empty string = hide; undefined = use fallback (IG/LI only). */
function resolveSocialHref(
  prop: string | undefined,
  fallback: string,
): string | null {
  if (prop === "") return null
  return prop ?? fallback
}

function resolveTwitterHref(prop: string | undefined): string | null {
  const t = prop?.trim()
  if (!t) return null
  return t
}

function buildSocialLinks(
  facebookHref: string,
  youtubeHref: string,
  socialInstagram: string | undefined,
  socialLinkedin: string | undefined,
  socialTwitter: string | undefined,
): { label: string; href: string; icon: ReactElement }[] {
  const items: { label: string; href: string; icon: ReactElement }[] = [
    {
      label: "Facebook",
      href: facebookHref,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: youtubeHref,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  const igHref = resolveSocialHref(socialInstagram, INSTAGRAM_FALLBACK)
  if (igHref) {
    items.push({
      label: "Instagram",
      href: igHref,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
    })
  }

  const liHref = resolveSocialHref(socialLinkedin, LINKEDIN_FALLBACK)
  if (liHref) {
    items.push({
      label: "LinkedIn",
      href: liHref,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    })
  }

  const twHref = resolveTwitterHref(socialTwitter)
  if (twHref) {
    items.push({
      label: "X (Twitter)",
      href: twHref,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    })
  }

  return items
}

export function Footer({
  lang,
  copy,
  socialFacebook,
  socialYoutube,
  socialInstagram,
  socialLinkedin,
  socialTwitter,
  address,
  foundationName,
  domains,
  krsNumber,
  nipNumber,
  regonNumber,
}: FooterProps) {
  const resolvedAddress = address ?? "ul. Odolanowska 17, 63-400 Topola Mała"
  const resolvedFoundationName = foundationName ?? "Fundacja PACTA K9"
  const resolvedDomains = domains ?? "cerberusk9.org | pactak9.org"
  const resolvedKrs = krsNumber ?? "0001219121"
  const resolvedNip = nipNumber ?? "6222869581"
  const resolvedRegon = regonNumber ?? "543799847"
  const safeLang = lang ?? "pl";
  const safeCopy = copy ?? footerCopyByLang[safeLang] ?? footerCopyByLang["pl"];
  const socialLinks = buildSocialLinks(
    socialFacebook ?? "https://facebook.com",
    socialYoutube ?? "https://youtube.com",
    socialInstagram,
    socialLinkedin,
    socialTwitter,
  )
  const eventLinks = [
    { label: safeCopy.linkAbout, href: `/${safeLang}/o-wydarzeniu` },
    { label: safeCopy.linkInstructors, href: `/${safeLang}/instruktorzy` },
    { label: safeCopy.linkRegistration, href: `/${safeLang}/rejestracja` },
    { label: safeCopy.linkProgram, href: `/${safeLang}/program` },
    { label: safeCopy.linkGallery, href: `/${safeLang}/galeria` },
    { label: safeCopy.linkMedia, href: `/${safeLang}/media` },
    { label: safeCopy.linkNews, href: `/${safeLang}/aktualnosci` },
  ]

  const orgLinks = [
    { label: safeCopy.linkFoundation, href: `/${safeLang}/fundacja` },
    { label: safeCopy.linkPartners, href: `/${safeLang}/partnerzy` },
    { label: safeCopy.linkContact, href: `/${safeLang}/kontakt` },
  ]

  const mediaLinks = [
  ]

  const contactLinks = []

  return (
    <footer
      className="w-full"
      style={{
        background: "linear-gradient(to bottom, #161F28, #1A2530, #161F28)",
        borderTop: "2px solid #1E2B38",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 items-center text-center md:grid-cols-2 md:items-stretch md:text-left lg:grid-cols-4"
        style={{
          padding: "56px 5% 32px",
          gap: "40px",
        }}
      >
        {/* Column 1 - Brand */}
        <div className="mx-auto flex flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          <img
            src="/images/cerberus-k9-logo.png"
            alt="CERBERUS K9 Logo"
            style={{ height: "64px", width: "auto", marginBottom: "12px" }}
            className="object-contain self-center md:self-start"
          />
          <h2
            className="font-heading"
            style={{
              fontFamily: "var(--font-bebas-neue), 'Bebas Neue', sans-serif",
              fontSize: "22px",
              letterSpacing: "3px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            CERBERUS <span style={{ color: "#B22234" }}>K9</span>
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(6px, 0.75vw, 8px)",
              letterSpacing: "1.8px",
              fontWeight: 700,
              color: "#4A5A6A",
              marginTop: "-1px",
            }}
          >
            INTERNATIONAL DEFENSE PLATFORM
          </p>
          <div
            style={{
              width: "32px",
              height: "1px",
              backgroundColor: "#253344",
              margin: "16px 0",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "11px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            {resolvedFoundationName}
          </p>
          <p
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "10px",
              color: "#FFFFFF",
              margin: 0,
              marginTop: "4px",
            }}
          >
            {resolvedAddress}
          </p>
        </div>

        {/* Column 2 - Event Navigation */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "9px",
              letterSpacing: "3px",
              color: "#C4922A",
              fontWeight: 700,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            {safeCopy.colEvent}
          </h3>
          <nav className="flex flex-col items-center gap-2 md:items-start">
            {eventLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-link"
                style={{
                  fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#C4922A"
                }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#FFFFFF"
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Column 3 - Organization */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "9px",
              letterSpacing: "3px",
              color: "#C4922A",
              fontWeight: 700,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            {safeCopy.colOrg}
          </h3>
          <nav className="flex flex-col items-center gap-2 md:items-start">
            {orgLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-link"
                style={{
                  fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#C4922A"
                }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#FFFFFF"
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Column 4 - Media, Contact, Formal Data + Social */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "9px",
              letterSpacing: "3px",
              color: "#C4922A",
              fontWeight: 700,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            {safeCopy.legalLabel}
          </h3>
          <div
            className="flex flex-col items-center gap-1 md:items-start"
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "10px",
              color: "#FFFFFF",
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ color: "#FFFFFF" }}>KRS:</span> {resolvedKrs}
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "#FFFFFF" }}>NIP:</span> {resolvedNip}
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "#FFFFFF" }}>REGON:</span> {resolvedRegon}
            </p>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex justify-center gap-3 md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon hover:!text-[#C4922A] hover:scale-[1.2]"
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  opacity: 0.7,
                }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#C4922A"
                }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#FFFFFF"
                }}
              >
                {social.icon}
              </a>
            ))}
            <a
              href="https://www.instagram.com/pactak9/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon hover:!text-[#C4922A] hover:scale-[1.2]"
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "color 0.2s ease, transform 0.2s ease",
                opacity: 0.7,
              }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "#C4922A"
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "#FFFFFF"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mx-auto"
        style={{
          borderTop: "1px solid #1A2230",
          marginTop: "0",
          padding: "20px 5% 0",
        }}
      >
        <div className="flex flex-col items-center gap-2 pb-6 text-center md:flex-row md:justify-between md:gap-0 md:text-left">
          <p
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "9px",
              color: "#FFFFFF",
              margin: 0,
              textAlign: "center",
            }}
          >
            {safeCopy.copyright}
          </p>
          <div className="block w-full text-center md:w-auto">
            <p
              style={{
                fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
                fontSize: "9px",
                color: "#FFFFFF",
                margin: 0,
                textAlign: "center",
              }}
            >
              {resolvedDomains}
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-rajdhani), 'Rajdhani', sans-serif",
              fontSize: "9px",
              color: "#FFFFFF",
              margin: 0,
              textAlign: "center",
            }}
          >
            {safeCopy.dateLocation}
          </p>
        </div>
      </div>

    </footer>
  )
}
