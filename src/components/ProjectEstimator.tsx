import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { formatCurrencyRange } from '../context/CurrencyContext';
import { CONTACT_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

type DeliverySpeedId = 'standard' | 'priority';

type ProjectTierId =
  | 'landing-starter'
  | 'booking-service'
  | 'luxury-corporate'
  | 'ecommerce-store'
  | 'custom-webapp-saas';

interface ProjectTier {
  id: ProjectTierId;
  label: string;
  badge?: string;
  badgeTone?: 'cyan' | 'violet' | 'pink';
  subtitle: string;
  inrMin: number;
  inrMax: number;
  plusSuffix?: boolean;
  standardDelivery: string;
  expressDelivery: string;
}

type AddonId =
  | 'whatsapp-web-support'
  | 'rag-knowledge-qa'
  | 'seo-competitor-intel'
  | 'hr-recruitment-onboarding'
  | 'sales-closer-qualification'
  | 'ai-voice-receptionist'
  | 'backoffice-billing-automation'
  | 'autonomous-ecommerce'
  | 'multi-agent-command-center';

interface AiAgentAddon {
  id: AddonId;
  label: string;
  inrMin: number;
  inrMax: number;
  plusSuffix?: boolean;
}

const PROJECT_TIERS: ProjectTier[] = [
  {
    id: 'landing-starter',
    label: 'Landing Page / Starter Site',
    subtitle:
      'Fast, mobile-first single-page or 5-page site engineered for lead capture, instant WhatsApp CTA, and strong first impressions',
    inrMin: 15000,
    inrMax: 35000,
    standardDelivery: '3–5 Days',
    expressDelivery: '2–3 Days',
  },
  {
    id: 'booking-service',
    label: 'Booking & Service Website',
    badge: 'Most Popular',
    badgeTone: 'cyan',
    subtitle:
      'Built-in appointment scheduling, interactive service menus, project galleries, and automated WhatsApp/email booking confirmations',
    inrMin: 40000,
    inrMax: 150000,
    standardDelivery: '7–12 Days',
    expressDelivery: '4–7 Days',
  },
  {
    id: 'luxury-corporate',
    label: 'Custom Luxury / Corporate Website',
    subtitle:
      'Bespoke high-end UI/UX, multi-page brand architecture, fluid animations, technical SEO setup, and ultra-fast cloud deployment',
    inrMin: 50000,
    inrMax: 200000,
    standardDelivery: '1–2 Weeks',
    expressDelivery: '5–8 Days',
  },
  {
    id: 'ecommerce-store',
    label: 'E-Commerce & Online Store',
    badge: 'D2C & Retail',
    badgeTone: 'violet',
    subtitle:
      'Complete online storefront with product catalogs, cart & checkout, UPI/card payment gateway integration, order tracking, and admin inventory control',
    inrMin: 60000,
    inrMax: 400000,
    plusSuffix: true,
    standardDelivery: '2–3 Weeks',
    expressDelivery: '10–14 Days',
  },
  {
    id: 'custom-webapp-saas',
    label: 'Custom Web App / SaaS Portal',
    badge: 'ENTERPRISE CUSTOM',
    badgeTone: 'pink',
    subtitle:
      'Full-stack web applications with secure user login, interactive dashboards, databases, custom API integrations, and proprietary business workflows',
    inrMin: 250000,
    inrMax: 600000,
    plusSuffix: true,
    standardDelivery: '4–8 Weeks',
    expressDelivery: '3–5 Weeks',
  },
];

const AI_AGENT_ADDONS: AiAgentAddon[] = [
  {
    id: 'whatsapp-web-support',
    label: '24/7 WhatsApp & Web Support Agent',
    inrMin: 25000,
    inrMax: 85000,
  },
  {
    id: 'rag-knowledge-qa',
    label: 'RAG Knowledge & Document Q&A Agent',
    inrMin: 45000,
    inrMax: 150000,
  },
  {
    id: 'seo-competitor-intel',
    label: 'SEO & Competitor Intel Agent',
    inrMin: 60000,
    inrMax: 180000,
  },
  {
    id: 'hr-recruitment-onboarding',
    label: 'HR, Recruitment & Onboarding Agent',
    inrMin: 75000,
    inrMax: 200000,
  },
  {
    id: 'sales-closer-qualification',
    label: 'Sales Closer & Lead Qualification Agent',
    inrMin: 85000,
    inrMax: 180000,
  },
  {
    id: 'ai-voice-receptionist',
    label: 'AI Voice Receptionist Agent',
    inrMin: 90000,
    inrMax: 250000,
  },
  {
    id: 'backoffice-billing-automation',
    label: 'Back-Office & Billing Automation Agent',
    inrMin: 100000,
    inrMax: 350000,
  },
  {
    id: 'autonomous-ecommerce',
    label: 'Autonomous E-Commerce & Transactional Agent',
    inrMin: 150000,
    inrMax: 400000,
  },
  {
    id: 'multi-agent-command-center',
    label: 'Custom Multi-Agent Command Center',
    inrMin: 500000,
    inrMax: 1500000,
    plusSuffix: true,
  },
];

const DELIVERY_SPEEDS: {
  id: DeliverySpeedId;
  label: string;
  multiplier: number;
  tag: string;
  detail: string;
}[] = [
  {
    id: 'standard',
    label: 'Standard Timeline',
    multiplier: 1,
    tag: 'Included',
    detail: 'Balanced milestone delivery with full QA & launch verification',
  },
  {
    id: 'priority',
    label: 'Priority Express',
    multiplier: 1.25,
    tag: '+25% Rush',
    detail: 'Dedicated priority sprint with shortened commercial turnaround',
  },
];

function roundInr(amount: number): number {
  return Math.round(amount / 1000) * 1000;
}

export function ProjectEstimator() {
  const [selectedTierId, setSelectedTierId] =
    useState<ProjectTierId>('booking-service');
  const [selectedAddonIds, setSelectedAddonIds] = useState<AddonId[]>([]);
  const [deliverySpeedId, setDeliverySpeedId] =
    useState<DeliverySpeedId>('standard');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const selectedTier =
    PROJECT_TIERS.find((t) => t.id === selectedTierId) ?? PROJECT_TIERS[0];
  const selectedSpeed =
    DELIVERY_SPEEDS.find((s) => s.id === deliverySpeedId) ?? DELIVERY_SPEEDS[0];

  const toggleAddon = (addonId: AddonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  const activeAddons = useMemo(
    () =>
      AI_AGENT_ADDONS.filter((addon) => selectedAddonIds.includes(addon.id)),
    [selectedAddonIds],
  );

  const {
    totalMin,
    totalMax,
    depositMin,
    depositMax,
    hasPlusSuffix,
    targetDeliveryText,
  } = useMemo(() => {
    const addonsMin = activeAddons.reduce((sum, a) => sum + a.inrMin, 0);
    const addonsMax = activeAddons.reduce((sum, a) => sum + a.inrMax, 0);

    const rawMin = (selectedTier.inrMin + addonsMin) * selectedSpeed.multiplier;
    const rawMax = (selectedTier.inrMax + addonsMax) * selectedSpeed.multiplier;

    const computedMin =
      selectedSpeed.id === 'priority' ? roundInr(rawMin) : Math.round(rawMin);
    const computedMax =
      selectedSpeed.id === 'priority' ? roundInr(rawMax) : Math.round(rawMax);

    const computedDepositMin = roundInr(computedMin * 0.5);
    const computedDepositMax = roundInr(computedMax * 0.5);

    const plus =
      Boolean(selectedTier.plusSuffix) ||
      activeAddons.some((addon) => Boolean(addon.plusSuffix));

    return {
      totalMin: computedMin,
      totalMax: computedMax,
      depositMin: computedDepositMin,
      depositMax: computedDepositMax,
      hasPlusSuffix: plus,
      targetDeliveryText:
        selectedSpeed.id === 'priority'
          ? `${selectedTier.expressDelivery} (Express)`
          : selectedTier.standardDelivery,
    };
  }, [selectedTier, activeAddons, selectedSpeed]);

  const isEnterpriseTier = selectedTier.id === 'custom-webapp-saas';
  const formattedTotalRange = formatCurrencyRange(
    totalMin,
    totalMax,
    'INR',
    hasPlusSuffix,
  );
  const formattedDepositRange = formatCurrencyRange(
    depositMin,
    depositMax,
    'INR',
    hasPlusSuffix,
  );

  const selectedFeaturesSummary = useMemo(() => {
    if (activeAddons.length === 0) return 'Core Website Scope Only';
    return activeAddons.map((a) => a.label).join(', ');
  }, [activeAddons]);

  const briefText = useMemo(() => {
    return [
      'Hi Tarak, here is my project brief from S.TARAK AI Labs:',
      `• Project Type: ${selectedTier.label}`,
      `• Optional AI Agent Add-Ons: ${selectedFeaturesSummary}`,
      `• Delivery Speed: ${selectedSpeed.label} (${targetDeliveryText})`,
      `• Estimated Investment (INR): ${formattedTotalRange}`,
      `• 50% Deposit to Start (INR): ${formattedDepositRange}`,
      '• Ready for a quick 15-min call to lock exact scope and kick off.',
    ].join('\n');
  }, [
    selectedTier.label,
    selectedFeaturesSummary,
    selectedSpeed.label,
    targetDeliveryText,
    formattedTotalRange,
    formattedDepositRange,
  ]);

  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    briefText,
  )}`;

  const enterpriseWhatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hi Tarak, I'm looking to scope a custom AI or enterprise SaaS architecture (INR) and would love to discuss requirements.`,
  )}`;

  const handleCopyBrief = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(briefText);
      } else {
        const temp = document.createElement('textarea');
        temp.value = briefText;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      setShowCopiedToast(true);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setShowCopiedToast(false);
      }, 2400);
    } catch {
      setShowCopiedToast(false);
    }
  };

  return (
    <section
      id="estimator"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle Slow-Breathing Ambient Aura Behind Estimator */}
      <div
        aria-hidden="true"
        className="section-ambient-aura pointer-events-none absolute top-28 left-1/2 -z-10 h-[460px] w-[min(92vw,920px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.075)_0%,rgba(139,92,246,0.07)_48%,transparent_76%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Clean Header */}
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
              Transparent Build Configurator
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl">
              Instant Project Estimator
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              Configure your website package and optional autonomous AI agents
              to calculate a unified, transparent INR ballpark estimate in
              seconds.
            </p>
          </div>

          {/* Zero-Clipping Responsive 3-Step Indicator Bar */}
          <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-[#070B16]/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:flex sm:items-center sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5">
            <div className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#00F0FF]/[0.1] px-2 py-1.5 text-center text-[11px] font-semibold text-[#00F0FF] sm:justify-start sm:bg-transparent sm:p-0 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="truncate sm:hidden">1. Website</span>
              <span className="hidden sm:inline">1. Select Project Type</span>
            </div>

            <span
              aria-hidden="true"
              className="hidden shrink-0 text-slate-600 sm:inline"
            >
              ·
            </span>

            <div className="flex min-w-0 items-center justify-center rounded-xl bg-white/[0.03] px-2 py-1.5 text-center text-[11px] font-semibold text-slate-200 sm:justify-start sm:bg-transparent sm:p-0 sm:text-xs">
              <span className="truncate sm:hidden">2. AI Agents</span>
              <span className="hidden sm:inline">2. AI Agent Add-Ons</span>
            </div>

            <span
              aria-hidden="true"
              className="hidden shrink-0 text-slate-600 sm:inline"
            >
              ·
            </span>

            <div className="flex min-w-0 items-center justify-center rounded-xl bg-white/[0.03] px-2 py-1.5 text-center text-[11px] font-semibold text-slate-200 sm:justify-start sm:bg-transparent sm:p-0 sm:text-xs">
              <span className="truncate sm:hidden">3. Speed</span>
              <span className="hidden sm:inline">3. Delivery &amp; Brief</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left 7 Columns: Unified Website Tiers, Optional AI Agent Add-Ons & Delivery Speed */}
            <SpotlightCard
              accent="cyan"
              className="min-w-0 rounded-3xl p-5 sm:p-7 lg:col-span-7"
            >
              {/* STEP 1: Select Project Type */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
                    <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Step 1 · Select Project Type</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    5 Unified Website Tiers
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  {PROJECT_TIERS.map((tier) => {
                    const isSelected = tier.id === selectedTier.id;
                    const tierRange = formatCurrencyRange(
                      tier.inrMin,
                      tier.inrMax,
                      'INR',
                      Boolean(tier.plusSuffix),
                    );

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTierId(tier.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[48px] w-full min-w-0 flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isSelected
                            ? 'border-[#38BDF8]/60 bg-gradient-to-br from-[#00F0FF]/[0.11] via-[#3B82F6]/[0.07] to-[#8B5CF6]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_32px_-12px_rgba(0,240,255,0.34)]'
                            : 'border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#818CF8]/35 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            {tier.badge && (
                              <span
                                className={`mb-1.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase ${
                                  tier.badgeTone === 'pink'
                                    ? 'border-[#EC4899]/45 bg-[#EC4899]/14 text-[#F472B6]'
                                    : tier.badgeTone === 'violet'
                                      ? 'border-violet-400/45 bg-violet-500/15 text-violet-300'
                                      : 'border-[#00F0FF]/45 bg-[#00F0FF]/12 text-[#00F0FF]'
                                }`}
                              >
                                {tier.badge}
                              </span>
                            )}
                            <div className="text-base font-semibold leading-snug text-white sm:text-lg">
                              {tier.label}
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                              {tier.subtitle}
                            </p>
                          </div>

                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              isSelected
                                ? 'border-[#00F0FF] bg-[#00F0FF] text-[#04060C] shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                                : 'border-white/20 bg-transparent'
                            }`}
                          >
                            {isSelected && (
                              <Check
                                className="h-3 w-3 stroke-[3]"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>

                        <div className="mt-3.5 flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/[0.07] pt-3 tabular-nums">
                          <span className="text-base font-bold text-white sm:text-lg">
                            {tierRange}
                          </span>
                          <span className="text-xs font-medium text-slate-400 sm:text-sm">
                            {deliverySpeedId === 'priority'
                              ? `${tier.expressDelivery} (Express)`
                              : tier.standardDelivery}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Optional AI Agent Add-Ons (Matched to Non-Video AI Agents Pricing Grid) */}
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#818CF8] uppercase sm:text-xs">
                    <Sliders className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Step 2 · Optional AI Agent Add-Ons</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 tabular-nums">
                    {activeAddons.length} selected
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {AI_AGENT_ADDONS.map((addon) => {
                    const enabled = selectedAddonIds.includes(addon.id);
                    const priceRange = formatCurrencyRange(
                      addon.inrMin,
                      addon.inrMax,
                      'INR',
                      Boolean(addon.plusSuffix),
                    );

                    return (
                      <button
                        key={addon.id}
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          enabled
                            ? 'border-[#38BDF8]/50 bg-gradient-to-r from-[#00F0FF]/[0.09] to-[#8B5CF6]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_24px_-12px_rgba(0,240,255,0.3)]'
                            : 'border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold leading-snug text-white sm:text-[15px]">
                            {addon.label}
                          </div>
                          <div className="mt-1 text-xs font-semibold tabular-nums sm:text-sm">
                            <span className="text-[#7DD3FC]">
                              +{priceRange}
                            </span>
                          </div>
                        </div>

                        {/* Uniform Smooth Toggle Switch */}
                        <span
                          aria-hidden="true"
                          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-all duration-200 ${
                            enabled
                              ? 'border-[#00F0FF]/65 bg-gradient-to-r from-[#00F0FF] to-[#818CF8] shadow-[0_0_14px_rgba(0,240,255,0.45)]'
                              : 'border-white/15 bg-[#050814]'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full shadow-sm transition-transform duration-200 ${
                              enabled
                                ? 'translate-x-[22px] bg-[#04060C]'
                                : 'translate-x-[3px] bg-slate-400'
                            }`}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Delivery Speed */}
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Step 3 · Delivery Speed</span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {DELIVERY_SPEEDS.map((speed) => {
                    const isSelected = speed.id === selectedSpeed.id;
                    const etaPreview =
                      speed.id === 'priority'
                        ? selectedTier.expressDelivery
                        : selectedTier.standardDelivery;

                    return (
                      <button
                        key={speed.id}
                        type="button"
                        onClick={() => setDeliverySpeedId(speed.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[48px] min-w-0 flex-col items-start rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isSelected
                            ? 'border-[#38BDF8]/60 bg-gradient-to-br from-[#00F0FF]/[0.11] to-[#8B5CF6]/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_26px_-10px_rgba(0,240,255,0.28)]'
                            : 'border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-base font-semibold text-white">
                            {speed.id === 'priority' && (
                              <Zap
                                className="h-3.5 w-3.5 text-[#00F0FF]"
                                aria-hidden="true"
                              />
                            )}
                            <span>{speed.label}</span>
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap ${
                              speed.id === 'priority'
                                ? 'border-[#00F0FF]/40 bg-[#00F0FF]/12 text-[#00F0FF]'
                                : 'border-white/15 bg-white/[0.04] text-slate-300'
                            }`}
                          >
                            {speed.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                          {speed.detail}
                        </p>
                        <span className="mt-2 text-xs font-semibold text-[#7DD3FC] tabular-nums">
                          Est. Timeline: {etaPreview}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>

            {/* Right 5 Columns: 100% Reactive Live Estimate Summary */}
            <SpotlightCard
              accent="blue"
              className="min-w-0 rounded-3xl p-5 sm:p-7 lg:col-span-5 lg:sticky lg:top-24"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2">
                  <Sparkles
                    className="h-4 w-4 text-[#00F0FF]"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-slate-200 uppercase sm:text-xs">
                    Live Estimate Summary
                  </span>
                </div>

                {isEnterpriseTier && (
                  <span className="inline-flex items-center rounded-full border border-[#EC4899]/40 bg-[#EC4899]/12 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-[#F9A8D4] uppercase">
                    Custom Architecture Scope
                  </span>
                )}
              </div>

              {/* Dynamic Ballpark Investment Box */}
              <div className="mt-5 rounded-2xl border border-[#38BDF8]/28 bg-[#040712]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_34px_-16px_rgba(0,240,255,0.22)]">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
                  Estimated Investment (INR)
                </div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight text-white tabular-nums sm:text-3xl sm:leading-tight">
                  {formattedTotalRange}
                </div>
                <div className="mt-3 border-t border-white/[0.08] pt-3 text-xs font-medium leading-relaxed text-slate-200 tabular-nums sm:text-sm">
                  50% deposit to start{' '}
                  <span className="whitespace-nowrap font-bold text-[#7DD3FC]">
                    ({formattedDepositRange})
                  </span>{' '}
                  · 50% at launch.
                </div>
                <p className="mt-3 border-t border-white/[0.06] pt-3 text-xs leading-relaxed text-slate-400">
                  Note: Custom domains, third-party payment fees, cloud scaling,
                  and ongoing AI API token usage are billed directly to the
                  client&apos;s account. Monthly support retainers available.
                </p>
              </div>

              {/* Ownership & Scope Protection Box */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#070D1D]/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]"
                    aria-hidden="true"
                  />
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                    <span className="font-semibold text-white">
                      100% Source-Code Ownership &amp; Production Launch
                      Included
                    </span>{' '}
                    — Final fixed milestone quote is locked after a free 15-min
                    architecture call.
                  </p>
                </div>
              </div>

              {/* Reactive Summary Breakdown */}
              <div className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-400">Project Type</span>
                  <span className="text-right font-semibold text-white">
                    {selectedTier.label}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-400">
                    AI Agent Add-Ons
                  </span>
                  <span className="text-right font-medium text-slate-200">
                    {selectedFeaturesSummary}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="shrink-0 text-slate-400">
                    Target Delivery
                  </span>
                  <span className="text-right font-semibold text-[#00F0FF] tabular-nums">
                    {targetDeliveryText}
                  </span>
                </div>
              </div>

              {/* Conversion Actions + Toast */}
              <div className="relative mt-6 flex flex-col gap-3 border-t border-white/[0.08] pt-5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] px-6 py-3 text-sm font-bold text-[#04060C] shadow-[0_0_28px_rgba(0,240,255,0.32),0_0_44px_-16px_rgba(139,92,246,0.34)] transition-all duration-200 hover:brightness-110 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send Brief on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-150 hover:border-[#00F0FF]/45 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  {showCopiedToast ? (
                    <>
                      <Check
                        className="h-4 w-4 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy
                        className="h-4 w-4 text-[#00F0FF]"
                        aria-hidden="true"
                      />
                      <span>Copy Project Brief</span>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {showCopiedToast && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-center gap-1.5 rounded-2xl border border-emerald-400/35 bg-emerald-400/12 px-3 py-2 text-xs font-semibold text-emerald-200"
                    >
                      <Check
                        className="h-3.5 w-3.5 text-emerald-300"
                        aria-hidden="true"
                      />
                      <span>Copied! Project brief ready to paste.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="pt-1 text-center text-xs leading-relaxed text-slate-400">
                  Need a custom multi-tenant AI or SaaS architecture?{' '}
                  <a
                    href={enterpriseWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#00F0FF] underline decoration-[#00F0FF]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                  >
                    Tap WhatsApp to scope it directly.
                  </a>
                </p>
              </div>
            </SpotlightCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
