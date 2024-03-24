import React from 'react';
import { SafeAreaProvider as SafeAreaProviderOG } from 'react-native-safe-area-context';

import type { SafeAreaProviderProps } from './safe-area';

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({
  children,
}) => {
  return <SafeAreaProviderOG>{children}</SafeAreaProviderOG>;
};

export default SafeAreaProvider;
