import entriesData from '@/data/entries.json';
import sectionsData from '@/data/sections.json';
import type { Entry, Section, SectionId, Difficulty } from './types';

const entries = entriesData as Entry[];
const sections = sectionsData as Section[];

export function getAllEntries(): Entry[] {
  return entries;
}

export function getAllSections(): Section[] {
  return sections;
}

export function getEntry(id: string): Entry | undefined {
  return entries.find((e) => e.id === id);
}

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getEntriesBySection(sectionId: SectionId): Entry[] {
  return entries
    .filter((e) => e.section === sectionId)
    .sort((a, b) => a.term.localeCompare(b.term));
}

export function getEntriesBySectionAndDifficulty(
  sectionId: SectionId,
  difficulty: Difficulty
): Entry[] {
  return getEntriesBySection(sectionId).filter((e) => e.difficulty === difficulty);
}

export function getSectionForEntry(entry: Entry): Section | undefined {
  return sections.find((s) => s.id === entry.section);
}

export function getAllEntriesSorted(): Entry[] {
  return [...entries].sort((a, b) => a.term.localeCompare(b.term));
}

export function getRelatedEntries(relatedIds: string[]): Entry[] {
  return relatedIds
    .map((id) => entries.find((e) => e.id === id))
    .filter((e): e is Entry => e !== undefined);
}

export const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  red: {
    bg: 'bg-[#FF0000]',
    text: 'text-white',
    border: 'border-[#FF0000]',
  },
  yellow: {
    bg: 'bg-[#FFE600]',
    text: 'text-[#0A0A0A]',
    border: 'border-[#FFE600]',
  },
  green: {
    bg: 'bg-[#00E600]',
    text: 'text-[#0A0A0A]',
    border: 'border-[#00E600]',
  },
  blue: {
    bg: 'bg-[#5BC8F5]',
    text: 'text-[#0A0A0A]',
    border: 'border-[#5BC8F5]',
  },
};
