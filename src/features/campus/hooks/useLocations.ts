import { useContext } from 'react';

import { LocationsContext } from '../contexts/LocationsContext';

export function useLocations() {
  const value = useContext(LocationsContext);
  if (!value) throw new Error('useLocations must be inside LocationsProvider');
  return value;
}
