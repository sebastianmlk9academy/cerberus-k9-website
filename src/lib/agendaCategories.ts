export type Category = 'K9' | 'TCCC' | 'DRONY' | 'KONFERENCJA' | 'CEREMONIA' | 'BREAK';

export const CATEGORY_META: Record<Category, { color: string; label: string }> = {
  K9: { color: '#C4922A', label: 'K9' },
  TCCC: { color: '#8B2020', label: 'TCCC / MEDYCYNA' },
  DRONY: { color: '#2A5A8A', label: 'DRONY' },
  KONFERENCJA: { color: '#2A6A3A', label: 'KONFERENCJA' },
  CEREMONIA: { color: '#5A3A8A', label: 'CEREMONIA' },
  BREAK: { color: '#3A4A5A', label: 'PRZERWA' },
};

export function normalizeCategory(raw: string): Category {
  const upper = raw.toUpperCase();
  const map: Record<string, Category> = {
    K9: 'K9',
    TCCC: 'TCCC',
    DRONY: 'DRONY',
    DRONES: 'DRONY',
    KONFERENCJA: 'KONFERENCJA',
    CONFERENCE: 'KONFERENCJA',
    CEREMONIA: 'CEREMONIA',
    CEREMONY: 'CEREMONIA',
    BREAK: 'BREAK',
    PRZERWA: 'BREAK',
  };
  return map[upper] ?? 'K9';
}
