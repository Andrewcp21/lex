'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSection, getEntriesBySection, COLOR_MAP } from '@/lib/entries';
import EntryCard from '@/components/EntryCard';
import type { Difficulty } from '@/lib/types';

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

export default function SectionPage({ params }: { params: { slug: string } }) {
  const section = getSection(params.slug);
  if (!section) notFound();

  const allEntries = getEntriesBySection(section.id);
  const colors = COLOR_MAP[section.color];

  const [filter, setFilter] = useState<Difficulty | 'all'>('all');

  const filtered =
    filter === 'all' ? allEntries : allEntries.filter((e) => e.difficulty === filter);

  return (
    <div>
      {/* Section header */}
      <div className={`${colors.bg} ${colors.text} px-6 py-12 border-b border-[#0A0A0A]`}>
        <Link
          href="/explore"
          className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity"
        >
          ← All Sections
        </Link>
        <h1 className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-tight tracking-tight mt-4 mb-2">
          {section.name}
        </h1>
        <p className="text-sm font-medium opacity-70 max-w-lg">{section.description}</p>
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50 mt-4">
          {allEntries.length} Terms
        </p>
      </div>

      {/* Difficulty filter */}
      <div className="px-6 py-4 border-b border-[#0A0A0A] flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 mr-2">
          Filter:
        </span>
        <button
          onClick={() => setFilter('all')}
          className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 border border-[#0A0A0A] transition-colors ${
            filter === 'all' ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
          }`}
        >
          All
        </button>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 border border-[#0A0A0A] transition-colors ${
              filter === d ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
            }`}
          >
            {d}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-semibold tracking-[0.15em] opacity-30">
          {filtered.length} shown
        </span>
      </div>

      {/* Entry grid */}
      <div className="px-6 py-8">
        {filtered.length === 0 ? (
          <p className="text-sm font-medium opacity-40">No entries at this difficulty level.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#0A0A0A]">
            {filtered.map((entry) => (
              <div key={entry.id} className="border-b border-r border-[#0A0A0A]">
                <EntryCard entry={entry} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
