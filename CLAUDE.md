# Kosa Rupa — Claude Context

## What this is
An Indonesian-English architecture glossary (Next.js 14 App Router). ~646 terms across 10 sections.

## Data architecture
**Supabase is the source of truth** (project ID: `mojbdsayviuihhootyir`, region: ap-northeast-1).

| Table / View | Purpose |
|---|---|
| `entries` | All glossary entries |
| `sections` | 10 section categories |
| `sections_with_count` | View — sections + live entry count |
| `pending_entries` | AI-generated staging queue (status: pending / rejected) |

`data/entries.json` and `data/sections.json` are legacy seed files — do not edit them as content.

## Key lib files

**`lib/entries.ts`**
- Async Supabase client with module-level in-memory cache (`_entries`, `_sections`)
- Cache lives for the lifetime of the server process / warm lambda
- Call `invalidateCache()` after any write to `entries` or `sections`
- All exports are async: `getAllEntries()`, `getEntry()`, `getAllSections()`, `getSection()`, etc.
- `COLOR_MAP` is synchronous (pure constant)

**`lib/pending-entries.ts`**
- `savePendingEntry()` — saves AI-generated entry to `pending_entries`
- `findPendingEntry()` — looks up a single pending entry by ID
- `promotePendingEntry()` — approves: inserts into `entries`, deletes from `pending_entries`, calls `invalidateCache()`
- `updateEntryStatus()` — used for reject (sets status = 'rejected')

## Data flow rules
- **Server Components** fetch data and pass it as props
- **Client Components** (`SearchBar`, `HomeScreen`, `SectionClient`, `ConstellationGraph`, `ExploreGrid`) receive `entries` and/or `sections` as props — never import async lib functions in client components
- `ConstellationGraph` receives pre-resolved `resolvedEntries: Record<string, ResolvedEntry>` from `EntryLayout` (server)

## AI generation workflow
1. User searches unknown term → `SearchBar` shows "✦ Generate definition" link
2. `/entry/[id]` → `GeneratePage` → POST `/api/generate` → OpenAI → saved to `pending_entries`
3. Admin reviews at `/admin` (access code: see `app/access/actions.ts`)
4. Approve → `promotePendingEntry()` → entry moves to `entries` table, cache busted

## Section IDs (valid values for `section_id`)
`architectural-terms-theory` | `building-materials-construction` | `structural-systems` | `design-styles-movements` | `tools-software-technology` | `sustainability` | `building-history-typologies` | `key-figures` | `professional-practice` | `representation-communication`

## Adding entries via Supabase Table Editor
Go to: https://supabase.com/dashboard/project/mojbdsayviuihhootyir/editor → `entries` table
- `video_references` column accepts JSON: `[{"url":"...","title":"...","channel":"..."}]`
- `related_terms`, `tags`, `key_figures` are text arrays
- Changes are live on next server cold start (or redeploy on Vercel for instant publish)

## Scripts
- `scripts/seed-supabase.ts` — one-time seed from JSON to Supabase (idempotent via upsert)
  - Run: `npx dotenv -e .env.local -- npx tsx scripts/seed-supabase.ts`
