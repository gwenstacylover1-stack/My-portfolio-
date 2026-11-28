import {
  ArrowUpRight,
  CalendarCheck,
  Crown,
  Globe,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data/portfolioData';
import {
  ObsidianServiceCard,
  type ObsidianCardAccent,
} from './flagship-previews/SurfaceCard';

interface WebsiteBuildTier {
  id: string;
  title: string;
  priceInr: string;
  description: string;
  accent: ObsidianCardAccent;
  icon: typeof Globe;
}

const WEBSITE_BUILD_TIERS: WebsiteBuildTier[] = [
  {
    id: 'landing-starter',
    title: 'Landing Page / Starter Business Site',
    priceInr: '₹15,000 – ₹35,000',
    description:
      'Fast, mobile-first single-page or 5-page site engineered for lead capture, instant WhatsApp CTA, and strong first impressions.',
    accent: 'cyan',
    icon: Globe,
  },
  {
    id: 'booking-service',
    title: 'Booking & Service Business Website',
    priceInr: '₹40,000 – ₹1,50,000',
    description:
      'Built-in appointment scheduling, interactive service menus, project galleries, and automated WhatsApp/email booking confirmations.',
    accent: 'blue',
    icon: CalendarCheck,
  },
  {
    id: 'luxury-corporate',
    title: 'Custom Luxury / Corporate Brand Website',
    priceInr: '₹50,000 – ₹2,00,000',
    description:
      'Bespoke high-end UI/UX, multi-page brand architecture, fluid animations, technical SEO setup, and ultra-fast cloud deployment.',
    accent: 'pink',
    icon: Crown,
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce & Online Store',
    priceInr: '₹60,000 – ₹4,00,000+',
    description:
      'Complete online storefront with product catalogs, cart & checkout, UPI/card payment gateway integration, order tracking, and admin inventory control.',
    accent: 'emerald',
    icon: ShoppingBag,
  },
  {
    id: 'custom-webapp-saas',
    title: 'Custom Web App / SaaS / Client Portal',
    priceInr: '₹2,50,000 – ₹6,00,000+',
    description:
      'Full-stack web applications with secure user login, interactive dashboards, databases, custom API integrations, and proprietary business workflows.',
    accent: 'cyan',
    icon: Layers,
  },
];

export function WebsiteTypesPricingSection() {
  return (
    <section
      id="website-types"
      aria-labelledby="website-types-heading"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section Header */}
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
              Web Architecture &amp; INR Packages
            </p>
            <h2
              id="website-types-heading"
              className="mt-2.5 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl"
            >
              Types of Websites We Build
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Transparent one-time INR build ranges tailored to your business
              stage—from rapid conversion landing pages to enterprise SaaS
              platforms.
            </p>
          </div>

          {/* Responsive Card Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WEBSITE_BUILD_TIERS.map((tier) => {
              const Icon = tier.icon;
              const quoteHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(`Website Quote - ${tier.title}`)}`;
              const isEnterprise = tier.id === 'custom-webapp-saas';
              const iconAccent =
                tier.accent === 'cyan'
                  ? 'border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]'
                  : tier.accent === 'blue'
                    ? 'border-sky-400/30 bg-sky-400/10 text-sky-300'
                    : tier.accent === 'pink'
                      ? 'border-fuchsia-400/30 bg-fuchsia-500/12 text-fuchsia-300'
                      : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300';

              return (
                <ObsidianServiceCard
                  key={tier.id}
                  accent={tier.accent}
                  featured={isEnterprise}
                  className="p-6"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] ${iconAccent}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="inline-flex items-center rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/[0.09] px-3 py-1 text-xs font-bold text-[#38bdf8] tabular-nums whitespace-nowrap">
                        {tier.priceInr}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                      {tier.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {tier.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <a
                        href={quoteHref}
                        className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-2xl border border-[#38bdf8]/35 bg-[#38bdf8]/[0.11] px-4 text-xs font-semibold text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:border-[#38bdf8]/65 hover:bg-[#38bdf8]/[0.2] hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/75"
                      >
                        <span>Request Quote</span>
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
        </motion.div>
      </div>
    </section>
  );
}
