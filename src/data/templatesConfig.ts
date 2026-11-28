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
  label: string;
  shortLabel: string;
  accent: 'amber' | 'cyan' | 'pink';
}

export interface TemplateItem {
  id: string;
  title: string;
  niche: string;
  tier: TemplateTierId;
  priceInr: number;
  priceLabel: string;
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
    label: 'Luxury Brand',
    shortLabel: 'Luxury',
    accent: 'amber',
  },
  {
    id: 'dynamic',
    label: 'Booking & Store',
    shortLabel: 'Booking & Store',
    accent: 'cyan',
  },
  {
    id: 'super',
    label: 'SaaS & 3D',
    shortLabel: 'SaaS & 3D',
    accent: 'pink',
  },
];

export const TEMPLATE_CATALOG: TemplateItem[] = [
  {
    id: 'atelier-vesper',
    title: 'Atelier Vesper Studio',
    niche: 'Luxury Architecture & Interiors',
    tier: 'standard',
    priceInr: 50000,
    priceLabel: 'From ₹50,000',
    turnaround: '1–2 Weeks',
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
    priceInr: 50000,
    priceLabel: 'From ₹50,000',
    turnaround: '1–2 Weeks',
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
    priceInr: 60000,
    priceLabel: 'From ₹60,000',
    turnaround: '2–3 Weeks',
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
    priceInr: 40000,
    priceLabel: 'From ₹40,000',
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
    priceInr: 250000,
    priceLabel: 'From ₹2,50,000',
    turnaround: '4–8 Weeks',
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
    priceInr: 250000,
    priceLabel: 'From ₹2,50,000',
    turnaround: '4–8 Weeks',
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
