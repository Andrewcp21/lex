const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
const existingIds = new Set(existing.map(e => e.id));

const newTerms = [
  {
    id: "art-deco",
    term: "Art Deco",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A design style that emerged in the 1920s–1930s, characterized by geometric forms, bold colors, and luxurious materials. Art Deco celebrates modernity and machine aesthetics while maintaining ornamental richness. It appears in buildings, furniture, and graphic design.",
    example: "The Chrysler Building in New York (1930) is an iconic Art Deco skyscraper with gleaming stainless steel crown, geometric sunburst patterns, and stylized automobile ornaments.",
    relatedTerms: ["modernism", "streamline-moderne", "geometric"],
    tags: ["style", "20th-century", "geometric"]
  },
  {
    id: "art-nouveau",
    term: "Art Nouveau",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A style flourishing around 1890–1910, characterized by organic flowing forms, nature-inspired ornamentation, and curved lines. Art Nouveau rejected industrial mass production in favor of craftsmanship and natural beauty.",
    example: "Hector Guimard's Paris Metro station entrances (1900) feature flowing iron railings and glass canopies with organic, plant-like forms.",
    relatedTerms: ["organic", "craft", "ornamentation"],
    tags: ["style", "fin-de-siecle", "organic"]
  },
  {
    id: "baroque",
    term: "Baroque",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An architectural and artistic style (c. 1600–1750) emphasizing dramatic movement, rich ornamentation, and emotional intensity. Baroque architecture features curved forms, grandeur, light effects, and theatrical compositions.",
    example: "The Church of San Carlo alle Quattro Fontane in Rome (1638) by Francesco Borromini showcases dynamic curves, dramatic light, and elaborate sculptural detail.",
    relatedTerms: ["rococo", "mannerism", "ornament"],
    tags: ["style", "17th-century", "theatrical"]
  },
  {
    id: "bauhaus",
    term: "Bauhaus",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An influential German design school and movement (1919–1933) that united crafts, fine art, and industrial design. Bauhaus emphasizes functional form, geometric design, and the integration of art and technology.",
    example: "The Bauhaus school building in Dessau (1925) by Walter Gropius exemplifies the movement's principles with its clean lines, functional volumes, and integration of form and function.",
    relatedTerms: ["functionalism", "modernism", "craft"],
    tags: ["style", "20th-century", "movement"]
  },
  {
    id: "brutalism",
    term: "Brutalism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A bold, sculptural style (1950s–1970s) featuring massive concrete forms, heavy massing, and expressive structural elements. Brutalism celebrates raw materials, monumental scale, and the honest expression of building systems.",
    example: "Paul Rudolph's Yale Art and Architecture Building (1963) features a dramatic composition of stepped concrete forms and exposed structural brutality.",
    relatedTerms: ["modernism", "concrete", "sculptural"],
    tags: ["style", "20th-century", "massive"]
  },
  {
    id: "byzantium",
    term: "Byzantine",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "The architectural style of the Byzantine Empire (330–1453), characterized by domed structures, rich mosaics, and elaborate ornamentation. Byzantine architecture synthesized Roman, Greek, and Middle Eastern influences.",
    example: "The Hagia Sophia in Istanbul (537 AD) features a massive central dome floating above a square base, creating a revolutionary spatial effect.",
    relatedTerms: ["romanesque", "dome", "mosaic"],
    tags: ["style", "medieval", "imperial"]
  },
  {
    id: "constructivism",
    term: "Constructivism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A Soviet avant-garde movement (1915–1930s) emphasizing industrial materials, geometric abstraction, and social purpose. Constructivism rejected ornament in favor of pure structural expression and utilitarian design.",
    example: "Vladimir Tatlin's Monument to the Third International (1920, unbuilt) was a proposed spiral steel structure expressing revolutionary ideals through industrial materials.",
    relatedTerms: ["futurism", "avant-garde", "abstract"],
    tags: ["style", "soviet", "experimental"]
  },
  {
    id: "deconstructivism",
    term: "Deconstructivism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A postmodern movement (1980s–1990s) that challenges traditional architectural order through fragmented, non-linear forms and apparent structural chaos. Deconstructivism questions the authority of classical composition.",
    example: "Frank Gehry's Guggenheim Museum Bilbao (1997) features radically curved titanium forms that seem to fragment and reassemble, challenging conventional architectural language.",
    relatedTerms: ["postmodernism", "fragmentation", "abstract"],
    tags: ["style", "contemporary", "experimental"]
  },
  {
    id: "eclecticism",
    term: "Eclecticism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An approach to design that freely combines elements from multiple styles, periods, and cultures without adhering to a single coherent style. Eclecticism is common in Victorian and Romantic architecture.",
    example: "Victorian estates like Peckover House in Cambridgeshire (19th century) combine Gothic, Renaissance, and contemporary elements in a single composition.",
    relatedTerms: ["victorian", "romantic", "pluralism"],
    tags: ["approach", "19th-century", "mixture"]
  },
  {
    id: "expressionism",
    term: "Expressionism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A movement emphasizing emotional and subjective expression through distortion, exaggeration, and dynamic forms. In architecture, expressionism creates dramatic, emotionally charged spaces.",
    example: "Erich Mendelsohn's Einstein Tower in Potsdam (1924) features flowing, organic forms that seem to express energy and movement.",
    relatedTerms: ["organic", "sculptural", "emotion"],
    tags: ["style", "early-20th-century", "emotional"]
  },
  {
    id: "functionalism",
    term: "Functionalism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A design philosophy stating that form should follow function — the building's appearance should be determined by its purpose and structural logic. Functionalism rejects ornament in favor of rational design.",
    example: "Louis Sullivan's Carson, Pirie, Scott building in Chicago (1899) expresses its function as a department store through a grid of display windows and efficient structural organization.",
    relatedTerms: ["modernism", "rational", "form-follows-function"],
    tags: ["philosophy", "20th-century", "rational"]
  },
  {
    id: "futurism",
    term: "Futurism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An early 20th-century avant-garde movement celebrating speed, technology, and dynamism. Futurist architecture features sleek forms, horizontal lines, and expresses the energy of the machine age.",
    example: "Antonio Sant'Elia's proposed futurist city sketches (1912–1914) show dynamic, spiraling forms and technological optimism.",
    relatedTerms: ["modernism", "avant-garde", "dynamic"],
    tags: ["style", "early-20th-century", "experimental"]
  },
  {
    id: "gothic",
    term: "Gothic",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A medieval architectural style (12th–16th centuries) characterized by pointed arches, ribbed vaults, flying buttresses, and soaring verticality. Gothic architecture emphasizes height, light, and structural innovation.",
    example: "Notre-Dame de Chartres (12th century) showcases Gothic principles with its pointed arches, ribbed vaults, flying buttresses, and towering spires.",
    relatedTerms: ["medieval", "pointed-arch", "ribbed-vault"],
    tags: ["style", "medieval", "vertical"]
  },
  {
    id: "high-tech",
    term: "High-Tech",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A late 20th-century style celebrating exposed technology, industrial materials, and engineering expression. High-Tech architecture celebrates mechanical systems, exposed structure, and the beauty of functional technology.",
    example: "Norman Foster's Hong Kong and Shanghai Banking Corporation building (1985) features exposed structural bracing, external elevators, and celebrated mechanical systems.",
    relatedTerms: ["modernism", "industrial", "exposed-structure"],
    tags: ["style", "late-20th-century", "technological"]
  },
  {
    id: "international-style",
    term: "International Style",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A modernist style (1920s–1970s) that emerged from the Bauhaus and De Stijl movements, emphasizing geometric form, industrial materials, and rational design principles that transcend national boundaries.",
    example: "Mies van der Rohe's Seagram Building in New York (1958) epitomizes the International Style with its pure glass and steel form, clean lines, and universal design principles.",
    relatedTerms: ["modernism", "bauhaus", "minimal"],
    tags: ["style", "20th-century", "universal"]
  },
  {
    id: "maximalism",
    term: "Maximalism",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A design philosophy embracing abundance, richness, and complexity. Maximalism celebrates pattern, color, and ornamentation, rejecting minimalist restraint in favor of visual abundance.",
    example: "Postmodern architecture like Robert Venturi's work celebrates ornament, historical references, and visual richness in reaction to minimalist modernism.",
    relatedTerms: ["postmodernism", "ornament", "complexity"],
    tags: ["philosophy", "contemporary", "abundant"]
  },
  {
    id: "minimalism",
    term: "Minimalism",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A design approach emphasizing essential forms, reduction to basics, and elimination of ornament. Minimalism celebrates empty space, simple geometry, and the beauty of restraint.",
    example: "Donald Judd's minimalist structures and John McCracken's studio use simple cubic forms, industrial materials, and precise proportions.",
    relatedTerms: ["modernism", "reduction", "essential"],
    tags: ["philosophy", "contemporary", "restrained"]
  },
  {
    id: "modernism",
    term: "Modernism",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A broad 20th-century movement embracing new technologies, industrial materials, and rational design. Modernism rejects historical ornament and seeks timeless universal design principles.",
    example: "Le Corbusier's Villa Savoye (1931) exemplifies modernism with its clean lines, industrial materials, pilotis structure, and rejection of historical reference.",
    relatedTerms: ["bauhaus", "international-style", "functionalism"],
    tags: ["style", "20th-century", "universal"]
  },
  {
    id: "neoclassicism",
    term: "Neoclassicism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An 18th–19th-century movement reviving classical Greek and Roman principles of proportion, symmetry, and order. Neoclassicism emphasized reason and classical ideals in reaction to baroque excess.",
    example: "The Panthéon in Paris (1789) by Jacques-Germain Soufflot features a neoclassical portico with classical orders, pediment, and dome.",
    relatedTerms: ["classical", "greek-revival", "proportion"],
    tags: ["style", "18th-19th-century", "classical"]
  },
  {
    id: "neogothic",
    term: "Neo-Gothic",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A 19th-century revival of Gothic architectural principles, featuring pointed arches, ribbed vaults, and vertical emphasis. Neo-Gothic reflected romantic idealization of medieval culture.",
    example: "Augustus Pugin's Palace of Westminster in London (1840s) features authentic Gothic pointed arches, ribbed vaults, and soaring spires.",
    relatedTerms: ["gothic", "revival", "romantic"],
    tags: ["style", "19th-century", "medieval-revival"]
  },
  {
    id: "parametric",
    term: "Parametric",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A contemporary design approach using algorithms and computational parameters to generate complex forms. Parametric design allows buildings to respond dynamically to environmental and functional constraints.",
    example: "Zaha Hadid's parametric designs use algorithmic relationships to create flowing, optimized forms that respond to site conditions and programmatic requirements.",
    relatedTerms: ["computational-design", "algorithm", "contemporary"],
    tags: ["approach", "contemporary", "computational"]
  },
  {
    id: "postmodernism",
    term: "Postmodernism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A late 20th-century reaction against modernism's austerity, celebrating historical reference, ornament, symbolism, and plurality. Postmodernism embraces irony, color, and cultural specificity.",
    example: "Robert Venturi's Complexity and Contradiction in Architecture (1966) challenged modernism, celebrating ornament, historical reference, and 'both/and' rather than 'either/or' design.",
    relatedTerms: ["maximalism", "historicism", "pluralism"],
    tags: ["style", "late-20th-century", "reaction"]
  },
  {
    id: "purism",
    term: "Purism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "An art and design movement (1918–1925) emphasizing geometric abstraction, primary colors, and universal form. Purism sought to distill design to its most essential, platonic elements.",
    example: "Le Corbusier's purist paintings and early architectural designs use simplified geometric forms and primary colors to express universal harmony.",
    relatedTerms: ["abstraction", "geometric", "essential"],
    tags: ["style", "early-20th-century", "abstract"]
  },
  {
    id: "rationalism",
    term: "Rationalism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A design philosophy emphasizing logical, systematic thinking and geometric order. Rationalism rejects emotional or arbitrary decisions in favor of rational principles and mathematical relationships.",
    example: "Giorgio Grassi's rationalist architecture uses pure geometric forms, symmetry, and systematic planning principles.",
    relatedTerms: ["functionalism", "systematic", "logic"],
    tags: ["philosophy", "20th-century", "systematic"]
  },
  {
    id: "regional-modernism",
    term: "Regional Modernism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An adaptation of modernist principles to respond to local climate, culture, and materials. Regional modernism balances universal modernist ideals with particular place-specific characteristics.",
    example: "Alvar Aalto's Finnish modernism uses local wood materials, responds to Nordic landscapes, and incorporates organic curves alongside modernist principles.",
    relatedTerms: ["modernism", "vernacular", "context"],
    tags: ["style", "20th-century", "contextual"]
  },
  {
    id: "renaissance",
    term: "Renaissance",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A period of cultural rebirth (14th–16th centuries) emphasizing human potential, classical learning, and mathematical proportion. Renaissance architecture revived classical orders, symmetry, and harmonic proportions.",
    example: "Filippo Brunelleschi's Florence Cathedral (begun 1296) features a groundbreaking hemispherical dome and classical proportional system.",
    relatedTerms: ["classical", "proportion", "humanism"],
    tags: ["style", "14th-16th-century", "rebirth"]
  },
  {
    id: "rococo",
    term: "Rococo",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An 18th-century style of elegant, ornate decoration featuring curved forms, delicate details, and light colors. Rococo represents the height of baroque ornamentation and decorative refinement.",
    example: "The Vierzehnheiligen Church in Bavaria (1743) features elaborate rococo ornament with curved white stucco, frescoes, and delicate gilding.",
    relatedTerms: ["baroque", "ornament", "decorative"],
    tags: ["style", "18th-century", "ornate"]
  },
  {
    id: "romanticism",
    term: "Romanticism",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "A 19th-century movement emphasizing emotion, nature, and the picturesque. Romantic architecture celebrates irregular forms, dramatic landscapes, and emotional expression.",
    example: "Horace Walpole's Strawberry Hill (1740s) combines Gothic revival elements with romantic idealization of medieval aesthetics.",
    relatedTerms: ["gothic-revival", "picturesque", "emotion"],
    tags: ["style", "19th-century", "emotional"]
  },
  {
    id: "streamline-moderne",
    term: "Streamline Moderne",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An evolution of Art Deco (1930s–1940s) emphasizing aerodynamic forms inspired by ships, trains, and airplanes. Streamline Moderne celebrates speed, sleekness, and forward momentum.",
    example: "The Greyhound Bus Terminal in Detroit (1937) features streamlined curves, horizontal lines, and polished aluminum expressing speed and modernity.",
    relatedTerms: ["art-deco", "aerodynamic", "speed"],
    tags: ["style", "1930s-1940s", "dynamic"]
  },
  {
    id: "structuralism",
    term: "Structuralism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "An architectural approach emphasizing the clear expression of structural systems as the primary design generator. Structuralism celebrates tectonic honesty and makes structure a visible, compositional element.",
    example: "Aldo van Eyck's Hubertus House (1978) expresses structural grids and systems as part of its compositional language.",
    relatedTerms: ["brutalism", "tectonic", "structure"],
    tags: ["philosophy", "20th-century", "structural"]
  },
  {
    id: "sustainable-design",
    term: "Sustainable Design",
    section: "sustainability",
    difficulty: "intermediate",
    definition: "A contemporary design approach prioritizing environmental responsibility, resource efficiency, and long-term livability. Sustainable design considers the building's entire lifecycle impact.",
    example: "The Bullitt Center in Seattle (2013) is a net-zero energy building using passive design, renewable energy, and sustainable materials.",
    relatedTerms: ["climate-responsive", "green-building", "ecology"],
    tags: ["philosophy", "contemporary", "environmental"]
  },
  {
    id: "tech-noir",
    term: "Tech Noir",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A contemporary style blending high-tech expression with dark, dramatic aesthetics. Tech Noir embraces exposed mechanical systems, industrial materials, and moody atmospheres.",
    example: "The Jewish Museum Berlin (2001) by Daniel Libeskind uses zinc-clad angular forms, voids, and dramatic lighting to create emotionally charged spaces.",
    relatedTerms: ["deconstructivism", "dark", "emotional"],
    tags: ["style", "contemporary", "dramatic"]
  },
  {
    id: "transitional",
    term: "Transitional",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A design approach that bridges two stylistic periods or traditions, blending elements from both while creating a distinct new character. Transitional design appears at historical inflection points.",
    example: "Early modernist works like Adolf Loos's Villa Müller (1930) blend traditional spatial organization with modernist simplicity.",
    relatedTerms: ["eclectic", "hybrid", "bridge"],
    tags: ["approach", "historical", "bridge"]
  },
  {
    id: "vernacular",
    term: "Vernacular",
    section: "architecture-across-cultures",
    difficulty: "beginner",
    definition: "Architecture built by local communities using regional materials, traditional techniques, and common sense responses to climate and culture. Vernacular architecture is typically anonymous, evolving gradually.",
    example: "Japanese timber farmhouses use deep eaves, adjustable shutters, and modular post-and-beam systems that respond to seasonal climate variations.",
    relatedTerms: ["regional", "climate-responsive", "traditional"],
    tags: ["tradition", "local", "practical"]
  },
  {
    id: "victorian",
    term: "Victorian",
    section: "design-styles-movements",
    difficulty: "beginner",
    definition: "A 19th-century (1837–1901) architectural style encompassing multiple revivals (Gothic, Greek, Romanesque) and eclectic combinations. Victorian architecture celebrates ornament, color, and complexity.",
    example: "Victorian terraced houses in London feature ornate brickwork, decorative tiles, bay windows, and elaborate ironwork.",
    relatedTerms: ["eclecticism", "gothic-revival", "ornament"],
    tags: ["style", "19th-century", "eclectic"]
  },
  {
    id: "organic-architecture",
    term: "Organic Architecture",
    section: "design-styles-movements",
    difficulty: "intermediate",
    definition: "An architectural philosophy emphasizing harmony between building and nature, developed by Frank Lloyd Wright. Organic architecture features flowing spaces, natural materials, and integration with landscape.",
    example: "Frank Lloyd Wright's Fallingwater (1935) exemplifies organic architecture with its cantilevered terraces that extend over the waterfall, creating unity with the natural landscape.",
    relatedTerms: ["wright", "natural", "integrated"],
    tags: ["philosophy", "20th-century", "nature"]
  },
  {
    id: "megastructure",
    term: "Megastructure",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A design approach featuring massive frameworks that can accommodate future growth and change. Megastructures were popular in the 1960s–1970s and represent utopian urban thinking.",
    example: "Kenzo Tange's Tokyo Olympic Stadium (1964) uses a dramatic megastructure framework with suspended roof systems spanning large volumes.",
    relatedTerms: ["utopian", "framework", "scalable"],
    tags: ["style", "1960s-1970s", "monumental"]
  },
  {
    id: "critical-regionalism",
    term: "Critical Regionalism",
    section: "design-styles-movements",
    difficulty: "advanced",
    definition: "A design approach that resists global homogenization by thoughtfully engaging with local place, culture, and materials. Critical Regionalism balances universal modernist principles with particular regional identity.",
    example: "Alejandro Aravena's Elemental projects in Chile combine modernist efficiency with response to local climate, materials, and cultural needs.",
    relatedTerms: ["regional-modernism", "context", "cultural"],
    tags: ["philosophy", "contemporary", "contextual"]
  }
];

const toAdd = newTerms.filter(t => !existingIds.has(t.id));
const allEntries = [...existing, ...toAdd];

fs.writeFileSync('data/entries.json', JSON.stringify(allEntries, null, 2) + '\n');

console.log(`Added ${toAdd.length} new terms`);
console.log(`Total entries: ${allEntries.length}`);
