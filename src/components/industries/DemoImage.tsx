import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface DemoImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  fallbackTheme?: 'dark' | 'warm' | 'light';
}

export function DemoImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  imgClassName = '',
  imgStyle,
  fallbackTheme = 'dark',
}: DemoImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setActiveSrc(src);
    setAllFailed(false);
    // Avoid flash if browser already has the image cached
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc);
      setLoaded(false);
      return;
    }
    setAllFailed(true);
  };

  const placeholderBg =
    fallbackTheme === 'light'
      ? 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-slate-700'
      : fallbackTheme === 'warm'
        ? 'bg-gradient-to-br from-[#2B2219] via-[#3E3022] to-[#1A140F] text-[#E5C787]'
        : 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#090D16] text-slate-200';

  if (allFailed || !activeSrc) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden ${placeholderBg} ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.12),transparent_55%)]"
        />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="line-clamp-2 max-w-[85%] text-[11px] font-semibold tracking-wide opacity-85">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${placeholderBg} ${className}`}>
      <img
        ref={imgRef}
        src={activeSrc}
        alt={alt}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        style={imgStyle}
        className={`h-full w-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
        } ${imgClassName}`}
      />
    </div>
  );
}
