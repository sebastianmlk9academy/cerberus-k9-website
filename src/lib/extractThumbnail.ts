/**
 * Automatycznie generuje URL miniaturki na podstawie linku do materialu.
 * Obsluguje: YouTube (youtu.be, youtube.com), Vimeo, oraz fallback na lokalne placeholdery.
 */
export function extractThumbnail(url: string, fallback?: string | null): string | null {
  if (!url || url === "#") return fallback ?? null;

  // YouTube: youtu.be/ID lub youtube.com/watch?v=ID
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;

  // Fallback - jesli podany recznie w CMS
  return fallback ?? null;
}
