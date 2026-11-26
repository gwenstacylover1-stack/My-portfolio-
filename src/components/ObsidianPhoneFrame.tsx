import { useEffect, useRef, useState } from 'react';
import { Cpu, Play } from 'lucide-react';
import { ProjectAccentTheme, VideoChapter } from '../data/portfolioData';
import {
  buildYouTubeEmbedUrl,
  extractYouTubeVideoId,
  getYouTubeThumbnailUrl,
} from '../utils/youtube';

interface ObsidianPhoneFrameProps {
  projectName: string;
  youtubeUrl: string;
  fallbackImage: string;
  accentTheme: ProjectAccentTheme;
  isPlaying: boolean;
  startSeconds?: number;
  playNonce?: number;
  activeChapter?: VideoChapter;
  onPlayClick: () => void;
  size?: 'card' | 'modal';
}

const ACCENT_STYLES: Record<
  ProjectAccentTheme,
  {
    glowShadow: string;
    ringBorder: string;
    playBtn: string;
    badge: string;
    dot: string;
  }
> = {
  pink: {
    glowShadow:
      'shadow-[0_18px_50px_rgba(0,0,0,0.72),0_0_32px_rgba(236,72,153,0.22)] group-hover:shadow-[0_22px_58px_rgba(0,0,0,0.8),0_0_44px_rgba(236,72,153,0.38)]',
    ringBorder: 'border-pink-400/25 group-hover:border-pink-400/55',
    playBtn:
      'bg-gradient-to-r from-[#EC4899] to-[#D946EF] text-white shadow-[0_0_24px_rgba(236,72,153,0.55)] hover:brightness-110',
    badge: 'border-pink-400/35 bg-pink-500/15 text-pink-200',
    dot: 'bg-pink-400 shadow-[0_0_8px_#EC4899]',
  },
  cyan: {
    glowShadow:
      'shadow-[0_18px_50px_rgba(0,0,0,0.72),0_0_32px_rgba(0,240,255,0.20)] group-hover:shadow-[0_22px_58px_rgba(0,0,0,0.8),0_0_44px_rgba(0,240,255,0.36)]',
    ringBorder: 'border-[#00F0FF]/25 group-hover:border-[#00F0FF]/55',
    playBtn:
      'bg-[#00F0FF] text-[#05070D] shadow-[0_0_24px_rgba(0,240,255,0.55)] hover:bg-[#5CF6FF]',
    badge: 'border-[#00F0FF]/35 bg-[#00F0FF]/15 text-[#00F0FF]',
    dot: 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]',
  },
  holo: {
    glowShadow:
      'shadow-[0_18px_50px_rgba(0,0,0,0.72),0_0_32px_rgba(59,130,246,0.24)] group-hover:shadow-[0_22px_58px_rgba(0,0,0,0.8),0_0_44px_rgba(0,240,255,0.38)]',
    ringBorder: 'border-sky-400/25 group-hover:border-[#00F0FF]/55',
    playBtn:
      'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-[#05070D] shadow-[0_0_24px_rgba(59,130,246,0.55)] hover:brightness-110',
    badge: 'border-sky-400/35 bg-sky-500/15 text-sky-200',
    dot: 'bg-sky-400 shadow-[0_0_8px_#38BDF8]',
  },
  emerald: {
    glowShadow:
      'shadow-[0_18px_50px_rgba(0,0,0,0.72),0_0_32px_rgba(16,185,129,0.22)] group-hover:shadow-[0_22px_58px_rgba(0,0,0,0.8),0_0_44px_rgba(16,185,129,0.38)]',
    ringBorder: 'border-emerald-400/25 group-hover:border-emerald-400/55',
    playBtn:
      'bg-gradient-to-r from-emerald-400 to-[#3B82F6] text-[#05070D] shadow-[0_0_24px_rgba(16,185,129,0.5)] hover:brightness-110',
    badge: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200',
    dot: 'bg-emerald-400 shadow-[0_0_8px_#34D399]',
  },
};

export function ObsidianPhoneFrame({
  projectName,
  youtubeUrl,
  fallbackImage,
  accentTheme,
  isPlaying,
  startSeconds = 0,
  playNonce = 0,
  onPlayClick,
  size = 'card',
}: ObsidianPhoneFrameProps) {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  const [thumbStage, setThumbStage] = useState<'sd' | 'hq' | 'fallback' | 'none'>(
    videoId ? 'sd' : 'fallback',
  );
  const [isVideoBuffering, setIsVideoBuffering] = useState<boolean>(false);
  const loadRevealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setThumbStage(videoId ? 'sd' : 'fallback');
  }, [videoId, fallbackImage]);

  useEffect(() => {
    if (loadRevealTimerRef.current !== null) {
      window.clearTimeout(loadRevealTimerRef.current);
      loadRevealTimerRef.current = null;
    }

    if (!isPlaying || !videoId) {
      setIsVideoBuffering(false);
      return;
    }

    setIsVideoBuffering(true);
    const safetyTimer = window.setTimeout(() => {
      setIsVideoBuffering(false);
    }, 6000);

    return () => {
      window.clearTimeout(safetyTimer);
      if (loadRevealTimerRef.current !== null) {
        window.clearTimeout(loadRevealTimerRef.current);
        loadRevealTimerRef.current = null;
      }
    };
  }, [isPlaying, videoId, startSeconds, playNonce]);

  const theme = ACCENT_STYLES[accentTheme];

  const coverSrc =
    thumbStage === 'sd' && videoId
      ? getYouTubeThumbnailUrl(videoId, 'sddefault')
      : thumbStage === 'hq' && videoId
        ? getYouTubeThumbnailUrl(videoId, 'hqdefault')
        : thumbStage === 'fallback'
          ? fallbackImage
          : null;

  const handleImageError = () => {
    setThumbStage((prev) => {
      if (prev === 'sd') return 'hq';
      if (prev === 'hq') return 'fallback';
      return 'none';
    });
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // YouTube returns a 120x90 grey stub when sddefault is unavailable for a Short
    if (thumbStage === 'sd' && e.currentTarget.naturalWidth <= 120) {
      setThumbStage('hq');
    }
  };

  const widthClass =
    size === 'modal'
      ? 'w-full max-w-[265px] sm:max-w-[285px]'
      : 'w-full max-w-[218px] sm:max-w-[228px]';

  return (
    <div className={`relative mx-auto ${widthClass} select-none`}>
      {/* Machined Obsidian Bezel Outer Shell */}
      <div
        className={`relative rounded-[2.25rem] border bg-gradient-to-b from-[#161D2E] via-[#0B0F1A] to-[#070A12] p-[8px] transition-all duration-300 ${theme.ringBorder} ${theme.glowShadow}`}
      >
        {/* Subtle side hardware buttons */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[2.5px] top-20 h-10 w-[2.5px] rounded-r bg-white/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-[2.5px] top-16 h-6 w-[2.5px] rounded-l bg-white/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-[2.5px] top-24 h-10 w-[2.5px] rounded-l bg-white/15"
        />

        {/* Strict 9:16 Inner Phone Display Viewport */}
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#04060C]">
          {/* Subtle Dynamic Island / Speaker Notch */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-2.5 z-30 flex h-[18px] w-[72px] -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.06] bg-[#04060B]/95 shadow-inner"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-700/90" />
          </div>

          {/* ACTIVE YOUTUBE EMBED (Only mounted after user clicks play or a chapter step) */}
          {isPlaying && videoId ? (
            <>
              <iframe
                key={`${videoId}-${startSeconds}-${playNonce}`}
                src={buildYouTubeEmbedUrl(videoId, startSeconds)}
                title={`${projectName} Product Tour Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => {
                  if (loadRevealTimerRef.current !== null) {
                    window.clearTimeout(loadRevealTimerRef.current);
                  }
                  loadRevealTimerRef.current = window.setTimeout(() => {
                    setIsVideoBuffering(false);
                    loadRevealTimerRef.current = null;
                  }, 220);
                }}
                className="absolute inset-0 h-full w-full border-0 bg-[#04060C]"
              />

              {/* Sleek Cyan Buffering Loader Overlay (hides cleanly once playback starts) */}
              <div
                aria-live="polite"
                aria-hidden={!isVideoBuffering}
                className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#04060C]/90 backdrop-blur-sm transition-opacity duration-300 ${
                  isVideoBuffering ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative flex h-11 w-11 items-center justify-center">
                  <span className="h-11 w-11 animate-spin rounded-full border-2 border-[#00F0FF]/20 border-t-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.45)]" />
                  <span className="absolute h-2 w-2 animate-pulse rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.14em] text-[#00F0FF]/90">
                  Loading Tour...
                </span>
              </div>
            </>
          ) : (
            /* LAZY THUMBNAIL COVER STATE (Zero iframe loaded on initial page load) */
            <button
              type="button"
              onClick={onPlayClick}
              aria-label={`Watch Product Tour for ${projectName}`}
              className="group/play relative flex h-full w-full flex-col items-center justify-end overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00F0FF]"
            >
              {coverSrc ? (
                <img
                  src={coverSrc}
                  alt={`${projectName} 9:16 mobile product preview`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  className="absolute inset-0 h-full w-full scale-[1.18] object-cover object-center transition-transform duration-500 ease-out group-hover/play:scale-[1.24]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#070B14] to-[#04060C]">
                  <Cpu className="h-10 w-10 text-slate-500" aria-hidden="true" />
                </div>
              )}

              {/* Measured Scrim & Subtle Diagonal Glass Sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04060C]/92 via-[#04060C]/25 to-[#04060C]/35"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.02)_26%,transparent_48%)] opacity-80"
              />

              {/* Top-left Interactive Preview Pill */}
              <div className="absolute left-3 top-9 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider backdrop-blur-md ${theme.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                  <span>INTERACTIVE PREVIEW</span>
                </span>
              </div>

              {/* Bottom Watch Product Tour CTA */}
              <div className="relative z-10 flex w-full flex-col items-center gap-2.5 px-3 pb-5 pt-4">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${theme.playBtn}`}
                >
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  <span>Watch Product Tour</span>
                </div>
                <span className="text-[10px] tracking-wider text-slate-200/90">
                  5 Interactive Chapters
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
