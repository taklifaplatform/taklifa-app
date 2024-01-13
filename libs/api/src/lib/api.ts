import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { getBaseUrl } from "@zix/core/utils";
import SuperJSON from "superjson";
import { AppRouter } from "./routers/_app";

// export const api = createTRPCNext({
export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      queryClientConfig: {
        // web query config
      },
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           */
          url: `${getBaseUrl()}/api/trpc`,

          // You can pass any HTTP headers you wish here
          async headers() {
            return {};
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
});
