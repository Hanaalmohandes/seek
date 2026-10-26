import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { routes } from '@/navigation/types';
import { colors, fonts } from '@/theme/tokens';

export const C = {
  navy: colors.navy, navy2: colors['navy-soft'], gold: colors.gold, goldPale: colors.apricot,
  background: colors.paper, white: colors.surface, text: colors.navy, muted: colors.slate,
  border: colors.line, green: '#23845B', red: colors.danger,
};

export function Screen({ children, back = false }: PropsWithChildren<{ back?: boolean }>) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false}>
        {back && <Pressable accessibilityRole="button" accessibilityLabel="Back to Home" onPress={() => router.canGoBack() ? router.back() : router.replace(routes.home())} style={styles.back}>
          <Ionicons name="arrow-back" size={20} color={C.navy} /><Text style={styles.action}>Back</Text>
        </Pressable>}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Header({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return <View style={styles.header}>
    {eyebrow && <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>}
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>;
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <View style={styles.sectionRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action && onAction && <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
      <Text style={styles.action}>{action}</Text>
    </Pressable>}
  </View>;
}

export function PrimaryButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityState={{ disabled: !!disabled }}
    style={[styles.primaryButton, disabled && { opacity: 0.55 }]}>
    <Text style={styles.primaryButtonText}>{title}</Text>
  </Pressable>;
}

export const common = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconCircle: { width: 42, height: 42, borderRadius: 14, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center' },
  muted: { color: C.muted, fontSize: 13, fontFamily: fonts.body },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', minHeight: 44, marginBottom: 12 },
  header: { marginBottom: 22 },
  eyebrow: { color: C.gold, fontSize: 11, fontFamily: fonts.heavy, letterSpacing: 1.8, marginBottom: 7 },
  title: { color: C.navy, fontSize: 29, fontFamily: fonts.heavy, letterSpacing: -0.5 },
  subtitle: { color: C.muted, fontSize: 14, fontFamily: fonts.body, lineHeight: 20, marginTop: 7 },
  card: { backgroundColor: C.white, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 17, marginBottom: 15 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontFamily: fonts.heavy, color: C.navy },
  action: { color: C.navy2, fontSize: 13, fontFamily: fonts.semibold },
  primaryButton: { backgroundColor: C.navy, borderRadius: 14, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: C.white, fontSize: 15, fontFamily: fonts.heavy },
});
