import { createClient } from '@supabase/supabase-js';
import type { Entry, Section, SectionId, Difficulty } from './types';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing');
  return createClient(url, key);
}

let _entries: Entry[] | null = null;
let _sections: Section[] | null = null;

export function invalidateCache() {
  _entries = null;
  _sections = null;
}

function rowToEntry(row: Record<string, unknown>): Entry {
  return {
    id: row.id as string,
    term: row.term as string,
    section: row.section_id as SectionId,
    difficulty: row.difficulty as Difficulty,
    definition: row.definition as string,
    example: row.example as string,
    relatedTerms: (row.related_terms as string[]) ?? [],
    tags: (row.tags as string[])?.length ? (row.tags as string[]) : undefined,
    keyFigures: (row.key_figures as string[])?.length ? (row.key_figures as string[]) : undefined,
    indonesianTerm: (row.indonesian_term as string | null) ?? undefined,
    phonetic: (row.phonetic as string | null) ?? undefined,
    abbreviation: (row.abbreviation as string | null) ?? undefined,
    wikiSlug: (row.wiki_slug as string | null) ?? undefined,
    videoReferences:
      Array.isArray(row.video_references) && (row.video_references as unknown[]).length
        ? (row.video_references as Entry['videoReferences'])
        : undefined,
  };
}

function rowToSection(row: Record<string, unknown>): Section {
  return {
    id: row.id as SectionId,
    name: row.name as string,
    slug: row.slug as string,
    color: row.color as Section['color'],
    icon: row.icon as string,
    description: row.description as string,
    entryCount: (row.entry_count as number) ?? 0,
  };
}

async function fetchAllEntries(): Promise<Entry[]> {
  if (_entries) return _entries;
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('term', { ascending: true });
  if (error) throw new Error(`Failed to fetch entries: ${error.message}`);
  _entries = (data ?? []).map(rowToEntry);
  return _entries;
}

async function fetchAllSections(): Promise<Section[]> {
  if (_sections) return _sections;
  const supabase = getSupabase();
  const { data, error } = await supabase.from('sections_with_count').select('*');
  if (error) throw new Error(`Failed to fetch sections: ${error.message}`);
  _sections = (data ?? []).map(rowToSection);
  return _sections;
}

export async function getAllEntries(): Promise<Entry[]> {
  return fetchAllEntries();
}

export async function getAllSections(): Promise<Section[]> {
  return fetchAllSections();
}

export async function getEntry(id: string): Promise<Entry | undefined> {
  const entries = await fetchAllEntries();
  return entries.find((e) => e.id === id);
}

export async function getSection(slug: string): Promise<Section | undefined> {
  const sections = await fetchAllSections();
  return sections.find((s) => s.slug === slug);
}

export async function getEntriesBySection(sectionId: SectionId): Promise<Entry[]> {
  const entries = await fetchAllEntries();
  return entries
    .filter((e) => e.section === sectionId)
    .sort((a, b) => a.term.localeCompare(b.term));
}

export async function getEntriesBySectionAndDifficulty(
  sectionId: SectionId,
  difficulty: Difficulty
): Promise<Entry[]> {
  const entries = await getEntriesBySection(sectionId);
  return entries.filter((e) => e.difficulty === difficulty);
}

export async function getSectionForEntry(entry: Entry): Promise<Section | undefined> {
  const sections = await fetchAllSections();
  return sections.find((s) => s.id === entry.section);
}

export async function getAllEntriesSorted(): Promise<Entry[]> {
  return fetchAllEntries();
}

export async function getRelatedEntries(relatedIds: string[]): Promise<Entry[]> {
  const entries = await fetchAllEntries();
  return relatedIds
    .map((id) => entries.find((e) => e.id === id))
    .filter((e): e is Entry => e !== undefined);
}

export const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  red:    { bg: 'bg-[#FF0000]',  text: 'text-white',      border: 'border-[#FF0000]'  },
  yellow: { bg: 'bg-[#FFE600]',  text: 'text-[#0A0A0A]',  border: 'border-[#FFE600]'  },
  green:  { bg: 'bg-[#00E600]',  text: 'text-[#0A0A0A]',  border: 'border-[#00E600]'  },
  blue:   { bg: 'bg-[#5BC8F5]',  text: 'text-[#0A0A0A]',  border: 'border-[#5BC8F5]'  },
};
