// Shared text input with an optional leading icon and a clear button.
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '@/theme/tokens';

type Props = Omit<TextInputProps, 'style'> & {
  value: string;
  onChangeText: (text: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: boolean;
};

export function Input({ value, onChangeText, icon, error = false, ...rest }: Props) {
  return (
    <View
      className={`flex-row items-center gap-2 rounded-md border-2 bg-surface px-4 ${
        error ? 'border-danger' : 'border-navy'
      }`}>
      {icon && <Ionicons name={icon} size={18} color={colors.navy} />}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.slate}
        className="flex-1 py-3 font-body text-base text-navy outline-none"
        {...rest}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Clear" hitSlop={10}>
          <Ionicons name="close-circle" size={20} color={colors.slate} />
        </Pressable>
      )}
    </View>
  );
}
