import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { InstagramIcon, SOCIAL_LINKS, YouTubeIcon } from './SocialIcons';
import { SpotlightCard } from './SpotlightCard';

export function CreativeChannelsSection() {
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
          viewport={{ once: true, amount: 0.1 }}
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-500/20 via-pink-500/15 to-violet-500/20 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,0.22)] sm:h-12 sm:w-12">
                      <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[11px] font-semibold tracking-[0.1em] text-fuchsia-300/90 uppercase">
                        Instagram · Dev &amp; 3D Build Lab
                      </div>
                      <h3 className="mt-0.5 truncate text-lg font-bold tracking-tight text-white sm:text-xl">
                        {SOCIAL_LINKS.instagram.handle}
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-fuchsia-400/40 bg-fuchsia-500/12 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-fuchsia-200 uppercase whitespace-nowrap">
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 text-fuchsia-300"
                      aria-hidden="true"
                    />
                    <span>ACTIVE CREATOR</span>
                  </span>
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-500/20 via-red-500/15 to-[#00F0FF]/15 text-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.22)] sm:h-12 sm:w-12">
                      <YouTubeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[11px] font-semibold tracking-[0.1em] text-rose-300/90 uppercase">
                        YouTube · Motion &amp; Visual Production
                      </div>
                      <h3 className="mt-0.5 truncate text-lg font-bold tracking-tight text-white sm:text-xl">
                        TARAK YT · @tarakyt-i9z
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-rose-400/35 bg-gradient-to-r from-rose-500/12 to-[#00F0FF]/10 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-rose-100 uppercase whitespace-nowrap">
                    <span>4K 60FPS MOTION</span>
                  </span>
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
        </motion.div>
      </div>
    </section>
  );
}
