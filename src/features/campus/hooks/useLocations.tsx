import { createContext, useContext, type PropsWithChildren } from 'react';

import { BUILDINGS } from '../data/campus';
import { LOCATIONS } from '../data/locations';
import type { Building, CampusLocation } from '../types';

type LocationsValue = {
  locations: CampusLocation[];
  buildings: Building[];
  getLocation: (id: string) => CampusLocation | undefined;
  getBuilding: (id: string) => Building | undefined;
  locationsIn: (buildingId: string) => CampusLocation[];
};

const LocationsContext = createContext<LocationsValue | null>(null);

export function LocationsProvider({ children }: PropsWithChildren) {
  const locations = LOCATIONS;
  const buildings = BUILDINGS;

  const getLocation = (id: string) => locations.find((l) => l.id === id);
  const getBuilding = (id: string) => buildings.find((b) => b.id === id);
  const locationsIn = (buildingId: string) => locations.filter((l) => l.buildingId === buildingId);

  return (
    <LocationsContext.Provider value={{ locations, buildings, getLocation, getBuilding, locationsIn }}>
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocations() {
  const value = useContext(LocationsContext);
  if (!value) throw new Error('useLocations must be inside LocationsProvider');
  return value;
}
