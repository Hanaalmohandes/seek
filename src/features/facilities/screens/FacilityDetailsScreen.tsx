import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { routes } from '@/navigation/types';
import { facilities, announcements } from '../data';

export default function FacilityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const facility = facilities.find(f => f.id === id);
  return <ScrollView className="flex-1 bg-paper" contentContainerStyle={{ paddingTop: insets.top + 8, padding: 20, gap: 18, paddingBottom: 40 }}>
    <AppButton label="Back to facilities" variant="ghost" icon="arrow-back" onPress={() => router.replace('/facilities')} />
    {!facility ? <Card className="gap-2"><Text className="font-heavy text-xl text-navy">Facility not found</Text><Text className="font-body text-slate">Return to the list and choose a facility.</Text></Card> : <>
      <View className="rounded-lg bg-navy p-6"><Text className="font-semibold text-sm text-gold">{facility.category.toUpperCase()}</Text><Text className="mt-3 font-heavy text-3xl text-white">{facility.name}</Text><Text className="mt-3 font-body text-base text-white">{facility.description}</Text></View>
      <Text className="font-body text-xs text-slate">Phase 1 sample · Verify hours with the university.</Text>
      <Card className="gap-3"><Text className="font-heavy text-lg text-navy">Location</Text><Text className="font-body text-base text-slate">{facility.building} · BUE campus</Text><AppButton label="Get directions" icon="navigate-outline" onPress={() => router.push(routes.directions({ id: facility.locationId }))} /></Card>
      <Card className="gap-2"><Text className="font-heavy text-lg text-navy">Opening hours</Text><Text className="font-body text-base text-slate">{facility.hours}</Text></Card>
      <Card className="gap-3"><Text className="font-heavy text-lg text-navy">Services</Text>{facility.services.map(s => <Text key={s} className="font-body text-base text-slate">• {s}</Text>)}</Card>
      <AppButton label={`Facility announcements (${announcements.filter(a => a.facilityId === id).length})`} variant="secondary" icon="notifications-outline" onPress={() => router.push({ pathname: '/announcements', params: { facilityId: id } })} />
    </>}
  </ScrollView>;
}
