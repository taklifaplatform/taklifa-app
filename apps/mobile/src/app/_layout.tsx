import {
  Almarai_300Light,
  Almarai_400Regular,
  Almarai_700Bold,
  Almarai_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/almarai';
import { MainAppProvider } from '@zix/app/providers/main-app-provider';
import { SplashScreen, Stack } from 'expo-router';
import React, { useCallback } from 'react';
import { LogBox, View } from 'react-native';

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  const [fontLoaded] = useFonts({
    Almarai_300Light,
    Almarai_400Regular,
    Almarai_700Bold,
    Almarai_800ExtraBold,
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
      <MainAppProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </MainAppProvider>
    </View>
  );
}
