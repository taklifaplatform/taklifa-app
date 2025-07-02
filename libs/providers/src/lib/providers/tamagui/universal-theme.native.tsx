import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import {
  ThemeProviderProps,
  useThemeSetting as next_useThemeSetting,
} from '@tamagui/next-theme';
import { useForceUpdate } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { AppState, ColorSchemeName, useColorScheme } from 'react-native';
import { UniversalThemeProviderProps } from './universal-theme';
export const ThemeContext = createContext<
  (ThemeProviderProps & { current?: string | null }) | null
>(null);

type ThemeName = 'light' | 'dark' | 'system';

/// 
// TODO: should be configurable
const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(15, 88, 55)',
    background: 'rgb(249, 249, 249)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(33, 31, 31)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800',
    }
  },
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(15, 88, 55)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: '#E0E0E0',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800',
    }
  },
};

export const UniversalThemeProvider: React.FC<UniversalThemeProviderProps> = ({
  children,
}) => {
  const [current, setCurrent] = useState<ThemeName>('system');
  const systemTheme = useNonFlickeringColorScheme();

  useLayoutEffect(() => {
    async function main() {
      const persistedTheme = await AsyncStorage.getItem('@preferred_theme');
      if (persistedTheme) {
        setCurrent(persistedTheme as ThemeName);
      }
    }
    main();
  }, []);

  useEffect(() => {
    async function main() {
      await AsyncStorage.setItem('@preferred_theme', current);
    }
    main();
  }, [current]);

  const forceUpdate = useForceUpdate();

  const themeContext = useMemo(() => {
    const set = (val: string) => {
      setCurrent(val as ThemeName);
    };

    return {
      set,
      themes: ['light', 'dark'],
      onChangeTheme: (next: ThemeName) => {
        setCurrent(next);
        forceUpdate();
      },
      current,
      systemTheme,
    };
  }, [current, forceUpdate, systemTheme]);

  return (
    <ThemeContext.Provider value={themeContext}>
      <InnerProvider>{children}</InnerProvider>
    </ThemeContext.Provider>
  );
};

const InnerProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useThemeSetting();

  return (
    <ThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeProvider>
  );
};

export const useThemeSetting: typeof next_useThemeSetting = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeSetting should be used within the context provider.',
    );
  }

  const outputContext: ReturnType<typeof next_useThemeSetting> = {
    ...context,
    systemTheme: context.systemTheme as 'light' | 'dark',
    themes: context.themes!,
    current: context.current ?? 'system',
    resolvedTheme:
      context.current === 'system'
        ? context.systemTheme
        : context.current ?? 'system',
    set: (value) => {
      context.onChangeTheme?.(value);
    },
    toggle: () => {
      const map = {
        light: 'dark',
        dark: 'system',
        system: 'light',
      };
      context.onChangeTheme?.(map[context.current ?? 'system']);
    },
  };

  return outputContext;
};

export const useRootTheme = () => {
  const context = useThemeSetting();
  return [
    context.current === 'system' ? context.systemTheme : context.current,
    context.set,
  ];
};

// fix flash of wrong theme on iOS:
// https://github.com/bluesky-social/social-app/pull/1417
// wait on merge from react-native to remove:
// https://github.com/facebook/react-native/pull/39439
function useNonFlickeringColorScheme() {
  const colorSchemeFromRN = useColorScheme();
  const [nonFlickerScheme, setNonFlickerScheme] =
    useState<ColorSchemeName>(colorSchemeFromRN);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      const isActive = state === 'active';
      if (!isActive) return;
      setNonFlickerScheme(colorSchemeFromRN);
    });

    return () => {
      subscription.remove();
    };
  }, [colorSchemeFromRN]);

  return nonFlickerScheme || 'system';
}

export default UniversalThemeProvider;
