const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // representation-communication (3 more for variety)
  {
    id: "isometric-drawing",
    term: "Isometric Drawing",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A three-dimensional drawing technique showing three sides equally without perspective distortion. Isometric drawings are useful for technical communication and dimensional clarity.",
    example: "Isometric drawings clearly show building systems and spatial relationships without perspective complexity.",
    relatedTerms: ["drawing", "axonometric", "representation"],
    tags: ["representation", "drawing", "technical"]
  },
  {
    id: "section-drawing",
    term: "Section Drawing",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A cut-away view showing vertical relationships and spatial depth through a building. Sections reveal interior conditions not visible in plans.",
    example: "Building sections show floor heights, ceiling conditions, and spatial relationships between rooms.",
    relatedTerms: ["plan", "elevation", "drawing"],
    tags: ["representation", "drawing", "documentation"]
  },
  {
    id: "axonometric",
    term: "Axonometric",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A three-dimensional drawing method showing multiple sides without converging perspective lines. Axonometric views maintain scale and enable clear understanding of spatial relationships.",
    example: "Axonometric drawings effectively communicate complex spatial arrangements in compact form.",
    relatedTerms: ["isometric-drawing", "perspective-drawing", "representation"],
    tags: ["representation", "drawing", "visualization"]
  },
  // architectural-terms-theory (4 more to complete gaps)
  {
    id: "fenestration-pattern",
    term: "Fenestration Pattern",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The systematic arrangement and rhythm of windows on building facades. Fenestration patterns affect visual composition, interior light, and facade readability.",
    example: "Regular fenestration patterns create visual order while random patterns create dynamic facades.",
    relatedTerms: ["fenestration", "rhythm", "facade"],
    tags: ["facade", "composition", "design"]
  },
  {
    id: "circulation",
    term: "Circulation",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The system of pathways and connections through a building, including corridors, stairs, and transitions. Good circulation design enables intuitive navigation and connects spaces logically.",
    example: "Efficient circulation patterns in hospitals minimize walking distances between departments.",
    relatedTerms: ["wayfinding", "organization", "planning"],
    tags: ["organization", "planning", "spatial"]
  },
  {
    id: "materiality",
    term: "Materiality",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The quality and expression of materials in architecture, including surface texture, color, and aging. Materiality communicates authenticity and connects buildings to place.",
    example: "Materiality in Japanese architecture emphasizes natural wood grain and patina development.",
    relatedTerms: ["materials", "texture", "authenticity"],
    tags: ["material", "aesthetics", "expression"]
  },
  {
    id: "context",
    term: "Context",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The surrounding physical, cultural, and environmental conditions influencing architectural design. Contextual design responds to and respects existing place characteristics.",
    example: "Contextual design considers neighboring building heights, materials, and street patterns.",
    relatedTerms: ["critical-regionalism", "site-specific", "place"],
    tags: ["design", "relationship", "planning"]
  },
  // building-history-typologies (3 more)
  {
    id: "pagoda",
    term: "Pagoda",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A tiered tower structure with multiple eaves found in Asian architecture, particularly Chinese, Japanese, and Southeast Asian traditions. Pagodas serve religious, symbolic, and ornamental purposes.",
    example: "Buddhist pagodas in Japan combine structural stability with spiritual symbolism through vertical proportions.",
    relatedTerms: ["temple", "asia-architecture", "tower"],
    tags: ["typology", "asian", "religious"]
  },
  // geometry-mathematics (1 more)
  {
    id: "sine-wave",
    term: "Sine Wave",
    section: "geometry-mathematics",
    difficulty: "intermediate",
    definition: "A smooth, periodic curve oscillating between maximum and minimum values. Sine waves appear in natural phenomena and computational design of organic curves.",
    example: "Undulating roof forms in contemporary architecture often follow sine wave curves.",
    relatedTerms: ["curve", "mathematics", "parametric-design"],
    tags: ["mathematics", "curve", "computation"]
  },
  // building-materials-construction (1 more - small gap fill)
  {
    id: "rebar",
    term: "Rebar (Reinforcing Bar)",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "Steel bars embedded in concrete to provide tensile strength. Rebar is essential to reinforced concrete's ability to resist tension and bending.",
    example: "Rebar networks in concrete floors and beams enable them to span and support loads efficiently.",
    relatedTerms: ["reinforced-concrete", "concrete", "steel"],
    tags: ["material", "reinforcement", "structure"]
  },
  // sustainability (1 more)
  {
    id: "biomimicry",
    term: "Biomimicry",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Design approach imitating natural systems and patterns to solve architectural and environmental challenges. Biomimicry learns from nature's proven solutions.",
    example: "Building facades inspired by termite mounds improve natural ventilation and cooling.",
    relatedTerms: ["nature", "sustainability", "design-strategy"],
    tags: ["sustainability", "nature", "innovation"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
