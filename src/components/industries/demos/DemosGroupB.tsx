import { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Flame,
  LampCeiling,
  Landmark,
  Moon,
  ShieldCheck,
  Sun,
  UtensilsCrossed,
} from 'lucide-react';
import luminaChandelierImg from '../../../assets/images/lumina_chandelier_hero_1795797237227.jpg';
import luminaCoveImg from '../../../assets/images/lumina_cove_lighting_1795797239766.jpg';
import atelierVillaImg from '../../../assets/images/demo_atelier_interior_1795708679883.jpg';
import atelierPenthouseImg from '../../../assets/images/atelier_penthouse_1795713192689.jpg';
import saffronHeroImg from '../../../assets/images/demo_saffron_dining_1795708680040.jpg';
import saffronBurrataImg from '../../../assets/images/saffron_burrata_1795713201491.jpg';
import saffronTartImg from '../../../assets/images/saffron_lotus_tart_1795713203287.jpg';
import saffronRisottoImg from '../../../assets/images/saffron_morel_risotto_1795713204073.jpg';
import saffronCacaoImg from '../../../assets/images/saffron_cacao_dome_1795713206172.jpg';
import saffronElixirImg from '../../../assets/images/saffron_smoked_elixir_1795713205147.jpg';
import vanguardOfficeImg from '../../../assets/images/vanguard_executive_office_1795797241964.jpg';
import { DemoImage } from '../DemoImage';
import type { IndustryDemoProps } from '../industryCatalog';

/* ============================================================================
   4. DECORATIVE LIGHTING, HOME DECOR & ARCHITECTURE — "Lumina Atelier Lighting"
   ============================================================================ */

type LightingRoom = 'Chandeliers' | 'Facade LED' | 'Smart Cove';

const LIGHTING_PRODUCTS = [
  {
    id: 'solis-ring',
    room: 'Chandeliers' as const,
    name: 'Solis Halo 3-Tier Brass Chandelier',
    spec: '2700K CRI 97 · DALI Dimmable',
    price: 145000,
    image: luminaChandelierImg,
  },
  {
    id: 'aureole-drop',
    room: 'Chandeliers' as const,
    name: 'Aureole Hand-Blown Alabaster Drop',
    spec: '2400K–3000K Tunable · 64W',
    price: 92000,
    image: atelierPenthouseImg,
  },
  {
    id: 'monolith-wall',
    room: 'Facade LED' as const,
    name: 'Architectural Linear Grazing Wash',
    spec: 'IP67 Weatherproof · 18° Optics',
    price: 38000,
    image: luminaCoveImg,
  },
  {
    id: 'cortege-bollard',
    room: 'Facade LED' as const,
    name: 'Brushed Bronze Landscape Bollard Set',
    spec: 'IP66 · Anti-Glare Louver',
    price: 54000,
    image: atelierVillaImg,
  },
  {
    id: 'linear-cove',
    room: 'Smart Cove' as const,
    name: 'Shadowless Trimless Plaster-In Cove',
    spec: 'Matter + HomeKit · 2200K–6500K',
    price: 46000,
    image: luminaCoveImg,
  },
  {
    id: 'magnetic-track',
    room: 'Smart Cove' as const,
    name: '48V Ultra-Slim Magnetic Track Suite',
    spec: 'Voice + App Scene Presets',
    price: 68000,
    image: luminaChandelierImg,
  },
];

export function LightingDemo({ isMobileViewport }: IndustryDemoProps) {
  const [ambience, setAmbience] = useState<'night' | 'daylight'>('night');
  const [roomFilter, setRoomFilter] = useState<LightingRoom>('Chandeliers');
  const [areaSqft, setAreaSqft] = useState(3200);
  const [smartDimming, setSmartDimming] = useState(true);
  const [quoteSent, setQuoteSent] = useState(false);

  const isNight = ambience === 'night';
  const visibleFixtures = LIGHTING_PRODUCTS.filter((p) => p.room === roomFilter);
  const estimatedQuote =
    areaSqft * (smartDimming ? 210 : 145);

  return (
    <div
      className={`min-h-full transition-colors duration-500 ${
        isNight
          ? 'bg-[#0B0B0E] text-[#F8F3E8]'
          : 'bg-[#F5F2EC] text-[#181614]'
      }`}
    >
      {/* Architectural Header */}
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-md transition-colors duration-500 ${
          isNight
            ? 'border-amber-500/20 bg-[#0B0B0E]/92'
            : 'border-stone-300 bg-[#F5F2EC]/92'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-[#F59E0B] border border-amber-500/35">
              <LampCeiling className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Lumina Atelier Lighting
            </span>
          </div>

          {/* Interactive Daylight / Warm Night Ambience Toggle */}
          <div
            className={`inline-flex items-center rounded-full border p-1 ${
              isNight
                ? 'border-amber-500/30 bg-white/[0.04]'
                : 'border-stone-300 bg-white'
            }`}
          >
            <button
              type="button"
              onClick={() => setAmbience('night')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                isNight
                  ? 'bg-[#F59E0B] text-[#0B0B0E] shadow-[0_0_16px_rgba(245,158,11,0.45)]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Moon className="h-3 w-3" />
              <span>2700K Night</span>
            </button>
            <button
              type="button"
              onClick={() => setAmbience('daylight')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                !isNight
                  ? 'bg-[#181614] text-[#F5F2EC]'
                  : 'text-amber-100/75 hover:text-white'
              }`}
            >
              <Sun className="h-3 w-3" />
              <span>Daylight</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mood-Reactive Hero */}
      <section className="relative overflow-hidden px-4 pt-6 pb-8 sm:px-5 sm:pt-10 sm:pb-10">
        {isNight && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22)_0%,transparent_70%)] blur-3xl"
          />
        )}
        <div className="relative mx-auto max-w-6xl">
          <div
            className={`grid items-center gap-6 sm:gap-8 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#F59E0B] uppercase sm:text-xs">
                {isNight
                  ? 'Warm 2700K Evening Scene Active'
                  : '5600K Architectural Daylight Active'}
              </p>
              <h1 className="text-[26px] font-bold tracking-tight leading-[1.12] sm:text-4xl lg:text-5xl">
                Sculpting architecture with luminous warmth.
              </h1>
              <p
                className={`mt-2.5 line-clamp-3 text-sm leading-relaxed ${
                  isNight ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                Bespoke brass chandeliers, IP67 facade grazing, and DALI smart
                cove systems engineered for luxury villas and hospitality spaces.
              </p>
            </div>

            {/* Live Lighting Mood Visualizer */}
            <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isNight
                    ? 'border-amber-500/40 bg-[#12100D] shadow-[0_0_55px_rgba(245,158,11,0.24)]'
                    : 'border-stone-300 bg-[#F8F6F2] shadow-lg'
                }`}
              >
                <div className="relative h-48 w-full sm:h-72">
                  <DemoImage
                    src={luminaChandelierImg}
                    fallbackSrc={luminaCoveImg}
                    alt="Solis Halo brass chandelier lighting scene preview"
                    fallbackTheme="warm"
                    className="h-full w-full"
                    imgStyle={{
                      filter: isNight
                        ? 'brightness(0.98) contrast(1.08) saturate(1.26) sepia(0.16)'
                        : 'brightness(1.28) contrast(0.92) saturate(0.74) hue-rotate(-8deg)',
                    }}
                  />
                  {/* Real-time 2700K Golden Glow vs 5600K Crisp Daylight Sheen */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
                      isNight
                        ? 'bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.22),transparent_72%)]'
                        : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(224,242,254,0.12)_60%,transparent_100%)]'
                    }`}
                  />
                  {/* Seamless Bottom Blend into Caption Strip */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t transition-colors duration-500 ${
                      isNight
                        ? 'from-[#12100D] via-[#12100D]/60 to-transparent'
                        : 'from-[#F8F6F2] via-[#F8F6F2]/60 to-transparent'
                    }`}
                  />
                </div>
                <div
                  className={`flex items-center justify-between gap-2 px-5 py-3.5 text-xs font-semibold tabular-nums transition-colors duration-500 ${
                    isNight
                      ? 'bg-[#12100D] text-amber-200'
                      : 'bg-[#F8F6F2] text-stone-800'
                  }`}
                >
                  <span>
                    {isNight
                      ? '2700K Warm Amber · 97 CRI Dimmed Glow'
                      : '5600K Natural Sunlit Finish Preview'}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-500 ${
                      isNight
                        ? 'bg-amber-400 shadow-[0_0_12px_#F59E0B]'
                        : 'bg-sky-400 shadow-[0_0_10px_#38BDF8]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room-Type Filter & Fixtures */}
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Architectural Fixtures</h2>
          <div className="flex flex-wrap gap-1.5">
            {(['Chandeliers', 'Facade LED', 'Smart Cove'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoomFilter(r)}
                className={`min-h-[36px] rounded-full px-4 text-xs font-semibold transition-all cursor-pointer ${
                  roomFilter === r
                    ? 'bg-[#F59E0B] text-[#0B0B0E]'
                    : isNight
                      ? 'border border-white/15 text-stone-300 hover:border-amber-400/40'
                      : 'border border-stone-300 text-stone-700 hover:border-stone-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`mt-5 grid gap-5 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {visibleFixtures.map((fixture) => (
            <div
              key={fixture.id}
              className={`group overflow-hidden rounded-2xl border transition-all duration-500 ${
                isNight
                  ? 'border-amber-500/20 bg-[#141318] hover:border-amber-400/50 hover:shadow-[0_0_28px_rgba(245,158,11,0.16)]'
                  : 'border-stone-200 bg-white hover:border-stone-400'
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <DemoImage
                  src={fixture.image}
                  fallbackSrc={luminaCoveImg}
                  alt={fixture.name}
                  fallbackTheme="warm"
                  className="h-full w-full"
                  imgClassName="group-hover:scale-105"
                  imgStyle={{
                    filter: isNight
                      ? 'brightness(0.88) contrast(1.08) saturate(1.22) sepia(0.15)'
                      : 'brightness(1.22) contrast(0.94) saturate(0.82)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isNight
                      ? 'bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.18),rgba(11,11,14,0.35))]'
                      : 'bg-white/10'
                  }`}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#F59E0B] uppercase">
                    {fixture.room}
                  </span>
                  <span className="text-sm font-bold tabular-nums">
                    ₹{fixture.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-bold">{fixture.name}</h3>
                <p
                  className={`mt-1 text-xs ${
                    isNight ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {fixture.spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instant Lighting Project Quote Estimator */}
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div
          className={`rounded-2xl border p-6 transition-colors duration-500 ${
            isNight
              ? 'border-amber-500/25 bg-[#131216]'
              : 'border-stone-300 bg-white'
          }`}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#F59E0B] uppercase">
                Instant Project Estimator
              </p>
              <div className="flex justify-between text-xs">
                <span>Project Carpet Area</span>
                <span className="font-bold tabular-nums">
                  {areaSqft.toLocaleString('en-IN')} sq ft
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={10000}
                step={200}
                value={areaSqft}
                onChange={(e) => {
                  setAreaSqft(Number(e.target.value));
                  setQuoteSent(false);
                }}
                className="h-2 w-full cursor-pointer accent-[#F59E0B]"
              />
              <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={smartDimming}
                  onChange={(e) => {
                    setSmartDimming(e.target.checked);
                    setQuoteSent(false);
                  }}
                  className="h-4 w-4 accent-[#F59E0B]"
                />
                Include DALI / Matter Smart Scene Automation
              </label>
            </div>

            <div className="sm:w-64 sm:text-right">
              <p className="text-xs opacity-70">Estimated Lighting BOQ</p>
              <p className="mt-1 text-2xl font-extrabold text-[#F59E0B] tabular-nums">
                ₹{estimatedQuote.toLocaleString('en-IN')}
              </p>
              {quoteSent ? (
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" /> Lighting BOQ Requested
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setQuoteSent(true)}
                  className="mt-3 min-h-[42px] w-full rounded-xl bg-[#F59E0B] px-4 text-xs font-bold text-[#0B0B0E] hover:bg-amber-400 cursor-pointer"
                >
                  Lock Lighting Quote
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer
        className={`border-t px-5 pt-7 pb-20 text-xs sm:pb-10 ${
          isNight
            ? 'border-white/10 text-stone-400'
            : 'border-stone-200 text-stone-600'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span>Trusted by 120+ Interior Architects across India</span>
          <span>© 2026 Lumina Atelier Lighting</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   5. RESTAURANTS, HOTELS, CAFES & SALONS — "Saffron & Ember Dining"
   ============================================================================ */

type MenuTab = 'Signature Starters' | 'Chef Mains' | 'Artisan Drinks';

const MENU_ITEMS = [
  {
    id: 'burrata',
    tab: 'Signature Starters' as const,
    name: 'Charred Heirloom Tomato & Smoked Burrata',
    veg: true,
    price: 780,
    note: 'Wood-fired basil oil, aged balsamic reduction',
    image: saffronBurrataImg,
  },
  {
    id: 'prawn',
    tab: 'Signature Starters' as const,
    name: 'Ember-Grilled Malabar Tiger Prawns',
    veg: false,
    price: 1150,
    note: 'Curry leaf butter, kokum glaze, toasted brioche',
    image: saffronTartImg,
  },
  {
    id: 'morel',
    tab: 'Chef Mains' as const,
    name: 'Kashmiri Morel & Saffron Truffle Risotto',
    veg: true,
    price: 1450,
    note: '24-month aged Parmigiano, saffron emulsion',
    image: saffronRisottoImg,
  },
  {
    id: 'lamb',
    tab: 'Chef Mains' as const,
    name: '14-Hour Slow-Roasted Lamb Shank',
    veg: false,
    price: 1850,
    note: 'Smoked black garlic jus, charred heirloom carrots',
    image: saffronCacaoImg,
  },
  {
    id: 'smoked-old',
    tab: 'Artisan Drinks' as const,
    name: 'Saffron & Cedarwood Smoked Elixir',
    veg: true,
    price: 620,
    note: 'Zero-proof botanical infusion, torched rosemary',
    image: saffronElixirImg,
  },
  {
    id: 'espresso-tonic',
    tab: 'Artisan Drinks' as const,
    name: 'Chikmagalur Cold-Brew Espresso Negroni',
    veg: true,
    price: 680,
    note: 'Blood orange zest, artisanal spiced bitters',
    image: saffronHeroImg,
  },
];

export function HospitalityDemo({ isMobileViewport }: IndustryDemoProps) {
  const [menuTab, setMenuTab] = useState<MenuTab>('Signature Starters');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [guests, setGuests] = useState(4);
  const [resDate, setResDate] = useState('2026-12-05');
  const [resSlot, setResSlot] = useState('8:00 PM');
  const [guestName, setGuestName] = useState('');
  const [tableBooked, setTableBooked] = useState(false);

  const visibleDishes = MENU_ITEMS.filter((item) => {
    if (item.tab !== menuTab) return false;
    if (dietFilter === 'veg') return item.veg;
    if (dietFilter === 'nonveg') return !item.veg;
    return true;
  });

  return (
    <div className="min-h-full bg-[#14100D] text-[#FBF6EE]">
      <header className="sticky top-0 z-20 border-b border-amber-500/15 bg-[#14100D]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D97706]/20 text-[#F59E0B] border border-amber-500/35">
              <Flame className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight">
              Saffron &amp; Ember
            </span>
          </div>

          <a
            href="#saffron-reserve"
            className="rounded-lg bg-[#D97706] px-4 py-2 text-xs font-bold text-[#14100D] hover:bg-amber-500 whitespace-nowrap"
          >
            Reserve a Table
          </a>
        </div>
      </header>

      {/* Upscale Wood-Fire Hero — Seamless Photo-to-Text Blend */}
      <section className="mx-auto max-w-6xl px-4 pt-5 pb-6 sm:px-5 sm:pt-8 sm:pb-8">
        <div className="overflow-hidden rounded-3xl border border-amber-500/25 bg-[#18120E] shadow-2xl">
          <div className="relative h-48 w-full sm:h-72">
            <DemoImage
              src={saffronHeroImg}
              fallbackSrc={saffronRisottoImg}
              alt="Saffron & Ember open-flame fine dining table"
              fallbackTheme="warm"
              className="h-full w-full"
              imgClassName="brightness-105 contrast-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#18120E] via-[#18120E]/60 to-transparent"
            />
          </div>
          <div className="relative z-10 -mt-3 p-5 pt-2 sm:p-8 sm:pt-3">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#F59E0B] uppercase">
              Live Wood-Fire Kitchen · Fine Dining
            </p>
            <h1 className="max-w-2xl font-serif text-[26px] font-bold tracking-tight text-[#FBF6EE] leading-[1.12] sm:text-4xl">
              Open-flame gastronomy, candlelit hospitality.
            </h1>
            <p className="mt-2.5 line-clamp-3 max-w-xl text-sm leading-relaxed text-[#E5D8C8]">
              Seasonal tasting menus crafted over seasoned oak embers, paired
              with small-batch smoked elixirs and effortless instant table
              booking.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#saffron-reserve"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#D97706] px-4 text-xs font-bold text-[#14100D] transition-colors hover:bg-amber-500"
              >
                <span>Reserve Evening Table</span>
              </a>
              <span className="text-[11px] font-medium text-[#C4B29D]">
                Chef&apos;s Tasting · 7:00 PM – 11:30 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu with Dietary Filters */}
      <section className="mx-auto max-w-6xl px-5 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#F59E0B] uppercase">
              Curated Tasting Menu
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold">
              Evening Selections
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'veg', 'nonveg'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDietFilter(d)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold cursor-pointer ${
                  dietFilter === d
                    ? 'bg-amber-500 text-[#14100D]'
                    : 'border border-amber-500/25 text-amber-100/80'
                }`}
              >
                {d === 'all' ? 'All' : d === 'veg' ? 'Pure Veg' : 'Non-Veg'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-b border-amber-500/15 pb-3">
          {(['Signature Starters', 'Chef Mains', 'Artisan Drinks'] as const).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMenuTab(tab)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                  menuTab === tab
                    ? 'bg-[#D97706] text-[#14100D]'
                    : 'text-[#D6C7B5] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        <div
          className={`mt-5 grid gap-4 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {visibleDishes.length === 0 ? (
            <p className="col-span-full py-6 text-center text-xs text-[#C4B29D]">
              No items match this dietary filter in {menuTab}. Switch to All to
              view all dishes.
            </p>
          ) : (
            visibleDishes.map((dish) => (
              <div
                key={dish.id}
                className="group flex items-center gap-4 rounded-2xl border border-amber-500/15 bg-[#1C1612] p-3.5 transition-colors hover:border-amber-500/35"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-amber-500/20 sm:h-24 sm:w-24">
                  <DemoImage
                    src={dish.image}
                    fallbackSrc={saffronHeroImg}
                    alt={dish.name}
                    fallbackTheme="warm"
                    className="h-full w-full"
                    imgClassName="brightness-105 contrast-[1.03] group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          dish.veg ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                      <h3 className="text-sm font-bold text-[#FBF6EE]">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs text-[#C4B29D]">{dish.note}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-[#F59E0B] tabular-nums">
                    ₹{dish.price}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Instant Table Reservation Widget */}
      <section id="saffron-reserve" className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-amber-500/25 bg-[#1C1612] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F59E0B] uppercase">
            <UtensilsCrossed className="h-4 w-4" />
            <span>Instant Table Reservation</span>
          </div>
          <h3 className="mt-1 font-serif text-2xl font-bold">
            Hold Your Evening Table
          </h3>

          {tableBooked ? (
            <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                Table Reserved for {guestName || 'Guest'}!
              </p>
              <p className="mt-1 text-xs text-[#D6C7B5] tabular-nums">
                Party of {guests} · {resDate} at {resSlot} · Candlelit Chef&apos;s
                Hall.
              </p>
              <button
                type="button"
                onClick={() => setTableBooked(false)}
                className="mt-3 rounded-lg border border-amber-500/35 px-4 py-2 text-xs font-semibold text-amber-200 cursor-pointer"
              >
                Modify Reservation
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTableBooked(true);
              }}
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Guest Name"
                className="min-h-[44px] rounded-xl border border-amber-500/20 bg-[#14100D] px-3.5 text-xs text-white placeholder:text-stone-400"
              />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="min-h-[44px] rounded-xl border border-amber-500/20 bg-[#14100D] px-3.5 text-xs text-white"
              >
                {[2, 4, 6, 8].map((g) => (
                  <option key={g} value={g}>
                    {g} Guests
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={resDate}
                onChange={(e) => setResDate(e.target.value)}
                className="min-h-[44px] rounded-xl border border-amber-500/20 bg-[#14100D] px-3.5 text-xs text-white"
              />
              <select
                value={resSlot}
                onChange={(e) => setResSlot(e.target.value)}
                className="min-h-[44px] rounded-xl border border-amber-500/20 bg-[#14100D] px-3.5 text-xs text-white"
              >
                {['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="min-h-[44px] rounded-xl bg-[#D97706] px-4 text-xs font-bold text-[#14100D] hover:bg-amber-500 cursor-pointer"
              >
                Confirm Table
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-amber-500/15 px-5 pt-7 pb-20 text-xs text-[#A89885] sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span>Rated Top 10 Fine Dining Experiences · Valet Parking</span>
          <span>© 2026 Saffron &amp; Ember Dining</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   6. FINANCE, ACCOUNTING, TAX & LEGAL — "Vanguard & Co. Advisory"
   ============================================================================ */

type AdvisoryTrack = 'Corporate Tax' | 'GST & Audit' | 'Legal Compliance';

const ADVISORY_TRACKS: Record<
  AdvisoryTrack,
  { headline: string; deliverables: string[]; baseMonthly: number }
> = {
  'Corporate Tax': {
    headline: 'Direct Tax Structuring, Transfer Pricing & Board Advisory',
    deliverables: [
      'Quarterly Advance Tax & ITR-6 Filings',
      'Cross-border FEMA & Tax Treaty Structuring',
      'Dedicated Chartered Accountant Partner',
    ],
    baseMonthly: 22000,
  },
  'GST & Audit': {
    headline: 'Monthly GST Reconciliation, Statutory & Internal Audits',
    deliverables: [
      'GSTR-1 / 3B & Automated ITC Reconciliation',
      'Annual Statutory & Tax Audit Certification',
      'ERP / Tally Cloud Real-Time Books Review',
    ],
    baseMonthly: 18000,
  },
  'Legal Compliance': {
    headline: 'ROC Secretarial, ESOP Trusts & Commercial Contracts',
    deliverables: [
      'MCA / ROC Annual Filings & Board Resolutions',
      'MSA, NDA & Investor SHA Drafting',
      'Trademark, IP & Regulatory Compliance Desk',
    ],
    baseMonthly: 25000,
  },
};

export function FinanceDemo({ isMobileViewport }: IndustryDemoProps) {
  const [track, setTrack] = useState<AdvisoryTrack>('Corporate Tax');
  const [turnoverBand, setTurnoverBand] = useState<'under2' | '2to10' | '10plus'>('2to10');
  const [statutoryAudit, setStatutoryAudit] = useState(true);
  const [clientEmail, setClientEmail] = useState('');
  const [consultBooked, setConsultBooked] = useState(false);

  const activeTrack = ADVISORY_TRACKS[track];
  const multiplier =
    turnoverBand === 'under2' ? 1 : turnoverBand === '2to10' ? 1.55 : 2.4;
  const monthlyRetainer = Math.round(
    activeTrack.baseMonthly * multiplier + (statutoryAudit ? 8500 : 0),
  );

  return (
    <div className="min-h-full bg-white text-[#0F172A]">
      {/* Executive Corporate Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#0F172A] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#059669] text-white">
              <Landmark className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Vanguard &amp; Co. Advisory
            </span>
          </div>

          {!isMobileViewport && (
            <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
              <span>Taxation</span>
              <span>Audit &amp; Assurance</span>
              <span>Corporate Law</span>
              <span>Retainer Planner</span>
            </nav>
          )}

          <a
            href="#vanguard-consult"
            className="rounded-lg bg-[#059669] px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 whitespace-nowrap"
          >
            Book Consultation
          </a>
        </div>
      </header>

      {/* Navy Executive Hero */}
      <section className="bg-[#0F172A] px-4 pt-6 pb-8 text-white sm:px-5 sm:pt-10 sm:pb-12">
        <div className="mx-auto max-w-6xl">
          <div
            className={`grid items-center gap-6 sm:gap-8 ${
              isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            <div className={isMobileViewport ? '' : 'lg:col-span-7'}>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-emerald-300 uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                Chartered Accountants &amp; Corporate Counsel · ISO 27001
              </span>
              <h1 className="max-w-3xl text-[26px] font-bold tracking-tight leading-[1.12] sm:text-4xl lg:text-5xl">
                Zero-penalty compliance &amp; strategic tax governance.
              </h1>
              <p className="mt-2.5 line-clamp-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                Trusted advisory partner for high-growth startups, manufacturing
                groups, and family offices across direct tax, GST audits, and
                MCA governance.
              </p>
            </div>

            <div className={isMobileViewport ? '' : 'lg:col-span-5'}>
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0F172A] shadow-2xl">
                <div className="relative h-48 w-full sm:h-64">
                  <DemoImage
                    src={vanguardOfficeImg}
                    alt="Vanguard & Co. Advisory executive boardroom"
                    fallbackTheme="dark"
                    className="h-full w-full"
                    imgClassName="brightness-105 contrast-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white">
                      Mumbai · Bengaluru · GIFT City
                    </span>
                    <span className="rounded-full bg-emerald-500/25 px-2.5 py-0.5 font-semibold text-emerald-300 backdrop-blur-sm">
                      340+ Retained Entities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Track Selector & Retainer Calculator */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap gap-2">
          {(['Corporate Tax', 'GST & Audit', 'Legal Compliance'] as const).map(
            (t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(t)}
                className={`min-h-[40px] rounded-xl px-4 text-xs font-bold transition-colors cursor-pointer ${
                  track === t
                    ? 'bg-[#0F172A] text-white'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                }`}
              >
                {t}
              </button>
            ),
          )}
        </div>

        <div
          className={`mt-6 grid gap-6 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* Active Track Details */}
          <div
            className={`rounded-2xl border border-slate-200 bg-slate-50 p-6 ${
              isMobileViewport ? '' : 'lg:col-span-6'
            }`}
          >
            <p className="text-xs font-semibold text-[#059669] uppercase">
              {track} Practice
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-[#0F172A]">
              {activeTrack.headline}
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
              {activeTrack.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Annual Compliance / Retainer Calculator */}
          <div
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${
              isMobileViewport ? '' : 'lg:col-span-6'
            }`}
          >
            <p className="text-xs font-semibold text-[#059669] uppercase">
              Annual Compliance &amp; Retainer Calculator
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: 'under2', label: '< ₹2 Cr' },
                { id: '2to10', label: '₹2–10 Cr' },
                { id: '10plus', label: '₹10 Cr+' },
              ].map((band) => (
                <button
                  key={band.id}
                  type="button"
                  onClick={() =>
                    setTurnoverBand(band.id as 'under2' | '2to10' | '10plus')
                  }
                  className={`min-h-[38px] rounded-lg border text-xs font-semibold cursor-pointer tabular-nums ${
                    turnoverBand === band.id
                      ? 'border-[#059669] bg-emerald-50 text-[#059669]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {band.label}
                </button>
              ))}
            </div>

            <label className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={statutoryAudit}
                onChange={(e) => setStatutoryAudit(e.target.checked)}
                className="h-4 w-4 accent-[#059669]"
              />
              Include Statutory Audit &amp; Quarterly Board Pack (+₹8,500/mo)
            </label>

            <div className="mt-5 flex items-end justify-between rounded-xl bg-[#0F172A] p-4 text-white">
              <div>
                <p className="text-[11px] text-slate-400">
                  Estimated Monthly Retainer
                </p>
                <p className="text-2xl font-extrabold text-emerald-400 tabular-nums">
                  ₹{monthlyRetainer.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="text-right text-[11px] text-slate-300 tabular-nums">
                Annualized: ₹
                {(monthlyRetainer * 12).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidential Consultation Scheduler */}
      <section id="vanguard-consult" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#059669] uppercase">
                NDA-Protected Intake
              </p>
              <h3 className="mt-1 text-lg font-bold">
                Schedule a Confidential Partner Call
              </h3>
            </div>
            {consultBooked ? (
              <p className="flex items-center gap-2 text-xs font-bold text-[#059669]">
                <CheckCircle2 className="h-4 w-4" />
                Confidential calendar invite sent to {clientEmail}.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConsultBooked(true);
                }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Work Email Address"
                  className="min-h-[42px] rounded-lg border border-slate-300 bg-white px-3.5 text-xs focus:border-[#059669] focus:outline-none sm:w-64"
                />
                <button
                  type="submit"
                  className="min-h-[42px] rounded-lg bg-[#059669] px-5 text-xs font-bold text-white hover:bg-emerald-700 cursor-pointer whitespace-nowrap"
                >
                  Request Partner Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-5 pt-7 pb-20 text-xs text-slate-500 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Briefcase className="h-4 w-4 text-[#059669]" />
            Advising 340+ Indian Pvt Ltd &amp; LLP Entities
          </span>
          <span>© 2026 Vanguard &amp; Co. Advisory</span>
        </div>
      </footer>
    </div>
  );
}
