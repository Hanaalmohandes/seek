// Typed navigation: one param list per navigator.
// Expo Router builds the navigators from the files in src/app, so these types describe
// each route's params and are used with useLocalSearchParams<...>() and the href helpers below.
import type { Href } from 'expo-router';

/** Bottom tabs — src/app/(tabs)/_layout.tsx */
export type MainTabParamList = {
  facilities: undefined;
  index: undefined; // Campus Map
  search: { q?: string }; // Location Search, optionally pre-filled
};

/** Root stack — src/app/_layout.tsx */
export type RootStackParamList = {
  'facility/[id]': { id: string };
  announcements: { facilityId?: string };
  '(tabs)': { screen: keyof MainTabParamList }; // the nested tab navigator
  'building/[id]': { id: string }; // building id, e.g. "12"
  'directions/[id]': { id: string; from?: string }; // place or building id, optional start point id
};

export type BuildingParams = RootStackParamList['building/[id]'];
export type DirectionsParams = RootStackParamList['directions/[id]'];
export type SearchParams = MainTabParamList['search'];

// Typed links, so a wrong route name or a missing param is a compile error.
export const routes = {
  map: (): Href => '/',
  search: (params: SearchParams = {}): Href => ({ pathname: '/search', params }),
  building: ({ id }: BuildingParams): Href => ({ pathname: '/building/[id]', params: { id } }),
  directions: ({ id, from }: DirectionsParams): Href => ({
    pathname: '/directions/[id]',
    params: from ? { id, from } : { id },
  }),
};
