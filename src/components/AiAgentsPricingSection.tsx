import {
  ArrowUpRight,
  BookOpen,
  Command,
  FileSpreadsheet,
  MessageSquare,
  PhoneCall,
  Search,
  ShoppingCart,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data/portfolioData';
import {
  ObsidianServiceCard,
  type ObsidianCardAccent,
} from './flagship-previews/SurfaceCard';

interface AiAgentTier {
  id: string;
  title: string;
  priceInr: string;
  description: string;
  accent: ObsidianCardAccent;
  icon: typeof MessageSquare;
}

const AI_AGENT_TIERS: AiAgentTier[] = [
  {
    id: 'whatsapp-web-support',
    title: '24/7 WhatsApp & Web Support Agent',
    priceInr: '₹25,000 – ₹85,000',
    description:
      'Instant customer support rep that answers FAQs around the clock, shares catalogs and prices, and seamlessly hands off complex cases to your team.',
    accent: 'cyan',
    icon: MessageSquare,
  },
  {
    id: 'rag-knowledge-base',
    title: 'RAG Knowledge Base & Document Q&A Agent',
    priceInr: '₹45,000 – ₹1,50,000',
    description:
      'Private AI trained strictly on your company PDFs, price sheets, policies, and SOPs to give staff and clients accurate, cited answers in seconds.',
    accent: 'blue',
    icon: BookOpen,
  },
  {
    id: 'seo-market-intel',
    title: 'SEO, Market Research & Competitor Intel Agent',
    priceInr: '₹60,000 – ₹1,80,000',
    description:
      'Tracks competitors continuously, audits website SEO gaps, monitors pricing shifts, and generates structured executive reports.',
    accent: 'emerald',
    icon: Search,
  },
  {
    id: 'hr-recruitment-onboarding',
    title: 'HR, Recruitment & Onboarding Agent',
    priceInr: '₹75,000 – ₹2,00,000',
    description:
      'Screens incoming resumes, shortlists top candidates, schedules interviews automatically, and answers routine employee onboarding questions.',
    accent: 'pink',
    icon: Users,
  },
  {
    id: 'sales-closer-qualification',
    title: 'Sales Closer & Lead Qualification Agent',
    priceInr: '₹85,000 – ₹1,80,000',
    description:
      'Captures inbound leads, qualifies customer budgets and timelines, runs automated follow-ups, and books qualified appointments straight onto your calendar.',
    accent: 'cyan',
    icon: Target,
  },
  {
    id: 'ai-voice-receptionist',
    title: 'AI Voice Receptionist & Calling Agent',
    priceInr: '₹90,000 – ₹2,50,000',
    description:
      'Natural-sounding conversational voice agent that handles inbound business inquiries, appointment reminders, and customer onboarding calls.',
    accent: 'blue',
    icon: PhoneCall,
  },
  {
    id: 'backoffice-accounts-billing',
    title: 'Back-Office, Accounts & Billing Automation Agent',
    priceInr: '₹1,00,000 – ₹3,50,000',
    description:
      'Automates invoice verification, vendor bill reconciliation, spreadsheet updates, gatepass/document checks, and real-time CRM syncing.',
    accent: 'emerald',
    icon: FileSpreadsheet,
  },
  {
    id: 'autonomous-ecommerce',
    title: 'Autonomous E-Commerce & Transactional Agent',
    priceInr: '₹1,50,000 – ₹4,00,000',
    description:
      'Handles live order status lookups, generates UPI/payment links, processes return/refund flows, and triggers low-inventory alerts automatically.',
    accent: 'pink',
    icon: ShoppingCart,
  },
  {
    id: 'multi-agent-command-center',
    title: 'Custom Multi-Agent Command Center',
    priceInr: '₹5,00,000 – ₹15,00,000+',
    description:
      'A coordinated squad of specialized AI agents working together inside one private, executive dashboard engineered exclusively for your business.',
    accent: 'cyan',
    icon: Command,
  },
];

export function AiAgentsPricingSection() {
  return (
    <section
      id="ai-agent-types"
      aria-labelledby="ai-agent-types-heading"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle ambient purple/cyan aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-1/2 -z-10 h-[440px] w-[min(92vw,900px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,rgba(0,240,255,0.055)_52%,transparent_76%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.06 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section Header */}
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#EC4899] uppercase sm:text-xs">
              Autonomous Business Automation
            </p>
            <h2
              id="ai-agent-types-heading"
              className="mt-2.5 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl"
            >
              AI Agents We Build
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Production-ready, revenue-focused autonomous agents engineered for
              support, sales, voice reception, finance, and private operations.
            </p>
          </div>

          {/* 9-Agent Responsive Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {AI_AGENT_TIERS.map((agent) => {
              const Icon = agent.icon;
              const isFlagship = agent.id === 'multi-agent-command-center';
              const deployHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(`AI Agent Inquiry - ${agent.title}`)}`;
              const iconAccent =
                agent.accent === 'cyan'
                  ? 'border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]'
                  : agent.accent === 'blue'
                    ? 'border-indigo-400/30 bg-indigo-400/12 text-indigo-300'
                    : agent.accent === 'pink'
                      ? 'border-fuchsia-400/30 bg-fuchsia-500/12 text-fuchsia-300'
                      : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300';

              return (
                <ObsidianServiceCard
                  key={agent.id}
                  accent={agent.accent}
                  featured={isFlagship}
                  className="p-6"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] ${iconAccent}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold tabular-nums whitespace-nowrap ${
                          isFlagship
                            ? 'border-[#38bdf8]/40 bg-[#38bdf8]/[0.12] text-sky-100'
                            : 'border-fuchsia-400/30 bg-fuchsia-500/[0.1] text-fuchsia-200'
                        }`}
                      >
                        {agent.priceInr}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                      {agent.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {agent.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <a
                        href={deployHref}
                        className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-[#38bdf8]/45 hover:bg-[#38bdf8]/[0.1] hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/70"
                      >
                        <span>Deploy This Agent</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </ObsidianServiceCard>
              );
            })}
          </div>

          {/* Muted Footnote */}
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-400 sm:text-[13px]">
            All prices shown are one-time build estimates in INR. Ongoing
            monthly AI API and cloud hosting usage typically ranges from ₹3,000
            – ₹15,000 depending on business volume.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
