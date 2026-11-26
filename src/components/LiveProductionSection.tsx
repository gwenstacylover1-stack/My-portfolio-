import { useState } from 'react';
import {
  ArrowRight,
  Cloud,
  Database,
  Layers,
  Play,
  Shield,
  Webhook,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  FLAGSHIP_PROJECTS,
  FlagshipProject,
  LIVE_PLATFORM_ARCHITECTURE,
  LIVE_PLATFORM_TECH,
} from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

const NODE_ICONS = {
  frontend: Layers,
  'edge-proxy': Shield,
  firebase: Database,
  upstream: Webhook,
};

interface LiveProductionSectionProps {
  onOpenProjectDemo: (
    project: FlagshipProject,
    chapterIndex?: number,
    autoPlay?: boolean,
  ) => void;
  onOpenCaseStudy: (project: FlagshipProject) => void;
}

export function LiveProductionSection({
  onOpenProjectDemo,
  onOpenCaseStudy,
}: LiveProductionSectionProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(
    LIVE_PLATFORM_ARCHITECTURE[1].id,
  );

  const activeNode =
    LIVE_PLATFORM_ARCHITECTURE.find((n) => n.id === activeNodeId) ??
    LIVE_PLATFORM_ARCHITECTURE[0];

  const darkStarkProject = FLAGSHIP_PROJECTS.find(
    (p) => p.id === 'dark-stark-smm',
  );

  return (
    <section id="live-build" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex flex-col gap-2 sm:mb-10">
            <p className="text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
              Production Web Platform
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Live System Architecture
            </h2>
          </div>

          <SpotlightCard accent="cyan" className="p-6 sm:p-8 lg:p-10">
            {/* Header Row: Architecture Status Badge + Infrastructure Label */}
            <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.18)] whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                  PRODUCTION BLUEPRINT
                </span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs text-slate-400">
                <Cloud className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
                <span>Cloudflare Global Edge + Firebase</span>
              </div>
            </div>

            {/* Architecture Title & Description */}
            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Serverless Edge &amp; Wallet Architecture
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  A production-tested serverless architecture engineered for high-volume
                  order routing, real-time Firestore wallet ledgers, automated Zap payment
                  gateway integration with instant wallet top-ups, full admin panel
                  management, and zero-key-exposure edge API proxying.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
                {darkStarkProject && (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(darkStarkProject)}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-100 transition-colors hover:border-white/35 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                    >
                      <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                      <span>Case Study</span>
                    </button>

                    {darkStarkProject.youtubeUrl && (
                      <button
                        type="button"
                        onClick={() => onOpenProjectDemo(darkStarkProject, 0, true)}
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#00F0FF]/35 bg-[#00F0FF]/[0.08] px-5 py-2.5 text-xs font-semibold text-[#00F0FF] transition-all duration-200 hover:border-[#00F0FF]/70 hover:bg-[#00F0FF]/15 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                        <span>Watch Tour</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Interactive Architecture Flow Diagram */}
            <div className="mt-9 rounded-2xl border border-white/[0.08] bg-[#050812]/85 p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-semibold tracking-[0.14em] text-slate-300 uppercase">
                  Interactive System Architecture Pipeline
                </span>
                <span className="text-[11px] text-slate-400">
                  Select any node to inspect edge &amp; security boundaries
                </span>
              </div>

              {/* 4-Stage Pipeline Grid */}
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
                {LIVE_PLATFORM_ARCHITECTURE.map((node, index) => {
                  const Icon = NODE_ICONS[node.id as keyof typeof NODE_ICONS];
                  const isActive = node.id === activeNode.id;

                  return (
                    <div key={node.id} className="contents">
                      <button
                        type="button"
                        onClick={() => setActiveNodeId(node.id)}
                        aria-pressed={isActive}
                        className={`group relative flex min-h-[44px] flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/80 ${
                          isActive
                            ? 'border-[#00F0FF]/60 bg-[#00F0FF]/[0.09] shadow-[0_0_24px_rgba(0,240,255,0.14)]'
                            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[11px] font-semibold tabular-nums ${
                              isActive ? 'text-[#00F0FF]' : 'text-slate-500'
                            }`}
                          >
                            {node.step}
                          </span>
                          <Icon
                            className={`h-4 w-4 transition-colors ${
                              isActive
                                ? 'text-[#00F0FF]'
                                : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                            aria-hidden="true"
                          />
                        </div>

                        <div className="mt-3">
                          <div className="text-sm font-semibold leading-snug text-white">
                            {node.title}
                          </div>
                          <div className="mt-1 text-[11px] leading-snug text-[#00F0FF]/85">
                            {node.layer}
                          </div>
                        </div>
                      </button>

                      {/* Animated Connector between Pipeline Nodes */}
                      {index < LIVE_PLATFORM_ARCHITECTURE.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="flex items-center justify-center py-0.5 lg:py-0"
                        >
                          <div className="hidden lg:flex items-center gap-0.5">
                            <div className="relative h-px w-6 overflow-hidden bg-white/15">
                              <div className="animate-flow-beam absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-[#00F0FF]/70" />
                          </div>
                          <div className="flex lg:hidden items-center justify-center text-[#00F0FF]/65">
                            <ArrowRight className="h-4 w-4 rotate-90" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Active Node Telemetry Details */}
              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-5 md:grid-cols-12 md:items-start">
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold text-white">
                      {activeNode.title} · {activeNode.layer}
                    </span>
                    <span className="text-xs text-[#3B82F6]">
                      {activeNode.protocol}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {activeNode.summary}
                  </p>
                </div>

                <div className="md:col-span-4 md:border-l md:border-white/[0.08] md:pl-5">
                  <div className="text-[11px] font-semibold tracking-wider text-emerald-300 uppercase">
                    Security Boundary
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {activeNode.securityNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {LIVE_PLATFORM_TECH.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
