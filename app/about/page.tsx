import Link from 'next/link';
import { getAllSections } from '@/lib/entries';

export default async function AboutPage() {
  const sections = await getAllSections();

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
            for architecture students and beginners. It covers 645 terms across 10 sections, from
            structural systems and design movements to professional practice and building physics.
          </p>
        </section>

        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            How to use it
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
            Search with{' '}
            <kbd className="border border-[#0A0A0A] px-1.5 py-0.5 text-xs font-mono">⌘K</kbd>
            {' / '}
            <kbd className="border border-[#0A0A0A] px-1.5 py-0.5 text-xs font-mono">Ctrl K</kbd>{' '}
            or browse by section from the homepage. Each entry has a plain-language definition, a
            real-world example, and links to related terms — designed to build a connected
            understanding of architectural concepts, not just isolated definitions.
          </p>
        </section>

        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            Sections
          </h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`/section/${section.slug}`}
                className="text-[11px] font-semibold tracking-[0.1em] uppercase border border-[#0A0A0A]/30 px-2.5 py-1 opacity-60 hover:opacity-100 hover:border-[#0A0A0A] transition-opacity"
              >
                {section.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 mb-3">
            Built by
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#0A0A0A]">
            An open reference tool by Good Fruit Studio. No tracking, no ads.
          </p>
        </section>
      </div>
    </div>
  );
}
