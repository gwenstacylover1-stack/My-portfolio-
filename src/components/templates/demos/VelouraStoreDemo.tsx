import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { SafePhoto } from '../SafePhoto';

interface DemoProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

type StoreCategory = 'All' | 'Outerwear' | 'Footwear' | 'Accessories';

interface StoreProduct {
  id: string;
  name: string;
  category: Exclude<StoreCategory, 'All'>;
  price: number;
  compareAt?: number;
  material: string;
  description: string;
  sizes: string[];
  image: string;
}

interface CartEntry {
  product: StoreProduct;
  size: string;
  qty: number;
}

const LOOKBOOK_HERO_IMAGE =
  '/src/assets/images/demo_veloura_fashion_1795708681921.jpg';

/* Every single shoppable product has its own unique high-contrast studio photograph (hero banner is never reused) */
const PRODUCTS: StoreProduct[] = [
  {
    id: 'apex-shell-jacket',
    name: 'Apex 3L Technical Shell Jacket',
    category: 'Outerwear',
    price: 5499,
    compareAt: 6999,
    material: 'Waterproof 3-Layer Ripstop · YKK AquaGuard',
    description:
      'Architectural storm shell engineered with articulated elbows, magnetic storm placket, and breathable membrane.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/src/assets/images/veloura_shell_jacket_1795713196482.jpg',
  },
  {
    id: 'monolith-runner',
    name: 'Monolith Vibram Trail Sneaker',
    category: 'Footwear',
    price: 4899,
    compareAt: 5999,
    material: 'Ballistic Mesh · Vibram Megagrip Outsole',
    description:
      'Sculpted monochrome technical sneaker featuring quick-lock speed lacing and dual-density responsive midsole.',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    image: '/src/assets/images/veloura_trail_sneaker_1795713197292.jpg',
  },
  {
    id: 'aero-cargo-overshirt',
    name: 'Aero Structured Overshirt',
    category: 'Outerwear',
    price: 3299,
    material: 'Heavyweight 320GSM Organic Cotton Twill',
    description:
      'Relaxed boxy drape with concealed chest pockets and matte gunmetal snap closures for effortless layering.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/src/assets/images/veloura_overshirt_1795713198951.jpg',
  },
  {
    id: 'obsidian-sling',
    name: 'Cordura Modular Crossbody Sling',
    category: 'Accessories',
    price: 2199,
    material: '1000D Ballistic Cordura · Fidlock Magnetic Buckle',
    description:
      'Compact 4.5L daily carry engineered with weather-sealed tech pocket and quick-release magnetic hardware.',
    sizes: ['One Size'],
    image: '/src/assets/images/veloura_sling_bag_1795713198834.jpg',
  },
  {
    id: 'kinetic-knit-boot',
    name: 'Kinetic Sock-Fit Utility Boot',
    category: 'Footwear',
    price: 5799,
    material: 'Water-Repellent Knit · Lugged Rubber Sole',
    description:
      'Featherlight silhouette built for monsoon city commutes with thermal footbed cushioning.',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    image: '/src/assets/images/veloura_utility_boot_1795713199740.jpg',
  },
  {
    id: 'titanium-cap',
    name: 'Matte Nylon 6-Panel Utility Cap',
    category: 'Accessories',
    price: 1299,
    material: 'Quick-Dry Matte Taslan Nylon',
    description:
      'Minimalist low-profile silhouette with laser-perforated side panels and bungee micro-adjust toggle.',
    sizes: ['One Size'],
    image: '/src/assets/images/veloura_utility_cap_1795713201240.jpg',
  },
];

const FREE_SHIPPING_THRESHOLD = 4999;

export function VelouraStoreDemo({
  isMobileViewport,
  onRequestTemplate,
}: DemoProps) {
  const [category, setCategory] = useState<StoreCategory>('All');
  const [query, setQuery] = useState('');
  const [quickView, setQuickView] = useState<StoreProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartEntry[]>([
    { product: PRODUCTS[0], size: 'L', qty: 1 },
  ]);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.material.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [category, query]);

  const totalItems = cart.reduce((sum, entry) => sum + entry.qty, 0);
  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.product.price * entry.qty,
    0,
  );
  const discount = appliedPromo === 'SAVE20' ? Math.round(subtotal * 0.2) : 0;
  const shipping =
    subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : 199;
  const grandTotal = Math.max(0, subtotal - discount + shipping);
  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - (subtotal - discount),
  );

  const addToCart = (product: StoreProduct, size: string) => {
    setOrderPlacedId(null);
    setCart((prev) => {
      const idx = prev.findIndex(
        (entry) => entry.product.id === product.id && entry.size === size,
      );
      if (idx >= 0) {
        return prev.map((entry, i) =>
          i === idx ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setQuickView(null);
    setCartOpen(true);
  };

  const updateQty = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.product.id === productId && entry.size === size
            ? { ...entry, qty: entry.qty + delta }
            : entry,
        )
        .filter((entry) => entry.qty > 0),
    );
  };

  const applyPromoCode = (codeRaw?: string) => {
    const code = (codeRaw ?? promoInput).trim().toUpperCase();
    setPromoInput(code);
    if (code === 'SAVE20') {
      setAppliedPromo('SAVE20');
      setPromoMessage({
        type: 'success',
        text: 'SAVE20 applied — 20% instant discount unlocked!',
      });
    } else {
      setAppliedPromo(null);
      setPromoMessage({
        type: 'error',
        text: 'Invalid code. Try SAVE20 for 20% off your cart.',
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const randomId = `VLR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderPlacedId(randomId);
    setCart([]);
    setAppliedPromo(null);
    setPromoInput('');
    setPromoMessage(null);
  };

  return (
    <div className="relative min-h-full bg-[#F8F9FB] text-[#0E1117] font-sans">
      {/* Top Promo Ticker */}
      <div className="bg-[#0E1117] px-4 py-2 text-center text-[11px] font-medium text-slate-200">
        Use code <strong className="text-[#38BDF8]">SAVE20</strong> in
        cart for 20% off · Free express delivery above ₹4,999
      </div>

      {/* Store Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 ${
            isMobileViewport ? '' : 'sm:px-8'
          }`}
        >
          <span className="text-lg font-extrabold tracking-[0.14em] text-[#0E1117] whitespace-nowrap">
            VELOURA
          </span>

          <div className="flex items-center gap-2.5">
            {!isMobileViewport && (
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search drop 04..."
                  aria-label="Search store products"
                  className="h-9 w-48 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none"
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#0E1117] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#2563EB] cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span>Bag</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#38BDF8] px-1.5 text-[11px] font-bold text-[#0E1117] tabular-nums">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Storefront Hero Banner */}
      <section
        className={`mx-auto max-w-6xl px-4 pt-6 pb-8 ${
          isMobileViewport ? '' : 'sm:px-8 sm:pt-8'
        }`}
      >
        <div
          className={`grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          <div
            className={`flex flex-col justify-center p-6 ${
              isMobileViewport ? '' : 'sm:p-8 lg:col-span-6'
            }`}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2563EB] uppercase">
              Drop 04 · Technical Outerwear
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0E1117] sm:text-4xl">
              Engineered Streetwear for All-Weather Cities.
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Explore the complete storefront experience: filter pieces, open
              Quick View to select your size, add to bag, and apply promo code{' '}
              <strong className="text-[#0E1117]">SAVE20</strong>.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => addToCart(PRODUCTS[0], 'L')}
                className="min-h-[42px] rounded-lg bg-[#2563EB] px-5 text-xs font-bold text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer"
              >
                Quick Add Shell Jacket
              </button>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="min-h-[42px] rounded-lg border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                Open Cart ({totalItems})
              </button>
            </div>
          </div>

          <div
            className={`relative bg-slate-100 ${
              isMobileViewport ? 'aspect-[4/3]' : 'lg:col-span-6'
            }`}
          >
            <SafePhoto
              src={LOOKBOOK_HERO_IMAGE}
              alt="Veloura Drop 04 obsidian shell jacket and trail sneaker lookbook"
              loading="eager"
              fallbackClassName="bg-slate-900 text-slate-200"
              className="h-full max-h-[340px] w-full object-cover lg:max-h-none"
            />
          </div>
        </div>
      </section>

      {/* Catalog Controls & Grid — 6 Unique Shoppable Studio Product Photos */}
      <section
        className={`mx-auto max-w-6xl px-4 pb-12 ${
          isMobileViewport ? '' : 'sm:px-8'
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {(['All', 'Outerwear', 'Footwear', 'Accessories'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    category === cat
                      ? 'bg-[#0E1117] text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>

          {isMobileViewport && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search outerwear, footwear..."
                aria-label="Search store products"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          )}
        </div>

        <div
          className={`mt-5 grid gap-4 ${
            isMobileViewport
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => {
                  setQuickView(product);
                  setSelectedSize(product.sizes[0]);
                }}
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left cursor-pointer"
              >
                <SafePhoto
                  src={product.image}
                  alt={product.name}
                  fallbackClassName="bg-slate-900 text-slate-200"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.compareAt && (
                  <span className="absolute left-3 top-3 rounded-md bg-[#0E1117]/85 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    SAVE{' '}
                    {Math.round(
                      ((product.compareAt - product.price) / product.compareAt) *
                        100,
                    )}
                    %
                  </span>
                )}
              </button>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] font-medium text-slate-500">
                  {product.category} · {product.sizes.join(' / ')}
                </p>
                <h3 className="mt-1 text-sm font-bold text-[#0E1117]">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">
                  {product.material}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-sm font-extrabold text-[#0E1117] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.compareAt && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ₹{product.compareAt.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => addToCart(product, product.sizes[0])}
                    className="min-h-[38px] flex-1 rounded-lg bg-[#0E1117] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#2563EB] cursor-pointer"
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickView(product);
                      setSelectedSize(product.sizes[0]);
                    }}
                    className="min-h-[38px] rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Quick-View Modal */}
      {quickView && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={quickView.name}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={() => setQuickView(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white text-[#0E1117] shadow-2xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <SafePhoto
                src={quickView.image}
                alt={quickView.name}
                fallbackClassName="bg-slate-900 text-slate-200"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setQuickView(null)}
                aria-label="Close product quick view"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm hover:text-slate-950 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-semibold text-[#2563EB] uppercase">
                {quickView.category}
              </span>
              <h4 className="mt-1 text-xl font-bold">
                {quickView.name}
              </h4>
              <p className="mt-1 text-base font-extrabold text-[#2563EB] tabular-nums">
                ₹{quickView.price.toLocaleString('en-IN')}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                {quickView.description}
              </p>
              <p className="mt-3 text-[11px] font-medium text-slate-500">
                Fabric: {quickView.material}
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-800">
                  Select Size
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickView.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-[38px] min-w-[48px] rounded-lg border px-3 text-xs font-bold transition-colors cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#0E1117] bg-[#0E1117] text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(quickView, selectedSize)}
                className="mt-5 min-h-[44px] w-full rounded-xl bg-[#2563EB] text-xs font-bold text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer"
              >
                Add Size {selectedSize} to Bag — ₹
                {quickView.price.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Shopping Cart Drawer with SAVE20 Promo Code */}
      {cartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col bg-white text-[#0E1117] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-[#2563EB]" />
                <h4 className="text-base font-bold">
                  Your Bag ({totalItems})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cart.length > 0 && (
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs">
                <p className="font-medium text-slate-700">
                  {freeShippingRemaining === 0
                    ? 'You unlocked Free Express Shipping!'
                    : `Add ₹${freeShippingRemaining.toLocaleString('en-IN')} more for Free Express Shipping`}
                </p>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#2563EB] transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(
                          ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100,
                        ),
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-5">
              {orderPlacedId ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h5 className="mt-3 text-lg font-bold text-emerald-950">
                    Order Confirmed!
                  </h5>
                  <p className="mt-1 text-xs text-emerald-800">
                    Order ID: {orderPlacedId}
                  </p>
                  <p className="mt-2 text-xs text-emerald-800/90">
                    This is how fast your customers complete checkout in a
                    Dynamic Tier store.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCartOpen(false);
                      onRequestTemplate();
                    }}
                    className="mt-4 min-h-[40px] rounded-lg bg-[#0E1117] px-4 text-xs font-bold text-white cursor-pointer"
                  >
                    Build This Store for My Brand
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    Your bag is empty
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Add any item from Drop 04 to try the live cart &amp; SAVE20
                    discount code.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map((entry) => (
                    <div
                      key={`${entry.product.id}-${entry.size}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <SafePhoto
                          src={entry.product.image}
                          alt={entry.product.name}
                          fallbackClassName="bg-slate-800 text-white"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#0E1117]">
                          {entry.product.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          Size: {entry.size} · ₹
                          {entry.product.price.toLocaleString('en-IN')}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(entry.product.id, entry.size, -1)
                            }
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[20px] text-center text-xs font-bold tabular-nums">
                            {entry.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(entry.product.id, entry.size, 1)
                            }
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs font-bold tabular-nums">
                          ₹
                          {(entry.product.price * entry.qty).toLocaleString(
                            'en-IN',
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(entry.product.id, entry.size, -entry.qty)
                          }
                          aria-label="Remove item"
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 bg-slate-50 p-5">
                {/* Promo Code Input (SAVE20) */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try SAVE20)"
                      aria-label="Promo code"
                      className="min-h-[40px] w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3 text-xs uppercase text-slate-900 placeholder:normal-case placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => applyPromoCode()}
                    className="min-h-[40px] rounded-lg bg-[#0E1117] px-4 text-xs font-bold text-white hover:bg-[#2563EB] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {!appliedPromo && (
                  <button
                    type="button"
                    onClick={() => applyPromoCode('SAVE20')}
                    className="mt-2 text-[11px] font-semibold text-[#2563EB] underline cursor-pointer"
                  >
                    Tap to auto-apply SAVE20 (20% OFF)
                  </button>
                )}

                {promoMessage && (
                  <p
                    className={`mt-2 text-[11px] font-semibold ${
                      promoMessage.type === 'success'
                        ? 'text-emerald-700'
                        : 'text-rose-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}

                <div className="mt-4 space-y-1.5 border-t border-slate-200 pt-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-semibold text-emerald-700">
                      <span>Discount (SAVE20 · 20%)</span>
                      <span className="tabular-nums">
                        -₹{discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1.5 text-sm font-extrabold text-[#0E1117]">
                    <span>Total</span>
                    <span className="tabular-nums">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-4 min-h-[46px] w-full rounded-xl bg-[#2563EB] text-xs font-bold text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer"
                >
                  Complete Checkout · ₹{grandTotal.toLocaleString('en-IN')}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
