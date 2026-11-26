import type { ComponentType } from 'react';
import { AetherCloudDemo } from '../components/templates/demos/AetherCloudDemo';
import { AtelierVesperDemo } from '../components/templates/demos/AtelierVesperDemo';
import { LumiereClinicDemo } from '../components/templates/demos/LumiereClinicDemo';
import { PulseOpsAiDemo } from '../components/templates/demos/PulseOpsAiDemo';
import { SaffronEmberDemo } from '../components/templates/demos/SaffronEmberDemo';
import { VelouraStoreDemo } from '../components/templates/demos/VelouraStoreDemo';

/**
 * Future-ready Tier Union:
 * To launch Phase 2 ("AI Agents & Automation"), simply add 'ai-agents' here,
 * append its tier metadata to TEMPLATE_TIERS, and add template cards to TEMPLATE_CATALOG.
 */
export type TemplateTierId = 'standard' | 'dynamic' | 'super';

export interface TemplateDemoComponentProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

export interface TierDefinition {
  id: TemplateTierId;
  tierNumber: string;
  label: string;
  shortLabel: string;
  turnaround: string;
  startingPriceInr: number;
  startingPriceUsd: number;
  headline: string;
  description: string;
  accent: 'amber' | 'cyan' | 'pink';
  popular?: boolean;
  capabilities: { label: string; included: boolean }[];
}

export interface TemplateItem {
  id: string;
  title: string;
  niche: string;
  tier: TemplateTierId;
  priceInr: number;
  priceUsd: number;
  turnaround: string;
  summary: string;
  interactiveHighlight: string;
  features: string[];
  previewImage?: string;
  isInteractive3D?: boolean;
  previewComponent: ComponentType<TemplateDemoComponentProps>;
  /**
   * Optional standalone hosted demo URL (e.g. Cloudflare Pages deployment).
   * When populated in Phase 2/3, the Preview Modal automatically enables direct live launch.
   */
  liveUrl?: string;
}

export const SHOWCASE_METRICS = [
  {
    id: 'demos',
    value: '6',
    label: 'Signature Websites',
    accent: 'cyan' as const,
  },
  {
    id: 'turnaround',
    value: '3–12 Days',
    label: 'Rapid Turnaround',
    accent: 'pink' as const,
  },
  {
    id: 'responsive',
    value: '100%',
    label: 'Mobile-First Responsive',
    accent: 'white' as const,
  },
  {
    id: 'seo',
    value: '99+',
    label: 'Speed & SEO Score',
    accent: 'emerald' as const,
  },
];

export const TEMPLATE_TIERS: TierDefinition[] = [
  {
    id: 'standard',
    tierNumber: 'Tier 01',
    label: 'Standard',
    shortLabel: 'Standard',
    turnaround: '3–5 Days',
    startingPriceInr: 7999,
    startingPriceUsd: 199,
    headline: 'High-Converting Presence',
    description:
      'Ideal for local businesses, luxury studios, restaurants, personal brands, and portfolios.',
    accent: 'amber',
    capabilities: [
      { label: 'Mobile-first bespoke UI design', included: true },
      { label: 'Interactive galleries & smooth category filters', included: true },
      { label: 'Quick-view modals & WhatsApp instant quote forms', included: true },
      { label: 'On-page SEO, SSL & global Cloudflare Edge speed', included: true },
      { label: 'Live E-Commerce Cart / Booking Engine', included: false },
      { label: 'Admin Dashboard & Order / Slot Management', included: false },
      { label: 'Real-Time 3D WebGL / AI Analytics Copilot', included: false },
    ],
  },
  {
    id: 'dynamic',
    tierNumber: 'Tier 02',
    label: 'Dynamic',
    shortLabel: 'Dynamic',
    turnaround: '7–12 Days',
    startingPriceInr: 16999,
    startingPriceUsd: 449,
    headline: 'Interactive Web Apps',
    description:
      'Built for online stores, clinics, salons, and service brands taking live orders or bookings.',
    accent: 'cyan',
    popular: true,
    capabilities: [
      { label: 'Everything in Standard Tier', included: true },
      { label: 'Full E-Commerce Cart, Promo Codes & Checkout', included: true },
      { label: 'Real-time Date & Time Slot Booking System', included: true },
      { label: 'Live Admin Panel to Manage Orders & Bookings', included: true },
      { label: 'Dynamic Search, Category & Price Filters', included: true },
      { label: 'Payment Gateway / UPI / Stripe Integration Ready', included: true },
      { label: 'Custom 3D WebGL Hero / AI Copilot Suite', included: false },
    ],
  },
  {
    id: 'super',
    tierNumber: 'Tier 03',
    label: 'Super Features',
    shortLabel: 'Super Features',
    turnaround: '2–3 Weeks',
    startingPriceInr: 32999,
    startingPriceUsd: 899,
    headline: 'Flagship AI & 3D Platforms',
    description:
      'Engineered for funded startups, SaaS platforms, SMM panels, and category-leading brands.',
    accent: 'pink',
    capabilities: [
      { label: 'Everything in Dynamic Tier', included: true },
      { label: 'Interactive 3D WebGL (Three.js) & GPU Shaders', included: true },
      { label: 'Real-Time AI Dashboards, Charts & Theme Engine', included: true },
      { label: 'Interactive ROI Calculators & Custom Simulators', included: true },
      { label: 'Cloudflare Workers Zero-Key Edge API Proxies', included: true },
      { label: 'Firebase Auth, Wallets & Role-Based Admin Ops', included: true },
      { label: 'Dedicated Performance Tuning & Priority Launch', included: true },
    ],
  },
];

export const TEMPLATE_CATALOG: TemplateItem[] = [
  {
    id: 'atelier-vesper',
    title: 'Atelier Vesper Studio',
    niche: 'Luxury Architecture & Interiors',
    tier: 'standard',
    priceInr: 7999,
    priceUsd: 199,
    turnaround: '3–5 Days',
    summary:
      'Warm travertine editorial showcase featuring filterable architectural commissions, blueprint quick-view modals, and private discovery call capture.',
    interactiveHighlight: 'Category Filters + Quick-View Spec Modal',
    features: [
      'Filterable portfolio categories',
      'Project quick-view modal with specs',
      'Inline consultation capture',
    ],
    previewImage: '/src/assets/images/demo_atelier_interior_1795708679883.jpg',
    previewComponent: AtelierVesperDemo,
  },
  {
    id: 'saffron-ember',
    title: 'Saffron & Ember Dining',
    niche: 'Fine Dining & Hospitality',
    tier: 'standard',
    priceInr: 8999,
    priceUsd: 229,
    turnaround: '3–5 Days',
    summary:
      'Candlelit wood-fire hospitality website with multi-course menu filters, dietary toggles, sommelier tasting modals, and instant table holds.',
    interactiveHighlight: 'Menu Filters + Dish Tasting Modal',
    features: [
      'Course & dietary filter toggles',
      'Tasting notes quick-view modal',
      'Instant table reservation strip',
    ],
    previewImage: '/src/assets/images/demo_saffron_dining_1795708680040.jpg',
    previewComponent: SaffronEmberDemo,
  },
  {
    id: 'veloura-store',
    title: 'Veloura Technical Store',
    niche: 'E-Commerce & Streetwear Retail',
    tier: 'dynamic',
    priceInr: 16999,
    priceUsd: 449,
    turnaround: '7–12 Days',
    summary:
      'High-conversion storefront with live search, size-picker quick views, slide-over shopping bag, free-shipping meter, and working SAVE20 promo code.',
    interactiveHighlight: 'Live Cart + SAVE20 Promo Engine',
    features: [
      'Working SAVE20 20% discount code',
      'Size selector & slide-over cart',
      'Live search & simulated checkout',
    ],
    previewImage: '/src/assets/images/demo_veloura_fashion_1795708681921.jpg',
    previewComponent: VelouraStoreDemo,
  },
  {
    id: 'lumiere-clinic',
    title: 'Lumière Clinic & Spa',
    niche: 'Booking Engine & Admin Panel',
    tier: 'dynamic',
    priceInr: 18999,
    priceUsd: 499,
    turnaround: '7–12 Days',
    summary:
      'Real-time appointment scheduler with live time-slot locking paired with a synced Admin Terminal to complete or cancel slots dynamically.',
    interactiveHighlight: 'Live Slot Picker + Synced Admin Tab',
    features: [
      'Real-time time-slot lock & unlock',
      'Built-in Admin Operations tab',
      'Live pipeline & status controls',
    ],
    previewImage: '/src/assets/images/demo_lumiere_spa_1795708681306.jpg',
    previewComponent: LumiereClinicDemo,
  },
  {
    id: 'aether-cloud',
    title: 'Aether Cloud SaaS',
    niche: 'Interactive 3D & ROI Simulator',
    tier: 'super',
    priceInr: 32999,
    priceUsd: 899,
    turnaround: '2–3 Weeks',
    summary:
      'Next-gen SaaS launchpad powered by a live interactive Three.js 3D obsidian crystal, 3D pointer-tracking tilt cards, and a live ROI revenue calculator.',
    interactiveHighlight: 'Live Three.js 3D + Tilt Cards + ROI',
    features: [
      'Interactive 60fps Three.js 3D WebGL hero',
      '3D mouse-tracking telemetry tilt cards',
      'Live sliders ROI & annual billing',
    ],
    isInteractive3D: true,
    previewImage: '/src/assets/images/demo_aether_3d_1795708681261.jpg',
    previewComponent: AetherCloudDemo,
  },
  {
    id: 'pulseops-ai',
    title: 'PulseOps AI Command',
    niche: 'AI Dashboard & Analytics Suite',
    tier: 'super',
    priceInr: 36999,
    priceUsd: 999,
    turnaround: '2–3 Weeks',
    summary:
      'Executive AI intelligence dashboard with scoped Dark/Light theme switching, interactive 7D/30D/90D SVG charts, AI Copilot insights, and workflow switches.',
    interactiveHighlight: 'Charts + AI Copilot + Theme Toggle',
    features: [
      'Scoped Dark / Light theme switch',
      'Interactive 7D/30D/90D SVG charts',
      'AI Copilot & live pipeline switches',
    ],
    previewImage: '/src/assets/images/demo_pulseops_dashboard_1795713210844.jpg',
    previewComponent: PulseOpsAiDemo,
  },
];
