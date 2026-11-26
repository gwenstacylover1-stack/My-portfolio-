import { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { CONTACT_INFO } from '../../data/portfolioData';

export interface QuoteTarget {
  templateTitle: string;
  tierLabel: string;
  priceLabel?: string;
}

interface TemplateQuoteModalProps {
  target: QuoteTarget | null;
  onClose: () => void;
}

const TIMELINES = [
  'Urgent (3–5 Days)',
  'Standard (1–2 Weeks)',
  'Flexible (This Month)',
] as const;

export function TemplateQuoteModal({
  target,
  onClose,
}: TemplateQuoteModalProps) {
  const { currency } = useCurrency();
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [timeline, setTimeline] = useState<string>(TIMELINES[1]);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!target) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [target, onClose]);

  if (!target) return null;

  const buildMessage = () => {
    const lines = [
      `Hi Tarak! I'd like to request a quote from your Signature Websites showcase:`,
      ``,
      `• Selected Design: ${target.templateTitle}`,
      `• Package Tier: ${target.tierLabel}${target.priceLabel ? ` (Starting ${target.priceLabel} ${currency})` : ` (${currency})`}`,
      clientName.trim() ? `• My Name: ${clientName.trim()}` : null,
      businessName.trim() ? `• Business / Brand: ${businessName.trim()}` : null,
      `• Preferred Timeline: ${timeline}`,
      notes.trim() ? `• Custom Requirements: ${notes.trim()}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    buildMessage(),
  )}`;

  const emailSubject = encodeURIComponent(
    `Website Quote Request — ${target.templateTitle} (${target.tierLabel})`,
  );
  const emailHref = `mailto:${CONTACT_INFO.email}?subject=${emailSubject}&body=${encodeURIComponent(
    buildMessage(),
  )}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Request quote for ${target.templateTitle}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#03050C]/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="smooth-glow-frame relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[#090E1D] p-5 pb-8 text-slate-100 sm:p-7 sm:pb-8"
      >
        {/* Top specular hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/55 to-transparent"
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00F0FF]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Instant WhatsApp Quote</span>
            </div>
            <h3 className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
              Build This Website for Your Brand
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-slate-300 transition-colors hover:border-[#00F0FF]/50 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Selected Template Summary */}
        <div className="mt-5 rounded-2xl border border-[#38BDF8]/30 bg-[#00F0FF]/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium text-slate-400">
                Selected Blueprint
              </p>
              <p className="text-base font-bold text-white">
                {target.templateTitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-[#00F0FF]">
                {target.tierLabel}
              </p>
              {target.priceLabel && (
                <p className="text-sm font-bold text-white tabular-nums">
                  From {target.priceLabel} ({currency})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Customization Fields */}
        <div className="mt-5 space-y-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="quote-client-name"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                Your Name
              </label>
              <input
                id="quote-client-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Arjun Verma"
                className="min-h-[44px] w-full rounded-2xl border border-white/12 bg-[#050814] px-3.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-[#00F0FF]/60 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="quote-business-name"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                Brand / Business
              </label>
              <input
                id="quote-business-name"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Luxe Interiors"
                className="min-h-[44px] w-full rounded-2xl border border-white/12 bg-[#050814] px-3.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-[#00F0FF]/60 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-medium text-slate-300">
              Target Launch Timeline
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {TIMELINES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTimeline(option)}
                  className={`min-h-[40px] rounded-xl border px-3 text-xs font-semibold transition-colors cursor-pointer ${
                    timeline === option
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="quote-notes"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Custom Features or Notes (Optional)
            </label>
            <textarea
              id="quote-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., UPI / Stripe payments, custom domain setup, and brand color customization..."
              className="w-full rounded-xl border border-white/12 bg-[#050814] p-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00F0FF] focus:outline-none"
            />
          </div>
        </div>

        {/* Direct Conversion Actions */}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#EC4899] px-6 text-sm font-bold text-[#04060C] shadow-[0_0_28px_rgba(0,240,255,0.35)] transition-all hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Send Instant WhatsApp Quote</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={emailHref}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold text-slate-200 transition-colors hover:border-[#00F0FF]/45 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
              <span>Email Inquiry</span>
            </a>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold text-slate-200 transition-colors hover:border-[#00F0FF]/45 hover:text-white cursor-pointer"
            >
              {copied ? (
                <>
                  <Check
                    className="h-3.5 w-3.5 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-emerald-300">Copied Brief</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
