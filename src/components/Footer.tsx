import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from './SocialIcons';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#04060B]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-xs text-slate-400 sm:text-left">
          &copy; 2026 S.Tarak Full-Stack Web &amp; AI Systems Developer.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium">
          <a
            href="https://crunchxdemo.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-[#00F0FF] whitespace-nowrap"
          >
            <span>CRUNCHX 3D Demo</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href={SOCIAL_LINKS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-fuchsia-300 whitespace-nowrap"
          >
            <span>Instagram</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href={SOCIAL_LINKS.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-rose-300 whitespace-nowrap"
          >
            <span>YouTube</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href="#top"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-white whitespace-nowrap"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
