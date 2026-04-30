const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  {
    id: "algorithm",
    term: "Algorithm",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A step-by-step procedure or set of rules for solving a problem or generating designs. In architecture, algorithms drive parametric design, optimization, and computational form-finding.",
    example: "Evolutionary algorithms can optimize building forms for solar exposure, daylight, and structural efficiency, as used in advanced parametric design tools.",
    relatedTerms: ["computational-design", "parametric", "code"],
    tags: ["digital", "computational", "process"]
  },
  {
    id: "ar",
    term: "AR (Augmented Reality)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Technology that overlays digital information onto the physical world. In architecture, AR allows visualization of designs in real-world contexts, enabling clients to see buildings before construction.",
    example: "AR apps let clients view proposed building designs in their actual site context using smartphone cameras.",
    relatedTerms: ["virtual-reality", "visualization", "digital"],
    tags: ["technology", "visualization", "immersive"]
  },
  {
    id: "autocad",
    term: "AutoCAD",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "A leading computer-aided design (CAD) software developed by Autodesk, widely used for 2D drafting and 3D modeling. AutoCAD is the industry standard for architectural documentation.",
    example: "Architects use AutoCAD to create precise construction drawings, floor plans, and technical details for building documentation.",
    relatedTerms: ["cad", "drafting", "software"],
    tags: ["software", "digital", "standard"]
  },
  {
    id: "bim",
    term: "BIM (Building Information Modeling)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "A digital representation of a building containing information about geometry, materials, systems, and performance. BIM enables collaboration, coordination, and data-rich design throughout project lifecycle.",
    example: "Revit-based BIM models allow architects, engineers, and contractors to coordinate systems, detect clashes, and manage project information centrally.",
    relatedTerms: ["revit", "digital-model", "coordination"],
    tags: ["methodology", "digital", "collaborative"]
  },
  {
    id: "blender",
    term: "Blender",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Open-source 3D computer graphics software used for modeling, animation, rendering, and simulation. Blender is increasingly used in architecture for visualization and complex form generation.",
    example: "Architects use Blender for photorealistic rendering, animation, and exploring complex geometries.",
    relatedTerms: ["3d-modeling", "rendering", "visualization"],
    tags: ["software", "open-source", "rendering"]
  },
  {
    id: "cad",
    term: "CAD (Computer-Aided Design)",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Digital tools that enable architects to create precise drawings and models. CAD has replaced hand drafting in professional practice and enables rapid iteration and documentation.",
    example: "CAD software like AutoCAD and Revit are essential tools for producing architectural drawings, sections, and details.",
    relatedTerms: ["autocad", "revit", "digital"],
    tags: ["methodology", "digital", "tools"]
  },
  {
    id: "cloud-computing",
    term: "Cloud Computing",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "The delivery of computing services (storage, processing, software) over the internet. Cloud computing enables architects to access tools and collaborate globally without local installation.",
    example: "Cloud-based design platforms like Figma and web-based project management tools allow distributed teams to collaborate in real-time.",
    relatedTerms: ["collaboration", "software", "technology"],
    tags: ["technology", "digital", "collaborative"]
  },
  {
    id: "cnc",
    term: "CNC (Computer Numerical Control)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Automated machinery controlled by computer programs to cut, shape, or fabricate materials with precision. CNC enables architects to fabricate complex, customized architectural components.",
    example: "CNC milling machines cut custom facades, paneling, and structural elements designed in CAD/BIM systems.",
    relatedTerms: ["fabrication", "digital-fabrication", "automation"],
    tags: ["technology", "fabrication", "precision"]
  },
  {
    id: "computational-design",
    term: "Computational Design",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "Design approach using algorithms, programming, and computational methods to generate, evaluate, and optimize architectural forms. Computational design explores vast design spaces rapidly.",
    example: "Zaha Hadid Architects uses computational design to generate complex flowing forms that respond to environmental and functional parameters.",
    relatedTerms: ["algorithm", "parametric", "form-finding"],
    tags: ["methodology", "digital", "advanced"]
  },
  {
    id: "dynamo",
    term: "Dynamo",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A visual programming language for Revit that enables parametric design and automation of repetitive tasks. Dynamo bridges BIM and computational design.",
    example: "Architects use Dynamo scripts to automate facade panel generation, optimize window placement, or coordinate MEP systems within BIM models.",
    relatedTerms: ["revit", "parametric", "bim"],
    tags: ["software", "programming", "automation"]
  },
  {
    id: "firefly",
    term: "Firefly",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A visual programming plugin that bridges Grasshopper and external input devices/live data. Firefly enables real-time interaction between digital models and physical sensors.",
    example: "Architects use Firefly to create designs that respond to environmental data like sun position, wind speed, or pedestrian movement.",
    relatedTerms: ["grasshopper", "parametric", "real-time"],
    tags: ["software", "plugin", "interactive"]
  },
  {
    id: "gis",
    term: "GIS (Geographic Information Systems)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Software for capturing, analyzing, and visualizing geographic data. GIS helps architects understand site context, demographics, climate, and infrastructure.",
    example: "Urban designers use GIS to analyze neighborhood demographics, transportation networks, and environmental conditions to inform masterplans.",
    relatedTerms: ["mapping", "site-analysis", "data"],
    tags: ["technology", "analysis", "site-planning"]
  },
  {
    id: "grasshopper",
    term: "Grasshopper",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A visual programming plugin for Rhinoceros that enables parametric design. Grasshopper uses node-and-wire interface for algorithm-based form generation without writing code.",
    example: "Architects use Grasshopper to generate complex facade patterns, structural grids, or massing variations parametrically.",
    relatedTerms: ["rhinoceros", "parametric", "visual-programming"],
    tags: ["software", "plugin", "parametric"]
  },
  {
    id: "illustrator",
    term: "Adobe Illustrator",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Vector graphics software used for creating architectural drawings, presentations, diagrams, and illustrations. Illustrator excels at precise line work and typography.",
    example: "Architects use Illustrator to create presentation drawings, competition boards, and architectural diagrams.",
    relatedTerms: ["photoshop", "graphics", "presentation"],
    tags: ["software", "digital", "graphics"]
  },
  {
    id: "indesign",
    term: "Adobe InDesign",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Page layout and design software for creating publications, presentations, and documents. InDesign is standard for architectural monographs, presentations, and portfolios.",
    example: "Architects use InDesign to layout architecture books, design competition proposals, and create professional presentations.",
    relatedTerms: ["illustrator", "photoshop", "publishing"],
    tags: ["software", "publishing", "design"]
  },
  {
    id: "laser-cutting",
    term: "Laser Cutting",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Digital fabrication technology using focused laser beams to cut or engrave materials. Laser cutting enables precise, customizable architectural models and components.",
    example: "Architects use laser-cut wood or acrylic to fabricate detailed architectural models with intricate details.",
    relatedTerms: ["cnc", "digital-fabrication", "fabrication"],
    tags: ["technology", "fabrication", "digital"]
  },
  {
    id: "mapping",
    term: "Mapping",
    section: "architectural-terms-theory",
    difficulty: "beginner",
    definition: "The process of representing space, relationships, or data visually. In architecture, mapping includes site analysis, process documentation, and information visualization.",
    example: "Urban designers create cognitive maps showing pedestrian flows, activity patterns, and spatial relationships in a neighborhood.",
    relatedTerms: ["analysis", "visualization", "diagram"],
    tags: ["methodology", "analysis", "representation"]
  },
  {
    id: "metaverse",
    term: "Metaverse",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Immersive digital spaces where people interact through avatars. The metaverse presents new opportunities for architectural visualization, virtual meetings, and design collaboration.",
    example: "Architects are exploring metaverse platforms for client presentations and virtual walkthroughs of buildings before construction.",
    relatedTerms: ["virtual-reality", "ar", "digital"],
    tags: ["technology", "immersive", "emerging"]
  },
  {
    id: "modeling",
    term: "Modeling",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "The process of creating physical or digital representations of architectural designs. Models serve as communication tools, design aids, and exploration devices.",
    example: "Architects build cardboard models to test spatial relationships, lighting effects, and design ideas before presenting to clients.",
    relatedTerms: ["representation", "prototype", "visualization"],
    tags: ["process", "representation", "communication"]
  },
  {
    id: "photoshop",
    term: "Adobe Photoshop",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Image editing and compositing software widely used in architectural visualization. Photoshop enables photo-realistic rendering enhancements and presentation graphics.",
    example: "Architects use Photoshop to composite rendered images with site photographs, create context, and enhance presentation graphics.",
    relatedTerms: ["illustrator", "visualization", "rendering"],
    tags: ["software", "digital", "visualization"]
  },
  {
    id: "plugin",
    term: "Plugin",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Additional software modules that extend the functionality of a host program. In architecture, plugins like Grasshopper or Enscape add parametric, rendering, or simulation capabilities.",
    example: "Grasshopper is a plugin for Rhinoceros that adds parametric design capabilities without modifying the core software.",
    relatedTerms: ["software", "grasshopper", "extension"],
    tags: ["technology", "software", "extension"]
  },
  {
    id: "processing",
    term: "Processing",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "An open-source programming language and environment for creative coding. Processing is used by designers for generative design, data visualization, and interactive installations.",
    example: "Architects use Processing to create generative design sketches that explore parametric form variations.",
    relatedTerms: ["code", "programming", "generative"],
    tags: ["software", "programming", "creative"]
  },
  {
    id: "python",
    term: "Python",
    section: "tools-software-technology",
    difficulty: "advanced",
    definition: "A versatile programming language increasingly used in architecture for scripting, data analysis, and automation. Python is accessible to non-programmers and widely integrated into design tools.",
    example: "Architects use Python scripts to automate workflows in Revit, generate building components, or analyze spatial data.",
    relatedTerms: ["code", "programming", "scripting"],
    tags: ["language", "programming", "scripting"]
  },
  {
    id: "rendering",
    term: "Rendering",
    section: "representation-communication",
    difficulty: "intermediate",
    definition: "The computational process of generating photorealistic images from 3D digital models, simulating light, materials, and reflections. Rendering is essential for architectural visualization.",
    example: "Architects use rendering engines like V-Ray or Corona to create photorealistic images of designs for client presentations.",
    relatedTerms: ["visualization", "3d-modeling", "photorealistic"],
    tags: ["process", "visualization", "digital"]
  },
  {
    id: "revit",
    term: "Revit",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Autodesk's BIM software that integrates architectural design, documentation, and project management. Revit is the industry standard for parametric BIM-based design.",
    example: "Architects use Revit to create comprehensive BIM models that coordinate all building systems and generate construction documentation.",
    relatedTerms: ["bim", "autocad", "software"],
    tags: ["software", "bim", "standard"]
  },
  {
    id: "rhinoceros",
    term: "Rhinoceros (Rhino)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "NURBS-based 3D modeling software known for flexibility in generating complex, free-form surfaces. Rhino is popular for conceptual design and custom geometry exploration.",
    example: "Architects use Rhino and Grasshopper for generating complex parametric forms in contemporary architecture.",
    relatedTerms: ["grasshopper", "3d-modeling", "nurbs"],
    tags: ["software", "modeling", "freeform"]
  },
  {
    id: "sketch-up",
    term: "SketchUp",
    section: "tools-software-technology",
    difficulty: "beginner",
    definition: "Intuitive 3D modeling software designed for rapid conceptual design and spatial visualization. SketchUp's accessibility makes it popular for ideation and client communication.",
    example: "Architects use SketchUp to quickly explore design ideas, visualize spatial relationships, and communicate with clients.",
    relatedTerms: ["3d-modeling", "conceptual-design", "visualization"],
    tags: ["software", "modeling", "accessible"]
  },
  {
    id: "vr",
    term: "VR (Virtual Reality)",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "Immersive digital environment that creates a sense of presence in a virtual space. In architecture, VR enables full-body immersion in buildings before construction for evaluation and experience.",
    example: "Architects use VR to create walkthroughs of buildings, allowing clients to experience spatial scale, daylight, and materiality before construction.",
    relatedTerms: ["ar", "immersive", "visualization"],
    tags: ["technology", "immersive", "experience"]
  },
  {
    id: "vray",
    term: "V-Ray",
    section: "tools-software-technology",
    difficulty: "intermediate",
    definition: "A powerful rendering engine used across multiple platforms (3ds Max, SketchUp, Rhino) for photorealistic visualization. V-Ray is standard for high-quality architectural renderings.",
    example: "Architects use V-Ray to create photo-realistic renderings with accurate materials, lighting, and reflections.",
    relatedTerms: ["rendering", "visualization", "photorealistic"],
    tags: ["software", "rendering", "visualization"]
  },
  {
    id: "web-design",
    term: "Web Design",
    section: "representation-communication",
    difficulty: "beginner",
    definition: "The design and development of websites and digital platforms. Web design is increasingly important for architectural practice, portfolio presentation, and client communication.",
    example: "Architecture firms design responsive websites showcasing projects, team expertise, and contact information to clients worldwide.",
    relatedTerms: ["digital", "communication", "presentation"],
    tags: ["communication", "digital", "platform"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
