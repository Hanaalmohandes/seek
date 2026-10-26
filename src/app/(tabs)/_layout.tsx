import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { colors, fonts } from '@/theme/tokens';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.navy,
      tabBarInactiveTintColor: colors.slate,
      tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 11 },
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor={color} size={26} />,
      }} />
      <Tabs.Screen name="map" options={{
        title: 'Map',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'map.fill', android: 'map', web: 'map' }} tintColor={color} size={26} />,
      }} />
      <Tabs.Screen name="schedule" options={{
        title: 'Schedule',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }} tintColor={color} size={26} />,
      }} />
      <Tabs.Screen name="facilities" options={{
        title: 'Facilities',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'building.2.fill', android: 'apartment', web: 'apartment' }} tintColor={color} size={26} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' }} tintColor={color} size={26} />,
      }} />
      <Tabs.Screen name="search" options={{ href: null }} />
    </Tabs>
  );
}
