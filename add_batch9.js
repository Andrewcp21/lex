const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // key-figures (10)
  {
    id: "frank-lloyd-wright",
    term: "Frank Lloyd Wright",
    section: "key-figures",
    difficulty: "beginner",
    definition: "American architect (1867-1959) known for organic architecture philosophy integrating buildings with natural landscapes. Wright designed iconic structures like Fallingwater and the Guggenheim Museum.",
    example: "Fallingwater seamlessly integrates with its waterfall setting, demonstrating Wright's organic architecture principles.",
    relatedTerms: ["organic-architecture", "modernism", "residential-design"],
    tags: ["architect", "american", "modernism"]
  },
  {
    id: "le-corbusier",
    term: "Le Corbusier",
    section: "key-figures",
    difficulty: "beginner",
    definition: "Swiss-French architect and designer (1887-1965) pioneer of modernism and functionalism. Le Corbusier developed the five points of architecture and the Modulor proportional system.",
    example: "Villa Savoye exemplifies Le Corbusier's five points: pilotis, free facades, free floor plans, ribbon windows, and roof gardens.",
    relatedTerms: ["modernism", "functionalism", "modulor"],
    tags: ["architect", "modernism", "design-theory"]
  },
  {
    id: "zaha-hadid",
    term: "Zaha Hadid",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "Iraqi-British architect (1950-2016) known for parametric design and flowing, organic forms. Hadid pioneered digital architecture and won the Pritzker Prize in 2004.",
    example: "The Heydar Aliyev Center in Baku features Hadid's signature flowing curves and parametric design approach.",
    relatedTerms: ["parametric-design", "digital-architecture", "contemporary"],
    tags: ["architect", "contemporary", "design-innovation"]
  },
  {
    id: "i-m-pei",
    term: "I.M. Pei",
    section: "key-figures",
    difficulty: "beginner",
    definition: "Chinese-American architect (1917-2019) known for modernist buildings and geometric forms. Pei designed the Bank of China Tower and the Louvre Pyramid.",
    example: "The Louvre Pyramid in Paris demonstrates Pei's geometric modernism and glass technology innovation.",
    relatedTerms: ["modernism", "geometric-form", "institutional-design"],
    tags: ["architect", "modernism", "american"]
  },
  {
    id: "louis-kahn",
    term: "Louis Kahn",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "American architect (1901-1974) famous for monumental forms, exposed materials, and layered spatial compositions. Kahn's philosophy emphasized 'what the building wants to be.'",
    example: "The Kimbell Art Museum features Kahn's signature vaulted forms and careful material expression.",
    relatedTerms: ["materiality", "spatial-composition", "monumentality"],
    tags: ["architect", "american", "modernism"]
  },
  {
    id: "rem-koolhaas",
    term: "Rem Koolhaas",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "Dutch architect (born 1944) founder of OMA, known for theoretical writings and large-scale urban projects. Koolhaas integrates history, programming, and complexity in design.",
    example: "The Seattle Public Library demonstrates Koolhaas's bold geometric forms and programmatic complexity.",
    relatedTerms: ["urban-design", "programming", "contemporary"],
    tags: ["architect", "contemporary", "theorist"]
  },
  {
    id: "norma-merrick-sklarek",
    term: "Norma Merrick Sklarek",
    section: "key-figures",
    difficulty: "beginner",
    definition: "American architect (1928-2012), first African-American woman to receive architectural licensure and to become AIA fellow. Pioneer in advancing diversity in architecture.",
    example: "Sklarek's work includes the Pacific Design Center and numerous civic projects, advancing diversity in the profession.",
    relatedTerms: ["professional-practice", "diversity", "modernism"],
    tags: ["architect", "american", "diversity"]
  },
  {
    id: "alvar-aalto",
    term: "Alvar Aalto",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "Finnish architect (1898-1976) known for organic modernism, humane scale, and functional elegance. Aalto bridged Nordic design traditions with modernist principles.",
    example: "Villa Mairea combines organic forms, natural materials, and functional modernism in residential design.",
    relatedTerms: ["organic-architecture", "modernism", "materials"],
    tags: ["architect", "modernism", "nordic"]
  },
  {
    id: "david-chipperfield",
    term: "David Chipperfield",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "British architect (born 1953) known for refined modernism, cultural institutions, and careful material and spatial composition. Pritzker Prize winner 2023.",
    example: "The Valentino Headquarters demonstrates Chipperfield's minimalist aesthetic and material refinement.",
    relatedTerms: ["modernism", "institutional-design", "materials"],
    tags: ["architect", "contemporary", "british"]
  },
  {
    id: "maya-lin",
    term: "Maya Lin",
    section: "key-figures",
    difficulty: "beginner",
    definition: "American architect (born 1957) known for minimalist memorial and environmental design. Lin's work emphasizes site-specific design and social responsibility.",
    example: "The Vietnam Veterans Memorial integrates landscape and minimalist design to create a powerful place of contemplation.",
    relatedTerms: ["minimalism", "landscape-design", "memorial"],
    tags: ["architect", "american", "contemporary"]
  },
  // codes-standards (6)
  {
    id: "building-code",
    term: "Building Code",
    section: "codes-standards",
    difficulty: "beginner",
    definition: "Legal regulations governing building design, construction, and safety. Codes address structural safety, fire protection, accessibility, energy efficiency, and public health.",
    example: "The International Building Code (IBC) sets minimum safety standards for construction in North America.",
    relatedTerms: ["safety", "regulation", "compliance"],
    tags: ["regulation", "safety", "legal"]
  },
  {
    id: "accessibility-standards",
    term: "Accessibility Standards",
    section: "codes-standards",
    difficulty: "intermediate",
    definition: "Regulations ensuring buildings are usable by people of all abilities, including mobility, vision, and hearing impairments. ADA and similar standards define ramps, doorways, restrooms, signage.",
    example: "ADA standards require wheelchair-accessible ramps with 1:12 slope ratios on public buildings.",
    relatedTerms: ["universal-design", "equity", "regulation"],
    tags: ["regulation", "accessibility", "equity"]
  },
  {
    id: "energy-code",
    term: "Energy Code",
    section: "codes-standards",
    difficulty: "intermediate",
    definition: "Regulations governing building energy efficiency, including insulation, HVAC, lighting, and renewable energy requirements. Energy codes reduce operational carbon emissions.",
    example: "ASHRAE 90.1 sets minimum energy efficiency standards for new buildings and major renovations.",
    relatedTerms: ["sustainability", "energy-efficiency", "regulation"],
    tags: ["regulation", "energy", "sustainability"]
  },
  {
    id: "fire-code",
    term: "Fire Code",
    section: "codes-standards",
    difficulty: "beginner",
    definition: "Regulations addressing fire prevention, egress, fire-rated assemblies, sprinkler systems, and emergency response. Fire codes save lives and protect property.",
    example: "Fire codes require minimum stairwell widths, maximum travel distances to exits, and fire-rated door assemblies.",
    relatedTerms: ["safety", "egress", "regulation"],
    tags: ["regulation", "safety", "fire"]
  },
  {
    id: "zoning-ordinance",
    term: "Zoning Ordinance",
    section: "codes-standards",
    difficulty: "intermediate",
    definition: "Local regulations governing land use, building setbacks, building heights, density, and use restrictions. Zoning ordinances shape urban form and neighborhood character.",
    example: "Zoning ordinances specify residential height limits, required parking ratios, and setback distances from property lines.",
    relatedTerms: ["zoning", "urban-design", "regulation"],
    tags: ["regulation", "planning", "zoning"]
  },
  {
    id: "certification-standards",
    term: "Certification Standards",
    section: "codes-standards",
    difficulty: "intermediate",
    definition: "Voluntary standards certifying building performance (LEED, WELL, Passive House, etc.). Certifications validate sustainability, health, and energy performance claims.",
    example: "LEED certification recognizes buildings meeting sustainability criteria across site, water, energy, materials, and indoor quality.",
    relatedTerms: ["sustainability", "performance", "rating-system"],
    tags: ["sustainability", "certification", "performance"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
