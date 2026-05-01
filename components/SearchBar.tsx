'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchEntries } from '@/lib/search';
import { COLOR_MAP } from '@/lib/entries';
import type { Entry, Section } from '@/lib/types';

export default function SearchBar({ entries, sections }: { entries: Entry[]; sections: Section[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [shortcutHint, setShortcutHint] = useState('⌘K');

  useEffect(() => {
    const isMac = /mac/i.test(navigator.platform) || /mac/i.test(navigator.userAgent);
    setShortcutHint(isMac ? '⌘K' : 'Ctrl K');
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setOpen(false);
        return;
      }
      const r = searchEntries(entries, q).slice(0, 8);
      setResults(r);
      // Open dropdown when there are results OR when query is long enough to suggest generation
      setOpen(r.length > 0 || q.trim().length > 2);
      setActiveIndex(-1);
    },
    [entries]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      router.push(`/entry/${results[activeIndex].id}`);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center border border-[#0A0A0A] bg-white">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search terms…"
          className="flex-1 px-4 py-2.5 text-sm font-medium text-[#0A0A0A] placeholder-[#0A0A0A]/40 outline-none bg-transparent"
        />
        <span className="hidden sm:inline px-3 text-[10px] font-semibold tracking-[0.15em] text-[#0A0A0A]/30 select-none">
          {shortcutHint}
        </span>
      </div>

      {open && (() => {
        const q = query.trim();
        const totalPrefix = q
          ? entries.filter((e) => e.term.toLowerCase().startsWith(q.toLowerCase())).length
          : 0;
        const firstLetter = q[0]?.toUpperCase() ?? '';
        const showViewAll = totalPrefix > results.length;
        const showGenerate = results.length === 0 && q.length > 2;
        const generateSlug = q.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return (
        <div className="absolute top-full left-0 right-0 z-50 border border-t-0 border-[#0A0A0A] bg-white">
          {results.map((entry, i) => {
            const section = sections.find((s) => s.id === entry.section);
            const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;
            return (
              <a
                key={entry.id}
                href={`/entry/${entry.id}`}
                className={`relative flex items-center justify-between pl-4 pr-4 py-3 border-b border-[#0A0A0A]/10 last:border-0 ${
                  i === activeIndex ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { setOpen(false); setQuery(''); }}
              >
                {/* Color bar — visible on mobile only */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[3px] sm:hidden ${
                    i === activeIndex ? 'bg-white' : colors.bg
                  }`}
                />
                <div>
                  <span className={`text-sm font-bold uppercase tracking-tight ${i === activeIndex ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {entry.term}
                  </span>
                  {entry.phonetic && (
                    <span className={`ml-2 text-xs font-normal ${i === activeIndex ? 'text-white/60' : 'text-[#0A0A0A]/40'}`}>
                      {entry.phonetic}
                    </span>
                  )}
                </div>
                {/* Category badge — hidden on mobile */}
                {section && (
                  <span className={`hidden sm:inline text-[9px] font-semibold tracking-[0.2em] px-2 py-0.5 ${colors.bg} ${colors.text}`}>
                    {section.name.toUpperCase()}
                  </span>
                )}
              </a>
            );
          })}
          {showViewAll && (
            <a
              href={`/a-z#letter-${firstLetter}`}
              className="flex items-center justify-between px-4 py-2.5 border-t border-[#0A0A0A]/10 hover:bg-[#0A0A0A]/5 transition-colors"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setOpen(false); setQuery(''); }}
            >
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#0A0A0A]/50">
                View all {totalPrefix} terms with &ldquo;{firstLetter}&rdquo;
              </span>
              <span className="text-[10px] text-[#0A0A0A]/40">→</span>
            </a>
          )}
          {showGenerate && (
            <a
              href={`/entry/${generateSlug}`}
              className="flex items-center justify-between px-4 py-3 border-t border-dashed border-[#0A0A0A]/20 hover:bg-[#0A0A0A]/5 transition-colors"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setOpen(false); setQuery(''); }}
            >
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#0A0A0A]/50">
                ✦ Generate definition for &ldquo;{q}&rdquo;
              </span>
              <span className="text-[10px] text-[#0A0A0A]/30">→</span>
            </a>
          )}
        </div>
        );
      })()}
    </div>
  );
}
