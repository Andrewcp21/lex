import Link from 'next/link';
import { getAllSections } from '@/lib/entries';
import { COLOR_MAP } from '@/lib/entries';
import type { SectionId } from '@/lib/types';

interface SectionBadgeProps {
  sectionId: SectionId;
  linked?: boolean;
}

export default async function SectionBadge({ sectionId, linked = false }: SectionBadgeProps) {
  const sections = await getAllSections();
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return null;

  const colors = COLOR_MAP[section.color];
  const label = section.name.toUpperCase();

  const cls = `inline-block px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] ${colors.bg} ${colors.text}`;

  if (linked) {
    return (
      <Link href={`/section/${section.slug}`} className={cls}>
        {label}
      </Link>
    );
  }

  return <span className={cls}>{label}</span>;
}
