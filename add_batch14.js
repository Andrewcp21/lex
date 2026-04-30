const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  {
    id: "precedent-study",
    term: "Precedent Study",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "The systematic analysis of existing buildings to understand design strategies, spatial organizations, and solutions. Precedent studies inform design thinking.",
    example: "Architects analyze precedent buildings to understand how similar programs and contexts have been solved.",
    relatedTerms: ["research", "precedent", "analysis"],
    tags: ["process", "learning", "design"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
