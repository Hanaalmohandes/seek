// Campus Map tab (UC1: Navigate Campus). Route: src/app/(tabs)/index.tsx
// UI prototype: tapping a building opens its panel; filter chips show their selected state only.
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { routes } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { BuildingPlate } from '../components/BuildingPlate';
import { CampusMap } from '../components/CampusMap';
import { TypeChips } from '../components/TypeChips';
import { MAP_HEIGHT, MAP_WIDTH } from '../data/campus';
import { TYPE_META } from '../data/locations';
import { useLocations } from '../hooks/useLocations';
import type { LocationType } from '../types';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { buildings, getBuilding, locationsIn } = useLocations();
  const [filter, setFilter] = useState<LocationType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapScroll = useRef<ScrollView>(null);
  const openedAtGate = useRef(false);

  const selected = selectedId ? getBuilding(selectedId) : undefined;
  const places = selected ? locationsIn(selected.id) : [];

  return (
    <View className="flex-1 bg-paper">
      {/* Header: title, search and filters */}
      <View style={{ paddingTop: insets.top + 12 }} className="gap-4 pb-4">
        <View className="px-5">
          <Text className="font-heavy text-3xl text-navy">Seek</Text>
          <Text className="font-body text-sm text-slate">Find any room on campus</Text>
        </View>

        <Link href={routes.search()} asChild>
          <Pressable
            accessibilityRole="search"
            accessibilityLabel="Search for a faculty, lab or office"
            className="mx-5 flex-row items-center gap-3 rounded-md border border-line bg-surface px-4 py-3.5 active:opacity-80">
            <Ionicons name="search" size={20} color={colors.navy} />
            <Text className="flex-1 font-body text-base text-slate">Search faculties, labs, offices</Text>
          </Pressable>
        </Link>

        <TypeChips value={filter} onChange={setFilter} />
      </View>

      {/* Map: full width for legible labels; scroll to see the whole campus */}
      <View className="flex-1 bg-ground">
        <ScrollView
          ref={mapScroll}
          contentContainerClassName="pb-8"
          onContentSizeChange={() => {
            // Open at the Main Gate end of campus.
            if (!openedAtGate.current) {
              openedAtGate.current = true;
              mapScroll.current?.scrollToEnd({ animated: false });
            }
          }}>
          <View style={{ width: '100%', aspectRatio: MAP_WIDTH / MAP_HEIGHT }}>
            <CampusMap
              selectedBuildingId={selectedId}
              onSelectBuilding={(id) => setSelectedId(id === selectedId ? null : id)}
            />
          </View>
        </ScrollView>
      </View>

      {/* Bottom sheet: selected building, or the list of buildings */}
      <View className="-mt-5 rounded-t-3xl border-t border-line bg-surface pb-4 pt-5">
        {selected ? (
          <Animated.View key={selected.id} entering={FadeInDown.duration(220)}>
            <View className="gap-4 px-5">
              <View className="flex-row items-center gap-4">
                <BuildingPlate code={selected.code} size="lg" />
                <View className="flex-1">
                  <Text className="font-heavy text-xl text-navy">{selected.title}</Text>
                  <Text className="font-body text-sm text-slate" numberOfLines={2}>
                    {selected.description}
                  </Text>
                </View>
                <IconButton
                  icon="close"
                  label="Close building"
                  variant="filled"
                  onPress={() => setSelectedId(null)}
                />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
                {places.map((place) => (
                  <Link key={place.id} href={routes.directions({ id: place.id })} asChild>
                    <Pressable className="rounded-md bg-paper px-3 py-2 active:bg-apricot/50">
                      <Text className="font-semibold text-sm text-navy">{place.name}</Text>
                      <Text className="font-body text-xs text-slate">{TYPE_META[place.type].label}</Text>
                    </Pressable>
                  </Link>
                ))}
              </ScrollView>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Link href={routes.building({ id: selected.id })} asChild>
                    <AppButton label="Details" icon="business-outline" variant="secondary" />
                  </Link>
                </View>
                <View className="flex-1">
                  <Link href={routes.directions({ id: selected.id })} asChild>
                    <AppButton label="Directions" icon="walk" />
                  </Link>
                </View>
              </View>
            </View>
          </Animated.View>
        ) : (
          <View className="gap-3">
            <Text className="px-5 font-semibold text-base text-navy">Tap a building, or pick one here</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-3 px-5">
              {buildings.map((b) => {
                return (
                  <View key={b.id}>
                    <Card
                      variant="muted"
                      onPress={() => setSelectedId(b.id)}
                      accessibilityLabel={`${b.title}, ${b.shortName}`}
                      className="w-32 gap-2">
                      <View className="items-start">
                        <BuildingPlate code={b.code} />
                      </View>
                      <View>
                        <Text className="font-semibold text-sm text-navy" numberOfLines={1}>
                          {b.title}
                        </Text>
                        <Text className="font-body text-xs text-slate" numberOfLines={1}>
                          {b.shortName}
                        </Text>
                      </View>
                    </Card>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
