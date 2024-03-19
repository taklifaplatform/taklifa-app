'use client'

import '@tamagui/core/reset.css';
import '../public/styles/globals.css';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

import {
  ColorScheme,
  NextThemeProvider,
  useRootTheme,
} from '@tamagui/next-theme';
import { MainAppProvider } from '@zix/app-providers';
import { MultiLangAppProvider, bootMultiLang } from '@zix/i18n';

import { NextPage } from 'next';
import Head from 'next/head';

import { OpenAPI } from '@zix/api';
import 'raf/polyfill';
import { ReactElement, ReactNode, useMemo } from 'react';
import type { SolitoAppProps } from 'solito';


export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const defaultLang = bootMultiLang();
OpenAPI.BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

const ZixApp: React.FC<SolitoAppProps> = ({ Component, pageProps }) => {
  // reference: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
  const getLayout = Component.getLayout || ((page) => page);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_theme, setTheme] = useRootTheme();

  // memo to avoid re-render on dark/light change
  const contents = useMemo(() => {
    return getLayout(<Component {...pageProps} />)
  }, [pageProps])

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
            {contents}
          </MainAppProvider>
        </NextThemeProvider>
      </MultiLangAppProvider>
    </>
  );
};

export default ZixApp;
