import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useCallback } from 'react';
import { LogBox, View } from 'react-native';

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  const [fontLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
