import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Live Build', href: '#live-build' },
  { label: 'AI Labs', href: '#ai-labs' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#05070D]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
            : 'bg-[#05070D]/45 backdrop-blur-md border-b border-white/[0.04]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-6 lg:px-8">
          {/* Zone 1: Minimalist glowing monogram ST. with TARAK */}
          <a
            href="#top"
            className="group inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70 rounded-md"
          >
            <span className="font-display text-lg font-bold tracking-tight text-[#00F0FF] drop-shadow-[0_0_12px_rgba(0,240,255,0.65)] transition-all duration-200 group-hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.9)]">
              ST.
            </span>
            <span className="font-mono text-xs font-semibold tracking-[0.22em] text-slate-200 transition-colors duration-200 group-hover:text-white">
              TARAK
            </span>
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-white whitespace-nowrap shrink-0 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-[#00F0FF] after:to-[#3B82F6] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70 rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#00F0FF] px-5 py-2 text-xs font-semibold tracking-wide text-[#05070D] shadow-[0_0_22px_rgba(0,240,255,0.38)] transition-all duration-200 hover:bg-[#5CF6FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070D]"
            >
              Hire Me
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
            >
              {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Frosted Glass Drawer */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-[#05070D]/80 backdrop-blur-sm"
        />
        <aside
          aria-label="Mobile Navigation"
          className={`absolute right-0 top-0 flex h-full w-[min(82vw,320px)] flex-col border-l border-white/10 bg-[#0A0F1D]/95 p-6 backdrop-blur-2xl transition-transform duration-200 ease-out ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <a
              href="#top"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span className="font-display text-lg font-bold text-[#00F0FF]">ST.</span>
              <span className="font-mono text-xs font-semibold tracking-[0.22em] text-slate-200">
                TARAK
              </span>
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:border-[#00F0FF]/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-medium text-slate-200 transition-colors duration-150 hover:bg-white/[0.05] hover:text-[#00F0FF]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/[0.08] pt-5">
            <a
              href="#contact"
              onClick={() => setDrawerOpen(false)}
              className="flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#00F0FF] px-5 py-2.5 text-sm font-semibold text-[#05070D] shadow-[0_0_24px_rgba(0,240,255,0.4)] transition-colors hover:bg-[#5CF6FF]"
            >
              Hire Me
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
