import { Decorator } from '@storybook/react';
import {
  TamaguiProvider,
  ToastProvider,
  UniversalThemeProvider
} from '@zix/app/providers/website';
import { themeConfig } from '@zix/app/themes/website';
import { Theme, ThemeName, YStack } from '@zix/app/ui/core';

export const StorybookDecorator: Decorator = (Story, args: any) => {
  const {
    theme1,
    theme2,
    theme3,
    theme4
    // inverseTheme
  } = args.globals;
  const themeName =
    [theme2, theme3, theme4].filter((theme) => !!theme).join('_') || null;

  return (
    <UniversalThemeProvider>
      <TamaguiProvider config={themeConfig} defaultTheme={theme1}>
        <ToastProvider>
          <YStack backgroundColor="$background" padding="$4" f={1}>
            <Theme forceClassName name={themeName as ThemeName}>
              <Story />
            </Theme>
          </YStack>
        </ToastProvider>
      </TamaguiProvider>
    </UniversalThemeProvider>
  );
};
