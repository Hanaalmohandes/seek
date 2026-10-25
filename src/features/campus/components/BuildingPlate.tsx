import { Text, View } from 'react-native';

const SIZES = {
  sm: { box: 'h-10 min-w-10 rounded-xl px-1.5', text: ['text-lg', 'text-base', 'text-sm'] },
  md: { box: 'h-12 min-w-12 rounded-2xl px-2', text: ['text-2xl', 'text-xl', 'text-base'] },
  lg: { box: 'h-16 min-w-16 rounded-2xl px-2', text: ['text-4xl', 'text-3xl', 'text-xl'] },
};

export function BuildingPlate({ code, size = 'sm', tone = 'accent' }: { code: string; size?: keyof typeof SIZES; tone?: 'accent' | 'navy' }) {
  const s = SIZES[size];
  const text = s.text[Math.min(code.length, 3) - 1];
  return (
    <View className={`items-center justify-center ${tone === 'navy' ? 'border border-gold bg-navy' : 'bg-gold'} ${s.box}`}>
      <Text className={`font-heavy text-white ${text}`} style={{ includeFontPadding: false }}>
        {code}
      </Text>
    </View>
  );
}
