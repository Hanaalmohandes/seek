import { createContext } from 'react';

import type { Preferences, Profile } from '../types';

export type PersonalHubValue = {
  profile: Profile;
  preferences: Preferences;
  favoriteIds: string[];
  loading: boolean;
  loadError: string | null;
  favoritesError: string | null;
  savingFavorites: boolean;
  savingProfile: boolean;
  reload: () => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  updateProfile: (profile: Profile, preferences: Preferences) => Promise<void>;
};

export const PersonalHubContext = createContext<PersonalHubValue | null>(null);
