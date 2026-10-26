import type { Href } from 'expo-router';

export type MainTabParamList = {
  index: undefined;
  search: { q?: string };
  schedule: undefined;
  facilities: undefined;
  map: undefined;
  profile: undefined;
};

export type RootStackParamList = {
  '(tabs)': { screen: keyof MainTabParamList };
  favorites: undefined;
  'building/[id]': { id: string };
  'directions/[id]': { id: string; from?: string };
  'facility/[id]': { id: string };
  announcements: { facilityId?: string };
  'lecture/[id]': { id: string };
  'lecture/edit': { id?: string };
};

export type BuildingParams = RootStackParamList['building/[id]'];
export type DirectionsParams = RootStackParamList['directions/[id]'];
export type SearchParams = MainTabParamList['search'];
export type LectureParams = RootStackParamList['lecture/[id]'];
export type LectureFormParams = RootStackParamList['lecture/edit'];

export const routes = {
  home: (): Href => '/',
  favorites: (): Href => '/favorites',
  profile: (): Href => '/profile',
  announcements: (): Href => '/announcements',
  facilities: (): Href => '/facilities',
  map: (): Href => '/map',
  search: (params: SearchParams = {}): Href => ({ pathname: '/search', params }),
  building: ({ id }: BuildingParams): Href => ({ pathname: '/building/[id]', params: { id } }),
  directions: ({ id, from }: DirectionsParams): Href => ({
    pathname: '/directions/[id]',
    params: from ? { id, from } : { id },
  }),
  schedule: (): Href => '/schedule',
  lecture: ({ id }: LectureParams): Href => ({ pathname: '/lecture/[id]', params: { id } }),
  lectureForm: ({ id }: LectureFormParams = {}): Href => ({
    pathname: '/lecture/edit',
    params: id ? { id } : {},
  }),
};
