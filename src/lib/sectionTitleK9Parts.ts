/** Splits a section title around the first "K9" for accent styling at render time. */
export function sectionTitlePartsAroundK9(title: string): { before: string; after: string } | null {
	const idx = title.indexOf('K9');
	if (idx === -1) return null;
	return { before: title.slice(0, idx), after: title.slice(idx + 2) };
}
