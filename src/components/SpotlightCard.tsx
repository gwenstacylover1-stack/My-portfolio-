import React, { useEffect, useRef, useState } from 'react';

export type SpotlightAccent = 'cyan' | 'blue' | 'pink' | 'emerald';

interface SpotlightCardProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  accent?: SpotlightAccent;
  onClick?: () => void;
  as?: 'div' | 'article' | 'button';
  ariaLabel?: string;
}

const ACCENT_SURFACE_RGBA: Record<SpotlightAccent, string> = {
  cyan: 'rgba(0, 240, 255, 0.12)',
  blue: 'rgba(99, 102, 241, 0.14)',
  pink: 'rgba(192, 132, 252, 0.14)',
  emerald: 'rgba(16, 185, 129, 0.13)',
};

const ACCENT_BORDER_RGBA: Record<SpotlightAccent, string> = {
  cyan: 'rgba(56, 189, 248, 0.55)',
  blue: 'rgba(129, 140, 248, 0.58)',
  pink: 'rgba(192, 132, 252, 0.55)',
  emerald: 'rgba(52, 211, 153, 0.5)',
};

const BORDER_HOVER: Record<SpotlightAccent, string> = {
  cyan: 'hover:border-[#38BDF8]/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_26px_64px_-22px_rgba(0,0,0,0.88),0_0_46px_-14px_rgba(0,240,255,0.24),0_0_64px_-24px_rgba(139,92,246,0.24)]',
  blue: 'hover:border-[#818CF8]/42 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_26px_64px_-22px_rgba(0,0,0,0.88),0_0_46px_-14px_rgba(99,102,241,0.24),0_0_64px_-24px_rgba(0,240,255,0.2)]',
  pink: 'hover:border-[#C084FC]/42 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_26px_64px_-22px_rgba(0,0,0,0.88),0_0_46px_-14px_rgba(168,85,247,0.24),0_0_64px_-24px_rgba(236,72,153,0.22)]',
  emerald:
    'hover:border-emerald-400/38 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_26px_64px_-22px_rgba(0,0,0,0.88),0_0_44px_-14px_rgba(16,185,129,0.22)]',
};

export function SpotlightCard({
  children,
  id,
  className = '',
  accent = 'cyan',
  onClick,
  as = 'div',
  ariaLabel,
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!finePointer) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseClasses = `group relative overflow-hidden rounded-3xl liquid-glass transition-all duration-300 ${BORDER_HOVER[accent]} ${className}`;

  const specularOverlay = finePointer ? (
    <>
      {/* Pointer-reactive radial surface glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(440px circle at ${position.x}px ${position.y}px, ${ACCENT_SURFACE_RGBA[accent]}, transparent 64%)`,
        }}
      />
      {/* Crisp 1px pointer-reactive dual-tone cyan/violet specular edge highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl p-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${ACCENT_BORDER_RGBA[accent]}, rgba(139, 92, 246, 0.22) 55%, transparent 74%)`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </>
  ) : null;

  const topSpecularEdge = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent"
    />
  );

  if (as === 'button') {
    return (
      <button
        id={id}
        ref={(node) => {
          containerRef.current = node;
        }}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => finePointer && setOpacity(1)}
        onMouseLeave={() => finePointer && setOpacity(0)}
        className={`${baseClasses} text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70`}
      >
        {topSpecularEdge}
        {specularOverlay}
        <div className="relative z-10 h-full">{children}</div>
      </button>
    );
  }

  if (as === 'article') {
    return (
      <article
        id={id}
        ref={(node) => {
          containerRef.current = node;
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => finePointer && setOpacity(1)}
        onMouseLeave={() => finePointer && setOpacity(0)}
        className={baseClasses}
      >
        {topSpecularEdge}
        {specularOverlay}
        <div className="relative z-10 h-full">{children}</div>
      </article>
    );
  }

  return (
    <div
      id={id}
      ref={(node) => {
        containerRef.current = node;
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => finePointer && setOpacity(1)}
      onMouseLeave={() => finePointer && setOpacity(0)}
      className={baseClasses}
    >
      {topSpecularEdge}
      {specularOverlay}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
