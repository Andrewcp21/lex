import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity"
      >
        ← Home
      </Link>

      <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-tight tracking-tight mt-6 mb-8 pb-8 border-b border-[#0A0A0A]">
        About
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            What is this
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
            Kosa Rupa is an architect&apos;s dictionary — a fast, offline-capable personal reference
            for architecture students and beginners. It covers 520 terms across 15 sections, from
            structural systems and design movements to professional practice and building physics.
          </p>
        </section>

        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            How to use it
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
            Search with <kbd className="border border-[#0A0A0A] px-1.5 py-0.5 text-xs font-mono">⌘K</kbd> or
            browse by section from the homepage. Each entry has a plain-language definition, a
            real-world example, and links to related terms — designed to build a connected
            understanding of architectural concepts, not just isolated definitions.
          </p>
        </section>

        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            Sections
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
            15 sections cover: Architectural Terms & Theory, Building Materials & Construction,
            Structural Systems, Design Styles & Movements, Tools & Technology, Sustainability,
            Codes & Standards, Urban Design, Key Figures, Geometry & Mathematics, Building History,
            Architecture Across Cultures, Professional Practice, Building Performance & Physics,
            and Representation & Communication.
          </p>
        </section>

        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            Built by
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
            An experimental tool by Good Fruit Studio. No backend, no tracking, no database.
            All data is static JSON — it works fully offline once loaded.
          </p>
        </section>
      </div>
    </div>
  );
}
