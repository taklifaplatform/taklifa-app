
import { config } from '@tamagui/config/v3';

import { createTamagui } from 'tamagui'
import * as themes from './theme'
import { tokens } from './theme-builder'

// TAMAGUI_IS_SERVER is set by @tamagui/next-plugin
// const themes =
//   process.env.TAMAGUI_IS_SERVER || process.env.NODE_ENV !== 'production'
//     ? themesIn
//     : ({} as typeof themesIn)

export const themeConfig = createTamagui({
  ...config,
  // tokens,
  themes,
  // ...the rest of your config
})

export default themeConfig;
