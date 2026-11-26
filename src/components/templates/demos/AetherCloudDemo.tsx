import { useState } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useCurrency } from '../../../context/CurrencyContext';
import { AetherCrystal3D } from '../AetherCrystal3D';

interface DemoProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

const CAPABILITY_CARDS = [
  {
    id: 'edge-compute',
    icon: Cpu,
    title: 'Sub-20ms Edge Orchestration',
    metric: '18.4ms p95',
    detail:
      'Distributed Cloudflare edge execution automatically routes traffic to the nearest global PoP.',
  },
  {
    id: 'conversion-ai',
    icon: TrendingUp,
    title: 'Adaptive Funnel Personalization',
    metric: '+38% Lift',
    detail:
      'Dynamic layout scoring adapts hero CTAs, offers, and onboarding flows per visitor intent.',
  },
  {
    id: 'zero-trust',
    icon: ShieldCheck,
    title: 'Zero-Trust Vault & Billing',
    metric: '99.99% SLA',
    detail:
      'End-to-end encrypted webhooks, automated metering, and multi-currency UPI/Card settlement.',
  },
  {
    id: 'global-mesh',
    icon: Globe,
    title: 'Real-Time Telemetry Mesh',
    metric: '310+ Regions',
    detail:
      'Instant streaming dashboards with live anomaly alerts and automated traffic failovers.',
  },
];

export function AetherCloudDemo({
  isMobileViewport,
  onRequestTemplate,
}: DemoProps) {
  const { currency, formatMoney } = useCurrency();

  // Interactive ROI Calculator State
  const [monthlyVisitors, setMonthlyVisitors] = useState(45000);
  const [conversionRate, setConversionRate] = useState(2.4);
  const [avgOrderValueInr, setAvgOrderValueInr] = useState(3200);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'annual',
  );

  // 3D Tilt Mouse/Touch Handler for Feature Cards
  const handleTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -12;
    const ry = (x / rect.width - 0.5) * 12;
    card.style.setProperty('--mx', `${((x / rect.width) * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${((y / rect.height) * 100).toFixed(1)}%`);
    card.style.transform = `perspective(700px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) translateY(-4px)`;
  };

  const handleTiltLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  // Live ROI Math (adapts cleanly between INR and USD)
  const effectiveAov =
    currency === 'INR'
      ? avgOrderValueInr
      : Math.max(25, Math.round(avgOrderValueInr / 40));

  const currentMonthlyRevenue = Math.round(
    monthlyVisitors * (conversionRate / 100) * effectiveAov,
  );
  const projectedConversionRate = Number((conversionRate * 1.38).toFixed(2));
  const projectedMonthlyRevenue = Math.round(
    monthlyVisitors * (projectedConversionRate / 100) * effectiveAov,
  );
  const monthlyGain = Math.max(
    0,
    projectedMonthlyRevenue - currentMonthlyRevenue,
  );
  const annualGain = monthlyGain * 12;
  const platformCost =
    currency === 'INR'
      ? billingCycle === 'annual'
        ? 24999
        : 31999
      : billingCycle === 'annual'
        ? 699
        : 899;
  const roiMultiple = Math.max(
    1,
    Math.round(annualGain / (platformCost * 12)),
  );

  const formattedAnnualGain =
    currency === 'INR'
      ? `₹${(annualGain / 100000).toFixed(1)}L / yr`
      : `$${Math.round(annualGain / 1000).toLocaleString('en-US')}k / yr`;

  return (
    <div className="min-h-full bg-[#050814] font-sans text-slate-100">
      {/* Top SaaS Bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050814]/92 backdrop-blur-xl">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 ${
            isMobileViewport ? '' : 'sm:px-8'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF] via-[#6366F1] to-[#A855F7] text-[#050814] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <Layers className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              Aether Cloud
            </span>
          </div>

          <button
            type="button"
            onClick={onRequestTemplate}
            className="rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] px-4 py-2 text-xs font-bold text-[#050814] shadow-[0_0_20px_rgba(0,240,255,0.32)] transition-all hover:brightness-110 cursor-pointer whitespace-nowrap"
          >
            Build This Platform
          </button>
        </div>
      </header>

      {/* Real Interactive Three.js 3D WebGL Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className={`mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 ${
            isMobileViewport
              ? 'grid-cols-1'
              : 'sm:px-8 sm:py-12 lg:grid-cols-12 lg:gap-8'
          }`}
        >
          {/* Left Copy & CTA */}
          <div
            className={`${
              isMobileViewport ? 'text-center' : 'text-center lg:col-span-6 lg:text-left'
            }`}
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00F0FF] uppercase">
              Interactive WebGL · Three.js 60FPS Engine
            </p>
            <h1
              className={`mt-3 font-extrabold tracking-tight text-white leading-[1.08] ${
                isMobileViewport ? 'text-3xl' : 'text-3xl sm:text-5xl'
              }`}
            >
              Autonomous Edge Infrastructure Built for{' '}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent">
                10x Revenue Scale.
              </span>
            </h1>
            <p className="mt-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
              Real-time 3D obsidian crystal core with orbit controls,
              GPU-accelerated 3D tilt telemetry cards, and an interactive ROI
              simulator engineered to convert enterprise buyers.
            </p>
            <div
              className={`mt-6 flex flex-wrap items-center gap-3 ${
                isMobileViewport
                  ? 'justify-center'
                  : 'justify-center lg:justify-start'
              }`}
            >
              <a
                href="#aether-roi"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6] px-6 text-xs font-bold text-white shadow-[0_0_28px_rgba(0,240,255,0.3)] transition-all hover:brightness-110"
              >
                <span>Run Live ROI Simulator</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={onRequestTemplate}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-5 text-xs font-semibold text-slate-200 transition-colors hover:border-[#00F0FF]/45 hover:text-white cursor-pointer"
              >
                <span>Request Custom 3D Build</span>
              </button>
            </div>
          </div>

          {/* Right Live Interactive Three.js 3D Stage */}
          <div
            className={`${
              isMobileViewport ? '' : 'lg:col-span-6'
            }`}
          >
            <div
              className={`smooth-glow-frame overflow-hidden rounded-3xl bg-[#050814] ${
                isMobileViewport ? 'h-[260px]' : 'h-[300px] sm:h-[360px]'
              }`}
            >
              <AetherCrystal3D variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* 3D Tilt Capability Cards */}
      <section
        className={`mx-auto max-w-6xl px-4 py-8 ${
          isMobileViewport ? '' : 'sm:px-8 sm:py-10'
        }`}
      >
        <div
          className={`grid gap-4 ${
            isMobileViewport
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {CAPABILITY_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onPointerMove={handleTiltMove}
                onPointerLeave={handleTiltLeave}
                className="template-tilt-card smooth-glow-frame rounded-2xl bg-[#0B1124]/85 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold text-[#00F0FF] tabular-nums">
                    {card.metric}
                  </span>
                </div>
                <h2 className="mt-4 text-sm font-bold text-white">
                  {card.title}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  {card.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive ROI & Growth Calculator */}
      <section
        id="aether-roi"
        className={`mx-auto max-w-6xl px-4 pb-12 ${
          isMobileViewport ? '' : 'sm:px-8 sm:pb-14'
        }`}
      >
        <div className="smooth-glow-frame rounded-3xl bg-[#0A1022]/92 p-5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#A855F7] uppercase">
                Interactive ROI Engine ({currency})
              </p>
              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Estimate Your Revenue Uplift Live
              </h2>
            </div>

            {/* Billing Cycle Switch */}
            <div className="inline-flex items-center gap-1 self-start rounded-full border border-white/10 bg-[#050814] p-1">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`min-h-[34px] rounded-full px-3.5 text-xs font-semibold transition-colors cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#818CF8] text-[#050814]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`min-h-[34px] rounded-full px-3.5 text-xs font-semibold transition-colors cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#818CF8] text-[#050814]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual (-20%)
              </button>
            </div>
          </div>

          <div
            className={`mt-7 grid gap-6 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            {/* Sliders */}
            <div
              className={`space-y-5 ${
                isMobileViewport ? '' : 'lg:col-span-7'
              }`}
            >
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Monthly Site Visitors</span>
                  <span className="font-bold text-[#00F0FF] tabular-nums">
                    {monthlyVisitors.toLocaleString(
                      currency === 'INR' ? 'en-IN' : 'en-US',
                    )}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={250000}
                  step={5000}
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  aria-label="Monthly site visitors"
                  className="mt-2 h-2 w-full cursor-pointer accent-[#00F0FF]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current Conversion Rate</span>
                  <span className="font-bold text-[#00F0FF] tabular-nums">
                    {conversionRate.toFixed(1)}% →{' '}
                    <span className="text-emerald-400">
                      {projectedConversionRate}%
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={6}
                  step={0.2}
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  aria-label="Current conversion rate"
                  className="mt-2 h-2 w-full cursor-pointer accent-[#00F0FF]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">
                    Average Order / Deal Value
                  </span>
                  <span className="font-bold text-[#C084FC] tabular-nums">
                    {formatMoney(effectiveAov)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={avgOrderValueInr}
                  onChange={(e) => setAvgOrderValueInr(Number(e.target.value))}
                  aria-label="Average order value"
                  className="mt-2 h-2 w-full cursor-pointer accent-[#A855F7]"
                />
              </div>
            </div>

            {/* Live Projected Output */}
            <div
              className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-[#050814]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${
                isMobileViewport ? '' : 'lg:col-span-5'
              }`}
            >
              <div>
                <p className="text-[11px] font-medium text-slate-400">
                  Projected Extra Monthly Revenue
                </p>
                <p className="mt-1 text-2xl font-extrabold text-[#00F0FF] tabular-nums sm:text-3xl">
                  +{formatMoney(monthlyGain)}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <p className="text-slate-400">Annual Uplift</p>
                    <p className="mt-0.5 font-bold text-white tabular-nums">
                      {formattedAnnualGain}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Estimated ROI</p>
                    <p className="mt-0.5 font-bold text-emerald-400 tabular-nums">
                      {roiMultiple}x Return
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onRequestTemplate}
                className="mt-5 min-h-[44px] w-full rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#8B5CF6] px-4 text-xs font-bold text-[#050814] shadow-[0_0_24px_rgba(0,240,255,0.28)] transition-all hover:brightness-110 cursor-pointer"
              >
                Request Super Features Platform
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
