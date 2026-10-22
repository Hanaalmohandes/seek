import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center gap-4 bg-white p-6">
        <Text className="text-xl font-bold">This screen doesn&apos;t exist.</Text>
        <Link href="/" className="text-primary underline">
          Go to the dashboard
        </Link>
      </View>
    </>
  );
}
