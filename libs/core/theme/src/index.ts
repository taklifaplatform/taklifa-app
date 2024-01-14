import { config } from "@tamagui/config/v2";

import { animations } from './lib/animations';
import { themes } from './lib/theme-builder';

/**
 * coreThemeConfig:
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
export const coreThemeConfig = {
  ...config,
  themes,
  animations,
};
