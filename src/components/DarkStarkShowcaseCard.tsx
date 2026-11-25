import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Layers,
  Server,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react';
import { FlagshipProject } from '../data/portfolioData';

interface DarkStarkShowcaseCardProps {
  project: FlagshipProject;
  onOpenCaseStudy: (project: FlagshipProject) => void;
}

const ENGINEERING_HIGHLIGHTS = [
  {
    id: 'zapupi-gateway',
    title: 'Automated ZapUPI Gateway',
    description:
      '100% instant automated UPI wallet crediting with zero manual UTR verification.',
    icon: Zap,
    accent: 'cyan' as const,
  },
  {
    id: 'support-admin-terminal',
    title: 'Two-Way Support & Admin Terminal',
    description:
      'Interactive customer ticket threads synced in real time with a dedicated Admin Terminal for filtering, replying, and status management.',
    icon: Terminal,
    accent: 'magenta' as const,
  },
  {
    id: 'serverless-edge',
    title: 'Serverless Edge Architecture',
    description:
      'Custom Cloudflare Workers API proxy handling automated SMM v2 order placement, live balance syncing, and multi-currency conversion.',
    icon: Server,
    accent: 'cyan' as const,
  },
  {
    id: 'mobile-first-ux',
    title: 'Mobile-First Responsive UX',
    description:
      'Adaptive mobile and desktop navigation, real-time order tracking, and fast zero-clutter checkout flows.',
    icon: Smartphone,
    accent: 'magenta' as const,
  },
];

const TECH_STACK_BADGES = [
  'React',
  'Cloudflare Pages & Workers',
  'Firebase Auth & DB',
  'ZapUPI API',
  'Tailwind CSS',
] as const;

/* 6px Metallic-Prismatic Extruded Slab Layers (-1px through -6px) */
const EXTRUDED_PRISMATIC_LAYERS = [
  'emblem-extrude-1 border border-white/40 bg-gradient-to-r from-[#FF2E93] via-[#38BDF8] to-[#00F0FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_0_12px_rgba(0,240,255,0.45)]',
  'emblem-extrude-2 border border-[#00F0FF]/70 bg-gradient-to-r from-[#EC4899] via-[#1E293B] to-[#06B6D4] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
  'emblem-extrude-3 border border-[#38BDF8]/65 bg-gradient-to-r from-[#DB2777] via-[#172033] to-[#0891B2]',
  'emblem-extrude-4 border border-[#EC4899]/65 bg-gradient-to-r from-[#BE185D] via-[#111827] to-[#0E7490]',
  'emblem-extrude-5 border border-[#00F0FF]/55 bg-gradient-to-r from-[#9D174D] via-[#0B101E] to-[#155E75]',
  'emblem-extrude-6 border border-white/20 bg-gradient-to-r from-[#831843] via-[#050812] to-[#164E63] shadow-[0_14px_28px_rgba(0,0,0,0.92)]',
] as const;

const EMBER_PARTICLES = [
  {
    id: 'e1',
    posClass: 'ember-1',
    colorClass:
      'h-[2.5px] w-[2.5px] bg-[#00F0FF] shadow-[0_0_6px_rgba(0,240,255,0.85)]',
  },
  {
    id: 'e2',
    posClass: 'ember-2',
    colorClass:
      'h-[2px] w-[2px] bg-[#EC4899] shadow-[0_0_6px_rgba(236,72,153,0.85)]',
  },
  {
    id: 'e3',
    posClass: 'ember-3',
    colorClass:
      'h-[3px] w-[3px] bg-[#00F0FF] shadow-[0_0_7px_rgba(0,240,255,0.85)]',
  },
  {
    id: 'e4',
    posClass: 'ember-4',
    colorClass:
      'h-[2px] w-[2px] bg-[#FF2E93] shadow-[0_0_6px_rgba(255,46,147,0.85)]',
  },
  {
    id: 'e5',
    posClass: 'ember-5',
    colorClass:
      'h-[2.5px] w-[2.5px] bg-[#38BDF8] shadow-[0_0_6px_rgba(56,189,248,0.85)]',
  },
  {
    id: 'e6',
    posClass: 'ember-6',
    colorClass:
      'h-[2px] w-[2px] bg-[#EC4899] shadow-[0_0_6px_rgba(236,72,153,0.8)]',
  },
] as const;

export function DarkStarkShowcaseCard({
  project,
  onOpenCaseStudy,
}: DarkStarkShowcaseCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const popResetTimerRef = useRef<number | null>(null);
  const spinTimerRef = useRef<number | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    return () => {
      if (popResetTimerRef.current !== null) {
        window.clearTimeout(popResetTimerRef.current);
      }
      if (spinTimerRef.current !== null) {
        window.clearTimeout(spinTimerRef.current);
      }
    };
  }, []);

  /* Interactive soft-light card spotlight (desktop cursor + mobile touch) */
  const updateCardSpotlight = (clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    card.style.setProperty('--card-spot-x', `${(clientX - rect.left).toFixed(1)}px`);
    card.style.setProperty('--card-spot-y', `${(clientY - rect.top).toFixed(1)}px`);
    card.style.setProperty('--card-spot-opacity', '1');
  };

  const hideCardSpotlight = () => {
    cardRef.current?.style.setProperty('--card-spot-opacity', '0');
  };

  /* Interactive inner 3D tilt (outer figure-8 levitation never freezes) */
  const applyTiltAtPoint = (
    clientX: number,
    clientY: number,
    popped = false,
  ) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const normX = Math.max(
      -1,
      Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1),
    );
    const normY = Math.max(
      -1,
      Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1),
    );

    const rotY = normX * 18;
    const rotX = -normY * 16;
    const glareX = 50 + normX * 42;
    const glareY = 50 + normY * 42;
    const glareAngle = 125 + normX * 42 - normY * 24;

    el.dataset.tracking = 'true';
    el.style.setProperty('--tilt-rx', `${rotX.toFixed(2)}deg`);
    el.style.setProperty('--tilt-ry', `${rotY.toFixed(2)}deg`);
    el.style.setProperty('--tilt-z', popped ? '18px' : '10px');
    el.style.setProperty('--tilt-scale', popped ? '1.05' : '1.03');
    el.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
    el.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
    el.style.setProperty('--glare-angle', `${glareAngle.toFixed(1)}deg`);
    el.style.setProperty('--glare-opacity', popped ? '0.88' : '0.68');
  };

  const resetTilt = () => {
    const el = stageRef.current;
    if (!el) return;
    el.dataset.tracking = 'false';
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
    el.style.setProperty('--tilt-z', '0px');
    el.style.setProperty('--tilt-scale', '1');
    el.style.setProperty('--glare-x', '50%');
    el.style.setProperty('--glare-y', '32%');
    el.style.setProperty('--glare-angle', '125deg');
    el.style.setProperty('--glare-opacity', '0.36');
  };

  /* Spring-weighted 360° Y-axis spin + expanding energy ring pulse on tap/click */
  const triggerEmblemSpin = () => {
    if (spinTimerRef.current !== null) {
      window.clearTimeout(spinTimerRef.current);
    }
    setSpinCount((c) => c + 1);
    setIsSpinning(true);
    spinTimerRef.current = window.setTimeout(() => {
      setIsSpinning(false);
      spinTimerRef.current = null;
    }, 980);
  };

  const handleEmblemPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    applyTiltAtPoint(e.clientX, e.clientY, e.buttons > 0);
  };

  const handleEmblemPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (popResetTimerRef.current !== null) {
      window.clearTimeout(popResetTimerRef.current);
      popResetTimerRef.current = null;
    }
    applyTiltAtPoint(e.clientX, e.clientY, true);
  };

  const handleEmblemPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') {
      popResetTimerRef.current = window.setTimeout(() => {
        resetTilt();
        popResetTimerRef.current = null;
      }, 280);
    } else {
      applyTiltAtPoint(e.clientX, e.clientY, false);
    }
  };

  const handleEmblemTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    applyTiltAtPoint(touch.clientX, touch.clientY, true);
  };

  const handleEmblemKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerEmblemSpin();
    }
  };

  return (
    <article
      id="dark-stark-platform"
      ref={cardRef}
      onPointerMove={(e) => updateCardSpotlight(e.clientX, e.clientY)}
      onPointerDown={(e) => updateCardSpotlight(e.clientX, e.clientY)}
      onPointerLeave={hideCardSpotlight}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) updateCardSpotlight(touch.clientX, touch.clientY);
      }}
      onTouchEnd={hideCardSpotlight}
      className="group dark-stark-obsidian relative mb-7 scroll-mt-28 overflow-visible rounded-[22px] border border-white/[0.11] p-5 font-sans transition-[border-color,box-shadow] duration-300 hover:border-white/[0.18] sm:p-8 lg:p-10"
    >
      {/* Clipped Obsidian Glass Surface Layers (Grain + 1px Specular Highlight + Animated Border Beam + Soft-Light Spotlight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]"
      >
        {/* 2% Fine Obsidian Grain Texture */}
        <div className="dark-stark-grain absolute inset-0" />

        {/* Controlled Corner Ambient Glows */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.12)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.10)_0%,transparent_70%)] blur-2xl" />

        {/* Interactive Touch/Pointer Soft-Light Spotlight */}
        <div className="dark-stark-spotlight absolute inset-0 rounded-[22px]" />

        {/* Crisp 1px Top-Edge White Specular Highlight (rgba(255,255,255,0.22)) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.22] to-transparent" />

        {/* Razor-Thin Animated Cyan-to-Magenta Luminous Border Beam */}
        <div className="dark-stark-border-beam absolute inset-0 rounded-[22px]">
          <div className="dark-stark-border-beam-rotator absolute left-1/2 top-1/2 h-[220%] w-[220%] min-h-[1200px] min-w-[1200px]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col overflow-visible">
        {/* TOP HEADER: True 3D Extruded Prismatic Emblem + Title + LIVE IN PRODUCTION Pill + Primary CTAs */}
        <div className="flex flex-col gap-5 overflow-visible border-b border-white/[0.08] pb-7">
          <div className="flex items-center gap-4 overflow-visible sm:gap-6 md:flex-row-reverse md:items-center md:justify-between md:gap-10">
            {/* TRUE 3D PHYSICAL EMBLEM STAGE (overflow: visible, generous breathing room) */}
            <div
              ref={stageRef}
              role="button"
              tabIndex={0}
              aria-label="Dark Stark SMM interactive 3D emblem — tap to spin 360 degrees"
              onClick={triggerEmblemSpin}
              onKeyDown={handleEmblemKeyDown}
              onPointerMove={handleEmblemPointerMove}
              onPointerDown={handleEmblemPointerDown}
              onPointerUp={handleEmblemPointerUp}
              onPointerLeave={resetTilt}
              onPointerCancel={resetTilt}
              onTouchMove={handleEmblemTouchMove}
              onTouchEnd={() => {
                if (popResetTimerRef.current !== null) {
                  window.clearTimeout(popResetTimerRef.current);
                }
                popResetTimerRef.current = window.setTimeout(() => {
                  resetTilt();
                  popResetTimerRef.current = null;
                }, 280);
              }}
              className="group/emblem emblem-3d-stage relative shrink-0 overflow-visible px-3 pt-4 pb-8 outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/60 focus-visible:rounded-3xl sm:px-4 md:px-6 md:pt-5 md:pb-9"
            >
              {/* Soft Pulsing Crimson-Left & Electric-Cyan-Right Ambient Backlight Aura */}
              <div
                aria-hidden="true"
                className="animate-emblem-aura pointer-events-none absolute -inset-3 rounded-[2.25rem] bg-[radial-gradient(circle_at_28%_48%,rgba(244,63,94,0.36)_0%,transparent_58%),radial-gradient(circle_at_74%_48%,rgba(0,240,255,0.4)_0%,transparent_60%)] blur-xl transition-all duration-300 group-hover/emblem:blur-2xl group-hover/emblem:brightness-125 md:-inset-4"
              />

              {/* Subtle Rising Cyan/Magenta Micro-Ember Particles Behind Emblem (GPU 60fps) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-2 -top-4 bottom-2 overflow-visible"
              >
                {EMBER_PARTICLES.map((particle) => (
                  <span
                    key={particle.id}
                    className={`ember-particle absolute rounded-full ${particle.posClass} ${particle.colorClass}`}
                  />
                ))}
              </div>

              {/* Expanding Energy Ring Pulse on Tap/Click */}
              {spinCount > 0 && isSpinning && (
                <div
                  key={`burst-${spinCount}`}
                  aria-hidden="true"
                  className="animate-energy-burst pointer-events-none absolute left-1/2 top-[44%] h-24 w-24 rounded-full border border-[#00F0FF]/85 shadow-[0_0_24px_rgba(0,240,255,0.75),inset_0_0_16px_rgba(236,72,153,0.55)] sm:h-28 sm:w-28"
                />
              )}

              {/* OUTER 3D WRAPPER: Continuous non-stop CSS figure-8 levitation (NEVER freezes on touch) */}
              <div className="animate-float-3d relative">
                {/* INNER 3D WRAPPER: Live Touch/Pointer Tilt + Smooth Spring-Back */}
                <div className="emblem-3d-interactive relative">
                  {/* Tilted Ultra-Thin Glowing Cyan-Pink 3D Orbital Ring (rotateX 74deg) */}
                  <div
                    aria-hidden="true"
                    className="emblem-orbit-plane pointer-events-none absolute left-1/2 top-1/2 h-[142px] w-[142px] sm:h-[158px] sm:w-[158px] md:h-[176px] md:w-[176px]"
                  >
                    <svg
                      viewBox="0 0 180 180"
                      fill="none"
                      className="emblem-orbit-ring animate-orbit-ring h-full w-full overflow-visible"
                    >
                      <defs>
                        <linearGradient
                          id="darkStarkOrbitStroke"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#00F0FF" stopOpacity="1" />
                          <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.4" />
                          <stop offset="56%" stopColor="#FF2E93" stopOpacity="1" />
                          <stop offset="82%" stopColor="#EC4899" stopOpacity="0.42" />
                          <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="90"
                        cy="90"
                        r="86"
                        stroke="url(#darkStarkOrbitStroke)"
                        strokeWidth="1.25"
                      />
                    </svg>
                  </div>

                  {/* TAP-SPIN LAYER: Spring-Weighted 360° Y-Axis Spin */}
                  <div
                    key={isSpinning ? `spin-${spinCount}` : 'spin-idle'}
                    className={`emblem-3d-spin-layer relative ${
                      isSpinning ? 'animate-emblem-spin-360' : ''
                    }`}
                  >
                    {/* 6px Extruded 3D Metallic-Prismatic Slab Stack (-1px through -6px) */}
                    <div className="emblem-3d-stack relative">
                      {EXTRUDED_PRISMATIC_LAYERS.map((layerClass, i) => (
                        <div
                          key={i}
                          aria-hidden="true"
                          className={`pointer-events-none absolute inset-0 rounded-[1.35rem] ${layerClass}`}
                        />
                      ))}

                      {/* Front Face: Bright Top-Rim Specular Metallic Bevel + Exact Logo + Color-Dodge Foil */}
                      <div className="emblem-front-face relative rounded-[1.35rem] bg-gradient-to-br from-white/75 via-[#00F0FF]/70 to-[#FF2E93]/75 p-[1.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_14px_30px_rgba(0,0,0,0.78),0_0_28px_rgba(0,240,255,0.28),0_0_20px_rgba(236,72,153,0.22)] transition-shadow duration-300 group-hover/emblem:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_22px_46px_rgba(0,0,0,0.86),0_0_44px_rgba(0,240,255,0.56),0_0_34px_rgba(236,72,153,0.44)]">
                        {/* Inner Recessed Metallic Dark-Glass Bevel */}
                        <div className="relative rounded-[1.25rem] bg-gradient-to-b from-[#1D2840] via-[#0B1120] to-[#05070E] p-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.48),inset_0_-2px_6px_rgba(0,0,0,0.92)]">
                          {/* Emblem Image Clipped Surface + Color-Dodge Iridescent Foil */}
                          <div className="relative overflow-hidden rounded-[0.95rem] bg-[#04060C]">
                            <img
                              src="/assets/aistudio/IMG_20261031_020408_05f4eee2_05f4eee2.png"
                              alt="Dark Stark SMM official brand emblem"
                              width={116}
                              height={116}
                              decoding="async"
                              draggable={false}
                              className="h-24 w-24 shrink-0 rounded-[0.95rem] object-cover sm:h-[106px] sm:w-[106px] md:h-[116px] md:w-[116px]"
                            />

                            {/* Iridescent Color-Dodge Prismatic Foil Sheen */}
                            <div
                              aria-hidden="true"
                              className="emblem-prismatic-foil pointer-events-none absolute inset-0 rounded-[0.95rem]"
                            />

                            {/* Periodic Diagonal Specular Light-Glint Sweep */}
                            <div
                              aria-hidden="true"
                              className="animate-emblem-glint pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                            />

                            {/* Crisp Inner Top-Rim Glass Highlight */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-[0.95rem] ring-1 ring-inset ring-white/25"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caustic Cyan-Magenta Floor Light Reflection (breathes in sync with logo height) */}
              <div
                aria-hidden="true"
                className="animate-caustic-floor pointer-events-none absolute bottom-0 left-1/2 h-5 w-[104%] rounded-full bg-[radial-gradient(ellipse_at_35%_50%,rgba(236,72,153,0.34)_0%,transparent_54%),radial-gradient(ellipse_at_68%_50%,rgba(0,240,255,0.42)_0%,transparent_58%)] blur-[9px]"
              />

              {/* Realistic Dark Occlusion Shadow Beneath Emblem */}
              <div
                aria-hidden="true"
                className="animate-float-shadow pointer-events-none absolute bottom-1 left-1/2 h-3.5 w-[78%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.98)_0%,rgba(2,6,18,0.88)_48%,transparent_84%)] blur-[5px]"
              />
            </div>

            {/* Project Meta, Title & Desktop Subtitle */}
            <div className="min-w-0 flex-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-400 tabular-nums sm:text-xs">
                  PROJECT {project.orderNumber}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-gradient-to-r from-emerald-500/15 via-[#00F0FF]/12 to-cyan-500/15 px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.1em] text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)] whitespace-nowrap sm:gap-2 sm:px-3 sm:py-1 sm:text-[10.5px] sm:tracking-[0.14em]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  </span>
                  <span>LIVE IN PRODUCTION</span>
                </span>
              </div>

              <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                Dark Stark SMM
              </h3>

              <p className="mt-2.5 hidden text-sm leading-relaxed text-slate-300 md:block sm:text-[15px]">
                Full-stack live production wallet, automated SMM v2 order-routing,
                and real-time customer support web platform deployed on Cloudflare
                Global Edge and Firebase.
              </p>
            </div>
          </div>

          {/* Mobile Subtitle (keeps header emblem + title compact above CTA buttons) */}
          <p className="text-sm leading-relaxed text-slate-300 md:hidden">
            Full-stack live production wallet, automated SMM v2 order-routing,
            and real-time customer support web platform deployed on Cloudflare
            Global Edge and Firebase.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0891B2] via-[#2563EB] to-[#C026D3] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_0_30px_rgba(0,240,255,0.28),0_0_24px_rgba(236,72,153,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_12px_36px_rgba(0,240,255,0.38),0_0_30px_rgba(236,72,153,0.36)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              >
                {/* Periodic Diagonal Glass Light-Glint Sweep */}
                <span
                  aria-hidden="true"
                  className="animate-cta-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
                <span className="relative z-10">Launch Live Platform</span>
                <ArrowUpRight
                  className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            )}

            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-5 py-3 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00F0FF]/45 hover:bg-white/[0.08] hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              <span>Architecture Case Study</span>
            </button>
          </div>
        </div>

        {/* 2x2 DETAILED FEATURE & ENGINEERING GRID */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ENGINEERING_HIGHLIGHTS.map((feature) => {
            const Icon = feature.icon;
            const isCyan = feature.accent === 'cyan';

            return (
              <div
                key={feature.id}
                className={`group/tile relative flex flex-col rounded-2xl border border-white/[0.09] bg-[#060A15]/75 p-5 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 sm:p-6 ${
                  isCyan
                    ? 'hover:border-[#00F0FF]/45 hover:bg-[#081020]/90 hover:shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_26px_rgba(0,240,255,0.12)]'
                    : 'hover:border-fuchsia-400/45 hover:bg-[#10091C]/85 hover:shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_26px_rgba(236,72,153,0.13)]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover/tile:scale-105 ${
                      isCyan
                        ? 'border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_18px_rgba(0,240,255,0.16)]'
                        : 'border-fuchsia-400/30 bg-fuchsia-500/12 text-fuchsia-300 shadow-[0_0_18px_rgba(236,72,153,0.18)]'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-sans text-[15px] font-bold tracking-tight text-white sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300/95">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TECH STACK BADGES ROW */}
        <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase whitespace-nowrap">
            Production Stack
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {TECH_STACK_BADGES.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.11] bg-white/[0.04] px-3 py-1 font-mono text-[11px] font-medium text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
