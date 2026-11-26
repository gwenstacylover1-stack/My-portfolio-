import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  MapPin,
  Maximize2,
  X,
} from 'lucide-react';
import { SafePhoto } from '../SafePhoto';

interface DemoProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

type ArchitectureCategory = 'All' | 'Villas' | 'Penthouses' | 'Hospitality';

interface ArchitectureProject {
  id: string;
  title: string;
  category: Exclude<ArchitectureCategory, 'All'>;
  location: string;
  year: string;
  area: string;
  materials: string;
  summary: string;
  highlights: string[];
  image: string;
}

const HERO_IMAGE = '/src/assets/images/demo_atelier_interior_1795708679883.jpg';

const PROJECTS: ArchitectureProject[] = [
  {
    id: 'villa-solaris',
    title: 'Villa Solaris Pavilion',
    category: 'Villas',
    location: 'Jubilee Hills, Hyderabad',
    year: '2026',
    area: '7,400 sq ft',
    materials: 'Honed Travertine · Smoked Walnut · Low-Iron Glass',
    summary:
      'Cantilevered stone pavilion framing a 22-meter dusk infinity pool with passive cross-ventilation and monolithic bronze thresholds.',
    highlights: [
      'Double-height travertine living gallery with recessed acoustic timber ceiling',
      'Seamless 9-meter motorized glass pocket doors opening to olive terrace',
      'Integrated geothermal radiant floor conditioning and circadian lighting',
    ],
    image: HERO_IMAGE,
  },
  {
    id: 'skyline-penthouse',
    title: 'The Aurelia Penthouse',
    category: 'Penthouses',
    location: 'Worli Sea Face, Mumbai',
    year: '2025',
    area: '5,200 sq ft',
    materials: 'Calacatta Viola · Brushed Brass · Bouclé Linen',
    summary:
      'Panoramic oceanfront residence sculpted around a curved limestone spine, private library lounge, and cantilevered sunset terrace.',
    highlights: [
      'Bespoke curved plaster rotunda with skylight oculus above dining salon',
      'Custom Italian walnut millwork concealing wine vault & cinema acoustics',
      'Wrap-around coastal deck with saltwater plunge basin',
    ],
    image: '/src/assets/images/atelier_penthouse_1795713192689.jpg',
  },
  {
    id: 'casa-terracotta',
    title: 'Casa Verbena Retreat',
    category: 'Hospitality',
    location: 'Assagao, Goa',
    year: '2026',
    area: '14,800 sq ft',
    materials: 'Lime Plaster · Reclaimed Teak · Basalt Stone',
    summary:
      'Twelve-suite boutique sanctuary blending Mediterranean minimalism with tropical courtyard water gardens and vaulted arches.',
    highlights: [
      'Monolithic lime-washed colonnades framing sunken botanical courtyards',
      'Open-air dining pavilion beneath hand-woven cane pergola',
      'Private plunge gardens with hand-carved basalt soaking tubs',
    ],
    image: '/src/assets/images/atelier_verbena_1795713194214.jpg',
  },
  {
    id: 'monolith-ridge',
    title: 'Monolith Ridge House',
    category: 'Villas',
    location: 'Nandi Hills, Bengaluru',
    year: '2025',
    area: '6,850 sq ft',
    materials: 'Board-Formed Concrete · Teak · Aged Copper',
    summary:
      'Hillside brutalist residence anchored into granite boulders with floating cantilevered study and panoramic valley framing.',
    highlights: [
      'Raw board-formed concrete walls softened by oiled Burmese teak slats',
      'Floating glass-bridge entry spanning a natural rainwater reflecting pond',
      'Zero-net energy solar roof tiles with underground rainwater harvesting',
    ],
    image: '/src/assets/images/atelier_monolith_1795713196479.jpg',
  },
];

const CATEGORIES: ArchitectureCategory[] = [
  'All',
  'Villas',
  'Penthouses',
  'Hospitality',
];

export function AtelierVesperDemo({
  isMobileViewport,
  onRequestTemplate,
}: DemoProps) {
  const [activeCategory, setActiveCategory] =
    useState<ArchitectureCategory>('All');
  const [selectedProject, setSelectedProject] =
    useState<ArchitectureProject | null>(null);
  const [consultName, setConsultName] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName.trim()) return;
    setConsultSubmitted(true);
  };

  return (
    <div className="min-h-full bg-[#F6F2EB] text-[#1F1A15] font-sans selection:bg-[#9A7B4F]/20">
      {/* Top Editorial Navigation */}
      <header className="sticky top-0 z-20 border-b border-[#1F1A15]/10 bg-[#F6F2EB]/92 backdrop-blur-md">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 ${
            isMobileViewport ? 'px-4 py-3.5' : 'sm:px-8'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1F1A15] text-[#F6F2EB]">
              <Compass className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-tight text-[#1F1A15] whitespace-nowrap">
              Atelier Vesper
            </span>
          </div>

          {!isMobileViewport && (
            <nav className="hidden items-center gap-6 text-xs font-medium tracking-wide text-[#5B5146] md:flex">
              <span>Selected Works</span>
              <span>Philosophy</span>
              <span>Materiality</span>
              <span>Journal</span>
            </nav>
          )}

          <button
            type="button"
            onClick={onRequestTemplate}
            className="rounded-lg bg-[#1F1A15] px-4 py-2 text-xs font-semibold text-[#F6F2EB] transition-colors hover:bg-[#3A3128] cursor-pointer whitespace-nowrap"
          >
            Inquire
          </button>
        </div>
      </header>

      {/* Editorial Hero Split */}
      <section
        className={`mx-auto max-w-6xl px-5 pt-8 pb-10 ${
          isMobileViewport ? 'px-4 pt-6 pb-8' : 'sm:px-8 sm:pt-12 sm:pb-14'
        }`}
      >
        <div
          className={`grid items-center gap-7 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#8E6F45] uppercase">
              Architecture &amp; Spatial Interiors
            </p>
            <h1
              className={`mt-3 font-bold tracking-tight text-[#1F1A15] leading-[1.08] ${
                isMobileViewport ? 'text-3xl' : 'text-3xl sm:text-5xl'
              }`}
            >
              Sculpted light, timeless stone, quiet luxury.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#5B5146]">
              Bespoke residential villas, coastal penthouses, and architectural
              retreats designed around natural materiality and serene proportion.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(PROJECTS[0])}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1F1A15] px-5 py-2.5 text-xs font-semibold text-[#F6F2EB] transition-colors hover:bg-[#382F26] cursor-pointer"
              >
                <span>Inspect Featured Villa</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="text-xs text-[#6E6256]">
                42 Built Works · Est. 2018
              </span>
            </div>
          </div>

          <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#1F1A15]/10 bg-[#E8E0D4] shadow-[0_24px_50px_-20px_rgba(31,26,21,0.28)]">
              <SafePhoto
                src={HERO_IMAGE}
                alt="Villa Solaris minimalist travertine living room overlooking infinity pool"
                loading="eager"
                fallbackClassName="bg-[#2D251E] text-[#F6F2EB]"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16120E]/92 via-[#16120E]/45 to-transparent p-5 text-[#F6F2EB]">
                <p className="text-[11px] font-medium tracking-wider text-[#E5D3B3] uppercase">
                  Featured Commission · 2026
                </p>
                <p className="mt-1 text-lg font-semibold">
                  Villa Solaris Pavilion — Jubilee Hills
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Portfolio Showcase */}
      <section
        className={`mx-auto max-w-6xl border-t border-[#1F1A15]/10 px-5 py-10 ${
          isMobileViewport ? 'px-4 py-8' : 'sm:px-8 sm:py-12'
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#8E6F45] uppercase">
              Curated Portfolio
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#1F1A15]">
              Selected Architectural Works
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-xl border border-[#1F1A15]/10 bg-[#ECE5D9] p-1">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#1F1A15] text-[#F6F2EB] shadow-sm'
                      : 'text-[#5B5146] hover:text-[#1F1A15]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid — Every Card Features Unique Luxury Photography */}
        <div
          className={`mt-7 grid gap-5 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#1F1A15]/12 bg-white/90 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#8E6F45]/55 hover:shadow-[0_18px_36px_-14px_rgba(31,26,21,0.18)] cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A221B]">
                <SafePhoto
                  src={project.image}
                  alt={`${project.title} — ${project.category} in ${project.location}`}
                  fallbackClassName="bg-[#2D251E] text-[#F6F2EB]"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16120E]/75 via-[#16120E]/15 to-transparent"
                />
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 text-[11px] font-medium text-[#F6F2EB]">
                  <span className="truncate">{project.materials}</span>
                  <span className="shrink-0 font-semibold text-[#E5D3B3] tabular-nums">
                    {project.area}
                  </span>
                </div>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1F1A15]/80 text-[#F6F2EB] backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#7D6E5F]">
                  <span className="font-semibold text-[#8E6F45]">
                    {project.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{project.year}</span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold text-[#1F1A15]">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5B5146]">
                  {project.summary}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#1F1A15]/8 pt-3 text-xs font-semibold text-[#8E6F45]">
                  <span>Inspect Blueprint &amp; Specs</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Private Studio Consultation Form */}
      <section
        className={`mx-auto max-w-6xl px-5 pb-12 ${
          isMobileViewport ? 'px-4 pb-10' : 'sm:px-8 sm:pb-14'
        }`}
      >
        <div className="rounded-2xl border border-[#1F1A15]/12 bg-[#1F1A15] p-6 text-[#F6F2EB] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#D8B98B] uppercase">
                Private Commissions
              </p>
              <h3 className="mt-1.5 text-xl font-bold sm:text-2xl">
                Planning a flagship residence or hospitality space?
              </h3>
            </div>

            {consultSubmitted ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-xs font-medium text-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Thank you, {consultName}. Our Principal Architect will reach out
                  within 24 hours.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleConsultSubmit}
                className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row"
              >
                <input
                  type="text"
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  placeholder="Your name or project city"
                  aria-label="Your name or project city"
                  className="min-h-[44px] rounded-lg border border-white/15 bg-white/10 px-3.5 text-xs text-white placeholder:text-[#C5B9AA] focus:border-[#D8B98B] focus:outline-none sm:w-56"
                />
                <button
                  type="submit"
                  className="min-h-[44px] rounded-lg bg-[#D8B98B] px-5 text-xs font-bold text-[#1F1A15] transition-colors hover:bg-[#E7CFA8] cursor-pointer whitespace-nowrap"
                >
                  Book Discovery Call
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Quick-View Project Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} details`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#1F1A15]/15 bg-[#F6F2EB] text-[#1F1A15] shadow-2xl"
          >
            <div className="relative h-56 w-full overflow-hidden bg-[#2D251E]">
              <SafePhoto
                src={selectedProject.image}
                alt={selectedProject.title}
                fallbackClassName="bg-[#2D251E] text-[#F6F2EB]"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16120E]/70 via-transparent to-transparent"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project quick view"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1F1A15]/85 text-[#F6F2EB] hover:bg-[#1F1A15] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7D6E5F]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#8E6F45]" />
                  {selectedProject.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#1F1A15] tabular-nums">
                  {selectedProject.area}
                </span>
              </div>

              <h4 className="mt-2 text-2xl font-bold text-[#1F1A15]">
                {selectedProject.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#5B5146]">
                {selectedProject.summary}
              </p>

              <div className="mt-4 rounded-xl border border-[#1F1A15]/10 bg-[#ECE5D9]/70 p-3.5">
                <p className="text-[11px] font-semibold tracking-wider text-[#8E6F45] uppercase">
                  Material Palette
                </p>
                <p className="mt-1 text-xs font-medium text-[#1F1A15]">
                  {selectedProject.materials}
                </p>
              </div>

              <ul className="mt-4 space-y-2 text-xs text-[#4A4138]">
                {selectedProject.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8E6F45]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="min-h-[42px] rounded-lg border border-[#1F1A15]/15 px-4 text-xs font-semibold text-[#4A4138] hover:bg-[#1F1A15]/5 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    onRequestTemplate();
                  }}
                  className="min-h-[42px] rounded-lg bg-[#1F1A15] px-5 text-xs font-semibold text-[#F6F2EB] hover:bg-[#3A3128] cursor-pointer"
                >
                  Build Similar Site for My Brand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
