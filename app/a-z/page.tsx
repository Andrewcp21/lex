import Link from 'next/link';
import { getAllEntriesSorted, getAllSections, COLOR_MAP } from '@/lib/entries';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AZPage() {
  const entries = getAllEntriesSorted();
  const sections = getAllSections();

  const grouped: Record<string, typeof entries> = {};
  for (const entry of entries) {
    const letter = entry.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(entry);
  }

  const presentLetters = new Set(Object.keys(grouped));

  return (
    <div>
      {/* Header */}
      <div className="px-6 py-12 border-b border-[#0A0A0A]">
        <h1 className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-tight tracking-tight">
          A–Z Index
        </h1>
        <p className="text-sm font-medium opacity-50 mt-2">
          {entries.length} terms — all sections
        </p>
      </div>

      {/* Letter nav */}
      <nav className="px-6 py-4 border-b border-[#0A0A0A] flex flex-wrap gap-1">
        {ALPHABET.map((letter) => (
          <a
            key={letter}
            href={presentLetters.has(letter) ? `#letter-${letter}` : undefined}
            className={`w-7 h-7 flex items-center justify-center text-[11px] font-bold border transition-colors ${
              presentLetters.has(letter)
                ? 'border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                : 'border-[#0A0A0A]/20 text-[#0A0A0A]/20 cursor-default'
            }`}
          >
            {letter}
          </a>
        ))}
      </nav>

      {/* Entries */}
      <div className="px-6 py-8 space-y-12">
        {ALPHABET.filter((l) => grouped[l]).map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <h2 className="text-5xl font-bold uppercase tracking-tight text-[#0A0A0A] opacity-10 mb-4">
              {letter}
            </h2>
            <div className="border-t border-[#0A0A0A]">
              {grouped[letter].map((entry) => {
                const section = sections.find((s) => s.id === entry.section);
                const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;
                return (
                  <div key={entry.id} className="flex items-center justify-between py-3 border-b border-[#0A0A0A]/10 group">
                    <Link
                      href={`/entry/${entry.id}`}
                      className="text-sm font-bold uppercase tracking-tight text-[#0A0A0A] group-hover:underline"
                    >
                      {entry.term}
                      {entry.phonetic && (
                        <span className="ml-2 text-xs font-normal normal-case tracking-normal opacity-40 no-underline">
                          {entry.phonetic}
                        </span>
                      )}
                    </Link>
                    {section && (
                      <span
                        className={`text-[9px] font-semibold tracking-[0.2em] uppercase px-2 py-0.5 ${colors.bg} ${colors.text} shrink-0`}
                      >
                        {section.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
