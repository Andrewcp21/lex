const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // architectural-terms-theory (16 needed: 44 → 60)
  {
    id: "symmetry",
    term: "Symmetry",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The balanced arrangement of forms around a central axis or point. Symmetry creates harmony and is fundamental to classical and formal architectural composition.",
    example: "The Parthenon exhibits bilateral symmetry around a central axis, creating formal elegance.",
    relatedTerms: ["axis", "balance", "proportion"],
    tags: ["composition", "order", "aesthetics"]
  },
  {
    id: "asymmetry",
    term: "Asymmetry",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The arrangement of forms without mirror symmetry, creating dynamic visual interest through balanced imbalance. Asymmetry is central to modern and contemporary design.",
    example: "Frank Lloyd Wright's designs often use asymmetrical compositions to create organic, dynamic spaces.",
    relatedTerms: ["balance", "composition", "modernism"],
    tags: ["composition", "aesthetics", "design"]
  },
  {
    id: "hierarchy",
    term: "Hierarchy",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The arrangement of elements in order of importance, creating visual and functional priority. Hierarchy guides user attention and navigation through spaces.",
    example: "In a cathedral, the altar is positioned as the primary focal point through scale, light, and orientation.",
    relatedTerms: ["focal-point", "emphasis", "organization"],
    tags: ["composition", "order", "organization"]
  },
  {
    id: "rhythm",
    term: "Rhythm",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The repetition of visual elements at regular or varied intervals, creating visual movement and coherence. Rhythm connects elements and organizes space.",
    example: "Colonnade rhythms in Greek temples create visual continuity and monumental effect.",
    relatedTerms: ["pattern", "repetition", "sequence"],
    tags: ["composition", "pattern", "movement"]
  },
  {
    id: "contrast",
    term: "Contrast",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The juxtaposition of opposing qualities (light-dark, rough-smooth, large-small) creating visual interest and emphasis. Contrast highlights differences and creates drama.",
    example: "The contrast between white marble and dark stone in many buildings creates visual impact.",
    relatedTerms: ["emphasis", "composition", "aesthetics"],
    tags: ["composition", "visual", "aesthetics"]
  },
  {
    id: "figure-ground",
    term: "Figure-Ground",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The visual relationship between a dominant form (figure) and its surrounding space (ground). Figure-ground relationships organize spatial perception.",
    example: "A building's form appears as figure against the sky and landscape as ground.",
    relatedTerms: ["spatial-composition", "perception", "composition"],
    tags: ["spatial", "perception", "composition"]
  },
  {
    id: "modularity",
    term: "Modularity",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The design principle of creating buildings from standardized, repeatable units (modules) that can be combined in various configurations. Modularity enables flexibility and efficiency.",
    example: "Modular design allows prefabrication and customizable configurations in contemporary buildings.",
    relatedTerms: ["module", "standardization", "flexibility"],
    tags: ["design-system", "efficiency", "organization"]
  },
  {
    id: "fenestration",
    term: "Fenestration",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The design and arrangement of windows and openings in a building facade. Fenestration affects light, views, ventilation, and visual composition.",
    example: "Gothic fenestration features large windows with stone tracery, enabling light to flood interiors.",
    relatedTerms: ["window", "facade", "opening"],
    tags: ["facade", "light", "design"]
  },
  {
    id: "articulation",
    term: "Articulation",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The clear expression and separation of distinct architectural elements, creating visual clarity and emphasizing structural logic. Articulation makes design intentions readable.",
    example: "Exposed structural frames articulate the load path and building logic in modernist architecture.",
    relatedTerms: ["expression", "clarity", "structure"],
    tags: ["design", "expression", "clarity"]
  },
  {
    id: "porosity",
    term: "Porosity",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The degree to which a building or urban area allows visual or physical permeability and visual connection. Porous design encourages movement and social interaction.",
    example: "Porous buildings with permeable facades and open ground floors create vibrant public interfaces.",
    relatedTerms: ["permeable", "transparency", "connectivity"],
    tags: ["design", "urban", "social"]
  },
  {
    id: "layering",
    term: "Layering",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The organization of architectural elements in depth, creating visual complexity and spatial richness. Layering adds sophistication and depth to composition.",
    example: "Japanese architecture often uses layered screens and planes to create visual depth and privacy.",
    relatedTerms: ["depth", "composition", "spatial"],
    tags: ["composition", "spatial", "design"]
  },
  {
    id: "threshold",
    term: "Threshold",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A transitional space or moment marking the boundary between two different zones or conditions. Thresholds create psychological and physical shifts in experience.",
    example: "A covered porch threshold marks the transition from public to private domain.",
    relatedTerms: ["boundary", "transition", "spatial-experience"],
    tags: ["spatial", "experience", "transition"]
  },
  {
    id: "figure-field",
    term: "Figure-Field",
    section: "architectural-terms-theory",
    difficulty: "advanced",
    definition: "A compositional approach where a distinct architectural figure is understood against and defined by its surrounding field or context. Figure-field relationships structure visual and spatial experience.",
    example: "A solitary building set within open landscape creates a powerful figure-field relationship.",
    relatedTerms: ["figure-ground", "context", "composition"],
    tags: ["spatial", "composition", "perception"]
  },
  {
    id: "datum",
    term: "Datum",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A major horizontal or vertical line, plane, or element that serves as a reference or organizing framework for a design. Data (plural) unite diverse elements.",
    example: "A continuous roof line acts as a datum organizing the varied facade elements below it.",
    relatedTerms: ["organization", "composition", "order"],
    tags: ["composition", "order", "organization"]
  },
  {
    id: "gestalt",
    term: "Gestalt",
    section: "architectural-terms-theory",
    difficulty: "advanced",
    definition: "A unified whole or configuration perceived as greater than the sum of its parts. Gestalt principles explain how people perceive and organize visual information in architecture.",
    example: "A building's gestalt is its overall impression as a complete form, beyond individual elements.",
    relatedTerms: ["perception", "composition", "unity"],
    tags: ["perception", "psychology", "composition"]
  },
  {
    id: "void",
    term: "Void",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "Empty or negative space in architecture, equally important to solid forms. Voids shape experience, provide light, and create contrast with solid elements.",
    example: "The void at the Guggenheim Museum's center creates dramatic spatial experience and natural light.",
    relatedTerms: ["space", "negative-space", "form"],
    tags: ["space", "form", "design"]
  },
  // tools-software-technology (10 needed: 30 → 40)
  {
    id: "augmented-reality",
    term: "Augmented Reality (AR)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Technology overlaying digital information onto the physical world through devices. AR helps architects visualize designs in real sites and clients understand proposals.",
    example: "AR apps allow clients to see how furniture and designs appear in their actual spaces.",
    relatedTerms: ["visualization", "digital-design", "technology"],
    tags: ["technology", "visualization", "tools"]
  },
  {
    id: "artificial-intelligence",
    term: "Artificial Intelligence (AI)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Machine learning and computational systems that can analyze design problems, generate options, and optimize solutions. AI assists in parametric design and analysis.",
    example: "AI tools can analyze energy performance and generate optimized facade designs.",
    relatedTerms: ["parametric-design", "computation", "algorithm"],
    tags: ["technology", "computation", "tools"]
  },
  {
    id: "point-cloud",
    term: "Point Cloud",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A collection of data points in 3D space capturing physical environments through laser scanning or photogrammetry. Point clouds accurately represent existing conditions for renovation and analysis.",
    example: "Point cloud scanning documents existing building conditions for precise renovation design.",
    relatedTerms: ["laser-scanning", "digital-survey", "3d-modeling"],
    tags: ["technology", "measurement", "data"]
  },
  {
    id: "cloud-computing",
    term: "Cloud Computing",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Computing resources (storage, software, processing) accessed over the internet rather than locally. Cloud enables collaborative design and reduces hardware requirements.",
    example: "Cloud platforms allow distributed teams to collaborate on designs in real-time.",
    relatedTerms: ["collaboration", "digital-design", "technology"],
    tags: ["technology", "collaboration", "infrastructure"]
  },
  {
    id: "api",
    term: "API (Application Programming Interface)",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A standardized protocol allowing different software systems to communicate and share data. APIs enable integration between design tools and other systems.",
    example: "Building information APIs allow design tools to exchange data with analysis and cost estimating software.",
    relatedTerms: ["integration", "digital-workflow", "data"],
    tags: ["technology", "integration", "data"]
  },
  {
    id: "artificial-photosynthesis",
    term: "Generative Design",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "Design approach where algorithms generate multiple design solutions based on specified parameters, constraints, and performance criteria. Generative design explores vast possibility spaces quickly.",
    example: "Generative design can create optimized structural forms that minimize material while maintaining strength.",
    relatedTerms: ["parametric-design", "algorithm", "optimization"],
    tags: ["technology", "computation", "tools"]
  },
  {
    id: "json",
    term: "JSON (JavaScript Object Notation)",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A lightweight data format for storing and exchanging structured information. JSON is widely used in design software, APIs, and digital workflows.",
    example: "Building data is often stored and transmitted in JSON format for interoperability.",
    relatedTerms: ["data-format", "digital-workflow", "api"],
    tags: ["technology", "data", "format"]
  },
  {
    id: "real-time-rendering",
    term: "Real-Time Rendering",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Visualization technology generating images instantly as the user interacts, rather than pre-computed renderings. Real-time rendering enables interactive design exploration.",
    example: "Game engines like Unreal and Unity enable architects to walk through designs in real-time.",
    relatedTerms: ["visualization", "immersive", "virtual-reality"],
    tags: ["technology", "visualization", "tools"]
  },
  {
    id: "mesh",
    term: "Mesh (3D Geometry)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "A 3D geometric representation using vertices, edges, and faces to define surfaces. Meshes are fundamental to 3D modeling and visualization in architecture.",
    example: "Complex curved surfaces in parametric architecture are often represented and analyzed as meshes.",
    relatedTerms: ["3d-modeling", "geometry", "digital-design"],
    tags: ["technology", "3d-modeling", "geometry"]
  },
  {
    id: "node-based-design",
    term: "Node-Based Design",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Design workflow where connections between nodes (operations/parameters) create visual algorithms. Node-based tools enable non-linear, flexible design exploration.",
    example: "Grasshopper uses node-based design to create algorithmic control over form and structure.",
    relatedTerms: ["parametric-design", "algorithm", "visual-programming"],
    tags: ["technology", "computation", "tools"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
