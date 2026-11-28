import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import apexCampusImg from '../../../assets/images/apex_campus_study_1795797241648.jpg';
import apexEvSuvImg from '../../../assets/images/apex_ev_suv_studio_1795797240314.jpg';
import kineticDashboardImg from '../../../assets/images/demo_pulseops_dashboard_1795713210844.jpg';
import { DemoImage } from '../DemoImage';
import type { IndustryDemoProps } from '../industryCatalog';

/* ============================================================================
   7. EDUCATION, COACHING & ONLINE COURSES — "Apex Scholars Academy"
   ============================================================================ */

type CourseTrack = 'Foundation' | 'Competitive Prep' | 'Skill Bootcamps';

const COURSES = [
  {
    id: 'stem-found',
    track: 'Foundation' as const,
    title: 'Grades 9–10 STEM Mastery & Olympiad Track',
    batch: 'Starts Dec 8 · 6:00 PM IST',
    seatsLeft: 7,
    fee: '₹24,000 / yr',
    syllabus: [
      'Module 1: Conceptual Physics & Visual Mechanics',
      'Module 2: Olympiad Algebra, Number Theory & Geometry',
      'Module 3: Weekly Live Doubt Clinics & Parent Analytics',
    ],
  },
  {
    id: 'jee-neet',
    track: 'Competitive Prep' as const,
    title: 'JEE / NEET Rank Accelerator Cohort',
    batch: 'Starts Dec 12 · Morning & Evening',
    seatsLeft: 4,
    fee: '₹58,000 / yr',
    syllabus: [
      'Module 1: High-Yield Problem Solving & Mock Test Series',
      'Module 2: 1-on-1 Mentor Rank Diagnostics',
      'Module 3: All-India CBT Simulation & Error Logs',
    ],
  },
  {
    id: 'ai-fullstack',
    track: 'Skill Bootcamps' as const,
    title: 'Full-Stack AI Engineering & Career Cohort',
    batch: 'Starts Dec 15 · Weekend Live',
    seatsLeft: 9,
    fee: '₹32,000 · 16 Weeks',
    syllabus: [
      'Module 1: TypeScript, React & Cloud Production Architecture',
      'Module 2: Applied AI Agents, RAG & Real Client Capstone',
      'Module 3: Mock Technical Interviews & Placement Support',
    ],
  },
];

export function EducationDemo({ isMobileViewport }: IndustryDemoProps) {
  const [track, setTrack] = useState<CourseTrack>('Competitive Prep');
  const [openSyllabus, setOpenSyllabus] = useState<string>('jee-neet');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [demoBooked, setDemoBooked] = useState(false);

  const visibleCourses = COURSES.filter((c) => c.track === track);

  return (
    <div className="min-h-full bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-indigo-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5] text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Apex Scholars Academy
            </span>
          </div>
          <a
            href="#apex-demo-form"
            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 whitespace-nowrap"
          >
            Book Free Demo Class
          </a>
        </div>
      </header>

      {/* Academic Hero */}
      <section className="bg-gradient-to-b from-indigo-50/80 to-white px-4 pt-6 pb-8 sm:px-5 sm:pt-10 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <div
            className={`grid items-center gap-6 sm:gap-8 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-amber-800 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                94% Top-Rank &amp; Placement Success Rate
              </span>
              <h1 className="max-w-3xl text-[26px] font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:text-4xl lg:text-5xl">
                Small-batch mentorship that turns ambition into top ranks.
              </h1>
              <p className="mt-2.5 line-clamp-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Live interactive cohorts, structured syllabus roadmaps, and
                weekly 1-on-1 mentor feedback across Foundation, Competitive
                Prep, and industry bootcamps.
              </p>
            </div>

            <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
              <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-[#1E1B4B] shadow-lg shadow-indigo-900/10">
                <div className="relative h-48 w-full sm:h-64">
                  <DemoImage
                    src={apexCampusImg}
                    alt="Apex Scholars Academy modern sunlit campus study atrium"
                    fallbackTheme="light"
                    className="h-full w-full"
                    imgClassName="brightness-105 contrast-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/60 to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-white">
                    <span className="font-semibold">
                      Hybrid Campus &amp; Live Online
                    </span>
                    <span className="rounded-full bg-amber-400 px-2.5 py-0.5 font-bold text-slate-950">
                      12,000+ Alumni
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Track Filter + Expandable Syllabus Accordion */}
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Upcoming Live Batches</h2>
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-indigo-50 p-1">
            {(['Foundation', 'Competitive Prep', 'Skill Bootcamps'] as const).map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTrack(t);
                    const match = COURSES.find((c) => c.track === t);
                    if (match) setOpenSyllabus(match.id);
                  }}
                  className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold cursor-pointer ${
                    track === t
                      ? 'bg-[#4F46E5] text-white'
                      : 'text-slate-600 hover:text-indigo-700'
                  }`}
                >
                  {t}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {visibleCourses.map((course) => {
            const expanded = openSyllabus === course.id;
            return (
              <div
                key={course.id}
                className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-semibold text-[#4F46E5]">
                        {course.batch}
                      </span>
                      <span className="font-semibold text-amber-600 tabular-nums">
                        Only {course.seatsLeft} seats left
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      {course.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold text-[#4F46E5] tabular-nums">
                      {course.fee}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSyllabus(expanded ? '' : course.id)
                      }
                      className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-indigo-200 px-3 text-xs font-semibold text-[#4F46E5] cursor-pointer"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Syllabus</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {expanded && (
                  <div className="border-t border-indigo-100 bg-indigo-50/40 px-5 py-4">
                    <p className="text-[11px] font-bold tracking-wider text-indigo-700 uppercase">
                      Curriculum Roadmap
                    </p>
                    <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
                      {course.syllabus.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4F46E5]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Book Free Demo Class Form */}
      <section id="apex-demo-form" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-2xl bg-[#4F46E5] p-6 text-white sm:p-8">
          <div
            className={`grid items-center gap-6 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-6'}>
              <p className="text-xs font-bold tracking-wider text-amber-300 uppercase">
                Zero-Cost Trial Session
              </p>
              <h3 className="mt-1 text-2xl font-bold">
                Experience a Live Class Before Enrolling
              </h3>
              <p className="mt-1.5 text-xs text-indigo-100">
                Includes a 45-minute live session + free study roadmap PDF for{' '}
                <strong>{track}</strong>.
              </p>
            </div>
            <div className={isMobileViewport ? '' : 'lg:col-span-6'}>
              {demoBooked ? (
                <div className="rounded-xl bg-white/15 p-4 text-xs font-semibold text-white">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className="h-5 w-5 text-amber-300" />
                    Free Demo Class Confirmed!
                  </p>
                  <p className="mt-1 text-indigo-100">
                    Welcome, {studentName}! Join link sent to {studentPhone} for
                    the {track} trial session.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoBooked(true);
                  }}
                  className="grid grid-cols-1 gap-2.5 sm:grid-cols-3"
                >
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student Name"
                    className="min-h-[44px] rounded-xl bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400"
                  />
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="Phone / WhatsApp"
                    className="min-h-[44px] rounded-xl bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] rounded-xl bg-amber-400 px-4 text-xs font-extrabold text-slate-950 hover:bg-amber-300 cursor-pointer"
                  >
                    Reserve Free Seat
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-5 pt-7 pb-20 text-xs text-slate-500 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span>12,000+ Alumni at IITs, AIIMS &amp; Global Tech Companies</span>
          <span>© 2026 Apex Scholars Academy</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   8. AUTOMOTIVE DEALERSHIPS, SERVICE CENTERS & LOGISTICS — "Apex Motors & Service Hub"
   ============================================================================ */

type VehicleType = 'SUV' | 'EV' | 'Sedan';

const VEHICLES = [
  {
    id: 'titan-suv',
    type: 'SUV' as const,
    name: 'Apex Titan AWD Turbo',
    specs: '245 HP · 8-Speed Auto · ADAS Level 2',
    price: '₹24.90 Lakh',
  },
  {
    id: 'volt-ev',
    type: 'EV' as const,
    name: 'Apex Volt GT Dual-Motor EV',
    specs: '580 km Range · 0-100 in 4.2s · 150kW Fast Charge',
    price: '₹28.50 Lakh',
  },
  {
    id: 'strada-sedan',
    type: 'Sedan' as const,
    name: 'Apex Strada Sport RS',
    specs: '210 HP Hybrid · 23.4 km/l · Ventilated Cabin',
    price: '₹19.40 Lakh',
  },
];

const SERVICE_PACKAGES = [
  { id: 'periodic', label: 'Periodic Oil & Filter Service', price: 4499 },
  { id: 'detailing', label: '9H Ceramic Paint Detailing', price: 8999 },
  { id: 'ac-check', label: 'AC Cooling & Cabin Sanitization', price: 2199 },
  { id: 'brake-tire', label: 'Brake Pad & 3D Wheel Alignment', price: 2899 },
];

export function AutomotiveDemo({ isMobileViewport }: IndustryDemoProps) {
  const [vehicleType, setVehicleType] = useState<VehicleType>('EV');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([
    'periodic',
    'ac-check',
  ]);
  const [doorstepPickup, setDoorstepPickup] = useState(true);
  const [regNumber, setRegNumber] = useState('');
  const [serviceDate, setServiceDate] = useState('2026-12-03');
  const [bayBooked, setBayBooked] = useState(false);

  const activeVehicle =
    VEHICLES.find((v) => v.type === vehicleType) ?? VEHICLES[0];

  const togglePackage = (id: string) => {
    setBayBooked(false);
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const serviceTotal =
    SERVICE_PACKAGES.filter((p) => selectedPackages.includes(p.id)).reduce(
      (sum, p) => sum + p.price,
      0,
    ) + (doorstepPickup ? 499 : 0);

  return (
    <div className="min-h-full bg-[#111827] text-[#E5E7EB]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#111827]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DC2626] text-white">
              <Car className="h-4 w-4" />
            </span>
            <span className="text-sm font-extrabold tracking-wide uppercase sm:text-base">
              Apex Motors &amp; Service Hub
            </span>
          </div>
          <a
            href="#apex-service-bay"
            className="rounded-lg bg-[#DC2626] px-4 py-2 text-xs font-bold text-white hover:bg-red-700 whitespace-nowrap"
          >
            Book Service Bay
          </a>
        </div>
      </header>

      {/* Interactive Model Showcase */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-5 sm:pt-10 sm:pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#DC2626] uppercase sm:text-xs">
              2026 Showroom Lineup
            </p>
            <h1 className="text-[26px] font-extrabold tracking-tight text-white leading-[1.12] sm:text-4xl">
              Precision performance &amp; certified service bays.
            </h1>
          </div>

          <div className="flex gap-1.5 rounded-xl border border-white/10 bg-black/35 p-1">
            {(['SUV', 'EV', 'Sedan'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setVehicleType(t)}
                className={`min-h-[38px] rounded-lg px-4 text-xs font-bold cursor-pointer ${
                  vehicleType === t
                    ? 'bg-[#DC2626] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1F2937] via-[#151C2C] to-[#0B0F1A] p-5 sm:mt-6 sm:p-8">
          <div
            className={`grid items-center gap-5 sm:gap-6 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
              <span className="rounded-full bg-[#DC2626]/20 px-3 py-1 text-[10px] font-bold tracking-wider text-red-400 uppercase">
                {activeVehicle.type} Flagship
              </span>
              <h2 className="mt-2.5 text-2xl font-extrabold text-white sm:text-3xl">
                {activeVehicle.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
                {activeVehicle.specs}
              </p>
              <p className="mt-3.5 text-lg font-extrabold text-white tabular-nums sm:text-xl">
                Ex-Showroom {activeVehicle.price}
              </p>
            </div>
            <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
              {/* Dark-Studio Luxury Automotive Showcase Photo */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0B0F1A] shadow-2xl">
                <div className="relative h-48 w-full sm:h-64">
                  <DemoImage
                    src={apexEvSuvImg}
                    alt={`${activeVehicle.name} studio automotive showcase`}
                    fallbackTheme="dark"
                    className="h-full w-full"
                    imgClassName="group-hover:scale-105"
                    imgStyle={{
                      filter:
                        vehicleType === 'EV'
                          ? 'brightness(1.06) contrast(1.06) saturate(1.12)'
                          : vehicleType === 'SUV'
                            ? 'brightness(1.03) contrast(1.1) saturate(0.95)'
                            : 'brightness(1.08) contrast(1.06) hue-rotate(-10deg)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/60 to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px]">
                    <span className="font-semibold tracking-wider text-slate-200 uppercase">
                      Ready for Test Drive · 48-Hr Delivery
                    </span>
                    <span className="rounded-full bg-[#DC2626] px-2.5 py-0.5 font-bold text-white">
                      {activeVehicle.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Service Bay Appointment Booker */}
      <section id="apex-service-bay" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-3xl border border-white/10 bg-[#182032] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase">
            <Wrench className="h-4 w-4" />
            <span>Live Service Bay Appointment Booker</span>
          </div>
          <h3 className="mt-1 text-2xl font-bold text-white">
            Select Service Packages &amp; Pickup Option
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICE_PACKAGES.map((pkg) => {
              const checked = selectedPackages.includes(pkg.id);
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => togglePackage(pkg.id)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    checked
                      ? 'border-[#DC2626] bg-[#DC2626]/12 text-white'
                      : 'border-white/10 bg-black/25 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-xs font-semibold">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        checked
                          ? 'border-[#DC2626] bg-[#DC2626] text-white'
                          : 'border-white/25'
                      }`}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    {pkg.label}
                  </span>
                  <span className="text-xs font-bold tabular-nums">
                    ₹{pkg.price.toLocaleString('en-IN')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2.5 text-xs font-semibold text-white cursor-pointer">
              <input
                type="checkbox"
                checked={doorstepPickup}
                onChange={(e) => {
                  setDoorstepPickup(e.target.checked);
                  setBayBooked(false);
                }}
                className="h-4 w-4 accent-[#DC2626]"
              />
              Doorstep Valet Pickup &amp; Drop (+₹499)
            </label>

            <div className="text-sm font-extrabold text-white tabular-nums">
              Estimated Bill:{' '}
              <span className="text-red-400">
                ₹{serviceTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {bayBooked ? (
            <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Bay #04 Reserved for {regNumber || 'Your Vehicle'}!
              </p>
              <p className="mt-1 tabular-nums">
                Date: {serviceDate} · {selectedPackages.length} service(s) ·{' '}
                {doorstepPickup
                  ? 'Driver pickup scheduled at 9:30 AM.'
                  : 'Direct workshop drop-off.'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBayBooked(true);
              }}
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <input
                type="text"
                required
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                placeholder="Vehicle Reg (e.g., TS09 EX 4021)"
                className="min-h-[44px] rounded-xl border border-white/15 bg-black/35 px-3.5 text-xs text-white placeholder:text-slate-400"
              />
              <input
                type="date"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                className="min-h-[44px] rounded-xl border border-white/15 bg-black/35 px-3.5 text-xs text-white"
              />
              <button
                type="submit"
                disabled={selectedPackages.length === 0}
                className="min-h-[44px] rounded-xl bg-[#DC2626] px-4 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-40 cursor-pointer"
              >
                Confirm Service Bay
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 pt-7 pb-20 text-xs text-slate-400 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span>24/7 Roadside Assistance · OEM Genuine Parts Warranty</span>
          <span>© 2026 Apex Motors &amp; Service Hub</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   9. STARTUPS, SAAS & DIGITAL MARKETING AGENCIES — "Kinetic AI Labs"
   ============================================================================ */

const SAAS_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 14999,
    annual: 11999,
    features: ['50,000 Monthly Visitors', 'AI Lead Capture Widget', 'CRM Webhook Sync'],
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 34999,
    annual: 27999,
    popular: true,
    features: [
      '250,000 Monthly Visitors',
      'Autonomous Funnel Scoring',
      'WhatsApp + Slack Alerts',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: 79999,
    annual: 63999,
    features: [
      'Unlimited Global Edge Traffic',
      'Dedicated Multi-Agent Squad',
      'Custom SLA & SSO Security',
    ],
  },
];

export function SaasDemo({ isMobileViewport }: IndustryDemoProps) {
  const [monthlyLeads, setMonthlyLeads] = useState(400);
  const [dealValue, setDealValue] = useState(35000);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [callEmail, setCallEmail] = useState('');
  const [callBooked, setCallBooked] = useState(false);

  const extraClosedDeals = Math.round(monthlyLeads * 0.14);
  const projectedMonthlyRevenue = extraClosedDeals * dealValue;

  return (
    <div className="min-h-full bg-[#09090B] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#09090B]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] text-white">
              <Rocket className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Kinetic AI Labs
            </span>
          </div>
          <a
            href="#kinetic-strategy"
            className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] px-4 py-2 text-xs font-bold text-white whitespace-nowrap"
          >
            Book Strategy Call
          </a>
        </div>
      </header>

      {/* Dark Glass SaaS Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-5 sm:pt-10 sm:pb-10">
        <div
          className={`grid items-center gap-6 sm:gap-8 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-500/35 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-violet-300 uppercase">
              <Zap className="h-3.5 w-3.5 text-[#06B6D4]" />
              Autonomous Growth Engine for SaaS &amp; Agencies
            </span>
            <h1 className="max-w-3xl text-[26px] font-extrabold tracking-tight text-white leading-[1.12] sm:text-4xl lg:text-5xl">
              Turn anonymous traffic into{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                predictable qualified pipeline.
              </span>
            </h1>
            <p className="mt-2.5 line-clamp-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Real-time conversion attribution, AI lead qualification, and
              automated multi-channel follow-ups built for fast-scaling revenue
              teams.
            </p>
          </div>

          <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-[#111116] shadow-[0_0_40px_-14px_rgba(139,92,246,0.45)]">
              <div className="relative h-48 w-full sm:h-64">
                <DemoImage
                  src={kineticDashboardImg}
                  alt="Kinetic AI Labs autonomous funnel analytics interface"
                  fallbackTheme="dark"
                  className="h-full w-full"
                  imgClassName="brightness-105 contrast-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111116] via-[#111116]/60 to-transparent"
                />
                <span className="absolute bottom-3 left-3 rounded-full border border-cyan-400/35 bg-black/65 px-3 py-1 text-[10.5px] font-semibold text-[#06B6D4] backdrop-blur-sm">
                  Live AI Funnel Telemetry
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI / Lead Growth Slider */}
      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-3xl border border-white/10 bg-[#111116] p-6 sm:p-8">
          <div
            className={`grid gap-6 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={`space-y-5 ${isMobileViewport ? '' : 'lg:col-span-7'}`}>
              <p className="text-xs font-semibold tracking-wider text-[#06B6D4] uppercase">
                Live ROI / Lead Growth Simulator
              </p>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300">Monthly Inbound Leads</span>
                  <span className="font-bold text-[#06B6D4] tabular-nums">
                    {monthlyLeads} leads / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer accent-[#06B6D4]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300">Average Deal / LTV</span>
                  <span className="font-bold text-violet-400 tabular-nums">
                    ₹{dealValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer accent-[#8B5CF6]"
                />
              </div>
            </div>

            <div
              className={`flex flex-col justify-center rounded-2xl border border-violet-500/25 bg-black/50 p-5 ${
                isMobileViewport ? '' : 'lg:col-span-5'
              }`}
            >
              <p className="text-xs text-zinc-400">
                Projected Monthly Pipeline Added
              </p>
              <p className="mt-1 text-3xl font-extrabold text-[#06B6D4] tabular-nums">
                +₹{(projectedMonthlyRevenue / 100000).toFixed(1)}L / mo
              </p>
              <p className="mt-2 text-xs text-zinc-400 tabular-nums">
                +{extraClosedDeals} extra qualified deals closed monthly via
                automated AI qualification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly vs Annual Pricing Toggle */}
      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">Transparent SaaS Plans</h2>
          <div className="inline-flex rounded-full border border-white/10 bg-[#111116] p-1">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                billing === 'monthly'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-zinc-400'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                billing === 'annual'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white'
                  : 'text-zinc-400'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div
          className={`mt-6 grid gap-5 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {SAAS_PLANS.map((plan) => {
            const price = billing === 'annual' ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl border p-5 ${
                  plan.popular
                    ? 'border-[#8B5CF6]/60 bg-violet-500/[0.08]'
                    : 'border-white/10 bg-[#111116]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                  {plan.popular && (
                    <span className="rounded-full bg-[#8B5CF6] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-3 text-2xl font-extrabold text-white tabular-nums">
                  ₹{price.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-zinc-400">
                    /mo
                  </span>
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-xs text-zinc-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#06B6D4]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Strategy-Call Booking Widget */}
      <section id="kinetic-strategy" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-2xl border border-cyan-500/25 bg-[#111116] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#06B6D4] uppercase">
                Live Growth Audit
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">
                Book a 20-Minute Strategy Call
              </h3>
            </div>
            {callBooked ? (
              <p className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Strategy call invite sent to {callEmail}!
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCallBooked(true);
                }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={callEmail}
                  onChange={(e) => setCallEmail(e.target.value)}
                  placeholder="Founder / Work Email"
                  className="min-h-[42px] rounded-xl border border-white/15 bg-black/50 px-3.5 text-xs text-white placeholder:text-zinc-500 sm:w-64"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] px-5 text-xs font-bold text-white cursor-pointer whitespace-nowrap"
                >
                  <span>Lock Strategy Slot</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 pt-7 pb-20 text-xs text-zinc-500 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-[#06B6D4]" />
            SOC2-Ready Cloud Infrastructure · 99.99% Uptime
          </span>
          <span>© 2026 Kinetic AI Labs</span>
        </div>
      </footer>
    </div>
  );
}
