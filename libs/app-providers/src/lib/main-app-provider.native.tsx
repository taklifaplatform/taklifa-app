import { AuthProvider } from '@zix/features/auth';
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
} from './providers';

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
        ChatProvider,
        PushNotification,
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default MainAppProvider;
