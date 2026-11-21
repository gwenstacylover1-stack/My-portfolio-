import { lazy, Suspense } from 'react';
import { ArrowDownRight, ArrowUpRight, Cpu, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_INFO, HERO_PROOF_ITEMS } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

const HolographicReactorCanvas = lazy(
  () => import('./HolographicReactorCanvas'),
);

const PROOF_ICONS = {
  'live-platform': Globe,
  'ai-builds': Cpu,
  'cloud-security': ShieldCheck,
};

function ReactorCanvasFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-[320px] w-full items-center justify-center sm:h-[390px] lg:h-[460px]"
    >
      <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        <div className="absolute inset-0 rounded-full border border-[#00F0FF]/20" />
        <div className="absolute inset-5 rounded-full border border-[#3B82F6]/30" />
        <div className="absolute inset-12 rounded-full border border-[#00F0FF]/45 bg-[radial-gradient(circle,rgba(0,240,255,0.22)_0%,transparent_72%)]" />
        <div className="h-5 w-5 rounded-full bg-[#00F0FF]/80 shadow-[0_0_28px_rgba(0,240,255,0.75)]" />
      </div>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-slate-400/75 uppercase whitespace-nowrap">
        EDGE · REAL-TIME · MULTIMODAL
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Typographic Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Top Status Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]" />
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-emerald-300">
                AVAILABLE FOR FULL-STACK WEB &amp; AI PROJECTS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.85rem] lg:leading-[1.04]">
              S.Tarak
            </h1>

            {/* Electric Cyan-to-Blue Gradient Subtitle */}
            <p className="mt-3 font-display text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#4CC2FF] to-[#3B82F6] sm:text-2xl lg:text-[1.75rem]">
              Full-Stack Web &amp; AI Systems Developer
            </p>

            {/* Subheadline */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
              I engineer fast, secure serverless web platforms, automated payment-verified
              dashboards, and real-time multimodal AI assistants using React, Cloudflare Edge,
              and Firebase.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href={CONTACT_INFO.livePlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_28px_rgba(0,240,255,0.32)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_38px_rgba(0,240,255,0.52)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060C]"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-lg transition-all duration-200 hover:border-[#00F0FF]/50 hover:bg-white/[0.08] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
              >
                <span>Start a Project</span>
                <ArrowDownRight className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Right Lazy-Loaded 3D Holographic Orbital Reactor Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="liquid-glass relative overflow-hidden rounded-3xl p-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/45 to-transparent"
              />
              <Suspense fallback={<ReactorCanvasFallback />}>
                <HolographicReactorCanvas />
              </Suspense>
            </div>
          </motion.div>
        </div>

        {/* Engineering Proof Strip (3 Liquid Glass Cards below the split) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16"
        >
          {HERO_PROOF_ITEMS.map((item) => {
            const Icon = PROOF_ICONS[item.id as keyof typeof PROOF_ICONS];
            const iconColor =
              item.accent === 'cyan'
                ? 'text-[#00F0FF]'
                : item.accent === 'blue'
                  ? 'text-[#3B82F6]'
                  : 'text-[#EC4899]';
            return (
              <SpotlightCard key={item.id} accent={item.accent} className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-base font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-snug text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
