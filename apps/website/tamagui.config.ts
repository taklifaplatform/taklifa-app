// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { themeConfig as config } from "../../libs/app/themes/shared/src/lib/sawaeed-theme";

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default config;
