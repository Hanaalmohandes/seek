// Bottom tabs (MainTabParamList in @/navigation/types).
// Member 1's tabs are Map and Search; teammates add their feature's tabs here.
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors, fonts } from '@/theme/tokens';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.slate,
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 12 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'map.fill', android: 'map', web: 'map' }} tintColor={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen name="facilities" options={{ title: 'Facilities', tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'building.2.fill', android: 'apartment', web: 'apartment' }} tintColor={color} size={26} /> }} />
    </Tabs>
  );
}
