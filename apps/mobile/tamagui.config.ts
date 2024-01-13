// don't import from here, that's handled already
// instead this is just setting types for this folder

import { themeConfig } from '@zix/app/themes/mobile'

type Conf = typeof themeConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default themeConfig
