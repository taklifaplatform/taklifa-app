import { createTamagui } from '@tamagui/core';

import { config } from '@tamagui/config/v3';
import { CreateTamaguiProps } from 'tamagui';
import { bodyFont, headingFont } from './config/fonts';
import { media, mediaQueryDefaultActive } from './config/media';

const customConfig: CreateTamaguiProps = {
  ...config,
  fonts: {
    // ...config.fonts,
    heading: headingFont,
    body: bodyFont,
  },
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      // color3: '#FFEEB2',
      // color4: '#fed441',
      // color5: '#feca16',
      // color6: '#ffc300',
      // color7: '#e9b501',
      // color8: '#be9401',
    },
    dark: {
      ...config.themes.dark,
      color5: '#feca16',
    },
  },
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  mediaQueryDefaultActive,
  media,
};

// console.log('====')
// console.log('config.themes::', config.themes)
// console.log('====')
// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(customConfig);

export const themeConfig = tamaguiConfig;

export default tamaguiConfig;
