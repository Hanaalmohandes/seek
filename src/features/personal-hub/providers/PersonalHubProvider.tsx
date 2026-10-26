import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';

import { PersonalHubContext } from '../contexts/PersonalHubContext';
import { DEFAULT_PREFERENCES, DEFAULT_PROFILE } from '../data/defaults';
import { PLACES } from '../data/places';
import { getFavorites, getPreferences, getProfile, saveFavorites, saveProfileSettings } from '../services/storage';
import type { Preferences, Profile } from '../types';

async function readSavedData() {
  const [profile, preferences, favoriteIds] = await Promise.all([getProfile(), getPreferences(), getFavorites()]);
  return { profile, preferences, favoriteIds };
}

export function PersonalHubProvider({ children }: PropsWithChildren) {
  const [saved, setSaved] = useState({ profile: DEFAULT_PROFILE, preferences: DEFAULT_PREFERENCES, favoriteIds: [] as string[] });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);
  const [savingFavorites, setSavingFavorites] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const ready = useRef(false);
  const favoritesRef = useRef<string[]>([]);
  const favoritesWrite = useRef(false);
  const profileWrite = useRef(false);
  const loadingRef = useRef(true);

  const acceptSavedData = useCallback((data: Awaited<ReturnType<typeof readSavedData>>) => {
    favoritesRef.current = data.favoriteIds;
    ready.current = true;
    setSaved(data);
    setLoadError(null);
    setFavoritesError(null);
  }, []);

  useEffect(() => {
    let active = true;
    readSavedData()
      .then(data => { if (active) acceptSavedData(data); })
      .catch(() => { if (active) setLoadError('Your saved details could not be loaded. Please try again.'); })
      .finally(() => {
        if (active) { loadingRef.current = false; setLoading(false); }
      });
    return () => { active = false; };
  }, [acceptSavedData]);

  const reload = useCallback(async () => {
    if (loadingRef.current || favoritesWrite.current || profileWrite.current) return;
    loadingRef.current = true;
    ready.current = false;
    setLoading(true);
    setLoadError(null);
    try { acceptSavedData(await readSavedData()); }
    catch { setLoadError('Your saved details could not be loaded. Please try again.'); }
    finally { loadingRef.current = false; setLoading(false); }
  }, [acceptSavedData]);

  const toggleFavorite = useCallback(async (id: string) => {
    if (!ready.current || favoritesWrite.current || !PLACES.some(place => place.id === id)) return;
    favoritesWrite.current = true;
    const previous = favoritesRef.current;
    const next = previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id];
    favoritesRef.current = next;
    setSaved(current => ({ ...current, favoriteIds: next }));
    setSavingFavorites(true);
    setFavoritesError(null);
    try { await saveFavorites(next); }
    catch {
      favoritesRef.current = previous;
      setSaved(current => ({ ...current, favoriteIds: previous }));
      setFavoritesError('Your change could not be saved. Please try again.');
    } finally { favoritesWrite.current = false; setSavingFavorites(false); }
  }, []);

  const updateProfile = useCallback(async (profile: Profile, preferences: Preferences) => {
    if (!ready.current) throw new Error('Your saved details are not ready. Please try again.');
    if (profileWrite.current) throw new Error('Your profile is already being saved.');
    profileWrite.current = true;
    setSavingProfile(true);
    const nextProfile = { ...profile, name: profile.name.trim(), studentId: profile.studentId.trim(), faculty: profile.faculty.trim(), email: profile.email.trim() };
    const nextPreferences = { ...preferences };
    try {
      await saveProfileSettings(nextProfile, nextPreferences);
      setSaved(current => ({ ...current, profile: nextProfile, preferences: nextPreferences }));
    } finally { profileWrite.current = false; setSavingProfile(false); }
  }, []);

  const value = useMemo(() => ({ ...saved, loading, loadError, favoritesError, savingFavorites, savingProfile, reload, toggleFavorite, updateProfile }),
    [saved, loading, loadError, favoritesError, savingFavorites, savingProfile, reload, toggleFavorite, updateProfile]);

  return <PersonalHubContext.Provider value={value}>{children}</PersonalHubContext.Provider>;
}
