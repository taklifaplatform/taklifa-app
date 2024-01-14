import { themeConfig as config } from "@zix/app/themes/website";

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default config;
