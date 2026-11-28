import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react';
import {
  TEMPLATE_TIERS,
  type TemplateItem,
} from '../../data/templatesConfig';

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onRequestQuote: (template: TemplateItem) => void;
}

export function TemplatePreviewModal({
  template,
  onClose,
  onRequestQuote,
}: TemplatePreviewModalProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>(
    'desktop',
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!template) return;
    setViewportMode('desktop');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [template, onClose]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [template, viewportMode]);

  if (!template) return null;

  const PreviewComponent = template.previewComponent;
  const tierMeta = TEMPLATE_TIERS.find((t) => t.id === template.tier);
  const isMobilePreview = viewportMode === 'mobile';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${template.title} interactive website preview`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#03050C]/95 backdrop-blur-xl"
    >
      {/* Top Simulator Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/12 bg-[#070B16]/95 px-3 py-2.5 sm:px-5 sm:py-3">
        {/* Left: Website Blueprint Info */}
        <div className="min-w-0 flex-1 sm:flex-initial">
          <div className="flex items-center gap-1.5 text-[11px] text-[#00F0FF]">
            <span className="shrink-0 font-semibold uppercase">
              {tierMeta?.label ?? template.tier}
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="min-w-0 truncate text-slate-400">
              {template.niche}
            </span>
          </div>
          <h3 className="truncate text-sm font-bold text-white sm:text-base">
            {template.title}
          </h3>
        </div>

        {/* Center: Working Desktop / Mobile Viewport Switcher */}
        <div
          role="group"
          aria-label="Preview viewport size"
          className="hidden items-center gap-1 rounded-xl border border-white/12 bg-[#04060C] p-1 md:flex"
        >
          <button
            type="button"
            onClick={() => setViewportMode('desktop')}
            aria-pressed={!isMobilePreview}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              !isMobilePreview
                ? 'bg-[#00F0FF] text-[#04060C] shadow-[0_0_16px_rgba(0,240,255,0.35)]'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setViewportMode('mobile')}
            aria-pressed={isMobilePreview}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isMobilePreview
                ? 'bg-[#00F0FF] text-[#04060C] shadow-[0_0_16px_rgba(0,240,255,0.35)]'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions & Close Button */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Compact viewport switch for tablets (hidden on < 640px phones to preserve title space) */}
          <button
            type="button"
            onClick={() =>
              setViewportMode((m) => (m === 'desktop' ? 'mobile' : 'desktop'))
            }
            aria-label={`Switch to ${isMobilePreview ? 'Desktop' : 'Mobile'} view`}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-200 transition-colors hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer sm:inline-flex md:hidden"
          >
            {isMobilePreview ? (
              <Monitor className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Smartphone className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {template.liveUrl && (
            <a
              href={template.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[40px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] px-3.5 text-xs font-semibold text-slate-200 transition-colors hover:border-[#00F0FF]/50 hover:text-white sm:inline-flex whitespace-nowrap"
            >
              <span>Open Website</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}

          <button
            type="button"
            onClick={() => onRequestQuote(template)}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#EC4899] px-3 text-xs font-bold text-[#04060C] shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:brightness-110 cursor-pointer whitespace-nowrap sm:min-h-[40px] sm:px-4"
          >
            <span className="sm:hidden">Get This</span>
            <span className="hidden sm:inline">Want This Design?</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close website preview"
            className="inline-flex h-10 w-10 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] text-xs font-semibold text-white transition-colors hover:border-rose-400/60 hover:bg-rose-500/20 cursor-pointer whitespace-nowrap sm:w-auto sm:px-3"
          >
            <X className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Interactive Website Viewport Canvas */}
      <div className="relative flex-1 overflow-hidden bg-[#040711] p-0 sm:p-3">
        <div
          ref={scrollContainerRef}
          className={`mx-auto h-full w-full overflow-y-auto overscroll-contain transition-all duration-300 ${
            isMobilePreview
              ? 'demo-viewport-mobile'
              : 'max-w-[1440px] sm:rounded-3xl sm:border sm:border-white/12 sm:shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_44px_-18px_rgba(0,240,255,0.2)]'
          }`}
        >
          {template.liveUrl ? (
            <iframe
              src={template.liveUrl}
              title={template.title}
              className="h-full min-h-[82vh] w-full border-0 bg-white"
            />
          ) : (
            <PreviewComponent
              isMobileViewport={isMobilePreview}
              onRequestTemplate={() => onRequestQuote(template)}
            />
          )}
        </div>
      </div>

      {/* Sleek Non-Intrusive Bottom Conversion Bar */}
      <div className="relative shrink-0 border-t border-white/12 bg-[#070B16]/96 px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-6 sm:py-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2.5 sm:flex-row">
          <p className="text-center text-xs font-medium text-slate-200 sm:text-left sm:text-sm">
            Want this exact website customized for your brand?
          </p>
          <button
            type="button"
            onClick={() => onRequestQuote(template)}
            className="inline-flex min-h-[42px] w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#8B5CF6] px-5 text-xs font-bold text-[#04060C] shadow-[0_0_26px_rgba(0,240,255,0.34),0_0_40px_-14px_rgba(139,92,246,0.36)] transition-all hover:brightness-110 cursor-pointer whitespace-nowrap sm:w-auto"
          >
            <span>Yes, Build This For Me</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
