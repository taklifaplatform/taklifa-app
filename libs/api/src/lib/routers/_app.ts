import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../trpc";
import { countriesRouter } from "./countries";
import { customerShipmentsRouter } from "./customerShipments";
import { exploreDriversRouter } from "./exploreDrivers";
import { exploreJobsRouter } from "./exploreJobs";
import { manageCompanyMembersRouter } from "./company-manager/manageCompanyMembers";
import { manageCompanyRouter } from "./company-manager/manageCompany";
import { notificationsRouter } from "./notifications";

export const appRouter = createTRPCRouter({
  countries: countriesRouter,
  customerShipments: customerShipmentsRouter,
  exploreDrivers: exploreDriversRouter,
  exploreJobs: exploreJobsRouter,
  manageCompanyMembers: manageCompanyMembersRouter,
  manageCompany: manageCompanyRouter,
  notifications: notificationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
