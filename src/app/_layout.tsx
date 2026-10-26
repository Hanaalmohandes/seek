import '../../global.css';

import {
  Overpass_400Regular,
  Overpass_600SemiBold,
  Overpass_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/overpass';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { LocationsProvider } from '@/features/campus/hooks/useLocations';
import { ScheduleProvider } from '@/features/schedule/hooks/useSchedule';
import { colors } from '@/theme/tokens';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Overpass_400Regular,
    Overpass_600SemiBold,
    Overpass_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <LocationsProvider>
      <ScheduleProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ contentStyle: { backgroundColor: colors.paper } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="building/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="directions/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="facility/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="announcements" options={{ headerShown: false }} />
          <Stack.Screen name="favorites" options={{ headerShown: false }} />
          <Stack.Screen name="lecture/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="lecture/edit" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
      </ScheduleProvider>
    </LocationsProvider>
  );
}
