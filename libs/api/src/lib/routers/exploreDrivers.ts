import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const exploreDriversRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({
      location: z.object({
        latitude: z.number(),
        longitude: z.number(),
        latitudeDelta: z.number(),
        longitudeDelta: z.number(),
      }).nullable(),
      country_id: z.number().nullable(),
      radius: z.number().nullable(),
    }))
    .query(async ({ ctx: { supabase } }) => {
      const countries = await supabase
        .from("countries")
        .select().limit(10);
      return countries;
    }),
  get: publicProcedure
    .input(z.object({
      driver_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
});
