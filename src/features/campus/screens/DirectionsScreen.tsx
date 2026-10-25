import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';
import { routes, type DirectionsParams } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { BuildingPlate } from '../components/BuildingPlate';
import { CampusMap } from '../components/CampusMap';
import { whereIs } from '../components/LocationCard';
import { START_POINTS } from '../data/campus';
import { sampleRoute } from '../data/samples';
import { useLocations } from '../hooks/useLocations';

export default function DirectionsScreen() {
  const insets = useSafeAreaInsets();
  const { id, from } = useLocalSearchParams<DirectionsParams>();
  const { getLocation, getBuilding } = useLocations();
  const [startId, setStartId] = useState(from ?? 'gate-1');

  const place = getLocation(id);
  const building = getBuilding(place?.buildingId ?? id);

  if (!building) {
    return (
      <View style={{ paddingTop: insets.top + 8 }} className="flex-1 bg-paper px-5">
        <IconButton icon="arrow-back" label="Go back" onPress={() => router.back()} />
        <View className="flex-1 items-center justify-center gap-3 px-4">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-apricot">
            <Ionicons name="help" size={30} color={colors.navy} />
          </View>
          <Text className="text-center font-heavy text-xl text-navy">This place isn’t on the map</Text>
          <Text className="text-center font-body text-sm text-slate">
            It may have been renamed or removed. Search again to pick another place.
          </Text>
          <View className="mt-2">
            <AppButton label="Search places" icon="search" onPress={() => router.replace(routes.search())} />
          </View>
        </View>
      </View>
    );
  }

  const title = place?.name ?? building.title;
  const route = sampleRoute(building);

  return (
    <View className="flex-1 bg-paper">
      <View style={{ height: '46%' }} className="bg-ground pb-6">
        <CampusMap selectedBuildingId={building.id} route={route.points} />
        <View style={{ top: insets.top + 8 }} className="absolute left-5">
          <IconButton icon="arrow-back" label="Go back" onPress={() => router.back()} />
        </View>
      </View>
      <ScrollView
        className="-mt-6 flex-1 rounded-t-3xl border-t border-line bg-white"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        contentContainerClassName="gap-5 px-5 pt-6">
        <View className="flex-row items-center gap-4">
          <BuildingPlate code={building.code} size="md" />
          <View className="flex-1">
            <Text className="font-heavy text-xl text-navy">{title}</Text>
            <Text className="font-body text-sm text-slate">
              {place ? whereIs(place, building) : building.description}
            </Text>
          </View>
        </View>
        <View className="gap-2 rounded-2xl bg-navy px-5 py-4">
          <View className="flex-row items-end gap-3">
            <Text className="font-heavy text-4xl text-white" style={{ includeFontPadding: false }}>
              {route.minutes} min
            </Text>
            <Text className="pb-1 font-body text-base text-white">{route.metres} m walk</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="accessibility" size={14} color={colors.apricot} />
            <Text className="font-body text-xs text-apricot">Step-free: ramps across campus walkways</Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-sm text-slate">Starting from</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            {START_POINTS.map((s) => {
              const active = s.id === startId;
              return <Chip key={s.id} label={s.label} selected={active} onPress={() => setStartId(s.id)} />;
            })}
          </ScrollView>
        </View>
        <View>
          {route.steps.map((step, i) => {
            const last = i === route.steps.length - 1;
            return (
              <View key={`${i}-${step.instruction}`} className="flex-row gap-4">
                <View className="items-center">
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-full ${last ? 'bg-gold' : 'bg-navy'}`}>
                    {last ? (
                      <Ionicons name="flag" size={15} color={colors.surface} />
                    ) : (
                      <Text className="font-heavy text-sm text-white">{i + 1}</Text>
                    )}
                  </View>
                  {!last && <View className="w-0.5 flex-1 bg-line" />}
                </View>
                <View className={`flex-1 pt-1 ${last ? '' : 'pb-5'}`}>
                  <Text className="font-semibold text-base text-navy">{step.instruction}</Text>
                  {step.metres > 0 && <Text className="font-body text-sm text-slate">{step.metres} m</Text>}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
