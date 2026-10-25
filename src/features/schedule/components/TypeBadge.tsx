import { Text, View } from 'react-native';

import { colors } from '@/theme/tokens';

import { TYPE_META } from '../data/samples';
import type { LectureType } from '../types';

export const TYPE_COLORS: Record<LectureType, { bar: string; bg: string; text: string }> = {
  lecture: { bar: colors.navy, bg: colors.navy, text: colors.surface },
  lab: { bar: colors.gold, bg: colors.gold, text: colors.surface },
  tutorial: { bar: '#8FA6C4', bg: colors.apricot, text: colors.navy },
};

export function TypeBadge({ type, onDark = false }: { type: LectureType; onDark?: boolean }) {
  const c = onDark && type === 'lecture' ? { bg: colors.surface, text: colors.navy } : TYPE_COLORS[type];
  return (
    <View style={{ backgroundColor: c.bg }} className="rounded-full px-2 py-0.5">
      <Text style={{ color: c.text }} className="font-semibold text-[11px]">
        {TYPE_META[type].label}
      </Text>
    </View>
  );
}
