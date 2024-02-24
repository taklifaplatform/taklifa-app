import { GetServerSideProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

/** ﬂ
 * getServerSideProps for auth pages - will redirect authenticated users - pass your own function as the only arg
 */
export function userProtectedGetSSP<
  Props extends { [key: string]: any } = { [key: string]: any },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData
>(
  getServerSideProps?: GetServerSideProps<Props, Params, Preview>
): GetServerSideProps<Props, Params, Preview> {
  return async (ctx) => {
    const session = null;

    if (!session) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    const getSSRResult = getServerSideProps
      ? await getServerSideProps(ctx)
      : { props: {} as Props };
    if ('props' in getSSRResult) {
      // add the initialSession to page's getServerSideProps
      (getSSRResult.props as any).initialSession = session;
    }
    return getSSRResult;
  };
}
