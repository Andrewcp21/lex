import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getEntry, getAllEntries } from '@/lib/entries';
import { findPendingEntry, savePendingEntry } from '@/lib/pending-entries';
import type { Entry, SectionId, Difficulty } from '@/lib/types';

const SECTION_IDS: SectionId[] = [
  'architectural-terms-theory',
  'building-materials-construction',
  'structural-systems',
  'design-styles-movements',
  'tools-software-technology',
  'sustainability',
  'key-figures',
  'building-history-typologies',
  'professional-practice',
  'representation-communication',
];

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'query is required' }, { status: 400 });
  }

  const slug = query.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  if (!slug) return NextResponse.json({ error: 'Invalid query' }, { status: 400 });

  // Return existing entry if already in static DB
  const existing = getEntry(slug);
  if (existing) return NextResponse.json({ entry: existing });

  // Return from Supabase if already generated
  const alreadyPending = await findPendingEntry(slug);
  if (alreadyPending && alreadyPending.status !== 'rejected') {
    return NextResponse.json({ entry: alreadyPending });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const allIds = getAllEntries().map((e) => e.id).join(', ');

  const prompt = `You are a professional architecture glossary writer for KosaRupa, an Indonesian-English architecture glossary used by architecture students and professionals in Indonesia.

Generate a complete glossary entry for the architectural term: "${query}"

Return ONLY a valid JSON object with these exact fields:
{
  "id": "${slug}",
  "term": "Proper case display name",
  "indonesianTerm": "Indonesian translation (omit field if not applicable)",
  "section": "Choose the most appropriate: architectural-terms-theory | building-materials-construction | structural-systems | design-styles-movements | tools-software-technology | sustainability | key-figures | building-history-typologies | professional-practice | representation-communication",
  "difficulty": "beginner | intermediate | advanced",
  "definition": "2-4 sentences: a clear, professional definition suitable for architecture students",
  "example": "1-2 sentences: a concrete real-world usage example in architecture practice",
  "relatedTerms": ["pick 2-4 IDs from this list that are genuinely related: ${allIds}"],
  "tags": ["2-5 lowercase descriptive tags"]
}

Important: relatedTerms must only contain IDs from the provided list.`;

  let generated: Partial<Entry>;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error('Empty response from OpenAI');
    generated = JSON.parse(raw);
  } catch (err) {
    console.error('OpenAI generation failed:', err);
    return NextResponse.json({ error: 'Failed to generate definition' }, { status: 500 });
  }

  // Validate and sanitize the generated entry
  const allEntryIds = new Set(getAllEntries().map((e) => e.id));
  const entry: Entry = {
    id: slug,
    term: typeof generated.term === 'string' ? generated.term : query,
    section: SECTION_IDS.includes(generated.section as SectionId)
      ? (generated.section as SectionId)
      : 'architectural-terms-theory',
    difficulty: DIFFICULTIES.includes(generated.difficulty as Difficulty)
      ? (generated.difficulty as Difficulty)
      : 'intermediate',
    definition: typeof generated.definition === 'string' ? generated.definition : '',
    example: typeof generated.example === 'string' ? generated.example : '',
    relatedTerms: Array.isArray(generated.relatedTerms)
      ? (generated.relatedTerms as string[]).filter((id) => allEntryIds.has(id))
      : [],
    tags: Array.isArray(generated.tags) ? (generated.tags as string[]) : [],
    ...(typeof generated.indonesianTerm === 'string' && { indonesianTerm: generated.indonesianTerm }),
    ...(typeof generated.phonetic === 'string' && { phonetic: generated.phonetic }),
  };

  await savePendingEntry(entry);
  return NextResponse.json({ entry });
}
