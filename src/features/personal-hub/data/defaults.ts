import type { Preferences, Profile } from '../types';

export const DEFAULT_FAVORITES = ['library', 'food-court'];
export const DEFAULT_PROFILE: Profile = { name: 'Hana', studentId: '239489', faculty: '', email: '' };
export const DEFAULT_PREFERENCES: Preferences = { remindersEnabled: true, reminderTime: '30 minutes before' };
