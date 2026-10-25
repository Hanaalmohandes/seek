import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path, Polyline, Rect, Text as SvgText } from 'react-native-svg';

import { Fountain, Gate, Hedge, Lamp, Lawn, LowWall, Plaza, Theatre, Tree } from './MapScenery';

import { C, FONT } from '@/theme/tokens';
import { BUILDINGS, EDGES, FOUNTAIN, GATES, LAMPS, LAWNS, MAP_HEIGHT, MAP_WIDTH, NODES, OUTLINE, PLAZAS, SPINE_X, THEATRES, TREES, WALLS_Y } from '../data/campus';
import type { Building, MapPoint } from '../types';

type Props = {
  selectedBuildingId?: string | null;
  highlightedBuildingIds?: string[] | null;
  route?: MapPoint[] | null;
  onSelectBuilding?: (id: string) => void;
};

const CAMPUS_FILL = '#EEF2F7';
const WALL = '#0A2240';
const WALL_SELECTED = '#1C3A63';
const ROOF = '#24456F';
const ROOF_SELECTED = '#355C8C';
const WINDOW = '#F7DDB2';
const ICON = 17;

const nodeById = new Map(NODES.map((n) => [n.id, n]));

const HEDGE_POINTS = (() => {
  const inset = 10;
  const step = 12;
  const r = OUTLINE.radius - inset;
  const cx = OUTLINE.x + OUTLINE.width / 2;
  const topY = OUTLINE.y + OUTLINE.radius;
  const bottomY = OUTLINE.y + OUTLINE.height - OUTLINE.radius;
  const pts: { x: number; y: number }[] = [];
  for (let y = topY; y <= bottomY; y += step) {
    pts.push({ x: OUTLINE.x + inset, y }, { x: OUTLINE.x + OUTLINE.width - inset, y });
  }
  const arcSteps = Math.round((Math.PI * r) / step);
  for (let i = 1; i < arcSteps; i++) {
    const a = (Math.PI * i) / arcSteps;
    pts.push({ x: cx - Math.cos(a) * r, y: topY - Math.sin(a) * r }, { x: cx - Math.cos(a) * r, y: bottomY + Math.sin(a) * r });
  }
  const nearGateOrPath = (p: { x: number; y: number }) =>
    GATES.some((g) => Math.hypot(g.x - p.x, g.y - p.y) < 30) ||
    EDGES.some(([a, b]) => {
      const n1 = nodeById.get(a)!;
      const n2 = nodeById.get(b)!;
      return n1.y === n2.y && Math.abs(p.y - n1.y) < 12 && p.x >= Math.min(n1.x, n2.x) - 12 && p.x <= Math.max(n1.x, n2.x) + 12;
    });
  const underBuilding = (p: { x: number; y: number }) =>
    BUILDINGS.some((b) => p.x > b.x - 8 && p.x < b.x + b.width + 8 && p.y > b.y - 8 && p.y < b.y + b.height + 10);
  return pts.filter((p) => !nearGateOrPath(p) && !underBuilding(p));
})();
const plateWidth = (code: string) => Math.max(22, 10 + code.length * 9);
const roofHeight = (b: Building) => Math.max(28, b.height - 30);

const doorOnRight = (b: Building) => b.x + b.width / 2 < SPINE_X;

function Windows({ b, top, doorX }: { b: Building; top: number; doorX: number }) {
  const count = Math.floor((b.width - 16) / 12);
  const startX = b.x + (b.width - (count * 12 - 5)) / 2;
  return (
    <G>
      {Array.from({ length: count }, (_, i) => {
        const x = startX + i * 12;
        if (Math.abs(x + 3.5 - doorX) < 10) return null;
        return <Rect key={i} x={x} y={top} width={7} height={8} rx={1.5} fill={WINDOW} opacity={0.9} />;
      })}
    </G>
  );
}

function BuildingShape({ b, selected, dimmed }: { b: Building; selected: boolean; dimmed: boolean }) {
  const pw = plateWidth(b.code);

  if (b.kind === 'area') {
    const bx = b.x + 44;
    const by = b.y + 16;
    return (
      <G opacity={dimmed ? 0.28 : 1}>
        <Rect x={b.x + 2} y={b.y + 3} width={b.width} height={b.height} rx={8} fill={WALL} opacity={0.12} />
        <Rect x={b.x} y={b.y} width={b.width} height={b.height} rx={8} fill="#D3DAE4" stroke={selected ? C.gold : '#AEB9C8'} strokeWidth={selected ? 3 : 1.5} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Line key={i} x1={b.x + 44 + i * 12} y1={b.y + 4} x2={b.x + 44 + i * 12} y2={b.y + 12} stroke={C.white} strokeWidth={1.5} />
        ))}
        <Ellipse cx={bx + 27} cy={by + 26} rx={28} ry={4} fill={WALL} opacity={0.2} />
        <Rect x={bx} y={by + 8} width={52} height={15} rx={4} fill="#A9232C" />
        <Rect x={bx} y={by} width={52} height={11} rx={4} fill={C.gold} />
        <Rect x={bx + 4} y={by + 2.5} width={44} height={2} rx={1} fill="#EE7778" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Rect key={i} x={bx + 4 + i * 8.5} y={by + 12} width={6.5} height={5} rx={1} fill="#EAF2FA" />
        ))}
        <Circle cx={bx + 11} cy={by + 23} r={3.2} fill={WALL} />
        <Circle cx={bx + 41} cy={by + 23} r={3.2} fill={WALL} />
        <Rect x={b.x + 6} y={b.y + 6} width={pw} height={19} rx={9.5} fill={WALL} />
        <SvgText x={b.x + 6 + pw / 2} y={b.y + 20} fontSize={11} fontFamily={FONT.heavy} fill={C.white} textAnchor="middle">
          {b.code}
        </SvgText>
        <SvgText x={b.x + 8} y={b.y + b.height - 6} fontSize={9.5} fontFamily={FONT.semibold} fill={WALL}>
          {b.shortName}
        </SvgText>
      </G>
    );
  }

  const roofH = roofHeight(b);
  const wallTop = b.y + roofH;
  const right = doorOnRight(b);
  const doorX = right ? b.x + b.width - 14 : b.x + 14;
  const foodCourt = b.id === '16';

  return (
    <G opacity={dimmed ? 0.28 : 1}>
      <Rect x={b.x + 4} y={b.y + 5} width={b.width} height={b.height} rx={9} fill={WALL} opacity={0.16} />
      <Rect x={b.x} y={b.y} width={b.width} height={b.height} rx={9} fill={selected ? WALL_SELECTED : WALL} />
      <Rect x={b.x} y={b.y} width={b.width} height={roofH} rx={9} fill={selected ? ROOF_SELECTED : ROOF} />
      <Rect x={b.x} y={wallTop - 6} width={b.width} height={6} fill={selected ? ROOF_SELECTED : ROOF} />
      <Line x1={b.x + 3} y1={wallTop} x2={b.x + b.width - 3} y2={wallTop} stroke={C.white} strokeOpacity={0.35} strokeWidth={1.5} />
      {foodCourt ? (
        <G>
          {Array.from({ length: Math.floor((b.width - 12) / 10) }, (_, i) => (
            <Rect key={i} x={b.x + 6 + i * 10} y={wallTop + 2} width={10} height={7} fill={i % 2 ? C.white : C.gold} />
          ))}
          <Path
            d={`M${b.x + 6} ${wallTop + 9} ${Array.from({ length: Math.floor((b.width - 12) / 10) }, () => `q5 5 10 0`).join(' ')}`}
            fill="none"
            stroke={C.gold}
            strokeWidth={1.5}
          />
        </G>
      ) : (
        <Windows b={b} top={wallTop + 4} doorX={doorX} />
      )}

      <Rect x={doorX - 5} y={b.y + b.height - 12} width={10} height={12} rx={2} fill={C.gold} />
      <Rect x={doorX - 3} y={b.y + b.height - 10} width={6} height={10} rx={1} fill={WALL} />
      <Rect x={b.x + 7} y={b.y + 5} width={pw} height={19} rx={9.5} fill={C.gold} />
      <SvgText x={b.x + 7 + pw / 2} y={b.y + 19} fontSize={11.5} fontFamily={FONT.heavy} fill={C.white} textAnchor="middle">
        {b.code}
      </SvgText>
      <SvgText
        x={right ? b.x + 8 : b.x + 26}
        y={b.y + b.height - 4}
        fontSize={b.width < 90 ? 9 : 10}
        fontFamily={FONT.semibold}
        fill={C.white}>
        {b.shortName}
      </SvgText>
      {selected && (
        <Rect x={b.x - 2} y={b.y - 2} width={b.width + 4} height={b.height + 4} rx={11} fill="none" stroke={C.gold} strokeWidth={3} />
      )}
    </G>
  );
}

const MIN_FOCUS_HEIGHT = 380;
function focusViewBox(route: MapPoint[], selected: Building | undefined) {
  const ys = [...route.map((p) => p.y), ...(selected ? [selected.y, selected.y + selected.height] : [])];
  let top = Math.min(...ys) - 50;
  let bottom = Math.max(...ys) + 50;
  if (bottom - top < MIN_FOCUS_HEIGHT) {
    const mid = (top + bottom) / 2;
    top = mid - MIN_FOCUS_HEIGHT / 2;
    bottom = mid + MIN_FOCUS_HEIGHT / 2;
  }
  top = Math.max(0, top);
  bottom = Math.min(MAP_HEIGHT, bottom);
  return `0 ${top} ${MAP_WIDTH} ${bottom - top}`;
}

export function CampusMap({ selectedBuildingId, highlightedBuildingIds, route, onSelectBuilding }: Props) {
  const routeString = route?.map((p) => `${p.x},${p.y}`).join(' ');
  const start = route?.[0];
  const end = route?.[route.length - 1];
  const selected = BUILDINGS.find((b) => b.id === selectedBuildingId);
  const viewBox = route ? focusViewBox(route, selected) : `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;
  const outlineRight = OUTLINE.x + OUTLINE.width;
  const isDimmed = (id: string) => (highlightedBuildingIds ? !highlightedBuildingIds.includes(id) : false);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [vx, vy, vw, vh] = viewBox.split(' ').map(Number);
  const scale = Math.min(size.width / vw, size.height / vh) || 0;
  const offsetX = (size.width - vw * scale) / 2 - vx * scale;
  const offsetY = (size.height - vh * scale) / 2 - vy * scale;

  return (
    <View
      style={{ width: '100%', height: '100%' }}
      onLayout={(e) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
      <Svg width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" accessibilityLabel="BUE campus map">
        <Rect x={0} y={0} width={MAP_WIDTH} height={MAP_HEIGHT} fill={C.ground} />
        <Rect
          x={OUTLINE.x}
          y={OUTLINE.y}
          width={OUTLINE.width}
          height={OUTLINE.height}
          rx={OUTLINE.radius}
          fill={CAMPUS_FILL}
          stroke={C.slate}
          strokeWidth={1.4}
        />
        {WALLS_Y.map((y) => (
          <G key={y}>
            <LowWall x1={OUTLINE.x + 14} x2={SPINE_X - 16} y={y} />
            <LowWall x1={SPINE_X + 16} x2={outlineRight - 14} y={y} />
          </G>
        ))}

        {LAWNS.map((lawn) => (
          <Lawn key={`lawn-${lawn.x}-${lawn.y}`} {...lawn} />
        ))}

        {THEATRES.map((t) => (
          <Theatre key={t.name} {...t} />
        ))}

        {[
          { colour: '#CBD4DF', width: 14 },
          { colour: C.white, width: 10 },
          { colour: '#E7ECF2', width: 1, dash: '3 5' },
        ].map((layer) => (
          <G key={layer.colour}>
            {EDGES.map(([a, b]) => {
              const p = nodeById.get(a)!;
              const q = nodeById.get(b)!;
              return (
                <Line
                  key={`${a}-${b}`}
                  x1={p.x}
                  y1={p.y}
                  x2={q.x}
                  y2={q.y}
                  stroke={layer.colour}
                  strokeWidth={layer.width}
                  strokeDasharray={layer.dash}
                  strokeLinecap={layer.dash ? 'butt' : 'round'}
                />
              );
            })}
          </G>
        ))}

        {PLAZAS.map((p) => (
          <Plaza key={`plaza-${p.y}`} {...p} />
        ))}
        <Fountain {...FOUNTAIN} />
        <Hedge points={HEDGE_POINTS} />
        {TREES.map((t) => (
          <Tree key={`tree-${t.x}-${t.y}`} {...t} />
        ))}
        {LAMPS.map((l) => (
          <Lamp key={`lamp-${l.y}`} {...l} />
        ))}

        {BUILDINGS.map((b) => (
          <G key={b.id} onPress={onSelectBuilding ? () => onSelectBuilding(b.id) : undefined} accessibilityLabel={`${b.title}, ${b.description}`}>
            <BuildingShape b={b} selected={b.id === selectedBuildingId} dimmed={isDimmed(b.id)} />
          </G>
        ))}

        {routeString && start && end && (
          <G>
            <Polyline points={routeString} fill="none" stroke={C.navy} strokeOpacity={0.18} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
            <Polyline points={routeString} fill="none" stroke={C.gold} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <Circle cx={start.x} cy={start.y} r={8} fill={C.white} stroke={C.navy} strokeWidth={4} />
            <Circle cx={end.x} cy={end.y} r={11} fill={C.gold} stroke={C.navy} strokeWidth={4} />
            <Circle cx={end.x} cy={end.y} r={3.5} fill={C.navy} />
          </G>
        )}

        {GATES.map((g) => (
          <G key={g.nodeId} accessibilityLabel={`Gate ${g.number}`}>
            <Gate x={g.x} y={g.y} number={g.number} side={g.side} />
            {g.number === 1 && (
              <SvgText x={g.x + 32} y={g.y + 4} fontSize={10} fontFamily={FONT.semibold} fill={C.navy}>
                Main Gate
              </SvgText>
            )}
          </G>
        ))}
      </Svg>
      {scale > 0 && (
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
          {BUILDINGS.filter((b) => b.kind !== 'area').flatMap((b) =>
            b.icons.map((icon, i) => {
              const x = b.x + b.width - 7 - (b.icons.length - i) * (ICON + 2);
              const y = b.y + 5;
              return (
                <MaterialCommunityIcons
                  key={`${b.id}-${icon}`}
                  name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={ICON * scale}
                  color={C.gold}
                  style={{
                    position: 'absolute',
                    left: offsetX + x * scale,
                    top: offsetY + y * scale,
                    opacity: isDimmed(b.id) ? 0.28 : 1,
                  }}
                />
              );
            }),
          )}
        </View>
      )}
    </View>
  );
}
