'use client';

import { getRelatedEntries, getSectionForEntry, getEntry } from '@/lib/entries';

const SVG_COLOR: Record<string, string> = {
  red:    '#CC0000',
  yellow: '#8B6B00',
  green:  '#006E33',
  blue:   '#0077AA',
};

const CX = 330;
const CY = 150;
const NODE_HALF_W  = 30;   // knockout rect half-width for L1 nodes
const L2_RADIUS    = 42;   // distance from L1 node to L2 node
const L2_FAN       = 0.30; // radians ≈ ±17° fan spread
const L2_HALF_W    = 22;   // knockout rect half-width for L2 nodes
const MAX_JITTER   = 10;
const RADIUS_JITTER = 0.08;
const MIN_LINE     = 24;   // minimum visible dashed-line gap between knockout rects

function startAngle(n: number): number {
  if (n === 1) return 0;
  if (n === 2) return 0;    // left + right: minimal Y span
  if (n === 4) return -45;  // diamond: balanced H/W ratio
  return -90;               // 3, 5+: one node at top
}

function splitLines(term: string): string[] {
  const words = term.split(' ');
  if (term.length <= 13 || words.length === 1) return [term.toUpperCase()];
  let best = 1, bestDiff = Infinity;
  for (let s = 1; s < words.length; s++) {
    const diff = Math.abs(words.slice(0, s).join(' ').length - words.slice(s).join(' ').length);
    if (diff < bestDiff) { bestDiff = diff; best = s; }
  }
  return [
    words.slice(0, best).join(' ').toUpperCase(),
    words.slice(best).join(' ').toUpperCase(),
  ];
}

function termHash(term: string): number {
  return term.split('').reduce(
    (acc, c) => ((acc * 31 + c.charCodeAt(0)) & 0xFFFF), 0
  );
}

// Estimates half-width of bold uppercase SVG text for viewBox bounds only
function textHW(lines: string[], fontSize: number): number {
  const maxLen = Math.max(...lines.map(l => l.length));
  return Math.ceil(maxLen * fontSize * 0.60);
}

interface Props {
  relatedIds: string[];
  centerTerm: string;
  centerId: string;
}

export default function ConstellationGraph({ relatedIds, centerTerm, centerId }: Props) {
  const related = getRelatedEntries(relatedIds);
  if (related.length === 0) return null;

  const n = related.length;

  const centerLines = splitLines(centerTerm);
  const centerFontSize = centerLines[0].length > 14 ? 10 : 13;
  const maxCenterChars = Math.max(...centerLines.map(l => l.length));
  const centerHalfW = Math.max(44, Math.ceil(maxCenterChars * centerFontSize * 0.60 / 2) + 8);
  const centerHalfH = centerLines.length > 1 ? 20 : 14;

  // RADIUS: guarantees minimum visible line (MIN_LINE px) between center and L1 knockout rects.
  // Capped at 115 to prevent sprawl on entries with wide center terms.
  const RADIUS = Math.min(
    Math.max(centerHalfW + NODE_HALF_W + MIN_LINE, 80),
    115
  );

  const nodes = related.map((entry, i) => {
    const baseAngleRad = ((i * (360 / n)) + startAngle(n)) * (Math.PI / 180);
    const h = termHash(entry.term);
    const jitterDeg = ((h & 0xFF) / 255 - 0.5) * 2 * MAX_JITTER;
    const radiusScale = 1 + (((h >> 8) & 0xFF) / 255 - 0.5) * 2 * RADIUS_JITTER;
    const angleRad = baseAngleRad + (jitterDeg * Math.PI / 180);
    const r = RADIUS * radiusScale;
    const x = CX + r * Math.cos(angleRad);
    const y = CY + r * Math.sin(angleRad);
    const section = getSectionForEntry(entry);
    const color = section ? (SVG_COLOR[section.color] ?? '#0A0A0A') : '#0A0A0A';
    return { entry, x, y, angle: angleRad, color, lines: splitLines(entry.term) };
  });

  const l1IdSet = new Set(relatedIds);
  const shownL2Ids = new Set<string>();

  const l2Nodes = nodes.flatMap((l1Node) => {
    const candidates = l1Node.entry.relatedTerms.filter(
      (id) => id !== centerId && !l1IdSet.has(id) && !shownL2Ids.has(id)
    );
    // One L2 node per L1 parent to keep the layout compact
    return candidates.slice(0, 1).map((id) => {
      shownL2Ids.add(id);
      const l2Entry = getEntry(id);
      if (!l2Entry) return null;
      const l2Angle = l1Node.angle + L2_FAN;
      const x = l1Node.x + L2_RADIUS * Math.cos(l2Angle);
      const y = l1Node.y + L2_RADIUS * Math.sin(l2Angle);
      const section = getSectionForEntry(l2Entry);
      const color = section ? (SVG_COLOR[section.color] ?? '#0A0A0A') : '#0A0A0A';
      return { entry: l2Entry, x, y, parentX: l1Node.x, parentY: l1Node.y, color, lines: splitLines(l2Entry.term) };
    }).filter((nd): nd is NonNullable<typeof nd> => nd !== null);
  });

  const BREATH = 16;
  const allX = [
    CX - centerHalfW, CX + centerHalfW,
    ...nodes.flatMap(nd => { const hw = Math.max(NODE_HALF_W, textHW(nd.lines, 10)); return [nd.x - hw, nd.x + hw]; }),
    ...l2Nodes.flatMap(nd => { const hw = Math.max(L2_HALF_W, textHW(nd.lines, 8)); return [nd.x - hw, nd.x + hw]; }),
  ];
  const allY = [
    CY - centerHalfH, CY + centerHalfH,
    ...nodes.flatMap(nd => [nd.y - 14, nd.y + 14]),
    ...l2Nodes.flatMap(nd => [nd.y - 11, nd.y + 11]),
  ];

  const contentMinX = Math.min(...allX) - BREATH;
  const contentMaxX = Math.max(...allX) + BREATH;
  const minY = Math.min(...allY) - BREATH;
  const maxY = Math.max(...allY) + BREATH;

  const contentWidth = contentMaxX - contentMinX;
  const vbWidth = Math.max(320, contentWidth);
  const vbMinX = (contentMinX + contentMaxX) / 2 - vbWidth / 2;
  const viewBox = `${vbMinX} ${minY} ${vbWidth} ${maxY - minY}`;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h3 className="text-[10px] font-semibold tracking-[0.25em] text-[#0A0A0A] opacity-40 uppercase">
          Related Terms
        </h3>
        <span className="text-[10px] text-[#0A0A0A] opacity-20 tracking-[0.08em]">
          click any term to explore
        </span>
      </div>

      <style>{`
        @keyframes dash-flow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -20; }
        }
        .constellation-line {
          stroke-dasharray: 3 7;
          animation: dash-flow 1.8s linear infinite;
        }
      `}</style>

      <svg viewBox={viewBox} className="w-full h-auto">
        {/* L2 dashed lines */}
        {l2Nodes.map((node, i) => (
          <line
            key={`l2-line-${i}`}
            x1={node.parentX} y1={node.parentY}
            x2={node.x} y2={node.y}
            stroke={node.color}
            strokeWidth={0.5}
            strokeOpacity={0.30}
            className="constellation-line"
          />
        ))}

        {/* L1 dashed lines */}
        {nodes.map((node, i) => (
          <line
            key={`line-${i}`}
            x1={CX} y1={CY}
            x2={node.x} y2={node.y}
            stroke={node.color}
            strokeWidth={0.75}
            strokeOpacity={0.55}
            className="constellation-line"
          />
        ))}

        {/* L2 knockout rects */}
        {l2Nodes.map((node, i) => {
          const rh = node.lines.length > 1 ? 20 : 13;
          return (
            <rect
              key={`l2-bg-${i}`}
              x={node.x - L2_HALF_W} y={node.y - rh / 2}
              width={L2_HALF_W * 2} height={rh}
              fill="white"
            />
          );
        })}

        {/* L1 knockout rects */}
        {nodes.map((node, i) => {
          const rh = node.lines.length > 1 ? 26 : 16;
          return (
            <rect
              key={`bg-${i}`}
              x={node.x - NODE_HALF_W} y={node.y - rh / 2}
              width={NODE_HALF_W * 2} height={rh}
              fill="white"
            />
          );
        })}

        {/* Center knockout rect */}
        <rect
          x={CX - centerHalfW} y={CY - centerHalfH}
          width={centerHalfW * 2} height={centerHalfH * 2}
          fill="white"
        />

        {/* L2 text labels */}
        {l2Nodes.map((node, i) => (
          <a key={`l2-node-${i}`} href={`/entry/${node.entry.id}`} style={{ cursor: 'pointer' }}>
            {node.lines.map((line, li) => {
              const yOffset = (li - (node.lines.length - 1) / 2) * 10;
              return (
                <text
                  key={li}
                  x={node.x}
                  y={node.y + yOffset + 2.5}
                  textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  fontSize={8}
                  fontWeight={700}
                  letterSpacing="0.1em"
                  fill={node.color}
                  opacity={0.45}
                >
                  {line}
                </text>
              );
            })}
          </a>
        ))}

        {/* L1 text labels */}
        {nodes.map((node, i) => (
          <a key={`node-${i}`} href={`/entry/${node.entry.id}`} style={{ cursor: 'pointer' }}>
            {node.lines.map((line, li) => {
              const yOffset = (li - (node.lines.length - 1) / 2) * 12;
              return (
                <text
                  key={li}
                  x={node.x}
                  y={node.y + yOffset + 3}
                  textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  fontSize={10}
                  fontWeight={700}
                  letterSpacing="0.1em"
                  fill={node.color}
                >
                  {line}
                </text>
              );
            })}
          </a>
        ))}

        {/* Center term */}
        {centerLines.map((line, li) => {
          const yOffset = (li - (centerLines.length - 1) / 2) * (centerFontSize + 3);
          return (
            <text
              key={li}
              x={CX}
              y={CY + yOffset + centerFontSize * 0.35}
              textAnchor="middle"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              fontSize={centerFontSize}
              fontWeight={800}
              letterSpacing="0.08em"
              fill="#0A0A0A"
            >
              {line}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
