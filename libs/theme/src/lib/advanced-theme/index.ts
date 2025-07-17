import { config } from '@tamagui/config/v3';

import { createTamagui } from 'tamagui';
import { bodyFont, headingFont } from './config/fonts';
import { themes } from './theme';

// TAMAGUI_IS_SERVER is set by @tamagui/next-plugin
// const themes =
//   process.env.TAMAGUI_IS_SERVER || process.env.NODE_ENV !== 'production'
//     ? themesIn
//     : ({} as typeof themesIn)

export const themeConfig = createTamagui({
  ...config,
  // tokens,
  themes, //
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  // ...the rest of your config
});

export default themeConfig;
