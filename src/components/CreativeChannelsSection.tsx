import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { InstagramIcon, SOCIAL_LINKS, YouTubeIcon } from './SocialIcons';
import { SpotlightCard } from './SpotlightCard';

const YOUTUBE_CHANNEL_ID = 'UCC26iKI8hv9NExZBF6Ev2CA';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@TARAKYT-i9z';
const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const MAX_FEED_ITEMS = 6;

interface YouTubeVideoItem {
  id: string;
  title: string;
  url: string;
  published: string;
  isShort: boolean;
  primaryThumb: string;
  fallbackThumb: string;
}

type FeedStatus = 'loading' | 'live' | 'fallback';

const CURATED_FALLBACK_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'X3BRON3CTxA',
    title: 'Latest Motion Short · 4K 60fps Edit',
    url: 'https://www.youtube.com/shorts/X3BRON3CTxA',
    published: '2026-11-26T13:30:09Z',
    isShort: true,
    primaryThumb: 'https://i.ytimg.com/vi/X3BRON3CTxA/oar2.jpg',
    fallbackThumb: 'https://i.ytimg.com/vi/X3BRON3CTxA/hqdefault.jpg',
  },
  {
    id: 'CU1WH1PnRKY',
    title: 'Beat-Sync Visual Cut · Alight Motion Preset',
    url: 'https://www.youtube.com/shorts/CU1WH1PnRKY',
    published: '2026-11-25T13:30:39Z',
    isShort: true,
    primaryThumb: 'https://i.ytimg.com/vi/CU1WH1PnRKY/oar2.jpg',
    fallbackThumb: 'https://i.ytimg.com/vi/CU1WH1PnRKY/hqdefault.jpg',
  },
  {
    id: 'OyejQIF4GkA',
    title: 'High-Contrast Visual Pacing Reel',
    url: 'https://www.youtube.com/shorts/OyejQIF4GkA',
    published: '2026-11-24T13:30:06Z',
    isShort: true,
    primaryThumb: 'https://i.ytimg.com/vi/OyejQIF4GkA/oar2.jpg',
    fallbackThumb: 'https://i.ytimg.com/vi/OyejQIF4GkA/hqdefault.jpg',
  },
  {
    id: 'QoCyooRtaGY',
    title: 'Brazilian Phonk Rhythm Edit · 60fps',
    url: 'https://www.youtube.com/shorts/QoCyooRtaGY',
    published: '2026-11-23T13:30:31Z',
    isShort: true,
    primaryThumb: 'https://i.ytimg.com/vi/QoCyooRtaGY/oar2.jpg',
    fallbackThumb: 'https://i.ytimg.com/vi/QoCyooRtaGY/hqdefault.jpg',
  },
  {
    id: '7J3D9zjvjUU',
    title: 'Fast-Cut Highlights · Velocity Sync',
    url: 'https://www.youtube.com/shorts/7J3D9zjvjUU',
    published: '2026-11-22T13:30:36Z',
    isShort: true,
    primaryThumb: 'https://i.ytimg.com/vi/7J3D9zjvjUU/oar2.jpg',
    fallbackThumb: 'https://i.ytimg.com/vi/7J3D9zjvjUU/hqdefault.jpg',
  },
  {
    id: 'JFkpwqkkVvk',
    title: 'Undefeated Motion Sequence · 4K',
    url: 'https://www.youtube.com/shorts/JFkpwqkkVvk',
    published: '2026-11-21T13:30:18Z',
    isShort: true,
    primaryThumb: 'https://i.ytimg.com/vi/JFkpwqkkVvk/oar2.jpg',
    fallbackThumb: 'https://i.ytimg.com/vi/JFkpwqkkVvk/hqdefault.jpg',
  },
];

function decodeXmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

function extractVideoIdFromUrlOrGuid(value: string): string | null {
  if (!value) return null;
  const guidMatch = value.match(/yt:video:([a-zA-Z0-9_-]{11})/);
  if (guidMatch) return guidMatch[1];

  const urlMatch = value.match(
    /(?:shorts\/|watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/,
  );
  return urlMatch ? urlMatch[1] : null;
}

function formatUploadDate(rawDate: string): string {
  if (!rawDate) return 'Recent';
  const normalized = rawDate.includes('T')
    ? rawDate
    : `${rawDate.replace(' ', 'T')}Z`;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return 'Recent';
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildVideoItem(
  id: string,
  rawTitle: string,
  rawLink: string,
  published: string,
): YouTubeVideoItem {
  const isShort = rawLink.includes('/shorts/');
  return {
    id,
    title: decodeXmlEntities(rawTitle) || 'TARAK YT Upload',
    url: rawLink || `https://www.youtube.com/watch?v=${id}`,
    published,
    isShort,
    primaryThumb: isShort
      ? `https://i.ytimg.com/vi/${id}/oar2.jpg`
      : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    fallbackThumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

function parseAtomFeedXml(xmlText: string): YouTubeVideoItem[] {
  const items: YouTubeVideoItem[] = [];
  const entries = [...xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

  for (const match of entries) {
    const block = match[1];
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
    if (!id) continue;
    const rawTitle =
      block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? 'TARAK YT Upload';
    const altLink =
      block.match(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"/)?.[1] ??
      `https://www.youtube.com/watch?v=${id}`;
    const published =
      block.match(/<published>([^<]+)<\/published>/)?.[1]?.trim() ?? '';

    items.push(buildVideoItem(id, rawTitle, altLink, published));
    if (items.length >= MAX_FEED_ITEMS) break;
  }

  return items;
}

async function fetchWithTimeout(url: string, timeoutMs = 6500): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchLiveYouTubeFeed(): Promise<YouTubeVideoItem[] | null> {
  // 1. Primary: rss2json public JSON bridge
  try {
    const rss2JsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(YOUTUBE_RSS_URL)}`;
    const res = await fetchWithTimeout(rss2JsonUrl);
    if (res.ok) {
      const data = (await res.json()) as {
        status?: string;
        items?: Array<{
          guid?: string;
          link?: string;
          title?: string;
          pubDate?: string;
        }>;
      };
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const parsed: YouTubeVideoItem[] = [];
        for (const entry of data.items) {
          const id =
            extractVideoIdFromUrlOrGuid(entry.guid ?? '') ??
            extractVideoIdFromUrlOrGuid(entry.link ?? '');
          if (!id) continue;
          parsed.push(
            buildVideoItem(
              id,
              entry.title ?? 'TARAK YT Upload',
              entry.link ?? `https://www.youtube.com/watch?v=${id}`,
              entry.pubDate ?? '',
            ),
          );
          if (parsed.length >= MAX_FEED_ITEMS) break;
        }
        if (parsed.length > 0) return parsed;
      }
    }
  } catch {
    // Fall through to Fallback 1
  }

  // 2. Fallback 1: allorigins raw XML proxy
  try {
    const allOriginsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(YOUTUBE_RSS_URL)}`;
    const res = await fetchWithTimeout(allOriginsUrl);
    if (res.ok) {
      const xmlText = await res.text();
      if (xmlText.includes('<entry>')) {
        const parsed = parseAtomFeedXml(xmlText);
        if (parsed.length > 0) return parsed;
      }
    }
  } catch {
    // Fall through to Cloudflare Pages function fallback
  }

  // 3. Fallback 1b: Cloudflare Pages edge function (/api/shorts) when deployed
  try {
    const res = await fetchWithTimeout(`/api/shorts?limit=${MAX_FEED_ITEMS}`, 4500);
    if (res.ok) {
      const contentType = res.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const data = (await res.json()) as {
          shorts?: Array<{
            id?: string;
            title?: string;
            url?: string;
            published?: string;
          }>;
        };
        if (Array.isArray(data.shorts) && data.shorts.length > 0) {
          const parsed = data.shorts
            .filter((item): item is Required<Pick<typeof item, 'id'>> & typeof item =>
              Boolean(item.id),
            )
            .slice(0, MAX_FEED_ITEMS)
            .map((item) =>
              buildVideoItem(
                item.id,
                item.title ?? 'TARAK YT Upload',
                item.url ?? `https://www.youtube.com/shorts/${item.id}`,
                item.published ?? '',
              ),
            );
          if (parsed.length > 0) return parsed;
        }
      }
    }
  } catch {
    // Fall through to curated channel fallback
  }

  return null;
}

function VideoPoster({ video }: { video: YouTubeVideoItem }) {
  const [src, setSrc] = useState(video.primaryThumb);
  const [exhausted, setExhausted] = useState(false);

  useEffect(() => {
    setSrc(video.primaryThumb);
    setExhausted(false);
  }, [video.id, video.primaryThumb]);

  const handleFallback = () => {
    if (src !== video.fallbackThumb) {
      setSrc(video.fallbackThumb);
    } else {
      setExhausted(true);
    }
  };

  if (exhausted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#0B1124] to-[#1E102B] p-4 text-center">
        <YouTubeIcon className="h-8 w-8 text-rose-400/80" />
        <span className="mt-2 text-xs font-semibold text-slate-300">
          TARAK YT
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={video.title}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleFallback}
      onLoad={(e) => {
        // YouTube returns a 120x90 grey placeholder when oar2.jpg is unavailable
        if (
          e.currentTarget.naturalWidth <= 120 &&
          src !== video.fallbackThumb
        ) {
          setSrc(video.fallbackThumb);
        }
      }}
      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
  );
}

export function CreativeChannelsSection() {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [feedStatus, setFeedStatus] = useState<FeedStatus>('loading');
  const [desktopStartIndex, setDesktopStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const liveItems = await fetchLiveYouTubeFeed();
      if (!active) return;
      if (liveItems && liveItems.length > 0) {
        setVideos(liveItems);
        setFeedStatus('live');
      } else {
        setVideos(CURATED_FALLBACK_VIDEOS);
        setFeedStatus('fallback');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Lock page scroll & handle Escape key while YouTube modal is open
  useEffect(() => {
    if (!activeVideo) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeVideo]);

  const maxDesktopStart = Math.max(0, videos.length - 4);
  const safeDesktopStart = Math.min(desktopStartIndex, maxDesktopStart);
  const desktopVideos = videos.slice(safeDesktopStart, safeDesktopStart + 4);
  const hasDesktopOverflow = videos.length > 4;

  const renderReelCard = (video: YouTubeVideoItem, extraClass = '') => (
    <button
      key={video.id}
      type="button"
      onClick={() => setActiveVideo(video)}
      aria-label={`Play ${video.title}`}
      className={`group relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/12 bg-[#070B16] text-left shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${extraClass}`}
    >
      {/* True Edge-to-Edge Full-Bleed 9:16 Cover Artwork */}
      <div className="absolute inset-0">
        <VideoPoster video={video} />
      </div>

      {/* Top-Left Floating Frosted Date Pill */}
      <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md tabular-nums">
        {formatUploadDate(video.published)}
      </span>

      {/* Deep Bottom Gradient Scrim + Title + Subtle Bottom-Right Glass Play Pill */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3.5 pt-16 pb-3.5 sm:px-4 sm:pb-4">
        <div className="flex items-end justify-between gap-2.5">
          <p className="line-clamp-2 flex-1 text-sm font-semibold leading-snug text-white drop-shadow-sm">
            {video.title}
          </p>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20 group-hover:text-cyan-200"
          >
            <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <section
      id="channels"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle controlled magenta + cyan ambient bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.075)_0%,rgba(0,240,255,0.06)_52%,transparent_75%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.08] px-3.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
                MOTION &amp; BUILD-IN-PUBLIC
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl">
                Creative Studio &amp; Live Channels
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Behind-the-scenes full-stack builds, 3D UI experiments, and
              high-energy 4K 60fps motion production.
            </p>
          </div>

          {/* 2-Column Bento Channel Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* LEFT CARD — INSTAGRAM (@tarakdevp) */}
            <SpotlightCard
              accent="pink"
              className="flex flex-col p-5 transition-all duration-200 hover:border-fuchsia-400/50 hover:shadow-[0_0_38px_rgba(217,70,239,0.16)] sm:p-7"
            >
              <div className="flex h-full flex-col">
                {/* Clean Top Row: Badge + Platform Label (Zero Awkward Cutoff) */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.1em] text-fuchsia-300/90 uppercase">
                    Instagram · Dev &amp; 3D Build Lab
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/12 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-fuchsia-200 uppercase whitespace-nowrap">
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 text-fuchsia-300"
                      aria-hidden="true"
                    />
                    <span>ACTIVE CREATOR</span>
                  </span>
                </div>

                {/* Unobstructed Channel Identity Row */}
                <div className="mt-4 flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-500/20 via-pink-500/15 to-violet-500/20 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,0.22)]">
                    <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      {SOCIAL_LINKS.instagram.handle}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      S.TARAK · Engineering &amp; Visual Lab
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                  3D UI builds, Three.js interactive prototypes, full-stack dev
                  logs &amp; AI systems engineering breakdowns.
                </p>

                {/* 3 Compact Feature Pills */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {['3D UI Builds', 'Full-Stack Dev Logs', 'Direct DMs Open'].map(
                    (pill) => (
                      <span
                        key={pill}
                        className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-500/[0.07] px-2.5 py-1 text-xs font-medium text-fuchsia-100 whitespace-nowrap"
                      >
                        {pill}
                      </span>
                    ),
                  )}
                </div>

                {/* Primary Glowing CTA */}
                <div className="mt-auto pt-6">
                  <a
                    href={SOCIAL_LINKS.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#EC4899] via-[#D946EF] to-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(217,70,239,0.3)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_38px_rgba(217,70,239,0.48)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    <span>Follow @tarakdevp</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </SpotlightCard>

            {/* RIGHT CARD — YOUTUBE (TARAK YT · @tarakyt-i9z) */}
            <SpotlightCard
              accent="cyan"
              className="flex flex-col p-5 transition-all duration-200 hover:border-rose-400/45 hover:shadow-[0_0_38px_rgba(244,63,94,0.16)] sm:p-7"
            >
              <div className="flex h-full flex-col">
                {/* Clean Top Row: Badge + Platform Label (Zero Awkward Cutoff) */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.1em] text-rose-300/90 uppercase">
                    YouTube · Motion &amp; Visual Production
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-rose-400/35 bg-gradient-to-r from-rose-500/12 to-[#00F0FF]/10 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-rose-100 uppercase whitespace-nowrap">
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 text-rose-300"
                      aria-hidden="true"
                    />
                    <span>ACTIVE CHANNEL</span>
                  </span>
                </div>

                {/* Unobstructed Channel Identity Row */}
                <div className="mt-4 flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-500/20 via-red-500/15 to-[#00F0FF]/15 text-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.22)]">
                    <YouTubeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      TARAK YT
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      @tarakyt-i9z · 4K 60fps Motion
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                  High-energy 4K 60fps motion production, beat-sync product
                  showcases &amp; high-contrast visual pacing for launch reels.
                </p>

                {/* 3 Compact Feature Pills */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {[
                    '4K 60fps Motion',
                    'Product Launch Reels',
                    'Visual Pacing',
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/[0.07] px-2.5 py-1 text-xs font-medium text-cyan-100 whitespace-nowrap"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Primary CTA */}
                <div className="mt-auto pt-6">
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF2A55] via-[#F43F5E] to-[#00F0FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(244,63,94,0.28)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_38px_rgba(0,240,255,0.36)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <YouTubeIcon className="h-4 w-4" />
                    <span>Open YouTube Channel</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* AUTO-UPDATING YOUTUBE MOTION REELS SHOWCASE (MOBILE SWIPE + DESKTOP 4-COL) */}
          <div className="mt-10 sm:mt-12">
            {/* Minimal Single-Row Header */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <h3 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
                  Latest Motion Reels
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-slate-200">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      feedStatus === 'live'
                        ? 'animate-pulse bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]'
                        : feedStatus === 'loading'
                          ? 'animate-pulse bg-cyan-400'
                          : 'bg-cyan-400/80'
                    }`}
                  />
                  <span>Live</span>
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {/* Subtle Desktop Carousel Arrows (only when > 4 uploads exist) */}
                {feedStatus !== 'loading' && hasDesktopOverflow && (
                  <div className="hidden lg:flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopStartIndex((prev) => Math.max(0, prev - 1))
                      }
                      disabled={safeDesktopStart === 0}
                      aria-label="Previous reels"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white disabled:opacity-35 disabled:cursor-default cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopStartIndex((prev) =>
                          Math.min(maxDesktopStart, prev + 1),
                        )
                      }
                      disabled={safeDesktopStart >= maxDesktopStart}
                      aria-label="Next reels"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white disabled:opacity-35 disabled:cursor-default cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}

                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-[#00F0FF] whitespace-nowrap sm:text-sm"
                >
                  <span>View all</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {feedStatus === 'loading' ? (
              <>
                {/* Mobile Horizontal Shimmer Skeleton */}
                <div
                  aria-label="Loading latest motion reels"
                  className="no-scrollbar flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-2 lg:hidden"
                >
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="aspect-[9/16] w-[62vw] max-w-[230px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-[#0B1124]"
                    >
                      <div className="h-full w-full animate-pulse bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-white/[0.06]" />
                    </div>
                  ))}
                </div>

                {/* Desktop 4-Column Shimmer Skeleton */}
                <div
                  aria-hidden="true"
                  className="hidden lg:grid lg:grid-cols-4 lg:gap-5"
                >
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="aspect-[9/16] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0B1124]"
                    >
                      <div className="h-full w-full animate-pulse bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-white/[0.06]" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Mobile (< 1024px): Smooth Horizontal Swipeable Carousel */}
                <div className="no-scrollbar flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-2 lg:hidden">
                  {videos.slice(0, MAX_FEED_ITEMS).map((video) =>
                    renderReelCard(
                      video,
                      'w-[62vw] max-w-[230px] shrink-0 snap-start',
                    ),
                  )}
                </div>

                {/* Desktop (>= 1024px): Crisp 4-Column Horizontal Grid */}
                <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5">
                  {desktopVideos.map((video) =>
                    renderReelCard(video, 'w-full'),
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tight, Properly Proportioned 9:16 Theater Glass Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${activeVideo.title}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#02040A]/84 p-4 backdrop-blur-xl"
          onClick={() => setActiveVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-[min(90vw,360px,calc((90vh-52px)*9/16))] flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#060914]/95 shadow-[0_24px_80px_rgba(0,0,0,0.88),0_0_36px_rgba(34,211,238,0.16)]"
          >
            {/* Minimal Translucent Top Header Bar */}
            <div className="flex items-center justify-between gap-2.5 border-b border-white/10 bg-black/50 px-3.5 py-2.5 backdrop-blur-md">
              <h4 className="min-w-0 flex-1 truncate text-xs font-semibold text-white sm:text-[13px]">
                {activeVideo.title}
              </h4>

              <div className="flex shrink-0 items-center gap-1.5">
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open on YouTube"
                  className="inline-flex h-8 items-center gap-1 rounded-full border border-white/12 bg-white/[0.06] px-2.5 text-[11px] font-medium text-slate-200 transition-colors hover:border-cyan-400/45 hover:text-white whitespace-nowrap"
                >
                  <span>YouTube</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video player"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-slate-200 transition-colors hover:border-white/30 hover:bg-white/[0.14] hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Exact 9:16 Vertical Video Frame (Zero Wasted Black Space) */}
            <div className="relative aspect-[9/16] w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&playsinline=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
