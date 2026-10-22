// Sample content for the Phase 1 UI prototype. Nothing here is computed from user input:
// the screens show these fixed examples so every state of the UI can be seen and reviewed.
// Phase 2 replaces them with real search, saved recent searches and real route-finding.
import type { Building, MapPoint, Route } from '../types';
import { NODES, SPINE_X } from './campus';

/** Shown under "Recent" on the Search screen. */
export const SAMPLE_RECENT_IDS = ['library', 'ics', 'food-court'];

/** Shown as results whenever something is typed in the Search box. */
export const SAMPLE_RESULT_IDS = ['dentistry', 'dental-hospital', 'dental-labs', 'law'];

/** Shown on the Directions screen: a preview path from Gate 1 up the main walkway to the building. */
export function sampleRoute(building: Building): Route {
  const gate = NODES.find((n) => n.id === 'gate-1')!;
  const door = NODES.find((n) => n.id === building.entranceNode)!;
  const points: MapPoint[] = [gate, { x: SPINE_X, y: door.y }, door];
  const side = door.x < SPINE_X ? 'left' : 'right';
  return {
    points,
    metres: 350,
    minutes: 5,
    steps: [
      { instruction: 'Enter through Gate 1 (Main)', metres: 0 },
      { instruction: 'Walk straight up the main walkway', metres: 300 },
      { instruction: `Turn ${side} towards ${building.title}`, metres: 50 },
      { instruction: `Arrive at ${building.title}`, metres: 0 },
    ],
  };
}

/** Shown on the Building Details screen until real opening hours are added. */
export const SAMPLE_HOURS = '8 am – 5 pm';
