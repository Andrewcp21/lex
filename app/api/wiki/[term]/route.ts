export async function GET(_req: Request, { params }: { params: { term: string } }) {
  const result =
    (await fetchWiki(params.term)) ?? (await fetchWiki(`${params.term}_(architecture)`));
  return Response.json(result ?? null);
}

async function fetchWiki(term: string) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;
  const d = await res.json();
  if (d.type === 'disambiguation') return null;
  return {
    title: d.title as string,
    extract: d.extract as string,
    thumbnail: (d.thumbnail?.source as string) ?? null,
    url: (d.content_urls?.desktop?.page as string) ?? null,
  };
}
