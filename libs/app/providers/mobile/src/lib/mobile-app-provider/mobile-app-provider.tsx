import { Session } from '@supabase/supabase-js';
import { CompanyManagerProvider } from '@zix/app/features/companies-dashboard';
import { themeConfig } from '@zix/app/themes/mobile';
import {
  AuthProvider,
  ProvidersComposer,
  QueryClientProvider,
  SafeAreaProvider,
  TamaguiProvider,
  ToastProvider,
  UniversalThemeProvider,
  ChatProvider
} from '@zix/core/providers';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
export interface MobileAppProviderProps {
  children: React.ReactNode;
  initialSession?: Session | null;
}

export const MobileAppProvider: React.FC<MobileAppProviderProps> = ({
  children,
  initialSession
}) => {
  return (
    <AuthProvider initialSession={initialSession}>
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
          ChatProvider,
          CompanyManagerProvider,
        ]}
      >
        {children}
      </ProvidersComposer>
    </AuthProvider>
  );
};

export default MobileAppProvider;
