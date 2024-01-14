export type UniversalThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * UniversalThemeProvider component provides a theme to its child components.
 * Note: is handled on _app.tsx
 *
 * @param {React.ReactNode} children - The child components to be wrapped with the theme.
 * @returns {React.ReactNode} The wrapped child components with the theme.
 */
export const UniversalThemeProvider: React.FC<UniversalThemeProviderProps> = ({
  children
}) => {
  return <>{children}</>
};

export { useRootTheme, useThemeSetting } from '@tamagui/next-theme';

export default UniversalThemeProvider;
