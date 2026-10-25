import type { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

type Variant = 'surface' | 'muted';

type Props = PropsWithChildren<{
  variant?: Variant;
  onPress?: () => void;
  accessibilityLabel?: string;
  className?: string;
}>;

const STYLES: Record<Variant, string> = {
  surface: 'border border-line bg-surface',
  muted: 'bg-paper',
};

export function Card({ variant = 'surface', onPress, accessibilityLabel, className = '', children }: Props) {
  const classes = `rounded-md p-3 ${STYLES[variant]} ${className}`;
  if (!onPress) return <View className={classes}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`${classes} active:bg-apricot/40`}>
      {children}
    </Pressable>
  );
}
