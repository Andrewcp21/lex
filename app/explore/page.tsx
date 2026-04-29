import { getAllSections } from '@/lib/entries';
import SectionCard from '@/components/SectionCard';

export default function ExplorePage() {
  const sections = getAllSections();

  return (
    <div>
      <div className="px-6 py-12 border-b border-[#0A0A0A]">
        <h1 className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-tight tracking-tight">
          Explore
        </h1>
        <p className="text-sm font-medium opacity-50 mt-2">
          {sections.length} sections — 520 terms
        </p>
      </div>

      <section className="px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-50">
            Browse by Section
          </h2>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-30">
            {sections.length} Sections
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#0A0A0A]">
          {sections.map((section, i) => (
            <div key={section.id} className="border-b border-r border-[#0A0A0A]">
              <SectionCard section={section} index={i} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
