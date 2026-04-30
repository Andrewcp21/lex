const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // building-history-typologies (19)
  {
    id: "apartment",
    term: "Apartment",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A self-contained residential unit within a larger building. Apartments range from studio units to multi-bedroom dwellings and are organized vertically in apartment buildings.",
    example: "Modern urban apartment buildings stack dozens of independent units efficiently.",
    relatedTerms: ["dwelling", "residential", "unit"],
    tags: ["residential", "dwelling", "urban"]
  },
  {
    id: "basilica",
    term: "Basilica",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "A large, formal building type with a rectangular plan, originally Roman, later adopted for early Christian churches. Basilicas feature a central nave and side aisles.",
    example: "Santa Maria Maggiore in Rome is a 5th-century Christian basilica with a classic plan of central nave and side aisles.",
    relatedTerms: ["cathedral", "church", "nave"],
    tags: ["religious", "historic", "typology"]
  },
  {
    id: "brothel",
    term: "Brothel",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "A building dedicated to prostitution, historically significant in many urban centers. Brothels were often architecturally significant and reveal social history.",
    example: "Historic brothels in Amsterdam feature distinctive architecture and window configurations.",
    relatedTerms: ["vernacular", "commercial", "social"],
    tags: ["social", "historic", "commercial"]
  },
  {
    id: "brownstone",
    term: "Brownstone",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A narrow townhouse with a brownstone (reddish-brown sandstone) facade, typical of 19th-century urban residential architecture in New York, Boston, and Philadelphia.",
    example: "Brooklyn and Manhattan brownstones are iconic 4-5 story townhouses with front stoops.",
    relatedTerms: ["townhouse", "residential", "Victorian"],
    tags: ["residential", "urban", "19th-century"]
  },
  {
    id: "castle",
    term: "Castle",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A fortified residence of a noble, featuring defensive walls, towers, and gateways. Castles combine residential, ceremonial, and defensive functions.",
    example: "Medieval castles like Neuschwanstein in Bavaria feature elaborate towers, walls, and keeps.",
    relatedTerms: ["fortress", "fortification", "noble"],
    tags: ["medieval", "fortification", "historic"]
  },
  {
    id: "cathedral",
    term: "Cathedral",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "The principal church of a diocese, typically large and architecturally impressive. Cathedrals are centers of religious and civic importance.",
    example: "Notre-Dame de Chartres is a Gothic cathedral known for its flying buttresses and rose windows.",
    relatedTerms: ["church", "religious", "gothic"],
    tags: ["religious", "civic", "architecture"]
  },
  {
    id: "church",
    term: "Church",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A building dedicated to Christian worship, ranging from modest chapels to grand cathedrals. Churches are central to community life and often architecturally significant.",
    example: "Local parish churches serve neighborhoods while major churches like Sainte-Chapelle are architectural masterpieces.",
    relatedTerms: ["cathedral", "chapel", "religious"],
    tags: ["religious", "community", "architecture"]
  },
  {
    id: "cottage",
    term: "Cottage",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A small, simple dwelling, typically in rural or suburban settings. Cottages emphasize coziness and often feature vernacular architectural traditions.",
    example: "English country cottages feature thatched roofs, stone walls, and picturesque gardens.",
    relatedTerms: ["dwelling", "vernacular", "residential"],
    tags: ["residential", "rural", "vernacular"]
  },
  {
    id: "farmhouse",
    term: "Farmhouse",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A house on agricultural land, typically designed for efficiency and connection to surrounding fields. Farmhouses often include barns and agricultural facilities.",
    example: "Traditional farmhouses feature layouts optimized for farm operations, with easy access to barns and fields.",
    relatedTerms: ["cottage", "dwelling", "rural"],
    tags: ["residential", "rural", "agricultural"]
  },
  {
    id: "fortress",
    term: "Fortress",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "A large fortified structure designed for military defense, featuring walls, bastions, and gateways. Fortresses vary from simple stockades to elaborate star forts.",
    example: "Vauban fortresses in France use geometric star plans for optimal defensive coverage.",
    relatedTerms: ["castle", "fortification", "military"],
    tags: ["military", "fortification", "historic"]
  },
  {
    id: "garden",
    term: "Garden",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A planned outdoor space for plants, recreation, and aesthetic appreciation. Gardens range from formal geometric gardens to naturalistic landscapes.",
    example: "Baroque gardens like Versailles feature formal geometry, water features, and structured plant arrangements.",
    relatedTerms: ["landscape", "outdoor-space", "ornamental"],
    tags: ["landscape", "recreational", "design"]
  },
  {
    id: "gazebo",
    term: "Gazebo",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "An open-sided roof structure in a garden or park, providing shelter while maintaining visual connection to surroundings. Gazebos are often decorative focal points.",
    example: "Ornamental metal gazebos in Victorian gardens provide shelter for gathering and viewing.",
    relatedTerms: ["pavilion", "shelter", "garden"],
    tags: ["garden", "shelter", "ornamental"]
  },
  {
    id: "inn",
    term: "Inn",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A small hotel or lodging establishment, historically providing shelter for travelers. Inns are often charming, smaller-scale buildings in town centers.",
    example: "Historic inns in European villages feature comfortable bedrooms and ground-floor taverns.",
    relatedTerms: ["hotel", "lodging", "commercial"],
    tags: ["commercial", "lodging", "historic"]
  },
  {
    id: "manor",
    term: "Manor",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "The residence of a lord or significant landowner, typically rural and including agricultural land. Manors combine residential and agricultural functions.",
    example: "English country manors like Penshurst Place feature grand residences surrounded by working estates.",
    relatedTerms: ["estate", "castle", "noble"],
    tags: ["residential", "rural", "historic"]
  },
  {
    id: "monastery",
    term: "Monastery",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "A community of monks living according to religious vows, typically including a church, dormitory, refectory, and cloister. Monasteries are significant architectural and cultural centers.",
    example: "Mont Saint-Michel is a dramatic island monastery featuring a Romanesque abbey church.",
    relatedTerms: ["convent", "religious", "cloister"],
    tags: ["religious", "community", "historic"]
  },
  {
    id: "observatory",
    term: "Observatory",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "A building designed for astronomical observation, featuring domes, telescopes, and minimal internal structures. Observatories are both scientific and architectural marvels.",
    example: "Historic observatories like Greenwich Observatory feature rotating domes and precision instruments.",
    relatedTerms: ["scientific", "dome", "specialized"],
    tags: ["scientific", "specialized", "historic"]
  },
  {
    id: "pavilion",
    term: "Pavilion",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A freestanding open or semi-open structure, often in parks, gardens, or expo grounds. Pavilions provide shelter while maintaining visual openness.",
    example: "Expo pavilions showcase architectural innovation with minimal walls and dramatic structural forms.",
    relatedTerms: ["gazebo", "shelter", "temporary"],
    tags: ["shelter", "exhibition", "structural"]
  },
  {
    id: "townhouse",
    term: "Townhouse",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A narrow, multi-story residential building in urban settings, typically sharing walls with adjacent buildings. Townhouses maximize land efficiency in cities.",
    example: "London townhouses are elegant 3-4 story buildings with modest street frontage and deep plans.",
    relatedTerms: ["rowhouse", "residential", "urban"],
    tags: ["residential", "urban", "typology"]
  },
  {
    id: "warehouse",
    term: "Warehouse",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A large, utilitarian building for storage of goods. Warehouses emphasize clear spans, high ceilings, and efficient circulation.",
    example: "Industrial warehouses feature exposed steel or concrete frames, minimal partitioning, and large loading doors.",
    relatedTerms: ["industrial", "commercial", "utilitarian"],
    tags: ["commercial", "industrial", "functional"]
  },
  // sustainability (19)
  {
    id: "biodiversity",
    term: "Biodiversity",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "The variety of living organisms and ecosystems. In sustainable architecture, biodiversity is promoted through habitat preservation, native plantings, and ecological design.",
    example: "Green roofs planted with native species support pollinators and birds while managing stormwater.",
    relatedTerms: ["ecology", "green-infrastructure", "native-plants"],
    tags: ["ecology", "environment", "sustainability"]
  },
  {
    id: "bipv",
    term: "BIPV (Building-Integrated Photovoltaics)",
    section: "sustainability",
    difficulty: "advanced",
    definition: "Solar photovoltaic systems integrated into building surfaces (facades, roofs, windows) that generate electricity while serving as building enclosure.",
    example: "BIPV facades replace traditional cladding with solar-generating surfaces.",
    relatedTerms: ["renewable-energy", "solar", "technology"],
    tags: ["renewable-energy", "technology", "climate"]
  },
  {
    id: "carbon-neutral",
    term: "Carbon Neutral",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "A state where the net carbon emissions produced by a building are zero, typically through energy efficiency, renewable energy, and carbon offsets.",
    example: "Passive House buildings achieve near carbon-neutral performance through exceptional insulation and air-sealing.",
    relatedTerms: ["carbon-footprint", "renewable-energy", "efficiency"],
    tags: ["climate", "emissions", "performance"]
  },
  {
    id: "circular-economy",
    term: "Circular Economy",
    section: "sustainability",
    difficulty: "advanced",
    definition: "An economic model where materials and products are designed for reuse, recycling, or biodegradability, minimizing waste. Circular design extends product lifecycles.",
    example: "Circular architecture considers end-of-life building components for disassembly, recovery, and reuse.",
    relatedTerms: ["lifecycle", "waste-reduction", "regenerative"],
    tags: ["economy", "waste", "lifecycle"]
  },
  {
    id: "climate-adaptation",
    term: "Climate Adaptation",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Strategies to make buildings resilient to climate change impacts like extreme heat, floods, and storms. Adaptation includes flood-resistant design and heat-tolerant materials.",
    example: "Buildings in flood-prone areas incorporate elevated first floors and amphibious construction.",
    relatedTerms: ["resilience", "climate-change", "disaster-resistant"],
    tags: ["climate", "resilience", "adaptation"]
  },
  {
    id: "climate-responsive",
    term: "Climate Responsive",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Architecture designed to respond to local climate conditions through orientation, shading, ventilation, and material choices. Climate-responsive design minimizes mechanical systems.",
    example: "Traditional vernacular architecture is inherently climate-responsive, using local materials and passive design.",
    relatedTerms: ["passive-design", "vernacular", "bioclimatic"],
    tags: ["design-strategy", "climate", "passive"]
  },
  {
    id: "daylighting",
    term: "Daylighting",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "The use of natural daylight to illuminate interior spaces, reducing artificial lighting energy. Daylighting improves occupant well-being and productivity.",
    example: "Skylights, clerestories, and light shelves distribute daylight deep into buildings.",
    relatedTerms: ["natural-light", "window", "glazing"],
    tags: ["light", "energy-efficiency", "well-being"]
  },
  {
    id: "embodied-carbon",
    term: "Embodied Carbon",
    section: "sustainability",
    difficulty: "advanced",
    definition: "The carbon emissions produced by extracting, processing, manufacturing, and transporting building materials. Embodied carbon is distinct from operational carbon.",
    example: "Concrete production accounts for significant embodied carbon; choosing alternative materials reduces impact.",
    relatedTerms: ["carbon-footprint", "lifecycle-assessment", "materials"],
    tags: ["emissions", "materials", "lifecycle"]
  },
  {
    id: "energy-efficiency",
    term: "Energy Efficiency",
    section: "sustainability",
    difficulty: "beginner",
    definition: "Designing buildings to minimize energy consumption for heating, cooling, lighting, and equipment. Energy-efficient buildings reduce operating costs and carbon emissions.",
    example: "Energy-efficient buildings use insulation, efficient HVAC systems, and LED lighting.",
    relatedTerms: ["passive-house", "carbon-neutral", "renewable-energy"],
    tags: ["efficiency", "climate", "operations"]
  },
  {
    id: "fscs",
    term: "FSC (Forest Stewardship Council)",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "A certification ensuring timber comes from responsibly managed forests. FSC certification verifies sustainable forestry practices.",
    example: "FSC-certified wood is preferred in sustainable building projects.",
    relatedTerms: ["sustainable-materials", "certification", "timber"],
    tags: ["materials", "certification", "forest"]
  },
  {
    id: "green-building",
    term: "Green Building",
    section: "sustainability",
    difficulty: "beginner",
    definition: "A holistic approach to sustainable construction minimizing environmental impact through efficient design, materials, and operations. Green buildings are certified through standards like LEED.",
    example: "LEED-certified green buildings achieve measurable environmental performance.",
    relatedTerms: ["sustainable-design", "leed", "certification"],
    tags: ["sustainability", "certification", "design"]
  },
  {
    id: "green-infrastructure",
    term: "Green Infrastructure",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Natural or nature-based systems for managing stormwater, air quality, and urban heat. Green infrastructure includes green roofs, bioswales, and rain gardens.",
    example: "Bioswales along streets capture runoff and filter pollutants while improving aesthetics.",
    relatedTerms: ["biodiversity", "water-management", "stormwater"],
    tags: ["infrastructure", "water", "urban"]
  },
  {
    id: "grey-water",
    term: "Grey Water",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Relatively clean wastewater from showers, sinks, and washing machines that can be treated and reused for irrigation or toilet flushing. Grey water recycling conserves potable water.",
    example: "Grey water systems in buildings reduce fresh water demand by 30-50%.",
    relatedTerms: ["water-conservation", "recycling", "plumbing"],
    tags: ["water", "recycling", "conservation"]
  },
  {
    id: "leed",
    term: "LEED (Leadership in Energy and Environmental Design)",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "A widely-used green building certification system rating buildings on energy, water, site, materials, and indoor environmental quality. LEED certification levels range from Certified to Platinum.",
    example: "LEED Platinum buildings demonstrate exceptional environmental performance.",
    relatedTerms: ["green-building", "certification", "sustainability"],
    tags: ["certification", "standard", "assessment"]
  },
  {
    id: "lifecycle-assessment",
    term: "Lifecycle Assessment (LCA)",
    section: "sustainability",
    difficulty: "advanced",
    definition: "A comprehensive analysis of a product or building's environmental impact from raw material extraction through end-of-life. LCA informs sustainable material and design choices.",
    example: "LCA studies compare environmental impacts of different structural materials over a building's 50-year life.",
    relatedTerms: ["embodied-carbon", "circular-economy", "assessment"],
    tags: ["analysis", "sustainability", "assessment"]
  },
  {
    id: "native-plants",
    term: "Native Plants",
    section: "sustainability",
    difficulty: "beginner",
    definition: "Plants species indigenous to a region, adapted to local climate and soil. Native plants require less water, maintenance, and chemicals than non-native species.",
    example: "Native plants in sustainable landscaping reduce irrigation needs and support local ecosystems.",
    relatedTerms: ["biodiversity", "green-infrastructure", "ecology"],
    tags: ["landscaping", "ecology", "conservation"]
  },
  {
    id: "passive-design",
    term: "Passive Design",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "Design strategies that minimize mechanical heating and cooling through orientation, insulation, thermal mass, and ventilation. Passive design reduces energy consumption.",
    example: "Passive houses in cold climates use extreme insulation and airtightness to minimize heating needs.",
    relatedTerms: ["climate-responsive", "energy-efficiency", "thermal-mass"],
    tags: ["design-strategy", "energy", "climate"]
  },
  {
    id: "renewable-energy",
    term: "Renewable Energy",
    section: "sustainability",
    difficulty: "beginner",
    definition: "Energy from sources that naturally replenish, including solar, wind, hydroelectric, and geothermal. Renewable energy reduces reliance on fossil fuels.",
    example: "Buildings with solar panels and wind turbines generate clean electricity.",
    relatedTerms: ["solar", "bipv", "carbon-neutral"],
    tags: ["energy", "technology", "climate"]
  },
  {
    id: "thermal-mass",
    term: "Thermal Mass",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The capacity of a material to store and release heat, moderating temperature fluctuations. Thermal mass materials (concrete, masonry, water) improve comfort and reduce mechanical cooling.",
    example: "Concrete slabs in passive houses store daytime heat and release it at night.",
    relatedTerms: ["passive-design", "thermal-comfort", "material"],
    tags: ["thermal", "performance", "passive-design"]
  },
  {
    id: "water-conservation",
    term: "Water Conservation",
    section: "sustainability",
    difficulty: "beginner",
    definition: "Strategies to reduce water consumption in buildings through fixtures, landscaping, and recycling. Water conservation is critical in water-scarce regions.",
    example: "Low-flow fixtures, rainwater harvesting, and grey water recycling reduce water consumption.",
    relatedTerms: ["grey-water", "rainwater-harvesting", "efficiency"],
    tags: ["water", "conservation", "efficiency"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
