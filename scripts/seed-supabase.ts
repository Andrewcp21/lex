import { createClient } from '@supabase/supabase-js';
import sectionsData from '../data/sections.json';
import entriesData from '../data/entries.json';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('Seeding sections…');
  const sections = sectionsData.map(({ entryCount: _drop, ...s }) => s);
  const { error: sErr } = await supabase.from('sections').upsert(sections, { onConflict: 'id' });
  if (sErr) throw new Error(`Sections failed: ${sErr.message}`);
  console.log(`  ${sections.length} sections inserted.`);

  console.log('Seeding entries…');
  const SECTION_FALLBACK: Record<string, string> = {
    'building-performance-physics': 'sustainability',
  };

  const entries = (entriesData as any[]).map((e) => ({
    id:              e.id,
    term:            e.term,
    section_id:      SECTION_FALLBACK[e.section] ?? e.section,
    difficulty:      e.difficulty,
    definition:      e.definition,
    example:         e.example,
    indonesian_term: e.indonesianTerm ?? null,
    phonetic:        e.phonetic ?? null,
    abbreviation:    e.abbreviation ?? null,
    wiki_slug:       e.wikiSlug ?? null,
    related_terms:   e.relatedTerms ?? [],
    tags:            e.tags ?? [],
    key_figures:     e.keyFigures ?? [],
    video_references: e.videoReferences ?? [],
  }));

  const CHUNK = 100;
  for (let i = 0; i < entries.length; i += CHUNK) {
    const { error } = await supabase
      .from('entries')
      .upsert(entries.slice(i, i + CHUNK), { onConflict: 'id' });
    if (error) throw new Error(`Entries batch ${i}–${i + CHUNK} failed: ${error.message}`);
    console.log(`  Inserted entries ${i + 1}–${Math.min(i + CHUNK, entries.length)}`);
  }

  console.log('Seed complete.');
}

seed().catch((err) => { console.error(err); process.exit(1); });
