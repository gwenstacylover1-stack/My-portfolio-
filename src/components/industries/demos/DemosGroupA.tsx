import { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  HeartPulse,
  MapPin,
  Minus,
  PhoneCall,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Stethoscope,
  Tag,
  X,
} from 'lucide-react';
import villaSolarisImg from '../../../assets/images/demo_atelier_interior_1795708679883.jpg';
import aureliaPenthouseImg from '../../../assets/images/atelier_penthouse_1795713192689.jpg';
import casaVerbenaImg from '../../../assets/images/atelier_verbena_1795713194214.jpg';
import monolithRidgeImg from '../../../assets/images/atelier_monolith_1795713196479.jpg';
import clinicHeroImg from '../../../assets/images/demo_lumiere_spa_1795708681306.jpg';
import clinicDiagnosticsImg from '../../../assets/images/lumiere_skin_mapping_1795713208812.jpg';
import koraHeroImg from '../../../assets/images/demo_veloura_fashion_1795708681921.jpg';
import koraTeeImg from '../../../assets/images/veloura_shell_jacket_1795713196482.jpg';
import koraOvershirtImg from '../../../assets/images/veloura_overshirt_1795713198951.jpg';
import koraSlingImg from '../../../assets/images/veloura_sling_bag_1795713198834.jpg';
import koraRunnerImg from '../../../assets/images/veloura_trail_sneaker_1795713197292.jpg';
import { DemoImage } from '../DemoImage';
import type { IndustryDemoProps } from '../industryCatalog';

const AURELIA_HERO_PHOTO =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

/* ============================================================================
   1. REAL ESTATE, BUILDERS & INTERIOR DESIGN — "Aurelia Estates & Interiors"
   ============================================================================ */

type PropertyFilter = 'Luxury Villas' | 'Penthouses' | 'Interior Turnkey';

const AURELIA_PROPERTIES = [
  {
    id: 'solaris',
    category: 'Luxury Villas' as const,
    name: 'Villa Solaris Pavilion',
    location: 'Jubilee Hills, Hyderabad',
    priceCr: 12.4,
    area: '7,400 sq ft',
    beds: '5 BHK · Infinity Pool',
    image: villaSolarisImg,
  },
  {
    id: 'veranda',
    category: 'Luxury Villas' as const,
    name: 'The Courtyard Manor',
    location: 'Whitefield, Bengaluru',
    priceCr: 8.9,
    area: '5,800 sq ft',
    beds: '4 BHK · Private Lawn',
    image: casaVerbenaImg,
  },
  {
    id: 'skyline',
    category: 'Penthouses' as const,
    name: 'Aurelia Sky Penthouse',
    location: 'Worli Sea Face, Mumbai',
    priceCr: 24.5,
    area: '6,200 sq ft',
    beds: '4 BHK · 270° Sea Deck',
    image: aureliaPenthouseImg,
  },
  {
    id: 'cloud',
    category: 'Penthouses' as const,
    name: 'Crestline Duplex Crown',
    location: 'Banjara Hills, Hyderabad',
    priceCr: 14.2,
    area: '4,950 sq ft',
    beds: '4 BHK · Private Lift',
    image: monolithRidgeImg,
  },
  {
    id: 'travertine',
    category: 'Interior Turnkey' as const,
    name: 'Travertine & Walnut Residence',
    location: 'Turnkey Design + Build',
    priceCr: 1.85,
    area: '4,200 sq ft',
    beds: '14-Week Delivery',
    image: villaSolarisImg,
  },
  {
    id: 'monolith',
    category: 'Interior Turnkey' as const,
    name: 'Bespoke Penthouse Atelier',
    location: 'Italian Marble & Automation',
    priceCr: 2.4,
    area: '5,500 sq ft',
    beds: '18-Week Delivery',
    image: aureliaPenthouseImg,
  },
];

export function RealEstateDemo({ isMobileViewport }: IndustryDemoProps) {
  const [activeTab, setActiveTab] = useState<PropertyFilter>('Luxury Villas');
  const [budgetLakhs, setBudgetLakhs] = useState(450); // ₹4.5 Cr
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('Villa Solaris Pavilion');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('2026-12-04');
  const [visitConfirmed, setVisitConfirmed] = useState(false);

  const visibleProperties = AURELIA_PROPERTIES.filter(
    (p) => p.category === activeTab,
  );

  // Monthly EMI calculation (8.65% p.a.)
  const principal = budgetLakhs * 100000 * (1 - downPaymentPct / 100);
  const monthlyRate = 8.65 / 12 / 100;
  const months = tenureYears * 12;
  const emi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1),
  );

  const openVisit = (propertyName: string) => {
    setSelectedProperty(propertyName);
    setVisitConfirmed(false);
    setVisitModalOpen(true);
  };

  return (
    <div className="min-h-full bg-[#FAF8F5] text-[#18181B]">
      {/* Luxury Editorial Navbar */}
      <header className="sticky top-0 z-20 border-b border-[#18181B]/10 bg-[#FAF8F5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181B] text-[#C5A059]">
              <Building2 className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Aurelia Estates &amp; Interiors
            </span>
          </div>

          {!isMobileViewport && (
            <nav className="hidden items-center gap-6 text-xs font-medium text-[#52525B] md:flex">
              <span>Residences</span>
              <span>Turnkey Interiors</span>
              <span>EMI Planner</span>
              <span>Clientele</span>
            </nav>
          )}

          <button
            type="button"
            onClick={() => openVisit('Private Portfolio Tour')}
            className="rounded-lg bg-[#18181B] px-4 py-2 text-xs font-semibold text-[#FAF8F5] transition-colors hover:bg-[#27272A] cursor-pointer whitespace-nowrap"
          >
            Book Site Visit
          </button>
        </div>
      </header>

      {/* Editorial Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-5 sm:pt-12 sm:pb-12">
        <div
          className={`grid items-center gap-6 sm:gap-8 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          <div className={isMobileViewport ? '' : 'lg:col-span-6'}>
            <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#A4813E] uppercase sm:text-xs">
              Architectural Real Estate &amp; Bespoke Interiors
            </p>
            <h1 className="text-[26px] font-bold tracking-tight text-[#18181B] leading-[1.12] sm:text-4xl lg:text-5xl">
              Residences crafted in stone, light, and enduring value.
            </h1>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#52525B]">
              Curated luxury villas, private sky penthouses, and turnkey
              architectural interiors across Hyderabad, Mumbai, and Bengaluru.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openVisit('Villa Solaris Pavilion')}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#18181B] px-4 text-xs font-semibold text-[#FAF8F5] hover:bg-[#27272A] cursor-pointer sm:px-5"
              >
                <span>Book Private Site Visit</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A059]" />
              </button>
              <span className="text-xs font-medium text-[#71717A] tabular-nums">
                ₹2,400 Cr+ Delivered · RERA Certified
              </span>
            </div>
          </div>

          <div className={isMobileViewport ? '' : 'lg:col-span-6'}>
            <div className="group relative overflow-hidden rounded-2xl border border-[#C5A059]/35 bg-[#181512] text-[#FAF8F5] shadow-2xl">
              <div className="relative h-48 w-full sm:h-72">
                <DemoImage
                  src={AURELIA_HERO_PHOTO}
                  fallbackSrc={villaSolarisImg}
                  alt="Villa Solaris luxury architectural estate in Jubilee Hills"
                  fallbackTheme="warm"
                  className="h-full w-full"
                  imgClassName="brightness-105 contrast-[1.03] group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#181512] via-[#181512]/60 to-transparent"
                />
                <span className="absolute top-3.5 left-3.5 rounded-full border border-[#C5A059]/50 bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#E5C787] uppercase backdrop-blur-md">
                  Flagship Release · 2026
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 p-5 sm:px-6 sm:py-5">
                <div>
                  <p className="text-base font-bold text-[#FAF8F5] sm:text-lg">
                    Villa Solaris — Jubilee Hills
                  </p>
                  <p className="mt-0.5 text-xs text-[#D4C7B4]">
                    7,400 sq ft · Travertine &amp; Infinity Pool
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] text-[#D4C7B4]">Starting Price</p>
                  <p className="text-base font-bold text-[#E5C787] tabular-nums sm:text-lg">
                    ₹12.4 Cr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Property Showcase */}
      <section className="mx-auto max-w-6xl border-t border-[#18181B]/10 px-5 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A4813E] uppercase">
              Curated Residences
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#18181B]">
              Explore Available Inventory
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#18181B]/10 bg-[#EFEAE2] p-1">
            {(['Luxury Villas', 'Penthouses', 'Interior Turnkey'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#18181B] text-[#FAF8F5] shadow-sm'
                      : 'text-[#52525B] hover:text-[#18181B]'
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        <div
          className={`mt-6 grid gap-5 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {visibleProperties.map((prop) => (
            <div
              key={prop.id}
              className="group overflow-hidden rounded-2xl border border-[#18181B]/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-56 w-full overflow-hidden text-[#FAF8F5]">
                <DemoImage
                  src={prop.image}
                  fallbackSrc={villaSolarisImg}
                  alt={`${prop.name} — ${prop.location}`}
                  fallbackTheme="warm"
                  className="h-full w-full"
                  imgClassName="group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20"
                />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[11px]">
                  <span className="rounded-full border border-[#C5A059]/45 bg-black/50 px-2.5 py-0.5 font-semibold text-[#E5C787] backdrop-blur-sm">
                    {prop.category}
                  </span>
                  <span className="rounded-full bg-black/50 px-2.5 py-0.5 font-semibold tabular-nums text-[#E5C787] backdrop-blur-sm">
                    {prop.area}
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-lg font-bold text-white drop-shadow-sm">
                    {prop.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-[#E5DDD2]">
                    <MapPin className="h-3.5 w-3.5 text-[#E5C787]" />
                    {prop.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-xs text-[#71717A]">{prop.beds}</p>
                  <p className="text-base font-bold text-[#18181B] tabular-nums">
                    ₹{prop.priceCr.toFixed(2)} Cr
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openVisit(prop.name)}
                  className="rounded-lg bg-[#18181B] px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] hover:bg-[#27272A] cursor-pointer whitespace-nowrap"
                >
                  Book Private Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive EMI / Budget Estimator */}
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-2xl border border-[#C5A059]/25 bg-[#18181B] p-6 text-[#FAF8F5] sm:p-8">
          <div
            className={`grid gap-6 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A059] uppercase">
                Financial Planning Tool
              </p>
              <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                Interactive EMI &amp; Budget Estimator
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300">Property Budget</span>
                    <span className="font-bold text-[#E5C787] tabular-nums">
                      ₹{(budgetLakhs / 100).toFixed(2)} Cr
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={2500}
                    step={25}
                    value={budgetLakhs}
                    onChange={(e) => setBudgetLakhs(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#C5A059]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300">Down Payment</span>
                    <span className="font-bold text-[#E5C787] tabular-nums">
                      {downPaymentPct}% (₹
                      {((budgetLakhs * downPaymentPct) / 10000).toFixed(2)} Cr)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#C5A059]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300">Loan Tenure (8.65% p.a.)</span>
                    <span className="font-bold text-[#E5C787] tabular-nums">
                      {tenureYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={5}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#C5A059]"
                  />
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col justify-between rounded-xl border border-[#C5A059]/25 bg-white/[0.04] p-5 ${
                isMobileViewport ? '' : 'lg:col-span-5'
              }`}
            >
              <div>
                <p className="text-xs text-zinc-400">Estimated Monthly EMI</p>
                <p className="mt-1 text-3xl font-bold text-[#E5C787] tabular-nums">
                  ₹{emi.toLocaleString('en-IN')}
                </p>
                <p className="mt-2 text-xs text-zinc-400 tabular-nums">
                  Loan Amount: ₹{(principal / 10000000).toFixed(2)} Cr across{' '}
                  {months} monthly installments.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openVisit(
                    `Budget ₹${(budgetLakhs / 100).toFixed(2)} Cr Consultation`,
                  )
                }
                className="mt-5 min-h-[44px] w-full rounded-lg bg-[#C5A059] px-4 text-xs font-bold text-[#18181B] hover:bg-[#D4B16B] cursor-pointer"
              >
                Schedule Private Walkthrough
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials Footer */}
      <footer className="border-t border-[#18181B]/10 bg-[#F2ECE3] px-5 pt-8 pb-20 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-xs font-medium text-[#52525B]">
            <Award className="h-4 w-4 text-[#A4813E]" />
            <span>
              &ldquo;Seamless site tour to turnkey handover in 16 weeks.&rdquo; —
              Vikram &amp; Meera Reddy
            </span>
          </div>
          <p className="text-xs text-[#71717A]">
            © 2026 Aurelia Estates &amp; Interiors · Hyderabad · Mumbai · Bengaluru
          </p>
        </div>
      </footer>

      {/* Working Book Private Site Visit Modal */}
      {visitModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={() => setVisitModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-[#C5A059]/30 bg-[#FAF8F5] p-6 text-[#18181B] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-[#A4813E] uppercase">
                  Private Concierge
                </p>
                <h4 className="mt-1 text-lg font-bold">
                  Book Private Site Visit
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setVisitModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#18181B]/15 text-[#52525B] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {visitConfirmed ? (
              <div className="mt-5 rounded-xl border border-emerald-600/25 bg-emerald-50 p-4 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                <p className="mt-2 text-sm font-bold text-emerald-950">
                  Private Visit Confirmed
                </p>
                <p className="mt-1 text-xs text-emerald-800">
                  Thank you, {visitorName || 'Guest'}. Your chauffeur-assisted
                  visit for <strong>{selectedProperty}</strong> on{' '}
                  <span className="tabular-nums">{visitDate}</span> is scheduled.
                </p>
                <button
                  type="button"
                  onClick={() => setVisitModalOpen(false)}
                  className="mt-4 rounded-lg bg-[#18181B] px-5 py-2 text-xs font-semibold text-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVisitConfirmed(true);
                }}
                className="mt-4 space-y-3"
              >
                <div className="rounded-lg bg-[#EFEAE2] px-3 py-2 text-xs font-medium text-[#18181B]">
                  Property: <strong>{selectedProperty}</strong>
                </div>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Full Name"
                  className="min-h-[42px] w-full rounded-lg border border-[#18181B]/15 bg-white px-3 text-xs focus:border-[#C5A059] focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  placeholder="WhatsApp / Mobile Number"
                  className="min-h-[42px] w-full rounded-lg border border-[#18181B]/15 bg-white px-3 text-xs focus:border-[#C5A059] focus:outline-none"
                />
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="min-h-[42px] w-full rounded-lg border border-[#18181B]/15 bg-white px-3 text-xs focus:border-[#C5A059] focus:outline-none"
                />
                <button
                  type="submit"
                  className="min-h-[44px] w-full rounded-lg bg-[#18181B] text-xs font-semibold text-[#FAF8F5] hover:bg-[#27272A] cursor-pointer"
                >
                  Confirm Private Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   2. HOSPITALS, DENTAL CLINICS & HEALTHCARE — "PranaCare Multispecialty & Dental"
   ============================================================================ */

type Department = 'Cardiology' | 'Dental' | 'Orthopedics' | 'Diagnostics';

const DOCTORS = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Rao, MD',
    department: 'Cardiology' as const,
    exp: '16 Yrs · Interventional Cardiology',
    fee: 900,
    slots: ['09:30 AM', '11:00 AM', '04:30 PM', '06:00 PM'],
  },
  {
    id: 'dr-kabir',
    name: 'Dr. Kabir Menon, MDS',
    department: 'Dental' as const,
    exp: '12 Yrs · Cosmetic & Implantology',
    fee: 700,
    slots: ['10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM'],
  },
  {
    id: 'dr-siddharth',
    name: 'Dr. Siddharth Verma, MS',
    department: 'Orthopedics' as const,
    exp: '18 Yrs · Robotic Joint Care',
    fee: 850,
    slots: ['10:30 AM', '01:00 PM', '04:00 PM', '06:30 PM'],
  },
  {
    id: 'dr-nisha',
    name: 'Dr. Nisha Kulkarni, MD',
    department: 'Diagnostics' as const,
    exp: '14 Yrs · 3T MRI & Preventive Labs',
    fee: 600,
    slots: ['08:00 AM', '09:30 AM', '11:30 AM', '02:30 PM'],
  },
];

export function HealthcareDemo({ isMobileViewport }: IndustryDemoProps) {
  const [department, setDepartment] = useState<Department>('Dental');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('dr-kabir');
  const [selectedDate, setSelectedDate] = useState('2026-12-02');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [patientName, setPatientName] = useState('');
  const [bookingToken, setBookingToken] = useState<string | null>(null);

  const deptDoctors = DOCTORS.filter((d) => d.department === department);
  const activeDoctor =
    DOCTORS.find((d) => d.id === selectedDoctorId) ?? deptDoctors[0];

  const handleSelectDept = (dept: Department) => {
    setDepartment(dept);
    const first = DOCTORS.find((d) => d.department === dept);
    if (first) {
      setSelectedDoctorId(first.id);
      setSelectedSlot(first.slots[0]);
    }
    setBookingToken(null);
  };

  return (
    <div className="min-h-full bg-white text-slate-900">
      {/* 24/7 Emergency Helpline Banner */}
      <div className="bg-[#0D9488] px-4 py-2 text-center text-xs font-semibold text-white">
        <span className="inline-flex flex-wrap items-center justify-center gap-2">
          <PhoneCall className="h-3.5 w-3.5" />
          <span>24/7 Emergency &amp; Trauma Helpline: +91 00000 00000</span>
          <span className="hidden sm:inline opacity-80">
            · Cardiac Ambulance Dispatch &lt; 12 Mins
          </span>
        </span>
      </div>

      {/* Clinical Header */}
      <header className="sticky top-0 z-20 border-b border-teal-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D9488] text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight text-slate-900">
                PranaCare
              </p>
              <p className="text-[11px] font-medium text-[#0D9488]">
                Multispecialty &amp; Dental
              </p>
            </div>
          </div>

          {!isMobileViewport && (
            <nav className="hidden items-center gap-6 text-xs font-medium text-slate-600 md:flex">
              <span>Departments</span>
              <span>Specialists</span>
              <span>Diagnostics</span>
              <span>Insurance Desk</span>
            </nav>
          )}

          <a
            href="#pranacare-book"
            className="rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0F766E] whitespace-nowrap"
          >
            Book Appointment
          </a>
        </div>
      </header>

      {/* Clinical Hero */}
      <section className="bg-gradient-to-b from-[#F0FDFA] to-white px-4 pt-6 pb-8 sm:px-5 sm:pt-10 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <div
            className={`grid items-center gap-6 sm:gap-8 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#0F766E] uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                Demo Care Standard · Cashless TPA Supported
              </span>
              <h1 className="text-[26px] font-bold tracking-tight text-slate-900 leading-[1.12] sm:text-4xl lg:text-5xl">
                Precision multispecialty care &amp; painless dentistry.
              </h1>
              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                Book verified senior consultants, digital dental implants, and
                same-day NABL diagnostics with instant live token confirmation.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  { v: '45+', l: 'Senior Doctors' },
                  { v: '98.9%', l: 'Patient Trust' },
                  { v: '15 Min', l: 'Avg. Wait Time' },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    className="rounded-xl border border-teal-100 bg-white p-3"
                  >
                    <p className="text-base font-bold text-[#0D9488] tabular-nums sm:text-lg">
                      {stat.v}
                    </p>
                    <p className="text-[11px] text-slate-500">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
              <div className="overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-lg shadow-teal-900/5">
                <div className="relative h-48 w-full sm:h-60">
                  <DemoImage
                    src={clinicHeroImg}
                    fallbackSrc={clinicDiagnosticsImg}
                    alt="PranaCare Multispecialty & Dental clinical suite"
                    fallbackTheme="light"
                    className="h-full w-full"
                    imgClassName="brightness-105 contrast-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#0F766E] shadow-sm">
                    ISO Sterile Clinical &amp; Dental Suites
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#0D9488]">
                      <Stethoscope className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#0D9488]">
                        Next Available OPD
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {activeDoctor.name}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">{activeDoctor.exp}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="text-slate-500">Consultation Fee</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ₹{activeDoctor.fee}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Department Filter + Doctor Appointment Slot Picker */}
      <section id="pranacare-book" className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
              Live OPD Scheduler
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Select Department &amp; Time Slot
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl bg-[#F0FDFA] p-1 border border-teal-100">
            {(['Cardiology', 'Dental', 'Orthopedics', 'Diagnostics'] as const).map(
              (dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => handleSelectDept(dept)}
                  className={`min-h-[38px] rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer ${
                    department === dept
                      ? 'bg-[#0D9488] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {dept}
                </button>
              ),
            )}
          </div>
        </div>

        <div
          className={`mt-6 grid gap-6 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* Doctor Card */}
          <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
            {deptDoctors.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl border border-teal-200 bg-[#F0FDFA]/60 p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#0F766E] border border-teal-200">
                    {doc.department}
                  </span>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    ₹{doc.fee} OPD
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {doc.name}
                </h3>
                <p className="mt-1 text-xs text-slate-600">{doc.exp}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Accepting live bookings today
                </p>
              </div>
            ))}
          </div>

          {/* Slot Picker & Instant Token Confirmation */}
          <div
            className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${
              isMobileViewport ? '' : 'lg:col-span-7'
            }`}
          >
            {bookingToken ? (
              <div className="rounded-xl border border-teal-200 bg-[#F0FDFA] p-5 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-[#0D9488]" />
                <p className="mt-2 text-xs font-semibold tracking-wider text-[#0F766E] uppercase">
                  Appointment Confirmed
                </p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900 tabular-nums">
                  Token #{bookingToken}
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Patient: <strong>{patientName || 'Walk-in Patient'}</strong> ·{' '}
                  {activeDoctor.name} ·{' '}
                  <span className="tabular-nums">
                    {selectedDate} at {selectedSlot}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setBookingToken(null)}
                  className="mt-4 rounded-lg border border-teal-300 bg-white px-4 py-2 text-xs font-semibold text-[#0F766E] cursor-pointer"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const token = `PC-${Math.floor(100 + Math.random() * 899)}`;
                  setBookingToken(token);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g., Priya Sharma"
                      className="min-h-[42px] w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#0D9488] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="min-h-[42px] w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#0D9488] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <Clock className="h-3.5 w-3.5 text-[#0D9488]" />
                    Available Time Slots
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {activeDoctor.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`min-h-[38px] rounded-lg border text-xs font-semibold transition-colors cursor-pointer tabular-nums ${
                          selectedSlot === slot
                            ? 'border-[#0D9488] bg-[#0D9488] text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="min-h-[44px] w-full rounded-lg bg-[#0D9488] text-xs font-bold text-white hover:bg-[#0F766E] cursor-pointer"
                >
                  Confirm Appointment &amp; Generate Instant Token
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-slate-50 px-5 pt-7 pb-20 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 sm:flex-row sm:items-center text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            4.9/5 Google Rating across 3,400+ verified patient visits
          </span>
          <span>© 2026 PranaCare Multispecialty &amp; Dental Hospital</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   3. E-COMMERCE, D2C BRANDS & RETAIL — "Kora Essentials D2C"
   ============================================================================ */

type KoraCategory = 'All' | 'Apparel' | 'Carry' | 'Footwear';

const KORA_PRODUCTS = [
  {
    id: 'heavy-tee',
    name: '280 GSM Heavyweight Box Tee',
    category: 'Apparel' as const,
    price: 1899,
    variants: ['S', 'M', 'L', 'XL'],
    image: koraTeeImg,
    tag: 'Bestseller',
  },
  {
    id: 'tech-overshirt',
    name: 'Water-Repellent Modular Overshirt',
    category: 'Apparel' as const,
    price: 4299,
    variants: ['M', 'L', 'XL'],
    image: koraOvershirtImg,
    tag: 'New Drop',
  },
  {
    id: 'metro-sling',
    name: 'Cordura Everyday Crossbody Sling',
    category: 'Carry' as const,
    price: 2999,
    variants: ['Obsidian', 'Ash', 'Olive'],
    image: koraSlingImg,
    tag: 'Limited',
  },
  {
    id: 'mono-runner',
    name: 'Kora Kinetic Knit Runner',
    category: 'Footwear' as const,
    price: 5499,
    variants: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    image: koraRunnerImg,
    tag: 'Top Rated',
  },
];

interface CartLine {
  key: string;
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
}

export function EcommerceDemo({ isMobileViewport }: IndustryDemoProps) {
  const [category, setCategory] = useState<KoraCategory>('All');
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({
    'heavy-tee': 'M',
    'tech-overshirt': 'L',
    'metro-sling': 'Obsidian',
    'mono-runner': 'UK 9',
  });
  const [cart, setCart] = useState<CartLine[]>([
    {
      key: 'heavy-tee-M',
      id: 'heavy-tee',
      name: '280 GSM Heavyweight Box Tee',
      variant: 'M',
      price: 1899,
      qty: 1,
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card'>('UPI');
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  const visibleProducts =
    category === 'All'
      ? KORA_PRODUCTS
      : KORA_PRODUCTS.filter((p) => p.category === category);

  const addToCart = (product: (typeof KORA_PRODUCTS)[number]) => {
    const variant = selectedVariant[product.id] ?? product.variants[0];
    const key = `${product.id}-${variant}`;
    setOrderPlacedId(null);
    setCart((prev) => {
      const exists = prev.find((item) => item.key === key);
      if (exists) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [
        ...prev,
        { key, id: product.id, name: product.name, variant, price: product.price, qty: 1 },
      ];
    });
    setCartOpen(true);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discount);
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'WELCOME15') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoApplied(false);
      setPromoError(true);
    }
  };

  return (
    <div className="relative min-h-full bg-white text-[#09090B]">
      {/* Promo Ribbon */}
      <div className="bg-[#09090B] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-white">
        FREE EXPRESS SHIPPING OVER ₹2,499 · USE CODE{' '}
        <span className="font-bold text-amber-300">WELCOME15</span> FOR 15% OFF
      </div>

      {/* Storefront Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <span className="text-base font-extrabold tracking-[0.14em] uppercase">
            KORA ESSENTIALS
          </span>

          {!isMobileViewport && (
            <nav className="hidden items-center gap-6 text-xs font-semibold text-zinc-600 md:flex">
              <span>New Arrivals</span>
              <span>Apparel</span>
              <span>Everyday Carry</span>
              <span>Footwear</span>
            </nav>
          )}

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-[#09090B] px-4 text-xs font-semibold text-white hover:bg-zinc-800 cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Bag</span>
            <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#09090B] tabular-nums">
              {totalCount}
            </span>
          </button>
        </div>
      </header>

      {/* Bold Retail Hero — Seamless Photo-to-Text Blend */}
      <section className="mx-auto max-w-6xl px-4 pt-5 pb-6 sm:px-5 sm:pt-8 sm:pb-8">
        <div className="overflow-hidden rounded-3xl bg-[#09090B] text-white shadow-xl">
          <div className="relative h-48 w-full sm:h-72">
            <DemoImage
              src={koraHeroImg}
              fallbackSrc={koraTeeImg}
              alt="Kora Essentials Season 04 technical streetwear lookbook"
              fallbackTheme="dark"
              className="h-full w-full"
              imgClassName="brightness-105 contrast-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent"
            />
          </div>
          <div className="relative z-10 -mt-3 p-5 pt-2 sm:p-8 sm:pt-3">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
              Season 04 · Direct-to-Consumer Capsule
            </p>
            <h1 className="max-w-2xl text-[26px] font-extrabold tracking-tight leading-[1.12] sm:text-4xl">
              Engineered essentials built for daily movement.
            </h1>
            <p className="mt-2.5 line-clamp-3 max-w-xl text-sm leading-relaxed text-zinc-300">
              Zero middleman markups. 48-hour pan-India delivery with instant UPI
              checkout and 14-day no-questions exchanges.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#kora-collection"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-white px-4 text-xs font-bold text-[#09090B] transition-colors hover:bg-zinc-200"
              >
                <span>Shop Capsule</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="text-[11px] font-medium text-zinc-400">
                Code WELCOME15 · 15% Off
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Product Grid */}
      <section id="kora-collection" className="mx-auto max-w-6xl px-4 pb-10 sm:px-5 sm:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Shop Featured Collection</h2>
          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Apparel', 'Carry', 'Footwear'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`min-h-[36px] rounded-full px-4 text-xs font-semibold transition-colors cursor-pointer ${
                  category === cat
                    ? 'bg-[#09090B] text-white'
                    : 'border border-zinc-200 text-zinc-600 hover:border-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`mt-6 grid gap-5 ${
            isMobileViewport
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {visibleProducts.map((product) => {
            const activeVar =
              selectedVariant[product.id] ?? product.variants[0];
            return (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
                  <DemoImage
                    src={product.image}
                    fallbackSrc={koraHeroImg}
                    alt={`${product.name} — Kora Essentials`}
                    fallbackTheme="dark"
                    className="h-full w-full"
                    imgClassName="brightness-105 contrast-[1.03] group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#09090B]/85 px-2.5 py-0.5 text-[10px] font-semibold text-white uppercase backdrop-blur-sm">
                    {product.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-sm font-bold text-[#09090B]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-base font-extrabold tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>

                  {/* Size / Variant Selector */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.variants.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          setSelectedVariant((prev) => ({
                            ...prev,
                            [product.id]: v,
                          }))
                        }
                        className={`rounded-md border px-2 py-1 text-[11px] font-semibold cursor-pointer ${
                          activeVar === v
                            ? 'border-[#09090B] bg-[#09090B] text-white'
                            : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-4 min-h-[40px] w-full rounded-xl bg-[#09090B] text-xs font-bold text-white hover:bg-zinc-800 cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-50 px-5 pt-7 pb-20 text-xs text-zinc-500 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span>Trusted by 48,000+ D2C shoppers · UPI, Cards &amp; COD</span>
          <span>© 2026 Kora Essentials D2C</span>
        </div>
      </footer>

      {/* Slide-Over Cart Drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[60] flex justify-end bg-black/55 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-sm flex-col bg-white p-5 text-[#09090B] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3.5">
              <h3 className="text-base font-bold">
                Your Bag ({totalCount})
              </h3>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {orderPlacedId ? (
              <div className="my-auto rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-600" />
                <p className="mt-2 text-base font-bold text-emerald-950">
                  Order Confirmed!
                </p>
                <p className="mt-1 text-xs text-emerald-800 tabular-nums">
                  Order #{orderPlacedId} paid via {paymentMethod} · Dispatching
                  in 24 hrs.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderPlacedId(null);
                    setCartOpen(false);
                  }}
                  className="mt-4 rounded-xl bg-[#09090B] px-5 py-2.5 text-xs font-semibold text-white cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto py-4">
                  {cart.length === 0 ? (
                    <p className="py-10 text-center text-xs text-zinc-500">
                      Your shopping bag is empty.
                    </p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            Variant: {item.variant} · ₹
                            {item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateQty(item.key, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.key, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Promo Code WELCOME15 */}
                <div className="border-t border-zinc-200 pt-3.5 space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError(false);
                        }}
                        placeholder="Promo: WELCOME15"
                        className="min-h-[38px] w-full rounded-lg border border-zinc-200 pl-8 pr-2.5 text-xs uppercase focus:border-[#09090B] focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="rounded-lg border border-[#09090B] px-3.5 text-xs font-bold hover:bg-[#09090B] hover:text-white cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <Check className="h-3.5 w-3.5" /> WELCOME15 applied (-15%)
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-600">
                      Try code <strong>WELCOME15</strong> for 15% off.
                    </p>
                  )}

                  {/* Payment Method Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    {(['UPI', 'Card'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`min-h-[36px] rounded-lg border text-xs font-semibold cursor-pointer ${
                          paymentMethod === m
                            ? 'border-[#09090B] bg-[#09090B] text-white'
                            : 'border-zinc-200 text-zinc-600'
                        }`}
                      >
                        Pay via {m}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-zinc-500">
                      <span>Subtotal</span>
                      <span className="tabular-nums">
                        ₹{subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>WELCOME15 (15%)</span>
                        <span className="tabular-nums">
                          -₹{discount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-extrabold pt-1">
                      <span>Total</span>
                      <span className="tabular-nums">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={() => {
                      setOrderPlacedId(
                        `KR${Math.floor(10000 + Math.random() * 89999)}`,
                      );
                      setCart([]);
                    }}
                    className="min-h-[44px] w-full rounded-xl bg-[#09090B] text-xs font-bold text-white hover:bg-zinc-800 disabled:opacity-40 cursor-pointer"
                  >
                    Complete {paymentMethod} Checkout · ₹
                    {total.toLocaleString('en-IN')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
