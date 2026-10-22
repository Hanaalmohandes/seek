// One place in a list: building plate, name, where it is, and its type icon.
// Like MovieCard in Lab 02: receives one typed `location` prop and links to its details
// (here, the Directions screen) with <Link asChild>.
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { routes } from '@/navigation/types';
import { C } from '@/theme/tokens';

import { floorLabel, TYPE_META } from '../data/locations';
import type { Building, CampusLocation } from '../types';
import { BuildingPlate } from './BuildingPlate';

type Props = {
  location: CampusLocation;
  building: Building;
  leadingIcon?: keyof typeof Ionicons.glyphMap; // e.g. a clock for recent searches
};

/** "Building A, ground floor" or just "Building A" when the floor isn't known. */
export function whereIs(location: CampusLocation, building: Building) {
  const floor = floorLabel(location.floor);
  return floor ? `${building.title}, ${floor}` : building.title;
}

export function LocationCard({ location, building, leadingIcon }: Props) {
  const where = whereIs(location, building);
  return (
    <Link href={routes.directions({ id: location.id })} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${location.name}, ${where}`}
        className="flex-row items-center gap-3.5 rounded-2xl px-3 py-3 active:bg-apricot/40">
        {leadingIcon ? (
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-ground">
            <Ionicons name={leadingIcon} size={18} color={C.slate} />
          </View>
        ) : (
          <BuildingPlate code={building.code} />
        )}
        <View className="flex-1">
          <Text className="font-semibold text-base text-navy" numberOfLines={1}>
            {location.name}
          </Text>
          <Text className="font-body text-sm text-slate" numberOfLines={1}>
            {where}
          </Text>
        </View>
        <Ionicons
          name={TYPE_META[location.type].icon as keyof typeof Ionicons.glyphMap}
          size={18}
          color={C.slate}
        />
      </Pressable>
    </Link>
  );
}
