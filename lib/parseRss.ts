export interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string | null;
  source: string;
  relatedTermIds?: string[];
}

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i'));
  return match ? match[1].trim() : '';
}

function extractAttr(block: string, tag: string, attr: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["']`, 'i'));
  return match ? match[1].trim() : '';
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html: string): string {
  // Decode entities first so entity-encoded tags (e.g. &lt;a href...&gt;) are also stripped
  let text = decodeEntities(html);
  text = text.replace(/<[^>]+>/g, ' ');
  // Strip again in case decoded entities produced new tags
  text = decodeEntities(text).replace(/<[^>]+>/g, ' ');
  return text.replace(/\s+/g, ' ').trim();
}

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return raw;
  }
}

export function parseRssFeed(xml: string, source: string): NewsArticle[] {
  try {
    const items: NewsArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
      const block = match[1];

      const title = stripHtml(extractTag(block, 'title'));
      // <link> is a text node in standard RSS, href attr in Atom, guid fallback for Google News
      let url = extractTag(block, 'link');
      if (!url) url = extractAttr(block, 'link', 'href');
      if (!url) url = extractTag(block, 'guid');
      const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date') || extractTag(block, 'published');
      const description = extractTag(block, 'description') || extractTag(block, 'content:encoded') || extractTag(block, 'summary');

      if (!title || !url) continue;

      const rawExcerpt = stripHtml(description);
      const excerpt = rawExcerpt.length > 160 ? rawExcerpt.slice(0, 157) + '…' : rawExcerpt || null;

      items.push({
        title,
        url,
        publishedAt: pubDate ? formatDate(pubDate) : '',
        excerpt,
        source,
      });
    }

    return items;
  } catch {
    return [];
  }
}
