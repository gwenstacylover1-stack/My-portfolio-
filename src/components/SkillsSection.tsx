import { Cpu, Database, Layout, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

const CATEGORY_ICONS = {
  layout: Layout,
  shield: ShieldCheck,
  database: Database,
  cpu: Cpu,
};

const ICON_COLORS = {
  cyan: 'text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/25',
  blue: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/25',
  pink: 'text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/25',
};

const BENTO_SPANS = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
];

export function SkillsSection() {
  return (
    <section id="tech-stack" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 sm:mb-10">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
              Core Engineering Matrix
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technical Stack &amp; Capabilities
            </h2>
          </div>

          {/* Balanced Asymmetric Bento Grid (7/5 + 5/7 rhythm) */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            {SKILL_CATEGORIES.map((category, idx) => {
              const Icon = CATEGORY_ICONS[category.icon];
              const spanClass = BENTO_SPANS[idx] ?? 'md:col-span-6';
              return (
                <SpotlightCard
                  key={category.id}
                  accent={category.accent}
                  className={`p-6 sm:p-7 ${spanClass}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${ICON_COLORS[category.accent]}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                      {category.title}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/35 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
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
