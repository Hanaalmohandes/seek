import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { announcements, facilities } from '../data';

export default function AnnouncementsScreen() {
  const params = useLocalSearchParams<{ facilityId?: string }>();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [type, setType] = useState('All');
  const [onlyFacility, setOnlyFacility] = useState(Boolean(params.facilityId));
  const notices = announcements.filter(a => (!onlyFacility || a.facilityId === params.facilityId) && (type === 'All' || a.type === type));
  return <ScrollView className="flex-1 bg-paper" contentContainerStyle={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: 40 }}>
    <AppButton label="Back to facilities" variant="ghost" icon="arrow-back" onPress={() => router.replace('/facilities')} />
    <Text className="mt-4 font-heavy text-3xl text-navy">{language === 'en' ? 'Announcements' : 'الإعلانات'}</Text>
    <Text className="mt-2 mb-4 font-body text-slate">Sample notices · Bundled English / Arabic text</Text>
    <View className="mb-4 flex-row gap-2"><Chip label="English" selected={language === 'en'} onPress={() => setLanguage('en')} /><Chip label="العربية" selected={language === 'ar'} onPress={() => setLanguage('ar')} /></View>
    <ScrollView horizontal className="mb-5" contentContainerStyle={{ gap: 8 }}>{['All', 'Closure', 'Maintenance', 'Hours'].map(t => <Chip key={t} label={t} selected={type === t} onPress={() => setType(t)} />)}</ScrollView>
    {onlyFacility && <View className="mb-4"><AppButton label="Show all facilities" variant="secondary" onPress={() => setOnlyFacility(false)} /></View>}
    <View className="gap-4">{notices.map(a => <Card key={a.id} className="gap-3"><Text className="font-semibold text-xs text-slate">{a.type.toUpperCase()} · {a.date}</Text><Text className="font-heavy text-xl text-navy" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>{a[language].title}</Text><Text className="font-body text-base text-slate" style={{ textAlign: language === 'ar' ? 'right' : 'left', writingDirection: language === 'ar' ? 'rtl' : 'ltr' }}>{a[language].body}</Text><AppButton label={facilities.find(f => f.id === a.facilityId)?.name ?? 'View facility'} variant="secondary" onPress={() => router.push({ pathname: '/facility/[id]', params: { id: a.facilityId } })} /></Card>)}</View>
    {!notices.length && <Card className="gap-2"><Text className="font-heavy text-lg text-navy">No announcements</Text><Text className="font-body text-slate">There are no sample notices matching this filter.</Text><AppButton label="Reset filters" onPress={() => { setType('All'); setOnlyFacility(false); }} /></Card>}
  </ScrollView>;
}
