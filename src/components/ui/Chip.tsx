import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import { colors } from '@/theme/tokens';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function Chip({ label, selected, onPress, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`flex-row items-center gap-1.5 rounded-full border px-3.5 py-2 ${
        selected ? 'border-navy bg-navy' : 'border-line bg-surface'
      }`}>
      {icon && <Ionicons name={icon} size={15} color={selected ? colors.gold : colors.slate} />}
      <Text className={`font-semibold text-sm ${selected ? 'text-white' : 'text-navy'}`}>{label}</Text>
    </Pressable>
  );
}
