import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const exploreJobsRouter = createTRPCRouter({
  list: protectedProcedure
    .query(async ({ ctx: { supabase } }) => {
      const countries = await supabase
        .from("shipments")
        .select().limit(10);
      return countries;
    }),
  /**
   * Get a single shipment by ID, also returns the proposals for the shipment
   */
  get: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
  submitProposal: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  updateProposal: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  deleteProposal: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
});
