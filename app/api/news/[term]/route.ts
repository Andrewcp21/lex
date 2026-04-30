import { parseRssFeed, type NewsArticle } from '@/lib/parseRss';

const RSS_HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; KosaRupa/1.0)' };

// NewsAPI — search architecture articles from top architecture publications
async function fetchNewsApi(term: string): Promise<NewsArticle[]> {
  const key = process.env.NEWSAPI_KEY;
  if (!key) return [];
  try {
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', `${term} architecture`);
    url.searchParams.set('domains', 'archdaily.com,dezeen.com,archinect.com,architectmagazine.com,archpaper.com');
    url.searchParams.set('language', 'en');
    url.searchParams.set('sortBy', 'relevancy');
    url.searchParams.set('pageSize', '3');
    url.searchParams.set('apiKey', key);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];

    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.articles)) return [];

    return data.articles.map((a: {
      title: string;
      url: string;
      publishedAt: string;
      description: string | null;
      source: { name: string };
    }) => ({
      title: a.title ?? '',
      url: a.url ?? '',
      publishedAt: a.publishedAt
        ? new Date(a.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '',
      excerpt: a.description ? a.description.slice(0, 160) : null,
      source: a.source?.name ?? 'NewsAPI',
    })).filter((a: NewsArticle) => a.title && a.url);
  } catch {
    return [];
  }
}

// Google News RSS — fallback when NewsAPI is unavailable or returns nothing
async function fetchGoogleNews(term: string): Promise<NewsArticle[]> {
  try {
    const res = await fetch(
      `https://news.google.com/rss/search?q=${encodeURIComponent(term)}+architecture`,
      { headers: RSS_HEADERS, next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const articles = parseRssFeed(await res.text(), 'Google News');
    // Extract real source from title suffix (e.g. "Title - ArchDaily" → source: "ArchDaily")
    return articles.map((a) => {
      const match = a.title.match(/^([\s\S]+?)\s+-\s+([^-]+)$/);
      if (!match) return a;
      return { ...a, title: match[1].trim(), source: match[2].trim() };
    });
  } catch {
    return [];
  }
}

function dedupe(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}

export async function GET(_req: Request, { params }: { params: { term: string } }) {
  const { term } = params;

  const primary = await fetchNewsApi(term);

  const fallback = primary.length < 3 ? await fetchGoogleNews(term) : [];

  const articles = dedupe([...primary, ...fallback]).slice(0, 3);
  return Response.json(articles);
}
