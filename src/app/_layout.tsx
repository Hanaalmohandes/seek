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
import { colors } from '@/theme/tokens';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

// Root stack (RootStackParamList in @/navigation/types), wrapped in the feature's provider.
// Navigators are chosen by movement: tabs for the equal areas (Map, Search),
// stack screens for drilling down into one building or place (building/[id], directions/[id]).
// Expo Router creates the NavigationContainer, so we don't add one.
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Overpass_400Regular,
    Overpass_600SemiBold,
    Overpass_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  // If the fonts fail to load the app still opens with the system font.
  if (!fontsLoaded && !fontError) return null;

  return (
    <LocationsProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ contentStyle: { backgroundColor: colors.paper } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="building/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="directions/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="facility/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="announcements" options={{ headerShown: false }} />
      </Stack>
    </LocationsProvider>
  );
}
