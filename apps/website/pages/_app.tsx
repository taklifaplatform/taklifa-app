import type { SolitoAppProps } from 'solito';

import { api } from '@zix/app/api';
import {
  AuthProviderProps,
  WebsiteAppProvider
} from '@zix/app/providers/website';
import Head from 'next/head';

const ZixApp: React.FC<
  SolitoAppProps<{ initialSession: AuthProviderProps['initialSession'] }>
> = ({ Component, pageProps }) => {
  // reference: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>ZIX Core</title>
        <meta name="description" content="ZIX Core" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <WebsiteAppProvider initialSession={pageProps.initialSession}>
        {getLayout(<Component {...pageProps} />)}
      </WebsiteAppProvider>
    </>
  );
};

export default api.withTRPC(ZixApp);
