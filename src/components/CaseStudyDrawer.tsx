import { useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Play,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FlagshipProject, ProjectAccentTheme } from '../data/portfolioData';

interface CaseStudyDrawerProps {
  project: FlagshipProject | null;
  onClose: () => void;
  onWatchDemo: (project: FlagshipProject) => void;
}

const DRAWER_THEME: Record<
  ProjectAccentTheme,
  {
    badge: string;
    sectionAccent: string;
    primaryCta: string;
    stepNum: string;
  }
> = {
  pink: {
    badge: 'border-pink-400/35 bg-pink-500/15 text-pink-200',
    sectionAccent: 'text-pink-300',
    primaryCta:
      'bg-gradient-to-r from-[#EC4899] to-[#D946EF] text-white shadow-[0_0_26px_rgba(236,72,153,0.35)] hover:brightness-110',
    stepNum: 'text-pink-300',
  },
  cyan: {
    badge: 'border-[#00F0FF]/35 bg-[#00F0FF]/12 text-[#00F0FF]',
    sectionAccent: 'text-[#00F0FF]',
    primaryCta:
      'bg-[#00F0FF] text-[#04060C] shadow-[0_0_26px_rgba(0,240,255,0.38)] hover:bg-[#5CF6FF]',
    stepNum: 'text-[#00F0FF]',
  },
  holo: {
    badge: 'border-sky-400/35 bg-sky-500/15 text-sky-200',
    sectionAccent: 'text-sky-300',
    primaryCta:
      'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-[#04060C] shadow-[0_0_26px_rgba(59,130,246,0.36)] hover:brightness-110',
    stepNum: 'text-sky-300',
  },
  emerald: {
    badge: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200',
    sectionAccent: 'text-emerald-300',
    primaryCta:
      'bg-gradient-to-r from-emerald-400 to-[#3B82F6] text-[#04060C] shadow-[0_0_26px_rgba(16,185,129,0.36)] hover:brightness-110',
    stepNum: 'text-emerald-300',
  },
};

export function CaseStudyDrawer({
  project,
  onClose,
  onWatchDemo,
}: CaseStudyDrawerProps) {
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

  const handleBuildSimilar = () => {
    onClose();
    window.setTimeout(() => {
      const target =
        document.getElementById('estimator') ??
        document.getElementById('contact');
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleOpenDemo = () => {
    if (!project) return;
    const selected = project;
    onClose();
    onWatchDemo(selected);
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-drawer-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020409]/82 backdrop-blur-sm"
          />

          {/* Slide-Over Liquid Glass Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-white/12 bg-[#080D1B]/96 shadow-[-24px_0_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Top Specular Edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            {/* Sticky Drawer Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-7">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                    Architecture &amp; Case Study
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider ${
                      project.status === 'LIVE DEPLOYED'
                        ? 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300'
                        : DRAWER_THEME[project.accentTheme].badge
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3
                  id="case-study-drawer-title"
                  className="mt-2 text-2xl font-bold tracking-tight text-white"
                >
                  {project.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {project.exactMediaLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study drawer"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-200 transition-colors hover:border-[#00F0FF]/50 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              {/* 1. Project Overview & Core Goal */}
              <div>
                <div
                  className={`flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase ${
                    DRAWER_THEME[project.accentTheme].sectionAccent
                  }`}
                >
                  <Target className="h-4 w-4" aria-hidden="true" />
                  <span>01. Project Overview &amp; Core Goal</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
                  {project.caseStudy.coreGoal}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {project.summary}
                </p>
              </div>

              {/* 2. Technical Stack Badges */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="text-xs font-semibold tracking-[0.14em] text-slate-300 uppercase">
                  02. Technical Stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Engineering & Security Highlights */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-emerald-300 uppercase">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>03. Security &amp; Edge Isolation</span>
                </div>
                <ul className="mt-3.5 space-y-2.5">
                  {project.caseStudy.securityHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-3 text-sm leading-relaxed text-slate-200"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture & System Pipeline */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-slate-300 uppercase">
                  <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                  <span>04. Engineering Highlights &amp; Pipeline</span>
                </div>

                <ul className="mt-3.5 space-y-2.5">
                  {project.caseStudy.engineeringHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F0FF]"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ol className="mt-4 space-y-2">
                  {project.architecturePipeline.map((stage, i) => (
                    <li
                      key={stage}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-xs leading-relaxed text-slate-200"
                    >
                      <span
                        className={`text-[11px] font-semibold tabular-nums ${
                          DRAWER_THEME[project.accentTheme].stepNum
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span>{stage}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sticky Bottom Direct Actions (Compact on mobile for taller scroll viewport) */}
            <div className="border-t border-white/[0.08] bg-[#060A15]/92 px-4 py-3 backdrop-blur-xl sm:px-7 sm:py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
                <button
                  type="button"
                  onClick={handleBuildSimilar}
                  className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap sm:flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                    DRAWER_THEME[project.accentTheme].primaryCta
                  }`}
                >
                  <span>Build Something Similar</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <div
                  className={`grid gap-2 sm:flex sm:shrink-0 ${
                    project.youtubeUrl && project.liveUrl
                      ? 'grid-cols-2'
                      : 'grid-cols-1'
                  }`}
                >
                  {project.youtubeUrl && (
                    <button
                      type="button"
                      onClick={handleOpenDemo}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer whitespace-nowrap sm:w-auto sm:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      <span>Watch Tour</span>
                    </button>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-[#00F0FF]/50 hover:text-[#00F0FF] whitespace-nowrap sm:w-auto sm:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
