'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Entry, Section, SectionId } from '@/lib/types';
import WordMasonryCard from './WordMasonryCard';

interface ExploreGridProps {
  entries: Entry[];
  sections: Section[];
}

const COLOR_HEX: Record<string, string> = {
  red: '#FF0000',
  yellow: '#FFE600',
  green: '#00E600',
  blue: '#5BC8F5',
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExploreGrid({ entries, sections }: ExploreGridProps) {
  const [activeSection, setActiveSection] = useState<SectionId | 'all'>('all');
  const [shuffledEntries, setShuffledEntries] = useState(entries);

  useEffect(() => {
    setShuffledEntries(shuffle(entries));
  }, [entries]);

  const filtered = useMemo(
    () => shuffledEntries.filter((e) => activeSection === 'all' || e.section === activeSection),
    [shuffledEntries, activeSection]
  );

  return (
    <div>
      {/* Section filter — dropdown on mobile, chips on desktop */}
      <div className="px-6 py-3 border-b border-[#0A0A0A]">

        {/* Mobile dropdown */}
        <div className="sm:hidden">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value as SectionId | 'all')}
            className="w-full border border-[#0A0A0A] bg-white px-3 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase appearance-none outline-none"
          >
            <option value="all">ALL SECTIONS</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop chips */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 border border-[#0A0A0A] text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-150 whitespace-nowrap ${
              activeSection === 'all'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-white text-[#0A0A0A] hover:bg-[#0A0A0A]/5'
            }`}
          >
            ALL
          </button>

          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0A] text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-150 whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-white text-[#0A0A0A] hover:bg-[#0A0A0A]/5'
              }`}
            >
              <span
                className="inline-block w-2 h-2 shrink-0"
                style={{ backgroundColor: COLOR_HEX[section.color] }}
              />
              {section.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="px-6 py-3 border-b border-[#0A0A0A]">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40">
          {filtered.length} TERMS
        </span>
      </div>

      {/* Masonry grid */}
      <div className="px-6 py-8">
        <div className="columns-2 lg:columns-3 gap-3 sm:gap-4">
          {filtered.map((entry) => {
            const section = sections.find((s) => s.id === entry.section);
            return (
              <div key={entry.id} className="break-inside-avoid mb-4">
                <WordMasonryCard entry={entry} section={section} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
