import React from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export const StorybookTGProvider = ({ children }) => {
  return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
};

export const StorybookDecorator = (Story, context) => {
  return (
    <StorybookTGProvider>
      <Story {...context} />
    </StorybookTGProvider>
  );
};
