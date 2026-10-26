import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_FAVORITES, DEFAULT_PREFERENCES, DEFAULT_PROFILE } from '../data/defaults';
import { PLACES } from '../data/places';
import type { Preferences, Profile } from '../types';

const FAVORITES_KEY = 'seek:hub:favorites';
const PROFILE_KEY = 'seek:hub:profile';
const PREFS_KEY = 'seek:hub:preferences';

export async function getFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!raw) return [...DEFAULT_FAVORITES];
  try {
    const ids: unknown = JSON.parse(raw);
    return Array.isArray(ids) ? [...new Set(ids.filter((id): id is string =>
      typeof id === 'string' && PLACES.some(place => place.id === id)))] : [...DEFAULT_FAVORITES];
  } catch { return [...DEFAULT_FAVORITES]; }
}
export async function saveFavorites(ids: string[]) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
export async function getProfile(): Promise<Profile> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return { ...DEFAULT_PROFILE };
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return { ...DEFAULT_PROFILE };
    const p = value as Record<string, unknown>;
    return {
      name: typeof p.name === 'string' ? p.name : DEFAULT_PROFILE.name,
      studentId: typeof p.studentId === 'string' ? p.studentId : DEFAULT_PROFILE.studentId,
      faculty: typeof p.faculty === 'string' ? p.faculty : '',
      email: typeof p.email === 'string' ? p.email : '',
      photoUri: typeof p.photoUri === 'string' ? p.photoUri : undefined,
    };
  } catch { return { ...DEFAULT_PROFILE }; }
}
export async function getPreferences(): Promise<Preferences> {
  const raw = await AsyncStorage.getItem(PREFS_KEY);
  if (!raw) return { ...DEFAULT_PREFERENCES };
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return { ...DEFAULT_PREFERENCES };
    const p = value as Record<string, unknown>;
    const times = ['10 minutes before', '15 minutes before', '30 minutes before', '1 hour before'];
    return {
      remindersEnabled: typeof p.remindersEnabled === 'boolean' ? p.remindersEnabled : true,
      reminderTime: typeof p.reminderTime === 'string' && times.includes(p.reminderTime) ? p.reminderTime : DEFAULT_PREFERENCES.reminderTime,
    };
  } catch { return { ...DEFAULT_PREFERENCES }; }
}
export async function saveProfileSettings(profile: Profile, prefs: Preferences) {
  await AsyncStorage.multiSet([
    [PROFILE_KEY, JSON.stringify(profile)],
    [PREFS_KEY, JSON.stringify(prefs)],
  ]);
}
