'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface WikiData {
  title: string;
  extract: string;
  thumbnail: string | null;
  url: string | null;
}

function twoSentences(text: string): string {
  const matches = text.match(/[^.!?]*[.!?]+/g);
  if (!matches) return text;
  return matches.slice(0, 2).join(' ').trim();
}

export default function WikipediaPanel({ term }: { term: string }) {
  const [data, setData] = useState<WikiData | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/wiki/${encodeURIComponent(term)}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData(null));
  }, [term]);

  // undefined = loading, null = not found
  if (data === undefined) {
    return (
      <section className="pt-8 border-t border-[#0A0A0A]">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-3">
          From Wikipedia
        </h2>
        <div className="animate-pulse h-4 bg-[#0A0A0A]/10 rounded w-3/4" />
      </section>
    );
  }

  if (!data) return null;

  const extract = twoSentences(data.extract);

  return (
    <section className="pt-8 border-t border-[#0A0A0A]">
      <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-4">
        From Wikipedia
      </h2>
      <div className="flex gap-4 items-start">
        {data.thumbnail && (
          <div className="shrink-0 w-24 h-24 border border-[#0A0A0A]/20 overflow-hidden">
            <Image
              src={data.thumbnail}
              alt={data.title}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed text-[#0A0A0A] opacity-70 mb-3">
            {extract}
          </p>
          {data.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 hover:opacity-80 transition-opacity"
            >
              Read more on Wikipedia →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
