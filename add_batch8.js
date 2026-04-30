const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // geometry-mathematics (15)
  {
    id: "angle",
    term: "Angle",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "The figure formed by two lines meeting at a point. Angles (measured in degrees) are fundamental to geometry and form composition.",
    example: "Right angles (90°) are common in architecture, while acute and obtuse angles create visual interest.",
    relatedTerms: ["line", "geometry", "proportion"],
    tags: ["geometry", "measurement", "form"]
  },
  {
    id: "arc",
    term: "Arc",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A curved line that is part of a circle. Arcs are fundamental to arches, domes, and curved forms.",
    example: "Roman arches use circular arcs to span openings.",
    relatedTerms: ["curve", "circle", "arch"],
    tags: ["geometry", "curve", "form"]
  },
  {
    id: "circle",
    term: "Circle",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A round two-dimensional shape with all points equidistant from a center. Circles are fundamental to planning and circular buildings.",
    example: "The Pantheon's circular plan creates a perfect geometric form.",
    relatedTerms: ["sphere", "geometry", "form"],
    tags: ["geometry", "shape", "planning"]
  },
  {
    id: "cone",
    term: "Cone",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A three-dimensional shape with a circular base tapering to a point. Cone geometry appears in structures, roofs, and sculpture.",
    example: "Conical roof forms in yurts and traditional tents efficiently shed water and wind.",
    relatedTerms: ["pyramid", "geometry", "form"],
    tags: ["geometry", "3d-form", "structure"]
  },
  {
    id: "cylinder",
    term: "Cylinder",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A three-dimensional shape with two parallel circular bases connected by a curved surface. Cylinders appear as columns, towers, and cylindrical rooms.",
    example: "Cylindrical towers are common in medieval architecture.",
    relatedTerms: ["column", "geometry", "form"],
    tags: ["geometry", "3d-form", "structure"]
  },
  {
    id: "diagonal",
    term: "Diagonal",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A line connecting non-adjacent corners of a polygon. Diagonals create visual dynamism and are structural in bracing systems.",
    example: "Diagonal bracing strengthens structures while creating dynamic visual patterns.",
    relatedTerms: ["line", "bracing", "pattern"],
    tags: ["geometry", "line", "structure"]
  },
  {
    id: "ellipse",
    term: "Ellipse",
    section: "geometry-mathematics",
    difficulty: "intermediate",
    definition: "A curved shape resembling a flattened circle, defined by two focal points. Ellipses create elongated, dynamic forms.",
    example: "Elliptical amphitheaters like the Colosseum create optimal sightlines and acoustics.",
    relatedTerms: ["circle", "curve", "form"],
    tags: ["geometry", "shape", "planning"]
  },
  {
    id: "fibonacci-sequence",
    term: "Fibonacci Sequence",
    section: "geometry-mathematics",
    difficulty: "advanced",
    definition: "A mathematical sequence where each number is the sum of the previous two (1, 1, 2, 3, 5, 8, 13...). The ratio approaches the golden ratio.",
    example: "Fibonacci spirals appear in nautilus shells and some natural architectural forms.",
    relatedTerms: ["golden-ratio", "proportion", "mathematics"],
    tags: ["mathematics", "proportion", "nature"]
  },
  {
    id: "fractal",
    term: "Fractal",
    section: "geometry-mathematics",
    difficulty: "advanced",
    definition: "A geometric shape with repeating patterns at different scales. Fractals appear in nature and increasingly in parametric architectural design.",
    example: "Fractal branching patterns inspire tree-like structural forms.",
    relatedTerms: ["pattern", "parametric", "nature"],
    tags: ["geometry", "pattern", "computational"]
  },
  {
    id: "geometry",
    term: "Geometry",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "The mathematical study of shapes, sizes, and spatial relationships. Geometry is fundamental to architecture for creating form and ensuring proportion.",
    example: "Platonic solids (tetrahedron, cube, octahedron, dodecahedron, icosahedron) inspire geometric architectural forms.",
    relatedTerms: ["mathematics", "proportion", "form"],
    tags: ["mathematics", "discipline", "foundation"]
  },
  {
    id: "golden-ratio",
    term: "Golden Ratio",
    section: "geometry-mathematics",
    difficulty: "intermediate",
    definition: "A mathematical proportion (approximately 1:1.618) considered aesthetically pleasing, appearing in nature and classical architecture. Golden ratio proportions create harmonious compositions.",
    example: "The Parthenon's proportions are often cited as golden ratio proportions.",
    relatedTerms: ["proportion", "fibonacci-sequence", "harmony"],
    tags: ["proportion", "mathematics", "aesthetics"]
  },
  {
    id: "grid",
    term: "Grid",
    section: "geometry-mathematics",
    difficulty: "intermediate",
    definition: "A regular system of intersecting lines forming squares or rectangles. Grids organize space, structure, and composition.",
    example: "Modular grids allow buildings to be organized systematically.",
    relatedTerms: ["module", "pattern", "organization"],
    tags: ["geometry", "organization", "structure"]
  },
  {
    id: "line",
    term: "Line",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A one-dimensional geometric element extending infinitely in two directions. Lines define boundaries, create direction, and structure composition.",
    example: "The horizon line creates visual balance and perspective in architectural drawings.",
    relatedTerms: ["point", "angle", "direction"],
    tags: ["geometry", "element", "composition"]
  },
  {
    id: "module",
    term: "Module",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A standardized unit repeated to create larger forms. Modular design enables prefabrication and proportional harmony.",
    example: "Le Corbusier's Modulor is a proportional system based on human dimensions.",
    relatedTerms: ["grid", "proportion", "system"],
    tags: ["design-system", "proportion", "order"]
  },
  {
    id: "polygon",
    term: "Polygon",
    section: "geometry-mathematics",
    difficulty: "beginner",
    definition: "A closed shape with straight sides. Common polygons include triangles, squares, pentagons, and hexagons.",
    example: "Regular polygons like hexagons appear in Islamic geometric patterns.",
    relatedTerms: ["geometry", "shape", "pattern"],
    tags: ["geometry", "shape", "mathematics"]
  },
  // building-performance-physics (13)
  {
    id: "acoustics",
    term: "Acoustics",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The science of sound, including how sound travels, reflects, and is absorbed. Acoustic design controls noise, reverberation, and sound quality.",
    example: "Concert halls use acoustic design to optimize sound distribution.",
    relatedTerms: ["reverberation", "sound-insulation", "performance"],
    tags: ["performance", "sound", "physics"]
  },
  {
    id: "air-infiltration",
    term: "Air Infiltration",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "Unintended airflow through gaps and cracks in building envelopes. Controlling air infiltration improves energy efficiency and thermal comfort.",
    example: "Blower door tests measure air infiltration rates.",
    relatedTerms: ["air-tightness", "energy-efficiency", "envelope"],
    tags: ["performance", "energy", "comfort"]
  },
  {
    id: "air-quality",
    term: "Air Quality",
    section: "building-performance-physics",
    difficulty: "beginner",
    definition: "The presence of contaminants (CO2, VOCs, pollutants) affecting health and comfort. Good air quality requires ventilation and low-emission materials.",
    example: "Green buildings specify low-VOC paints and finishes.",
    relatedTerms: ["ventilation", "health", "indoor-environment"],
    tags: ["health", "environment", "comfort"]
  },
  {
    id: "daylighting",
    term: "Daylighting",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The use of natural daylight to illuminate interiors, reducing artificial lighting. Daylighting improves health, productivity, and energy efficiency.",
    example: "Atria and skylights distribute daylight deep into buildings.",
    relatedTerms: ["natural-light", "window", "health"],
    tags: ["light", "energy", "health"]
  },
  {
    id: "glare",
    term: "Glare",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "Excessive brightness causing discomfort or disability. Controlling glare requires shading, orientation, and surface properties.",
    example: "Window shading systems control glare while allowing daylight.",
    relatedTerms: ["shading-device", "light-control", "comfort"],
    tags: ["light", "comfort", "control"]
  },
  {
    id: "humidity",
    term: "Humidity",
    section: "building-performance-physics",
    difficulty: "beginner",
    definition: "The amount of water vapor in air, affecting comfort and material durability. Optimal indoor humidity is 30-60%.",
    example: "HVAC systems regulate humidity to maintain comfort and prevent mold.",
    relatedTerms: ["moisture-control", "comfort", "hvac"],
    tags: ["comfort", "control", "environment"]
  },
  {
    id: "insulation",
    term: "Insulation",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "Material that resists heat transfer, reducing energy for heating and cooling. Insulation is essential for energy efficiency.",
    example: "Fiberglass, cellulose, foam, and mineral wool are common insulation materials.",
    relatedTerms: ["thermal-resistance", "energy-efficiency", "envelope"],
    tags: ["material", "energy", "thermal"]
  },
  {
    id: "light-shelf",
    term: "Light Shelf",
    section: "building-performance-physics",
    difficulty: "advanced",
    definition: "A horizontal reflective surface that bounces daylight deep into a building interior. Light shelves extend daylighting into spaces far from windows.",
    example: "Light shelves in offices distribute daylight beyond 10 meters from the window.",
    relatedTerms: ["daylighting", "reflection", "strategy"],
    tags: ["strategy", "light", "daylighting"]
  },
  {
    id: "thermal-bridge",
    term: "Thermal Bridge",
    section: "building-performance-physics",
    difficulty: "advanced",
    definition: "A conductive material (often metal) bypassing insulation, creating heat transfer paths. Thermal bridges reduce energy performance.",
    example: "Metal studs and anchors create thermal bridges that reduce insulation effectiveness.",
    relatedTerms: ["insulation", "thermal-resistance", "energy"],
    tags: ["physics", "energy", "detail"]
  },
  {
    id: "thermal-comfort",
    term: "Thermal Comfort",
    section: "building-performance-physics",
    difficulty: "intermediate",
    definition: "The subjective sensation of being neither too hot nor too cold. Thermal comfort depends on temperature, humidity, air movement, and clothing.",
    example: "Passive buildings maintain thermal comfort through design without mechanical conditioning.",
    relatedTerms: ["hvac", "passive-design", "human-factors"],
    tags: ["comfort", "human-factors", "performance"]
  },
  {
    id: "ventilation",
    term: "Ventilation",
    section: "building-performance-physics",
    difficulty: "beginner",
    definition: "The movement of air through buildings, removing contaminants and controlling moisture. Ventilation can be natural (passive) or mechanical.",
    example: "Operable windows enable natural ventilation in mild weather.",
    relatedTerms: ["air-quality", "passive-design", "hvac"],
    tags: ["system", "health", "comfort"]
  },
  {
    id: "visible-light-transmission",
    term: "Visible Light Transmission",
    section: "building-performance-physics",
    difficulty: "advanced",
    definition: "The percentage of visible light passing through a material (measured 0-100%). VLT affects daylighting and view quality.",
    example: "Clear glass has ~90% VLT, while tinted glass may be 50%.",
    relatedTerms: ["glazing", "light-transmittance", "performance"],
    tags: ["performance", "material", "light"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
