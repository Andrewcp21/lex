import Fuse from 'fuse.js';
import type { Entry } from './types';

let fuseInstance: Fuse<Entry> | null = null;

function getFuse(entries: Entry[]): Fuse<Entry> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(entries, {
      keys: [
        { name: 'term', weight: 0.7 },
        { name: 'abbreviation', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function searchEntries(entries: Entry[], query: string): Entry[] {
  const q = query.trim();
  if (!q) return [];

  const lower = q.toLowerCase();

  // Prefix matches on term — always shown first, sorted alphabetically
  const prefixMatches = entries
    .filter((e) => e.term.toLowerCase().startsWith(lower))
    .sort((a, b) => a.term.localeCompare(b.term));

  // For short queries just return prefix matches (up to 8)
  if (q.length <= 2) return prefixMatches.slice(0, 8);

  // For longer queries, fill remaining slots with fuzzy results (term field only)
  const prefixIds = new Set(prefixMatches.map((e) => e.id));
  const fuse = getFuse(entries);
  const fuzzy = fuse
    .search(q)
    .map((r) => r.item)
    .filter((e) => !prefixIds.has(e.id));

  return [...prefixMatches, ...fuzzy].slice(0, 8);
}
