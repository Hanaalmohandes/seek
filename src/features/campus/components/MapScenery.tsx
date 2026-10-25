import { Circle, Ellipse, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { C, FONT } from '@/theme/tokens';

const LEAF_DARK = '#6F9A5C';
const LEAF = '#86B472';
const LEAF_LIGHT = '#B6D89D';
const SHADOW = '#4E6B41';
const TRUNK = '#8A6A4A';
const GRASS = '#CFE3BF';
const GRASS_STRIPE = '#DCEBCD';
const GRASS_EDGE = '#A9C893';
const STONE = '#EADBB8';
const STONE_SIDE = '#CDB27D';
const STONE_LIGHT = '#F6EDD8';

export function Tree({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <G>
      <Ellipse cx={x + r * 0.35} cy={y + r * 0.85} rx={r * 1.05} ry={r * 0.45} fill={SHADOW} opacity={0.25} />
      <Rect x={x - 1.3} y={y + r * 0.1} width={2.6} height={r * 0.85} rx={1} fill={TRUNK} />
      <Circle cx={x - r * 0.38} cy={y - r * 0.05} r={r * 0.72} fill={LEAF_DARK} />
      <Circle cx={x + r * 0.38} cy={y} r={r * 0.7} fill={LEAF_DARK} />
      <Circle cx={x} cy={y - r * 0.42} r={r * 0.8} fill={LEAF} />
      <Circle cx={x - r * 0.28} cy={y - r * 0.68} r={r * 0.34} fill={LEAF_LIGHT} />
    </G>
  );
}

export function Bush({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <G>
      <Ellipse cx={x + 1.5} cy={y + r * 0.7} rx={r * 1.3} ry={r * 0.5} fill={SHADOW} opacity={0.22} />
      <Circle cx={x - r * 0.55} cy={y} r={r * 0.75} fill={LEAF_DARK} />
      <Circle cx={x + r * 0.55} cy={y} r={r * 0.75} fill={LEAF_DARK} />
      <Circle cx={x} cy={y - r * 0.3} r={r * 0.85} fill={LEAF} />
      <Circle cx={x - r * 0.25} cy={y - r * 0.6} r={r * 0.3} fill={LEAF_LIGHT} />
    </G>
  );
}

const FLOWER_COLOURS = ['#F2A7B5', '#FFFFFF', '#F6D36B', '#F2A7B5', '#C9B6F0'];

export function Lawn({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const stripes = Math.floor((width - 12) / 12);
  const flowers = Array.from({ length: 9 }, (_, i) => ({
    cx: x + 10 + ((i * 37) % (width - 20)),
    cy: y + 10 + ((i * 23) % (height - 24)),
    fill: FLOWER_COLOURS[i % FLOWER_COLOURS.length],
  }));
  return (
    <G>
      <Rect x={x + 2} y={y + 3} width={width} height={height} rx={12} fill={SHADOW} opacity={0.12} />
      <Rect x={x} y={y} width={width} height={height} rx={12} fill={GRASS} stroke={GRASS_EDGE} strokeWidth={1.5} />
      {Array.from({ length: stripes }, (_, i) =>
        i % 2 ? (
          <Rect key={i} x={x + 6 + i * 12} y={y + 6} width={12} height={height - 12} fill={GRASS_STRIPE} />
        ) : null,
      )}
      {flowers.map((f, i) => (
        <G key={i}>
          <Circle cx={f.cx} cy={f.cy} r={2} fill={f.fill} />
          <Circle cx={f.cx} cy={f.cy} r={0.8} fill="#E8A93A" />
        </G>
      ))}
      {Array.from({ length: Math.floor(width / 22) }, (_, i) => (
        <Bush key={`b${i}`} x={x + 12 + i * 22} y={y + height - 7} r={4.5} />
      ))}
    </G>
  );
}

export function Hedge({ points }: { points: { x: number; y: number }[] }) {
  return (
    <G>
      {points.map((p) => (
        <Ellipse key={`s-${p.x}-${p.y}`} cx={p.x + 1.5} cy={p.y + 3} rx={6.5} ry={3.5} fill={SHADOW} opacity={0.18} />
      ))}
      {points.map((p) => (
        <G key={`h-${p.x}-${p.y}`}>
          <Circle cx={p.x} cy={p.y} r={6.2} fill={LEAF_DARK} />
          <Circle cx={p.x - 0.8} cy={p.y - 1.2} r={4.6} fill={LEAF} />
          <Circle cx={p.x - 2} cy={p.y - 2.4} r={1.8} fill={LEAF_LIGHT} />
        </G>
      ))}
    </G>
  );
}

export function Theatre({ name, x, y, radius }: { name: string; x: number; y: number; radius: number }) {
  const half = (r: number, dy = 0) => `M${x - r} ${y + dy} A${r} ${r} 0 0 1 ${x + r} ${y + dy} Z`;
  const tiers = [0, 1, 2, 3].map((t) => radius - t * 8);
  const inner = radius - 32;
  return (
    <G>
      <Ellipse cx={x + 3} cy={y + 6} rx={radius + 2} ry={7} fill={SHADOW} opacity={0.18} />
      {tiers.map((r, i) => (
        <G key={r}>
          <Path d={half(r, 3)} fill={STONE_SIDE} />
          <Path d={half(r)} fill={i % 2 ? STONE_LIGHT : STONE} />
        </G>
      ))}

      {[-0.5, 0.5].map((a) => (
        <Line
          key={a}
          x1={x + Math.sin(a) * inner}
          y1={y - Math.cos(a) * inner}
          x2={x + Math.sin(a) * radius}
          y2={y - Math.cos(a) * radius}
          stroke={STONE_SIDE}
          strokeWidth={2}
        />
      ))}

      <Path d={half(inner, 2)} fill={STONE_SIDE} />
      <Path d={half(inner)} fill="#F3F5F8" />
      <Rect x={x - radius * 0.62} y={y - 1} width={radius * 1.24} height={5} rx={1.5} fill={STONE} />
      <Rect x={x - radius * 0.62} y={y + 4} width={radius * 1.24} height={4} rx={1} fill={STONE_SIDE} />
      {Array.from({ length: 7 }, (_, i) => (
        <Circle key={i} cx={x - radius * 0.5 + (i * radius) / 6} cy={y + 1.5} r={1.4} fill={C.white} />
      ))}
      <SvgText x={x} y={y + 17} fontSize={9.5} fontFamily={FONT.semibold} fill={C.navy} textAnchor="middle">
        {name}
      </SvgText>
    </G>
  );
}

export function Fountain({ x, y }: { x: number; y: number }) {
  return (
    <G>
      <Ellipse cx={x + 2} cy={y + 5} rx={18} ry={9} fill={SHADOW} opacity={0.15} />
      <Ellipse cx={x} cy={y + 2} rx={17} ry={12} fill="#C9D3DF" />
      <Ellipse cx={x} cy={y} rx={17} ry={12} fill="#EEF1F5" stroke="#C9D3DF" strokeWidth={1} />
      <Ellipse cx={x} cy={y + 0.5} rx={13} ry={8.5} fill="#7FB3DA" />
      <Ellipse cx={x} cy={y + 1.5} rx={12} ry={7} fill="#9CCBEA" />
      <Ellipse cx={x - 4} cy={y - 1} rx={4} ry={1.6} fill={C.white} opacity={0.6} />
      <Rect x={x - 1.6} y={y - 7} width={3.2} height={7} rx={1} fill="#EEF1F5" />
      {[-5, -2.5, 0, 2.5, 5].map((dx) => (
        <Circle key={dx} cx={x + dx} cy={y - 8 - (2 - Math.abs(dx) / 2.5)} r={1.1} fill={C.white} />
      ))}
    </G>
  );
}

export function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <G>
      <Ellipse cx={x + 2} cy={y + 1} rx={3} ry={1.4} fill={SHADOW} opacity={0.3} />
      <Line x1={x} y1={y} x2={x} y2={y - 10} stroke="#3B4B63" strokeWidth={1.6} strokeLinecap="round" />
      <Circle cx={x} cy={y - 11} r={5.5} fill={C.gold} opacity={0.22} />
      <Circle cx={x} cy={y - 11} r={2.6} fill={C.gold} />
      <Circle cx={x - 0.8} cy={y - 11.8} r={0.9} fill={C.white} />
    </G>
  );
}

export function Plaza({ x, y }: { x: number; y: number }) {
  return (
    <G>
      <Circle cx={x} cy={y} r={12.5} fill="#F3F5F8" stroke="#D5DDE7" strokeWidth={2} />
      <Circle cx={x} cy={y} r={8} fill="none" stroke="#DDE3EB" strokeWidth={1} />
      {[0, 45, 90, 135].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <Line key={a} x1={x - Math.cos(r) * 12} y1={y - Math.sin(r) * 12} x2={x + Math.cos(r) * 12} y2={y + Math.sin(r) * 12} stroke="#E2E7EE" strokeWidth={1} />
        );
      })}
      <Circle cx={x} cy={y} r={4} fill={C.apricot} stroke={C.gold} strokeWidth={1} />
    </G>
  );
}

export function LowWall({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <G>
      <Rect x={x1} y={y} width={x2 - x1} height={5} rx={1.5} fill="#8E9AAB" />
      <Rect x={x1} y={y - 3} width={x2 - x1} height={4} rx={1.5} fill="#C3CCD8" />
    </G>
  );
}

export function Gate({ x, y, number, side }: { x: number; y: number; number: number; side: string }) {
  const vertical = side !== 'bottom';
  const pillars = vertical
    ? [
        { px: x - 5, py: y - 25 },
        { px: x - 5, py: y + 15 },
      ]
    : [
        { px: x - 25, py: y - 5 },
        { px: x + 15, py: y - 5 },
      ];
  return (
    <G>
      {pillars.map((p) => (
        <G key={`${p.px}-${p.py}`}>
          <Rect x={p.px + 1.5} y={p.py + 2} width={10} height={10} rx={2} fill={SHADOW} opacity={0.25} />
          <Rect x={p.px} y={p.py + 3} width={10} height={8} rx={2} fill="#0A2240" />
          <Rect x={p.px} y={p.py} width={10} height={6} rx={2} fill="#355C8C" />
        </G>
      ))}
      <Rect x={x - 12} y={y - 11} width={24} height={24} rx={6} fill="#081A33" />
      <Rect x={x - 12} y={y - 13} width={24} height={22} rx={6} fill={C.navy} stroke={C.gold} strokeWidth={1.2} />
      <SvgText x={x} y={y + 3} fontSize={13} fontFamily={FONT.heavy} fill={C.white} textAnchor="middle">
        {number}
      </SvgText>
    </G>
  );
}
