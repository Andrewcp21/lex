const fs = require('fs');

const entries = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));

// Extended Indonesian translation mapping for remaining terms
const additionalTranslations = {
  // General architectural terms
  "procession": "prosesi",
  "timber": "kayu",
  "clt": "kayu berlapis silang",
  "cladding": "pelapis",
  "vault": "vault",
  "bending-moment": "momen lentur",
  "space-frame": "rangka ruang",

  // Movements/Styles
  "bauhaus": "bauhaus",
  "classicism": "klasikisme",
  "eclecticism": "eklektisisme",
  "maximalism": "maksimalisme",
  "neoclassicism": "neoklasikisme",
  "neogothic": "neogotik",
  "rococo": "rokoko",
  "romanticism": "romantisisme",
  "structuralism": "strukturalisme",
  "victorian": "victorian",
  "megastructure": "megastruktur",
  "sustainable-design": "desain berkelanjutan",
  "tech-noir": "tech-noir",
  "transitional": "transisional",
  "purism": "purisme",
  "parametric": "parametrik",
  "regional-modernism": "modernisme regional",
  "byzantium": "byzantium",

  // Technology/Tools
  "laser-cutting": "pemotongan laser",
  "3d-printing": "pencetakan 3d",
  "vr-architecture": "arsitektur virtual reality",
  "cnc": "pengefraisan cnc",
  "ar": "ar (augmented reality)",
  "blender": "blender",
  "firefly": "firefly",
  "gis": "gis (sistem informasi geografis)",
  "illustrator": "adobe illustrator",
  "indesign": "adobe indesign",
  "mapping": "pemetaan",
  "metaverse": "metaverse",
  "modeling": "pemodelan",
  "photoshop": "adobe photoshop",
  "plugin": "plugin",
  "processing": "processing",
  "python": "python",
  "rhinoceros": "rhinoceros",
  "sketch-up": "sketchup",
  "vray": "v-ray",
  "web-design": "desain web",

  // Standards/Certifications
  "passive-house": "passive house",
  "breeam": "breeam",
  "photovoltaic": "panel fotovoltaik",
  "natural-ventilation": "ventilasi alami",
  "fire-rating": "peringkat kebakaran",
  "planning-permission": "izin perencanaan",
  "part-l": "part l",
  "ada": "americans with disabilities act",
  "epc": "sertifikat kinerja energi",
  "riba-plan": "riba plan of work",
  "greenship": "greenship",
  "amdal": "analisis mengenai dampak lingkungan",

  // Professions/Roles
  "structural-engineer": "insinyur struktur",
  "quantity-surveyor": "surveyor kuantitas",

  // Awards/Competitions
  "pritzker-prize": "penghargaan pritzker",

  // Building/Construction Terms
  "party-wall": "dinding bersama",
  "listed-building": "bangunan yang terdaftar",
  "masterplan": "rencana induk",
  "design-and-build": "desain dan bangun",
  "fee": "biaya arsitek",
  "novation": "novasi",
  "planning-application": "aplikasi perencanaan",

  // Urban Design Terms
  "urban-grain": "tekstur urban",
  "active-frontage": "fasad aktif",
  "genius-loci": "genius loci",
  "street-network": "jaringan jalan",

  // Key Figures
  "mies-van-der-rohe": "ludwig mies van der rohe",
  "renzo-piano": "renzo piano",
  "tadao-ando": "tadao ando",
  "palladio": "andrea palladio",
  "jane-jacobs": "jane jacobs",
  "ridwan-kamil": "ridwan kamil",
  "han-awal": "han awal",
  "andra-matin": "andra matin",
  "yori-antar": "yori antar",
  "friedrich-silaban": "friedrich silaban",
  "achmad-noeman": "achmad noe'man",
  "yu-sing": "yu sing",
  "eko-prawoto": "eko prawoto",
  "budi-pradono": "budi pradono",
  "soejoedi": "soejoedi wirjoatmodjo",

  // Math/Geometry
  "golden-section": "penampang emas",
  "tessellation": "tessellasi",
  "pythagoras": "teorema pythagoras",
  "pi": "pi (π)",
  "trigonometry": "trigonometri",
  "circumference": "keliling",
  "hyperbola": "hiperbola",
  "hyperboloid": "hiperboloid",
  "inflection-point": "titik infleksi",

  // Building Types
  "skyscraper": "pencakar langit",
  "pavilion": "pavilion",
  "housing": "perumahan",
  "apartment": "apartemen",
  "brothel": "rumah bordil",
  "brownstone": "brownstone",
  "cottage": "cottage",
  "farmhouse": "rumah pertanian",
  "garden": "taman",
  "gazebo": "gazebo",
  "inn": "penginapan",
  "manor": "manor",
  "observatory": "observatorium",
  "townhouse": "townhouse",
  "vernacular-architecture": "arsitektur vernakular",
  "hermitage": "pertapaan",

  // Traditional Indonesian Architecture
  "rumah-joglo": "rumah joglo",
  "rumah-gadang": "rumah gadang",
  "rumah-panggung": "rumah panggung",
  "rumah-adat": "rumah adat",
  "feng-shui": "feng shui",
  "stupa": "stupa",
  "adobe": "adobe",
  "shoji": "shoji",
  "rammed-earth": "bumi yang dipadatkan",
  "marae": "marae",
  "hammam": "hammam",
  "natah": "natah",
  "meru": "meru",
  "bale": "bale",
  "sanggah": "sanggah",
  "betang": "betang",
  "honai": "honai",
  "rumah-bolon": "rumah bolon",
  "baileo": "baileo",
  "dalem": "dalem",
  "pringgitan": "pringgitan",
  "pura": "pura",

  // Indonesian Building Materials/Construction
  "imb": "izin mendirikan bangunan",
  "kdb": "koefisien dasar bangunan",
  "klb": "koefisien lantai bangunan",
  "gsb": "garis sempadan bangunan",
  "rth": "ruang terbuka hijau",
  "sistem-struktur-kayu": "sistem struktur kayu",
  "pasangan-bata": "pasangan bata",
  "plesteran": "plesteran",
  "acian": "acian",
  "ventilasi-silang": "ventilasi silang",
  "orientasi-bangunan": "orientasi bangunan",
  "atap-pelana": "atap pelana",
  "sloof": "sloof",
  "ring-balok": "ring balok",
  "kolom-praktis": "kolom praktis",
  "cor-beton": "cor beton",
  "pondasi-batu-kali": "pondasi batu kali",
  "pendopo": "pendopo",
  "ruko": "ruko",
  "kampung": "kampung",
  "alun-alun": "alun-alun",
  "tritisan": "tritisan",
  "bukaan": "bukaan",
  "atap-limas": "atap limas",
  "pbg": "persetujuan bangunan gedung",
  "slf": "sertifikat laik fungsi",
  "rdtr": "rencana detail tata ruang",
  "iai": "ikatan arsitek indonesia",
  "kayu-jati": "kayu jati",
  "kayu-ulin": "kayu ulin",
  "bata-merah": "bata merah",
  "hebel": "hebel",
  "ijuk": "ijuk",
  "sirap": "sirap",
  "anyaman-bambu": "anyaman bambu",
  "keramik": "keramik",
  "bekisting": "bekisting",
  "besi-tulangan": "besi tulangan",
  "nat": "nat",
  "arsitektur-indies": "arsitektur indies",
  "arsitektur-tropis": "arsitektur tropis",
  "bangunan-cagar-budaya": "bangunan cagar budaya",
  "rab": "rencana anggaran biaya",
  "shop-drawing": "shop drawing",
  "as-built-drawing": "as-built drawing",

  // Material/Product Terms
  "bronze": "perunggu",
  "ceramic-tile": "ubin keramik",
  "composite": "komposit",
  "copper": "tembaga",
  "drywall": "drywall",
  "facade-material": "material fasad",
  "glulam": "kayu berlapis lengket",
  "granite": "granit",
  "reinforcement": "penguatan",
  "slate": "batu tulis",
  "stainless-steel": "baja tahan karat",
  "terrazzo": "terrazzo",

  // Drawing/Representation Terms
  "blueprint": "blueprint",
  "collage": "kolase",
  "cross-section": "penampang melintang",
  "dimetric": "dimetrik",
  "exploded-view": "tampilan terbuka",
  "hatching": "arsiran",
  "isometric": "isometrik",
  "orthographic": "ortografis",
  "photomontage": "fotomontase",
  "projection": "proyeksi",
  "storyboard": "storyboard",
  "section-cut": "potongan",
  "bay": "teluk",
  "bay-window": "jendela teluk",

  // Architectural Elements
  "aperture": "bukaan",
  "core": "inti",
  "corridor": "koridor",
  "cornice": "kornisa",
  "curve": "kurva",
  "datum-line": "garis datum",
  "doorway": "pintu masuk",
  "double-height": "dua tingkat",
  "enclosure": "penutup",
  "frieze": "friso",
  "gallery": "galeri",
  "gable": "pedimen",
  "gallery-space": "ruang galeri",
  "girder": "balok induk",
  "glass-block": "blok kaca",
  "grate": "jeruji",
  "grille": "kisi-kisi",
  "groin-vault": "vault perpotongan",
  "ground-floor": "lantai dasar",
  "hall": "aula",
  "hearth": "perapian",
  "heel": "tumit",
  "herringbone": "tulang ikan",
  "hip-roof": "atap pinggul",
  "shading-device": "perangkat pembayangan",
  "atap-pelana": "atap pelana",

  // Sustainability Terms
  "bipv": "fotovoltaik terintegrasi bangunan",
  "carbon-neutral": "netral karbon",
  "circular-economy": "ekonomi sirkular",
  "climate-adaptation": "adaptasi iklim",
  "climate-responsive": "responsif iklim",
  "fscs": "dewan stewardship hutan",
  "green-infrastructure": "infrastruktur hijau",
  "grey-water": "air abu-abu",
  "native-plants": "tanaman asli",
  "water-conservation": "konservasi air",

  // Thermal/Performance
  "u-value": "nilai u",
  "condensation": "kondensasi",
  "sound-insulation": "insulasi suara",
  "heat-pump": "pompa panas",
  "overheating": "overheating",
};

// Add indonesianTerm to entries that don't have it yet
const updatedEntries = entries.map(entry => {
  if (!entry.indonesianTerm) {
    const indonesianTerm = additionalTranslations[entry.id];
    if (indonesianTerm) {
      return { ...entry, indonesianTerm };
    }
  }
  return entry;
});

// Write back to file
fs.writeFileSync('data/entries.json', JSON.stringify(updatedEntries, null, 2) + '\n');

const addedCount = updatedEntries.filter(e => e.indonesianTerm).length;
const totalCount = updatedEntries.length;
console.log(`\nFinal results:`);
console.log(`Entries with Indonesian terms: ${addedCount}/${totalCount}`);

// Show remaining entries without Indonesian terms
const missingTranslations = updatedEntries.filter(e => !e.indonesianTerm);
if (missingTranslations.length > 0) {
  console.log(`\nStill missing translations for ${missingTranslations.length} entries:`);
  missingTranslations.slice(0, 10).forEach(e => {
    console.log(`  "${e.id}": "${e.term}",`);
  });
  if (missingTranslations.length > 10) {
    console.log(`  ... and ${missingTranslations.length - 10} more`);
  }
}
