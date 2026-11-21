import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Clock,
  Cloud,
  Copy,
  Layers,
  MessageCircle,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  CONTACT_INFO,
  ESTIMATOR_FEATURES,
  ESTIMATOR_PROJECT_TYPES,
  ESTIMATOR_TIMELINES,
} from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

function formatInr(amount: number): string {
  const rounded = Math.round(amount / 500) * 500;
  return `₹${rounded.toLocaleString('en-IN')}`;
}

export function ProjectEstimator() {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(
    ESTIMATOR_PROJECT_TYPES[0].id,
  );
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const [timelineId, setTimelineId] = useState<'standard' | 'priority'>('standard');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const toggleFeature = (id: string) => {
    setSelectedFeatureIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedType =
    ESTIMATOR_PROJECT_TYPES.find((t) => t.id === selectedTypeId) ??
    ESTIMATOR_PROJECT_TYPES[0];
  const selectedFeatures = ESTIMATOR_FEATURES.filter((f) =>
    selectedFeatureIds.includes(f.id),
  );
  const selectedTimeline =
    ESTIMATOR_TIMELINES.find((t) => t.id === timelineId) ??
    ESTIMATOR_TIMELINES[0];

  const { minEstimate, maxEstimate } = useMemo(() => {
    const featureMin = selectedFeatures.reduce((sum, f) => sum + f.minInr, 0);
    const featureMax = selectedFeatures.reduce((sum, f) => sum + f.maxInr, 0);
    return {
      minEstimate: (selectedType.minInr + featureMin) * selectedTimeline.multiplier,
      maxEstimate: (selectedType.maxInr + featureMax) * selectedTimeline.multiplier,
    };
  }, [selectedType, selectedFeatures, selectedTimeline]);

  const formattedRange = `${formatInr(minEstimate)} – ${formatInr(maxEstimate)}`;

  const briefText = useMemo(() => {
    const featuresLine =
      selectedFeatures.length > 0
        ? selectedFeatures.map((f) => f.label).join(', ')
        : 'Core Build Only';

    return [
      'Hi Tarak, here is my project scope from your portfolio estimator:',
      '',
      `• Project Type: ${selectedType.label}`,
      `• Optional Features: ${featuresLine}`,
      `• Timeline: ${selectedTimeline.label} (${selectedTimeline.eta})`,
      `• Ballpark Estimate: ${formattedRange} INR`,
      '• Hosting Target: Zero-Cost Edge Hosting Architecture (₹0/yr Cloudflare Pages)',
      '',
      'Let’s discuss architecture and next steps.',
    ].join('\n');
  }, [selectedType, selectedFeatures, selectedTimeline, formattedRange]);

  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    briefText,
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
      setCopiedBrief(true);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedBrief(false);
      }, 2600);
    } catch {
      setCopiedBrief(false);
    }
  };

  return (
    <section
      id="estimator"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
                Instant 3-Step Scope &amp; Quote
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Interactive Project Estimator
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Scope your build in 10 seconds to get a transparent INR ballpark range and
              send the structured brief directly on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left 7 Columns: Interactive 3 Steps */}
            <SpotlightCard accent="cyan" className="p-6 sm:p-8 lg:col-span-7">
              {/* STEP 1: Select Project Type */}
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#00F0FF] uppercase">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  <span>Step 1 · Select Project Type</span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ESTIMATOR_PROJECT_TYPES.map((type) => {
                    const isSelected = type.id === selectedType.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedTypeId(type.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[44px] flex-col items-start rounded-2xl border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isSelected
                            ? 'border-[#00F0FF]/60 bg-[#00F0FF]/[0.1] shadow-[0_0_24px_rgba(0,240,255,0.14)]'
                            : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-white sm:text-[15px]">
                            {type.label}
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? 'border-[#00F0FF] bg-[#00F0FF] text-[#04060C]'
                                : 'border-white/20 bg-transparent'
                            }`}
                          >
                            {isSelected && (
                              <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                            )}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                          {type.subtitle}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Toggle Optional Features */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#60A5FA] uppercase">
                    <Sliders className="h-4 w-4" aria-hidden="true" />
                    <span>Step 2 · Optional Features</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                    {selectedFeatures.length} selected
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ESTIMATOR_FEATURES.map((feature) => {
                    const isChecked = selectedFeatureIds.includes(feature.id);
                    return (
                      <button
                        key={feature.id}
                        type="button"
                        onClick={() => toggleFeature(feature.id)}
                        aria-pressed={isChecked}
                        className={`flex min-h-[44px] flex-col items-start rounded-2xl border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isChecked
                            ? 'border-[#3B82F6]/60 bg-[#3B82F6]/[0.12] shadow-[0_0_22px_rgba(59,130,246,0.16)]'
                            : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="font-display text-sm font-semibold text-white">
                            {feature.label}
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                              isChecked
                                ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                                : 'border-white/20 bg-transparent'
                            }`}
                          >
                            {isChecked && (
                              <Check className="h-3.5 w-3.5 stroke-[2.75]" aria-hidden="true" />
                            )}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                          {feature.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Select Timeline */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#EC4899] uppercase">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>Step 3 · Select Timeline</span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ESTIMATOR_TIMELINES.map((timeline) => {
                    const isSelected = timeline.id === timelineId;
                    return (
                      <button
                        key={timeline.id}
                        type="button"
                        onClick={() => setTimelineId(timeline.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[44px] flex-col items-start rounded-2xl border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                          isSelected
                            ? 'border-[#EC4899]/55 bg-[#EC4899]/[0.1] shadow-[0_0_22px_rgba(236,72,153,0.16)]'
                            : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-white">
                            {timeline.label}
                          </span>
                          <span className="font-mono text-xs font-semibold text-slate-300 tabular-nums">
                            {timeline.eta}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                          {timeline.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>

            {/* Right 5 Columns: Live Ballpark Estimate Summary & One-Tap Actions */}
            <SpotlightCard accent="pink" className="p-6 sm:p-8 lg:col-span-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold tracking-[0.15em] text-slate-300 uppercase">
                  Live Estimate Summary
                </span>
                <Sparkles className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              </div>

              {/* Live INR Range Display */}
              <div className="mt-5 rounded-2xl border border-white/[0.09] bg-[#04060C]/75 p-5">
                <div className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
                  Ballpark Investment (INR)
                </div>
                <div className="mt-2 font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-[2.1rem]">
                  {formattedRange}
                </div>
                <div className="mt-2 font-mono text-xs text-slate-400">
                  Target Delivery:{' '}
                  <span className="text-slate-200">{selectedTimeline.eta}</span>
                </div>
              </div>

              {/* Zero-Cost Edge Hosting Highlight Badge */}
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-3.5">
                <Cloud
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                  aria-hidden="true"
                />
                <div className="text-xs leading-relaxed text-emerald-200">
                  <span className="font-semibold text-emerald-100">
                    Zero-Cost Edge Hosting Architecture
                  </span>{' '}
                  <span className="font-mono text-emerald-300">
                    (₹0/yr Cloudflare Pages)
                  </span>
                </div>
              </div>

              {/* Selected Scope Breakdown */}
              <div className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Project Type</span>
                  <span className="font-medium text-white text-right">
                    {selectedType.label}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-400 shrink-0">Features</span>
                  <span className="font-medium text-slate-200 text-right">
                    {selectedFeatures.length > 0
                      ? selectedFeatures.map((f) => f.label).join(', ')
                      : 'Core Build Only'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Timeline</span>
                  <span className="font-medium text-white text-right">
                    {selectedTimeline.label} ({selectedTimeline.eta})
                  </span>
                </div>
              </div>

              {/* Two One-Tap Actions */}
              <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.08] pt-5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_26px_rgba(0,240,255,0.32)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_34px_rgba(0,240,255,0.5)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send Brief on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition-colors duration-150 hover:border-[#00F0FF]/50 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-300">Copied Project Brief!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                      <span>Copy Project Brief</span>
                    </>
                  )}
                </button>
              </div>
            </SpotlightCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
