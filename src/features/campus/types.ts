export type LocationType = 'faculty' | 'lab' | 'facility' | 'office';

export type CampusLocation = {
  id: string;
  name: string;
  type: LocationType;
  buildingId: string;
  floor: number | null;
  detail: string;

  latitude: number;
  longitude: number;
};

export type MapPoint = { x: number; y: number };

export type Building = {
  id: string;
  code: string;
  title: string;
  shortName: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  entranceNode: string;
  kind: 'academic' | 'service' | 'area';
  icons: string[];
};

export type WalkwayNode = MapPoint & { id: string };

export type StartPoint = {
  id: string;
  label: string;
  nodeId: string;
};

export type RouteStep = {
  instruction: string;
  metres: number;
};

export type Route = {
  points: MapPoint[];
  metres: number;
  minutes: number;
  steps: RouteStep[];
};
