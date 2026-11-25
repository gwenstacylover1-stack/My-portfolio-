import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { InstagramIcon, SOCIAL_LINKS, YouTubeIcon } from './SocialIcons';
import { SpotlightCard } from './SpotlightCard';

const SHORTS_API_PATH = '/api/shorts?limit=6';
const SHORTS_API_FALLBACK_URL =
  'https://tarak-portfolio.pages.dev/api/shorts?limit=6';

interface ShortVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  fallbackThumbnail: string;
  published?: string;
  isShort?: boolean;
}

interface ShortsApiResponse {
  handle?: string;
  source?: string;
  count?: number;
  updatedAt?: string;
  shorts?: Array<Partial<ShortVideo>>;
}

const CURATED_SHORTS: ShortVideo[] = [
  {
    id: 'QoCyooRtaGY',
    title: 'Brazilian Beat-Drop Velocity Edit',
    url: 'https://www.youtube.com/shorts/QoCyooRtaGY',
    thumbnail: 'https://i.ytimg.com/vi/QoCyooRtaGY/oar2.jpg',
    fallbackThumbnail: 'https://i.ytimg.com/vi/QoCyooRtaGY/hqdefault.jpg',
    isShort: true,
  },
  {
    id: 'PiPlJCcJNK0',
    title: 'TV-Mask Visual Hook Edit',
    url: 'https://www.youtube.com/shorts/PiPlJCcJNK0',
    thumbnail: 'https://i.ytimg.com/vi/PiPlJCcJNK0/oar2.jpg',
    fallbackThumbnail: 'https://i.ytimg.com/vi/PiPlJCcJNK0/hqdefault.jpg',
    isShort: true,
  },
  {
    id: '4maHZ02uYn4',
    title: 'Neon Text Masking & Flashback Pacing',
    url: 'https://www.youtube.com/shorts/4maHZ02uYn4',
    thumbnail: 'https://i.ytimg.com/vi/4maHZ02uYn4/oar2.jpg',
    fallbackThumbnail: 'https://i.ytimg.com/vi/4maHZ02uYn4/hqdefault.jpg',
    isShort: true,
  },
];

function formatShortTitle(rawTitle: string): string {
  const trimmed = (rawTitle || '').trim();
  if (!trimmed) return 'TARAK YT Short';
  const stripped = trimmed
    .replace(/(?:\s*#[^\s#]+)+$/g, '')
    .replace(/[\s|•–—/-]+$/g, '')
    .trim();
  return stripped || trimmed;
}

function normalizeShortsPayload(data: ShortsApiResponse | null): ShortVideo[] {
  if (!data || !Array.isArray(data.shorts)) return [];
  return data.shorts
    .filter(
      (item): item is Partial<ShortVideo> & { id: string } =>
        Boolean(item && typeof item.id === 'string' && item.id.trim().length > 0),
    )
    .map((item) => {
      const id = item.id.trim();
      return {
        id,
        title: (item.title || 'TARAK YT Short').trim(),
        url: item.url || `https://www.youtube.com/shorts/${id}`,
        thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${id}/oar2.jpg`,
        fallbackThumbnail:
          item.fallbackThumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published: item.published,
        isShort: item.isShort ?? true,
      };
    });
}

export function CreativeChannelsSection() {
  const [shorts, setShorts] = useState<ShortVideo[]>(CURATED_SHORTS);
  const [isLoadingShorts, setIsLoadingShorts] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fallbackThumbs, setFallbackThumbs] = useState<Record<string, boolean>>(
    {},
  );
  const [needsLetterboxCrop, setNeedsLetterboxCrop] = useState<
    Record<string, boolean>
  >({});

  // Live auto-updating YouTube Shorts feed via /api/shorts?limit=6 with silent fallback
  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const fetchJsonShorts = async (url: string): Promise<ShortVideo[]> => {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return [];
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.toLowerCase().includes('application/json')) return [];
      const data = (await res.json()) as ShortsApiResponse;
      return normalizeShortsPayload(data);
    };

    const loadShorts = async () => {
      try {
        let loaded: ShortVideo[] = [];
        try {
          loaded = await fetchJsonShorts(SHORTS_API_PATH);
        } catch {
          loaded = [];
        }

        if (
          loaded.length === 0 &&
          typeof window !== 'undefined' &&
          window.location.origin !== 'https://tarak-portfolio.pages.dev'
        ) {
          loaded = await fetchJsonShorts(SHORTS_API_FALLBACK_URL);
        }

        if (!active) return;
        if (loaded.length > 0) {
          setShorts(loaded);
        } else {
          setShorts(CURATED_SHORTS);
        }
      } catch {
        if (!active) return;
        setShorts(CURATED_SHORTS);
      } finally {
        if (active) setIsLoadingShorts(false);
      }
    };

    void loadShorts();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const activeShort =
    activeIndex !== null && shorts[activeIndex] ? shorts[activeIndex] : null;

  const handleCloseModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrevShort = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || shorts.length === 0) return prev;
      return (prev - 1 + shorts.length) % shorts.length;
    });
  }, [shorts.length]);

  const handleNextShort = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || shorts.length === 0) return prev;
      return (prev + 1) % shorts.length;
    });
  }, [shorts.length]);

  // Escape, ArrowLeft, ArrowRight keyboard navigation + body scroll lock
  useEffect(() => {
    if (activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
      else if (e.key === 'ArrowLeft') handlePrevShort();
      else if (e.key === 'ArrowRight') handleNextShort();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, handleCloseModal, handlePrevShort, handleNextShort]);

  const handleBookHypeReel = () => {
    setActiveIndex(null);
    window.setTimeout(() => {
      const target =
        document.getElementById('contact') ??
        document.getElementById('estimator');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 140);
  };

  return (
    <>
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
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.08] px-3.5 py-1 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#00F0FF] uppercase">
                  MOTION &amp; BUILD-IN-PUBLIC
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Creative Studio &amp; Live Channels
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-400">
                Behind-the-scenes full-stack builds, 3D UI experiments, and
                high-energy 4K 60fps motion edits.
              </p>
            </div>

            {/* TOP ROW: 2-Column Bento Channel Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* LEFT CARD — INSTAGRAM (@tarakdevp) */}
              <SpotlightCard
                accent="pink"
                className="flex flex-col p-6 transition-all duration-200 hover:border-fuchsia-400/50 hover:shadow-[0_0_38px_rgba(217,70,239,0.16)] sm:p-7"
              >
                <div className="flex h-full flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-500/20 via-pink-500/15 to-violet-500/20 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,0.22)]">
                        <InstagramIcon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[11px] font-medium tracking-wider text-fuchsia-300/90">
                          Instagram · Dev &amp; 3D Build Lab
                        </div>
                        <h3 className="mt-0.5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                          {SOCIAL_LINKS.instagram.handle}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/12 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-fuchsia-200 uppercase whitespace-nowrap">
                      <BadgeCheck
                        className="h-3.5 w-3.5 text-fuchsia-300"
                        aria-hidden="true"
                      />
                      <span>ACTIVE CREATOR</span>
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                    Live UI/UX drops, Three.js 3D prototypes, AI agent demos
                    &amp; build-in-public dev logs.
                  </p>

                  {/* 3 Compact Feature Pills */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {['3D & UI Reels', 'AI Build Logs', 'Direct DMs Open'].map(
                      (pill) => (
                        <span
                          key={pill}
                          className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-500/[0.07] px-2.5 py-1 font-mono text-[11px] font-medium text-fuchsia-100 whitespace-nowrap"
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
                className="flex flex-col p-6 transition-all duration-200 hover:border-rose-400/45 hover:shadow-[0_0_38px_rgba(244,63,94,0.16)] sm:p-7"
              >
                <div className="flex h-full flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-500/20 via-red-500/15 to-[#00F0FF]/15 text-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.22)]">
                        <YouTubeIcon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[11px] font-medium tracking-wider text-rose-300/90">
                          YouTube · Motion &amp; Visual Pacing
                        </div>
                        <h3 className="mt-0.5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                          TARAK YT · @tarakyt-i9z
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/35 bg-gradient-to-r from-rose-500/12 to-[#00F0FF]/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-rose-100 uppercase whitespace-nowrap">
                      <span>4K 60FPS MOTION</span>
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                    4K 60fps beat-sync velocity edits, masking &amp;
                    high-contrast visual pacing built for viral product launch
                    reels.
                  </p>

                  {/* 3 Compact Feature Pills */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {[
                      '4K 60fps Edits',
                      'Beat-Sync Velocity',
                      'Product Hype Reels',
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/[0.07] px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-100 whitespace-nowrap"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Primary CTA */}
                  <div className="mt-auto pt-6">
                    <a
                      href="https://www.youtube.com/@TARAKYT-i9z"
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

            {/* BOTTOM UNIFIED GLASS CONTAINER: Automatic YouTube Shorts Interactive Reel Rail */}
            <SpotlightCard
              accent="blue"
              className="mt-6 p-5 sm:p-6 lg:p-7"
            >
              {/* Rail Header */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]">
                    <Clapperboard className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
                      Latest 9:16 Motion Shorts
                    </h3>
                    <p className="font-mono text-[11px] text-slate-400">
                      Tap any vertical reel to launch the in-app 9:16 Theater
                    </p>
                  </div>
                </div>

                {/* Mobile Swipe Cue */}
                <span className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[10.5px] font-medium text-[#00F0FF] md:hidden">
                  <span>Swipe</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>

                {/* Desktop Count / Status Cue */}
                <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-slate-300 md:inline-flex">
                  <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                  <span>{shorts.length} Vertical Reels Ready</span>
                </span>
              </div>

              {/* Live Auto-Updating 9:16 Shorts Reel Rail with Dark-Glass Skeletons */}
              {isLoadingShorts ? (
                <div
                  aria-label="Loading latest YouTube Shorts"
                  className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-4"
                >
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[9/16] w-[44vw] max-w-[210px] shrink-0 snap-start animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-[#04060C]/85 backdrop-blur-md md:w-full md:max-w-none"
                    >
                      <div className="absolute left-2.5 top-2.5 h-4 w-16 rounded-full bg-white/[0.08]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full border border-white/10 bg-white/[0.05]" />
                      </div>
                      <div className="absolute inset-x-3 bottom-3 space-y-1.5">
                        <div className="h-3 w-4/5 rounded bg-white/[0.09]" />
                        <div className="h-3 w-3/5 rounded bg-white/[0.06]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-4">
                  {shorts.map((short, idx) => {
                    const displayTitle = formatShortTitle(short.title);
                    const useFallbackThumb = Boolean(fallbackThumbs[short.id]);
                    const cropLetterbox =
                      useFallbackThumb || Boolean(needsLetterboxCrop[short.id]);
                    const thumbSrc = useFallbackThumb
                      ? short.fallbackThumbnail
                      : short.thumbnail;

                    return (
                      <button
                        key={short.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Play Short: ${displayTitle}`}
                        className="group relative aspect-[9/16] w-[44vw] max-w-[210px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/12 bg-[#050812] text-left transition-all duration-300 ease-out cursor-pointer hover:border-[#00F0FF]/60 hover:shadow-[0_0_28px_rgba(0,240,255,0.2),0_0_22px_rgba(244,63,94,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] md:w-full md:max-w-none md:hover:scale-[1.03]"
                      >
                        {/* Native 9:16 Vertical Shorts Poster (oar2.jpg) with auto-crop for wider/fallback frames */}
                        <img
                          src={thumbSrc}
                          alt={displayTitle}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() => {
                            if (!useFallbackThumb) {
                              setFallbackThumbs((prev) => ({
                                ...prev,
                                [short.id]: true,
                              }));
                            }
                          }}
                          onLoad={(e) => {
                            const { naturalWidth, naturalHeight } =
                              e.currentTarget;
                            if (
                              !useFallbackThumb &&
                              naturalWidth <= 120 &&
                              naturalHeight <= 90
                            ) {
                              setFallbackThumbs((prev) => ({
                                ...prev,
                                [short.id]: true,
                              }));
                              return;
                            }
                            if (naturalWidth >= naturalHeight) {
                              setNeedsLetterboxCrop((prev) =>
                                prev[short.id]
                                  ? prev
                                  : { ...prev, [short.id]: true },
                              );
                            } else if (needsLetterboxCrop[short.id]) {
                              setNeedsLetterboxCrop((prev) => ({
                                ...prev,
                                [short.id]: false,
                              }));
                            }
                          }}
                          className={`h-full w-full object-cover object-center transition-transform duration-500 ease-out ${
                            cropLetterbox
                              ? 'scale-[1.42] group-hover:scale-[1.48]'
                              : 'group-hover:scale-105'
                          }`}
                        />

                        {/* Measured Top & Bottom Dark Contrast Scrim */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04060C] via-[#04060C]/35 to-[#04060C]/25"
                        />

                        {/* Subtle Crimson-to-Cyan Top Rim Accent on Hover */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F43F5E] via-[#00F0FF] to-[#3B82F6] opacity-40 transition-opacity duration-200 group-hover:opacity-100"
                        />

                        {/* Top Micro-Badge */}
                        <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-white/15 bg-[#04060C]/80 px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-wider text-slate-200 backdrop-blur-md">
                          <YouTubeIcon className="h-3 w-3 text-rose-400" />
                          <span>SHORTS</span>
                        </div>

                        {/* Glassmorphic Center Play Button */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#070B16]/72 text-white shadow-[0_8px_28px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-200 group-hover:scale-110 group-hover:border-[#00F0FF]/80 group-hover:bg-[#00F0FF] group-hover:text-[#04060C] group-hover:shadow-[0_0_28px_rgba(0,240,255,0.65)] sm:h-13 sm:w-13">
                            <Play
                              className="ml-0.5 h-5 w-5 fill-current"
                              aria-hidden="true"
                            />
                          </span>
                        </div>

                        {/* Bottom Clamped 2-Line Title */}
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
                          <p className="line-clamp-2 font-display text-xs font-bold leading-snug text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-sm">
                            {displayTitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* FLAGSHIP IN-APP 9:16 SHORTS THEATER MODAL */}
      <AnimatePresence>
        {activeShort && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Playing YouTube Short: ${activeShort.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          >
            {/* Top-Right Close Button (matches mobile drawer close button styling) */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close Shorts theater"
              className="fixed right-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#080D1B]/90 text-slate-300 shadow-[0_10px_28px_rgba(0,0,0,0.6)] transition-colors hover:border-[#00F0FF]/40 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Centered Theater Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-2xl flex-col items-center"
            >
              {/* Player Row with Side Prev/Next Arrows on Desktop */}
              <div className="flex w-full items-center justify-center gap-4 sm:gap-6">
                {shorts.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevShort}
                    aria-label="Previous Short"
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-[#080D1B]/90 text-slate-200 transition-all duration-150 hover:border-[#00F0FF]/55 hover:bg-[#00F0FF]/12 hover:text-[#00F0FF] cursor-pointer sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}

                {/* Responsive 9:16 Vertical YouTube Embed Frame */}
                <div className="relative aspect-[9/16] h-[64vh] max-h-[78vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(0,240,255,0.14)] sm:h-[74vh]">
                  <iframe
                    key={activeShort.id}
                    src={`https://www.youtube.com/embed/${activeShort.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                    title={activeShort.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>

                {shorts.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNextShort}
                    aria-label="Next Short"
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-[#080D1B]/90 text-slate-200 transition-all duration-150 hover:border-[#00F0FF]/55 hover:bg-[#00F0FF]/12 hover:text-[#00F0FF] cursor-pointer sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Compact Bottom Info & Controls Bar */}
              <div className="mt-4 w-full max-w-[440px] rounded-2xl border border-white/12 bg-[#080D1B]/92 p-3.5 shadow-[0_14px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] font-semibold tracking-wider text-[#00F0FF] uppercase">
                      TARAK YT · SHORT {activeIndex + 1} / {shorts.length}
                    </div>
                    <h3 className="mt-0.5 truncate font-display text-sm font-bold text-white sm:text-base">
                      {formatShortTitle(activeShort.title)}
                    </h3>
                  </div>

                  {/* Mobile Compact Prev / Next Controls */}
                  {shorts.length > 1 && (
                    <div className="flex shrink-0 items-center gap-1.5 sm:hidden">
                      <button
                        type="button"
                        onClick={handlePrevShort}
                        aria-label="Previous Short"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-200 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextShort}
                        aria-label="Next Short"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-200 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>

                {/* External YouTube + Quick-Jump Book a Hype Reel CTAs */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={activeShort.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-rose-400/50 hover:bg-rose-500/12 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <YouTubeIcon className="h-3.5 w-3.5 text-rose-400" />
                    <span>Watch on YouTube</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={handleBookHypeReel}
                    className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] px-4 py-2 text-xs font-semibold text-[#04060C] shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-150 hover:brightness-110 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <span>Book a Hype Reel</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
