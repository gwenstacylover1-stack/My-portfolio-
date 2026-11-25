import {
  ArrowUpRight,
  Layers,
  Server,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react';
import { FlagshipProject } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

interface DarkStarkShowcaseCardProps {
  project: FlagshipProject;
  onOpenCaseStudy: (project: FlagshipProject) => void;
}

const ENGINEERING_HIGHLIGHTS = [
  {
    id: 'zapupi-gateway',
    title: 'Automated ZapUPI Gateway',
    description:
      '100% instant automated UPI wallet crediting with zero manual UTR verification.',
    icon: Zap,
    accent: 'cyan' as const,
  },
  {
    id: 'support-admin-terminal',
    title: 'Two-Way Support & Admin Terminal',
    description:
      'Interactive customer ticket threads synced in real time with a dedicated Admin Terminal for filtering, replying, and status management.',
    icon: Terminal,
    accent: 'magenta' as const,
  },
  {
    id: 'serverless-edge',
    title: 'Serverless Edge Architecture',
    description:
      'Custom Cloudflare Workers API proxy handling automated SMM v2 order placement, live balance syncing, and multi-currency conversion.',
    icon: Server,
    accent: 'cyan' as const,
  },
  {
    id: 'mobile-first-ux',
    title: 'Mobile-First Responsive UX',
    description:
      'Adaptive mobile and desktop navigation, real-time order tracking, and fast zero-clutter checkout flows.',
    icon: Smartphone,
    accent: 'magenta' as const,
  },
];

const TECH_STACK_BADGES = [
  'React',
  'Cloudflare Pages & Workers',
  'Firebase Auth & DB',
  'ZapUPI API',
  'Tailwind CSS',
] as const;

export function DarkStarkShowcaseCard({
  project,
  onOpenCaseStudy,
}: DarkStarkShowcaseCardProps) {
  return (
    <SpotlightCard
      id="dark-stark-platform"
      as="article"
      accent="cyan"
      className="mb-7 scroll-mt-28 border-white/[0.12] p-6 font-sans transition-all duration-300 hover:border-[#00F0FF]/40 hover:shadow-[0_24px_64px_rgba(0,0,0,0.65),0_0_44px_rgba(0,240,255,0.12)] sm:p-8 lg:p-10"
    >
      {/* Subtle Top Cyan-to-Magenta Specular Border Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#00F0FF]/85 via-[#3B82F6]/65 to-[#EC4899]/80"
      />

      {/* Controlled Cyan + Magenta Corner Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.12)_0%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.10)_0%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 flex flex-col">
        {/* TOP HEADER: Responsive Floating Brand Emblem + Title + LIVE IN PRODUCTION Pill + Primary CTAs */}
        <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-7">
          <div className="flex items-center gap-4 md:flex-row-reverse md:items-center md:justify-between md:gap-8">
            {/* Floating Brand Emblem (side-by-side on mobile, right-aligned & larger on md+) */}
            <div className="group/emblem relative shrink-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2.5 rounded-3xl bg-[radial-gradient(circle,rgba(34,211,238,0.32)_0%,rgba(236,72,153,0.22)_56%,transparent_76%)] opacity-75 blur-xl transition-opacity duration-300 group-hover/emblem:opacity-100 md:-inset-3.5"
              />
              <div className="animate-emblem-float relative rounded-2xl border border-white/10 bg-black/40 p-1 shadow-[0_0_25px_rgba(34,211,238,0.22)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 group-hover/emblem:border-cyan-400/40 group-hover/emblem:shadow-[0_0_36px_rgba(34,211,238,0.42),0_0_24px_rgba(236,72,153,0.24)]">
                <img
                  src="/assets/aistudio/IMG_20261031_020408_05f4eee2_05f4eee2.png"
                  alt="Dark Stark SMM official brand emblem"
                  width={80}
                  height={80}
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-xl object-cover md:h-20 md:w-20"
                />
              </div>
            </div>

            {/* Project Meta, Title & Desktop Subtitle */}
            <div className="min-w-0 flex-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-400 tabular-nums sm:text-xs">
                  PROJECT {project.orderNumber}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-gradient-to-r from-emerald-500/15 via-[#00F0FF]/12 to-cyan-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)] whitespace-nowrap sm:gap-2 sm:px-3 sm:py-1 sm:text-[10.5px] sm:tracking-[0.14em]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  </span>
                  <span>LIVE IN PRODUCTION</span>
                </span>
              </div>

              <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                Dark Stark SMM
              </h3>

              <p className="mt-2.5 hidden text-sm leading-relaxed text-slate-300 md:block sm:text-[15px]">
                Full-stack live production wallet, automated SMM v2 order-routing,
                and real-time customer support web platform deployed on Cloudflare
                Global Edge and Firebase.
              </p>
            </div>
          </div>

          {/* Mobile Subtitle (keeps header emblem + title compact above CTA buttons) */}
          <p className="text-sm leading-relaxed text-slate-300 md:hidden">
            Full-stack live production wallet, automated SMM v2 order-routing,
            and real-time customer support web platform deployed on Cloudflare
            Global Edge and Firebase.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0891B2] via-[#2563EB] to-[#C026D3] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_30px_rgba(0,240,255,0.25),0_0_24px_rgba(236,72,153,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_34px_rgba(0,240,255,0.34),0_0_28px_rgba(236,72,153,0.34)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              >
                <span>Launch Live Platform</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            )}

            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-5 py-3 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00F0FF]/45 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              <span>Architecture Case Study</span>
            </button>
          </div>
        </div>

        {/* 2x2 DETAILED FEATURE & ENGINEERING GRID */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ENGINEERING_HIGHLIGHTS.map((feature) => {
            const Icon = feature.icon;
            const isCyan = feature.accent === 'cyan';

            return (
              <div
                key={feature.id}
                className={`group/tile relative flex flex-col rounded-2xl border border-white/[0.09] bg-[#060A15]/75 p-5 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 sm:p-6 ${
                  isCyan
                    ? 'hover:border-[#00F0FF]/45 hover:bg-[#081020]/90 hover:shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_26px_rgba(0,240,255,0.12)]'
                    : 'hover:border-fuchsia-400/45 hover:bg-[#10091C]/85 hover:shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_26px_rgba(236,72,153,0.13)]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover/tile:scale-105 ${
                      isCyan
                        ? 'border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_18px_rgba(0,240,255,0.16)]'
                        : 'border-fuchsia-400/30 bg-fuchsia-500/12 text-fuchsia-300 shadow-[0_0_18px_rgba(236,72,153,0.18)]'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-sans text-[15px] font-bold tracking-tight text-white sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300/95">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TECH STACK BADGES ROW */}
        <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase whitespace-nowrap">
            Production Stack
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {TECH_STACK_BADGES.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.11] bg-white/[0.04] px-3 py-1 font-mono text-[11px] font-medium text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
