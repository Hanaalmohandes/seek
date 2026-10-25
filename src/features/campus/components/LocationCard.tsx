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
  plateTone?: 'accent' | 'navy';
  leadingIcon?: keyof typeof Ionicons.glyphMap;
};

export function whereIs(location: CampusLocation, building: Building) {
  const floor = floorLabel(location.floor);
  return floor ? `${building.title}, ${floor}` : building.title;
}

export function LocationCard({ location, building, leadingIcon, plateTone }: Props) {
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
          <BuildingPlate code={building.code} tone={plateTone} />
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
