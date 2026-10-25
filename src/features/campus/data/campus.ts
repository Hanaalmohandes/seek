import type { Building, StartPoint, WalkwayNode } from '../types';

export const MAP_WIDTH = 400;
export const MAP_HEIGHT = 1020;

export const METRES_PER_UNIT = 1;

export const OUTLINE = { x: 40, y: 20, width: 320, height: 980, radius: 160 };
export const WALLS_Y = [232, 800];
export const SPINE_X = 200;
const LEFT_EDGE = OUTLINE.x;
const RIGHT_EDGE = OUTLINE.x + OUTLINE.width;

const ROW_TOP = 252;
const ROW_H = 64;
const ROW_GAP = 16;
const LEFT_X = 62;
const RIGHT_X = 222;
const COL_W = 116;

const rowY = (row: number) => ROW_TOP + row * (ROW_H + ROW_GAP);
const rowCentre = (row: number) => rowY(row) + ROW_H / 2;
const gapBelow = (row: number) => rowY(row) + ROW_H + ROW_GAP / 2;

type Info = Omit<Building, 'x' | 'y' | 'width' | 'height' | 'entranceNode' | 'kind'> & {
  kind?: Building['kind'];
};

const LEFT: Info[] = [
  { icons: ['silverware-fork-knife', 'theater'], id: '16', code: '16', title: 'Building 16', shortName: 'Food Court', description: 'Food Court and Roman Theatre', kind: 'service' },
  { icons: ['lightning-bolt'], id: '15', code: '15', title: 'Building 15', shortName: 'E.E.E', description: 'Faculty of Energy and Environmental Engineering' },
  { icons: ['movie-open', 'feather'], id: '13', code: '13', title: 'Building 13', shortName: 'CMM & Arts', description: 'Faculty of Mass Communication, Faculty of Arts and Humanities' },
  { icons: ['mortar-pestle-plus'], id: '11', code: '11', title: 'Building 11', shortName: 'Pharmacy', description: 'Faculty of Pharmacy (has a clinic)' },
  { icons: ['book-open-variant'], id: '9', code: '9', title: 'Building 9', shortName: 'Library', description: 'Library', kind: 'service' },
  { icons: ['lightbulb-on'], id: 'G', code: 'G', title: 'Building G', shortName: 'BAEPS', description: 'Faculty of BAEPS (has a clinic)' },
  { icons: ['cogs'], id: 'A', code: 'A', title: 'Building A', shortName: 'Engineering', description: 'Faculty of Engineering' },
];

const RIGHT: Record<number, Info> = {
  2: { icons: ['scale-balance'], id: '14', code: '14', title: 'Building 14', shortName: 'Law', description: 'Faculty of Law' },
  3: { icons: ['tooth'], id: '12', code: '12', title: 'Building 12', shortName: 'Dentistry', description: 'Faculty of Dentistry and Dental Hospital' },
  4: { icons: ['school'], id: '10', code: '10', title: 'Building 10', shortName: 'SLC', description: 'SLC building' },
  5: { icons: ['monitor'], id: 'H', code: 'H', title: 'Building H', shortName: 'ICS', description: 'Faculty of Informatics and Computer Science' },
  6: { icons: ['account-circle'], id: 'B', code: 'B', title: 'Building B', shortName: 'IT Offices', description: 'IT offices' },
};

const GATE_SPECS: { id: string; number: number; side: 'left' | 'right' | 'bottom'; y: number }[] = [
  { id: 'gate-1', number: 1, side: 'bottom', y: OUTLINE.y + OUTLINE.height },
  { id: 'gate-2', number: 2, side: 'right', y: gapBelow(4) },
  { id: 'gate-3', number: 3, side: 'right', y: gapBelow(2) },
  { id: 'gate-4', number: 4, side: 'right', y: ROW_TOP - 8 },
  { id: 'gate-5', number: 5, side: 'right', y: 150 },
  { id: 'gate-6', number: 6, side: 'left', y: gapBelow(2) },
  { id: 'gate-7', number: 7, side: 'left', y: gapBelow(5) },
];

const buildings: Building[] = [];
const nodes: WalkwayNode[] = [];
const edges: [string, string][] = [];
const spineYs = new Set<number>();

function place(info: Info, x: number, y: number, width: number, height: number, door: { x: number; y: number }, spineY: number) {
  const id = `door-${info.id}`;
  buildings.push({ kind: 'academic', ...info, x, y, width, height, entranceNode: id });
  nodes.push({ id, ...door });
  edges.push([id, `spine-${spineY}`]);
  spineYs.add(spineY);
}

place(
  { icons: ['hospital-box'], id: '17', code: '17', title: 'Building 17', shortName: 'Nursing', description: 'Faculty of Nursing' },
  130, 66, 140, 58, { x: SPINE_X, y: 124 }, 150,
);
place(
  { icons: ['bus'], id: 'BUS', code: 'BUS', title: 'Buses Area', shortName: 'Buses', description: 'University buses pick-up and drop-off', kind: 'area' },
  222, 170, 100, 44, { x: 222, y: 192 }, 192,
);

place(
  { icons: ['palette'], id: '20', code: '20', title: 'Building 20', shortName: 'Arts & Design', description: 'Faculty of Arts and Design' },
  74, 162, 106, 58, { x: 180, y: 192 }, 192,
);

LEFT.forEach((info, row) => {
  place(info, LEFT_X, rowY(row), COL_W, ROW_H, { x: LEFT_X + COL_W, y: rowCentre(row) }, rowCentre(row));
});
Object.entries(RIGHT).forEach(([row, info]) => {
  const r = Number(row);
  place(info, RIGHT_X, rowY(r), COL_W, ROW_H, { x: RIGHT_X, y: rowCentre(r) }, rowCentre(r));
});

place(
  { icons: ['presentation'], id: 'C', code: 'C', title: 'Building C', shortName: 'Auditorium', description: 'Auditorium and Top Management' },
  108, 814, 80, 60, { x: 188, y: 844 }, 844,
);
place(
  { icons: ['medal'], id: 'E', code: 'E', title: 'Building E', shortName: 'Admission', description: 'Admission Building' },
  86, 886, 82, 60, { x: 168, y: 916 }, 916,
);
place(
  { icons: ['bank'], id: 'D', code: 'D', title: 'Building D', shortName: 'English Dept', description: 'English Department' },
  232, 886, 82, 60, { x: 232, y: 916 }, 916,
);

export const GATES = GATE_SPECS.map((g) => {
  const x = g.side === 'left' ? LEFT_EDGE : g.side === 'right' ? RIGHT_EDGE : SPINE_X;
  nodes.push({ id: g.id, x, y: g.y });
  if (g.side === 'bottom') {
    edges.push([g.id, 'spine-bottom']);
  } else {
    edges.push([g.id, `spine-${g.y}`]);
    spineYs.add(g.y);
  }
  return { nodeId: g.id, number: g.number, side: g.side, x, y: g.y };
});

const sortedSpine = [...spineYs].sort((a, b) => a - b);
sortedSpine.forEach((y) => nodes.push({ id: `spine-${y}`, x: SPINE_X, y }));
for (let i = 1; i < sortedSpine.length; i++) edges.push([`spine-${sortedSpine[i - 1]}`, `spine-${sortedSpine[i]}`]);
nodes.push({ id: 'spine-bottom', x: SPINE_X, y: 960 });
edges.push([`spine-${sortedSpine[sortedSpine.length - 1]}`, 'spine-bottom']);

export const BUILDINGS = buildings;
export const NODES = nodes;
export const EDGES = edges;

export const START_POINTS: StartPoint[] = [
  ...GATES.map((g) => ({ id: g.nodeId, label: g.number === 1 ? 'Gate 1 (Main)' : `Gate ${g.number}`, nodeId: g.nodeId })),
  ...buildings.map((b) => ({ id: `from-${b.id}`, label: b.title, nodeId: b.entranceNode })),
];

export const LAWNS = [
  { x: RIGHT_X, y: rowY(1), width: COL_W, height: ROW_H }, // garden beside Building 15
];

export const TREES: { x: number; y: number; r: number }[] = [
  { x: 98, y: 92, r: 10 },
  { x: 302, y: 92, r: 10 },
  { x: 116, y: 128, r: 7 },
  { x: 286, y: 130, r: 7 },
  { x: 334, y: 196, r: 7 },
  { x: 90, y: 836, r: 9 },
  { x: 214, y: 960, r: 6 },
];
LAWNS.forEach((lawn) => {
  TREES.push(
    { x: lawn.x + lawn.width * 0.22, y: lawn.y + lawn.height * 0.4, r: 7 },
    { x: lawn.x + lawn.width * 0.55, y: lawn.y + lawn.height * 0.62, r: 8 },
    { x: lawn.x + lawn.width * 0.82, y: lawn.y + lawn.height * 0.35, r: 6 },
  );
});

export const PLAZAS = GATES.filter((g) => g.side !== 'bottom' && g.y !== gapBelow(2)).map((g) => ({ x: SPINE_X, y: g.y }));

export const THEATRES = [
  { name: 'Roman Theatre', x: RIGHT_X + COL_W / 2, y: rowY(0) + ROW_H - 12, radius: 44 },
  { name: 'Open-Air Theatre', x: 266, y: 858, radius: 42 },
];

export const FOUNTAIN = { x: SPINE_X, y: gapBelow(2) };

export const LAMPS = LEFT.map((_, row) => ({ x: SPINE_X + (row % 2 ? 12 : -12), y: rowY(row) + 18 }));
