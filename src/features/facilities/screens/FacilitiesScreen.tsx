import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/AppButton';
import { categories, facilities, type Category } from '../data';

export default function FacilitiesScreen() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const results = facilities.filter(f => (category === 'All' || f.category === category) && `${f.name} ${f.building} ${f.services.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <ScrollView className="flex-1 bg-paper" contentContainerStyle={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: 32 }}>
    <Text className="font-heavy text-3xl text-navy">Facilities</Text>
    <Text className="mt-1 mb-5 font-body text-base text-slate">Everything you need around campus.</Text>
    <Input value={query} onChangeText={setQuery} icon="search" placeholder="Search facilities or services" accessibilityLabel="Search facilities" />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-4" contentContainerStyle={{ gap: 8 }}>{categories.map(c => <Chip key={c} label={c} selected={c === category} onPress={() => setCategory(c)} />)}</ScrollView>
    <Card className="mb-5 gap-3"><Text className="font-heavy text-lg text-navy">Campus updates</Text><Text className="font-body text-slate">Closures, maintenance and opening-hour changes.</Text><AppButton label="View announcements" icon="notifications-outline" onPress={() => router.push('/announcements')} /></Card>
    <Text className="mb-3 font-semibold text-sm text-slate">{results.length} facilities · Sample information</Text>
    <View className="gap-3">{results.map(f => <Card key={f.id} onPress={() => router.push({ pathname: '/facility/[id]', params: { id: f.id } })} accessibilityLabel={`View ${f.name}`} className="gap-2"><Text className="font-semibold text-xs text-slate">{f.category.toUpperCase()} · {f.building}</Text><Text className="font-heavy text-xl text-navy">{f.name}</Text><Text className="font-body text-slate">{f.description}</Text><Text className="font-semibold text-navy">View details →</Text></Card>)}</View>
    {!results.length && <Card className="gap-3"><Text className="font-heavy text-lg text-navy">No facilities found</Text><Text className="font-body text-slate">Try another category or search term.</Text><AppButton label="Clear filters" variant="secondary" onPress={() => { setQuery(''); setCategory('All'); }} /></Card>}
  </ScrollView>;
}
