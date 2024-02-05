import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const customerShipmentsRouter = createTRPCRouter({
  list: protectedProcedure
    .query(async ({ ctx: { supabase } }) => {
      const countries = await supabase
        .from("shipments")
        .select().limit(10);
      return countries;
    }),
  get: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),

  create: protectedProcedure
    .input(z.object({
      // TODO
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  update: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  updateItems: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
      items: z.array(z.object({
        item_id: z.number().nullable(),
      })),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  inviteDriver: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
      driver_id: z.number(),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  submit: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  delete: protectedProcedure
    .input(z.object({
      shipment_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
});
