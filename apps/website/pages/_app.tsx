import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import {
  ColorScheme,
  NextThemeProvider,
  useRootTheme
} from '@tamagui/next-theme';
import { bootMultiLang, MultiLangAppProvider } from '@zix/i18n';

import { api } from '@zix/app/api';
import {
  AuthProviderProps,
  WebsiteAppProvider
} from '@zix/app/providers/website';
import { NextPage } from 'next';
import Head from 'next/head';

import 'raf/polyfill';
import { ReactElement, ReactNode } from 'react';
import type { SolitoAppProps } from 'solito';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const defaultLang = bootMultiLang();

const ZixApp: React.FC<
  SolitoAppProps<{ initialSession: AuthProviderProps['initialSession'] }>
> = ({ Component, pageProps }) => {
  // reference: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
  const getLayout = Component.getLayout || ((page) => page);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_theme, setTheme] = useRootTheme();

  return (
    <>
      <Head>
        <title>ZIX Core</title>
        <meta name="description" content="ZIX Core" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MultiLangAppProvider defaultLang={defaultLang}>
        <NextThemeProvider
          onChangeTheme={(next) => {
            setTheme(next as ColorScheme);
          }}
        >
          <WebsiteAppProvider initialSession={pageProps.initialSession}>
            {getLayout(<Component {...pageProps} />)}
          </WebsiteAppProvider>
        </NextThemeProvider>
      </MultiLangAppProvider>
    </>
  );
};

export default api.withTRPC(ZixApp);
