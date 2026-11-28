import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Monitor, Smartphone } from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';
import type { IndustryDefinition } from './industryCatalog';
import { IndustryDemoRenderer } from './IndustryDemos';

interface IndustryDemoModalProps {
  industry: IndustryDefinition | null;
  onClose: () => void;
}

export function IndustryDemoModal({
  industry,
  onClose,
}: IndustryDemoModalProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock background page scroll and restore exact scrollY when closing
  useEffect(() => {
    if (!industry) return;

    const savedScrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
      window.scrollTo({
        top: savedScrollY,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [industry, onClose]);

  // Reset viewport mode and inner scroll position on industry change
  useEffect(() => {
    setViewportMode('desktop');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [industry]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [viewportMode]);

  if (!industry) return null;

  const Icon = industry.icon;
  const inquiryHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Industry Website Inquiry - ${industry.label}`,
  )}`;
  const isMobileFrame = viewportMode === 'mobile';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${industry.brandName} interactive website preview`}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#04060D]"
    >
      {/* Single-Row Compact Top Preview Toolbar (Never Wraps) */}
      <header className="flex h-12 shrink-0 flex-nowrap items-center justify-between gap-2 border-b border-white/10 bg-[#070B14]/95 px-3 backdrop-blur-xl sm:h-14 sm:px-5">
        {/* Left: Compact Back Pill */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white transition-all hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/12 hover:text-[#00F0FF] active:scale-[0.97] sm:gap-1.5 sm:px-3"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to Portfolio</span>
        </button>

        {/* Center: Truncated Demo Brand Name + Desktop Industry Pill */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 sm:justify-start sm:pl-2">
          <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] md:flex">
            <Icon className={`h-3.5 w-3.5 ${industry.accent}`} aria-hidden="true" />
          </span>
          <span className="min-w-0 truncate text-xs font-medium text-white/80 sm:text-sm sm:font-semibold sm:text-white">
            {industry.brandName}
          </span>
          <span className="hidden shrink-0 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#00F0FF] lg:inline-flex">
            {industry.shortTag}
          </span>
        </div>

        {/* Right: Desktop Frame Toggle + Compact Glowing Cyan CTA */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <div
            role="group"
            aria-label="Preview viewport size"
            className="hidden items-center rounded-full border border-white/12 bg-white/[0.04] p-0.5 md:flex"
          >
            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all ${
                isMobileFrame
                  ? 'bg-[#00F0FF] text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all ${
                !isMobileFrame
                  ? 'bg-[#00F0FF] text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Desktop</span>
            </button>
          </div>

          <a
            href={inquiryHref}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#00F0FF] px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-950 shadow-[0_0_20px_-3px_rgba(0,240,255,0.65)] transition-all hover:brightness-110 active:scale-[0.97] sm:gap-1.5 sm:px-3.5"
          >
            <span className="sm:hidden">Build This</span>
            <span className="hidden sm:inline">Get This Website Built</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* 100% Edge-to-Edge Scrollable Interactive Website Canvas (Zero Scrollbar Gutter) */}
      <div
        ref={scrollContainerRef}
        className={`m-0 w-full max-w-none flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isMobileFrame
            ? 'flex justify-center bg-[#04060D] px-4 py-6'
            : 'p-0'
        }`}
      >
        <div
          className={
            isMobileFrame
              ? 'demo-viewport-mobile h-fit w-full overflow-hidden'
              : 'm-0 min-h-full w-full max-w-none p-0'
          }
        >
          <IndustryDemoRenderer
            key={industry.id}
            industryId={industry.id}
            isMobileViewport={isMobileFrame}
            inquiryHref={inquiryHref}
          />
        </div>
      </div>
    </div>
  );
}
