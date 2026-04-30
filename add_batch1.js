const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  {
    id: "aperture",
    term: "Aperture",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "An opening or gap in a surface, particularly in a facade or wall. Apertures control light, ventilation, and views. They are fundamental compositional elements that affect how a building appears both from inside and outside.",
    example: "The precise, punched apertures of Marcel Breuer's Whitney Museum in New York (1966) create a stark, fortress-like character while controlling the quality of light inside.",
    relatedTerms: ["fenestration", "window", "opening"],
    tags: ["facade", "opening", "light"]
  },
  {
    id: "balance",
    term: "Balance",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The visual equilibrium of a composition, achieved through symmetry, asymmetry, or weight distribution. Balance can be formal (identical sides) or informal (different but equivalent visual weight), and is essential to creating harmonious, stable designs.",
    example: "Frank Lloyd Wright's Fallingwater (1935) achieves balance through asymmetrical arrangement — cantilevered decks of different sizes create visual equilibrium without mirror symmetry.",
    relatedTerms: ["symmetry", "composition", "proportion"],
    tags: ["composition", "equilibrium", "visual"]
  },
  {
    id: "bay",
    term: "Bay",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A subdivision of a building's interior or exterior, typically defined by a recurring structural or spatial module. Bays are created by columns, walls, or posts and give rhythm to a facade or interior. A 'bay window' is a window that projects outward from the wall.",
    example: "Romanesque cathedrals like Durham Cathedral (1093) are organized into a series of bays defined by massive columns and arches, creating rhythm and supporting the vault structure.",
    relatedTerms: ["module", "rhythm", "column", "bay-window"],
    tags: ["structure", "rhythm", "spatial-order"]
  },
  {
    id: "bay-window",
    term: "Bay Window",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "A window that projects outward from the plane of the wall, creating extra interior space and allowing more light and views. Bay windows are common in residential architecture and can be rectangular, angled, or curved.",
    example: "Victorian terraced houses in London feature characteristic angled bay windows that project from the facade, adding depth and light to interior rooms.",
    relatedTerms: ["bay", "window", "fenestration"],
    tags: ["window", "projection", "residential"]
  },
  {
    id: "circulation",
    term: "Circulation",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The network of pathways — corridors, stairs, ramps — that allows people to move through a building. Circulation is both functional (efficient movement) and experiential (sequence of spaces, views, and sensations). Good circulation is central to spatial design.",
    example: "The Vatican Museums are designed with a carefully orchestrated circulation path that takes visitors through galleries in a specific sequence, controlling the experience of the art.",
    relatedTerms: ["procession", "corridor", "sequence", "wayfinding"],
    tags: ["spatial-planning", "movement", "experience"]
  },
  {
    id: "circumference",
    term: "Circumference",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The perimeter or outer boundary of a form, especially a circular or curved one. In architecture, circumference refers to the outer edge of a building, plaza, or enclosed space, and is often a key design consideration.",
    example: "The Pantheon in Rome (118 AD) has a perfectly circular plan with a defined circumference, creating a pure geometric form.",
    relatedTerms: ["perimeter", "boundary", "circle"],
    tags: ["geometry", "form", "boundary"]
  },
  {
    id: "classical",
    term: "Classical",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "Relating to the architecture and design principles of ancient Greece and Rome, characterized by symmetry, proportion, order, and the use of columns and pediments. Classical architecture emphasizes harmony, balance, and mathematical relationships.",
    example: "The Parthenon in Athens (447 BCE) exemplifies classical principles with its mathematical proportions, columned facade, and symmetrical composition.",
    relatedTerms: ["neoclassical", "order", "column", "pediment"],
    tags: ["style", "ancient", "proportion"]
  },
  {
    id: "column",
    term: "Column",
    section: "structural-systems",
    difficulty: "beginner",
    definition: "A vertical structural element that supports loads from above. Columns can be round, square, or polygonal, and are typically composed of a base, shaft, and capital. They are one of the most fundamental structural elements in architecture.",
    example: "The Doric columns of the Parthenon (447 BCE) are plain, sturdy cylinders that support the weight of the marble structure above.",
    relatedTerms: ["capital", "base", "pillar", "post", "order"],
    tags: ["structure", "support", "classical"]
  },
  {
    id: "composition",
    term: "Composition",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The arrangement and organization of elements in space according to a coherent system or principle. Composition considers the relationships between forms, their proportions, spacing, and visual weight to create unity and order.",
    example: "Le Corbusier's Villa Stein (1927) uses a rigorous compositional system based on the Modulor — a mathematical proportion — to organize every element from plan to facade.",
    relatedTerms: ["hierarchy", "balance", "proportion", "rhythm"],
    tags: ["design-principle", "order", "spatial-organization"]
  },
  {
    id: "context",
    term: "Context",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The surrounding environment — physical, cultural, historical, social — that influences and constrains architectural design. Context includes the landscape, neighboring buildings, climate, local traditions, and community needs.",
    example: "Snøhetta's design for the Norwegian National Opera (2008) responds to its Oslo waterfront context, with sloping white marble planes that echo the natural topography.",
    relatedTerms: ["site", "vernacular", "place-making"],
    tags: ["design-principle", "environment", "cultural"]
  },
  {
    id: "core",
    term: "Core",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The central zone of a building containing services — stairs, elevators, mechanical systems, bathrooms — that serve the surrounding spaces. The core is a functional and structural anchor around which other spaces are organized.",
    example: "Norman Foster's 30 St Mary Axe (The Gherkin) in London (2004) has a central vertical core containing all services, allowing the surrounding office spaces to be column-free and flexible.",
    relatedTerms: ["circulation", "stairs", "elevator"],
    tags: ["structure", "services", "spatial-organization"]
  },
  {
    id: "corridor",
    term: "Corridor",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "A long passageway connecting rooms or spaces. Corridors are circulation elements that can be functional (narrow, minimal) or experiential (wide, lit, with views). Their design affects how people perceive and move through a building.",
    example: "The Guggenheim Museum's spiral corridor (1959) is not a mere passage but an integral part of the building's experience, ascending continuously as visitors view art.",
    relatedTerms: ["circulation", "passage", "procession"],
    tags: ["circulation", "spatial-type", "movement"]
  },
  {
    id: "cornice",
    term: "Cornice",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A horizontal ornamental molding that projects from a wall or roof edge. Cornices frame transitions between major architectural elements and often feature decorative details. They are both functional (directing water away from walls) and compositional.",
    example: "Renaissance palaces like the Palazzo Medici in Florence (1444) feature deep cornices that project dramatically from the facade, creating strong shadows and defining the roofline.",
    relatedTerms: ["molding", "eave", "overhang"],
    tags: ["ornament", "detail", "transition"]
  },
  {
    id: "curve",
    term: "Curve",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "A continuous bending line or surface without sharp angles. Curves in architecture can be structural (arches, vaults), spatial (curved walls), or compositional (curved facades). They contrast with straight lines and create dynamism and flow.",
    example: "Zaha Hadid's Heydar Aliyev Center in Baku (2012) is defined by continuous, flowing curves that dissolve the boundary between building and landscape.",
    relatedTerms: ["arch", "vault", "line"],
    tags: ["form", "geometry", "motion"]
  },
  {
    id: "datum-line",
    term: "Datum Line",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A reference line used in design and technical drawings to establish the base elevation or alignment from which other measurements are taken. Datum lines ensure consistency and clarity in architectural documentation.",
    example: "In construction drawings, a datum line is established at a specific height (often ground level or a finished floor) to reference all other vertical dimensions.",
    relatedTerms: ["datum", "level", "baseline"],
    tags: ["drawing", "technical", "measurement"]
  },
  {
    id: "doorway",
    term: "Doorway",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The opening through which people pass between spaces, typically framed by a door frame. Doorways are thresholds that mark transitions and are often expressed architecturally through moldings, arches, or other details.",
    example: "The monumental arched doorway of the Pantheon in Rome announces the transition from the exterior portico into the sacred interior chamber.",
    relatedTerms: ["door", "threshold", "opening"],
    tags: ["opening", "transition", "detail"]
  },
  {
    id: "double-height",
    term: "Double-Height",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A space that spans two floors vertically, creating a tall, dramatic interior void. Double-height spaces increase visual volume, allow more light penetration, and create emphasis within a building.",
    example: "The central atrium of the National Museum of Science and Industry in London features a dramatic double-height space filled with natural light.",
    relatedTerms: ["atrium", "spatial-volume", "section"],
    tags: ["spatial-composition", "proportion", "light"]
  },
  {
    id: "elevation",
    term: "Elevation",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A two-dimensional orthographic drawing of one side of a building, showing the facade or profile. Elevations are essential documents that show how a building appears from a given viewpoint and communicate vertical relationships.",
    example: "The elevation drawings of Barcelona's Sagrada Família show the intricate articulation of the facade with its soaring towers and detailed sculptural program.",
    relatedTerms: ["plan", "section", "drawing"],
    tags: ["drawing", "technical", "representation"]
  },
  {
    id: "enclosure",
    term: "Enclosure",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The act of bounding space with walls, screens, or other elements to create a defined interior environment. Enclosure is a primary way architecture shapes experience, providing shelter, privacy, and spatial identity.",
    example: "A Japanese tea house creates deep enclosure with small openings and thick walls, fostering intimate sensory experiences.",
    relatedTerms: ["wall", "boundary", "threshold"],
    tags: ["spatial-concept", "shelter", "definition"]
  },
  {
    id: "facade",
    term: "Facade",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The external face or front of a building, especially the primary elevation. The facade is both functional (weather protection, openings for light and air) and expressive (communicating design intent, style, and character through materials and composition).",
    example: "The glass and steel facade of Mies van der Rohe's Barcelona Pavilion (1929) is minimal and transparent, expressing the principle of open space and structural clarity.",
    relatedTerms: ["elevation", "fenestration", "material"],
    tags: ["exterior", "composition", "expression"]
  },
  {
    id: "focal-point",
    term: "Focal Point",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The point or element in a composition that draws and holds visual attention. Focal points are created through emphasis, contrast, size, prominence, or position. Strong focal points guide perception and create visual hierarchy.",
    example: "The Statue of Liberty in New York Harbor serves as the focal point of the harbor landscape and the entire composition of Bedloe's Island.",
    relatedTerms: ["hierarchy", "emphasis", "composition"],
    tags: ["visual-hierarchy", "emphasis", "composition"]
  },
  {
    id: "form",
    term: "Form",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The three-dimensional shape or geometry of a building or object. Form encompasses the overall massing, silhouette, and arrangement of parts. It is distinguished from function (what the building does) but is often inseparable from it.",
    example: "The pyramidal form of the Pyramid of Giza (2589 BCE) is both iconic and functional, with its triangular profile shedding water and resisting wind.",
    relatedTerms: ["geometry", "massing", "silhouette"],
    tags: ["design-element", "geometry", "composition"]
  },
  {
    id: "frieze",
    term: "Frieze",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A horizontal band of decoration or ornament on a wall, typically between the architrave and cornice in classical orders. Friezes can be sculptural, painted, or molded and serve as visual emphasis.",
    example: "The Elgin Marbles from the Parthenon (447 BCE) are fragments of the sculptural frieze that once adorned the temple, depicting mythological scenes.",
    relatedTerms: ["cornice", "molding", "ornament"],
    tags: ["ornament", "decoration", "classical"]
  },
  {
    id: "gallery",
    term: "Gallery",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A long, narrow passage or corridor, often with windows or openings along one side. In institutional contexts, a gallery is a room or series of rooms designed to display art or other objects. Galleries can be interior passages or covered walkways.",
    example: "The Gallery of Mirrors at the Palace of Versailles (1682) is a famously long, ornate gallery lined with arched mirrors and windows.",
    relatedTerms: ["corridor", "passage", "museum"],
    tags: ["spatial-type", "circulation", "display"]
  },
  {
    id: "gable",
    term: "Gable",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The triangular section of wall at the end of a pitched roof, between the two sloping roof planes. Gables are common in residential architecture and can be simple or ornately decorated. The gable end is a defining feature of many building types.",
    example: "Traditional Dutch townhouses feature distinctive stepped gables that rise above the sloped roof, creating a recognizable silhouette.",
    relatedTerms: ["roof", "pediment", "pitched-roof"],
    tags: ["roof-form", "residential", "silhouette"]
  },
  {
    id: "gallery-space",
    term: "Gallery Space",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "An interior space designed for the display and viewing of art, with considerations for lighting, wall surfaces, circulation, and wall color. Gallery spaces are typically open, uncluttered, and controlled environments.",
    example: "The Guggenheim Museum's interior is a continuous spiral gallery space that functions as both circulation and exhibition surface.",
    relatedTerms: ["gallery", "museum", "exhibition"],
    tags: ["institutional", "display", "spatial-type"]
  },
  {
    id: "girder",
    term: "Girder",
    section: "structural-systems",
    difficulty: "intermediate",
    definition: "A large beam, typically made of steel or reinforced concrete, that spans long distances and supports substantial loads. Girders are primary structural elements that carry the weight of floors, roofs, or other structures to main supports.",
    example: "The steel girders of the Golden Gate Bridge (1937) are massive curved members that support the deck and cables.",
    relatedTerms: ["beam", "joist", "structure"],
    tags: ["structure", "spanning", "support"]
  },
  {
    id: "glass-block",
    term: "Glass Block",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A solid glass unit, typically square or rectangular, used in walls to transmit light while providing opacity and texture. Glass blocks allow light to pass while obscuring the view, making them useful for privacy and architectural expression.",
    example: "Art Deco buildings of the 1930s often featured glass block walls that glowed from within at night, creating dramatic theatrical effects.",
    relatedTerms: ["glass", "transparency", "light"],
    tags: ["material", "light", "transparency"]
  },
  {
    id: "grate",
    term: "Grate",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "A framework of bars or grilles, typically made of metal, that covers an opening to allow passage of light or air while preventing access or debris entry. Grates are both functional and can be decorative.",
    example: "Cast iron floor grates in warehouses and industrial buildings are both functional (allowing light and air into basement levels) and distinctly industrial in character.",
    relatedTerms: ["grille", "screen", "bar"],
    tags: ["detail", "material", "functional"]
  },
  {
    id: "grid",
    term: "Grid",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A regular system of intersecting lines, either two-dimensional or three-dimensional, that organizes space, structure, or composition. Grids are fundamental design tools that create order, rhythm, and proportional relationships.",
    example: "The glass and steel grid facade of the Lever House in New York (1952) expresses the regular structural grid and creates a transparent, modular appearance.",
    relatedTerms: ["module", "proportion", "rhythm"],
    tags: ["organization", "order", "composition"]
  },
  {
    id: "grille",
    term: "Grille",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "A framework of bars, often decorative, that covers an opening or screens a surface. Grilles can be fixed or operable and serve both functional (security, light control) and aesthetic purposes.",
    example: "Ornate metal grilles in Islamic architecture provide privacy while allowing air circulation and creating intricate shadow patterns.",
    relatedTerms: ["screen", "lattice", "detail"],
    tags: ["detail", "security", "decoration"]
  },
  {
    id: "groin-vault",
    term: "Groin Vault",
    section: "structural-systems",
    difficulty: "advanced",
    definition: "A vault created by the intersection of two barrel vaults at right angles. The intersection forms an X-pattern (the 'groin') and the space is enclosed on all four sides. Groin vaults are common in Romanesque and Gothic architecture.",
    example: "The crypt of Durham Cathedral (1093) is covered with groin vaults that create a unified, rhythmic interior space with defined bays.",
    relatedTerms: ["vault", "barrel-vault", "rib-vault"],
    tags: ["structure", "vault", "medieval"]
  },
  {
    id: "ground-floor",
    term: "Ground Floor",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The floor level of a building that is at or closest to street or ground level. The ground floor typically houses public or commercial uses (shops, lobbies, restaurants) and is distinguished from upper floors.",
    example: "Modern urban buildings typically activate their ground floor with retail, cafes, or galleries to create street-level vitality.",
    relatedTerms: ["floor", "level", "plinth"],
    tags: ["spatial-organization", "level", "public-space"]
  },
  {
    id: "hall",
    term: "Hall",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "A large, open room or space, often used for public gathering, circulation, or display. Halls can be simple or ornately decorated and range from modest entrance halls to grand civic halls.",
    example: "Grand Central Terminal's Main Concourse in New York (1913) is a monumental hall with soaring arched ceiling, skylights, and ornate detailing.",
    relatedTerms: ["atrium", "lobby", "gallery"],
    tags: ["spatial-type", "public", "gathering"]
  },
  {
    id: "harmony",
    term: "Harmony",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The balanced and coherent relationship between the various parts of a composition, creating unity and wholeness. Harmony is achieved through consistent use of proportions, materials, colors, and formal languages.",
    example: "The harmonic proportions of the Parthenon (447 BCE), based on mathematical ratios, create a sense of perfect balance and beauty.",
    relatedTerms: ["proportion", "unity", "balance"],
    tags: ["design-principle", "composition", "aesthetic"]
  },
  {
    id: "hearth",
    term: "Hearth",
    section: "building-history-typologies",
    difficulty: "beginner",
    definition: "The floor or base of a fireplace, typically made of heat-resistant material like brick or stone. Historically, the hearth was the functional and symbolic center of the home, around which families gathered.",
    example: "Medieval castles often featured a large central hearth in the great hall, serving both as heating and gathering point for the community.",
    relatedTerms: ["fireplace", "chimney", "interior"],
    tags: ["domestic", "historic", "functional"]
  },
  {
    id: "heel",
    term: "Heel",
    section: "structural-systems",
    difficulty: "advanced",
    definition: "The end of a beam or rafter where it rests on the wall or bearing point, or the base of a diagonal bracing member. In arches and vaults, the heel refers to the base point where forces are concentrated.",
    example: "In timber roof construction, the heel of the rafter extends beyond the wall to form an overhang, protecting the wall from weather.",
    relatedTerms: ["bearing", "rafter", "support"],
    tags: ["structure", "connection", "detail"]
  },
  {
    id: "hermitage",
    term: "Hermitage",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "A small, secluded dwelling or retreat, historically occupied by a hermit or religious recluse. Hermitages are typically simple, minimal structures located in remote or sacred locations.",
    example: "Early Christian hermitages in Egypt were simple stone cells built into cliff faces, serving as places of spiritual retreat.",
    relatedTerms: ["monastery", "cell", "retreat"],
    tags: ["religious", "dwelling", "historic"]
  },
  {
    id: "herringbone",
    term: "Herringbone",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A pattern of rectangular blocks (typically wood or stone) laid alternately at angles to create a V-shaped weaving pattern. Herringbone patterns are both functional (providing structural strength) and visually distinctive.",
    example: "Herringbone brick paving is commonly seen in plazas and courtyards, creating a dynamic visual pattern while providing structural stability.",
    relatedTerms: ["paving", "parquet", "pattern"],
    tags: ["pattern", "material", "finish"]
  },
  {
    id: "hip-roof",
    term: "Hip Roof",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "A roof where two or more sloping planes meet at angled edges (hips) rather than having a ridge. Hip roofs slope inward from all sides, making them more weather-resistant than gable roofs.",
    example: "Traditional Japanese buildings often feature hip roofs with deep overhangs that provide weather protection and define the building's silhouette.",
    relatedTerms: ["gable", "roof", "pitched-roof"],
    tags: ["roof-form", "residential", "weather-protection"]
  },
  {
    id: "hyperbola",
    term: "Hyperbola",
    section: "geometry-mathematics",
    difficulty: "advanced",
    definition: "A mathematical curve formed by the intersection of a cone and a plane at a specific angle. Hyperbolic forms appear in architecture as cooling towers, hyperboloid structures, and certain vaults.",
    example: "Hyperboloid cooling towers at power plants create dramatic curved forms that are structurally efficient and visually striking.",
    relatedTerms: ["curve", "geometry", "hyperboloid"],
    tags: ["mathematics", "geometry", "form"]
  },
  {
    id: "hyperboloid",
    term: "Hyperboloid",
    section: "geometry-mathematics",
    difficulty: "advanced",
    definition: "A three-dimensional surface generated by rotating a hyperbola around one of its axes. Hyperboloid structures are doubly curved and provide structural efficiency with minimal material.",
    example: "Vladimir Shukhov's hyperboloid radio towers (early 1900s) use the hyperboloid geometry to create efficient, elegant structures that became symbols of Russian constructivism.",
    relatedTerms: ["hyperbola", "surface", "structure"],
    tags: ["mathematics", "geometry", "structure"]
  },
  {
    id: "inflection-point",
    term: "Inflection Point",
    section: "architectural-terms-theory",
    difficulty: "advanced",
    definition: "A point on a curve where the direction of curvature changes from concave to convex or vice versa. In architecture, inflection points are significant moments where visual or structural transitions occur.",
    example: "Parametric architecture often uses inflection points to create smooth transitions between curved surfaces, as seen in Zaha Hadid's projects.",
    relatedTerms: ["curve", "transition", "form"],
    tags: ["mathematics", "form", "geometry"]
  },
  {
    id: "infill",
    term: "Infill",
    section: "architectural-terms-theory",
    difficulty: "intermediate",
    definition: "The act of filling in vacant space within an existing built environment, typically by constructing new buildings in gaps between existing structures. Infill development increases urban density while maintaining neighborhood character.",
    example: "Modern cities like Copenhagen encourage infill development in underutilized lots to increase housing density while maintaining walkable neighborhoods.",
    relatedTerms: ["density", "urban-design", "mixed-use"],
    tags: ["urban-planning", "development", "sustainability"]
  },
  {
    id: "ingleside",
    term: "Ingleside",
    section: "building-history-typologies",
    difficulty: "intermediate",
    definition: "The space beside a fireplace, often sheltered and intimate. Inglesides are cozy alcoves where people gather for warmth and conversation, common in traditional residences.",
    example: "Medieval great halls and Victorian parlors featured deep inglesides with bench seating flanking the fireplace.",
    relatedTerms: ["fireplace", "hearth", "nook"],
    tags: ["domestic", "interior", "historic"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
