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
import { useCurrency, type CurrencyCode } from '../context/CurrencyContext';
import { CONTACT_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

type DeliverySpeedId = 'standard' | 'priority';

type ProjectTierId =
  | 'standard-website'
  | 'dynamic-website'
  | 'super-features-platform'
  | 'custom-ai-assistant'
  | 'fullstack-saas-ecosystem';

type ProjectGroupId = 'signature-websites' | 'flagship-ai-platforms';

interface ProjectTier {
  id: ProjectTierId;
  group: ProjectGroupId;
  label: string;
  badge?: string;
  badgeTone?: 'cyan' | 'violet' | 'pink';
  subtitle: string;
  inrMin: number;
  inrMax: number;
  usdMin: number;
  usdMax: number;
  plusSuffix?: boolean;
  standardDelivery: string;
  expressDelivery: string;
}

type AddonId =
  | 'ai-whatsapp-agent'
  | 'interactive-3d-hero'
  | 'payment-gateway'
  | 'admin-analytics-dashboard'
  | 'voice-llm-api'
  | 'extra-pages-seo-cms';

interface PowerUpAddon {
  id: AddonId;
  label: string;
  inrMin: number;
  inrMax: number;
  usdMin: number;
  usdMax: number;
  includedInTiers?: ProjectTierId[];
}

const PROJECT_GROUPS: { id: ProjectGroupId; title: string; note: string }[] = [
  {
    id: 'signature-websites',
    title: 'Signature Websites',
    note: 'High-converting sites, stores & 3D platforms',
  },
  {
    id: 'flagship-ai-platforms',
    title: 'Flagship AI & Custom Platforms',
    note: 'Autonomous AI agents & full-stack ecosystems',
  },
];

const PROJECT_TIERS: ProjectTier[] = [
  {
    id: 'standard-website',
    group: 'signature-websites',
    label: 'Standard Website (Studio / Business / Portfolio)',
    subtitle:
      'Bespoke mobile-first design, interactive galleries, WhatsApp capture & Cloudflare edge speed',
    inrMin: 7999,
    inrMax: 14999,
    usdMin: 199,
    usdMax: 349,
    standardDelivery: '3–5 Days',
    expressDelivery: '2–3 Days',
  },
  {
    id: 'dynamic-website',
    group: 'signature-websites',
    label: 'Dynamic Website (E-Commerce / Booking + Admin)',
    badge: 'Most Popular',
    badgeTone: 'cyan',
    subtitle:
      'Full shopping cart or live slot booking, promo engine, customer workflows & synced Admin panel',
    inrMin: 16999,
    inrMax: 34999,
    usdMin: 449,
    usdMax: 899,
    standardDelivery: '7–12 Days',
    expressDelivery: '4–7 Days',
  },
  {
    id: 'super-features-platform',
    group: 'signature-websites',
    label: 'Super Features Platform (Interactive 3D / SaaS UI / Analytics)',
    subtitle:
      'Interactive Three.js 3D hero, live ROI calculators, telemetry dashboards & zero-key edge APIs',
    inrMin: 32999,
    inrMax: 69999,
    usdMin: 899,
    usdMax: 1799,
    standardDelivery: '2–3 Weeks',
    expressDelivery: '8–12 Days',
  },
  {
    id: 'custom-ai-assistant',
    group: 'flagship-ai-platforms',
    label: 'Custom AI Assistant / Voice Agent (Jarvis / John-class Automation)',
    badge: 'HIGH-TICKET AI',
    badgeTone: 'violet',
    subtitle:
      'Autonomous tool-calling AI assistant, WhatsApp / voice workflows, CRM hooks & safety guardrails',
    inrMin: 45000,
    inrMax: 125000,
    usdMin: 1200,
    usdMax: 3200,
    standardDelivery: '2–4 Weeks',
    expressDelivery: '10–18 Days',
  },
  {
    id: 'fullstack-saas-ecosystem',
    group: 'flagship-ai-platforms',
    label: 'Full-Stack SaaS / AI Ecosystem (Dark Stark SMM / Tarak Verse AI-class)',
    badge: 'ENTERPRISE CUSTOM',
    badgeTone: 'pink',
    subtitle:
      'End-to-end multi-user SaaS architecture, wallet/payment ledger, RBAC admin ops & AI pipelines',
    inrMin: 75000,
    inrMax: 250000,
    usdMin: 2000,
    usdMax: 6500,
    plusSuffix: true,
    standardDelivery: '4–8 Weeks',
    expressDelivery: '3–5 Weeks',
  },
];

const POWERUP_ADDONS: PowerUpAddon[] = [
  {
    id: 'ai-whatsapp-agent',
    label: 'AI Lead & WhatsApp Support Agent',
    inrMin: 8000,
    inrMax: 18000,
    usdMin: 250,
    usdMax: 550,
    includedInTiers: ['custom-ai-assistant', 'fullstack-saas-ecosystem'],
  },
  {
    id: 'interactive-3d-hero',
    label: 'Interactive 3D Hero / Product Experience',
    inrMin: 7000,
    inrMax: 15000,
    usdMin: 200,
    usdMax: 450,
    includedInTiers: ['super-features-platform'],
  },
  {
    id: 'payment-gateway',
    label: 'UPI / Razorpay / Stripe Payment Gateway + Ledger',
    inrMin: 6000,
    inrMax: 15000,
    usdMin: 180,
    usdMax: 450,
    includedInTiers: ['fullstack-saas-ecosystem'],
  },
  {
    id: 'admin-analytics-dashboard',
    label: 'Custom Admin, Auth & Analytics Dashboard',
    inrMin: 8000,
    inrMax: 20000,
    usdMin: 250,
    usdMax: 600,
    includedInTiers: ['fullstack-saas-ecosystem'],
  },
  {
    id: 'voice-llm-api',
    label: 'Voice AI / Multi-Model LLM API Integration',
    inrMin: 15000,
    inrMax: 35000,
    usdMin: 450,
    usdMax: 1000,
  },
  {
    id: 'extra-pages-seo-cms',
    label: 'Extra Pages / CMS / SEO Launch Pack',
    inrMin: 4000,
    inrMax: 9000,
    usdMin: 120,
    usdMax: 280,
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

function roundForCurrency(amount: number, currency: CurrencyCode): number {
  const step = currency === 'INR' ? 500 : 10;
  return Math.round(amount / step) * step;
}

export function ProjectEstimator() {
  const { currency, formatRange } = useCurrency();

  const [selectedTierId, setSelectedTierId] =
    useState<ProjectTierId>('dynamic-website');
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

  const isAddonIncluded = (addon: PowerUpAddon, tierId: ProjectTierId) =>
    Boolean(addon.includedInTiers?.includes(tierId));

  const handleSelectTier = (tierId: ProjectTierId) => {
    setSelectedTierId(tierId);
    setSelectedAddonIds((prev) =>
      prev.filter((addonId) => {
        const addon = POWERUP_ADDONS.find((a) => a.id === addonId);
        return addon ? !isAddonIncluded(addon, tierId) : false;
      }),
    );
  };

  const toggleAddon = (addon: PowerUpAddon) => {
    if (isAddonIncluded(addon, selectedTier.id)) return;
    setSelectedAddonIds((prev) =>
      prev.includes(addon.id)
        ? prev.filter((id) => id !== addon.id)
        : [...prev, addon.id],
    );
  };

  const includedAddons = useMemo(
    () =>
      POWERUP_ADDONS.filter((addon) => isAddonIncluded(addon, selectedTier.id)),
    [selectedTier.id],
  );

  const activePaidAddons = useMemo(
    () =>
      POWERUP_ADDONS.filter(
        (addon) =>
          selectedAddonIds.includes(addon.id) &&
          !isAddonIncluded(addon, selectedTier.id),
      ),
    [selectedAddonIds, selectedTier.id],
  );

  const { totalMin, totalMax, depositMin, depositMax, targetDeliveryText } =
    useMemo(() => {
      const baseMin =
        currency === 'INR' ? selectedTier.inrMin : selectedTier.usdMin;
      const baseMax =
        currency === 'INR' ? selectedTier.inrMax : selectedTier.usdMax;

      const addonsMin = activePaidAddons.reduce(
        (sum, a) => sum + (currency === 'INR' ? a.inrMin : a.usdMin),
        0,
      );
      const addonsMax = activePaidAddons.reduce(
        (sum, a) => sum + (currency === 'INR' ? a.inrMax : a.usdMax),
        0,
      );

      const rawMin = (baseMin + addonsMin) * selectedSpeed.multiplier;
      const rawMax = (baseMax + addonsMax) * selectedSpeed.multiplier;

      const computedMin =
        selectedSpeed.id === 'priority'
          ? roundForCurrency(rawMin, currency)
          : Math.round(rawMin);
      const computedMax =
        selectedSpeed.id === 'priority'
          ? roundForCurrency(rawMax, currency)
          : Math.round(rawMax);

      const computedDepositMin = roundForCurrency(computedMin * 0.5, currency);
      const computedDepositMax = roundForCurrency(computedMax * 0.5, currency);

      return {
        totalMin: computedMin,
        totalMax: computedMax,
        depositMin: computedDepositMin,
        depositMax: computedDepositMax,
        targetDeliveryText:
          selectedSpeed.id === 'priority'
            ? `${selectedTier.expressDelivery} (Express)`
            : selectedTier.standardDelivery,
      };
    }, [currency, selectedTier, activePaidAddons, selectedSpeed]);

  const isEnterpriseTier = selectedTier.id === 'fullstack-saas-ecosystem';
  const formattedTotalRange = formatRange(
    totalMin,
    totalMax,
    Boolean(selectedTier.plusSuffix),
  );
  const formattedDepositRange = formatRange(
    depositMin,
    depositMax,
    Boolean(selectedTier.plusSuffix),
  );

  const selectedFeaturesSummary = useMemo(() => {
    const parts: string[] = [];
    if (includedAddons.length > 0) {
      parts.push(...includedAddons.map((a) => `${a.label} (Included)`));
    }
    if (activePaidAddons.length > 0) {
      parts.push(...activePaidAddons.map((a) => a.label));
    }
    return parts.length > 0 ? parts.join(', ') : 'Core Tier Scope Only';
  }, [includedAddons, activePaidAddons]);

  const briefText = useMemo(() => {
    return [
      'Hi Tarak, here is my project brief from your portfolio:',
      `• Project Type: ${selectedTier.label}`,
      `• Add-On Power-Ups: ${selectedFeaturesSummary}`,
      `• Delivery Speed: ${selectedSpeed.label} (${targetDeliveryText})`,
      `• Estimated Investment (${currency}): ${formattedTotalRange}`,
      `• 50% Deposit to Start (${currency}): ${formattedDepositRange}`,
      '• Ready for a quick 15-min call to lock exact scope and kick off.',
    ].join('\n');
  }, [
    selectedTier.label,
    selectedFeaturesSummary,
    selectedSpeed.label,
    targetDeliveryText,
    currency,
    formattedTotalRange,
    formattedDepositRange,
  ]);

  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    briefText,
  )}`;

  const enterpriseWhatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hi Tarak, I'm looking to scope a custom AI or enterprise SaaS architecture (${currency}) and would love to discuss requirements.`,
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
          {/* Clean Header — Zero Manual Currency Toggle */}
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
              Transparent Build Configurator
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl">
              Instant Project Estimator
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              Configure signature websites, autonomous AI agents, or full-stack
              SaaS platforms and get a real-time ballpark estimate in seconds.
            </p>
          </div>

          {/* Zero-Clipping Responsive 3-Step Indicator Bar */}
          <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-[#070B16]/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:flex sm:items-center sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5">
            <div className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#00F0FF]/[0.1] px-2 py-1.5 text-center text-[11px] font-semibold text-[#00F0FF] sm:justify-start sm:bg-transparent sm:p-0 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="truncate sm:hidden">1. Tier</span>
              <span className="hidden sm:inline">1. Select Project Type</span>
            </div>

            <span
              aria-hidden="true"
              className="hidden shrink-0 text-slate-600 sm:inline"
            >
              ·
            </span>

            <div className="flex min-w-0 items-center justify-center rounded-xl bg-white/[0.03] px-2 py-1.5 text-center text-[11px] font-semibold text-slate-200 sm:justify-start sm:bg-transparent sm:p-0 sm:text-xs">
              <span className="truncate sm:hidden">2. Add-Ons</span>
              <span className="hidden sm:inline">2. Power-Ups</span>
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
            {/* Left 7 Columns: Grouped Project Types, Uniform Toggle Power-Ups & Delivery Speed */}
            <SpotlightCard
              accent="cyan"
              className="min-w-0 rounded-3xl p-5 sm:p-7 lg:col-span-7"
            >
              {/* STEP 1: Select Project Type (Grouped) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
                    <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Step 1 · Select Project Type</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    5 Core Tiers
                  </span>
                </div>

                <div className="mt-4 space-y-5">
                  {PROJECT_GROUPS.map((group) => {
                    const groupTiers = PROJECT_TIERS.filter(
                      (t) => t.group === group.id,
                    );
                    return (
                      <div key={group.id}>
                        <div className="mb-2.5 flex items-center justify-between gap-2">
                          <h3 className="text-[11px] font-semibold tracking-[0.14em] text-slate-300 uppercase sm:text-xs">
                            {group.title}
                          </h3>
                          <span className="hidden text-xs text-slate-500 sm:inline">
                            {group.note}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {groupTiers.map((tier) => {
                            const isSelected = tier.id === selectedTier.id;
                            const tierRange = formatRange(
                              currency === 'INR' ? tier.inrMin : tier.usdMin,
                              currency === 'INR' ? tier.inrMax : tier.usdMax,
                              Boolean(tier.plusSuffix),
                            );

                            return (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => handleSelectTier(tier.id)}
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
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Add-On Power-Ups (100% Uniform Smooth Toggle-Switch Component) */}
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#818CF8] uppercase sm:text-xs">
                    <Sliders className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Step 2 · Add-On Power-Ups</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 tabular-nums">
                    {activePaidAddons.length} optional · {includedAddons.length}{' '}
                    included
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {POWERUP_ADDONS.map((addon) => {
                    const included = isAddonIncluded(addon, selectedTier.id);
                    const enabled =
                      included || selectedAddonIds.includes(addon.id);
                    const priceRange = formatRange(
                      currency === 'INR' ? addon.inrMin : addon.usdMin,
                      currency === 'INR' ? addon.inrMax : addon.usdMax,
                    );

                    return (
                      <button
                        key={addon.id}
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-disabled={included}
                        disabled={included}
                        onClick={() => toggleAddon(addon)}
                        className={`flex min-h-[60px] w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          included
                            ? 'cursor-not-allowed border-emerald-400/30 bg-emerald-400/[0.06]'
                            : enabled
                              ? 'cursor-pointer border-[#38BDF8]/50 bg-gradient-to-r from-[#00F0FF]/[0.09] to-[#8B5CF6]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_24px_-12px_rgba(0,240,255,0.3)]'
                              : 'cursor-pointer border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold leading-snug text-white sm:text-[15px]">
                              {addon.label}
                            </span>
                            {included && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/45 bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] text-emerald-300 uppercase">
                                <Check
                                  className="h-3 w-3 stroke-[2.75]"
                                  aria-hidden="true"
                                />
                                <span>INCLUDED</span>
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-xs font-semibold tabular-nums sm:text-sm">
                            {included ? (
                              <span className="text-emerald-300/90">
                                Built into your selected tier at no extra cost
                              </span>
                            ) : (
                              <span className="text-[#7DD3FC]">
                                +{priceRange}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Uniform Smooth Toggle Switch for EVERY Add-On */}
                        <span
                          aria-hidden="true"
                          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-all duration-200 ${
                            included
                              ? 'border-emerald-400/50 bg-emerald-400/30'
                              : enabled
                                ? 'border-[#00F0FF]/65 bg-gradient-to-r from-[#00F0FF] to-[#818CF8] shadow-[0_0_14px_rgba(0,240,255,0.45)]'
                                : 'border-white/15 bg-[#050814]'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full shadow-sm transition-transform duration-200 ${
                              included
                                ? 'translate-x-[22px] bg-emerald-300'
                                : enabled
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
                  Estimated Investment ({currency})
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
                    Selected Features
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
