import Link from 'next/link';
import { getAllSections, COLOR_MAP } from '@/lib/entries';
import DifficultyBadge from './DifficultyBadge';
import type { Entry } from '@/lib/types';

interface EntryCardProps {
  entry: Entry;
  showSection?: boolean;
}

export default function EntryCard({ entry, showSection = false }: EntryCardProps) {
  const sections = getAllSections();
  const section = sections.find((s) => s.id === entry.section);
  const preview = entry.definition.slice(0, 120) + (entry.definition.length > 120 ? '…' : '');

  return (
    <Link href={`/entry/${entry.id}`} className="group block">
      <div className="border border-[#0A0A0A] min-h-[220px] p-6 flex flex-col justify-between bg-white transition-transform duration-150 group-hover:scale-[1.01]">
        <div>
          {showSection && section && (
            <span
              className={`inline-block mb-3 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] ${COLOR_MAP[section.color].bg} ${COLOR_MAP[section.color].text}`}
            >
              {section.name.toUpperCase()}
            </span>
          )}
          <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-[#0A0A0A]">
            {entry.term}
            {entry.abbreviation && (
              <span className="ml-2 text-sm font-semibold tracking-[0.15em] opacity-50">
                {entry.abbreviation}
              </span>
            )}
          </h3>
          <p className="text-sm font-medium text-[#0A0A0A] opacity-60 leading-relaxed">
            {preview}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <DifficultyBadge difficulty={entry.difficulty} />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0A0A0A] opacity-40 group-hover:opacity-80 transition-opacity">
            VIEW →
          </span>
        </div>
      </div>
    </Link>
  );
}
