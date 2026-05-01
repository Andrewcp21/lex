'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { VideoReference } from '@/lib/types';

interface YoutubeVideo {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  url: string;
}

function extractVideoId(url: string): string | null {
  return url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] ?? null;
}

function VideoCard({ url, title, channel, thumbnail }: { url: string; title: string; channel?: string; thumbnail: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 items-start group"
    >
      <div className="shrink-0 w-[120px] h-[68px] border border-[#0A0A0A]/20 overflow-hidden bg-[#0A0A0A]/5">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            width={120}
            height={68}
            className="w-full h-full object-cover"
            unoptimized
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug text-[#0A0A0A] mb-1 group-hover:opacity-70 transition-opacity">
          {title}
        </p>
        {channel && (
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase opacity-40 mb-2">
            {channel}
          </p>
        )}
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 group-hover:opacity-80 transition-opacity">
          Watch on YouTube →
        </span>
      </div>
    </a>
  );
}

interface Props {
  term: string;
  definition?: string;
  videoReferences?: VideoReference[];
}

function firstSentence(text: string): string {
  return (text.match(/^[^.!?]+[.!?]/)?.[0] ?? text).slice(0, 200);
}

export default function VideoPanel({ term, definition, videoReferences }: Props) {
  const [fetched, setFetched] = useState<YoutubeVideo[] | undefined>(undefined);

  const hasCurated = videoReferences && videoReferences.length > 0;

  useEffect(() => {
    if (hasCurated) return;
    const base = `/api/youtube/${encodeURIComponent(term)}`;
    const url = definition
      ? `${base}?def=${encodeURIComponent(firstSentence(definition))}`
      : base;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setFetched(d))
      .catch(() => setFetched([]));
  }, [term, definition, hasCurated]);

  // Curated path — render immediately, no fetch
  if (hasCurated) {
    return (
      <section className="pt-8 border-t border-[#0A0A0A]">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-4">
          Watch &amp; Learn
        </h2>
        <div className="space-y-4">
          {videoReferences.map((v, i) => {
            const videoId = extractVideoId(v.url);
            return (
              <VideoCard
                key={i}
                url={v.url}
                title={v.title}
                channel={v.channel}
                thumbnail={videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : ''}
              />
            );
          })}
        </div>
      </section>
    );
  }

  // Dynamic path — loading skeleton
  if (fetched === undefined) {
    return (
      <section className="pt-8 border-t border-[#0A0A0A]">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-4">
          Watch &amp; Learn
        </h2>
        <div className="animate-pulse h-4 bg-[#0A0A0A]/10 rounded w-3/4" />
      </section>
    );
  }

  // Dynamic path — no results
  if (!fetched.length) return null;

  return (
    <section className="pt-8 border-t border-[#0A0A0A]">
      <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-4">
        Watch &amp; Learn
      </h2>
      <div className="space-y-4">
        {fetched.map((v) => (
          <VideoCard
            key={v.videoId}
            url={v.url}
            title={v.title}
            channel={v.channel}
            thumbnail={v.thumbnail}
          />
        ))}
      </div>
    </section>
  );
}
