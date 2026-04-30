'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllEntries, getAllSections, COLOR_MAP } from '@/lib/entries';
import { searchEntries } from '@/lib/search';
import type { Entry } from '@/lib/types';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function pickRandom(entries: Entry[], excludeId?: string): Entry {
  const pool = excludeId ? entries.filter((e) => e.id !== excludeId) : entries;
  return pool[Math.floor(Math.random() * pool.length)];
}

function TypingWord({ entries }: { entries: Entry[] }) {
  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  // Init on client only to avoid hydration mismatch
  useEffect(() => {
    setCurrentEntry(pickRandom(entries));
  }, []);

  useEffect(() => {
    if (!currentEntry) return;
    const word = currentEntry.term;

    if (phase === 'typing') {
      if (displayText.length < word.length) {
        const t = setTimeout(
          () => setDisplayText(word.slice(0, displayText.length + 1)),
          80
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), 3000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayText.length > 0) {
        const t = setTimeout(
          () => setDisplayText((prev) => prev.slice(0, -1)),
          45
        );
        return () => clearTimeout(t);
      } else {
        const next = pickRandom(entries, currentEntry.id);
        setCurrentEntry(next);
        setPhase('typing');
      }
    }
  }, [displayText, phase, currentEntry]);

  if (!currentEntry || !displayText) {
    return <span className="opacity-0 select-none pointer-events-none">·</span>;
  }

  return (
    <Link
      href={`/entry/${currentEntry.id}`}
      className="font-bold uppercase tracking-tight text-[#0A0A0A] hover:text-[#5BC8F5] transition-colors duration-150"
    >
      {displayText}
      <span className="ml-0.5 text-[#5BC8F5] animate-pulse">|</span>
    </Link>
  );
}

export default function HomeScreen() {
  const entries = getAllEntries();
  const sections = getAllSections();
  const router = useRouter();

  // Search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Entry[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A-Z overlay state
  const [showAZ, setShowAZ] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [shortcutHint, setShortcutHint] = useState('⌘K');

  useEffect(() => {
    const isMac = /mac/i.test(navigator.platform) || /mac/i.test(navigator.userAgent);
    setShortcutHint(isMac ? '⌘K' : 'Ctrl K');
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      inputRef.current?.focus();
    }
  }, []);

  const grouped = useMemo(() => {
    const g: Record<string, Entry[]> = {};
    for (const entry of entries) {
      const letter = entry.term[0].toUpperCase();
      if (!g[letter]) g[letter] = [];
      g[letter].push(entry);
    }
    return g;
  }, [entries]);

  const presentLetters = useMemo(() => new Set(Object.keys(grouped)), [grouped]);

  // Search
  const runSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setSearchOpen(false);
        return;
      }
      const r = searchEntries(entries, q).slice(0, 8);
      setResults(r);
      setSearchOpen(r.length > 0);
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

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShowAZ(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      const target = activeIndex >= 0 ? results[activeIndex] : results[0];
      if (target) {
        router.push(`/entry/${target.id}`);
        setSearchOpen(false);
        setQuery('');
      }
    }
  };

  return (
    <>
      {/* Main centered layout */}
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 pt-[10vh] pb-[18vh]">
        {/* Brand label */}
        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-10">
          Kosa Rupa — Architect&apos;s Dictionary
        </p>

        {/* Animated typing word */}
        <div className="h-9 mb-8 flex items-center text-2xl md:text-3xl">
          <TypingWord entries={entries} />
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl relative mb-6">
          <div className="flex items-center border-2 border-[#0A0A0A] bg-white">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => results.length > 0 && setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              placeholder="Search architectural terms…"
              className="flex-1 px-6 py-4 text-base font-medium text-[#0A0A0A] placeholder-[#0A0A0A]/30 outline-none bg-transparent"
            />
            <span className="hidden sm:inline px-4 text-[10px] font-semibold tracking-[0.15em] text-[#0A0A0A]/30 select-none">
              {shortcutHint}
            </span>
          </div>

          {searchOpen && (
            <div className="absolute top-full left-0 right-0 z-50 border-2 border-t-0 border-[#0A0A0A] bg-white">
              {results.map((entry, i) => {
                const section = sections.find((s) => s.id === entry.section);
                const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;
                return (
                  <a
                    key={entry.id}
                    href={`/entry/${entry.id}`}
                    className={`relative flex items-center justify-between pl-6 pr-6 py-3 border-b border-[#0A0A0A]/10 last:border-0 ${
                      i === activeIndex
                        ? 'bg-[#0A0A0A] text-white'
                        : 'hover:bg-[#0A0A0A]/5'
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery('');
                    }}
                  >
                    {/* Color bar — mobile only */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-[3px] sm:hidden ${
                        i === activeIndex ? 'bg-white' : colors.bg
                      }`}
                    />
                    <div>
                      <span
                        className={`text-sm font-bold uppercase tracking-tight ${
                          i === activeIndex ? 'text-white' : 'text-[#0A0A0A]'
                        }`}
                      >
                        {entry.term}
                      </span>
                      {entry.phonetic && (
                        <span
                          className={`ml-2 text-xs font-normal ${
                            i === activeIndex ? 'text-white/60' : 'text-[#0A0A0A]/40'
                          }`}
                        >
                          {entry.phonetic}
                        </span>
                      )}
                    </div>
                    {/* Category badge — desktop only */}
                    {section && (
                      <span
                        className={`hidden sm:inline text-[9px] font-semibold tracking-[0.2em] px-2 py-0.5 shrink-0 ${colors.bg} ${colors.text}`}
                      >
                        {section.name.toUpperCase()}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowAZ(true);
              setSelectedLetter(null);
            }}
            className="px-8 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150"
          >
            A–Z
          </button>
          <Link
            href="/explore"
            className="px-8 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150"
          >
            Explore
          </Link>
        </div>
      </div>

      {/* A-Z overlay */}
      {showAZ && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#0A0A0A] shrink-0">
            <span className="text-sm font-bold uppercase tracking-tight">Browse A–Z</span>
            <button
              onClick={() => setShowAZ(false)}
              className="text-[10px] font-semibold tracking-[0.2em] uppercase border border-[#0A0A0A] px-3 py-1.5 hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            {/* Letter grid */}
            <div className="flex flex-wrap gap-2 mb-10 max-w-md">
              {ALPHABET.map((letter) => (
                <button
                  key={letter}
                  onClick={() =>
                    presentLetters.has(letter) &&
                    setSelectedLetter(selectedLetter === letter ? null : letter)
                  }
                  className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold border transition-colors duration-100 ${
                    selectedLetter === letter
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                      : presentLetters.has(letter)
                      ? 'border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                      : 'border-[#0A0A0A]/20 text-[#0A0A0A]/20 cursor-default'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Preview list */}
            {selectedLetter && grouped[selectedLetter] && (
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#0A0A0A]/40 mb-4">
                  {grouped[selectedLetter].length} terms starting with {selectedLetter}
                </p>
                <div className="border-t border-[#0A0A0A] mb-4">
                  {grouped[selectedLetter].slice(0, 6).map((entry) => {
                    const section = sections.find((s) => s.id === entry.section);
                    const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;
                    return (
                      <Link
                        key={entry.id}
                        href={`/entry/${entry.id}`}
                        onClick={() => setShowAZ(false)}
                        className="flex items-center justify-between py-3 border-b border-[#0A0A0A]/10 group"
                      >
                        <div>
                          <span className="text-sm font-bold uppercase tracking-tight group-hover:underline">
                            {entry.term}
                          </span>
                          {entry.phonetic && (
                            <span className="ml-2 text-xs font-normal opacity-40">
                              {entry.phonetic}
                            </span>
                          )}
                        </div>
                        {section && (
                          <span
                            className={`text-[9px] font-semibold tracking-[0.2em] px-2 py-0.5 shrink-0 ${colors.bg} ${colors.text}`}
                          >
                            {section.name.toUpperCase()}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {grouped[selectedLetter].length > 6 && (
                  <Link
                    href={`/a-z#letter-${selectedLetter}`}
                    onClick={() => setShowAZ(false)}
                    className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase border border-[#0A0A0A] px-5 py-2.5 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150"
                  >
                    View all {grouped[selectedLetter].length} terms with {selectedLetter} →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
