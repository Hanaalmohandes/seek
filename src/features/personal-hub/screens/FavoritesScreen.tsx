import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { routes } from '@/navigation/types';
import { fonts } from '@/theme/tokens';
import { C, Screen, Header, Card, SectionTitle } from '../components/HubUI';
import { CampusPlace, getFavorites, saveFavorites, PLACES } from '../data/localData';

export default function FavoritesScreen() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getFavorites()
      .then(ids => { if (active) setFavoriteIds(ids); })
      .catch(() => { if (active) setError('Could not load favorites. Please reopen this screen.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const toggle = async (place: CampusPlace) => {
    if (saving || loading) return;
    const previous = favoriteIds;
    const next = favoriteIds.includes(place.id)
      ? favoriteIds.filter(id => id !== place.id)
      : [...favoriteIds, place.id];
    setFavoriteIds(next);
    setSaving(true);
    setError('');
    try { await saveFavorites(next); }
    catch { setFavoriteIds(previous); setError('Your change could not be saved. Please try again.'); }
    finally { setSaving(false); }
  };

  const saved = PLACES.filter(place => favoriteIds.includes(place.id));
  return (
    <View style={s.page}>
      <Screen back>
        <Header eyebrow="YOUR CAMPUS SHORTCUTS" title="Favorites" subtitle="Keep the places you use most close at hand." />
        <View style={s.summary}>
          <View style={s.summaryIcon}><Ionicons name="bookmark" size={20} color={C.navy} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.summaryTitle}>{loading ? 'Loading saved places…' : `${favoriteIds.length} saved ${favoriteIds.length === 1 ? 'place' : 'places'}`}</Text>
            <Text style={s.summaryText}>Pinned locations are saved on this device.</Text>
          </View>
        </View>

        {!!error && <Text accessibilityLiveRegion="polite" style={{ color: C.red, marginBottom: 12 }}>{error}</Text>}
        <SectionTitle title="Pinned places" />
        {loading ? <ActivityIndicator color={C.navy} style={{ marginTop: 30 }} /> : saved.length === 0 ? (
          <Card style={s.empty}>
            <View style={s.emptyIcon}><Ionicons name="bookmark-outline" size={28} color={C.navy} /></View>
            <Text style={s.emptyTitle}>No favorites yet</Text>
            <Text style={s.emptyText}>Pin a campus location below and it will appear here.</Text>
          </Card>
        ) : saved.map(place => (
          <PlaceCard key={place.id} place={place} pinned disabled={saving} onToggle={() => toggle(place)} />
        ))}

        <SectionTitle title="Explore campus" />
        {!loading && PLACES.filter(place => !favoriteIds.includes(place.id)).map(place => (
          <PlaceCard key={place.id} place={place} pinned={false} disabled={saving} onToggle={() => toggle(place)} />
        ))}
      </Screen>
    </View>
  );
}

function PlaceCard({ place, pinned, onToggle, disabled }: { place: CampusPlace; pinned: boolean; onToggle: () => void; disabled: boolean }) {
  return (
    <Card style={s.placeCard}>
      <View style={s.placeIcon}><Ionicons name={place.icon} size={21} color={C.navy} /></View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Directions to ${place.name}`} onPress={() => router.push(routes.directions({ id: place.id }))} style={{ flex: 1 }}>
        <Text style={s.placeCategory}>{place.category.toUpperCase()}</Text>
        <Text style={s.placeName}>{place.name}</Text>
        <Text style={s.placeDetail}>{place.detail}</Text>
      </Pressable>
      <Pressable disabled={disabled} accessibilityRole="button" accessibilityState={{ selected: pinned, disabled }} onPress={onToggle} accessibilityLabel={pinned ? `Unpin ${place.name}` : `Pin ${place.name}`} style={[s.pinButton, pinned && s.pinButtonActive]}>
        <Ionicons name={pinned ? 'bookmark' : 'bookmark-outline'} size={18} color={pinned ? C.white : C.navy} />
      </Pressable>
    </Card>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.background },
  summary: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.goldPale, borderRadius: 18, padding: 16, marginBottom: 23, borderWidth: 1, borderColor: C.border },
  summaryIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
  summaryTitle: { color: C.navy, fontSize: 15, fontFamily: fonts.heavy },
  summaryText: { color: C.muted, fontSize: 12, marginTop: 4 },
  placeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 },
  placeIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#EEF2F8', alignItems: 'center', justifyContent: 'center' },
  placeCategory: { color: C.gold, fontSize: 9, fontFamily: fonts.heavy, letterSpacing: 1 },
  placeName: { color: C.navy, fontSize: 14, fontFamily: fonts.heavy, marginTop: 4 },
  placeDetail: { color: C.muted, fontSize: 11, marginTop: 4 },
  pinButton: { width: 38, height: 38, borderRadius: 12, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center' },
  pinButtonActive: { backgroundColor: C.navy },
  empty: { alignItems: 'center', paddingVertical: 30 },
  emptyIcon: { width: 58, height: 58, borderRadius: 20, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center', marginBottom: 13 },
  emptyTitle: { color: C.navy, fontSize: 17, fontFamily: fonts.heavy },
  emptyText: { color: C.muted, fontSize: 13, textAlign: 'center', marginTop: 7, lineHeight: 19, maxWidth: 250 },
});
