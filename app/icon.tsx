import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  ).then((r) => r.text());

  const fontUrl = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)?.[1];
  const fontData = fontUrl ? await fetch(fontUrl).then((r) => r.arrayBuffer()) : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Space Grotesk',
          fontSize: 22,
          fontWeight: 700,
          color: '#0A0A0A',
          letterSpacing: '-0.5px',
        }}
      >
        K
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: 'Space Grotesk', data: fontData, weight: 700, style: 'normal' }] }
        : {}),
    }
  );
}
