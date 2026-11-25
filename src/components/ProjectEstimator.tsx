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
import { CONTACT_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

type Currency = 'INR' | 'USD';
type DeliverySpeedId = 'standard' | 'priority';

interface ProjectTier {
  id:
    | 'business-website'
    | 'interactive-3d-showcase'
    | 'custom-ai-agent'
    | 'fullstack-web-app'
    | 'mobile-app';
  label: string;
  badge?: string;
  badgeTone?: 'emerald' | 'cyan';
  subtitle: string;
  inrMin: number;
  inrMax: number;
  usdMin: number;
  usdMax: number;
  standardDelivery: string;
}

interface ModularAddon {
  id: 'ai-chatbot' | '3d-viewer' | 'payment-gateway' | 'admin-dashboard';
  inrLabel: string;
  usdLabel: string;
  inrMin: number;
  inrMax: number;
  usdMin: number;
  usdMax: number;
  includedInTierId?: ProjectTier['id'];
}

const PROJECT_TIERS: ProjectTier[] = [
  {
    id: 'business-website',
    label: 'Business & Brand Website',
    badge: 'Best Value',
    badgeTone: 'emerald',
    subtitle:
      'High-converting custom website, mobile-first UI/UX, SEO foundation & lead capture',
    inrMin: 25000,
    inrMax: 45000,
    usdMin: 800,
    usdMax: 1500,
    standardDelivery: '1 – 2 Weeks',
  },
  {
    id: 'interactive-3d-showcase',
    label: 'Interactive 3D Brand Showcase',
    badge: 'Most Popular',
    badgeTone: 'cyan',
    subtitle:
      'Custom Three.js 360° product stage & smooth 60fps mobile showcase that stands out',
    inrMin: 40000,
    inrMax: 75000,
    usdMin: 1500,
    usdMax: 2800,
    standardDelivery: '2 – 3 Weeks',
  },
  {
    id: 'custom-ai-agent',
    label: 'Custom AI Agent & Automation',
    subtitle:
      'Autonomous tool-calling AI workflows, WhatsApp/CRM automation, backend & guardrails',
    inrMin: 60000,
    inrMax: 150000,
    usdMin: 2500,
    usdMax: 6000,
    standardDelivery: '2 – 5 Weeks',
  },
  {
    id: 'fullstack-web-app',
    label: 'Full-Stack Web Application',
    subtitle:
      'Custom frontend, secure cloud backend, database, user auth, dashboards & APIs',
    inrMin: 75000,
    inrMax: 150000,
    usdMin: 3000,
    usdMax: 6500,
    standardDelivery: '3 – 6 Weeks',
  },
  {
    id: 'mobile-app',
    label: 'Mobile Application (Android / Cross-Platform)',
    subtitle:
      'Production mobile build, cloud sync, native features & Play Store-ready deployment',
    inrMin: 90000,
    inrMax: 180000,
    usdMin: 4000,
    usdMax: 8500,
    standardDelivery: '4 – 8 Weeks',
  },
];

const MODULAR_ADDONS: ModularAddon[] = [
  {
    id: 'ai-chatbot',
    inrLabel: 'AI Lead & FAQ Chatbot (Web Widget)',
    usdLabel: 'AI Lead & FAQ Chatbot (Web Widget)',
    inrMin: 25000,
    inrMax: 45000,
    usdMin: 750,
    usdMax: 1400,
    includedInTierId: 'custom-ai-agent',
  },
  {
    id: '3d-viewer',
    inrLabel: '3D Product Viewer (Three.js)',
    usdLabel: '3D Product Viewer (Three.js)',
    inrMin: 15000,
    inrMax: 25000,
    usdMin: 500,
    usdMax: 900,
    includedInTierId: 'interactive-3d-showcase',
  },
  {
    id: 'payment-gateway',
    inrLabel: 'UPI & Razorpay Checkout',
    usdLabel: 'Stripe & PayPal Checkout',
    inrMin: 15000,
    inrMax: 25000,
    usdMin: 500,
    usdMax: 900,
  },
  {
    id: 'admin-dashboard',
    inrLabel: 'Admin & Analytics Dashboard',
    usdLabel: 'Admin & Analytics Dashboard',
    inrMin: 20000,
    inrMax: 30000,
    usdMin: 700,
    usdMax: 1200,
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
    label: 'Standard',
    multiplier: 1,
    tag: 'Included',
    detail: 'Balanced milestone delivery with full QA & launch verification',
  },
  {
    id: 'priority',
    label: 'Priority Express',
    multiplier: 1.25,
    tag: '+25% Rush',
    detail: 'Dedicated express build sprint for tight commercial deadlines',
  },
];

function detectStealthCurrency(): Currency {
  try {
    const param = new URLSearchParams(window.location.search)
      .get('currency')
      ?.toLowerCase();
    if (param === 'usd') return 'USD';
    if (param === 'inr') return 'INR';
  } catch {
    // Ignore URL parsing errors and fall back to timezone detection
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' ? 'INR' : 'USD';
  } catch {
    return 'USD';
  }
}

function roundForCurrency(amount: number, currency: Currency): number {
  const step = currency === 'INR' ? 500 : 25;
  return Math.round(amount / step) * step;
}

function formatMoney(amount: number, currency: Currency): string {
  const rounded = Math.round(amount);
  if (currency === 'INR') {
    return `₹${rounded.toLocaleString('en-IN')}`;
  }
  return `$${rounded.toLocaleString('en-US')}`;
}

function formatMoneyRange(min: number, max: number, currency: Currency): string {
  return `${formatMoney(min, currency)} – ${formatMoney(max, currency)}`;
}

export function ProjectEstimator() {
  const [currency] = useState<Currency>(detectStealthCurrency);
  const [selectedTierId, setSelectedTierId] = useState<ProjectTier['id']>(
    'interactive-3d-showcase',
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<ModularAddon['id'][]>(
    [],
  );
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

  const handleSelectTier = (tierId: ProjectTier['id']) => {
    setSelectedTierId(tierId);
    // Guardrail: automatically uncheck any add-on already included in this tier
    setSelectedAddonIds((prev) =>
      prev.filter((addonId) => {
        const addon = MODULAR_ADDONS.find((a) => a.id === addonId);
        return addon?.includedInTierId !== tierId;
      }),
    );
  };

  const toggleAddon = (addon: ModularAddon) => {
    if (addon.includedInTierId === selectedTier.id) return;
    setSelectedAddonIds((prev) =>
      prev.includes(addon.id)
        ? prev.filter((id) => id !== addon.id)
        : [...prev, addon.id],
    );
  };

  const activeAddons = useMemo(
    () =>
      MODULAR_ADDONS.filter(
        (addon) =>
          selectedAddonIds.includes(addon.id) &&
          addon.includedInTierId !== selectedTier.id,
      ),
    [selectedAddonIds, selectedTier.id],
  );

  const { totalMin, totalMax, depositMin, depositMax, targetDeliveryText } =
    useMemo(() => {
      const baseMin =
        currency === 'INR' ? selectedTier.inrMin : selectedTier.usdMin;
      const baseMax =
        currency === 'INR' ? selectedTier.inrMax : selectedTier.usdMax;

      const addonsMin = activeAddons.reduce(
        (sum, a) => sum + (currency === 'INR' ? a.inrMin : a.usdMin),
        0,
      );
      const addonsMax = activeAddons.reduce(
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
            ? 'Priority Express'
            : selectedTier.standardDelivery,
      };
    }, [currency, selectedTier, activeAddons, selectedSpeed]);

  const formattedTotalRange = formatMoneyRange(totalMin, totalMax, currency);
  const formattedDepositRange = formatMoneyRange(
    depositMin,
    depositMax,
    currency,
  );

  const localizedAddonLabels = useMemo(
    () =>
      activeAddons.map((addon) =>
        currency === 'INR' ? addon.inrLabel : addon.usdLabel,
      ),
    [activeAddons, currency],
  );

  const addonsSummaryText =
    localizedAddonLabels.length > 0
      ? localizedAddonLabels.join(', ')
      : 'Core Tier Only';

  const briefText = useMemo(() => {
    return [
      'Hi Tarak, here is my project brief from your portfolio:',
      `• Project Type: ${selectedTier.label}`,
      `• Add-Ons: ${addonsSummaryText}`,
      `• Delivery Speed: ${selectedSpeed.label}`,
      `• Estimated Ballpark (${currency}): ${formattedTotalRange} (50% Start Deposit: ${formattedDepositRange})`,
      '• Note: Automated ballpark estimate for standard scope—ready for a quick 15-min call to finalize exact features and quote.',
    ].join('\n');
  }, [
    selectedTier.label,
    addonsSummaryText,
    selectedSpeed.label,
    currency,
    formattedTotalRange,
    formattedDepositRange,
  ]);

  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    briefText,
  )}`;

  const enterpriseWhatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hi Tarak, I'm looking to scope a larger custom or enterprise build (${currency}) and would love to discuss requirements.`,
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
      className="relative scroll-mt-24 overflow-x-clip py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="min-w-0 max-w-2xl">
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
                Boutique Studio Quote Builder
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Instant Project Estimator
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Pick your build and features to get a transparent ballpark range
                in 10 seconds—no hidden fees, no back-and-forth.
              </p>
            </div>
          </div>

          {/* Clean Single-Line 3-Step Flow Indicator */}
          <div className="mb-6 flex flex-nowrap items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070B16]/80 px-3 py-2.5 font-mono text-[10.5px] whitespace-nowrap text-slate-300 sm:justify-start sm:gap-2 sm:px-4 sm:text-xs">
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[#00F0FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span>1. Choose Build</span>
            </span>
            <span aria-hidden="true" className="shrink-0 text-slate-600">
              ·
            </span>
            <span className="shrink-0 text-slate-200">2. Add Features</span>
            <span aria-hidden="true" className="shrink-0 text-slate-600">
              ·
            </span>
            <span className="shrink-0 text-slate-200">3. Send Brief</span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left 7 Columns: Tiers, Modular Add-Ons & Delivery Speed */}
            <SpotlightCard
              accent="cyan"
              className="min-w-0 p-5 sm:p-7 lg:col-span-7"
            >
              {/* STEP 1: 5 Clickable Project Tiers */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#00F0FF] uppercase">
                    <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>1. Choose Build</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">
                    Single-select core tier
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PROJECT_TIERS.map((tier, idx) => {
                    const isSelected = tier.id === selectedTier.id;
                    const tierRange = formatMoneyRange(
                      currency === 'INR' ? tier.inrMin : tier.usdMin,
                      currency === 'INR' ? tier.inrMax : tier.usdMax,
                      currency,
                    );
                    const isLastOddCard = idx === PROJECT_TIERS.length - 1;

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleSelectTier(tier.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[48px] min-w-0 flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isLastOddCard ? 'sm:col-span-2' : ''
                        } ${
                          isSelected
                            ? 'border-[#00F0FF]/70 bg-[#00F0FF]/[0.1] shadow-[0_0_26px_rgba(0,240,255,0.16)]'
                            : 'border-white/[0.08] bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="w-full">
                          <div className="flex w-full items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              {tier.badge && (
                                <span
                                  className={`mb-1.5 inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase ${
                                    tier.badgeTone === 'cyan'
                                      ? 'border-[#00F0FF]/45 bg-[#00F0FF]/12 text-[#00F0FF]'
                                      : 'border-emerald-400/40 bg-emerald-400/12 text-emerald-300'
                                  }`}
                                >
                                  {tier.badge}
                                </span>
                              )}
                              <div className="font-display text-sm font-bold leading-snug text-white sm:text-[15px]">
                                {tier.label}
                              </div>
                            </div>
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                isSelected
                                  ? 'border-[#00F0FF] bg-[#00F0FF] text-[#04060C]'
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
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                            {tier.subtitle}
                          </p>
                        </div>

                        <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/[0.07] pt-2.5 font-mono text-[11px] tabular-nums">
                          <span className="font-semibold text-white">
                            {tierRange}
                          </span>
                          <span className="text-slate-400">
                            {tier.standardDelivery}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: 4 Clickable Modular Add-Ons */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#60A5FA] uppercase">
                    <Sliders className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>2. Add Features</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                    {activeAddons.length} add-on
                    {activeAddons.length === 1 ? '' : 's'} selected
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {MODULAR_ADDONS.map((addon) => {
                    const isIncluded = addon.includedInTierId === selectedTier.id;
                    const isChecked =
                      !isIncluded && selectedAddonIds.includes(addon.id);
                    const label =
                      currency === 'INR' ? addon.inrLabel : addon.usdLabel;
                    const priceRange = formatMoneyRange(
                      currency === 'INR' ? addon.inrMin : addon.usdMin,
                      currency === 'INR' ? addon.inrMax : addon.usdMax,
                      currency,
                    );

                    return (
                      <button
                        key={addon.id}
                        type="button"
                        disabled={isIncluded}
                        onClick={() => toggleAddon(addon)}
                        aria-pressed={isChecked}
                        className={`flex min-h-[48px] min-w-0 flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isIncluded
                            ? 'cursor-not-allowed border-emerald-400/30 bg-emerald-400/[0.06] opacity-90'
                            : isChecked
                              ? 'cursor-pointer border-[#3B82F6]/65 bg-[#3B82F6]/[0.13] shadow-[0_0_22px_rgba(59,130,246,0.18)]'
                              : 'cursor-pointer border-white/[0.08] bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-start justify-between gap-2.5">
                          <span className="font-display text-sm font-semibold leading-snug text-white">
                            {label}
                          </span>
                          {isIncluded ? (
                            <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-400/45 bg-emerald-400/15 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">
                              Included
                            </span>
                          ) : (
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                isChecked
                                  ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                                  : 'border-white/20 bg-transparent'
                              }`}
                            >
                              {isChecked && (
                                <Check
                                  className="h-3.5 w-3.5 stroke-[2.75]"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5 font-mono text-[11px] font-semibold tabular-nums">
                          {isIncluded ? (
                            <span className="text-emerald-300">
                              Already covered by selected tier
                            </span>
                          ) : (
                            <span className="text-[#60A5FA]">+{priceRange}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Delivery Speed Toggle */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#00F0FF] uppercase">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Delivery Speed</span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {DELIVERY_SPEEDS.map((speed) => {
                    const isSelected = speed.id === selectedSpeed.id;
                    return (
                      <button
                        key={speed.id}
                        type="button"
                        onClick={() => setDeliverySpeedId(speed.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[48px] min-w-0 flex-col items-start rounded-2xl border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isSelected
                            ? 'border-[#00F0FF]/60 bg-[#00F0FF]/[0.1] shadow-[0_0_22px_rgba(0,240,255,0.14)]'
                            : 'border-white/[0.08] bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-white">
                            {speed.id === 'priority' && (
                              <Zap
                                className="h-3.5 w-3.5 text-[#00F0FF]"
                                aria-hidden="true"
                              />
                            )}
                            <span>{speed.label}</span>
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap ${
                              speed.id === 'priority'
                                ? 'border-[#00F0FF]/40 bg-[#00F0FF]/12 text-[#00F0FF]'
                                : 'border-white/15 bg-white/[0.04] text-slate-300'
                            }`}
                          >
                            {speed.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                          {speed.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>

            {/* Right 5 Columns: Live Estimate Summary & Conversion Actions */}
            <SpotlightCard
              accent="blue"
              className="min-w-0 p-5 sm:p-7 lg:col-span-5 lg:sticky lg:top-24"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2">
                  <Sparkles
                    className="h-4 w-4 text-[#00F0FF]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs font-semibold tracking-[0.15em] text-slate-300 uppercase">
                    Live Estimate Summary
                  </span>
                </div>
              </div>

              {/* Dynamic Ballpark Investment Box */}
              <div className="mt-5 rounded-2xl border border-[#00F0FF]/20 bg-[#04060C]/85 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="font-mono text-[11px] font-semibold tracking-wider text-[#00F0FF] uppercase">
                  ESTIMATED INVESTMENT ({currency})
                </div>
                <div className="mt-2 font-display text-2xl font-bold tracking-tight text-white tabular-nums sm:text-[2rem] sm:leading-tight">
                  {formattedTotalRange}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Starting ballpark for standard scope · Final fixed price
                  confirmed after a free 15-min call.
                </p>
                <div className="mt-3 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-relaxed text-slate-200 tabular-nums">
                  50% deposit to start{' '}
                  <span className="whitespace-nowrap">
                    ({formattedDepositRange})
                  </span>{' '}
                  · 50% at launch.
                </div>
              </div>

              {/* Refined Dark-Glass Ownership & Scope Protection Trust Box */}
              <div className="mt-4 rounded-2xl border border-white/[0.1] bg-[#070D1D]/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]"
                    aria-hidden="true"
                  />
                  <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
                    <li>
                      <span className="font-semibold text-white">
                        100% Source-Code Ownership &amp; Production Launch
                        Included
                      </span>{' '}
                      — Domain, cloud hosting &amp; third-party AI APIs are
                      billed transparently in your own accounts.
                    </li>
                    <li>
                      <span className="font-semibold text-white">
                        Transparent Ballpark Pricing
                      </span>{' '}
                      — Shown range covers standard core scope. Final fixed
                      quote is locked after a free 15-min scope call.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Clean Summary Rows */}
              <div className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-400">Project Type</span>
                  <span className="text-right font-medium text-white">
                    {selectedTier.label}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-400">
                    Add-Ons / Features
                  </span>
                  <span className="text-right font-medium text-slate-200">
                    {addonsSummaryText}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="shrink-0 text-slate-400">
                    Target Delivery
                  </span>
                  <span className="text-right font-mono font-semibold text-[#00F0FF]">
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
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_26px_rgba(0,240,255,0.34)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_36px_rgba(0,240,255,0.52)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send Brief on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition-colors duration-150 hover:border-[#00F0FF]/50 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
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
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-400/35 bg-emerald-400/12 px-3 py-2 font-mono text-xs font-medium text-emerald-200"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                      <span>Copied! Project brief ready to paste.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="pt-1 text-center text-xs leading-relaxed text-slate-400">
                  Need a larger custom or enterprise build?{' '}
                  <a
                    href={enterpriseWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#00F0FF] underline decoration-[#00F0FF]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
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
