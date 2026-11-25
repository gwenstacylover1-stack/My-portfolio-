import { lazy, Suspense, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CreditCard,
  ExternalLink,
  Globe,
  Layers,
  MessageCircle,
  Package,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

const CrunchxPouch3DStage = lazy(() => import('./CrunchxPouch3DStage'));

const CRUNCHX_LIVE_URL = 'https://crunchxdemo.pages.dev/';

const CUSTOM_WEBSITE_WHATSAPP_MSG =
  'Hey Tarak! I saw your Dark Stark SMM site and CRUNCHX 3D demo (https://crunchxdemo.pages.dev/) and want to inquire about building a custom website.';

interface CrunchxHighlight {
  id: string;
  label: string;
  description: string;
  specLabel: string;
  accent: 'cyan' | 'pink';
  icon: 'box' | 'scan' | 'package' | 'shield';
}

const CRUNCHX_HIGHLIGHTS: CrunchxHighlight[] = [
  {
    id: 'product-stage',
    label: '360° 3D Product Stage',
    description:
      'Real-time 2K foil pouch rotation, flavor switching, and 1.85x close-up zoom.',
    specLabel: 'WebGL 2K PBR Packaging · 1.85x Optical Zoom',
    accent: 'cyan',
    icon: 'box',
  },
  {
    id: 'xray-scanner',
    label: 'Kettle X-Ray Scanner',
    description:
      'Interactive laser slider revealing inside product craftsmanship.',
    specLabel: 'Real-Time Shader Clip Plane · Laser HUD',
    accent: 'pink',
    icon: 'scan',
  },
  {
    id: 'collectors-vault',
    label: "Collector's Vault & Physics Cart",
    description:
      '3-pack bundle builder with kinetic vault drop and burst animations.',
    specLabel: 'Kinetic Bundle Builder · Motion Physics',
    accent: 'cyan',
    icon: 'package',
  },
  {
    id: 'admin-os',
    label: 'Full Admin OS & Checkout',
    description:
      'Live inventory/order management, GST invoices, PIN checker, and Shiprocket tracking.',
    specLabel: 'End-to-End D2C Operations · GST + Shiprocket',
    accent: 'pink',
    icon: 'shield',
  },
];

const STUDIO_CAPABILITIES = [
  {
    id: 'interactive-3d-d2c',
    title: 'Interactive 3D Product & D2C Websites',
    description:
      'Custom 3D WebGL packaging, 360° spin & zoom stages, and high-converting storefronts like crunchxdemo.pages.dev.',
    accent: 'cyan' as const,
    icon: Box,
  },
  {
    id: 'modern-business-saas',
    title: 'Modern Business & SaaS Websites',
    description:
      'Fast, responsive dark-mode websites, landing pages, and custom web applications tailored to your brand.',
    accent: 'pink' as const,
    icon: Globe,
  },
  {
    id: 'fullstack-store-payments',
    title: 'Full-Stack Store & Payment Integration',
    description:
      'Custom admin dashboards, UPI/Razorpay & Stripe checkout, order tracking, and mobile-first optimization.',
    accent: 'blue' as const,
    icon: CreditCard,
  },
];

const HIGHLIGHT_ICONS = {
  box: Box,
  scan: ScanLine,
  package: Package,
  shield: ShieldCheck,
};

export function Tarak3DStudioSection() {
  const [activeTabId, setActiveTabId] = useState<string>(
    CRUNCHX_HIGHLIGHTS[0].id,
  );

  const activeHighlight =
    CRUNCHX_HIGHLIGHTS.find((item) => item.id === activeTabId) ??
    CRUNCHX_HIGHLIGHTS[0];
  const ActiveHighlightIcon = HIGHLIGHT_ICONS[activeHighlight.icon];

  // Uses the exact existing WhatsApp number already configured in CONTACT_INFO
  const whatsappOrderHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    CUSTOM_WEBSITE_WHATSAPP_MSG,
  )}`;

  return (
    <section
      id="tarak3d-studio"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle controlled neon cyan + pink ambient studio bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08)_0%,rgba(255,42,133,0.06)_48%,transparent_75%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1. Studio Divider & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex w-full items-center gap-4">
              <div
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00F0FF]/55 to-[#FF2A85]/45"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/30 bg-[#080D1B]/90 px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-[#FF2A85] shadow-[0_0_24px_rgba(0,240,255,0.16)]">
                TARAK3D WEB &amp; 3D STUDIO • CUSTOM BRAND BUILDS
              </span>
              <div
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-l from-transparent via-[#FF2A85]/55 to-[#00F0FF]/45"
              />
            </div>

            <h2 className="mt-7 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              We Also Build High-Converting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#60A5FA] to-[#FF2A85]">
                2D &amp; 3D Websites
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              From sleek modern business websites to interactive 3D WebGL D2C
              {' '}storefronts—engineered from scratch to turn visitors into paying customers.
            </p>
          </div>

          {/* 2. Featured Live 3D Flagship Showcase Card ("CRUNCHX 3D D2C Storefront") */}
          <SpotlightCard accent="pink" className="mt-10 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left 5 Columns: Live Interactive 3D WebGL Foil Pouch Stage */}
              <div className="flex flex-col lg:col-span-5">
                <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/12 bg-[#04060C] shadow-[0_18px_48px_rgba(0,0,0,0.65)]">
                  <Suspense
                    fallback={
                      <div className="flex h-full min-h-[360px] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0A1324] via-[#060912] to-[#140814] p-6 lg:min-h-[420px]">
                        <Box className="h-10 w-10 text-[#00F0FF]" aria-hidden="true" />
                        <span className="font-mono text-xs tracking-wider text-slate-300">
                          INITIALIZING 3D WEBGL STAGE…
                        </span>
                      </div>
                    }
                  >
                    <CrunchxPouch3DStage activeTabId={activeTabId} />
                  </Suspense>

                  {/* Top Live Flagship Status Badge (solid translucent surface, no backdrop-blur over WebGL) */}
                  <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/40 bg-[#04060C]/92 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-[#00F0FF]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                      <span>LIVE WEBGL DEMO</span>
                    </span>
                  </div>

                  {/* Bottom Live Domain Overlay (solid translucent surface, no backdrop-blur over WebGL) */}
                  <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between gap-2 rounded-xl border border-white/12 bg-[#070B16]/92 px-3.5 py-2.5">
                    <a
                      href={CRUNCHX_LIVE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-0 items-center gap-1.5 font-mono text-xs text-[#00F0FF] transition-colors hover:text-white whitespace-nowrap"
                    >
                      <span>crunchxdemo.pages.dev</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-[#FF2A85] uppercase whitespace-nowrap">
                      3D D2C
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Flagship Details, Interactive Highlight Pills & CTAs */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center rounded-full border border-[#FF2A85]/35 bg-[#FF2A85]/12 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.12em] text-[#FF6DA8]">
                      LIVE 3D WEBGL FLAGSHIP • D2C E-COMMERCE
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    CRUNCHX — Interactive 3D Kettle-Cooked Snack Store
                  </h3>

                  {/* Clickable Interactive Highlight Pills (Tabs) */}
                  <div className="mt-6">
                    <div className="mb-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                      Explore Interactive Features
                    </div>
                    <div
                      role="tablist"
                      aria-label="CRUNCHX 3D Storefront Highlights"
                      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                    >
                      {CRUNCHX_HIGHLIGHTS.map((item) => {
                        const isActive = item.id === activeHighlight.id;
                        const Icon = HIGHLIGHT_ICONS[item.icon];
                        const activeStyle =
                          item.accent === 'cyan'
                            ? 'border-[#00F0FF]/65 bg-[#00F0FF]/[0.11] text-white shadow-[0_0_20px_rgba(0,240,255,0.16)]'
                            : 'border-[#FF2A85]/65 bg-[#FF2A85]/[0.12] text-white shadow-[0_0_20px_rgba(255,42,133,0.16)]';
                        const iconColor = isActive
                          ? item.accent === 'cyan'
                            ? 'text-[#00F0FF]'
                            : 'text-[#FF2A85]'
                          : 'text-slate-400';

                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveTabId(item.id)}
                            className={`flex min-h-[46px] items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                              isActive
                                ? activeStyle
                                : 'border-white/[0.09] bg-white/[0.025] text-slate-300 hover:border-white/25 hover:bg-white/[0.05] hover:text-white'
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 shrink-0 ${iconColor}`}
                              aria-hidden="true"
                            />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Highlight Readout Panel */}
                  <div
                    role="tabpanel"
                    className="mt-4 rounded-2xl border border-white/[0.09] bg-[#050812]/85 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2">
                        <ActiveHighlightIcon
                          className={`h-4 w-4 ${
                            activeHighlight.accent === 'cyan'
                              ? 'text-[#00F0FF]'
                              : 'text-[#FF2A85]'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="font-display text-sm font-bold text-white sm:text-base">
                          {activeHighlight.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10.5px] text-slate-400">
                        {activeHighlight.specLabel}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {activeHighlight.description}
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <a
                    href={CRUNCHX_LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#FF2A85] px-6 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_30px_rgba(0,240,255,0.34)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_40px_rgba(255,42,133,0.42)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080D1B]"
                  >
                    <span>Explore Live 3D Demo</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href={whatsappOrderHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-[#FF2A85]/40 bg-[#FF2A85]/[0.1] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-[#FF2A85]/80 hover:bg-[#FF2A85]/20 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2A85]"
                  >
                    <span>Order a Custom Website</span>
                    <ArrowRight className="h-4 w-4 text-[#FF6DA8]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* 3. Web & 3D Development Capabilities Grid (3 Compact Cards — No Fixed Price Walls) */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STUDIO_CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              const iconBox =
                cap.accent === 'cyan'
                  ? 'border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]'
                  : cap.accent === 'pink'
                    ? 'border-[#FF2A85]/30 bg-[#FF2A85]/10 text-[#FF6DA8]'
                    : 'border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]';

              return (
                <SpotlightCard
                  key={cap.id}
                  accent={cap.accent}
                  className="p-6"
                >
                  <div className="flex h-full flex-col">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconBox}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {cap.description}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* 4. Direct WhatsApp Project CTA Bar */}
          <SpotlightCard accent="cyan" className="mt-6 p-5 sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3.5 sm:items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-base font-bold text-white sm:text-lg">
                    Want a custom website or 3D storefront like CRUNCHX for your brand?
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-slate-400">
                    Direct founder consultation · Custom 2D, 3D WebGL &amp; full-stack builds
                  </p>
                </div>
              </div>

              <a
                href={whatsappOrderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-6 py-3 text-sm font-semibold text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.18)] transition-all duration-200 hover:border-emerald-400/75 hover:bg-emerald-400/25 hover:text-white sm:w-auto whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
