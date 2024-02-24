import { themeConfig as config } from '@zix/theme';

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
export default config;
