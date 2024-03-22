import { ThemeName } from 'tamagui';

export type ThemeColors =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'success'
  | 'error';
export const colormap: { [k in ThemeColors]: ThemeName } = {
  success: 'green',
  error: 'red',
  info: 'blue',
  primary: 'yellow',
  secondary: 'black' as ThemeName,
  warning: 'orange',
};
