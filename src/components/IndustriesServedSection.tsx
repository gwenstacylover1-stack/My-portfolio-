import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  INDUSTRY_CATALOG,
  type IndustryDefinition,
} from './industries/industryCatalog';
import { IndustryDemoModal } from './industries/IndustryDemoModal';

export function IndustriesServedSection() {
  const [activeIndustry, setActiveIndustry] =
    useState<IndustryDefinition | null>(null);

  return (
    <>
      <section
        id="industries"
        aria-labelledby="industries-heading"
        className="relative scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
                Domain Coverage
              </p>
              <h2
                id="industries-heading"
                className="mt-2.5 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl"
              >
                Industries &amp; Markets We Serve
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                Custom websites and autonomous AI workflows tailored to real-world
                verticals across India and global remote markets. Tap any industry
                below to explore a full interactive demo website.
              </p>
            </div>

            {/* Interactive Dark-Glass Industry Demo Cards */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRY_CATALOG.map((industry) => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.id}
                    type="button"
                    onClick={() => setActiveIndustry(industry)}
                    className="group liquid-glass flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00F0FF]/45 hover:bg-white/[0.05] hover:shadow-[0_0_24px_-6px_rgba(0,240,255,0.28)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-[#00F0FF]/35 group-hover:bg-[#00F0FF]/10">
                        <Icon
                          className={`h-4 w-4 ${industry.accent}`}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-xs font-medium leading-snug text-slate-200 transition-colors group-hover:text-white sm:text-[13.5px]">
                        {industry.label}
                      </span>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-[#00F0FF]/25 bg-[#00F0FF]/10 px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap text-[#00F0FF] transition-all group-hover:border-[#00F0FF]/55 group-hover:bg-[#00F0FF]/18">
                      <span>Live Website Demo</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <IndustryDemoModal
        industry={activeIndustry}
        onClose={() => setActiveIndustry(null)}
      />
    </>
  );
}

