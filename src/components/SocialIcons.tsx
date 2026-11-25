export const SOCIAL_LINKS = {
  instagram: {
    url: 'https://www.instagram.com/tarakdevp',
    handle: '@tarakdevp',
    label: 'Instagram',
  },
  youtube: {
    url: 'https://www.youtube.com/@tarakyt-i9z',
    handle: 'TARAK YT',
    fullHandle: 'TARAK YT (@tarakyt-i9z)',
    label: 'YouTube',
  },
} as const;

export function InstagramIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22.2 8.2a3 3 0 0 0-2.1-2.12C18.25 5.6 12 5.6 12 5.6s-6.25 0-8.1.48A3 3 0 0 0 1.8 8.2C1.3 10.05 1.3 12 1.3 12s0 1.95.5 3.8a3 3 0 0 0 2.1 2.12c1.85.48 8.1.48 8.1.48s6.25 0 8.1-.48a3 3 0 0 0 2.1-2.12c.5-1.85.5-3.8.5-3.8s0-1.95-.5-3.8Z" />
      <path
        d="M9.9 15.1V8.9l5.3 3.1-5.3 3.1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
