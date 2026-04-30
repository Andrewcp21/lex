const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // urban-design (17)
  {
    id: "public-space",
    term: "Public Space",
    section: "urban-design",
    difficulty: "beginner",
    definition: "Open areas accessible to the public, including streets, plazas, parks, and waterfronts. Public spaces are vital for social interaction, commerce, and community identity.",
    example: "Piazza San Marco in Venice is a celebrated public space defining the city's character.",
    relatedTerms: ["plaza", "street", "community"],
    tags: ["urban", "social", "gathering"]
  },
  {
    id: "plaza",
    term: "Plaza",
    section: "urban-design",
    difficulty: "beginner",
    definition: "An open public square, often at the center of a city or district. Plazas serve as gathering spaces for markets, celebrations, and civic activities.",
    example: "European plazas like the Plaza Mayor in Madrid are focal points of city life.",
    relatedTerms: ["public-space", "square", "civic"],
    tags: ["urban", "public", "gathering"]
  },
  {
    id: "street",
    term: "Street",
    section: "urban-design",
    difficulty: "beginner",
    definition: "A public thoroughfare for pedestrian and vehicular traffic, lined by buildings and public activity. Streets are fundamental urban infrastructure and social spaces.",
    example: "Paris's tree-lined Avenues create distinctive character and walkability.",
    relatedTerms: ["circulation", "public-space", "block"],
    tags: ["urban", "infrastructure", "circulation"]
  },
  {
    id: "waterfront",
    term: "Waterfront",
    section: "urban-design",
    difficulty: "beginner",
    definition: "The land and structures along a body of water (river, harbor, lake). Waterfronts are valuable for commerce, recreation, and place-making.",
    example: "Revitalized waterfronts like London's Thames have become vibrant public spaces.",
    relatedTerms: ["public-space", "landscape", "recreation"],
    tags: ["urban", "landscape", "public"]
  },
  {
    id: "walkability",
    term: "Walkability",
    section: "urban-design",
    difficulty: "beginner",
    definition: "The degree to which an area is pedestrian-friendly, with safe, comfortable streets and close proximity to amenities. High walkability reduces car dependence.",
    example: "Walkable neighborhoods have grocery stores, schools, and services within 10-minute walks.",
    relatedTerms: ["mixed-use", "pedestrian", "density"],
    tags: ["urban-planning", "mobility", "livability"]
  },
  {
    id: "zoning",
    term: "Zoning",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "The regulation of land use through legal designation of districts (residential, commercial, industrial). Zoning shapes urban form and character.",
    example: "Mixed-use zoning allows residential, retail, and office in the same district.",
    relatedTerms: ["mixed-use", "planning", "regulation"],
    tags: ["planning", "regulation", "policy"]
  },
  {
    id: "mixed-use",
    term: "Mixed-Use",
    section: "urban-design",
    difficulty: "beginner",
    definition: "Development combining residential, commercial, office, and recreational uses in proximity. Mixed-use development creates vibrant, economically diverse neighborhoods.",
    example: "Mixed-use neighborhoods like SoHo combine lofts, galleries, restaurants, and retail.",
    relatedTerms: ["density", "walkability", "urban-design"],
    tags: ["urban-planning", "development", "livability"]
  },
  {
    id: "density",
    term: "Density",
    section: "urban-design",
    difficulty: "beginner",
    definition: "The concentration of buildings and people in a given area. Higher density enables public transit, walkability, and efficient land use.",
    example: "High-density cities like Hong Kong maximize limited land through vertical development.",
    relatedTerms: ["development", "walkability", "transit"],
    tags: ["urban-planning", "development", "measurement"]
  },
  {
    id: "public-transit",
    term: "Public Transit",
    section: "urban-design",
    difficulty: "beginner",
    definition: "Shared transportation systems (buses, trains, metros) serving the public. Public transit reduces car dependence and enables urban accessibility.",
    example: "The London Underground and Paris Metro are essential urban transit systems.",
    relatedTerms: ["transportation", "mobility", "infrastructure"],
    tags: ["transportation", "infrastructure", "urban"]
  },
  {
    id: "block",
    term: "Block",
    section: "urban-design",
    difficulty: "beginner",
    definition: "An urban area bounded by streets on all sides. Block size affects walkability, permeability, and neighborhood character.",
    example: "Small blocks in Paris (about 100m x 100m) create walkable, permeable neighborhoods.",
    relatedTerms: ["street", "grid", "urban-design"],
    tags: ["urban-structure", "planning", "measurement"]
  },
  {
    id: "node",
    term: "Node",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "A significant point or junction in an urban fabric, like a plaza, transit station, or landmark. Nodes organize navigation and create focal points.",
    example: "Transit nodes become vibrant urban centers where pedestrians and transportation intersect.",
    relatedTerms: ["landmark", "place-making", "landmark"],
    tags: ["urban-structure", "navigation", "planning"]
  },
  {
    id: "permeable",
    term: "Permeable",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "The quality of urban areas allowing easy pedestrian movement and visual connection through streets and passages. Permeable designs encourage exploration.",
    example: "Permeable medieval towns with interconnected passages feel more walkable than car-oriented grids.",
    relatedTerms: ["walkability", "connectivity", "block"],
    tags: ["design-quality", "pedestrian", "urban"]
  },
  {
    id: "landmark",
    term: "Landmark",
    section: "urban-design",
    difficulty: "beginner",
    definition: "A distinctive building or feature that aids navigation and creates visual identity. Landmarks are focal points that orient people in cities.",
    example: "Big Ben, the Eiffel Tower, and Christ the Redeemer are iconic urban landmarks.",
    relatedTerms: ["node", "identity", "place-making"],
    tags: ["urban-identity", "navigation", "visual"]
  },
  {
    id: "place-making",
    term: "Place-Making",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "The collaborative process of transforming public spaces into beloved community places. Place-making involves design, programming, and community engagement.",
    example: "Tactical urbanism like parklets and pop-up gardens create identity in underutilized spaces.",
    relatedTerms: ["public-space", "community", "participation"],
    tags: ["urban-design", "community", "engagement"]
  },
  {
    id: "edge",
    term: "Edge",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "A linear element that separates or connects different districts, like a waterfront, wall, or transition zone. Edges define urban boundaries and identity.",
    example: "The Thames edge in London separates neighborhoods while providing public access and recreation.",
    relatedTerms: ["boundary", "waterfront", "district"],
    tags: ["structure", "boundary", "urban"]
  },
  {
    id: "infill-development",
    term: "Infill Development",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "Development that fills vacant lots or underutilized sites within existing urban areas. Infill increases density and vitality while maintaining neighborhood character.",
    example: "Infill housing in older neighborhoods can increase density without sprawl.",
    relatedTerms: ["infill", "density", "development"],
    tags: ["urban-planning", "development", "sustainability"]
  },
  {
    id: "accessibility",
    term: "Accessibility",
    section: "urban-design",
    difficulty: "intermediate",
    definition: "The ease with which people can reach destinations, services, and opportunities. Accessibility depends on distance, transportation, and infrastructure.",
    example: "Accessible neighborhoods have schools, groceries, and services within walking distance.",
    relatedTerms: ["walkability", "transit", "mobility"],
    tags: ["urban-planning", "equity", "access"]
  },
  // professional-practice (16)
  {
    id: "architect",
    term: "Architect",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A licensed professional trained in designing buildings and leading design projects. Architects combine artistic vision with technical expertise and project management.",
    example: "Frank Lloyd Wright and I.M. Pei are renowned architects who shaped architectural history.",
    relatedTerms: ["profession", "licensing", "designer"],
    tags: ["profession", "role", "expertise"]
  },
  {
    id: "award",
    term: "Award",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "Recognition for excellence in architecture, given by professional organizations, publications, or competitions. Awards validate quality and advance careers.",
    example: "The Pritzker Prize is the most prestigious award in architecture.",
    relatedTerms: ["recognition", "competition", "excellence"],
    tags: ["recognition", "profession", "excellence"]
  },
  {
    id: "brief",
    term: "Brief",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A written statement defining a project's requirements, constraints, and goals. A comprehensive brief guides the design process.",
    example: "A project brief includes user needs, budget, timeline, site analysis, and desired outcomes.",
    relatedTerms: ["program", "requirements", "planning"],
    tags: ["process", "documentation", "planning"]
  },
  {
    id: "client",
    term: "Client",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "The person or organization commissioning and funding a building project. Clients define needs, constraints, and budgets.",
    example: "Clients range from individuals building homes to corporations commissioning headquarters.",
    relatedTerms: ["stakeholder", "developer", "user"],
    tags: ["relationship", "project-role", "stakeholder"]
  },
  {
    id: "collaboration",
    term: "Collaboration",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "Working jointly with other professionals (engineers, contractors, specialists) throughout a project. Collaboration integrates diverse expertise.",
    example: "Architects collaborate with structural engineers, MEP engineers, and contractors to realize designs.",
    relatedTerms: ["teamwork", "coordination", "multidisciplinary"],
    tags: ["process", "teamwork", "management"]
  },
  {
    id: "competition",
    term: "Competition",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A formal contest where architects submit designs for evaluation by a jury. Competitions are ways to win projects and gain recognition.",
    example: "Architectural competitions like the Pritzker Prize showcase innovative thinking.",
    relatedTerms: ["award", "selection", "process"],
    tags: ["process", "recognition", "selection"]
  },
  {
    id: "construction-management",
    term: "Construction Management",
    section: "professional-practice",
    difficulty: "intermediate",
    definition: "The process of overseeing building construction, coordinating contractors, quality control, and schedule/budget management. Construction managers ensure design intent is realized.",
    example: "Construction managers monitor progress, inspect work, and coordinate trades.",
    relatedTerms: ["contractor", "supervision", "project-management"],
    tags: ["process", "management", "oversight"]
  },
  {
    id: "consultant",
    term: "Consultant",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A specialist hired to provide expert advice in a specific area (structural, MEP, acoustics, sustainability). Consultants extend team capabilities.",
    example: "Acoustic consultants optimize sound performance in concert halls and theaters.",
    relatedTerms: ["specialist", "expertise", "collaboration"],
    tags: ["role", "expertise", "team"]
  },
  {
    id: "contract",
    term: "Contract",
    section: "professional-practice",
    difficulty: "intermediate",
    definition: "A legally binding agreement defining rights, obligations, and compensation between parties (owner, architect, contractor). Contracts protect all parties.",
    example: "AIA contracts are standard templates used in architectural practice.",
    relatedTerms: ["agreement", "legal", "terms"],
    tags: ["legal", "business", "documentation"]
  },
  {
    id: "contractor",
    term: "Contractor",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A company hired to execute construction work according to designs and specifications. Contractors manage labor, materials, and schedule.",
    example: "General contractors oversee subcontractors and coordinate different trades.",
    relatedTerms: ["subcontractor", "builder", "construction"],
    tags: ["role", "construction", "project-team"]
  },
  {
    id: "coordination",
    term: "Coordination",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "The process of ensuring all project elements work together harmoniously, including design, documentation, and construction. Coordination prevents conflicts and rework.",
    example: "BIM coordination allows architects, engineers, and contractors to identify clashes before construction.",
    relatedTerms: ["collaboration", "bim", "management"],
    tags: ["process", "management", "teamwork"]
  },
  {
    id: "developer",
    term: "Developer",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A company that identifies opportunities, secures sites, and commissions architects to develop real estate projects. Developers manage financing and project viability.",
    example: "Developers balance profit, feasibility, and community impact.",
    relatedTerms: ["client", "entrepreneur", "investment"],
    tags: ["business", "role", "project-team"]
  },
  {
    id: "design-development",
    term: "Design Development",
    section: "professional-practice",
    difficulty: "intermediate",
    definition: "The phase where conceptual designs are refined into detailed construction documents. Design development refines proportions, materials, systems, and details.",
    example: "Design development phase includes detailed drawings, material selections, and systems coordination.",
    relatedTerms: ["schematic-design", "construction-documents", "phase"],
    tags: ["process", "phase", "documentation"]
  },
  {
    id: "fees",
    term: "Fees",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "Compensation paid to architects for design services, typically calculated as a percentage of construction cost or fixed lump sum. Fees cover design, documentation, and administration.",
    example: "Architect fees typically range from 5-15% of construction cost depending on project complexity.",
    relatedTerms: ["budget", "contract", "compensation"],
    tags: ["business", "economics", "practice"]
  },
  {
    id: "licensing",
    term: "Licensing",
    section: "professional-practice",
    difficulty: "intermediate",
    definition: "The professional certification required to practice architecture, obtained through education, experience, and examination. Licensing ensures professional competence and accountability.",
    example: "Licensed architects in the US are registered in their states and must continue professional development.",
    relatedTerms: ["professional", "regulation", "credentials"],
    tags: ["regulation", "credential", "profession"]
  },
  {
    id: "precedent",
    term: "Precedent",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "A previous example or case used as a reference or model for current work. Studying precedents informs design decisions and solutions.",
    example: "Architects study precedent buildings to understand spatial organization, materiality, and solutions.",
    relatedTerms: ["research", "reference", "inspiration"],
    tags: ["process", "research", "learning"]
  },
  {
    id: "program",
    term: "Program",
    section: "professional-practice",
    difficulty: "beginner",
    definition: "A detailed outline of building functions, spaces, and user needs. The program guides spatial organization and planning.",
    example: "A hospital program specifies departments, bed counts, operating rooms, and circulation requirements.",
    relatedTerms: ["brief", "requirements", "planning"],
    tags: ["planning", "requirements", "process"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
