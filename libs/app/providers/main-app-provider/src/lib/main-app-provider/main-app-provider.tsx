import { CompanyManagerProvider } from '@zix/app/features/companies-dashboard';
import { themeConfig } from '@zix/app/theme';
import {
  AuthProvider,
  ChatProvider,
  ProvidersComposer,
  QueryClientProvider,
  SafeAreaProvider,
  TamaguiProvider,
  ToastProvider,
  UniversalThemeProvider
} from '@zix/core/providers';
import { Provider as JotaiProvider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export interface MainAppProviderProps {
  children: React.ReactNode;
}

export const MainAppProvider: React.FC<MainAppProviderProps> = ({ children }) => {
  return (
    <ProvidersComposer
      providers={[
        ({ children }) => <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>,
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
        CompanyManagerProvider,
      ]}
    >
      {children}
    </ProvidersComposer>
  )
}

export default MainAppProvider;
