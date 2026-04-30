const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  {
    id: "spatial-sequence",
    term: "Spatial Sequence",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The ordered progression of spatial experiences as people move through a building or landscape. Spatial sequences create narrative and emotional impact.",
    example: "Religious buildings use spatial sequences to create emotional buildup toward the altar or sacred space.",
    relatedTerms: ["circulation", "experience", "rhythm"],
    tags: ["spatial", "experience", "organization"]
  },
  {
    id: "mezzanine",
    term: "Mezzanine",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "An intermediate floor or balcony within a story, creating intermediate spaces without spanning the full floor-to-floor height. Mezzanines add usable area and visual interest.",
    example: "Mezzanines in modern offices and retail spaces increase floor area while maintaining visual connection.",
    relatedTerms: ["floor", "level", "space"],
    tags: ["space", "design", "program"]
  },
  {
    id: "cantilever",
    term: "Cantilever",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A structural beam or slab extending horizontally beyond its support, creating an overhang. Cantilevers enable dramatic forms and are dramatic expressions of structural logic.",
    example: "Fallingwater's dramatic cantilevered platforms appear to float over the waterfall below.",
    relatedTerms: ["beam", "overhang", "structural-form"],
    tags: ["structure", "form", "spanning"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
