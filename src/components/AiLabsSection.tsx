import { ArrowUpRight, Layers, Play } from 'lucide-react';
import { motion } from 'motion/react';
import {
  FLAGSHIP_PROJECTS,
  FlagshipProject,
  ProjectAccentTheme,
} from '../data/portfolioData';
import { formatTimestamp } from '../utils/youtube';
import { ObsidianPhoneFrame } from './ObsidianPhoneFrame';
import { SpotlightCard } from './SpotlightCard';

interface AiLabsSectionProps {
  onOpenProjectDemo: (
    project: FlagshipProject,
    chapterIndex?: number,
    autoPlay?: boolean,
  ) => void;
  onOpenCaseStudy: (project: FlagshipProject) => void;
}

const CARD_THEME: Record<
  ProjectAccentTheme,
  {
    statusBadge: string;
    labelAccent: string;
    stepHover: string;
    stepTime: string;
    primaryCta: string;
  }
> = {
  pink: {
    statusBadge: 'border-pink-400/35 bg-pink-500/12 text-pink-200',
    labelAccent: 'border-pink-400/25 bg-pink-500/[0.07] text-pink-100',
    stepHover: 'hover:border-pink-400/45 hover:bg-pink-500/[0.1]',
    stepTime: 'text-pink-300',
    primaryCta:
      'bg-gradient-to-r from-[#EC4899] to-[#D946EF] text-white shadow-[0_0_24px_rgba(236,72,153,0.3)] hover:brightness-110',
  },
  cyan: {
    statusBadge: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
    labelAccent: 'border-[#00F0FF]/25 bg-[#00F0FF]/[0.07] text-cyan-100',
    stepHover: 'hover:border-[#00F0FF]/45 hover:bg-[#00F0FF]/[0.09]',
    stepTime: 'text-[#00F0FF]',
    primaryCta:
      'bg-[#00F0FF] text-[#04060C] shadow-[0_0_24px_rgba(0,240,255,0.32)] hover:bg-[#5CF6FF]',
  },
  holo: {
    statusBadge: 'border-sky-400/35 bg-sky-500/12 text-sky-200',
    labelAccent: 'border-sky-400/25 bg-sky-500/[0.07] text-sky-100',
    stepHover: 'hover:border-sky-400/45 hover:bg-sky-500/[0.1]',
    stepTime: 'text-sky-300',
    primaryCta:
      'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-[#04060C] shadow-[0_0_24px_rgba(59,130,246,0.32)] hover:brightness-110',
  },
  emerald: {
    statusBadge: 'border-emerald-400/35 bg-emerald-500/12 text-emerald-200',
    labelAccent: 'border-emerald-400/25 bg-emerald-500/[0.07] text-emerald-100',
    stepHover: 'hover:border-emerald-400/45 hover:bg-emerald-500/[0.1]',
    stepTime: 'text-emerald-300',
    primaryCta:
      'bg-gradient-to-r from-emerald-400 to-[#3B82F6] text-[#04060C] shadow-[0_0_24px_rgba(16,185,129,0.32)] hover:brightness-110',
  },
};

export function AiLabsSection({
  onOpenProjectDemo,
  onOpenCaseStudy,
}: AiLabsSectionProps) {
  return (
    <section id="ai-labs" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
                Flagship Builds &amp; Interactive Video Demos
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                AI &amp; Software Labs — Live Demos
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Tap any obsidian 9:16 mobile frame, jump straight to a Step 1–5 chapter, or
              open the slide-over Architecture &amp; Case Study drawer.
            </p>
          </div>

          {/* 4 Flagship Project Cards Grid (Strict 1-to-1 Video Mapping) */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            {FLAGSHIP_PROJECTS.map((project) => {
              const theme = CARD_THEME[project.accentTheme];

              return (
                <SpotlightCard
                  key={project.id}
                  id={
                    project.id === 'dark-stark-smm'
                      ? 'dark-stark-platform'
                      : undefined
                  }
                  as="article"
                  accent={project.spotlightAccent}
                  className="scroll-mt-28 p-5 sm:p-7"
                >
                  <div className="flex h-full flex-col gap-6 sm:grid sm:grid-cols-[224px_1fr] sm:items-start">
                    {/* Left: Sleek Obsidian 9:16 Mobile Phone Frame + Exact Label Directly Below */}
                    <div className="flex flex-col items-center">
                      <ObsidianPhoneFrame
                        projectName={project.name}
                        youtubeUrl={project.youtubeUrl}
                        fallbackImage={project.fallbackImage}
                        accentTheme={project.accentTheme}
                        isPlaying={false}
                        onPlayClick={() => onOpenProjectDemo(project, 0, true)}
                        size="card"
                      />

                      {/* Exact Required Label Directly Below Media */}
                      <div
                        className={`mt-3.5 w-full max-w-[248px] rounded-xl border px-3 py-2 text-center ${theme.labelAccent}`}
                      >
                        <p className="font-mono text-[10.5px] font-semibold leading-snug tracking-wide">
                          {project.exactMediaLabel}
                        </p>
                      </div>
                    </div>

                    {/* Right: Project Overview, Interactive Chapter Jump Pills, Case Study & Demo CTAs */}
                    <div className="flex h-full min-w-0 flex-col">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                          PROJECT {project.orderNumber}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap ${theme.statusBadge}`}
                        >
                          {project.status === 'LIVE DEPLOYED' && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                          )}
                          <span>{project.status}</span>
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white">
                        {project.name}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {project.summary}
                      </p>

                      {/* Clickable Step 1-5 Quick-Jump Chapter List */}
                      <div className="mt-4">
                        <div className="mb-2 font-mono text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                          Jump to Demo Chapter
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {project.chapters.map((chapter, chapterIdx) => (
                            <button
                              key={`${project.id}-card-step-${chapter.step}`}
                              type="button"
                              onClick={() =>
                                onOpenProjectDemo(project, chapterIdx, true)
                              }
                              className={`flex min-h-[38px] items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${theme.stepHover}`}
                            >
                              <span className="min-w-0 truncate text-xs font-medium text-slate-200">
                                <span className="font-mono text-[11px] text-slate-400">
                                  {chapter.step}.{' '}
                                </span>
                                {chapter.title}
                              </span>
                              <span
                                className={`shrink-0 font-mono text-[11px] font-semibold tabular-nums ${theme.stepTime}`}
                              >
                                {formatTimestamp(chapter.seconds)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Stack Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons (Demo + Case Study Drawer + Live Site; Zero GitHub/GitLab Buttons) */}
                      <div className="mt-auto pt-5">
                        <div className="flex flex-col gap-2.5 border-t border-white/[0.07] pt-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenProjectDemo(project, 0, false)}
                              className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${theme.primaryCta}`}
                            >
                              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                              <span>Inspect &amp; Watch Demo</span>
                            </button>

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Launch ${project.name} live website`}
                                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-[#00F0FF]/50 hover:text-[#00F0FF] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                              >
                                <span>Live Site</span>
                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => onOpenCaseStudy(project)}
                            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-200 transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.07] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                          >
                            <Layers className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                            <span>View Architecture / Case Study</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
