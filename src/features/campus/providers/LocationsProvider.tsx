import type { PropsWithChildren } from 'react';

import { LocationsContext } from '../contexts/LocationsContext';
import { BUILDINGS } from '../data/campus';
import { LOCATIONS } from '../data/locations';

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
