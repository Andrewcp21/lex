'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchEntries } from '@/lib/search';
import { getAllEntries, getAllSections, COLOR_MAP } from '@/lib/entries';
import type { Entry } from '@/lib/types';

export default function SearchBar() {
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
  const entries = getAllEntries();
  const sections = getAllSections();
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
      setOpen(r.length > 0);
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
        <span className="px-3 text-[10px] font-semibold tracking-[0.15em] text-[#0A0A0A]/30 select-none">
          {shortcutHint}
        </span>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 border border-t-0 border-[#0A0A0A] bg-white">
          {results.map((entry, i) => {
            const section = sections.find((s) => s.id === entry.section);
            const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;
            return (
              <a
                key={entry.id}
                href={`/entry/${entry.id}`}
                className={`flex items-center justify-between px-4 py-3 border-b border-[#0A0A0A]/10 last:border-0 ${
                  i === activeIndex ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
                }`}
                onClick={() => { setOpen(false); setQuery(''); }}
              >
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
                {section && (
                  <span className={`text-[9px] font-semibold tracking-[0.2em] px-2 py-0.5 ${colors.bg} ${colors.text}`}>
                    {section.name.toUpperCase()}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
