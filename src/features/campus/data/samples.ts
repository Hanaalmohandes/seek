import type { Building, MapPoint, Route } from '../types';
import { NODES, SPINE_X } from './campus';

export const SAMPLE_RECENT_IDS = ['library', 'ics', 'food-court'];

export const SAMPLE_RESULT_IDS = ['dentistry', 'dental-hospital', 'dental-labs', 'law'];

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

export const SAMPLE_HOURS = '8 am – 5 pm';
