import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#04060B]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-xs text-slate-400 sm:text-left">
          &copy; 2026 S.Tarak Full-Stack Web &amp; AI Systems Developer.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <a
            href={CONTACT_INFO.livePlatformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-[#00F0FF] whitespace-nowrap"
          >
            <span>{CONTACT_INFO.livePlatformName}</span>
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
