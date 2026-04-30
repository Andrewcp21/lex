import Link from 'next/link';
import { COLOR_MAP } from '@/lib/entries';
import type { Entry, Section } from '@/lib/types';

interface WordMasonryCardProps {
  entry: Entry;
  section: Section | undefined;
}

export default function WordMasonryCard({ entry, section }: WordMasonryCardProps) {
  const preview = entry.definition.slice(0, 320) + (entry.definition.length > 320 ? '…' : '');
  const sectionColor = section ? COLOR_MAP[section.color] : null;

  return (
    <Link href={`/entry/${entry.id}`} className="group block">
      <div
        className={`border border-[#0A0A0A] border-l-4 ${sectionColor?.border || 'border-[#0A0A0A]'}
          p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 bg-white transition-transform duration-150 group-hover:scale-[1.01]`}
      >
        <div>
          <h3 className="text-lg sm:text-[2.5rem] font-bold uppercase tracking-tight text-[#0A0A0A] leading-tight">
            {entry.term}
            {entry.abbreviation && (
              <span className="ml-2 text-xs font-semibold tracking-[0.15em] opacity-40">
                {entry.abbreviation}
              </span>
            )}
          </h3>
          {entry.indonesianTerm && (
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 mt-0.5 block">
              {entry.indonesianTerm}
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-[#0A0A0A] opacity-60 leading-relaxed">
          {preview}
        </p>

        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold tracking-[0.15em] uppercase border border-[#0A0A0A]/20 px-1.5 py-0.5 text-[#0A0A0A] opacity-50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {entry.keyFigures && entry.keyFigures.length > 0 && (
          <div className="text-[10px] font-semibold tracking-[0.1em] text-[#0A0A0A] opacity-40">
            {entry.keyFigures.slice(0, 3).join(' · ')}
          </div>
        )}

        <div className="flex justify-end">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0A0A0A] opacity-30 group-hover:opacity-70 transition-opacity">
            VIEW →
          </span>
        </div>
      </div>
    </Link>
  );
}
