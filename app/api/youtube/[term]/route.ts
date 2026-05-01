interface YoutubeVideo {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  url: string;
}

const STOP_WORDS = new Set([
  'a','an','the','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall','can',
  'to','of','in','for','on','with','at','by','from','as','into','through',
  'and','but','or','nor','so','yet','not','only','also','such','very','just',
  'that','this','these','those','it','its','their','they','them','which','who',
  'when','where','what','how','why','used','use','using','often','more','most',
  'other','some','any','each','than','then','both','either','neither','same',
  'one','two','three','many','much','well','known','found','made','called',
  'given','based','allow','create','make','give','take','come','goes','get',
  'often','typically','usually','generally','commonly','particularly','especially',
]);

function extractKeywords(text: string, count = 5): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w))
    .filter((w, i, arr) => arr.indexOf(w) === i)
    .slice(0, count);
}

export async function GET(req: Request, { params }: { params: { term: string } }) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return Response.json([]);

  const { searchParams } = new URL(req.url);
  const def = searchParams.get('def') ?? '';
  const keywords = def ? extractKeywords(def) : [];
  const query = keywords.length
    ? `${params.term} ${keywords.join(' ')}`
    : params.term;

  try {
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('maxResults', '2');
    searchUrl.searchParams.set('relevanceLanguage', 'en');
    searchUrl.searchParams.set('key', key);

    const res = await fetch(searchUrl.toString(), {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[youtube]', res.status, JSON.stringify(err));
      return Response.json([]);
    }

    const data = await res.json();
    if (!Array.isArray(data.items)) {
      console.error('[youtube] unexpected response:', JSON.stringify(data));
      return Response.json([]);
    }

    const videos: YoutubeVideo[] = data.items
      .filter((item: { id?: { videoId?: string } }) => item.id?.videoId)
      .map((item: {
        id: { videoId: string };
        snippet: { title: string; channelTitle: string; thumbnails: { medium?: { url: string }; default?: { url: string } } };
      }) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.default?.url ?? '',
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));

    return Response.json(videos);
  } catch {
    return Response.json([]);
  }
}
