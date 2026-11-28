import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Server,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  CONTACT_INFO,
  PROJECT_TYPES,
  SERVICE_OFFERINGS,
} from '../data/portfolioData';
import { InstagramIcon, SOCIAL_LINKS, YouTubeIcon } from './SocialIcons';
import { SpotlightCard } from './SpotlightCard';
import { buildSmartEmailLink, getHireMeEmailLink } from '../utils/email';

const SERVICE_ICONS = {
  globe: Globe,
  cpu: Cpu,
  server: Server,
};

export function ContactSection() {
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0]);
  const [brief, setBrief] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [formHint, setFormHint] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_INFO.email);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = CONTACT_INFO.email;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setCopiedToast(true);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setCopiedToast(false);
      }, 2600);
    } catch {
      setCopiedToast(false);
    }
  };

  const trimmedName = name.trim();
  const trimmedBrief = brief.trim();

  const rawEmailSubject = `[${projectType}] Project Inquiry${trimmedName ? ` from ${trimmedName}` : ''}`;
  const rawEmailBody = [
    'Hi Tarak,',
    '',
    `Name: ${trimmedName || 'Not specified'}`,
    `Project Type: ${projectType}`,
    '',
    'Project Brief:',
    trimmedBrief || 'I would like to discuss building a new product together.',
  ].join('\n');
  const formEmailLink = buildSmartEmailLink(rawEmailSubject, rawEmailBody);
  const directEmailLink = getHireMeEmailLink();

  const whatsappInquiryText = encodeURIComponent(
    [
      'Hi Tarak,',
      trimmedName ? `My name is ${trimmedName}.` : '',
      `Project Type: ${projectType}`,
      trimmedBrief
        ? `Project Brief: ${trimmedBrief}`
        : 'I would like to discuss a new project with you.',
    ]
      .filter(Boolean)
      .join('\n'),
  );
  const formWhatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${whatsappInquiryText}`;

  const directWhatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    CONTACT_INFO.defaultWhatsappGreeting,
  )}`;

  const handleInquiryDispatch = (channel: 'Email' | 'WhatsApp') => {
    setFormHint(`Opening pre-filled ${channel} draft for Tarak.`);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section Heading */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-medium tracking-[0.18em] text-[#00F0FF] uppercase">
              Services &amp; Direct Contact
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s Build Your Next Product
            </h2>
          </div>

          {/* 3 Clean Service Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SERVICE_OFFERINGS.map((service, idx) => {
              const Icon = SERVICE_ICONS[service.icon];
              const accent = idx === 0 ? 'cyan' : idx === 1 ? 'pink' : 'blue';
              const iconColor =
                accent === 'cyan'
                  ? 'text-[#00F0FF]'
                  : accent === 'pink'
                    ? 'text-[#EC4899]'
                    : 'text-[#3B82F6]';

              return (
                <SpotlightCard
                  key={service.id}
                  accent={accent}
                  className="p-6"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/[0.07] pt-3 text-[11px] text-slate-400">
                        {service.deliverables.map((item, i) => (
                          <span key={item} className="inline-flex items-center gap-2">
                            <span>{item}</span>
                            {i < service.deliverables.length - 1 && (
                              <span aria-hidden="true" className="text-slate-600">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Direct Contact Panel & Quick-Inquiry Form */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Email, WhatsApp & Location */}
            <div className="flex flex-col gap-5 lg:col-span-5">
              {/* Direct Email Card */}
              <SpotlightCard accent="cyan" className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00F0FF]/25 bg-[#00F0FF]/10 text-[#00F0FF]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] tracking-wider text-slate-400 uppercase">
                      Direct Email
                    </div>
                    <div className="truncate text-sm font-medium text-white">
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    {...directEmailLink}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#00F0FF] px-4 py-2.5 text-xs font-semibold text-[#05070D] shadow-[0_0_20px_rgba(0,240,255,0.28)] transition-all duration-200 hover:bg-[#5CF6FF] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Send Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-100 transition-colors duration-150 hover:border-[#00F0FF]/45 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    {copiedToast ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </SpotlightCard>

              {/* WhatsApp Direct Card */}
              <SpotlightCard accent="blue" className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-[11px] tracking-wider text-slate-400 uppercase">
                        WhatsApp Direct
                      </div>
                      <div className="text-sm font-medium text-white tabular-nums">
                        {CONTACT_INFO.whatsappDisplay}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Fastest channel for project scoping, architecture discussions, and rapid
                  timeline estimates.
                </p>

                <a
                  href={directWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs font-semibold text-emerald-200 transition-all duration-200 hover:border-emerald-400/60 hover:bg-emerald-400/20 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </SpotlightCard>

              {/* Compact 2-Column Connect on Socials Row */}
              <div>
                <div className="mb-2 px-1 text-[10.5px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  Connect on Socials
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SpotlightCard accent="pink" className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/12 text-fuchsia-300">
                        <InstagramIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] tracking-wider text-slate-400 uppercase">
                          Instagram
                        </div>
                        <div className="truncate text-xs font-semibold text-white">
                          {SOCIAL_LINKS.instagram.handle}
                        </div>
                      </div>
                    </div>
                    <a
                      href={SOCIAL_LINKS.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-200 transition-all duration-150 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/20 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                    >
                      <span>Follow</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </SpotlightCard>

                  <SpotlightCard accent="cyan" className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/35 bg-rose-500/12 text-rose-400">
                        <YouTubeIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] tracking-wider text-slate-400 uppercase">
                          YouTube
                        </div>
                        <div className="truncate text-xs font-semibold text-white">
                          {SOCIAL_LINKS.youtube.handle}
                        </div>
                      </div>
                    </div>
                    <a
                      href={SOCIAL_LINKS.youtube.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-200 transition-all duration-150 hover:border-rose-400/60 hover:bg-rose-500/20 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                    >
                      <span>Watch</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </SpotlightCard>
                </div>
              </div>

              {/* Location Card */}
              <SpotlightCard accent="pink" className="p-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#EC4899]/25 bg-[#EC4899]/10 text-[#EC4899]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-wider text-slate-400 uppercase">
                      Base &amp; Availability
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-slate-100">
                      {CONTACT_INFO.location}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            {/* Right Column: Interactive Quick-Inquiry Form */}
            <div className="lg:col-span-7">
              <SpotlightCard accent="cyan" className="h-full p-6 sm:p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Quick Project Inquiry
                  </h3>
                  <p className="text-sm text-slate-400">
                    Fill in your project details below to launch a pre-filled Email or
                    WhatsApp message directly.
                  </p>
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-6 space-y-5"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="mb-1.5 block text-xs text-slate-300"
                      >
                        Your Name
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formHint) setFormHint(null);
                        }}
                        placeholder="Alex Rivera"
                        className="w-full min-h-[46px] rounded-xl border border-white/10 bg-[#05070D]/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-[#00F0FF]/60 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-type"
                        className="mb-1.5 block text-xs text-slate-300"
                      >
                        Project Type
                      </label>
                      <select
                        id="inquiry-type"
                        value={projectType}
                        onChange={(e) => {
                          setProjectType(e.target.value);
                          if (formHint) setFormHint(null);
                        }}
                        className="w-full min-h-[46px] rounded-xl border border-white/10 bg-[#05070D]/90 px-4 py-2.5 text-sm text-white transition-colors focus:border-[#00F0FF]/60 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-[#0A0F1D] text-slate-100"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-brief"
                      className="mb-1.5 block text-xs text-slate-300"
                    >
                      Project Brief
                    </label>
                    <textarea
                      id="inquiry-brief"
                      rows={5}
                      value={brief}
                      onChange={(e) => {
                        setBrief(e.target.value);
                        if (formHint) setFormHint(null);
                      }}
                      placeholder="Describe your platform goals, AI voice/vision capabilities, wallet or payment workflow, and target timeline..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#05070D]/80 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-500 transition-colors focus:border-[#00F0FF]/60 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                    <a
                      {...formEmailLink}
                      onClick={() => handleInquiryDispatch('Email')}
                      className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-[#05070D] shadow-[0_0_24px_rgba(0,240,255,0.28)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_32px_rgba(0,240,255,0.48)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send via Email</span>
                    </a>

                    <a
                      href={formWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleInquiryDispatch('WhatsApp')}
                      className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>

                  {formHint && (
                    <p
                      role="status"
                      className="text-xs text-[#00F0FF]"
                    >
                      {formHint}
                    </p>
                  )}
                </form>
              </SpotlightCard>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating "Copied!" Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 right-6 z-50 transition-all duration-200 ${
          copiedToast
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-[#0A1120]/95 px-4 py-2.5 text-xs font-medium text-emerald-200 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          <span>Copied!</span>
          <span className="text-slate-400">{CONTACT_INFO.email}</span>
        </div>
      </div>
    </section>
  );
}
