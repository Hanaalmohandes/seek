import type { ExpoConfig } from 'expo/config';

const variant = process.env.APP_VARIANT ?? 'development';
const production = variant === 'production';
const staging = variant === 'staging';

const bundleId = production ? 'com.seekteam.seek' : `com.seekteam.seek.${variant}`;

export default <ExpoConfig>{
  name: production ? 'Seek' : staging ? 'Seek (Staging)' : 'Seek (Dev)',
  slug: 'seek',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'seek',
  userInterfaceStyle: 'automatic',
  ios: { supportsTablet: true, bundleIdentifier: bundleId },
  android: {
    package: bundleId,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: { bundler: 'metro', output: 'single', favicon: './assets/images/favicon.png' },
  plugins: [
    'expo-router',
    ['expo-image-picker', {
      photosPermission: 'Allow Seek to choose your profile photo.',
      cameraPermission: 'Allow Seek to take your profile photo.',
      microphonePermission: false,
    }],
    [
      'expo-splash-screen',
      { image: './assets/images/splash-icon.png', resizeMode: 'contain', backgroundColor: '#ffffff' },
    ],
  ],
  experiments: { typedRoutes: true },
};
