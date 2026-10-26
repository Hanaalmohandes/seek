import type Ionicons from '@expo/vector-icons/Ionicons';

export type CampusPlace = { id: string; name: string; detail: string; category: string; icon: keyof typeof Ionicons.glyphMap };
export type Profile = { name: string; studentId: string; faculty: string; email: string; photoUri?: string };
export type Preferences = { remindersEnabled: boolean; reminderTime: string };
