'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <header className="border-b border-[#0A0A0A] px-6">
      <div className="flex items-center gap-6 h-14">
        <Link
          href="/"
          className="text-base font-bold uppercase tracking-tight whitespace-nowrap shrink-0"
        >
          Kosa Rupa
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
        <nav className="flex items-center gap-4 shrink-0">
          <Link
            href="/a-z"
            className="text-[10px] font-semibold tracking-[0.2em] uppercase border border-[#0A0A0A] px-3 py-1.5 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150"
          >
            A–Z
          </Link>
          <Link
            href="/explore"
            className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity duration-150"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity duration-150"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
