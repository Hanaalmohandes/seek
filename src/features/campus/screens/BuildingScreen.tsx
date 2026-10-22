// Building Details (UC1: Navigate Campus). Route: src/app/building/[id].tsx
// UI prototype: an illustrated building, its key facts and the places inside,
// with a button to get directions. Opening hours are sample content.
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { routes, type BuildingParams } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { BuildingHero } from '../components/BuildingHero';
import { BuildingPlate } from '../components/BuildingPlate';
import { LocationCard } from '../components/LocationCard';
import { LOCATION_TYPES, TYPE_META } from '../data/locations';
import { SAMPLE_HOURS } from '../data/samples';
import { useLocations } from '../hooks/useLocations';

function Fact({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <Card variant="muted" className="flex-1 gap-1">
      <Ionicons name={icon} size={18} color={colors.gold} />
      <Text className="font-body text-xs text-slate">{label}</Text>
      <Text className="font-semibold text-sm text-navy" numberOfLines={2}>
        {value}
      </Text>
    </Card>
  );
}

export default function BuildingScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<BuildingParams>();
  const { getBuilding, locationsIn } = useLocations();
  const building = getBuilding(id);

  // Error state: the link points to a building that isn't on the map.
  if (!building) {
    return (
      <View style={{ paddingTop: insets.top + 8 }} className="flex-1 bg-paper px-5">
        <IconButton icon="arrow-back" label="Go back" onPress={() => router.back()} />
        <View className="flex-1 items-center justify-center gap-3 px-4">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-apricot">
            <Ionicons name="business-outline" size={28} color={colors.navy} />
          </View>
          <Text className="text-center font-heavy text-xl text-navy">This building isn’t on the map</Text>
          <Text className="text-center font-body text-sm text-slate">
            Pick a building from the map or the Search tab.
          </Text>
          <View className="mt-2">
            <AppButton label="Back to map" icon="map-outline" onPress={() => router.replace(routes.map())} />
          </View>
        </View>
      </View>
    );
  }

  const places = locationsIn(building.id);
  const groups = LOCATION_TYPES.map((type) => ({
    type,
    items: places.filter((p) => p.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <View className="flex-1 bg-paper">
      {/* Illustration */}
      <View style={{ height: 250 }}>
        <BuildingHero building={building} />
        <View style={{ top: insets.top + 8 }} className="absolute left-5">
          <IconButton icon="arrow-back" label="Go back" onPress={() => router.back()} />
        </View>
      </View>

      <ScrollView
        className="-mt-6 flex-1 rounded-t-3xl border-t border-line bg-surface"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        contentContainerClassName="gap-5 px-5 pt-6">
        {/* Title */}
        <View className="flex-row items-center gap-4">
          <BuildingPlate code={building.code} size="md" />
          <View className="flex-1">
            <Text className="font-heavy text-2xl text-navy">{building.title}</Text>
            <Text className="font-body text-sm text-slate">{building.description}</Text>
          </View>
          <View className="flex-row gap-1">
            {building.icons.map((icon) => (
              <MaterialCommunityIcons
                key={icon}
                name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={24}
                color={colors.gold}
              />
            ))}
          </View>
        </View>

        {/* Key facts */}
        <View className="flex-row gap-3">
          <Fact icon="layers-outline" label="Places inside" value={`${places.length}`} />
          <Fact icon="accessibility" label="Access" value="Step-free" />
          <Fact icon="time-outline" label="Open Sun–Thu" value={SAMPLE_HOURS} />
        </View>

        <Link href={routes.directions({ id: building.id })} asChild>
          <AppButton label="Get directions" icon="walk" />
        </Link>

        {/* Places inside, grouped by type */}
        <View className="gap-4">
          <Text className="font-heavy text-lg text-navy">Inside this building</Text>
          {groups.length === 0 ? (
            <Text className="font-body text-sm text-slate">No places listed for this building yet.</Text>
          ) : (
            groups.map((group) => (
              <View key={group.type} className="gap-1">
                <Text className="font-semibold text-sm text-slate">{TYPE_META[group.type].label}</Text>
                {group.items.map((place) => (
                  <LocationCard key={place.id} location={place} building={building} />
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
