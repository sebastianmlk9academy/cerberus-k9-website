import type { CollectionEntry } from 'astro:content';

export type LocationItem = {
  name: string;
  address?: string;
  description: string;
  modules?: string;
  status: string;
  image?: string;
  mapUrl?: string;
};

export function locationEntriesToItems(
  entries: CollectionEntry<'locations'>[],
  lang: string
): LocationItem[] {
  return entries
    .filter((e) => e.data.active !== false)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
    .map((e) => {
      const d = e.data as Record<string, string | boolean | number | undefined>;
      const description =
        (d[`description_${lang}`] as string) ??
        (d['description_en'] as string) ??
        (d['description_pl'] as string) ??
        '';
      const modules =
        (d[`modules_${lang}`] as string) ??
        (d['modules_en'] as string) ??
        (d['modules_pl'] as string) ??
        '';
      return {
        name: e.data.name,
        address: e.data.address,
        description,
        modules,
        status: e.data.status ?? 'POTWIERDZONE',
        image: e.data.image,
        mapUrl: e.data.map_url,
      };
    });
}
