import Link from 'next/link';
import { COLOR_MAP } from '@/lib/entries';
import type { Section } from '@/lib/types';

interface SectionCardProps {
  section: Section;
  index: number;
}

export default function SectionCard({ section, index }: SectionCardProps) {
  const colors = COLOR_MAP[section.color];

  return (
    <Link href={`/section/${section.slug}`} className="group block">
      <div
        className={`${colors.bg} ${colors.text} border border-[#0A0A0A] min-h-[320px] p-6 flex flex-col justify-between transition-transform duration-150 group-hover:scale-[1.02]`}
      >
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-semibold tracking-[0.25em] opacity-60">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] opacity-60">
            {section.entryCount} TERMS
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight leading-tight mb-3">
            {section.name}
          </h2>
          <p className="text-sm font-medium opacity-70 leading-relaxed">
            {section.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-[10px] font-semibold tracking-[0.2em] opacity-60">
            EXPLORE →
          </span>
        </div>
      </div>
    </Link>
  );
}
