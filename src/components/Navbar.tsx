import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { InstagramIcon, SOCIAL_LINKS, YouTubeIcon } from './SocialIcons';

const NAV_LINKS = [
  { id: 'live-build', label: 'Live Build', href: '#live-build' },
  { id: 'ai-labs', label: 'AI Labs', href: '#ai-labs' },
  { id: 'tech-stack', label: 'Tech Stack', href: '#tech-stack' },
  { id: 'architecture', label: 'Architecture', href: '#architecture' },
  { id: 'templates', label: 'Signature Websites', href: '#templates' },
  { id: 'estimator', label: 'Estimator', href: '#estimator' },
  { id: 'channels', label: 'Channels', href: '#channels' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

const DESKTOP_NAV_LINKS = [
  { id: 'live-build', label: 'Live Build', href: '#live-build' },
  { id: 'ai-labs', label: 'AI Labs', href: '#ai-labs' },
  { id: 'tech-stack', label: 'Tech Stack', href: '#tech-stack' },
  { id: 'templates', label: 'Websites', href: '#templates' },
  { id: 'estimator', label: 'Estimator', href: '#estimator' },
  { id: 'channels', label: 'Channels', href: '#channels' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

const FIRST_SECTION_ID = NAV_LINKS[0].id;
const LAST_SECTION_ID = NAV_LINKS[NAV_LINKS.length - 1].id;
const SCROLL_LOCK_DURATION_MS = 900;

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(FIRST_SECTION_ID);

  const scrollLockRef = useRef(false);
  const scrollLockTimerRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const prevBodyOverflowRef = useRef<string>('');

  const lockScrollSpy = useCallback(() => {
    scrollLockRef.current = true;
    if (scrollLockTimerRef.current !== null) {
      window.clearTimeout(scrollLockTimerRef.current);
    }
    scrollLockTimerRef.current = window.setTimeout(() => {
      scrollLockRef.current = false;
      scrollLockTimerRef.current = null;
    }, SCROLL_LOCK_DURATION_MS);
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 18);

    if (scrollLockRef.current) return;

    // Top-of-page rule
    if (scrollY < 100) {
      setActiveSection(FIRST_SECTION_ID);
      return;
    }

    // Bottom-of-page rule (handles short bottom sections reliably)
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    if (window.innerHeight + scrollY >= docHeight - 80) {
      setActiveSection(LAST_SECTION_ID);
      return;
    }

    // 35% viewport reference line sorted by actual vertical document order
    const referenceLine = scrollY + window.innerHeight * 0.35;
    const sectionPositions = NAV_LINKS.map((link) => {
      const el = document.getElementById(link.id);
      if (!el) return null;
      return {
        id: link.id,
        top: el.getBoundingClientRect().top + scrollY,
      };
    })
      .filter((item): item is { id: (typeof NAV_LINKS)[number]['id']; top: number } =>
        Boolean(item),
      )
      .sort((a, b) => a.top - b.top);

    let currentId: string = FIRST_SECTION_ID;
    for (const sec of sectionPositions) {
      if (sec.top <= referenceLine) {
        currentId = sec.id;
      } else {
        break;
      }
    }

    setActiveSection(currentId);
  }, []);

  useEffect(() => {
    // Honor initial hash if it matches one of the 8 tracked sections
    const initialHash = window.location.hash.replace('#', '');
    const matchedInitial = NAV_LINKS.find((link) => link.id === initialHash);
    if (matchedInitial) {
      setActiveSection(matchedInitial.id);
    } else {
      updateActiveFromScroll();
    }

    const handleScrollOrResize = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateActiveFromScroll();
      });
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (scrollLockTimerRef.current !== null) {
        window.clearTimeout(scrollLockTimerRef.current);
        scrollLockTimerRef.current = null;
      }
    };
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    prevBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBodyOverflowRef.current;
    };
  }, [drawerOpen]);

  const handleNavClick = useCallback(
    (
      e: MouseEvent<HTMLAnchorElement>,
      sectionId: string,
      closeDrawer = false,
    ) => {
      e.preventDefault();

      const nextActiveId =
        sectionId === 'top' ? FIRST_SECTION_ID : sectionId;
      setActiveSection(nextActiveId);
      lockScrollSpy();

      if (closeDrawer) {
        // Restore body scroll before invoking smooth scroll on mobile
        document.body.style.overflow = prevBodyOverflowRef.current;
        setDrawerOpen(false);
      }

      const performScroll = () => {
        if (sectionId === 'top') {
          window.history.replaceState(null, '', '#top');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const target = document.getElementById(sectionId);
        if (target) {
          window.history.replaceState(null, '', `#${sectionId}`);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      if (closeDrawer) {
        window.requestAnimationFrame(performScroll);
      } else {
        performScroll();
      }
    },
    [lockScrollSpy],
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-2xl border px-4 transition-all duration-200 sm:h-15 sm:px-5 md:gap-3 md:rounded-full md:border-cyan-400/20 ${
            scrolled
              ? 'border-white/[0.12] bg-[#070B16]/84 shadow-[0_16px_44px_rgba(0,0,0,0.65),0_0_32px_-16px_rgba(0,240,255,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] md:shadow-[0_16px_44px_rgba(0,0,0,0.65),0_0_28px_rgba(34,211,238,0.10),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl'
              : 'border-white/[0.09] bg-[#070B16]/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:shadow-[0_0_28px_rgba(34,211,238,0.10),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg'
          }`}
        >
          {/* Zone 1: Minimalist glowing monogram S.TARAK */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, 'top', false)}
            className="group inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap shrink-0 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
          >
            <span className="text-lg font-extrabold tracking-tight text-[#00F0FF] drop-shadow-[0_0_12px_rgba(0,240,255,0.65)] transition-all duration-200 group-hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.9)]">
              S.
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-slate-200 transition-colors duration-200 group-hover:text-white">
              TARAK
            </span>
          </a>

          {/* Zone 2: Desktop & Tablet-landscape centered single-row navigation links (>= 768px) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center md:gap-0.5 lg:gap-1.5 xl:gap-2"
          >
            {DESKTOP_NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full py-1.5 md:px-2 lg:px-3 md:text-xs lg:text-[13px] xl:text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70 ${
                    isActive
                      ? 'border border-cyan-400/35 bg-cyan-400/10 text-white shadow-[0_0_14px_rgba(34,211,238,0.22)]'
                      : 'border border-transparent text-slate-300/85 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_0_12px_rgba(34,211,238,0.12)]'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact', false)}
              className="hidden sm:inline-flex min-h-[38px] items-center justify-center rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] px-4 lg:px-5 py-2 text-xs font-semibold tracking-wide text-[#04060C] shadow-[0_0_22px_rgba(0,240,255,0.34)] transition-all duration-200 hover:brightness-110 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060C]"
            >
              Hire Me
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              aria-label={
                drawerOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] cursor-pointer md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70"
            >
              {drawerOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Liquid Glass Drawer */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          drawerOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
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
              onClick={(e) => handleNavClick(e, 'top', true)}
              className="inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap"
            >
              <span className="text-lg font-extrabold text-[#00F0FF]">S.</span>
              <span className="text-xs font-bold tracking-[0.2em] text-slate-200">
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

          <nav className="mt-5 flex flex-col gap-1.5 overflow-y-auto">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, true)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors duration-150 ${
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
              onClick={(e) => handleNavClick(e, 'contact', true)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8] px-5 py-3 text-sm font-semibold text-[#04060C] shadow-[0_0_24px_rgba(0,240,255,0.36)] transition-all hover:brightness-110"
            >
              Hire Me
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
