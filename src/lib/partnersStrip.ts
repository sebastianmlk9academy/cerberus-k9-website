import type { CollectionEntry } from 'astro:content';

export type StripPartner = {
  name: string;
  logo?: string | null;
  website?: string | null;
  type?: string | null;
};

export function partnerEntriesToStripItems(
  entries: CollectionEntry<'partnerzy'>[]
): StripPartner[] {
  return entries
    .filter((e) => e.data.active !== false)
    .filter(e => e.data.show_in_strip !== false)
    .sort((a, b) => {
      const aOrder = (a.data as any).strip_order ?? 99;
      const bOrder = (b.data as any).strip_order ?? 99;
      return aOrder - bOrder;
    })
    .map(e => ({
      name: e.data.name ?? '',
      logo: e.data.logo ?? null,
      website: e.data.website ?? null,
      type: e.data.type ?? null,
    }))
    .filter((e) => e.name.trim().length > 0);
}
