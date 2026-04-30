import Link from 'next/link';
import type { Entry } from '@/lib/types';

interface LinkedTextProps {
  text: string;
  allEntries: Entry[];
  currentEntryId: string;
  className?: string;
}

function escapeRegex(str: string): string {
  return str.replace(/[.+*?^${}()|[\]\\]/g, '\\$&');
}

type Segment =
  | { type: 'text'; content: string }
  | { type: 'link'; content: string; entryId: string };

const LINK_STYLE =
  'border-b border-[#0A0A0A]/30 hover:border-[#0A0A0A] transition-colors duration-100';

export default function LinkedText({ text, allEntries, currentEntryId, className }: LinkedTextProps) {
  const termMap = new Map<string, string>();
  for (const entry of allEntries) {
    if (entry.id !== currentEntryId) {
      termMap.set(entry.term.toLowerCase(), entry.id);
    }
  }

  if (termMap.size === 0) return <p className={className}>{text}</p>;

  // Sort longest-first so "reinforced concrete" wins over "concrete"
  const sortedTerms = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);

  // Each term allows optional plural suffix (es|s) so "columns" links to "column",
  // "arches" links to "arch", "proportions" links to "proportion", etc.
  // Custom boundary prevents "arch" from matching inside "architecture".
  const pattern = new RegExp(
    `(?<![\\w-])(${sortedTerms.map(t => escapeRegex(t) + '(?:es|s)?').join('|')})(?![\\w-])`,
    'gi'
  );

  // Look up the entry id, stripping plural suffixes if no exact match
  function lookupEntry(raw: string): string | undefined {
    const lower = raw.toLowerCase();
    return termMap.get(lower)
      ?? termMap.get(lower.replace(/es$/, ''))
      ?? termMap.get(lower.replace(/s$/, ''));
  }

  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const matchStart = match.index;
    const matchText = match[0];
    const matchEnd = matchStart + matchText.length;

    if (matchStart > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, matchStart) });
    }

    const entryId = lookupEntry(matchText);
    segments.push(entryId
      ? { type: 'link', content: matchText, entryId }
      : { type: 'text', content: matchText }
    );

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <p className={className}>
      {segments.map((seg, i) =>
        seg.type === 'link'
          ? <Link key={i} href={`/entry/${seg.entryId}`} className={LINK_STYLE}>{seg.content}</Link>
          : seg.content
      )}
    </p>
  );
}
