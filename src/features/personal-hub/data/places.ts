import { BUILDINGS, LOCATIONS, TYPE_META } from '@/features/campus';

import type { CampusPlace } from '../types';

const featuredIds = ['library', 'food-court', 'ics', 'eng-labs', 'pharmacy-clinic', 'copy-center'];
export const PLACES: CampusPlace[] = featuredIds.flatMap(id => {
  const place = LOCATIONS.find(item => item.id === id);
  const building = place && BUILDINGS.find(item => item.id === place.buildingId);
  return place && building ? [{ id, name: place.name, detail: building.title + ' · ' + place.detail,
    category: TYPE_META[place.type].label, icon: TYPE_META[place.type].icon as CampusPlace['icon'] }] : [];
});
