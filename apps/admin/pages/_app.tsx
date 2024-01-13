import { AppProps } from 'next/app';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import { AdminAppProvider } from '@zix/app/providers/admin';
import { dataProvider } from '@refinedev/supabase';
import { supabaseAdmin } from '@zix/core/supabase';

// import { Layout } from 'components/Layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AdminAppProvider>
      <Refine
        dataProvider={dataProvider(supabaseAdmin)}
        routerProvider={routerProvider}
        resources={[
          {
            name: 'countries',
            list: '/countries',
            show: '/countries/show/:id'
          },
        ]}
      >
        <Component {...pageProps} />
      </Refine>
    </AdminAppProvider>
  );
};

export default App;
