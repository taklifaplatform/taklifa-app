import {
  Almarai_300Light,
  Almarai_400Regular,
  Almarai_700Bold,
  Almarai_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/almarai';
import { useMultiLang } from '@zix/i18n';
import { MainAppProvider } from '@zix/providers';
import { SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback } from 'react';
import { Dimensions, LogBox, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from './CustomDrawerContent';
LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function MainAppLayout() {
  const { activeLang } = useMultiLang();
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  console.log("=============")
  console.log("MainAppLayout RENDER", Date.now())
  const [fontLoaded] = useFonts({
    Almarai_300Light: Almarai_300Light,
    Almarai: Almarai_400Regular,
    Almarai_400Regular: Almarai_400Regular,
    Almarai_700Bold: Almarai_700Bold,
    Almarai_800ExtraBold: Almarai_800ExtraBold,
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <MainAppProvider>

          <Drawer screenOptions={{
            headerShown: false,
            drawerPosition: activeLang === 'ar' ? 'right' : 'left',
            drawerStyle: {
              width: SCREEN_WIDTH * 0.8,
              paddingLeft: activeLang === 'en' ? 0 : 70
            },
            swipeEnabled: false
          }}
            drawerContent={() => <CustomDrawerContent />}
          >
          </Drawer>
        </MainAppProvider>
      </View>
    </GestureHandlerRootView >
  );
}
