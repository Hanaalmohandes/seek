import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { announcements } from '@/features/facilities';
import { formatTime, useSchedule, type Day } from '@/features/schedule';
import { routes } from '@/navigation/types';
import { fonts } from '@/theme/tokens';

import { C, Screen, Header, Card, SectionTitle, common } from '../components/HubUI';
import { usePersonalHub } from '../hooks/usePersonalHub';

export default function HomeScreen() {
  const { lecturesOn } = useSchedule();
  const { profile, favoriteIds, loading, loadError, reload } = usePersonalHub();
  const name = profile.name;
  const savedCount = favoriteIds.length;

  const now = new Date();
  const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
  const lectures = day === 'fri' || day === 'sat' ? [] : lecturesOn(day as Day);
  const time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  const next = lectures.find(lecture => lecture.end > time);
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const notice = announcements[0];

  return (
    <Screen>
      <View style={s.topline}>
        <View style={s.brandMark}><Ionicons name="school" size={22} color={C.navy} /></View>
        <View style={{ flex: 1 }}><Text style={s.brand}>PERSONAL HUB</Text><Text style={s.campus}>Your campus, organized</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Campus announcements" style={s.bell} onPress={() => router.push(routes.announcements())}>
          <Ionicons name="notifications-outline" size={22} color={C.navy} /><View style={s.bellDot} />
        </Pressable>
      </View>
      <Header eyebrow={now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        title={`${greeting}, ${name.split(' ')[0] || 'student'}`} subtitle="Here’s what your day looks like." />
      {loadError && <View style={{ marginBottom: 16 }}>
        <Text style={s.error}>{loadError}</Text>
        <Pressable accessibilityRole="button" onPress={() => void reload()}><Text style={s.action}>Retry saved details</Text></Pressable>
      </View>}
      <View style={s.statsRow}>
        <View style={s.statCard}><Text style={s.statNumber}>{String(lectures.length).padStart(2, '0')}</Text><Text style={s.statLabel}>Lectures today</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel={loading ? 'Loading saved places' : loadError ? 'Saved places unavailable' : `${savedCount} saved places`} onPress={() => router.push(routes.favorites())} style={[s.statCard, s.statCardPale]}>
          <Text style={[s.statNumber, { color: C.navy }]}>{loading || loadError ? '—' : String(savedCount).padStart(2, '0')}</Text><Text style={[s.statLabel, { color: C.muted }]}>Saved places</Text>
        </Pressable>
      </View>
      <SectionTitle title="Your campus shortcuts" />
      <View style={s.shortcuts}>
        {[
          { label: 'Favorites', detail: 'Your saved places', icon: 'bookmark-outline' as const, href: routes.favorites() },
          { label: 'Campus map', detail: 'Find your way', icon: 'map-outline' as const, href: routes.map() },
          { label: 'Search', detail: 'Find a place', icon: 'search-outline' as const, href: routes.search() },
          { label: 'Profile', detail: 'Details & settings', icon: 'person-outline' as const, href: routes.profile() },
        ].map(item => <Pressable key={item.label} accessibilityRole="button" accessibilityLabel={item.label} onPress={() => router.push(item.href)} style={s.shortcut}>
          <View style={s.shortcutIcon}><Ionicons name={item.icon} size={22} color={C.navy} /></View>
          <Text style={s.shortcutTitle}>{item.label}</Text><Text style={s.shortcutDetail}>{item.detail}</Text>
        </Pressable>)}
      </View>
      <SectionTitle title="Up next" action="Full schedule" onAction={() => router.push(routes.schedule())} />
      <Card style={{ borderColor: C.gold }}>
        {next ? <>
          <View style={common.between}>
            <View style={s.nextBadge}><Ionicons name="time-outline" size={13} color={C.navy} /><Text style={s.nextBadgeText}>{next.start <= time ? 'IN PROGRESS' : 'NEXT CLASS'}</Text></View>
            <Text style={s.sample}>Sample timetable</Text>
          </View>
          <Text style={s.nextTitle}>{next.courseName}</Text>
          <View style={s.detailLine}><Ionicons name="time-outline" size={16} color={C.muted} /><Text style={s.detailText}>{formatTime(next.start)} – {formatTime(next.end)}</Text></View>
          <View style={s.detailLine}><Ionicons name="location-outline" size={16} color={C.muted} /><Text style={s.detailText}>{next.room}</Text></View>
          <View style={s.rule} />
          <Pressable style={common.between} accessibilityRole="button" onPress={() => router.push(routes.directions({ id: next.locationId }))}>
            <Text style={s.action}>Get directions</Text><Ionicons name="arrow-forward" size={16} color={C.navy} />
          </Pressable>
        </> : <><Ionicons name="sunny-outline" size={28} color={C.gold} /><Text style={s.nextTitle}>A little room to breathe</Text><Text style={s.detailText}>No more classes in today’s sample timetable. Explore campus or check your next day.</Text></>}
      </Card>
      <SectionTitle title="Today's lectures" action="See all" onAction={() => router.push(routes.schedule())} />
      {lectures.map(lecture => <Pressable key={lecture.id} accessibilityRole="button" onPress={() => router.push(routes.lecture({ id: lecture.id }))}>
        <Card style={s.lectureCard}>
          <View style={s.lectureIcon}><Ionicons name="book-outline" size={20} color={C.navy} /></View>
          <View style={{ flex: 1 }}><Text style={s.lectureTitle}>{lecture.courseName}</Text><Text style={s.lectureRoom}>{lecture.room}</Text></View>
          <View style={s.timeBox}><Text style={s.timeText}>{formatTime(lecture.start)}</Text></View>
        </Card>
      </Pressable>)}
      {lectures.length === 0 && <Text style={[s.detailText, { marginBottom: 20 }]}>No lectures scheduled today.</Text>}
      <SectionTitle title="Campus announcement" action="Latest" onAction={() => router.push(routes.announcements())} />
      {notice && <Card>
        <View style={common.row}>
          <View style={s.announcementIcon}><Ionicons name="megaphone-outline" size={20} color={C.navy} /></View>
          <View style={{ flex: 1 }}><Text style={s.announcementTag}>CAMPUS NEWS · EXAMPLE</Text><Text style={s.announcementTitle}>{notice.en.title}</Text></View>
        </View>
        <Text style={s.announcementBody}>{notice.en.body}</Text>
      </Card>}
    </Screen>
  );
}

const s = StyleSheet.create({
  shortcuts: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 22 },
  shortcut: { width: '47%', flexGrow: 1, backgroundColor: C.white, borderRadius: 18, borderWidth: 1, borderColor: C.border, padding: 15 },
  shortcutIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  shortcutTitle: { color: C.navy, fontSize: 14, fontFamily: fonts.heavy },
  shortcutDetail: { color: C.muted, fontSize: 11, fontFamily: fonts.body, marginTop: 3 },
  topline: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 26 },
  brandMark: { width: 43, height: 43, borderRadius: 15, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center' },
  brand: { color: C.navy, fontSize: 12, fontFamily: fonts.heavy, letterSpacing: 1.7 },
  campus: { color: C.muted, fontSize: 12, fontFamily: fonts.body, marginTop: 3 },
  bell: { width: 42, height: 42, borderRadius: 14, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  bellDot: { position: 'absolute', width: 7, height: 7, borderRadius: 4, backgroundColor: C.gold, top: 8, right: 9 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  statCard: { flex: 1, borderRadius: 18, backgroundColor: C.navy, padding: 17 },
  statCardPale: { backgroundColor: C.goldPale, borderWidth: 1, borderColor: C.border },
  statNumber: { fontSize: 27, fontFamily: fonts.heavy, color: C.white },
  statLabel: { color: '#E3EAF2', fontSize: 12, marginTop: 4, fontFamily: fonts.semibold },
  nextBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.goldPale, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 6 },
  nextBadgeText: { color: C.navy, fontSize: 10, fontFamily: fonts.heavy, letterSpacing: 0.8 },
  sample: { fontSize: 10, color: C.muted, fontFamily: fonts.body },
  nextTitle: { fontSize: 20, color: C.navy, fontFamily: fonts.heavy, marginTop: 17, marginBottom: 12 },
  detailLine: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  detailText: { color: C.muted, fontSize: 13, fontFamily: fonts.body, lineHeight: 20 },
  rule: { height: 1, backgroundColor: C.border, marginTop: 8, marginBottom: 11 },
  action: { color: C.navy, fontFamily: fonts.heavy, fontSize: 13 },
  lectureCard: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 13, marginBottom: 10 },
  lectureIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center' },
  lectureTitle: { color: C.text, fontSize: 13, fontFamily: fonts.heavy, marginBottom: 4 },
  lectureRoom: { color: C.muted, fontSize: 11, fontFamily: fonts.body },
  timeBox: { backgroundColor: C.background, paddingVertical: 7, paddingHorizontal: 8, borderRadius: 9 },
  timeText: { color: C.navy, fontSize: 10, fontFamily: fonts.semibold },
  announcementIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  announcementTag: { color: C.gold, fontSize: 9, fontFamily: fonts.heavy, letterSpacing: 1 },
  announcementTitle: { color: C.navy, fontSize: 15, fontFamily: fonts.heavy, marginTop: 4 },
  announcementBody: { color: C.muted, fontSize: 13, fontFamily: fonts.body, lineHeight: 20, marginTop: 13 },
  error: { color: C.red, fontSize: 13, marginBottom: 12 },
});
