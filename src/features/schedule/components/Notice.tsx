import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/theme/tokens';

type Variant = 'error' | 'info';

type Props = {
  title: string;
  message?: string;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
};

export function Notice({ title, message, variant = 'error', icon, actionLabel, onAction }: Props) {
  const error = variant === 'error';
  return (
    <View
      accessibilityRole="alert"
      className={`flex-row items-start gap-3 rounded-md border p-3 ${
        error ? 'border-danger/40 bg-danger/10' : 'border-gold/50 bg-apricot/40'
      }`}>
      <Ionicons
        name={icon ?? (error ? 'alert-circle' : 'information-circle')}
        size={20}
        color={error ? colors.danger : colors.navy}
      />
      <View className="flex-1 gap-0.5">
        <Text className={`font-semibold text-sm ${error ? 'text-danger' : 'text-navy'}`}>{title}</Text>
        {message && <Text className="font-body text-sm text-slate">{message}</Text>}
      </View>
      {actionLabel && (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8} className="active:opacity-70">
          <Text className="font-heavy text-sm text-navy underline">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
