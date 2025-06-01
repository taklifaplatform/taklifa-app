import { ChatProvider } from '@zix/features/chat';
import { themeConfig } from '@zix/theme';
import { Provider as JotaiProvider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ProvidersComposer,
  QueryClientProvider,
  SafeAreaProvider,
  TamaguiProvider,
  UniversalThemeProvider,
  ToastProvider,
  PushNotification,
  ExpoUpdatesProvider,
} from './providers';
import { LaravelEchoProvider } from '@zix/services/laravel-echo';
import { AuthProvider } from '@zix/services/auth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LocationProvider } from '@zix/features/location';

export interface MainAppProviderProps {
  children: React.ReactNode;
}

export const MainAppProvider: React.FC<MainAppProviderProps> = ({
  children,
}) => {
  return (
    <ProvidersComposer
      providers={[
        ({ children }) => (
          <GestureHandlerRootView style={{ flex: 1 }}>
            {children}
          </GestureHandlerRootView>
        ),
        JotaiProvider,
        UniversalThemeProvider,
        SafeAreaProvider,
        ({ children }) => (
          <TamaguiProvider config={themeConfig}>{children}</TamaguiProvider>
        ),
        ToastProvider,
        QueryClientProvider,
        ExpoUpdatesProvider,
        AuthProvider,
        LaravelEchoProvider,
        ChatProvider,
        PushNotification,
        BottomSheetModalProvider,
        LocationProvider,
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default MainAppProvider;
