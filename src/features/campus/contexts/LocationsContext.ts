import { createContext } from 'react';

import type { Building, CampusLocation } from '../types';

export type LocationsValue = {
  locations: CampusLocation[];
  buildings: Building[];
  getLocation: (id: string) => CampusLocation | undefined;
  getBuilding: (id: string) => Building | undefined;
  locationsIn: (buildingId: string) => CampusLocation[];
};

export const LocationsContext = createContext<LocationsValue | null>(null);
