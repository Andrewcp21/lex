const fs = require('fs');

const entries = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));

// Final set of translations for remaining terms
const finalTranslations = {
  "orthographic-drawing": "gambar ortografis",
  "perspective": "perspektif",
  "physical-model": "model fisik",
  "portfolio": "portofolio",
  "site-analysis": "analisis situs",
  "section-model": "model potongan",
  "bambu": "bambu",
  "bata-ekspos": "bata ekspos",
  "batu-alam": "batu alam",
  "genteng-tanah-liat": "genteng tanah liat",
};

// Add indonesianTerm to entries that don't have it yet
const updatedEntries = entries.map(entry => {
  if (!entry.indonesianTerm) {
    const indonesianTerm = finalTranslations[entry.id];
    if (indonesianTerm) {
      return { ...entry, indonesianTerm };
    }
  }
  return entry;
});

// Write back to file
fs.writeFileSync('data/entries.json', JSON.stringify(updatedEntries, null, 2) + '\n');

const addedCount = updatedEntries.filter(e => e.indonesianTerm).length;
const totalCount = updatedEntries.length;
console.log(`Final completion:`);
console.log(`Entries with Indonesian terms: ${addedCount}/${totalCount}`);

// Show remaining entries without Indonesian terms
const missingTranslations = updatedEntries.filter(e => !e.indonesianTerm);
if (missingTranslations.length > 0) {
  console.log(`\nMissing translations for ${missingTranslations.length} entries:`);
  missingTranslations.forEach(e => {
    console.log(`  "${e.id}": "${e.term}",`);
  });
} else {
  console.log(`\n✓ All 520 entries now have Indonesian translations!`);
}
