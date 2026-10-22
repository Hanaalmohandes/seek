// Shared button. Owns its look, pressed state and accessibility;
// the feature only decides what happens on press (Lab 03: one `variant` prop, not many booleans).
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import { colors } from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
};

const STYLES: Record<Variant, { box: string; text: string; icon: string }> = {
  primary: { box: 'bg-navy active:bg-navy-soft', text: 'text-white', icon: colors.gold },
  secondary: { box: 'border border-line bg-surface active:bg-apricot/40', text: 'text-navy', icon: colors.navy },
  ghost: { box: 'active:bg-apricot/40', text: 'text-slate', icon: colors.slate },
};

export function AppButton({ label, onPress, variant = 'primary', icon, disabled = false }: Props) {
  const s = STYLES[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={{ opacity: disabled ? 0.5 : 1 }}
      className={`flex-row items-center justify-center gap-2 rounded-md px-5 py-3.5 ${s.box}`}>
      {icon && <Ionicons name={icon} size={20} color={s.icon} />}
      <Text className={`font-heavy text-base ${s.text}`}>{label}</Text>
    </Pressable>
  );
}
