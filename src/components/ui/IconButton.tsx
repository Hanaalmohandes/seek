// Shared round icon button (back, close).
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

import { colors } from '@/theme/tokens';

type Variant = 'outline' | 'filled';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string; // read by screen readers
  onPress: () => void;
  variant?: Variant;
};

export function IconButton({ icon, label, onPress, variant = 'outline' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      className={`h-11 w-11 items-center justify-center rounded-full active:opacity-70 ${
        variant === 'outline' ? 'border border-line bg-surface' : 'bg-ground'
      }`}>
      <Ionicons name={icon} size={20} color={colors.navy} />
    </Pressable>
  );
}
