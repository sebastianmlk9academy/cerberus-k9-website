"use client"

import type { CSSProperties } from "react"
import { useMemo, useState } from "react"

export interface ModuleItem {
	id: string
	title: string
	day: string
	timeStart: string
	timeEnd: string
	location: string
	category: string
	color: string
	icon: string
	audience: string
	maxParticipants?: number
}

export interface ScheduleBuilderProps {
	modules: ModuleItem[]
	lang: string
	eventDateStart?: string
	eventDateEnd?: string
}

function audienceTokens(audience: string): string[] {
	return audience
		.split(",")
		.map((s) => s.trim().toLowerCase())
		.filter(Boolean)
}

function matchesAudience(m: ModuleItem, selectedType: string | null): boolean {
	if (!selectedType) return false
	const sel = selectedType.trim().toLowerCase()
	const parts = audienceTokens(m.audience)
	return parts.some((p) => p === "wszyscy" || p === sel)
}

function toMinutes(t: string): number {
	const [h, m] = t.split(":").map((x) => parseInt(x, 10))
	if (Number.isNaN(h) || Number.isNaN(m)) return 0
	return h * 60 + m
}

function overlaps(a: ModuleItem, b: ModuleItem): boolean {
	if (a.day !== b.day) return false
	const as = toMinutes(a.timeStart)
	const ae = toMinutes(a.timeEnd)
	const bs = toMinutes(b.timeStart)
	const be = toMinutes(b.timeEnd)
	return as < be && bs < ae
}

function icsEscape(text: string): string {
	return text
		.replace(/\\/g, "\\\\")
		.replace(/\n/g, "\\n")
		.replace(/;/g, "\\;")
		.replace(/,/g, "\\,")
}

function pad2(n: number): string {
	return String(n).padStart(2, "0")
}

/** YYYY-MM-DD + HH:mm → YYYYMMDDTHHmm00 (floating local). */
function icsDateTime(day: string, time: string): string {
	const d = day.slice(0, 10)
	const [hh, mm] = time.split(":").map((x) => pad2(parseInt(x, 10) || 0))
	return `${d.replace(/-/g, "")}T${hh}${mm}00`
}

function generateICS(modules: ModuleItem[], eventName: string, lang: string): string {
	const lines = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//CERBERUS K9//ScheduleBuilder//" + lang.toUpperCase(),
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		`X-WR-CALNAME:${icsEscape(eventName)}`,
	]
	for (const m of modules) {
		const uid = `${m.id}-${icsDateTime(m.day, m.timeStart)}@cerberusk9.org`
		lines.push("BEGIN:VEVENT", `UID:${uid}`)
		lines.push(`DTSTAMP:${icsDateTime(m.day, m.timeStart)}`)
		lines.push(`DTSTART:${icsDateTime(m.day, m.timeStart)}`)
		lines.push(`DTEND:${icsDateTime(m.day, m.timeEnd)}`)
		lines.push(`SUMMARY:${icsEscape(m.title)}`)
		lines.push(`LOCATION:${icsEscape(m.location || "")}`)
		lines.push(
			`DESCRIPTION:${icsEscape(`${m.category}${m.maxParticipants != null ? ` · max ${m.maxParticipants}` : ""}`)}`,
		)
		lines.push("END:VEVENT")
	}
	lines.push("END:VCALENDAR")
	return lines.join("\r\n")
}

function copyForLang(lang: string) {
	const pl = lang === "pl"
	return {
		sectionTag: pl ? "TWÓJ HARMONOGRAM" : "YOUR SCHEDULE",
		sectionTitle: pl ? "ZAPLANUJ UCZESTNICTWO" : "PLAN YOUR ATTENDANCE",
		pickType: pl ? "1. Typ uczestnika" : "1. Participant type",
		typeServices: pl ? "SŁUŻBY" : "SERVICES",
		typeCivilDog: pl ? "CYWIL Z PSEM" : "CIVILIAN + DOG",
		typeCivilNoDog: pl ? "CYWIL BEZ PSA" : "CIVILIAN (NO DOG)",
		pickModules: pl ? "2. Moduły" : "2. Modules",
		selectTypeFirst: pl ? "Najpierw wybierz typ uczestnika." : "Select a participant type first.",
		schedulePreview: pl ? "3. Podgląd" : "3. Preview",
		downloadIcs: pl ? "POBIERZ HARMONOGRAM .ICS" : "DOWNLOAD SCHEDULE .ICS",
		maxParticipants: pl ? "max" : "max",
		noSelection: pl ? "Zaznacz moduły w kroku 2." : "Pick modules in step 2.",
		dayLabel: (n: number) => (pl ? `DZIEŃ ${n}` : `DAY ${n}`),
	}
}

const PARTICIPANT_VALUES = ["służby", "cywil z psem", "cywil bez psa"] as const

export function ScheduleBuilder({
	modules,
	lang,
	eventDateStart,
	eventDateEnd,
}: ScheduleBuilderProps) {
	const t = copyForLang(lang)
	const [selectedType, setSelectedType] = useState<string | null>(null)
	const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

	const sortedDayKeys = useMemo(() => {
		const days = Array.from(new Set(modules.map((m) => m.day))).sort()
		if (days.length === 0 && eventDateStart) {
			return [eventDateStart, eventDateEnd].filter(Boolean) as string[]
		}
		return days
	}, [modules, eventDateStart, eventDateEnd])

	const filteredModules = useMemo(() => {
		if (!selectedType) return [] as ModuleItem[]
		return modules.filter((m) => matchesAudience(m, selectedType))
	}, [modules, selectedType])

	const toggleId = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	const selectedModules = useMemo(
		() => modules.filter((m) => selectedIds.has(m.id)),
		[modules, selectedIds],
	)

	const conflictIds = useMemo(() => {
		const out = new Set<string>()
		const list = selectedModules
		for (let i = 0; i < list.length; i++) {
			for (let j = i + 1; j < list.length; j++) {
				if (overlaps(list[i]!, list[j]!)) {
					out.add(list[i]!.id)
					out.add(list[j]!.id)
				}
			}
		}
		return out
	}, [selectedModules])

	const downloadIcs = () => {
		if (selectedModules.length === 0) return
		const ics = generateICS(selectedModules, "CERBERUS K9", lang)
		const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = "cerberus-k9-schedule.ics"
		a.click()
		URL.revokeObjectURL(url)
	}

	return (
		<section
			className="border-t border-border bg-gradient-to-b from-navyDark via-navyMid to-navyDark px-[5%] py-12 md:py-16"
			aria-labelledby="schedule-builder-heading"
		>
			<div className="mx-auto max-w-5xl">
				<div className="mb-8 text-center">
					<p className="mb-2 font-[family-name:var(--font-rajdhani)] text-[11px] font-semibold tracking-[0.35em] text-red">
						{t.sectionTag}
					</p>
					<h2
						id="schedule-builder-heading"
						className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-wide text-bone md:text-4xl"
					>
						{t.sectionTitle}
					</h2>
				</div>

				<div className="mb-8">
					<p className="mb-3 font-[family-name:var(--font-rajdhani)] text-sm font-semibold text-muted">{t.pickType}</p>
					<div className="flex flex-wrap gap-2">
						{PARTICIPANT_VALUES.map((val) => {
							const label =
								val === "służby"
									? t.typeServices
									: val === "cywil z psem"
										? t.typeCivilDog
										: t.typeCivilNoDog
							const active = selectedType === val
							return (
								<button
									key={val}
									type="button"
									onClick={() => {
										setSelectedType(val)
										setSelectedIds(new Set())
									}}
									className={`rounded border px-4 py-2 font-[family-name:var(--font-rajdhani)] text-xs font-bold tracking-wider transition-colors ${
										active
											? "border-red bg-red/20 text-bone"
											: "border-navyBorder bg-navyDarkest/80 text-muted hover:border-gold/50 hover:text-bone"
									}`}
								>
									{label}
								</button>
							)
						})}
					</div>
				</div>

				<div className="mb-10">
					<p className="mb-3 font-[family-name:var(--font-rajdhani)] text-sm font-semibold text-muted">{t.pickModules}</p>
					{!selectedType ? (
						<p className="text-sm text-muted">{t.selectTypeFirst}</p>
					) : (
						<ul className="grid gap-2 sm:grid-cols-2">
							{filteredModules.map((m) => {
								const checked = selectedIds.has(m.id)
								return (
									<li
										key={m.id}
										className="flex items-start gap-3 rounded border border-navyBorder bg-navyDarkest/60 p-3"
									>
										<input
											id={m.id}
											type="checkbox"
											checked={checked}
											onChange={() => toggleId(m.id)}
											className="mt-1 h-4 w-4 accent-red"
										/>
										<label htmlFor={m.id} className="cursor-pointer font-[family-name:var(--font-rajdhani)] text-sm text-bone">
											<span className="font-bold text-gold">{m.category}</span> · {m.title}
											<span className="block text-xs text-muted">
												{m.day} {m.timeStart}–{m.timeEnd}
												{m.location ? ` · ${m.location}` : ""}
												{m.maxParticipants != null ? ` · ${t.maxParticipants} ${m.maxParticipants}` : ""}
											</span>
										</label>
									</li>
								)
							})}
						</ul>
					)}
				</div>

				<div className="mb-8">
					<p className="mb-3 font-[family-name:var(--font-rajdhani)] text-sm font-semibold text-muted">{t.schedulePreview}</p>
					<div className="grid gap-6 md:grid-cols-2">
						{sortedDayKeys.slice(0, 2).map((day, dayIdx) => {
							const label = t.dayLabel(dayIdx + 1)
							const dayMods = selectedModules.filter((m) => m.day === day)
							return (
								<div key={day} className="rounded border border-navyBorder bg-navyDarkest/40 p-4">
									<h3 className="mb-3 border-b border-navyBorder pb-2 font-[family-name:var(--font-bebas-neue)] text-xl text-bone">
										{label} <span className="text-sm font-normal text-muted">({day})</span>
									</h3>
									{dayMods.length === 0 ? (
										<p className="text-sm text-muted">{t.noSelection}</p>
									) : (
										<ul className="space-y-2">
											{[...dayMods]
												.sort((a, b) => a.timeStart.localeCompare(b.timeStart))
												.map((m) => {
													const hasConflict = conflictIds.has(m.id)
													return (
														<li
															key={m.id}
															className={`rounded border border-l-4 px-3 py-2 font-[family-name:var(--font-rajdhani)] text-sm text-bone ${
																hasConflict ? "border-red border-l-red bg-red/10" : "border-navyBorder"
															}`}
															style={
																!hasConflict ? ({ borderLeftColor: m.color } satisfies CSSProperties) : undefined
															}
														>
															<span className="text-gold">
																{m.timeStart}–{m.timeEnd}
															</span>{" "}
															{m.title}
														</li>
													)
												})}
										</ul>
									)}
								</div>
							)
						})}
					</div>
				</div>

				<div className="text-center">
					<button
						type="button"
						onClick={downloadIcs}
						disabled={selectedModules.length === 0}
						className="rounded border border-gold bg-gold/10 px-6 py-3 font-[family-name:var(--font-rajdhani)] text-sm font-bold tracking-wider text-gold transition-colors hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
					>
						{t.downloadIcs}
					</button>
				</div>
			</div>
		</section>
	)
}
