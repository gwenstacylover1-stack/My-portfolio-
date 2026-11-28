import {
  Building2,
  Car,
  GraduationCap,
  HeartPulse,
  Landmark,
  LampCeiling,
  Rocket,
  ShoppingBag,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

export type IndustryId =
  | 'real-estate'
  | 'healthcare'
  | 'ecommerce'
  | 'lighting'
  | 'hospitality'
  | 'finance'
  | 'education'
  | 'automotive'
  | 'saas';

export interface IndustryDefinition {
  id: IndustryId;
  label: string;
  shortTag: string;
  brandName: string;
  icon: LucideIcon;
  accent: string;
}

export interface IndustryDemoProps {
  isMobileViewport: boolean;
  inquiryHref: string;
}

export const INDUSTRY_CATALOG: IndustryDefinition[] = [
  {
    id: 'real-estate',
    label: 'Real Estate, Builders & Interior Design Studios',
    shortTag: 'Real Estate & Interiors',
    brandName: 'Aurelia Estates & Interiors',
    icon: Building2,
    accent: 'text-[#00F0FF]',
  },
  {
    id: 'healthcare',
    label: 'Hospitals, Dental Clinics & Healthcare Practices',
    shortTag: 'Healthcare & Dental',
    brandName: 'PranaCare Multispecialty & Dental',
    icon: HeartPulse,
    accent: 'text-emerald-300',
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce, D2C Brands & Retail Stores',
    shortTag: 'E-Commerce & D2C',
    brandName: 'Kora Essentials D2C',
    icon: ShoppingBag,
    accent: 'text-sky-300',
  },
  {
    id: 'lighting',
    label: 'Decorative Lighting, Home Decor & Architecture',
    shortTag: 'Architectural Lighting',
    brandName: 'Lumina Atelier Lighting',
    icon: LampCeiling,
    accent: 'text-amber-300',
  },
  {
    id: 'hospitality',
    label: 'Restaurants, Hotels, Cafes & Salons',
    shortTag: 'Fine Dining & Hospitality',
    brandName: 'Saffron & Ember Dining',
    icon: UtensilsCrossed,
    accent: 'text-rose-300',
  },
  {
    id: 'finance',
    label: 'Finance, Accounting, Tax & Legal Firms',
    shortTag: 'Finance, Tax & Legal',
    brandName: 'Vanguard & Co. Advisory',
    icon: Landmark,
    accent: 'text-indigo-300',
  },
  {
    id: 'education',
    label: 'Education, Coaching Institutes & Online Courses',
    shortTag: 'Education & EdTech',
    brandName: 'Apex Scholars Academy',
    icon: GraduationCap,
    accent: 'text-violet-300',
  },
  {
    id: 'automotive',
    label: 'Automotive Dealerships, Service Centers & Logistics',
    shortTag: 'Automotive & Service',
    brandName: 'Apex Motors & Service Hub',
    icon: Car,
    accent: 'text-cyan-300',
  },
  {
    id: 'saas',
    label: 'Startups, SaaS & Digital Marketing Agencies',
    shortTag: 'SaaS & AI Growth',
    brandName: 'Kinetic AI Labs',
    icon: Rocket,
    accent: 'text-fuchsia-300',
  },
];
