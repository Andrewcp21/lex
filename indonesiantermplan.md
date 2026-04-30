# Indonesian Architecture Terms — Addition Plan

## Current State

- **148 terms** in `data/entries.json` (121 KB, ~30,000–35,000 tokens)
- **~220 tokens per term** (avg)
- Schema: `id`, `term`, `phonetic`, `abbreviation`, `section`, `difficulty`, `definition`, `example`, `keyFigures`, `relatedTerms`, `tags`

## Token Cost to Generate

| Approach | Cost per term |
|---|---|
| Minimal (schema + 2–3 examples) | ~370 tokens/term |
| Full context (entire entries.json) | ~3,700 tokens/term |

**Recommendation:** Batch 20–30 terms with minimal context, then do a separate `relatedTerms` linking pass.

## Time Estimate

| Terms | Total time |
|---|---|
| 50 | ~5 min |
| 100 | ~10 min |
| 200 | ~15 min |
| 300 | ~20 min |

## Suggested Focus Areas for Indonesian Terms

- **Local materials:** bambu, bata ekspos, batu alam, genteng tanah liat
- **Indonesian architects:** Ridwan Kamil, Han Awal, Andra Matin, Yori Antar, Friedrich Silaban
- **Vernacular styles:** rumah joglo, rumah gadang, rumah panggung, rumah adat
- **Regulations:** IMB (Izin Mendirikan Bangunan), KDB (Koefisien Dasar Bangunan), KLB (Koefisien Lantai Bangunan), GSB (Garis Sempadan Bangunan), RTH
- **Local construction terms:** sistem struktur kayu, pasangan bata, plesteran, acian
- **Climate-responsive design:** ventilasi silang, orientasi bangunan, shading device, atap pelana

## Next Steps

1. Decide how many terms to add
2. Decide which focus areas to prioritize
3. Run generation in batches of 20–30
4. Do a final `relatedTerms` linking pass across new + existing terms
