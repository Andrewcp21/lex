import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEntry, getSectionForEntry, COLOR_MAP } from '@/lib/entries';
import DifficultyBadge from '@/components/DifficultyBadge';
import RelatedTerms from '@/components/RelatedTerms';
import CopyLinkButton from '@/components/CopyLinkButton';

export default function EntryPage({ params }: { params: { id: string } }) {
  const entry = getEntry(params.id);
  if (!entry) notFound();

  const section = getSectionForEntry(entry);
  const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;

  return (
    <div className="max-w-[720px] mx-auto px-6 py-12">
      {/* Back link */}
      {section && (
        <Link
          href={`/section/${section.slug}`}
          className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity"
        >
          ← {section.name}
        </Link>
      )}

      {/* Term heading */}
      <div className="mt-6 mb-8 pb-8 border-b border-[#0A0A0A]">
        <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-tight tracking-tight text-[#0A0A0A]">
          {entry.term}
        </h1>
        {entry.phonetic && (
          <p className="text-sm font-normal text-[#0A0A0A] opacity-40 mt-1 font-[inherit]">
            {entry.phonetic}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {section && (
            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] ${colors.bg} ${colors.text}`}>
              {section.name.toUpperCase()}
            </span>
          )}
          <DifficultyBadge difficulty={entry.difficulty} />
          {entry.abbreviation && (
            <span className="border border-[#0A0A0A] px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em]">
              {entry.abbreviation}
            </span>
          )}
        </div>
      </div>

      {/* Definition */}
      <section className="mb-8">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
          Definition
        </h2>
        <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
          {entry.definition}
        </p>
      </section>

      {/* Example */}
      <section className="mb-8 pb-8 border-b border-[#0A0A0A]">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
          Example
        </h2>
        <p className="text-base font-medium leading-relaxed text-[#0A0A0A] opacity-70">
          {entry.example}
        </p>
      </section>

      {/* Key Figures (Design Styles only) */}
      {entry.keyFigures && entry.keyFigures.length > 0 && (
        <section className="mb-8 pb-8 border-b border-[#0A0A0A]">
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            Key Figures
          </h2>
          <ul className="space-y-1">
            {entry.keyFigures.map((f, i) => (
              <li key={i} className="text-sm font-medium text-[#0A0A0A] opacity-70">
                — {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Terms */}
      {entry.relatedTerms.length > 0 && (
        <section className="mb-8">
          <RelatedTerms relatedIds={entry.relatedTerms} />
        </section>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <section className="mb-8 pt-8 border-t border-[#0A0A0A]">
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-3">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Link
                key={tag}
                href={`/?q=${encodeURIComponent(tag)}`}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase border border-[#0A0A0A]/30 px-2 py-0.5 opacity-40 hover:opacity-100 hover:border-[#0A0A0A] transition-opacity"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Copy link */}
      <div className="pt-4 border-t border-[#0A0A0A]/10">
        <CopyLinkButton />
      </div>
    </div>
  );
}
