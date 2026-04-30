const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  // building-materials-construction (20)
  {
    id: "aggregate",
    term: "Aggregate",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "Granular material (sand, gravel, crushed stone) mixed with cement and water to make concrete. Aggregate comprises about 75% of concrete by volume and affects strength, durability, and appearance.",
    example: "Exposed aggregate finishes reveal the stone materials in concrete, creating textural visual interest.",
    relatedTerms: ["concrete", "cement", "finish"],
    tags: ["material", "concrete", "component"]
  },
  {
    id: "asphalt",
    term: "Asphalt",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A black paving material composed of bitumen (a petroleum byproduct) mixed with aggregate. Asphalt is widely used for roads, parking lots, and outdoor surfaces.",
    example: "Asphalt parking lots and driveways are common in contemporary architecture for their cost-effectiveness and quick installation.",
    relatedTerms: ["paving", "bitumen", "surface"],
    tags: ["material", "paving", "finish"]
  },
  {
    id: "brick",
    term: "Brick",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A small rectangular block of clay or concrete fired in a kiln or cured, used as a primary building unit. Bricks are durable, fire-resistant, and can be arranged in varied patterns.",
    example: "Load-bearing brick walls are common in traditional architecture and remain popular for their durability and aesthetic character.",
    relatedTerms: ["masonry", "clay", "bond-pattern"],
    tags: ["material", "masonry", "durable"]
  },
  {
    id: "bronze",
    term: "Bronze",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "An alloy of copper and tin, valued for its durability, corrosion resistance, and rich color. Bronze is used for architectural hardware, sculptures, and ornamental elements.",
    example: "Bronze door frames and hardware develop a beautiful patina over time while maintaining structural integrity.",
    relatedTerms: ["metal", "copper", "ornament"],
    tags: ["material", "metal", "durable"]
  },
  {
    id: "cement",
    term: "Cement",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A binding powder made from limestone and clay that hardens when mixed with water. Cement is the key component in concrete and mortar.",
    example: "Portland cement is the most common type used in modern construction.",
    relatedTerms: ["concrete", "mortar", "binding"],
    tags: ["material", "binding", "concrete"]
  },
  {
    id: "ceramic-tile",
    term: "Ceramic Tile",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "Tile made from clay or porcelain fired at high temperatures, used for wall or floor surfaces. Ceramic tiles are durable, water-resistant, and available in infinite colors and patterns.",
    example: "Portuguese azulejo tiles in traditional buildings feature intricate hand-painted patterns.",
    relatedTerms: ["tile", "porcelain", "glazed"],
    tags: ["material", "surface", "finish"]
  },
  {
    id: "composite",
    term: "Composite",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A material made from two or more constituent materials with different physical properties that remain separate. Composites combine strength with weight savings.",
    example: "Fiber-reinforced polymer composites are increasingly used in aerospace and architectural applications for lightweight strength.",
    relatedTerms: ["material", "reinforcement", "hybrid"],
    tags: ["material", "advanced", "strength"]
  },
  {
    id: "copper",
    term: "Copper",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A reddish metal valued for its malleability, conductivity, and corrosion resistance. Copper develops a distinctive green patina and is used for roofing, gutters, and hardware.",
    example: "Copper roofs and gutters develop a protective green patina that can last centuries.",
    relatedTerms: ["metal", "oxidation", "roof"],
    tags: ["material", "metal", "durable"]
  },
  {
    id: "drywall",
    term: "Drywall",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "Interior wall panel made of gypsum plaster sandwiched between paper layers. Drywall is quick to install, cost-effective, and allows for flexible interior layouts.",
    example: "Standard gypsum drywall is the dominant interior wall material in contemporary construction.",
    relatedTerms: ["plasterboard", "wall", "interior"],
    tags: ["material", "interior", "finish"]
  },
  {
    id: "facade-material",
    term: "Facade Material",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "Any material used on a building's exterior surface, serving both protective and aesthetic functions. Facade materials include brick, stone, metal, glass, and composite panels.",
    example: "Aluminum composite panels are lightweight facade materials allowing for complex geometries.",
    relatedTerms: ["exterior", "cladding", "surface"],
    tags: ["material", "exterior", "finish"]
  },
  {
    id: "glass",
    term: "Glass",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A transparent or translucent material made from silica sand, soda ash, and lime. Glass is essential for windows, transparency, and light control in buildings.",
    example: "Large glass facades allow natural light into buildings while providing views and visual connection to the exterior.",
    relatedTerms: ["window", "transparency", "glazing"],
    tags: ["material", "transparent", "light"]
  },
  {
    id: "glulam",
    term: "Glulam (Glued Laminated Timber)",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "Engineered wood product made of multiple layers of dimension lumber bonded together with adhesive. Glulam allows larger spans and curves compared to solid timber.",
    example: "Glulam beams create dramatic curved forms in contemporary timber buildings.",
    relatedTerms: ["timber", "engineered-wood", "lamination"],
    tags: ["material", "wood", "engineered"]
  },
  {
    id: "granite",
    term: "Granite",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "An igneous rock composed of quartz, feldspar, and mica, prized for its durability and attractive appearance. Granite is used for countertops, flooring, and cladding.",
    example: "Granite cladding on commercial buildings provides a prestigious, durable, high-maintenance exterior.",
    relatedTerms: ["stone", "natural-material", "durable"],
    tags: ["material", "stone", "durable"]
  },
  {
    id: "mortar",
    term: "Mortar",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A binding paste made of cement, sand, and water used to join masonry units. Mortar joints contribute to overall wall strength, appearance, and weather resistance.",
    example: "Historic lime mortar is softer than modern cement mortar and allows older masonry to breathe and move.",
    relatedTerms: ["cement", "masonry", "joint"],
    tags: ["material", "binding", "masonry"]
  },
  {
    id: "plaster",
    term: "Plaster",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A paste made of gypsum, lime, sand, and water applied to walls for finishing. Plaster provides a smooth surface for painting and can be molded for ornamental details.",
    example: "Ornamental plasterwork in historic buildings creates detailed cornices and ceiling medallions.",
    relatedTerms: ["finish", "interior", "ornament"],
    tags: ["material", "finish", "interior"]
  },
  {
    id: "reinforcement",
    term: "Reinforcement",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "Steel rebar, mesh, or cables embedded in concrete to provide tensile strength. Reinforcement allows concrete to resist bending, cracking, and tension.",
    example: "Exposed reinforcement in brutalist concrete buildings becomes a visual and structural expression.",
    relatedTerms: ["rebar", "concrete", "strength"],
    tags: ["material", "concrete", "structure"]
  },
  {
    id: "slate",
    term: "Slate",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "A fine-grained metamorphic rock that splits easily into thin sheets. Slate is used for roofing, flooring, and cladding and weathers beautifully.",
    example: "Traditional slate roofing on historic buildings can last over 100 years with minimal maintenance.",
    relatedTerms: ["stone", "roof", "natural-material"],
    tags: ["material", "stone", "roof"]
  },
  {
    id: "stainless-steel",
    term: "Stainless Steel",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "Steel alloyed with chromium and nickel to resist corrosion. Stainless steel is used for hardware, railings, and ornamental elements.",
    example: "The Chrysler Building's stainless steel crown remains polished and corrosion-free after nearly a century.",
    relatedTerms: ["steel", "metal", "corrosion-resistant"],
    tags: ["material", "metal", "durable"]
  },
  {
    id: "stone",
    term: "Stone",
    section: "building-materials-construction",
    difficulty: "beginner",
    definition: "Natural rock material quarried and shaped for use in buildings. Stone is durable, prestigious, and available in varied colors and textures.",
    example: "Ashlar stone masonry in classical buildings demonstrates the timeless durability of natural stone.",
    relatedTerms: ["masonry", "granite", "marble"],
    tags: ["material", "natural", "durable"]
  },
  {
    id: "terrazzo",
    term: "Terrazzo",
    section: "building-materials-construction",
    difficulty: "intermediate",
    definition: "A composite material made of marble or stone chips set in cement or resin, polished to a smooth finish. Terrazzo is durable and allows for colorful, custom patterns.",
    example: "Terrazzo flooring in mid-century modern buildings creates distinctive colored patterns and durability.",
    relatedTerms: ["composite", "flooring", "finish"],
    tags: ["material", "flooring", "finish"]
  },
  // representation-communication (20)
  {
    id: "axonometric",
    term: "Axonometric",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A three-dimensional orthographic projection that shows three faces of an object without perspective distortion. Axonometric drawings (isometric, dimetric) are useful for showing spatial relationships clearly.",
    example: "Axonometric drawings of buildings show plan relationships, heights, and spatial connections without the distortion of perspective.",
    relatedTerms: ["isometric", "orthographic", "projection"],
    tags: ["drawing", "technical", "projection"]
  },
  {
    id: "blueprint",
    term: "Blueprint",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A reproduction of architectural or engineering drawings using a photographic process that creates white lines on blue background. Blueprints were standard before digital documentation.",
    example: "Historic blueprints are valued documents showing original design intent.",
    relatedTerms: ["drawing", "documentation", "print"],
    tags: ["documentation", "historical", "drawing"]
  },
  {
    id: "collage",
    term: "Collage",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "An artistic technique combining diverse materials and images to create a new composition. In architecture, collage is used for mood boards, presentations, and conceptual exploration.",
    example: "Architects create collages of images, materials, and sketches to communicate design concepts.",
    relatedTerms: ["montage", "presentation", "concept"],
    tags: ["presentation", "visual", "concept"]
  },
  {
    id: "cross-section",
    term: "Cross-Section",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A vertical slice through a building showing the relationship between spaces, levels, and structural elements. Cross-sections reveal height relationships and spatial stacking.",
    example: "A cross-section through a theater reveals the sloped seating, stage height, and roof structure.",
    relatedTerms: ["section", "drawing", "orthographic"],
    tags: ["drawing", "technical", "spatial"]
  },
  {
    id: "diagram",
    term: "Diagram",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A simplified visual representation emphasizing essential relationships and concepts. Diagrams communicate functional, structural, or conceptual ideas clearly and quickly.",
    example: "Circulation diagrams show how people move through a building using lines and arrows.",
    relatedTerms: ["sketch", "concept", "visualization"],
    tags: ["communication", "visual", "concept"]
  },
  {
    id: "dimetric",
    term: "Dimetric",
    section: "representation-communication",
    difficulty: "advanced",
    definition: "An axonometric projection where two of three axes have equal scale. Dimetric projection is less distorted than isometric for some viewing angles.",
    example: "Dimetric drawings show buildings from three faces with two axes at the same scale.",
    relatedTerms: ["isometric", "axonometric", "projection"],
    tags: ["drawing", "technical", "projection"]
  },
  {
    id: "drawing",
    term: "Drawing",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A fundamental mode of architectural representation using lines, marks, and notation to communicate design ideas, spaces, and details. Drawing is both a design tool and final documentation.",
    example: "Architects use precise construction drawings and conceptual sketches as essential design and communication tools.",
    relatedTerms: ["sketch", "plan", "elevation"],
    tags: ["representation", "communication", "design-tool"]
  },
  {
    id: "exploded-view",
    term: "Exploded View",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A technical drawing or visualization that shows separated components in an assembled product, revealing how parts relate and assemble. Exploded views clarify constructive logic.",
    example: "Exploded diagrams of wall assemblies show layering from interior to exterior: drywall, insulation, sheathing, membrane, cladding.",
    relatedTerms: ["assembly", "diagram", "technical"],
    tags: ["drawing", "technical", "assembly"]
  },
  {
    id: "figure-ground",
    term: "Figure-Ground",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A diagram showing the relationship between solid buildings (figure) and open space (ground), particularly at urban scale. Figure-ground diagrams reveal spatial patterns and urban tissue.",
    example: "Figure-ground diagrams of historic cities like Rome show the relationship between built form and public space.",
    relatedTerms: ["diagram", "urban-design", "space"],
    tags: ["diagram", "urban-analysis", "space"]
  },
  {
    id: "floor-plan",
    term: "Floor Plan",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A horizontal sectional view of a building at a specific height, showing room layouts, spatial relationships, and functional organization. Floor plans are essential to architectural communication.",
    example: "A residential floor plan shows bedrooms, bathrooms, kitchen, and living areas and their relationships.",
    relatedTerms: ["plan", "section", "orthographic"],
    tags: ["drawing", "documentation", "spatial"]
  },
  {
    id: "hatching",
    term: "Hatching",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A pattern of parallel lines used in technical drawings to indicate different materials, cross-sections, or areas. Hatching provides visual distinction without color.",
    example: "In construction drawings, different hatch patterns represent brick, concrete, stone, and other materials.",
    relatedTerms: ["pattern", "drawing", "notation"],
    tags: ["drawing", "notation", "technique"]
  },
  {
    id: "isometric",
    term: "Isometric",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "An axonometric projection where all three axes are equally scaled, creating a balanced three-dimensional view without perspective distortion. Isometric is clear for showing complex spaces.",
    example: "Isometric drawings of buildings clearly show spatial relationships and overlapping elements.",
    relatedTerms: ["axonometric", "projection", "3d"],
    tags: ["drawing", "technical", "projection"]
  },
  {
    id: "orthographic",
    term: "Orthographic",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A projection system where parallel lines from the object to the drawing plane are perpendicular (orthogonal). Orthographic projections (plans, elevations, sections) preserve dimensions and angles.",
    example: "Construction documents use orthographic projections to show precise dimensions without distortion.",
    relatedTerms: ["projection", "plan", "section"],
    tags: ["drawing", "technical", "projection"]
  },
  {
    id: "perspective",
    term: "Perspective",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A drawing technique that simulates how the eye sees objects receding into distance, with converging lines and reduced size. Perspective creates realistic, immersive imagery.",
    example: "One-point perspective drawings of hallways show depth and vanishing points effectively.",
    relatedTerms: ["rendering", "view", "visual"],
    tags: ["drawing", "visual", "realism"]
  },
  {
    id: "photomontage",
    term: "Photomontage",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A composite image combining photographs, renderings, and other visual elements to show buildings in context. Photomontage helps visualize projects in their actual surroundings.",
    example: "Architects create photomontages showing proposed buildings against existing site photographs.",
    relatedTerms: ["collage", "rendering", "visualization"],
    tags: ["visualization", "presentation", "composite"]
  },
  {
    id: "plan",
    term: "Plan",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A horizontal orthographic view of a building, typically at a specific height, showing spatial layout and relationships. Plans are fundamental architectural documents.",
    example: "Floor plans are essential tools for understanding how spaces connect and function.",
    relatedTerms: ["floor-plan", "drawing", "orthographic"],
    tags: ["drawing", "documentation", "spatial"]
  },
  {
    id: "projection",
    term: "Projection",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A method of representing three-dimensional objects on two-dimensional surfaces. Common projections include orthographic, perspective, and axonometric.",
    example: "Architectural drawings use orthographic projection to preserve dimensions while perspective renderings use perspective projection for realism.",
    relatedTerms: ["orthographic", "perspective", "axonometric"],
    tags: ["drawing", "technique", "representation"]
  },
  {
    id: "rendering",
    term: "Rendering",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A realistic or artistic visual representation of a design, showing materials, lighting, context, and atmosphere. Renderings help clients understand design intent.",
    example: "High-quality renderings with accurate lighting, materials, and context are essential for client presentations.",
    relatedTerms: ["photorealistic", "visualization", "image"],
    tags: ["visualization", "presentation", "realism"]
  },
  {
    id: "scale",
    term: "Scale",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "The ratio between the size of a drawing and the actual size of the building. Scales like 1:100 or 1/4\" = 1' enable precise documentation and measurement.",
    example: "Architectural drawings are typically drawn at scales like 1:100 for plans or 1:20 for details.",
    relatedTerms: ["dimension", "measurement", "drawing"],
    tags: ["drawing", "technical", "proportion"]
  },
  {
    id: "section",
    term: "Section",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A vertical slice through a building or site showing spatial relationships, heights, and material layering. Sections reveal what elevations conceal.",
    example: "A building section shows the relationship between ground level, floors, and roof height.",
    relatedTerms: ["cross-section", "elevation", "drawing"],
    tags: ["drawing", "documentation", "spatial"]
  },
  {
    id: "sketch",
    term: "Sketch",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "A quick, informal drawing exploring ideas, relationships, and concepts. Sketches are essential design tools, preceding formal documentation.",
    example: "Early conceptual sketches allow architects to rapidly explore design ideas before committing to detailed drawings.",
    relatedTerms: ["drawing", "concept", "design-tool"],
    tags: ["drawing", "design-process", "informal"]
  },
  {
    id: "storyboard",
    term: "Storyboard",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "A sequence of images or sketches showing a narrative or journey through space. Storyboards communicate how people experience buildings.",
    example: "Architects create storyboards showing sequential views and experiences moving through buildings.",
    relatedTerms: ["sequence", "narrative", "visualization"],
    tags: ["presentation", "visual", "experience"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
