import Fuse from 'fuse.js';
import type { Entry } from './types';

let fuseInstance: Fuse<Entry> | null = null;

export function getFuse(entries: Entry[]): Fuse<Entry> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(entries, {
      keys: [
        { name: 'term', weight: 0.4 },
        { name: 'definition', weight: 0.3 },
        { name: 'tags', weight: 0.15 },
        { name: 'abbreviation', weight: 0.1 },
        { name: 'relatedTerms', weight: 0.05 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function searchEntries(entries: Entry[], query: string): Entry[] {
  if (!query.trim()) return [];
  const fuse = getFuse(entries);
  return fuse.search(query).map((r) => r.item);
}
