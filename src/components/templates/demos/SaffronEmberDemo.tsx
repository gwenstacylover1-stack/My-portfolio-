import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Flame,
  Leaf,
  Sparkles,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { SafePhoto } from '../SafePhoto';

interface DemoProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

type CourseCategory = 'All' | 'Starters' | 'Signature Mains' | 'Elixirs' | 'Desserts';
type DietaryMode = 'all' | 'chef' | 'veg';

interface DishItem {
  id: string;
  name: string;
  course: Exclude<CourseCategory, 'All'>;
  price: number;
  isVeg: boolean;
  isChefSpecial: boolean;
  tagline: string;
  tastingNotes: string;
  pairing: string;
  prepTime: string;
  image: string;
}

const HERO_DISH_IMAGE = '/src/assets/images/demo_saffron_dining_1795708680040.jpg';

const MENU_ITEMS: DishItem[] = [
  {
    id: 'saffron-seabass',
    name: 'Kashmiri Saffron Glazed Sea Bass',
    course: 'Signature Mains',
    price: 1850,
    isVeg: false,
    isChefSpecial: true,
    tagline: 'Wild-caught fillet over charred leek velouté & foraged chanterelles',
    tastingNotes:
      'Delicate floral saffron reduction balanced with smoky roasted baby carrots, wild mushrooms, and citrus micro-herbs.',
    pairing: 'Chilled Chenin Blanc or Yuzu-Cardamom Botanical Spritz',
    prepTime: '18 mins',
    image: HERO_DISH_IMAGE,
  },
  {
    id: 'truffle-burrata',
    name: 'Smoked Heirloom Tomato & Truffle Burrata',
    course: 'Starters',
    price: 920,
    isVeg: true,
    isChefSpecial: true,
    tagline: 'Artisan pugliese burrata, black winter truffle oil & sourdough crisp',
    tastingNotes:
      'Creamy hand-pulled cheese paired with wood-fired vine tomatoes, aged balsamic pearls, and basil cold-press oil.',
    pairing: 'Sparkling Elderflower & Rosemary Tonic',
    prepTime: '10 mins',
    image: '/src/assets/images/saffron_burrata_1795713201491.jpg',
  },
  {
    id: 'charred-lotus',
    name: 'Ember-Roasted Lotus Root & Miso Tart',
    course: 'Starters',
    price: 780,
    isVeg: true,
    isChefSpecial: false,
    tagline: 'Crisp buckwheat shell, caramelized white miso & toasted sesame',
    tastingNotes:
      'Earthy crunch layered with umami sweet-savoury glaze and pickled ginger petals.',
    pairing: 'Smoked Oolong Cold Brew',
    prepTime: '12 mins',
    image: '/src/assets/images/saffron_lotus_tart_1795713203287.jpg',
  },
  {
    id: 'morel-risotto',
    name: 'Himalayan Morel & Aged Parmigiano Risotto',
    course: 'Signature Mains',
    price: 1490,
    isVeg: true,
    isChefSpecial: true,
    tagline: 'Acquerello carnaroli rice simmered in roasted porcini consommé',
    tastingNotes:
      'Velvety 36-month aged parmigiano emulsion finished with wild Kashmir gucchi mushrooms and thyme brown butter.',
    pairing: 'Pinot Noir or Spiced Fig Shrub',
    prepTime: '22 mins',
    image: '/src/assets/images/saffron_morel_risotto_1795713204073.jpg',
  },
  {
    id: 'amber-smoked-elixir',
    name: 'Amber Smoke & Saffron Negroni (Zero-Proof)',
    course: 'Elixirs',
    price: 540,
    isVeg: true,
    isChefSpecial: true,
    tagline: 'Cedar-smoked botanical distillate, blood orange & Kashmiri saffron',
    tastingNotes:
      'Served tableside beneath an aromatic cedar cloche with a bitter-citrus finish.',
    pairing: 'Ideal aperitif before Starters',
    prepTime: '6 mins',
    image: '/src/assets/images/saffron_smoked_elixir_1795713205147.jpg',
  },
  {
    id: 'dark-cacao-dome',
    name: '72% Malabar Cacao & Cardamom Ember Dome',
    course: 'Desserts',
    price: 690,
    isVeg: true,
    isChefSpecial: false,
    tagline: 'Single-origin dark chocolate ganache, roasted hazelnut praline & gold leaf',
    tastingNotes:
      'Rich bitter-sweet chocolate lifted by freshly cracked green cardamom and salted caramel pour-over.',
    pairing: 'Single-Estate Espresso or Saffron Kahwa',
    prepTime: '9 mins',
    image: '/src/assets/images/saffron_cacao_dome_1795713206172.jpg',
  },
];

const COURSES: CourseCategory[] = [
  'All',
  'Starters',
  'Signature Mains',
  'Elixirs',
  'Desserts',
];

export function SaffronEmberDemo({
  isMobileViewport,
  onRequestTemplate,
}: DemoProps) {
  const [activeCourse, setActiveCourse] = useState<CourseCategory>('All');
  const [dietaryMode, setDietaryMode] = useState<DietaryMode>('all');
  const [activeDish, setActiveDish] = useState<DishItem | null>(null);
  const [guests, setGuests] = useState('2 Guests');
  const [seatingTime, setSeatingTime] = useState('8:00 PM');
  const [reserved, setReserved] = useState(false);

  const visibleDishes = MENU_ITEMS.filter((dish) => {
    if (activeCourse !== 'All' && dish.course !== activeCourse) return false;
    if (dietaryMode === 'veg' && !dish.isVeg) return false;
    if (dietaryMode === 'chef' && !dish.isChefSpecial) return false;
    return true;
  });

  return (
    <div className="min-h-full bg-[#110E0B] text-[#F5EBDC] font-sans selection:bg-[#D9A441]/30">
      {/* Warm Candlelit Header */}
      <header className="sticky top-0 z-20 border-b border-[#D9A441]/15 bg-[#110E0B]/92 backdrop-blur-md">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 ${
            isMobileViewport ? 'px-4 py-3.5' : 'sm:px-8'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9A441]/45 bg-[#D9A441]/12 text-[#E8BC68]">
              <Flame className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-wide text-[#F7EEDC] whitespace-nowrap">
              SAFFRON &amp; EMBER
            </span>
          </div>

          {!isMobileViewport && (
            <nav className="hidden items-center gap-6 text-xs font-medium tracking-wider text-[#C7B8A1] uppercase md:flex">
              <span>Tasting Menu</span>
              <span>Chef&apos;s Table</span>
              <span>Cellar</span>
            </nav>
          )}

          <button
            type="button"
            onClick={onRequestTemplate}
            className="rounded-full border border-[#D9A441]/60 bg-[#D9A441] px-4 py-2 text-xs font-bold text-[#14100C] transition-colors hover:bg-[#ECC476] cursor-pointer whitespace-nowrap"
          >
            Reserve
          </button>
        </div>
      </header>

      {/* Moody Culinary Hero */}
      <section className="relative overflow-hidden border-b border-[#D9A441]/12">
        <div
          className={`mx-auto grid max-w-6xl items-center gap-7 px-5 py-8 ${
            isMobileViewport
              ? 'grid-cols-1 px-4 py-6'
              : 'grid-cols-1 sm:px-8 sm:py-12 lg:grid-cols-12'
          }`}
        >
          <div className={isMobileViewport ? '' : 'lg:col-span-6'}>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#E3B45C] uppercase">
              Modern Wood-Fire Gastronomy
            </p>
            <h1
              className={`mt-3 font-bold tracking-tight text-[#FFF8ED] leading-[1.08] ${
                isMobileViewport ? 'text-3xl' : 'text-3xl sm:text-5xl'
              }`}
            >
              An evening written in saffron, smoke, and spice.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#C9BBA7]">
              Seasonal seven-course tasting journeys and à la carte wood-fired
              plates crafted with heritage Indian spices and coastal harvests.
            </p>

            {/* Quick Inline Table Reservation Bar */}
            <div className="mt-6 rounded-2xl border border-[#D9A441]/22 bg-[#1A1510]/90 p-3.5">
              {reserved ? (
                <div className="flex items-center justify-between gap-3 text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>
                      Table held for <strong>{guests}</strong> tonight at{' '}
                      <strong>{seatingTime}</strong>.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReserved(false)}
                    className="text-[11px] font-semibold text-[#E3B45C] underline cursor-pointer whitespace-nowrap"
                  >
                    Modify
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-2.5 ${
                    isMobileViewport ? 'grid-cols-1' : 'grid-cols-3'
                  }`}
                >
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    aria-label="Party size"
                    className="min-h-[42px] rounded-xl border border-[#D9A441]/25 bg-[#120F0C] px-3 text-xs text-[#F5EBDC] focus:border-[#E3B45C] focus:outline-none"
                  >
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests (Chef Table)</option>
                  </select>
                  <select
                    value={seatingTime}
                    onChange={(e) => setSeatingTime(e.target.value)}
                    aria-label="Seating time"
                    className="min-h-[42px] rounded-xl border border-[#D9A441]/25 bg-[#120F0C] px-3 text-xs text-[#F5EBDC] focus:border-[#E3B45C] focus:outline-none"
                  >
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>9:15 PM</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setReserved(true)}
                    className="min-h-[42px] rounded-xl bg-[#D9A441] px-4 text-xs font-bold text-[#14100C] transition-colors hover:bg-[#ECC476] cursor-pointer whitespace-nowrap"
                  >
                    Book Table
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={isMobileViewport ? '' : 'lg:col-span-6'}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#D9A441]/25 bg-[#1C1610] shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
              <SafePhoto
                src={HERO_DISH_IMAGE}
                alt="Kashmiri Saffron Glazed Sea Bass served by candlelight"
                loading="eager"
                fallbackClassName="bg-[#1C1610] text-[#E3B45C]"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#110E0B]/95 via-[#110E0B]/50 to-transparent p-4">
                <p className="text-[11px] font-semibold tracking-wider text-[#E3B45C] uppercase">
                  Chef&apos;s Signature Plate
                </p>
                <p className="text-base font-semibold text-white">
                  Kashmiri Saffron Glazed Sea Bass · ₹1,850
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Explorer with Moody Fine-Dining Dish Photography */}
      <section
        className={`mx-auto max-w-6xl px-5 py-10 ${
          isMobileViewport ? 'px-4 py-8' : 'sm:px-8 sm:py-12'
        }`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#E3B45C] uppercase">
              Interactive Menu
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#FFF8ED]">
              Tap Any Dish for Tasting Notes
            </h2>
          </div>

          {/* Dietary Filter Switch */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'all', label: 'All Plates' },
                { id: 'chef', label: "Chef's Picks" },
                { id: 'veg', label: 'Vegetarian' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDietaryMode(opt.id)}
                className={`min-h-[36px] rounded-full border px-3.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  dietaryMode === opt.id
                    ? 'border-[#E3B45C] bg-[#E3B45C]/18 text-[#F6D58D]'
                    : 'border-white/12 bg-white/[0.03] text-[#BFB19D] hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {COURSES.map((course) => (
            <button
              key={course}
              type="button"
              onClick={() => setActiveCourse(course)}
              className={`min-h-[38px] rounded-xl px-4 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCourse === course
                  ? 'bg-[#D9A441] text-[#14100C]'
                  : 'border border-white/10 bg-[#191410] text-[#D1C2AD] hover:border-[#D9A441]/40'
              }`}
            >
              {course}
            </button>
          ))}
        </div>

        {/* Dishes Grid with Appetizing Dish Thumbnails */}
        <div
          className={`mt-6 grid gap-4 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {visibleDishes.map((dish) => (
            <button
              key={dish.id}
              type="button"
              onClick={() => setActiveDish(dish)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#D9A441]/18 bg-[#18130E] text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E3B45C]/60 hover:shadow-[0_18px_36px_rgba(0,0,0,0.45)] cursor-pointer sm:flex-row"
            >
              {/* Dish Thumbnail */}
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#221A12] sm:aspect-auto sm:w-40">
                <SafePhoto
                  src={dish.image}
                  alt={dish.name}
                  fallbackClassName="bg-[#221A12] text-[#E3B45C]"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#110E0B]/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#18130E]/35"
                />
              </div>

              {/* Dish Content */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#C8B79E]">
                        <span>{dish.course}</span>
                        {dish.isVeg && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-emerald-300">
                              <Leaf className="h-3 w-3" aria-hidden="true" />
                              Veg
                            </span>
                          </>
                        )}
                        {dish.isChefSpecial && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-[#E8BC68]">
                              <Sparkles className="h-3 w-3" aria-hidden="true" />
                              Chef&apos;s Pick
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="mt-1 text-base font-bold text-[#FFF8ED] transition-colors group-hover:text-[#F4D084]">
                        {dish.name}
                      </h3>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-[#E8BC68] tabular-nums whitespace-nowrap">
                      ₹{dish.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#C2B39E]">
                    {dish.tagline}
                  </p>
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-white/8 pt-2.5 text-[11px] text-[#E3B45C]">
                  <span className="inline-flex items-center gap-1.5 text-[#A89882]">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {dish.prepTime}
                  </span>
                  <span className="font-semibold">Tasting Notes →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quick-View Dish Tasting Modal */}
      {activeDish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeDish.name}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setActiveDish(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#D9A441]/30 bg-[#17120E] text-[#F5EBDC] shadow-2xl"
          >
            <div className="relative h-52 w-full overflow-hidden bg-[#221A12]">
              <SafePhoto
                src={activeDish.image}
                alt={activeDish.name}
                fallbackClassName="bg-[#221A12] text-[#E3B45C]"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17120E] via-[#17120E]/20 to-transparent"
              />
              <div className="absolute left-4 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#110E0B]/80 px-3 py-1 text-[11px] font-semibold text-[#E3B45C] backdrop-blur-sm">
                <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{activeDish.course}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveDish(null)}
                aria-label="Close dish tasting notes"
                className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#110E0B]/85 text-[#E5D5BE] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xl font-bold text-[#FFF8ED]">
                  {activeDish.name}
                </h4>
                <span className="shrink-0 text-base font-bold text-[#E8BC68] tabular-nums">
                  ₹{activeDish.price.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#D4C6B3]">
                {activeDish.tastingNotes}
              </p>

              <div className="mt-4 rounded-xl border border-[#D9A441]/20 bg-[#221A13] p-3.5 text-xs">
                <p className="font-semibold text-[#E3B45C]">
                  Sommelier Pairing Recommendation
                </p>
                <p className="mt-1 text-[#DED2C0]">{activeDish.pairing}</p>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveDish(null)}
                  className="min-h-[40px] rounded-xl border border-white/15 px-4 text-xs font-semibold text-[#D4C6B3] hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReserved(true);
                    setActiveDish(null);
                  }}
                  className="min-h-[40px] rounded-xl bg-[#D9A441] px-4 text-xs font-bold text-[#14100C] hover:bg-[#ECC476] cursor-pointer"
                >
                  Reserve Table for This Dish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
