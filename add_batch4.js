const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  {
    id: "arch",
    term: "Arch",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A curved structural form that spans an opening by redirecting loads outward and downward to supports. Arches are ancient structural systems that can span larger distances with less material than beams.",
    example: "The Roman arches in the Pont du Gard in France (19 AD) demonstrate how arches efficiently span large distances.",
    relatedTerms: ["vault", "buttress", "thrust"],
    tags: ["structure", "spanning", "ancient"]
  },
  {
    id: "barrel-vault",
    term: "Barrel Vault",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A continuous cylindrical vault created by extending an arch in one direction. Barrel vaults span large areas while providing clear interior space.",
    example: "Early Christian basilicas like Santa Maria Maggiore in Rome use barrel vaults to create vast interior naves.",
    relatedTerms: ["vault", "arch", "groin-vault"],
    tags: ["structure", "vault", "spanning"]
  },
  {
    id: "beam",
    term: "Beam",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A horizontal structural element that spans between supports and carries loads. Beams work primarily in bending and are fundamental to frame structures.",
    example: "Steel I-beams in modern buildings efficiently span between columns while minimizing depth.",
    relatedTokens: ["girder", "joist", "bending"],
    tags: ["structure", "spanning", "support"]
  },
  {
    id: "bearing-wall",
    term: "Bearing Wall",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A wall that supports structural loads from above, transferring them to the foundation. Bearing walls are primary load paths and typically cannot be moved without structural consequences.",
    example: "Traditional masonry buildings use thick bearing walls spaced at intervals to support floor and roof loads.",
    relatedTerms: ["load-bearing", "wall", "mass"],
    tags: ["structure", "support", "wall"]
  },
  {
    id: "bolt",
    term: "Bolt",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A fastener consisting of a threaded rod with a head, used with a nut to secure structural connections. Bolts are essential for steel frame assembly and joining.",
    example: "High-strength bolts connect steel members in building frames and bridges.",
    relatedTerms: ["fastener", "connection", "steel"],
    tags: ["connection", "fastener", "detail"]
  },
  {
    id: "bracing",
    term: "Bracing",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "Diagonal members added to a structure to resist lateral forces like wind and earthquakes. Bracing creates triangulated patterns that prevent racking and deformation.",
    example: "Steel X-bracing in moment-resisting frames prevents lateral movement in tall buildings.",
    relatedTerms: ["lateral-system", "moment-frame", "diagonal"],
    tags: ["structure", "lateral-resistance", "stability"]
  },
  {
    id: "buttress",
    term: "Buttress",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A projection or thickening of a wall that provides lateral support and resists outward thrust. Buttresses are characteristic of medieval architecture, especially cathedrals.",
    example: "Flying buttresses of Gothic cathedrals transfer roof thrust away from walls, allowing them to be higher and thinner.",
    relatedTerms: ["flying-buttress", "arch", "medieval"],
    tags: ["structure", "support", "medieval"]
  },
  {
    id: "cable-stayed",
    term: "Cable-Stayed",
    section: "structural-systems",
    difficulty: "advanced",
    definition: "A bridge or roof structure supported by cables running from towers directly to the deck or surface. Cable-stayed structures are efficient for long spans with elegant visual expression.",
    example: "The Millau Viaduct in France uses cable-stayed towers to span a deep valley.",
    relatedTerms: ["suspension", "cable", "span"],
    tags: ["structure", "spanning", "bridge"]
  },
  {
    id: "compression",
    term: "Compression",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A force that pushes or squeezes material, reducing its length. Compression is primary load in columns, arches, and walls.",
    example: "Stone and concrete excel under compression, making them ideal for columns and bearing walls.",
    relatedTerms: ["tension", "force", "stress"],
    tags: ["force", "mechanics", "material"]
  },
  {
    id: "connection",
    term: "Connection",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The joint between two structural members where loads are transferred. Connections are critical to structural integrity and can be rigid, pinned, or sliding.",
    example: "Steel connections using bolts or welds must be carefully detailed to transfer forces efficiently.",
    relatedTerms: ["joint", "detail", "assembly"],
    tags: ["structure", "detail", "assembly"]
  },
  {
    id: "dome",
    term: "Dome",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A hemispherical or curved vault that spans circularly, transferring loads radially outward to supporting walls or columns. Domes create dramatic interior spaces with minimal internal supports.",
    example: "The Pantheon in Rome has an unparalleled 142-foot concrete dome that remains the largest unreinforced concrete dome.",
    relatedTerms: ["vault", "arch", "span"],
    tags: ["structure", "vault", "spanning"]
  },
  {
    id: "ductility",
    term: "Ductility",
    section: "building-performance-physics",
    difficulty: "advanced",
    definition: "The ability of a material to deform significantly before breaking, absorbing energy and allowing warning before failure. Ductile materials are desirable in earthquake-prone regions.",
    example: "Steel's ductility allows it to bend significantly before breaking, making it ideal for earthquake-resistant structures.",
    relatedTerms: ["brittle", "resilience", "material"],
    tags: ["material-property", "earthquake-resistance", "safety"]
  },
  {
    id: "elastic",
    term: "Elastic",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "The property of a material to return to its original shape after stress is removed. Elastic deformation is reversible, while plastic deformation is permanent.",
    example: "Steel beams in buildings deform elastically under load and return to shape when load is removed.",
    relatedTerms: ["plastic", "deformation", "resilience"],
    tags: ["material-property", "behavior", "structural"]
  },
  {
    id: "fastener",
    term: "Fastener",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A device used to attach or join two materials together. Fasteners include bolts, rivets, nails, screws, and welds.",
    example: "Steel bolts and welds are critical fasteners in structural steel frame assembly.",
    relatedTerms: ["bolt", "rivet", "connection"],
    tags: ["connection", "hardware", "assembly"]
  },
  {
    id: "flying-buttress",
    term: "Flying Buttress",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "An external arch structure that transfers lateral thrust from a vault or roof over an intermediate space to a distant buttress. Flying buttresses enabled Gothic cathedral walls to rise higher and become thinner.",
    example: "The flying buttresses of Notre-Dame de Chartres allow the soaring stone walls to resist the outward thrust of the vaults.",
    relatedTerms: ["buttress", "arch", "medieval"],
    tags: ["structure", "medieval", "gothic"]
  },
  {
    id: "force",
    term: "Force",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A push or pull that acts on a structure, causing deformation or motion. Forces include compression, tension, shear, torsion, and bending.",
    example: "Wind, earthquakes, gravity, and live loads all exert forces on buildings that must be safely transferred to foundations.",
    relatedTerms: ["stress", "load", "mechanics"],
    tags: ["mechanics", "physics", "structure"]
  },
  {
    id: "foundation",
    term: "Foundation",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "The lowest part of a building structure that transfers loads from the building to the earth. Foundations must be stable, durable, and prevent settling or lateral movement.",
    example: "Deep pile foundations support skyscrapers by anchoring into stable soil or rock layers.",
    relatedTerms: ["footprint", "ground", "support"],
    tags: ["structure", "ground", "support"]
  },
  {
    id: "frame",
    term: "Frame",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A skeletal structure of vertical and horizontal members (columns and beams) connected at joints. Frames are efficient for spanning large spaces and providing flexible interior layouts.",
    example: "Steel and reinforced concrete frames are standard in modern high-rise buildings.",
    relatedTerms: ["column", "beam", "moment-frame"],
    tags: ["structure", "system", "spanning"]
  },
  {
    id: "half-timber",
    term: "Half-Timber",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A construction technique where visible timber frames are filled with masonry, mud, or plaster. Half-timber creates a distinctive aesthetic where structural wood is expressed as decorative pattern.",
    example: "Medieval European buildings feature decorative exposed timber frames with infill of brick or plaster.",
    relatedTerms: ["timber", "infill", "historic"],
    tags: ["construction", "material", "historic"]
  },
  {
    id: "inflection",
    term: "Inflection",
    section: "structural-systems",
    difficulty: "advanced",
    definition: "In structural behavior, a point where bending changes direction or where shear forces change sign. Inflection points are significant in understanding moment distribution.",
    example: "In continuous beams, inflection points mark where positive and negative moments transition.",
    relatedTerms: ["moment", "bending", "stress"],
    tags: ["mechanics", "analysis", "structural"]
  },
  {
    id: "joist",
    term: "Joist",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A small horizontal beam, typically spaced closely together, that directly supports floor or roof loads. Joists span between larger beams or bearing walls.",
    example: "Wooden floor joists are spaced 16 inches apart to support floors efficiently.",
    relatedTerms: ["beam", "floor", "span"],
    tags: ["structure", "spanning", "floor"]
  },
  {
    id: "lateral-system",
    term: "Lateral System",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "The structural system that resists lateral forces from wind, earthquakes, or impact. Lateral systems include moment frames, braced frames, shear walls, and cores.",
    example: "Tall buildings require sophisticated lateral systems like moment-resisting frames or shear walls to resist wind forces.",
    relatedTerms: ["moment-frame", "shear-wall", "bracing"],
    tags: ["structure", "system", "force"]
  },
  {
    id: "load-bearing",
    term: "Load-Bearing",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "Describing structural elements that support significant loads. Load-bearing walls, columns, and foundations are primary structural components.",
    example: "In traditional brick buildings, load-bearing walls support the entire structure.",
    relatedTerms: ["bearing-wall", "support", "structure"],
    tags: ["structure", "support", "system"]
  },
  {
    id: "moment-frame",
    term: "Moment Frame",
    section: "structural-systems",
    difficulty: "advanced",
    definition: "A rigid frame system where members resist lateral forces through bending (moment) rather than diagonal bracing. Moment frames allow large open floor plans but require robust connections.",
    example: "Steel moment-resisting frames in seismic regions are engineered to flex and absorb earthquake energy.",
    relatedTerms: ["frame", "lateral-system", "rigid"],
    tags: ["structure", "system", "lateral-resistance"]
  },
  {
    id: "post-and-beam",
    term: "Post-and-Beam",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A simple structural system where vertical posts support horizontal beams. Post-and-beam construction creates clear, flexible interior spaces.",
    example: "Japanese timber architecture uses elegant post-and-beam systems with minimal material.",
    relatedTerms: ["frame", "column", "beam"],
    tags: ["structure", "system", "traditional"]
  },
  {
    id: "shear-wall",
    term: "Shear Wall",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A solid wall that resists lateral forces by acting like a vertical cantilever. Shear walls are efficient at resisting wind and earthquake forces in tall buildings.",
    example: "Concrete shear walls in apartment buildings efficiently resist wind and seismic forces while providing structural support.",
    relatedTerms: ["lateral-system", "wall", "core"],
    tags: ["structure", "system", "lateral-resistance"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
