import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const notificationsRouter = createTRPCRouter({
  list: protectedProcedure
    .query(async ({ ctx: { supabase } }) => {
      const countries = await supabase
        .from("countries")
        .select().limit(10);
      return countries;
    }),
  get: protectedProcedure
    .input(z.object({
      notification_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
});
