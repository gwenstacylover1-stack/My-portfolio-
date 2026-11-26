import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafePhotoProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  fallbackClassName?: string;
  loading?: 'lazy' | 'eager';
}

export function SafePhoto({
  src,
  alt,
  className = 'h-full w-full object-cover',
  fallbackLabel,
  fallbackClassName = 'bg-slate-900 text-slate-300',
  loading = 'lazy',
}: SafePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center ${fallbackClassName}`}
      >
        <ImageIcon className="h-5 w-5 opacity-60" aria-hidden="true" />
        <span className="line-clamp-2 text-[11px] font-medium opacity-80">
          {fallbackLabel ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
