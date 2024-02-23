import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import {
  ColorScheme,
  NextThemeProvider,
  useRootTheme
} from '@tamagui/next-theme';
import { MultiLangAppProvider, bootMultiLang } from '@zix/i18n';

import { NextPage } from 'next';
import Head from 'next/head';

import { MainAppProvider } from '@zix/app/providers/main-app-provider';
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

const ZixApp: React.FC<SolitoAppProps> = ({ Component, pageProps }) => {
  // reference: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
  const getLayout = Component.getLayout || ((page) => page);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_theme, setTheme] = useRootTheme();

  return (
    <>
      <Head>
        <title>Sawaeed Logistic</title>
        <meta name="description" content="Sawaeed Logistic" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MultiLangAppProvider defaultLang={defaultLang}>
        <NextThemeProvider
          onChangeTheme={(next) => {
            setTheme(next as ColorScheme);
          }}
        >
          <MainAppProvider>
            {getLayout(<Component {...pageProps} />)}
          </MainAppProvider>
        </NextThemeProvider>
      </MultiLangAppProvider>
    </>
  );
};

export default ZixApp;
