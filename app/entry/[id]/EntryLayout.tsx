import Link from 'next/link';
import { getSectionForEntry, getAllSections, COLOR_MAP } from '@/lib/entries';
import DifficultyBadge from '@/components/DifficultyBadge';
import ConstellationGraph from '@/components/ConstellationGraph';
import type { ResolvedEntry } from '@/components/ConstellationGraph';
import CopyLinkButton from '@/components/CopyLinkButton';
import WikipediaPanel from '@/components/WikipediaPanel';
import NewsPanel from '@/components/NewsPanel';
import VideoPanel from '@/components/VideoPanel';
import LinkedText from '@/components/LinkedText';
import UnverifiedBadge from '@/components/UnverifiedBadge';
import TrackTermView from './TrackTermView';
import type { Entry } from '@/lib/types';

const SVG_COLOR: Record<string, string> = {
  red:    '#CC0000',
  yellow: '#8B6B00',
  green:  '#006E33',
  blue:   '#0077AA',
};

interface Props {
  entry: Entry;
  allEntries: Entry[];
  unverified?: boolean;
}

export default async function EntryLayout({ entry, allEntries, unverified }: Props) {
  const [section, sections] = await Promise.all([
    getSectionForEntry(entry),
    getAllSections(),
  ]);
  const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;

  // Pre-resolve constellation data server-side so ConstellationGraph needs no async calls
  const resolvedEntries: Record<string, ResolvedEntry> = {};
  if (entry.relatedTerms.length > 0) {
    const allEntriesMap = new Map(allEntries.map((e) => [e.id, e]));
    const sectionsMap = new Map(sections.map((s) => [s.id, s]));

    const toResolve = entry.relatedTerms
      .map((id) => allEntriesMap.get(id))
      .filter((e): e is Entry => e !== undefined);

    // Also add L2 candidates (relatedTerms of L1 entries, excluding center and L1 set)
    const l1IdSet = new Set(entry.relatedTerms);
    for (const l1 of toResolve) {
      for (const l2Id of l1.relatedTerms) {
        if (l2Id !== entry.id && !l1IdSet.has(l2Id)) {
          const l2Entry = allEntriesMap.get(l2Id);
          if (l2Entry) toResolve.push(l2Entry);
          l1IdSet.add(l2Id); // prevent duplicates
        }
      }
    }

    for (const e of toResolve) {
      if (resolvedEntries[e.id]) continue;
      const sec = sectionsMap.get(e.section);
      resolvedEntries[e.id] = {
        entry: e,
        colorHex: sec ? (SVG_COLOR[sec.color] ?? '#0A0A0A') : '#0A0A0A',
      };
    }
  }

  return (
    <div className="max-w-[720px] mx-auto px-6 py-12">
      <TrackTermView termId={entry.id} termName={entry.term} />
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
          {unverified && <UnverifiedBadge />}
        </div>
      </div>

      {/* Definition */}
      <section className="mb-8">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
          Definition
        </h2>
        <LinkedText
          text={entry.definition}
          allEntries={allEntries}
          currentEntryId={entry.id}
          className="text-base font-medium leading-relaxed text-[#0A0A0A]"
        />
      </section>

      {/* Example */}
      <section className="mb-8 pb-8 border-b border-[#0A0A0A]">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
          Example
        </h2>
        <LinkedText
          text={entry.example}
          allEntries={allEntries}
          currentEntryId={entry.id}
          className="text-base font-medium leading-relaxed text-[#0A0A0A] opacity-70"
        />
      </section>

      {/* Key Figures */}
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

      {/* Wikipedia panel */}
      <WikipediaPanel term={entry.wikiSlug ?? entry.term} />

      {/* News panel */}
      <NewsPanel term={entry.term} />

      {/* Video panel */}
      <VideoPanel term={entry.term} definition={entry.definition} videoReferences={entry.videoReferences} />

      {/* Copy link */}
      <div className="mt-8 pt-4 border-t border-[#0A0A0A]/10">
        <CopyLinkButton />
      </div>

      {/* Related Terms */}
      {entry.relatedTerms.length > 0 && (
        <section className="mt-8 pt-8 border-t border-[#0A0A0A]/10">
          <ConstellationGraph
            relatedIds={entry.relatedTerms}
            centerTerm={entry.term}
            centerId={entry.id}
            resolvedEntries={resolvedEntries}
          />
        </section>
      )}
    </div>
  );
}
