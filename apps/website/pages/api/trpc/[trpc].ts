import { appRouter, createTRPCContext } from "@zix/app/api";
import * as trpcNext from "@trpc/server/adapters/next";

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
