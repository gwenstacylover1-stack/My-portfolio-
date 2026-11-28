import React, { useRef, useState } from 'react';

export type ObsidianCardAccent = 'cyan' | 'blue' | 'pink' | 'emerald';

interface ObsidianServiceCardProps {
  children: React.ReactNode;
  accent?: ObsidianCardAccent;
  featured?: boolean;
  className?: string;
}

const SURFACE_GLOW: Record<ObsidianCardAccent, string> = {
  cyan: 'rgba(56, 189, 248, 0.11)',
  blue: 'rgba(56, 189, 248, 0.1)',
  pink: 'rgba(236, 72, 153, 0.095)',
  emerald: 'rgba(56, 189, 248, 0.1)',
};

const BORDER_GLOW_SECONDARY: Record<ObsidianCardAccent, string> = {
  cyan: 'rgba(236, 72, 153, 0.22)',
  blue: 'rgba(129, 140, 248, 0.26)',
  pink: 'rgba(236, 72, 153, 0.34)',
  emerald: 'rgba(52, 211, 153, 0.26)',
};

export function ObsidianServiceCard({
  children,
  accent = 'cyan',
  featured = false,
  className = '',
}: ObsidianServiceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const updatePointer = (clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setActive(true);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={(e) => updatePointer(e.clientX, e.clientY)}
      onPointerDown={(e) => updatePointer(e.clientX, e.clientY)}
      onPointerLeave={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
      className={`group/obsidian relative overflow-hidden rounded-3xl border bg-[#06080f]/85 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 focus-within:border-[#38bdf8]/40 ${
        featured
          ? 'border-[#38bdf8]/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_26px_64px_-22px_rgba(0,0,0,0.92),0_0_40px_-16px_rgba(56,189,248,0.24)]'
          : 'border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_24px_60px_-24px_rgba(0,0,0,0.9),0_0_30px_-18px_rgba(56,189,248,0.12)] hover:border-white/[0.14]'
      } ${className}`}
    >
      {/* Top-Edge Specular Rim Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* Pointer / Touch Radial Surface Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${SURFACE_GLOW[accent]}, transparent 64%)`,
        }}
      />

      {/* Crisp 1px Masked Spotlight Border (Electric Cyan #38bdf8 + Restrained Magenta #ec4899) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl p-px transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.65), ${BORDER_GLOW_SECONDARY[accent]} 52%, transparent 74%)`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
