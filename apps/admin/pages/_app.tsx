import { AppProps } from 'next/app';

import { Refine } from '@refinedev/core';
import dataProvider from '@refinedev/simple-rest';
import routerProvider from '@refinedev/nextjs-router';

// import { Layout } from 'components/Layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Refine
      dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
      routerProvider={routerProvider}
      resources={[
        {
          name: 'posts',
          list: '/posts',
          show: '/posts/show/:id'
        },
        {
          name: 'categories',
          list: '/categories',
          show: '/categories/show/:id'
        }
      ]}
    >
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </Refine>
  );
};

export default App;
