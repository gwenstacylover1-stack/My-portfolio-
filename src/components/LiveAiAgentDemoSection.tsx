import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data/portfolioData';

const AI_SQUAD_MEMBERS = [
  {
    name: 'TARAK',
    role: 'Master Orchestrator Agent',
    detail: 'Mission planning & multi-agent coordination',
    accent: 'text-[#00F0FF]',
    dot: 'bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.85)]',
  },
  {
    name: 'MAHESH',
    role: 'Web & UI Architect Agent',
    detail: 'Autonomous code & responsive web architecture',
    accent: 'text-sky-300',
    dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.85)]',
  },
  {
    name: 'KAMESH',
    role: 'Sales Closer Agent',
    detail: 'Conversion copywriting, lead capture & WhatsApp booking flows',
    accent: 'text-indigo-300',
    dot: 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.85)]',
  },
  {
    name: 'RUPESH',
    role: 'Voice Executive Agent',
    detail: 'Natural AI voice greetings & automated booking desks',
    accent: 'text-fuchsia-300',
    dot: 'bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.85)]',
  },
  {
    name: 'GANESH',
    role: 'Intel & SEO Analyst Agent',
    detail: 'Competitor audits, SEO structure & business analytics',
    accent: 'text-emerald-300',
    dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]',
  },
] as const;

export function LiveAiAgentDemoSection() {
  const bookingHref = `mailto:${CONTACT_INFO.email}?subject=Custom%20AI%20Agent%20or%20Website%20Inquiry`;

  return (
    <section
      id="live-ai-demo"
      aria-labelledby="live-ai-demo-heading"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle controlled cyan-to-violet ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -z-10 h-[420px] w-[min(92vw,880px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.085)_0%,rgba(99,102,241,0.06)_50%,transparent_76%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="smooth-glow-frame rounded-3xl bg-[#070C1A]/85 p-5 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          {/* Top specular hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/45 to-transparent"
          />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left / Top (on mobile): 9:16 Vertical Phone-Frame Neon Glass Player */}
            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[342px] rounded-[28px] border border-white/12 bg-gradient-to-b from-[#0E162B]/95 to-[#050814]/95 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_26px_70px_-18px_rgba(0,0,0,0.9),0_0_40px_-14px_rgba(0,240,255,0.22)]">
                {/* Subtle phone speaker notch accent */}
                <div
                  aria-hidden="true"
                  className="mx-auto mb-2.5 h-1.5 w-16 rounded-full bg-white/15"
                />

                {/* Locked 9:16 Vertical YouTube Shorts Embed */}
                <div className="mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl border border-cyan-400/30 bg-black shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/NpJ9hL7biqA"
                    title="S.TARAK AI Labs — Live Multi-Agent Website Build Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>

            {/* Right / Bottom (on mobile): Demo Breakdown & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/35 bg-[#00F0FF]/[0.09] px-3.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]"
                />
                <span>LIVE AUTONOMOUS DEMO</span>
              </div>

              <h2
                id="live-ai-demo-heading"
                className="mt-4 text-2xl font-bold tracking-tight text-white leading-[1.12] sm:text-3xl lg:text-4xl"
              >
                Watch Our AI Squad Build a Flagship Website Live
              </h2>

              <p className="mt-3.5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                From a single command to a deployed business
                website—orchestrated in real time by our 5-agent business squad
                (strictly non-video autonomous agents):
              </p>

              {/* Compact 5-Agent Squad Breakdown */}
              <ul className="mt-5 space-y-2.5">
                {AI_SQUAD_MEMBERS.map((agent) => (
                  <li
                    key={agent.name}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 transition-colors hover:border-cyan-400/25 hover:bg-white/[0.04]"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-2 w-2 shrink-0 rounded-full ${agent.dot}`}
                    />
                    <p className="text-xs leading-relaxed text-slate-300 sm:text-[13.5px]">
                      <strong className={`font-bold ${agent.accent}`}>
                        {agent.name}
                      </strong>{' '}
                      <span className="font-semibold text-white">
                        — {agent.role}
                      </span>{' '}
                      <span className="text-slate-400">({agent.detail})</span>
                    </p>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={bookingHref}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_28px_rgba(0,240,255,0.32)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_38px_rgba(0,240,255,0.5)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060C]"
                >
                  <span>Book Your Custom AI Build</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href="https://youtube.com/shorts/NpJ9hL7biqA?feature=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-lg transition-all duration-200 hover:border-[#00F0FF]/50 hover:bg-white/[0.08] hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
                >
                  <Play
                    className="h-3.5 w-3.5 shrink-0 fill-current text-[#00F0FF]"
                    aria-hidden="true"
                  />
                  <span>Watch Demo on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
