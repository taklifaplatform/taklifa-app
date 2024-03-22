import { themeConfig as config } from '@zix/theme';

export type Conf = typeof config;

declare module 'tamagui' {
  type TamaguiCustomConfig = Conf
}
export default config;
