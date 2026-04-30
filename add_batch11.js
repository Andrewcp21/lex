const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // design-styles-movements (9 needed: 41 → 50)
  {
    id: "rationalism",
    term: "Rationalism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "Architectural movement emphasizing logic, reason, and functional clarity over ornamentation. Rationalism seeks transparent expression of structure and purpose.",
    example: "Rationalist architecture emphasizes clear structural logic and programmatic organization.",
    relatedTerms: ["functionalism", "modernism", "logic"],
    tags: ["movement", "modernism", "theory"]
  },
  {
    id: "critical-regionalism",
    term: "Critical Regionalism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "Architectural movement balancing universal modernism with local context, climate, and cultural traditions. Critical regionalism resists placeless globalization.",
    example: "Contemporary architects use regional materials and vernacular references while maintaining modern principles.",
    relatedTerms: ["vernacular", "context", "modernism"],
    tags: ["movement", "theory", "contemporary"]
  },
  {
    id: "metabolism",
    term: "Metabolism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "Japanese architectural movement (1960s-70s) proposing buildings as living organisms with replaceable components and growth capacity. Metabolism embraced change and impermanence.",
    example: "Kenzo Tange's Yoyogi National Gymnasium expresses metabolist principles of organic structure and flexibility.",
    relatedTerms: ["organic-architecture", "futurism", "japanese"],
    tags: ["movement", "japanese", "experimental"]
  },
  {
    id: "brutalism",
    term: "Brutalism",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "Architectural style emphasizing massive, raw concrete forms and bold structural expression. Brutalism emerged in the 1950s-70s as expression of modernist idealism.",
    example: "The Barbican Estate in London exemplifies brutalist housing with monumental concrete forms.",
    relatedTerms: ["modernism", "concrete", "monumentality"],
    tags: ["movement", "modernism", "material"]
  },
  {
    id: "high-tech",
    term: "High-Tech",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "Architectural movement celebrating exposed mechanical systems, industrial materials, and advanced technology. High-tech makes building systems architecturally expressive.",
    example: "Richard Rogers and Renzo Piano's Pompidou Centre showcases structural systems and mechanical equipment as architectural expression.",
    relatedTerms: ["expressionism", "modernism", "technology"],
    tags: ["movement", "modernism", "technology"]
  },
  {
    id: "vernacular-revival",
    term: "Vernacular Revival",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "Movement reinterpreting traditional local building practices and forms in contemporary architecture. Vernacular revival values regional identity and sustainable practices.",
    example: "Contemporary architects reference vernacular cooling strategies and material traditions in sustainable designs.",
    relatedTerms: ["vernacular", "sustainability", "regionalism"],
    tags: ["movement", "tradition", "sustainability"]
  },
  {
    id: "neoeclecticism",
    term: "Neo-Eclecticism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "Postmodern movement freely combining references from multiple historical styles without adherence to single tradition. Neo-eclecticism celebrates complexity and historical pluralism.",
    example: "Postmodern architects playfully mix classical, modernist, and contemporary references.",
    relatedTerms: ["postmodernism", "eclecticism", "historical-reference"],
    tags: ["movement", "postmodern", "aesthetic"]
  },
  {
    id: "minimal-architecture",
    term: "Minimal Architecture",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "Movement reducing buildings to essential geometric forms and minimal material expression. Minimal architecture emphasizes clarity, simplicity, and precise execution.",
    example: "Donald Judd's architecture demonstrates minimal principles through simple geometric forms and careful material selection.",
    relatedTerms: ["minimalism", "reduction", "geometry"],
    tags: ["movement", "minimalism", "aesthetic"]
  },
  {
    id: "deconstructivism",
    term: "Deconstructivism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "Architectural movement fragmenting and distorting conventional forms, challenging architectural language and construction logic. Deconstructivism emerged in the 1980s.",
    example: "Frank Gehry's Guggenheim Bilbao uses fragmentary metallic forms to deconstruct traditional building language.",
    relatedTerms: ["postmodernism", "form", "expressionism"],
    tags: ["movement", "contemporary", "experimental"]
  },
  // building-performance-physics (6 needed: 19 → 25)
  {
    id: "thermal-mass",
    term: "Thermal Mass",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The capacity of materials to absorb and store heat, moderating temperature fluctuations. Thermal mass buffers daily temperature swings and reduces mechanical conditioning needs.",
    example: "Stone and concrete walls provide thermal mass that stabilizes interior temperatures passively.",
    relatedTerms: ["passive-design", "thermal-comfort", "material"],
    tags: ["physics", "energy", "material"]
  },
  {
    id: "thermal-resistance",
    term: "Thermal Resistance (R-Value)",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "A material's resistance to heat flow, measured in R-value (higher is better). Thermal resistance is essential for calculating insulation effectiveness and energy performance.",
    example: "High R-value insulation significantly reduces heating and cooling loads in buildings.",
    relatedTerms: ["insulation", "thermal-comfort", "energy-efficiency"],
    tags: ["physics", "energy", "material"]
  },
  {
    id: "solar-gain",
    term: "Solar Gain",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "Heat entering buildings through glazing and solar radiation. Controlling solar gain through orientation, shading, and glazing properties is crucial for energy efficiency.",
    example: "South-facing windows in passive solar design maximize winter solar gain while minimizing summer overheating.",
    relatedTerms: ["passive-design", "glazing", "shading-device"],
    tags: ["energy", "climate", "design-strategy"]
  },
  {
    id: "sound-transmission",
    term: "Sound Transmission",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The passage of sound through building assemblies. Sound transmission class (STC) ratings measure acoustic isolation performance of walls and windows.",
    example: "High STC-rated windows reduce external noise transmission into buildings.",
    relatedTerms: ["acoustics", "insulation", "performance"],
    tags: ["physics", "sound", "comfort"]
  },
  {
    id: "decibel",
    term: "Decibel (dB)",
    section: "building-performance-physics",
    difficulty: "beginner",
    definition: "A logarithmic unit measuring sound intensity relative to a reference level. Decibels quantify acoustic performance and noise levels in buildings.",
    example: "Normal conversation is approximately 60 dB, while office background noise is typically 50-60 dB.",
    relatedTerms: ["acoustics", "sound-transmission", "performance"],
    tags: ["physics", "measurement", "sound"]
  },
  {
    id: "air-tightness",
    term: "Air-Tightness",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The degree to which a building envelope prevents unintended air leakage. Air-tightness is measured through blower door testing and is critical for energy efficiency.",
    example: "Passive house standards require extremely low air infiltration rates, typically 0.6 ACH50 or less.",
    relatedTerms: ["air-infiltration", "envelope", "energy-efficiency"],
    tags: ["performance", "energy", "envelope"]
  },
  // structural-systems (5 needed: 35 → 40)
  {
    id: "tension",
    term: "Tension",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A force that pulls or stretches material, lengthening it under load. Tension is primary in cables, tendons, and tensile structures.",
    example: "Cable-stayed bridges use tension in cables to support the deck efficiently.",
    relatedTerms: ["compression", "force", "stress"],
    tags: ["force", "mechanics", "structural"]
  },
  {
    id: "torsion",
    term: "Torsion",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A twisting force that rotates a structural member. Torsion occurs from unbalanced lateral forces and must be resisted through structural systems.",
    example: "Tall buildings under wind loading experience torsional forces that must be resisted by core or braced systems.",
    relatedTerms: ["force", "stress", "lateral-system"],
    tags: ["force", "mechanics", "structural"]
  },
  {
    id: "shear",
    term: "Shear",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A force that causes one part of a material to slide relative to another, creating stress parallel to the force. Shear is common in beams and connections.",
    example: "Horizontal shear stress in beams must be managed through proper depth and support spacing.",
    relatedTerms: ["force", "stress", "bending"],
    tags: ["force", "mechanics", "structural"]
  },
  {
    id: "cable-structure",
    term: "Cable Structure",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A structural system where cables in tension support loads through geometric form rather than material strength. Cable structures are efficient for long spans.",
    example: "Suspension bridge cables efficiently span large distances, transferring loads through tension and geometry.",
    relatedTerms: ["suspension", "tension", "spanning"],
    tags: ["structure", "spanning", "systems"]
  },
  {
    id: "truss",
    term: "Truss",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A rigid structural frame composed of triangulated members in tension and compression, efficiently spanning distance with minimal material. Trusses are ancient and fundamental to spanning systems.",
    example: "Steel trusses efficiently span large distances in warehouses and exhibition halls with minimal vertical depth.",
    relatedTerms: ["frame", "triangle", "spanning"],
    tags: ["structure", "spanning", "system"]
  },
  // urban-design (5 needed: 25 → 30)
  {
    id: "placemaking",
    term: "Place-Making",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "The collaborative process of creating meaningful public spaces through design, programming, and community engagement. Place-making builds community identity and vitality.",
    example: "Community-led park activation creates beloved gathering spaces through events and engagement.",
    relatedTerms: ["public-space", "community", "participation"],
    tags: ["urban-design", "community", "engagement"]
  },
  {
    id: "third-place",
    term: "Third Place",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "Public gathering spaces distinct from home (first place) and work (second place) where people socialize and build community. Third places include cafes, parks, and markets.",
    example: "Coffee shops and public markets serve as third places fostering informal community gathering.",
    relatedTerms: ["public-space", "community", "social"],
    tags: ["social", "urban", "community"]
  },
  {
    id: "gentrification",
    term: "Gentrification",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "The process where revitalized urban areas attract higher-income residents and businesses, often displacing existing communities. Gentrification raises equity and affordability concerns.",
    example: "Waterfront revitalizations improve neighborhoods but often increase property values and displacement.",
    relatedTerms: ["equity", "community", "affordability"],
    tags: ["planning", "social", "policy"]
  },
  {
    id: "new-urbanism",
    term: "New Urbanism",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "Urban design movement promoting walkable, mixed-use neighborhoods with human-scale development. New urbanism rejects sprawl and advocates sustainable, livable communities.",
    example: "New urbanist developments feature mixed-use town centers, diverse housing, and strong public transit.",
    relatedTerms: ["walkability", "mixed-use", "sustainability"],
    tags: ["movement", "urban", "planning"]
  },
  {
    id: "tactical-urbanism",
    term: "Tactical Urbanism",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "Small-scale, community-led design interventions creating immediate change in public spaces. Tactical urbanism includes parklets, pop-up parks, and temporary installations.",
    example: "Temporary parklets and painted pedestrian zones demonstrate potential improvements before permanent investment.",
    relatedTerms: ["place-making", "public-space", "community"],
    tags: ["urban-design", "activism", "community"]
  },
  // key-figures (5 needed: 25 → 30)
  {
    id: "brasilia-lucio-costa",
    term: "Lúcio Costa",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "Brazilian architect (1902-1998) and urban planner who designed Brasília. Costa combined modernist principles with Brazilian cultural identity and modernist urbanism.",
    example: "Brasília's planned layout and monumental civic architecture exemplify Costa's modernist urban vision.",
    relatedTerms: ["modernism", "urban-design", "brasilia"],
    tags: ["architect", "modernism", "brazilian"]
  },
  {
    id: "oscar-niemeyer",
    term: "Oscar Niemeyer",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "Brazilian architect (1907-2012) known for sculptural modernism and expressive concrete forms. Niemeyer's work combines modernist abstraction with social engagement.",
    example: "The Niterói Museum features Niemeyer's signature curved forms and sculptural concrete expression.",
    relatedTerms: ["modernism", "concrete", "sculpture"],
    tags: ["architect", "modernism", "brazilian"]
  },
  {
    id: "kenzo-tange",
    term: "Kenzo Tange",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "Japanese architect (1926-2005) pioneer of postwar Japanese modernism and metabolist movement. Tange created iconic buildings merging traditional Japanese and modernist principles.",
    example: "The Yoyogi National Gymnasium demonstrates Tange's bold structural expression and organic modernism.",
    relatedTerms: ["modernism", "metabolism", "japanese"],
    tags: ["architect", "modernism", "japanese"]
  },
  {
    id: "richard-meier",
    term: "Richard Meier",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "American architect (born 1934) known for white minimalist buildings expressing abstraction and geometry. Meier created iconic cultural and residential buildings.",
    example: "The Getty Center demonstrates Meier's geometric abstraction and refined minimalist vocabulary.",
    relatedTerms: ["minimalism", "modernism", "geometry"],
    tags: ["architect", "contemporary", "american"]
  },
  {
    id: "thomas-heatherwick",
    term: "Thomas Heatherwick",
    section: "key-figures",
    difficulty: "intermediate",
    definition: "British designer and architect (born 1970) known for sculptural, innovative public structures and craft-based design. Heatherwick combines craft tradition with contemporary form.",
    example: "The Vessel at Hudson Yards features Heatherwick's signature sculptural staircase form.",
    relatedTerms: ["contemporary", "sculpture", "craft"],
    tags: ["architect", "contemporary", "british"]
  },
  // professional-practice (2 needed: 28 → 30)
  {
    id: "cad",
    term: "CAD (Computer-Aided Design)",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "Software tools enabling architects to create precise digital drawings and models. CAD is fundamental to contemporary design practice and construction documentation.",
    example: "Architects use CAD to create construction documents with specifications and details.",
    relatedTerms: ["digital-design", "documentation", "technology"],
    tags: ["tools", "process", "technology"]
  },
  {
    id: "design-thinking",
    term: "Design Thinking",
    section: "professional-practice",
    difficulty: "intermediate",
    definition: "A problem-solving methodology emphasizing empathy, ideation, prototyping, and iteration. Design thinking approaches human-centered solutions through collaborative exploration.",
    example: "Design thinking workshops engage stakeholders in collaborative exploration of user needs and solutions.",
    relatedTerms: ["process", "user-centered", "methodology"],
    tags: ["process", "methodology", "innovation"]
  },
  // representation-communication (1 needed: 29 → 30)
  {
    id: "perspective-drawing",
    term: "Perspective Drawing",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A drawing technique representing three-dimensional space on a two-dimensional surface, simulating human vision. Perspective drawings communicate spatial experience and depth.",
    example: "One-point perspective drawings effectively convey depth and spatial relationships in architectural spaces.",
    relatedTerms: ["drawing", "visualization", "space"],
    tags: ["representation", "drawing", "communication"]
  },
  // geometry-mathematics (2 needed: 23 → 25)
  {
    id: "hyperbolic-paraboloid",
    term: "Hyperbolic Paraboloid",
    section: "geometry-mathematics",
    difficulty: "advanced",
    definition: "A three-dimensional curved surface defined by two opposing parabolic curves. Hyperbolic paraboloids create dramatic vaults with minimal material.",
    example: "Félix Candela's thin shell structures use hyperbolic paraboloid geometry to create expressive forms.",
    relatedTerms: ["curve", "surface", "structural-form"],
    tags: ["geometry", "3d-form", "mathematics"]
  },
  {
    id: "hexagon",
    term: "Hexagon",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A six-sided polygon with equal sides and angles (in regular hexagons). Hexagons tessellate efficiently and appear in nature and Islamic geometric patterns.",
    example: "Hexagonal tessellations appear in Islamic tilework and modern computational design.",
    relatedTerms: ["polygon", "pattern", "tessellation"],
    tags: ["geometry", "shape", "pattern"]
  },
  // sustainability (2 needed: 28 → 30)
  {
    id: "net-zero",
    term: "Net-Zero",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Buildings producing as much energy as they consume over a year, typically combining efficiency and renewable generation. Net-zero is increasingly a standard sustainability goal.",
    example: "Net-zero buildings combine superior insulation, mechanical efficiency, and solar generation.",
    relatedTerms: ["renewable-energy", "energy-efficiency", "carbon"],
    tags: ["sustainability", "energy", "performance"]
  },
  {
    id: "embodied-carbon",
    term: "Embodied Carbon",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "The total greenhouse gas emissions associated with material production, transportation, and construction. Embodied carbon is increasingly measured alongside operational carbon.",
    example: "Concrete production accounts for significant embodied carbon; sustainable design minimizes material use and promotes alternatives.",
    relatedTerms: ["carbon", "materials", "lifecycle-assessment"],
    tags: ["sustainability", "climate", "material"]
  },
  // codes-standards (1 needed: 24 → 25)
  {
    id: "leed",
    term: "LEED (Leadership in Energy and Environmental Design)",
    section: "codes-standards",
    difficulty: "intermediate",
    definition: "A voluntary green building rating system certifying environmental performance across site, water, energy, materials, and indoor environmental quality.",
    example: "LEED certification requires meeting criteria in multiple sustainability categories and scoring points.",
    relatedTerms: ["certification-standards", "sustainability", "rating-system"],
    tags: ["certification", "sustainability", "regulation"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
