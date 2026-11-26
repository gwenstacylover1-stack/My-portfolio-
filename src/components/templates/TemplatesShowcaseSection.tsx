import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Eye,
  Layers,
  MessageCircle,
  Minus,
  Sparkles,
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import {
  SHOWCASE_METRICS,
  TEMPLATE_CATALOG,
  TEMPLATE_TIERS,
  type TemplateItem,
  type TemplateTierId,
} from '../../data/templatesConfig';
import { SpotlightCard } from '../SpotlightCard';
import { AetherCrystal3D } from './AetherCrystal3D';
import { SafePhoto } from './SafePhoto';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import {
  TemplateQuoteModal,
  type QuoteTarget,
} from './TemplateQuoteModal';

type FilterValue = 'all' | TemplateTierId;

export function TemplatesShowcaseSection() {
  const { currency, formatMoney } = useCurrency();
  const [activeTier, setActiveTier] = useState<FilterValue>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(
    null,
  );
  const [quoteTarget, setQuoteTarget] = useState<QuoteTarget | null>(null);

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TEMPLATE_CATALOG.length };
    for (const item of TEMPLATE_CATALOG) {
      counts[item.tier] = (counts[item.tier] ?? 0) + 1;
    }
    return counts;
  }, []);

  const visibleTemplates = useMemo(() => {
    if (activeTier === 'all') return TEMPLATE_CATALOG;
    return TEMPLATE_CATALOG.filter((item) => item.tier === activeTier);
  }, [activeTier]);

  const getTemplatePriceLabel = (template: TemplateItem) =>
    formatMoney(currency === 'INR' ? template.priceInr : template.priceUsd);

  const getTierPriceLabel = (tier: (typeof TEMPLATE_TIERS)[number]) =>
    formatMoney(
      currency === 'INR' ? tier.startingPriceInr : tier.startingPriceUsd,
    );

  const handleOpenTemplateQuote = (template: TemplateItem) => {
    const tierMeta = TEMPLATE_TIERS.find((t) => t.id === template.tier);
    setQuoteTarget({
      templateTitle: template.title,
      tierLabel: tierMeta ? `${tierMeta.label} Tier` : template.tier,
      priceLabel: getTemplatePriceLabel(template),
    });
  };

  return (
    <section
      id="templates"
      aria-labelledby="templates-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] py-16 sm:py-24"
    >
      {/* Subtle Slow-Breathing Ambient Section Aura */}
      <div
        aria-hidden="true"
        className="section-ambient-aura pointer-events-none absolute top-24 left-1/2 -z-10 h-[440px] w-[min(92vw,900px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.075)_0%,rgba(99,102,241,0.065)_48%,transparent_76%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#00F0FF] uppercase sm:text-xs">
            Signature Websites
          </p>
          <h2
            id="templates-heading"
            className="mt-2.5 text-3xl font-bold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl"
          >
            Choose Your Website Tier —{' '}
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#818CF8] to-[#EC4899] bg-clip-text text-transparent">
              Preview Live Before You Build
            </span>
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            Explore 6 interactive flagship websites directly inside this
            portfolio—real shopping carts with promo codes, live booking slots
            with an Admin panel, interactive Three.js 3D WebGL experiences, and
            executive AI dashboards.
          </p>
        </div>

        {/* 4 Trust Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {SHOWCASE_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="liquid-glass rounded-2xl p-4 sm:p-5"
            >
              <p
                className={`text-2xl font-extrabold tabular-nums sm:text-3xl ${
                  metric.accent === 'cyan'
                    ? 'text-[#00F0FF]'
                    : metric.accent === 'pink'
                      ? 'text-[#EC4899]'
                      : metric.accent === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-white'
                }`}
              >
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Tier Filter Controls */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Curated Website Collection
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Click any design below to explore the full interactive experience
              on desktop or mobile.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter website designs by tier"
            className="grid w-full grid-cols-4 items-center gap-1 rounded-full border border-white/10 bg-[#080D1B]/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_-16px_rgba(0,0,0,0.8)] sm:inline-flex sm:w-auto sm:gap-1.5 sm:p-1.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTier === 'all'}
              onClick={() => setActiveTier('all')}
              className={`min-h-[38px] rounded-full px-2 text-center text-xs font-semibold transition-all cursor-pointer whitespace-nowrap sm:px-4 sm:text-sm ${
                activeTier === 'all'
                  ? 'bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] text-[#04060C] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <span>All</span>
              <span className="ml-1 hidden text-[11px] font-semibold opacity-80 tabular-nums sm:inline">
                ({tierCounts.all ?? 0})
              </span>
            </button>

            {TEMPLATE_TIERS.map((tier) => {
              const active = activeTier === tier.id;
              const mobileShortLabel =
                tier.id === 'super' ? 'Super' : tier.shortLabel;
              return (
                <button
                  key={tier.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTier(tier.id)}
                  className={`min-h-[38px] rounded-full px-2 text-center text-xs font-semibold transition-all cursor-pointer whitespace-nowrap sm:px-4 sm:text-sm ${
                    active
                      ? tier.accent === 'pink'
                        ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(168,85,247,0.36)]'
                        : tier.accent === 'amber'
                          ? 'bg-amber-400 text-[#04060C] shadow-[0_0_18px_rgba(251,191,36,0.32)]'
                          : 'bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] text-[#04060C] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span className="sm:hidden">{mobileShortLabel}</span>
                  <span className="hidden sm:inline">
                    {tier.shortLabel}{' '}
                    <span className="ml-0.5 text-[11px] font-semibold opacity-80 tabular-nums">
                      ({tierCounts[tier.id] ?? 0})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Website Showcase Cards Grid */}
        <div
          key={activeTier}
          className="template-fade-up mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleTemplates.map((template) => {
            const tierMeta = TEMPLATE_TIERS.find((t) => t.id === template.tier);
            const spotlightAccent =
              template.tier === 'super'
                ? 'pink'
                : template.tier === 'dynamic'
                  ? 'cyan'
                  : 'blue';
            const displayPrice = getTemplatePriceLabel(template);

            return (
              <SpotlightCard
                key={template.id}
                accent={spotlightAccent}
                className="flex flex-col overflow-hidden rounded-3xl p-0 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Visual Preview Surface */}
                {template.isInteractive3D ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/[0.1] bg-[#050814]">
                    <AetherCrystal3D variant="card" />

                    {/* Bottom Scrim & Action Strip (zero backdrop-blur over WebGL) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#04060C]/95 via-[#04060C]/45 to-transparent"
                    />
                    <div className="pointer-events-none absolute inset-x-3.5 bottom-3 flex items-center justify-between gap-2">
                      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-100 drop-shadow-sm">
                        {template.interactiveHighlight}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        aria-label={`Explore interactive website design for ${template.title}`}
                        className="pointer-events-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-[#00F0FF]/45 bg-[#050A18]/95 px-3 py-1 text-[11px] font-semibold text-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span>Explore Design</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(template)}
                    aria-label={`Explore interactive website design for ${template.title}`}
                    className="group/thumb relative block aspect-[4/3] w-full overflow-hidden border-b border-white/[0.1] bg-[#070B16] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00F0FF]"
                  >
                    <SafePhoto
                      src={template.previewImage ?? ''}
                      alt={`${template.title} — ${template.niche}`}
                      fallbackLabel={template.title}
                      fallbackClassName="bg-[#0B1224] text-slate-200"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />

                    {/* Strong Bottom Contrast Scrim */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04060C]/95 via-[#04060C]/35 to-transparent"
                    />

                    {/* Bottom Interactive Preview Prompt — Zero Mobile Overlap */}
                    <div className="absolute inset-x-3.5 bottom-3 flex items-center justify-between gap-2">
                      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-100 drop-shadow-sm">
                        {template.interactiveHighlight}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#04060C]/90 px-3 py-1 text-[11px] font-semibold text-[#00F0FF] ring-1 ring-[#00F0FF]/45 backdrop-blur-md transition-transform duration-200 group-hover/thumb:scale-105 whitespace-nowrap">
                        <Eye className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span>Explore Design</span>
                      </span>
                    </div>
                  </button>
                )}

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Clean Metadata Line */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5 truncate text-xs">
                      <span
                        className={`shrink-0 font-semibold ${
                          template.tier === 'super'
                            ? 'text-[#EC4899]'
                            : template.tier === 'dynamic'
                              ? 'text-[#00F0FF]'
                              : 'text-amber-300'
                        }`}
                      >
                        {tierMeta?.label ?? template.tier}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">
                        ·
                      </span>
                      <span className="min-w-0 truncate text-slate-400">
                        {template.niche}
                      </span>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-white tabular-nums sm:text-base">
                      {displayPrice}
                    </span>
                  </div>

                  <h4 className="mt-2 text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                    {template.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/95">
                    {template.summary}
                  </p>

                  {/* Feature List */}
                  <ul className="mt-4 space-y-1.5 border-t border-white/[0.08] pt-3.5 text-xs text-slate-200/95 sm:text-[13px]">
                    {template.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00F0FF]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Client-Attracting Card Actions */}
                  <div className="mt-5 flex flex-col gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(template)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#0891B2] via-[#2563EB] to-[#8B5CF6] px-4 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_28px_-10px_rgba(0,240,255,0.38)] transition-all hover:brightness-110 cursor-pointer whitespace-nowrap sm:text-[13px]"
                    >
                      <span>Explore This Website</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenTemplateQuote(template)}
                      aria-label={`Get ${template.title} customized for your brand`}
                      className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-[#00F0FF]/45 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap sm:text-[13px]"
                    >
                      <MessageCircle
                        className="h-3.5 w-3.5 shrink-0 text-[#00F0FF]"
                        aria-hidden="true"
                      />
                      <span>Want This Website?</span>
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* 3-TIER COMPARISON MATRIX: Standard vs Dynamic vs Super Features */}
        <div
          id="compare-tiers"
          className="mt-16 scroll-mt-24 border-t border-white/[0.08] pt-14 sm:mt-20 sm:pt-16"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#A855F7] uppercase sm:text-xs">
                Clear Engineering Breakdown
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Standard vs Dynamic vs Super Features
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                Compare exact capabilities side-by-side to choose the build tier
                that fits your goals today.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setQuoteTarget({
                  templateTitle: 'Custom Website Inquiry',
                  tierLabel: 'Custom Scope',
                })
              }
              className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.04] px-5 text-xs font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all hover:border-[#00F0FF]/45 hover:text-white cursor-pointer whitespace-nowrap md:self-auto"
            >
              <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              <span>Need a Custom Hybrid Build?</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TEMPLATE_TIERS.map((tier) => {
              const isPopular = Boolean(tier.popular);
              const tierStartingPrice = getTierPriceLabel(tier);

              return (
                <div
                  key={tier.id}
                  className={`relative flex flex-col rounded-3xl p-6 transition-all duration-300 sm:p-7 ${
                    isPopular
                      ? 'border border-[#38BDF8]/45 bg-[#0A1124]/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_26px_64px_-22px_rgba(0,0,0,0.88),0_0_52px_-16px_rgba(0,240,255,0.3),0_0_70px_-24px_rgba(139,92,246,0.28)]'
                      : 'liquid-glass'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] px-4 py-1 text-[11px] font-bold tracking-[0.12em] text-[#04060C] uppercase shadow-[0_6px_24px_rgba(0,240,255,0.35)]">
                      Most Popular Choice
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${
                        tier.accent === 'cyan'
                          ? 'text-[#00F0FF]'
                          : tier.accent === 'pink'
                            ? 'text-[#EC4899]'
                            : 'text-amber-300'
                      }`}
                    >
                      {tier.tierNumber} · {tier.label}
                    </span>
                    <span className="font-medium text-slate-400 tabular-nums">
                      {tier.turnaround}
                    </span>
                  </div>

                  <h4 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {tier.headline}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {tier.description}
                  </p>

                  <div className="mt-5 border-b border-white/10 pb-5">
                    <span
                      className={`text-2xl font-extrabold tabular-nums sm:text-3xl ${
                        tier.accent === 'cyan'
                          ? 'text-[#00F0FF]'
                          : tier.accent === 'pink'
                            ? 'text-[#EC4899]'
                            : 'text-white'
                      }`}
                    >
                      {tierStartingPrice}
                    </span>
                    <span className="ml-2 text-xs font-medium text-slate-400">
                      starting package
                    </span>
                  </div>

                  <ul className="mt-5 flex-1 space-y-3 text-sm">
                    {tier.capabilities.map((cap) => (
                      <li
                        key={cap.label}
                        className={`flex items-start gap-2.5 ${
                          cap.included ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {cap.included ? (
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              tier.accent === 'cyan'
                                ? 'text-[#00F0FF]'
                                : tier.accent === 'pink'
                                  ? 'text-[#EC4899]'
                                  : 'text-emerald-400'
                            }`}
                            aria-hidden="true"
                          />
                        ) : (
                          <Minus
                            className="mt-0.5 h-4 w-4 shrink-0 text-slate-600"
                            aria-hidden="true"
                          />
                        )}
                        <span>{cap.label}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      setQuoteTarget({
                        templateTitle: `${tier.label} Tier Website`,
                        tierLabel: `${tier.label} Tier`,
                        priceLabel: tierStartingPrice,
                      })
                    }
                    className={`mt-7 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#8B5CF6] text-[#04060C] shadow-[0_0_28px_rgba(0,240,255,0.3)] hover:brightness-110'
                        : 'border border-white/14 bg-white/[0.05] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#00F0FF]/45 hover:bg-white/[0.1]'
                    }`}
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>Select {tier.label} Tier</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Website Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onRequestQuote={(tpl) => {
          setPreviewTemplate(null);
          handleOpenTemplateQuote(tpl);
        }}
      />

      {/* WhatsApp & Email Website Quote Modal */}
      <TemplateQuoteModal
        target={quoteTarget}
        onClose={() => setQuoteTarget(null)}
      />
    </section>
  );
}
