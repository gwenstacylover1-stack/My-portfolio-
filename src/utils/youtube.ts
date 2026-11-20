const VIDEO_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extracts a valid 11-character YouTube VIDEO_ID from any standard YouTube URL:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * Returns null for placeholders or invalid strings.
 */
export function extractYouTubeVideoId(rawUrl: string): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.startsWith('[') || trimmed.includes('PASTE_')) {
    return null;
  }

  if (VIDEO_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  try {
    const normalized = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(normalized);
    const host = url.hostname.replace(/^www\./i, '').toLowerCase();

    if (host === 'youtu.be') {
      const candidate = url.pathname.split('/').filter(Boolean)[0] ?? '';
      return VIDEO_ID_REGEX.test(candidate) ? candidate : null;
    }

    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'music.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const vParam = url.searchParams.get('v');
      if (vParam && VIDEO_ID_REGEX.test(vParam)) {
        return vParam;
      }

      const segments = url.pathname.split('/').filter(Boolean);
      const markerIndex = segments.findIndex((seg) =>
        ['shorts', 'embed', 'live', 'v'].includes(seg.toLowerCase()),
      );
      if (markerIndex !== -1 && segments[markerIndex + 1]) {
        const candidate = segments[markerIndex + 1];
        return VIDEO_ID_REGEX.test(candidate) ? candidate : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function buildYouTubeEmbedUrl(videoId: string, startSeconds = 0): string {
  const safeStart = Math.max(0, Math.floor(startSeconds));
  return `https://www.youtube.com/embed/${videoId}?start=${safeStart}&autoplay=1&rel=0&playsinline=1`;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: 'sddefault' | 'hqdefault' = 'sddefault',
): string {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

export function formatTimestamp(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
