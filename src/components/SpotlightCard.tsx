import React, { useRef, useState } from 'react';

export type SpotlightAccent = 'cyan' | 'blue' | 'pink' | 'emerald';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: SpotlightAccent;
  onClick?: () => void;
  as?: 'div' | 'article' | 'button';
  ariaLabel?: string;
}

const ACCENT_RGBA: Record<SpotlightAccent, string> = {
  cyan: 'rgba(0, 240, 255, 0.14)',
  blue: 'rgba(59, 130, 246, 0.16)',
  pink: 'rgba(236, 72, 153, 0.15)',
  emerald: 'rgba(16, 185, 129, 0.15)',
};

const BORDER_HOVER: Record<SpotlightAccent, string> = {
  cyan: 'hover:border-[#00F0FF]/40',
  blue: 'hover:border-[#3B82F6]/45',
  pink: 'hover:border-[#EC4899]/40',
  emerald: 'hover:border-emerald-400/40',
};

export function SpotlightCard({
  children,
  className = '',
  accent = 'cyan',
  onClick,
  as = 'div',
  ariaLabel,
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseClasses = `group relative overflow-hidden rounded-2xl bg-[rgba(13,18,30,0.72)] backdrop-blur-xl border border-white/[0.08] transition-colors duration-200 ${BORDER_HOVER[accent]} ${className}`;

  const spotlightOverlay = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-200"
      style={{
        opacity,
        background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${ACCENT_RGBA[accent]}, transparent 65%)`,
      }}
    />
  );

  if (as === 'button') {
    return (
      <button
        ref={(node) => {
          containerRef.current = node;
        }}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={`${baseClasses} text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/70`}
      >
        {spotlightOverlay}
        <div className="relative z-10 h-full">{children}</div>
      </button>
    );
  }

  if (as === 'article') {
    return (
      <article
        ref={(node) => {
          containerRef.current = node;
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={baseClasses}
      >
        {spotlightOverlay}
        <div className="relative z-10 h-full">{children}</div>
      </article>
    );
  }

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={baseClasses}
    >
      {spotlightOverlay}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
