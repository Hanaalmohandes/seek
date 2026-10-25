import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { routes, type SearchParams } from '@/navigation/types';

import { BuildingPlate } from '../components/BuildingPlate';
import { LocationCard } from '../components/LocationCard';
import { SAMPLE_RECENT_IDS, SAMPLE_RESULT_IDS } from '../data/samples';
import { useLocations } from '../hooks/useLocations';
import type { Building, CampusLocation } from '../types';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<SearchParams>();
  const { buildings, getBuilding, getLocation } = useLocations();

  const [query, setQuery] = useState(params.q ?? '');

  const withBuilding = (ids: string[]) =>
    ids.flatMap((id) => {
      const place = getLocation(id);
      const building = place && getBuilding(place.buildingId);
      return place && building ? [{ place, building }] : [];
    });
  const recent = withBuilding(SAMPLE_RECENT_IDS);
  const results = withBuilding(SAMPLE_RESULT_IDS);
  const showResults = query.length > 0;

  return (
    <View style={{ paddingTop: insets.top + 8 }} className="flex-1 bg-paper">
      <View className="px-5 pb-4">
        <Text className="font-heavy text-3xl text-navy">Search</Text>
      </View>
      <View className="px-5 pb-4">
        <Input
          value={query}
          onChangeText={setQuery}
          icon="search"
          autoCorrect={false}
          returnKeyType="search"
          placeholder="Faculty, lab, office or building"
          accessibilityLabel="Search places on campus"
        />
      </View>
      {showResults ? (
        <FlatList
          key="results"
          data={results}
          keyExtractor={(r) => r.place.id}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-2 pb-10"
          ListHeaderComponent={
            <Text className="px-4 pb-1 font-body text-sm text-slate">{results.length} places</Text>
          }
          renderItem={({ item }) => <LocationCard location={item.place} building={item.building} plateTone="navy" />}
        />
      ) : (
        <FlatList
          key="browse"
          data={buildings}
          keyExtractor={(b) => b.id}
          numColumns={2}
          keyboardShouldPersistTaps="handled"
          columnWrapperClassName="gap-3"
          contentContainerClassName="gap-3 px-5 pb-10"
          ListHeaderComponent={<RecentList recent={recent} />}
          renderItem={({ item }) => (
            <View className="flex-1">
              <Link href={routes.building({ id: item.id })} asChild>
                <Card
                  accessibilityLabel={`${item.title}, ${item.shortName}`}
                  className="flex-row items-center gap-3">
                  <BuildingPlate code={item.code} tone="navy" />
                  <View className="flex-1">
                    <Text className="font-semibold text-sm text-navy" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text className="font-body text-xs text-slate" numberOfLines={1}>
                      {item.shortName}
                    </Text>
                  </View>
                </Card>
              </Link>
            </View>
          )}
        />
      )}
    </View>
  );
}

function RecentList({ recent }: { recent: { place: CampusLocation; building: Building }[] }) {
  return (
    <View className="gap-1 pb-2">
      <View className="pb-4">
        <Text className="pb-1 font-heavy text-base text-navy">Recent</Text>
        {recent.map(({ place, building }) => (
          <LocationCard key={place.id} location={place} building={building} leadingIcon="time-outline" />
        ))}
      </View>
      <Text className="font-heavy text-base text-navy">Browse by building</Text>
    </View>
  );
}
