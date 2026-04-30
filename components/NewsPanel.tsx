'use client';

import { useEffect, useState } from 'react';

interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string | null;
  source: string;
}

export default function NewsPanel({ term }: { term: string }) {
  const [articles, setArticles] = useState<NewsArticle[] | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/news/${encodeURIComponent(term)}`)
      .then((r) => r.json())
      .then((d) => setArticles(d))
      .catch(() => setArticles([]));
  }, [term]);

  // undefined = loading, empty = not found
  if (articles === undefined) {
    return (
      <section className="pt-8 border-t border-[#0A0A0A]">
        <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-3">
          In the News
        </h2>
        <div className="animate-pulse h-4 bg-[#0A0A0A]/10 rounded w-3/4" />
      </section>
    );
  }

  if (!articles.length) return null;

  return (
    <section className="pt-8 border-t border-[#0A0A0A]">
      <h2 className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-30 mb-4">
        In the News
      </h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block pl-3 border-l-2 border-[#0A0A0A]/20 hover:border-[#0A0A0A]/60 hover:opacity-80 transition-all"
          >
            <p className="text-sm font-bold uppercase tracking-tight text-[#0A0A0A] leading-snug mb-1">
              {article.title}
            </p>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 mb-1">
              {article.source}
              {article.publishedAt ? ` · ${article.publishedAt}` : ''}
            </p>
            {article.excerpt && (
              <p className="text-sm font-medium text-[#0A0A0A] opacity-60 leading-relaxed">
                {article.excerpt}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
