// Types for the campus feature (map, search, directions).

export type LocationType = 'faculty' | 'lab' | 'facility' | 'office';

export type CampusLocation = {
  id: string;
  name: string;
  type: LocationType;
  buildingId: string; // links to Building.id
  floor: number | null; // null = floor not recorded yet
  detail: string; // one short line shown under the name
  // Real-world position, used when the map switches to Google Maps in Phase 2.
  latitude: number;
  longitude: number;
};

// A point on the illustrated campus map (map units, not metres).
export type MapPoint = { x: number; y: number };

export type Building = {
  id: string;
  code: string; // shown on the plate, e.g. "A", "11", "LIB"
  title: string; // full name, e.g. "Building A" or "Food Court"
  shortName: string; // label drawn on the map, e.g. "Engineering"
  description: string;
  x: number; // top-left corner on the map
  y: number;
  width: number;
  height: number;
  entranceNode: string; // walkway node where the building's door is
  kind: 'academic' | 'service' | 'area';
  icons: string[]; // MaterialCommunityIcons names drawn on the map, matching the printed campus map
};

export type WalkwayNode = MapPoint & { id: string };

export type StartPoint = {
  id: string;
  label: string;
  nodeId: string;
};

export type RouteStep = {
  instruction: string;
  metres: number; // 0 for the final "arrive" step
};

export type Route = {
  points: MapPoint[]; // the path to draw on the map
  metres: number;
  minutes: number;
  steps: RouteStep[];
};
