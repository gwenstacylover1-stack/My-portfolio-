import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Layers,
  MessageSquare,
  Play,
  X,
} from 'lucide-react';
import { FlagshipProject, ProjectAccentTheme } from '../data/portfolioData';
import { formatTimestamp } from '../utils/youtube';
import { ObsidianPhoneFrame } from './ObsidianPhoneFrame';

interface ProjectModalProps {
  project: FlagshipProject | null;
  initialChapterIndex?: number;
  autoPlayOnOpen?: boolean;
  onClose: () => void;
}

const MODAL_ACCENT: Record<
  ProjectAccentTheme,
  {
    badge: string;
    labelBorder: string;
    activeStep: string;
    stepNumber: string;
    ctaButton: string;
  }
> = {
  pink: {
    badge: 'border-pink-400/35 bg-pink-500/15 text-pink-200',
    labelBorder: 'border-pink-400/30 bg-pink-500/[0.08] text-pink-100',
    activeStep:
      'border-pink-400/60 bg-pink-500/[0.12] shadow-[0_0_22px_rgba(236,72,153,0.16)]',
    stepNumber: 'text-pink-300',
    ctaButton:
      'bg-gradient-to-r from-[#EC4899] to-[#D946EF] text-white shadow-[0_0_24px_rgba(236,72,153,0.35)] hover:brightness-110',
  },
  cyan: {
    badge: 'border-[#00F0FF]/35 bg-[#00F0FF]/12 text-[#00F0FF]',
    labelBorder: 'border-[#00F0FF]/30 bg-[#00F0FF]/[0.08] text-cyan-100',
    activeStep:
      'border-[#00F0FF]/60 bg-[#00F0FF]/[0.11] shadow-[0_0_22px_rgba(0,240,255,0.16)]',
    stepNumber: 'text-[#00F0FF]',
    ctaButton:
      'bg-[#00F0FF] text-[#05070D] shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:bg-[#5CF6FF]',
  },
  holo: {
    badge: 'border-sky-400/35 bg-sky-500/15 text-sky-200',
    labelBorder: 'border-sky-400/30 bg-sky-500/[0.08] text-sky-100',
    activeStep:
      'border-sky-400/60 bg-sky-500/[0.12] shadow-[0_0_22px_rgba(59,130,246,0.18)]',
    stepNumber: 'text-sky-300',
    ctaButton:
      'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-[#05070D] shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:brightness-110',
  },
  emerald: {
    badge: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200',
    labelBorder: 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-100',
    activeStep:
      'border-emerald-400/60 bg-emerald-500/[0.12] shadow-[0_0_22px_rgba(16,185,129,0.18)]',
    stepNumber: 'text-emerald-300',
    ctaButton:
      'bg-gradient-to-r from-emerald-400 to-[#3B82F6] text-[#05070D] shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:brightness-110',
  },
};

export function ProjectModal({
  project,
  initialChapterIndex = 0,
  autoPlayOnOpen = false,
  onClose,
}: ProjectModalProps) {
  const [activeChapterIdx, setActiveChapterIdx] = useState(initialChapterIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlayOnOpen);
  const [playNonce, setPlayNonce] = useState(0);

  useEffect(() => {
    if (!project) return;
    const boundedIdx = Math.min(
      Math.max(0, initialChapterIndex),
      project.chapters.length - 1,
    );
    setActiveChapterIdx(boundedIdx);
    setIsPlaying(autoPlayOnOpen);
    setPlayNonce((n) => n + 1);
  }, [project, initialChapterIndex, autoPlayOnOpen]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const theme = MODAL_ACCENT[project.accentTheme];
  const activeChapter =
    project.chapters[activeChapterIdx] ?? project.chapters[0];

  const handleSelectChapter = (index: number) => {
    setActiveChapterIdx(index);
    setIsPlaying(true);
    setPlayNonce((n) => n + 1);
  };

  const handleInquiryJump = () => {
    onClose();
    window.setTimeout(() => {
      const target =
        document.getElementById('estimator') ??
        document.getElementById('contact');
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#03050A]/88 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#090E1B]/95 shadow-[0_28px_90px_rgba(0,0,0,0.88)] backdrop-blur-2xl">
        {/* Compact Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
              {project.orderNumber}
            </span>
            <h3
              id="modal-project-title"
              className="truncate font-display text-lg font-bold tracking-tight text-white sm:text-xl"
            >
              {project.name}
            </h3>
            <span
              className={`hidden sm:inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap ${
                project.status === 'LIVE DEPLOYED'
                  ? 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300'
                  : theme.badge
              }`}
            >
              {project.status}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo modal"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-200 transition-colors hover:border-[#00F0FF]/50 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7 lg:py-7">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[310px_1fr] lg:items-start">
            {/* Left Column: 9:16 Obsidian Phone Video Player + Exact Project Name Badge Directly Below */}
            <div className="flex flex-col items-center">
              <ObsidianPhoneFrame
                projectName={project.name}
                youtubeUrl={project.youtubeUrl}
                fallbackImage={project.fallbackImage}
                accentTheme={project.accentTheme}
                isPlaying={isPlaying}
                startSeconds={activeChapter.seconds}
                playNonce={playNonce}
                activeChapter={activeChapter}
                onPlayClick={() => {
                  setIsPlaying(true);
                  setPlayNonce((n) => n + 1);
                }}
                size="modal"
              />

              {/* Exact Project Name Badge Directly Below Media */}
              <div
                className={`mt-4 w-full max-w-[310px] rounded-2xl border px-4 py-3 text-center ${theme.labelBorder}`}
              >
                <p className="font-mono text-[11px] font-semibold leading-relaxed tracking-wide">
                  {project.exactMediaLabel}
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Step 1-5 Chapter Pills + Specs & Client Inquiry CTA */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold tracking-[0.15em] text-slate-300 uppercase">
                  Interactive Video Chapters
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Tap any step to jump to timestamp
                </span>
              </div>

              {/* Clickable Step 1-5 Chapter Pills */}
              <div className="mt-3.5 space-y-2.5">
                {project.chapters.map((chapter, idx) => {
                  const isActive = idx === activeChapterIdx;
                  return (
                    <button
                      key={`${project.id}-step-${chapter.step}`}
                      type="button"
                      onClick={() => handleSelectChapter(idx)}
                      aria-pressed={isActive}
                      className={`group/step flex w-full items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                        isActive
                          ? theme.activeStep
                          : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="mt-0.5 flex shrink-0 flex-col items-center gap-1">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#05070D]/80 px-2.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums ${
                            isActive ? theme.stepNumber : 'text-slate-300'
                          }`}
                        >
                          <Play
                            className={`h-2.5 w-2.5 ${isActive ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                          <span>{formatTimestamp(chapter.seconds)}</span>
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span
                            className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${
                              isActive ? theme.stepNumber : 'text-slate-400'
                            }`}
                          >
                            Step {chapter.step}
                          </span>
                          <span className="font-display text-sm font-bold text-white sm:text-[15px]">
                            {chapter.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-[13px]">
                          {chapter.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* System Architecture Highlights */}
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-300 uppercase">
                  <Layers className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                  <span>Production Architecture</span>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {project.architecturePipeline.map((stage, i) => (
                    <li
                      key={stage}
                      className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 text-xs leading-relaxed text-slate-300"
                    >
                      <span className="font-mono text-[11px] font-semibold text-[#00F0FF] tabular-nums">
                        0{i + 1}
                      </span>
                      <span>{stage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Tags */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Clean Live Demo / Client Inquiry CTAs (Zero GitHub/GitLab buttons) */}
              <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleInquiryJump}
                  className={`inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${theme.ctaButton}`}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Build a Similar Product</span>
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#00F0FF]/55 hover:bg-white/[0.08] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <span>Open Live Platform</span>
                    <ArrowUpRight className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
