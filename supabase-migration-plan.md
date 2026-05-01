# Plan: Migrate entries/sections to Supabase for content management

## Context
The KosaRupa glossary app currently stores ~645 entries and 10 sections as static JSON files (`data/entries.json`, `data/sections.json`). The user wants to manage terms in the Supabase Table Editor — adding new entries, editing definitions, updating video links, etc. — without touching code files.

Supabase is already partially integrated (the `pending_entries` table and workflow exist in `lib/pending-entries.ts`). The `.env.local` already has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## Approach Overview
1. Create `entries` and `sections` tables in Supabase via SQL
2. Run a one-time seed script to migrate JSON data into Supabase
3. Rewrite `lib/entries.ts` with async Supabase queries + module-level in-memory cache
4. Update all callers: Server Components get `await`, Client Components get data passed as props
5. Update approve workflow: promoted entries go into `entries` table directly

---

## Step 1 — SQL Schema (run in Supabase SQL Editor)

```sql
create table public.sections (
  id          text primary key,
  name        text        not null,
  slug        text        not null unique,
  color       text        not null,
  icon        text        not null,
  description text        not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.entries (
  id               text primary key,
  term             text        not null,
  section_id       text        not null references public.sections(id),
  difficulty       text        not null check (difficulty in ('beginner','intermediate','advanced')),
  definition       text        not null,
  example          text        not null,
  indonesian_term  text,
  phonetic         text,
  abbreviation     text,
  wiki_slug        text,
  related_terms    text[]      not null default '{}',
  tags             text[]      not null default '{}',
  key_figures      text[]      not null default '{}',
  video_references jsonb       not null default '[]',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index entries_section_id_idx on public.entries(section_id);
create index entries_term_lower_idx on public.entries(lower(term));

-- Dynamic entry count view (replaces hardcoded entryCount in sections.json)
create or replace view public.sections_with_count as
  select s.*, count(e.id)::int as entry_count
  from public.sections s
  left join public.entries e on e.section_id = s.id
  group by s.id;

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger entries_updated_at before update on public.entries
  for each row execute procedure public.set_updated_at();
create trigger sections_updated_at before update on public.sections
  for each row execute procedure public.set_updated_at();
```

**Design notes:**
- `relatedTerms`, `tags`, `keyFigures` → native `text[]` (editable as arrays in Supabase Table Editor)
- `videoReferences` → `jsonb` (each element is `{url, title, channel}`)
- `entryCount` removed from sections table; comes from the `sections_with_count` view
- `section_id` is the FK column name; re-mapped back to `section` in TypeScript

---

## Step 2 — Seed Script

**Create `scripts/seed-supabase.ts`:**

```typescript
import { createClient } from '@supabase/supabase-js';
import sectionsData from '../data/sections.json';
import entriesData from '../data/entries.json';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  // Sections (strip entryCount — it lives in the view)
  const sections = sectionsData.map(({ entryCount: _, ...s }) => s);
  const { error: sErr } = await supabase.from('sections').upsert(sections, { onConflict: 'id' });
  if (sErr) throw new Error(sErr.message);

  // Entries in batches of 100 (Supabase 1MB body limit)
  const entries = (entriesData as any[]).map((e) => ({
    id: e.id, term: e.term, section_id: e.section, difficulty: e.difficulty,
    definition: e.definition, example: e.example,
    indonesian_term: e.indonesianTerm ?? null, phonetic: e.phonetic ?? null,
    abbreviation: e.abbreviation ?? null, wiki_slug: e.wikiSlug ?? null,
    related_terms: e.relatedTerms ?? [], tags: e.tags ?? [],
    key_figures: e.keyFigures ?? [], video_references: e.videoReferences ?? [],
  }));
  for (let i = 0; i < entries.length; i += 100) {
    const { error } = await supabase.from('entries').upsert(entries.slice(i, i + 100), { onConflict: 'id' });
    if (error) throw new Error(error.message);
  }
  console.log('Seed complete.');
}
seed().catch((e) => { console.error(e); process.exit(1); });
```

**Run with:**
```bash
npm install -D dotenv-cli tsx
npx dotenv -e .env.local -- npx tsx scripts/seed-supabase.ts
```

---

## Step 3 — Rewrite `lib/entries.ts`

Replace the current static JSON imports with:
- A Supabase service-role client (server-only, never sent to browser)
- Module-level `_entries` and `_sections` cache variables (populated on first call, reused for the lifetime of the lambda instance)
- `rowToEntry()` mapper: `section_id → section`, `indonesian_term → indonesianTerm`, etc.
- `rowToSection()` mapper: reads from `sections_with_count` view to get `entry_count → entryCount`
- All existing exports become `async`: `getAllEntries()`, `getAllSections()`, `getEntry()`, `getSection()`, `getEntriesBySection()`, `getEntriesBySectionAndDifficulty()`, `getAllEntriesSorted()`, `getRelatedEntries()`, `getSectionForEntry()`
- `COLOR_MAP` stays synchronous (pure constant)
- Export `invalidateCache()` for use by the approve workflow

---

## Step 4 — Update Callers

### Server Components (just add `await`)
| File | Change |
|------|--------|
| `app/layout.tsx` | `await getAllEntries()`, `await getAllSections()`; pass entries+sections as prop to SearchBar via SiteHeader |
| `app/a-z/page.tsx` | `await getAllEntriesSorted()`, `await getAllSections()` |
| `app/explore/page.tsx` | `await getAllEntries()`, `await getAllSections()` |
| `app/entry/[id]/page.tsx` | `await getEntry()`, `await getAllEntries()` |
| `app/admin/page.tsx` | `await getAllSections()` |
| `app/api/generate/route.ts` | `await getEntry()`, `await getAllEntries()` |

### Client Components (data passed as props from Server Component parent)

**`components/SearchBar.tsx`**
- Remove internal `getAllEntries()` / `getAllSections()` calls
- Accept `entries: Entry[]` and `sections: Section[]` as props

**`components/HomeScreen.tsx`**
- Remove internal data calls
- Accept `entries: Entry[]` and `sections: Section[]` as props
- `app/page.tsx` fetches and passes them down

**`components/SiteHeader.tsx`**
- Accept `searchBar: ReactNode` prop
- `app/layout.tsx` renders `<SearchBar entries={entries} sections={sections} />` and passes it as `searchBar`

**`app/section/[slug]/page.tsx` + new `app/section/[slug]/SectionClient.tsx`**
- Current page is `'use client'` (uses `useState` for difficulty filter)
- Split: page.tsx becomes `async` Server Component fetching section + entries, renders `<SectionClient section={section} entries={entries} />`
- `SectionClient.tsx` is the `'use client'` component handling difficulty state

**`components/EntryLayout.tsx` + `components/ConstellationGraph.tsx`**
- `EntryLayout.tsx` (server): resolve related entries via `await getRelatedEntries(...)`, pass to `ConstellationGraph` as pre-resolved data props
- `ConstellationGraph.tsx`: accept resolved entries/sections as props, remove direct `getEntry()` / `getRelatedEntries()` calls

---

## Step 5 — Update AI Generation & Approve Workflow

### Current behaviour (before migration)
- `/api/generate` saves AI entry to `pending_entries` (status: `pending`)
- Admin approves → `updateEntryStatus(id, 'approved')` — entry stays in `pending_entries`
- `app/entry/[id]/page.tsx` falls back to `findPendingEntry()` for anything not found in static JSON
- `getApprovedEntries()` in `lib/pending-entries.ts` reads approved rows from `pending_entries`

### After migration
The `entries` table is now the single source of truth. Approving a pending entry should **promote it** into `entries` and remove it from `pending_entries`.

**`app/api/admin/approve/route.ts`** — replace `updateEntryStatus` with a promote helper:

```typescript
import { promotePendingEntry } from '@/lib/pending-entries';

// In POST handler:
await promotePendingEntry(id);
```

**`lib/pending-entries.ts`** — add `promotePendingEntry()`:

```typescript
export async function promotePendingEntry(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Fetch the pending entry
  const { data, error } = await supabase
    .from('pending_entries')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) throw new Error('Pending entry not found');

  const entry = data.entry as Entry;

  // Insert into main entries table (same column mapping as seed script)
  const { error: insertErr } = await supabase.from('entries').insert({
    id: entry.id,
    term: entry.term,
    section_id: entry.section,
    difficulty: entry.difficulty,
    definition: entry.definition,
    example: entry.example,
    indonesian_term: entry.indonesianTerm ?? null,
    phonetic: entry.phonetic ?? null,
    abbreviation: entry.abbreviation ?? null,
    wiki_slug: entry.wikiSlug ?? null,
    related_terms: entry.relatedTerms ?? [],
    tags: entry.tags ?? [],
    key_figures: entry.keyFigures ?? [],
    video_references: entry.videoReferences ?? [],
  });
  if (insertErr) throw new Error(insertErr.message);

  // Remove from pending queue
  const { error: deleteErr } = await supabase
    .from('pending_entries')
    .delete()
    .eq('id', id);
  if (deleteErr) throw new Error(deleteErr.message);

  // Bust the in-memory entries cache so the new term is immediately visible
  invalidateCache(); // imported from lib/entries.ts
}
```

**`app/entry/[id]/page.tsx`** — simplify the fallback logic:

```typescript
// Before (3-step fallback):
const entry = getEntry(params.id);           // static JSON
const pendingEntry = findPendingEntry(id);   // Supabase pending_entries

// After (2-step fallback):
const entry = await getEntry(params.id);     // Supabase entries table
const pendingEntry = await findPendingEntry(params.id); // still pending_entries (unreviewed)
```

Approved entries are now in `entries` directly, so `getApprovedEntries()` in `lib/pending-entries.ts` becomes unused and can be removed.

**Reject** path (`/api/admin/reject/route.ts`) stays the same — `updateEntryStatus(id, 'rejected')` is still correct.

---

## Step 6 — Optional: Static Pre-rendering

After migration is validated, add `generateStaticParams` to entry and section pages for full static HTML generation at build time (eliminates all Supabase latency at runtime):

```typescript
export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((e) => ({ id: e.id }));
}
```

---

## Files Changed

**Create:** `scripts/seed-supabase.ts`, `app/section/[slug]/SectionClient.tsx`

**Modify:** `lib/entries.ts`, `app/layout.tsx`, `app/a-z/page.tsx`, `app/explore/page.tsx`, `app/entry/[id]/page.tsx`, `app/admin/page.tsx`, `app/api/generate/route.ts`, `app/section/[slug]/page.tsx`, `components/SiteHeader.tsx`, `components/SearchBar.tsx`, `components/HomeScreen.tsx`, `components/EntryLayout.tsx`, `components/ConstellationGraph.tsx`

**Unchanged:** `lib/types.ts`, `lib/search.ts`, `data/entries.json`, `data/sections.json`

**Modify (pending entries workflow):** `lib/pending-entries.ts` (add `promotePendingEntry`, remove `getApprovedEntries`), `app/api/admin/approve/route.ts` (call `promotePendingEntry` instead of `updateEntryStatus`)

---

## Verification

1. Run seed script → check Supabase Table Editor shows 645 entries and 10 sections
2. `npm run dev` → home page loads, search works, A-Z page shows all terms
3. Entry detail page opens for a known slug
4. Section page loads with difficulty filter working
5. Admin page shows sections in the dropdown
6. Manually add a new row in Supabase Table Editor → restart dev server → new term appears in search
7. Search for a non-existent term → AI generates entry → appears in `/entry/[id]` as unverified
8. Approve in `/admin` → entry appears in Supabase `entries` table, disappears from `pending_entries`, loads without unverified badge
9. `npm run build` → no TypeScript errors, build succeeds
