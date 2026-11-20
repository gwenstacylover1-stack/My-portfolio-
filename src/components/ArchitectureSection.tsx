import { GitBranch, Lock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { ARCHITECTURE_STANDARDS } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

const STANDARD_ICONS = {
  lock: Lock,
  zap: Zap,
  git: GitBranch,
};

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 sm:mb-10">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
              Engineering Standards &amp; Cloud Architecture
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How I Engineer Production Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {ARCHITECTURE_STANDARDS.map((item, idx) => {
              const Icon = STANDARD_ICONS[item.icon];
              const accent = idx === 0 ? 'cyan' : idx === 1 ? 'blue' : 'pink';
              const iconAccent =
                accent === 'cyan'
                  ? 'text-[#00F0FF]'
                  : accent === 'blue'
                    ? 'text-[#3B82F6]'
                    : 'text-[#EC4899]';

              return (
                <SpotlightCard
                  key={item.id}
                  accent={accent}
                  className="p-6 sm:p-7"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon
                          className={`h-5 w-5 ${iconAccent}`}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                        {item.index}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="border-t border-white/[0.07] pt-3.5 font-mono text-xs text-slate-400">
                        {item.metricLabel}
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
