import { AuthProvider } from '@zix/features/auth';
import { themeConfig } from '@zix/theme';
import { Provider as JotaiProvider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ProvidersComposer,
  PushNotification,
  QueryClientProvider,
  SafeAreaProvider,
  TamaguiProvider,
  ToastProvider,
  UniversalThemeProvider,
} from './providers';
import { ChatProvider } from '@zix/features/chat';
import { LaravelEchoProvider } from '@zix/services/laravel-echo';

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
        AuthProvider,
        LaravelEchoProvider,
        ChatProvider,
        PushNotification,
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default MainAppProvider;
