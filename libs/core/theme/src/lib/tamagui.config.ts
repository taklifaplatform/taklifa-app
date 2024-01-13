import { config } from '@tamagui/config/v2';
import { createTamagui } from '@tamagui/core'; // or '@tamagui/core'
import { themes } from './theme-builder';
/**
 * config:
 * - defaultFont
 * - shouldAddPrefersColorThemes
 * - themeClassNameOnRoot
 * - themes
 * - media
 * - shorthands
 * - tokens
 * - fonts
 * - mediaQueryDefaultActive
 * - selectionStyles
 * - animations
 */
export const themeConfig = createTamagui({
  ...config,
  themes,
});
