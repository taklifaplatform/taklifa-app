'use client';

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
import { MainAppProvider } from '@zix/providers';
import { MultiLangAppProvider, bootMultiLang } from '@zix/i18n';

import { NextPage } from 'next';
import Head from 'next/head';

import { OpenAPI } from '@zix/api';
import 'raf/polyfill';
import { ReactElement, ReactNode, useMemo } from 'react';
import type { SolitoAppProps } from 'solito';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  const router = useRouter();

  // memo to avoid re-render on dark/light change
  const contents = useMemo(() => {
    return getLayout(<Component {...pageProps} />);
  }, [pageProps]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && url !== '/' && url !== '') {
        window.open(`sawaeed:///${url}`, '_self');
      }
    };
    // On first load
    if (typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '') {
      handleRouteChange(window.location.pathname);
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Sawaeed Logistic</title>
        <meta name="description" content="Sawaeed Logistic" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="apple-itunes-app" content="app-id=6720725925, app-clip-bundle-id=app.sawaeed" id="appMetaTag"></meta>
        <meta property="al:ios:app_store_id" content="6720725925" />
        <meta property="al:ios:app_name" content="Sawaeed" />
        <link rel="alternate" href="ios-app://6720725925" />
      </Head>
      <MultiLangAppProvider defaultLang={defaultLang}>
        <NextThemeProvider
          defaultTheme="light"
          onChangeTheme={(next) => {
            setTheme(next as ColorScheme);
          }}
        >
          <MainAppProvider>{contents}</MainAppProvider>
        </NextThemeProvider>
      </MultiLangAppProvider>
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
          var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
          ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


            ttq.load('D0H16U3C77U24T7RB5RG');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>
    </>
  );
};

export default ZixApp;
