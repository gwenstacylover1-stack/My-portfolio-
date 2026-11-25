import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { InstagramIcon, SOCIAL_LINKS, YouTubeIcon } from './SocialIcons';

const NAV_LINKS = [
  { id: 'live-build', label: 'Live Build', href: '#live-build' },
  { id: 'ai-labs', label: 'AI Labs', href: '#ai-labs' },
  { id: 'tech-stack', label: 'Tech Stack', href: '#tech-stack' },
  { id: 'architecture', label: 'Architecture', href: '#architecture' },
  { id: 'estimator', label: 'Estimator', href: '#estimator' },
  { id: 'channels', label: 'Channels', href: '#channels' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      if (window.scrollY < 160) {
        setActiveSection('');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-28% 0px -54% 0px',
        threshold: [0.05, 0.2, 0.45],
      },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-200 sm:h-15 sm:px-5 ${
            scrolled
              ? 'border-white/[0.12] bg-[#070B16]/82 shadow-[0_14px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl'
              : 'border-white/[0.08] bg-[#070B16]/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-lg'
          }`}
        >
          {/* Zone 1: Minimalist glowing monogram S.TARAK */}
          <a
            href="#top"
            className="group inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap shrink-0 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
          >
            <span className="font-display text-lg font-bold tracking-tight text-[#00F0FF] drop-shadow-[0_0_12px_rgba(0,240,255,0.65)] transition-all duration-200 group-hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.9)]">
              S.
            </span>
            <span className="font-mono text-xs font-semibold tracking-[0.22em] text-slate-200 transition-colors duration-200 group-hover:text-white">
              TARAK
            </span>
          </a>

          {/* Zone 2: Clean single-line navigation links with active-section highlight pill */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-2 py-2 text-[11px] font-medium transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70 lg:px-3 lg:text-xs xl:px-3.5 xl:text-[13px] ${
                    isActive
                      ? 'border border-[#00F0FF]/30 bg-[#00F0FF]/[0.11] text-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.16)]'
                      : 'border border-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#00F0FF] px-5 py-2 text-xs font-semibold tracking-wide text-[#04060C] shadow-[0_0_22px_rgba(0,240,255,0.38)] transition-all duration-200 hover:bg-[#5CF6FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060C]"
            >
              Hire Me
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] cursor-pointer md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
            >
              {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Liquid Glass Drawer */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-[#03050A]/82 backdrop-blur-sm"
        />
        <aside
          aria-label="Mobile Navigation"
          className={`absolute right-0 top-0 flex h-full w-[min(84vw,330px)] flex-col border-l border-white/12 bg-[#080D1B]/95 p-6 backdrop-blur-2xl transition-transform duration-200 ease-out ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <a
              href="#top"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap"
            >
              <span className="font-display text-lg font-bold text-[#00F0FF]">S.</span>
              <span className="font-mono text-xs font-semibold tracking-[0.22em] text-slate-200">
                TARAK
              </span>
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:border-[#00F0FF]/40 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex min-h-[46px] items-center justify-between rounded-xl border px-4 text-base font-medium transition-colors duration-150 ${
                    isActive
                      ? 'border-[#00F0FF]/35 bg-[#00F0FF]/10 text-[#00F0FF]'
                      : 'border-transparent text-slate-200 hover:bg-white/[0.05] hover:text-[#00F0FF]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/[0.08] pt-5">
            <div className="mb-3 grid grid-cols-2 gap-2.5">
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow @tarakdevp on Instagram"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition-all duration-150 hover:border-fuchsia-400/45 hover:bg-fuchsia-500/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                <InstagramIcon className="h-4 w-4 text-fuchsia-300" />
                <span>Instagram</span>
              </a>

              <a
                href={SOCIAL_LINKS.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch TARAK YT on YouTube"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition-all duration-150 hover:border-rose-400/45 hover:bg-rose-500/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <YouTubeIcon className="h-4 w-4 text-rose-400" />
                <span>YouTube</span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setDrawerOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#00F0FF] px-5 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_24px_rgba(0,240,255,0.4)] transition-colors hover:bg-[#5CF6FF]"
            >
              Hire Me
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
