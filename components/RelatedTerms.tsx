import Link from 'next/link';
import { getRelatedEntries } from '@/lib/entries';

interface RelatedTermsProps {
  relatedIds: string[];
}

export default function RelatedTerms({ relatedIds }: RelatedTermsProps) {
  const related = getRelatedEntries(relatedIds);
  if (related.length === 0) return null;

  return (
    <div>
      <h3 className="text-[10px] font-semibold tracking-[0.25em] text-[#0A0A0A] opacity-50 mb-3 uppercase">
        Related Terms
      </h3>
      <div className="flex flex-wrap gap-2">
        {related.map((entry) => (
          <Link
            key={entry.id}
            href={`/entry/${entry.id}`}
            className="border border-[#0A0A0A] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150"
          >
            {entry.term}
          </Link>
        ))}
      </div>
    </div>
  );
}
